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
    private readonly props;
    private readonly loadedFonts;
    constructor(props: FontLoaderProps);
    private log;
    loadFont: ({ fontName, base64FontString, fontExtension, forceLoad }: LoadFontInput) => Promise<string>;
    loadFonts: (fonts: LoadFontInput | LoadFontInput[], forceLoad?: boolean) => Promise<string[]>;
}
