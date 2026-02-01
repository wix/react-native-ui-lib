import {NativeModules} from 'react-native';

const {DynamicFont} = NativeModules;

export type FontExtension = 'ttf' | 'otf';

export type LoadFontInput = {
  /**
   * Specify registered font name (doesn't work for iOS)
   */
  fontName: string;
  /**
   * This can be a data URI or raw base64...
   * if it is raw base64 type must be specified,
   * but defaults to TTF (data URI mime: font/ttf or font/otf)
   */
  base64FontString: string;
  /**
   * Specify the type of font in the encoded data (ttf or otf). Defaults to "ttf"
   */
  fontExtension: FontExtension;
  /**
   * Force the loading of the font even if previously loaded it
   */
  forceLoad?: boolean;
};

export type FontLoaderProps = {
  /**
   * Enable debug mode to print extra logs
   */
  debug?: boolean;
};

export default class FontLoader {
  private readonly props: FontLoaderProps;
  private readonly loadedFonts = new Map<string, string>();

  constructor(props: FontLoaderProps) {
    this.props = props;
  }

  private log(message?: any, ...optionalParams: any[]) {
    const {debug} = this.props;
    if (debug) {
      console.log(message, optionalParams);
    }
  }

  public loadFont = ({
    fontName,
    base64FontString,
    fontExtension = 'ttf',
    forceLoad = false
  }: LoadFontInput): Promise<string> => {
    /* Check if this font was already loaded */
    if (!forceLoad && this.loadedFonts.has(fontName)) {
      this.log(fontName, 'Already loaded');
      return Promise.resolve(this.loadedFonts.get(fontName) as string);
    }

    if (!fontName) {
      throw new Error('fontName is a required argument');
    }

    if (!base64FontString) {
      throw new Error('base64FontString is a required argument');
    }

    this.log(fontName, 'Starting to load');
    /* Load font via native binary code */
    return new Promise((resolve, reject) => {
      DynamicFont.loadFont({
        name: fontName,
        data: base64FontString,
        type: fontExtension
      },
      (err: string, givenName: string) => {
        if (err) {
          reject(err);
          return;
        }
        /* Loaded successfully... resolve promise with "real" font name */
        this.loadedFonts.set(fontName, givenName);
        resolve(givenName);
      });
    });
  };

  // TODO: Needs to be tested
  // public loadFontFromFile = (fontName: string, filePath: string) => {
  //   if (!fontName) {
  //     throw new Error('name is a required argument');
  //   }

  //   if (!filePath) {
  //     throw new Error('filePath is a required argument');
  //   }

  //   return new Promise((resolve, reject) => {
  //     DynamicFont.loadFontFromFile({
  //       name: fontName,
  //       filePath
  //     },
  //     (err: string, givenName: string) => {
  //       if (err) {
  //         reject(err);
  //         return;
  //       }
  //       resolve(givenName);
  //     });
  //   });
  // };

  public loadFonts = (fonts: LoadFontInput | LoadFontInput[], forceLoad?: boolean) => {
    if (!fonts) {
      return Promise.resolve([]);
    }

    const fontsArray = fonts instanceof Array ? fonts : [fonts];
    return Promise.all(fontsArray.filter(font => font).map(font => this.loadFont({forceLoad, ...font})));
  };
}
