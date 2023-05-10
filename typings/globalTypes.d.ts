type Constructor<T, TA = any> = new(...args: TA[]) => T;
type ExtendTypeWith<T extends Constructor<any>, OtherObject extends object> = Constructor<InstanceType<T> & OtherObject, ConstructorParameters<T>>;
type Dictionary<TYPE> = {[key: string]: TYPE};


declare module 'react-native-measureme';

interface Extendable {
  [key: string]: any;
}

interface ThemeComponent {
  useCustomTheme?: boolean;
}
