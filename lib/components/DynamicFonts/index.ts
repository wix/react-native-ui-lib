import {Platform} from 'react-native';
import FontLoader, {FontExtension, LoadFontInput} from './FontLoader';
import FontDownloader, {FontDownloaderProps} from './FontDownloader';
import PermissionsAcquirerAndroid, {PermissionsAcquirerProps} from './PermissionsAcquirer.android';
import PermissionsAcquirerIOS from './PermissionsAcquirer.ios';
const PermissionsAcquirer = Platform.OS === 'android' ? PermissionsAcquirerAndroid : PermissionsAcquirerIOS;

const DEFAULT_FONT_LOAD_ERROR_MESSAGE = 'Unable to load this font.';

type DynamicFontsProps = {
  fontDownloadingProps?: Omit<FontDownloaderProps, 'debug'>;
  permissionsAcquirerProps?: PermissionsAcquirerProps;
  fontLoadErrorMessage?: string;
  /**
   * Enable debug mode to print extra logs
   */
  debug?: boolean;
};

type GetFontInput = {
  /**
   * The uri of the font (to be downloaded from)
   */
  fontUri: string;
  /**
   * The full name of the font
   */
  fontName: string;
  /**
   * The extension of the font, i.e. '.ttf' or '.otf'
   */
  fontExtension: FontExtension;
  /**
   * Milliseconds for the download to complete in (defaults to 5000)
   */
  timeout?: number;
};

export {DynamicFontsProps, FontExtension, GetFontInput};

export default class DynamicFonts {
  private readonly props: DynamicFontsProps;
  private readonly permissionsAcquirer: InstanceType<typeof PermissionsAcquirer>;
  private readonly fontLoader: InstanceType<typeof FontLoader>;
  private readonly fontDownloader: InstanceType<typeof FontDownloader>;

  constructor(props: DynamicFontsProps) {
    const {debug} = props;
    this.props = {fontLoadErrorMessage: DEFAULT_FONT_LOAD_ERROR_MESSAGE, ...props};
    this.permissionsAcquirer = new PermissionsAcquirer(this.props.permissionsAcquirerProps ?? {});
    this.fontLoader = new FontLoader({debug});
    const fontDownloadingProps = this.props.fontDownloadingProps ?? {};
    this.fontDownloader = new FontDownloader({...fontDownloadingProps, debug});
  }

  private async loadFont(input: LoadFontInput) {
    const {fontLoadErrorMessage} = this.props;
    try {
      return await this.fontLoader.loadFont(input);
    } catch (err) {
      return Promise.reject({
        source: 'uilib:FontDownloader:loadFont',
        message: `${fontLoadErrorMessage} fontName: ${input.fontName}`
      });
    }
  }

  /**
   * Get font - download from uri (or from cache if already downloaded) and load it to memory
   * You need to handle errors in the form of Promise.reject
   * @param fontUri the uri of the font (to be downloaded from)
   * @param fontName the full name of the font
   * @param fontExtension the extension of the font, i.e. '.ttf' or '.otf'
   * @param timeout milliseconds for the download to complete in (defaults to 5000)
   */
  public async getFont({fontUri, fontName, fontExtension, timeout = 5000}: GetFontInput): Promise<string> {
    const {debug} = this.props;
    const {fontLoadErrorMessage} = this.props;
    await this.permissionsAcquirer.getPermissions();
    if (await this.fontDownloader.isFontDownloaded(fontName, fontExtension)) {
      if (debug) {
        console.log(fontName, 'Already downloaded');
      }
    } else {
      if (debug) {
        console.log(fontName, 'Starting to download');
      }
      await this.fontDownloader.downloadFont(fontUri, fontName, fontExtension, timeout);
      if (debug) {
        console.log(fontName, 'Finished downloading');
      }
    }

    const base64FontString = await this.fontDownloader.readFontFromDisk(fontName, fontExtension);
    if (base64FontString) {
      if (debug) {
        console.log(fontName, 'Loading');
      }
      const _fontName = await this.loadFont({fontName, base64FontString, fontExtension});
      if (debug) {
        console.log(_fontName, 'Finished loading');
      }
      return Promise.resolve(_fontName);
    } else {
      return Promise.reject({
        source: 'uilib:FontDownloader:getFont',
        message: `${fontLoadErrorMessage} fontName: ${fontName}`
      });
    }
  }

  public async getFonts(fonts: GetFontInput | GetFontInput[]): Promise<string[]> {
    await this.permissionsAcquirer.getPermissions();
    if (fonts instanceof Array) {
      return Promise.all(fonts.filter(font => font).map(font => this.getFont(font)));
    } else {
      return Promise.resolve([await this.getFont(fonts)]);
    }
  }

  private buildFontName(rootUri: string,
    fontName: string,
    fontExtension: FontExtension,
    fontNamePrefix?: string): GetFontInput {
    const _fontName = `${fontNamePrefix ?? ''}${fontName}`;
    const fullFontName = `${_fontName}.${fontExtension}`;
    return {fontUri: `${rootUri}${fullFontName}`, fontName: _fontName, fontExtension};
  }

  // eslint-disable-next-line max-params
  public async getFontFamily(rootUri: string,
    fontNames: string[],
    fontExtension: FontExtension,
    fontNamePrefix?: string,
    retries = 1): Promise<string[]> {
    const {debug} = this.props;
    const fonts: GetFontInput[] = fontNames.map(fontName =>
      this.buildFontName(rootUri, fontName, fontExtension, fontNamePrefix));
    let fontsLoaded: string[] = [];
    let tryCounter = 0;
    while (fontsLoaded.length < fontNames.length && tryCounter < retries) {
      try {
        ++tryCounter;
        // TODO: we should return successful loaded fonts and not fail all of them
        fontsLoaded = await this.getFonts(fonts);
      } catch (error) {
        if (debug) {
          console.log(`getFontFamily failed (try #${tryCounter}) error: ${error}`);
        }
      }
    }

    return Promise.resolve(fontsLoaded);
  }
}
