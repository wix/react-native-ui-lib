type Constructor<T, TA = any> = new(...args: TA[]) => T;
type ExtendTypeWith<T extends Constructor<any>, OtherObject extends object> = Constructor<InstanceType<T> & OtherObject, ConstructorParameters<T>>;
type Dictionary<TYPE> = {[key: string]: TYPE};

// This support importing png files, typing wise
declare module '*.png';
declare module 'react-native-measureme';

declare interface Extendable {
  [key: string]: any;
}

declare interface ThemeComponent {
  useCustomTheme?: boolean;
}
