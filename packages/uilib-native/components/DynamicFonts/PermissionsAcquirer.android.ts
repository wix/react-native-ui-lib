import {Platform, PermissionsAndroid} from 'react-native';
const AndroidOsVersion = Platform.OS === 'android' ? Platform.constants.Release : undefined;

export type PermissionsAcquirerProps = {
  requestPermissionsTitle?: string;
  requestPermissionsMessage?: string;
  requestPermissionsPositiveButtonText?: string;
  permissionsRefusalMessage?: string;
  permissionsErrorMessage?: string;
};

const DEFAULT_PERMISSIONS_ACQUIRER_PROPS: Required<PermissionsAcquirerProps> = {
  requestPermissionsTitle: 'Allow Storage Access',
  requestPermissionsMessage: 'Give the app permission to access the files and storage on your device.',
  requestPermissionsPositiveButtonText: 'Continue',
  permissionsRefusalMessage: 'Please edit your permission settings to continue.',
  permissionsErrorMessage: `We weren't able to obtain the required permissions. Please try Again.`
};

export default class PermissionsAcquirer {
  private readonly props;
  constructor(props: PermissionsAcquirerProps) {
    this.props = props;
  }

  public async checkPermissions() {
    return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
  }

  public async getPermissions() {
    if ((AndroidOsVersion && Number(AndroidOsVersion) >= 13) || (await this.checkPermissions())) {
      return Promise.resolve();
    }

    try {
      const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: this.props.requestPermissionsTitle ?? DEFAULT_PERMISSIONS_ACQUIRER_PROPS.requestPermissionsTitle,
        message: this.props.requestPermissionsMessage ?? DEFAULT_PERMISSIONS_ACQUIRER_PROPS.requestPermissionsMessage,
        buttonPositive:
          this.props.requestPermissionsPositiveButtonText ??
          DEFAULT_PERMISSIONS_ACQUIRER_PROPS.requestPermissionsPositiveButtonText
      });
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        return Promise.resolve();
      } else {
        return Promise.reject({
          source: 'uilib:FontDownloader:getPermissions',
          message: this.props.permissionsRefusalMessage ?? DEFAULT_PERMISSIONS_ACQUIRER_PROPS.permissionsRefusalMessage
        });
      }
    } catch (err) {
      return Promise.reject({
        source: 'uilib:FontDownloader:getPermissions',
        message: this.props.permissionsErrorMessage ?? DEFAULT_PERMISSIONS_ACQUIRER_PROPS.permissionsErrorMessage
      });
    }
  }
}
