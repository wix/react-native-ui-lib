declare namespace globalThis {
  // eslint-disable-next-line no-var
  var _UILIB_TESTING: boolean;
}

declare namespace JSX {
  interface IntrinsicAttributes {
    fsTagName?: string;
  }
}

declare type Constructor<T, TA = any> = new(...args: TA[]) => T;
declare type ExtendTypeWith<T extends Constructor<any>, OtherObject extends object> = Constructor<InstanceType<T> & OtherObject, ConstructorParameters<T>>;
declare type Dictionary<TYPE> = {[key: string]: TYPE};

// This support importing png files, typing wise
declare module '*.png';
declare module 'react-native-measureme';

declare interface Extendable {
  [key: string]: any;
}

declare interface ThemeComponent {
  useCustomTheme?: boolean;
}
