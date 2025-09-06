import { FontExtension } from './FontLoader';
export type FontDownloaderProps = {
    /**
     * Should be In the following convention: '/NAME'
     */
    dynamicFontsFolder?: string;
    downloadErrorMessage?: string;
    /**
     * Enable debug mode to print extra logs
     */
    debug?: boolean;
};
export default class FontDownloader {
    private readonly props;
    private readonly fs;
    constructor(props: FontDownloaderProps);
    private log;
    private getPrivateFolder;
    private getPrivateFilePath;
    private getFileName;
    private _isFontDownloaded;
    private createPrivateFolderIfNeeded;
    private getDownloadFontOptions;
    /**
     * Download the font
     * @param fontUri the remote location of the font
     * @param fontName the full name of the font
     * @param fontExtension the extension of the font, i.e. '.ttf' or '.otf'
     * @param timeout a timeout for the download to fail after
     * @returns the full path of the download
     */
    downloadFont(fontUri: string, fontName: string, fontExtension: FontExtension, timeout: number): Promise<string>;
    /**
     * Is the font cached (already downloaded)
     * @param {*} fontName the full name of the font
     * @param {*} fontExtension the extension of the font, i.e. '.ttf' or '.otf'
     */
    isFontDownloaded(fontName: string, fontExtension: FontExtension): Promise<boolean>;
    readFontFromDisk(fontName: string, fontExtension: FontExtension): Promise<string | void>;
    deleteFontFromDisk(fontFullName: string): Promise<void>;
}
