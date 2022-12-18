import {SchemeType} from '../style';
import {AsyncStoragePackage} from 'optionalDeps';
interface ConfigOptions {
  /**
   * Should use platform colors for design tokens
   */
  usePlatformColors?: boolean;
  /**
   * The app's colors scheme (default | light | dark)
   */
  appScheme?: SchemeType;
}

class Config {
  usePlatformColors?: boolean;
  appScheme: SchemeType = 'light';

  constructor() {
    this.setConfig({});
  }

  public async setConfig(options: ConfigOptions) {
    const {usePlatformColors = false, appScheme = 'light'} = options;
    this.usePlatformColors = usePlatformColors;
    this.appScheme = await AsyncStoragePackage.getItem('appScheme') || appScheme;
  }

  public async setLocalScheme(scheme: SchemeType) { 
    if (AsyncStoragePackage) {
      await AsyncStoragePackage.setItem('appScheme', scheme);
    } else {
      console.error('RNUILib requires installing "@react-native-community/async-storage" dependency to use setLocalScheme');
    }
  }
}

export default new Config();
