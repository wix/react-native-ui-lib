import {Platform} from 'react-native';
import RNFS from './RNFSPackage';
import {FontExtension} from './FontLoader';

const DEFAULT_DYNAMIC_FONTS_FOLDER = '/dynamicFonts';
const DEFAULT_DOWNLOAD_ERROR_MESSAGE = 'An error occurred downloading the file:';

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

// TODO: this can probably be a more general "downloader" if we so choose
export default class FontDownloader {
  private readonly props: FontDownloaderProps;
  private readonly fs: NonNullable<typeof RNFS>;

  constructor(props: FontDownloaderProps) {
    this.props = {
      dynamicFontsFolder: DEFAULT_DYNAMIC_FONTS_FOLDER,
      downloadErrorMessage: DEFAULT_DOWNLOAD_ERROR_MESSAGE,
      ...props
    };

    if (!RNFS) {
      throw new Error(`RNUILib FontDownloader requires installing "react-native-fs" dependency`);
    }
    this.fs = RNFS;
  }

  private getPrivateFolder() {
    const {dynamicFontsFolder} = this.props;
    return (
      (Platform.OS === 'android' ? this.fs.ExternalDirectoryPath : this.fs.DocumentDirectoryPath) + dynamicFontsFolder
    );
  }

  private getPrivateFilePath(fileName: string) {
    return this.getPrivateFolder() + '/' + fileName;
  }

  private getFileName(fontName: string, fontExtension: FontExtension) {
    return fontName + '.' + fontExtension;
  }

  private async _isFontDownloaded(fileName: string) {
    const privateFilePath = this.getPrivateFilePath(fileName);
    return await this.fs.exists(privateFilePath);
  }

  private async createPrivateFolderIfNeeded() {
    const privateFolder = this.getPrivateFolder();
    if (!(await this.fs.exists(privateFolder))) {
      await this.fs.mkdir(privateFolder);
    }
  }

  private getDownloadFontOptions(fontUri: string, downloadLocation: string, readTimeout: number) {
    const platformSpecificOptions =
      Platform.OS === 'ios'
        ? {
          background: false,
          discretionary: true,
          cacheable: false
        }
        : {
          connectionTimeout: readTimeout
        };

    return {
      fromUrl: fontUri,
      toFile: downloadLocation,
      // TODO: It is possible to add a better progress, maybe for slower networks
      // progress: ({bytesWritten, contentLength}: {bytesWritten: number; contentLength: number}) => {},
      ...platformSpecificOptions,
      fileCache: false,
      readTimeout
    };
  }

  /**
   * Download the font
   * @param fontUri the remote location of the font
   * @param fontName the full name of the font
   * @param fontExtension the extension of the font, i.e. '.ttf' or '.otf'
   * @param timeout a timeout for the download to fail after
   * @returns the full path of the download
   */
  public async downloadFont(fontUri: string,
    fontName: string,
    fontExtension: FontExtension,
    timeout: number): Promise<string> {
    const {downloadErrorMessage} = this.props;
    await this.createPrivateFolderIfNeeded();
    const fileName = this.getFileName(fontName, fontExtension);
    const downloadLocation = this.getPrivateFilePath(fileName);

    try {
      const result = await this.fs.downloadFile(this.getDownloadFontOptions(fontUri, downloadLocation, timeout))
        .promise;
      if (result.statusCode === 200) {
        return downloadLocation;
      } else {
        return Promise.reject({
          source: 'uilib:FontDownloader:downloadFont',
          message: `${downloadErrorMessage} fontName: ${fontName} statusCode: ${result.statusCode}`
        });
      }
    } catch (error) {
      return Promise.reject({
        source: 'uilib:FontDownloader:downloadFont',
        message: `${downloadErrorMessage} fontName: ${fontName} error: ${error}`
      });
    }
  }

  /**
   * Is the font cached (already downloaded)
   * @param {*} fontName the full name of the font
   * @param {*} fontExtension the extension of the font, i.e. '.ttf' or '.otf'
   */
  public async isFontDownloaded(fontName: string, fontExtension: FontExtension): Promise<boolean> {
    const fileName = this.getFileName(fontName, fontExtension);
    return await this._isFontDownloaded(fileName);
  }

  public async readFontFromDisk(fontName: string, fontExtension: FontExtension): Promise<string | void> {
    let base64FontString;
    const fileName = this.getFileName(fontName, fontExtension);
    const privateFilePath = this.getPrivateFilePath(fileName);
    if (await this.fs.exists(privateFilePath)) {
      base64FontString = await this.fs.readFile(privateFilePath, 'base64').catch(() => {});
    }

    return base64FontString;
  }
}
