export interface Extendable {
  [key: string]: any;
}

export type Constructor<T, TA = any> = new (...args: TA[]) => T;
export type ExtendTypeWith<T extends Constructor<any>, OtherObject extends object> = Constructor<
  InstanceType<T> & OtherObject,
  ConstructorParameters<T>
>;
export type Dictionary<TYPE> = {[key: string]: TYPE};

export type ComponentStatics<T> = Pick<T, keyof T>;
