import { FontExtension } from './FontLoader';
import { FontDownloaderProps } from './FontDownloader';
import type { PermissionsAcquirerProps } from './PermissionsAcquirer.android';
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
export { DynamicFontsProps, FontExtension, GetFontInput };
export default class DynamicFonts {
    private readonly props;
    private readonly permissionsAcquirer;
    private readonly fontLoader;
    private readonly fontDownloader;
    constructor(props: DynamicFontsProps);
    private log;
    private loadFont;
    /**
     * Get font - download from uri (or from cache if already downloaded) and load it to memory
     * You need to handle errors in the form of Promise.reject
     * @param fontUri the uri of the font (to be downloaded from)
     * @param fontName the full name of the font
     * @param fontExtension the extension of the font, i.e. '.ttf' or '.otf'
     * @param timeout milliseconds for the download to complete in (defaults to 5000)
     */
    getFont({ fontUri, fontName, fontExtension, timeout }: GetFontInput): Promise<string>;
    getFonts(fonts: GetFontInput | GetFontInput[]): Promise<string[]>;
    private buildFontData;
    getFontFamily(rootUri: string, fontNames: string[], fontExtension: FontExtension, fontNamePrefix?: string, retries?: number): Promise<string[]>;
    private deleteFontFromDisk;
    deleteFont(fontName: string, fontExtension: FontExtension): Promise<void>;
    deleteFontFamily(fontNames: string[], fontExtension: FontExtension, fontNamePrefix?: string): Promise<void>;
    isFontDownloaded(fontName: string, fontExtension: FontExtension): Promise<boolean>;
    isFontFamilyDownloaded(rootUri: string, fontNames: string[], fontExtension: FontExtension, fontNamePrefix?: string): Promise<boolean>;
}
