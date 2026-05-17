import FontLoader, {FontExtension, LoadFontInput} from './FontLoader';
import FontDownloader, {FontDownloaderProps} from './FontDownloader';
import type {PermissionsAcquirerProps} from './PermissionsAcquirer.android';
// @ts-expect-error
import PermissionsAcquirer from './PermissionsAcquirer';
import NoPermissionsAcquirer from './NoPermissionsAcquirer';

const DEFAULT_FONT_LOAD_ERROR_MESSAGE = 'Unable to load this font.';

type DynamicFontsProps = {
  fontDownloadingProps?: Omit<FontDownloaderProps, 'debug'>;
  permissionsAcquirerProps?: PermissionsAcquirerProps;
  fontLoadErrorMessage?: string;
  /**
   * Enable debug mode to print extra logs
   */
  debug?: boolean;
  /**
   * Do not request permissions
   */
  doNotRequestPermissions?: boolean;
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
    const {debug = __DEV__, doNotRequestPermissions} = props;
    this.props = {fontLoadErrorMessage: DEFAULT_FONT_LOAD_ERROR_MESSAGE, ...props};
    this.permissionsAcquirer = doNotRequestPermissions
      ? new NoPermissionsAcquirer()
      : new PermissionsAcquirer(this.props.permissionsAcquirerProps ?? {});
    this.fontLoader = new FontLoader({debug});
    const fontDownloadingProps = this.props.fontDownloadingProps ?? {};
    this.fontDownloader = new FontDownloader({...fontDownloadingProps, debug});
  }

  private log(message?: any, ...optionalParams: any[]) {
    const {debug} = this.props;
    if (debug) {
      console.log(message, optionalParams);
    }
  }

  private async loadFont(input: LoadFontInput) {
    const {fontLoadErrorMessage} = this.props;
    try {
      return await this.fontLoader.loadFont(input);
    } catch (err) {
      return Promise.reject({
        source: 'uilib:FontDownloader:loadFont',
        message: `${fontLoadErrorMessage} fontName: ${input.fontName} error: ${JSON.stringify(err)}`
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
    const {fontLoadErrorMessage} = this.props;
    await this.permissionsAcquirer.getPermissions();
    if (await this.fontDownloader.isFontDownloaded(fontName, fontExtension)) {
      this.log(fontName, 'Already downloaded');
    } else {
      await this.fontDownloader.downloadFont(fontUri, fontName, fontExtension, timeout);
    }

    const base64FontString = await this.fontDownloader.readFontFromDisk(fontName, fontExtension);
    if (base64FontString) {
      this.log(fontName, 'Loading');
      const _fontName = await this.loadFont({fontName, base64FontString, fontExtension});
      this.log(_fontName, 'Finished loading');
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

  private buildFontData(rootUri: string,
    fontName: string,
    fontExtension: FontExtension,
    fontNamePrefix?: string): GetFontInput & {fullFontName: string} {
    const _fontName = `${fontNamePrefix ?? ''}${fontName}`;
    const fullFontName = `${_fontName}.${fontExtension}`;
    return {fontUri: `${rootUri}${fullFontName}`, fontName: _fontName, fontExtension, fullFontName};
  }

  // eslint-disable-next-line max-params
  public async getFontFamily(rootUri: string,
    fontNames: string[],
    fontExtension: FontExtension,
    fontNamePrefix?: string,
    retries = 1): Promise<string[]> {
    const fonts: GetFontInput[] = fontNames.map(fontName =>
      this.buildFontData(rootUri, fontName, fontExtension, fontNamePrefix));
    let fontsLoaded: string[] = [];
    let tryCounter = 0;
    while (fontsLoaded.length < fontNames.length && tryCounter < retries) {
      try {
        ++tryCounter;
        // TODO: we should return successful loaded fonts and not fail all of them
        fontsLoaded = await this.getFonts(fonts);
      } catch (error) {
        this.log(`getFontFamily failed (try #${tryCounter}) error:`, error);
      }
    }

    return Promise.resolve(fontsLoaded);
  }

  private async deleteFontFromDisk(fontName: string, fontExtension: FontExtension, fontNamePrefix?: string) {
    const fontInput = this.buildFontData('', fontName, fontExtension, fontNamePrefix);
    await this.fontDownloader.deleteFontFromDisk(fontInput.fullFontName);
  }

  public async deleteFont(fontName: string, fontExtension: FontExtension): Promise<void> {
    await this.permissionsAcquirer.getPermissions();
    await this.deleteFontFromDisk(fontName, fontExtension);
  }

  public async deleteFontFamily(fontNames: string[],
    fontExtension: FontExtension,
    fontNamePrefix?: string): Promise<void> {
    await this.permissionsAcquirer.getPermissions();
    fontNames.forEach(async fontName => {
      await this.deleteFontFromDisk(fontName, fontExtension, fontNamePrefix);
    });
  }

  public async isFontDownloaded(fontName: string, fontExtension: FontExtension): Promise<boolean> {
    return await this.fontDownloader.isFontDownloaded(fontName, fontExtension);
  }

  public async isFontFamilyDownloaded(rootUri: string,
    fontNames: string[],
    fontExtension: FontExtension,
    fontNamePrefix?: string): Promise<boolean> {
    const fonts: GetFontInput[] = fontNames.map(fontName =>
      this.buildFontData(rootUri, fontName, fontExtension, fontNamePrefix));
    try {
      const areDownloaded = await Promise.all(fonts
        .filter(font => font)
        .map(font => {
          return this.fontDownloader.isFontDownloaded(font.fontName, font.fontExtension);
        }));
      return Promise.resolve(areDownloaded.every(v => v === true));
    } catch (error) {
      this.log(`isFontFamilyDownloaded failed error:`, error);
      return Promise.resolve(false);
    }
  }
}
