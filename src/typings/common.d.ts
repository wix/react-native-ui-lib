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

export type PathArray<S> = S extends `${infer A}.${infer B}`
  ? B extends `${infer C}.${infer D}`
    ? [A, C, ...PathArray<D>]
    : [A, B]
  : [S];
export type First<T extends any[]> = T extends [infer First, ...any] ? First : never;
export type Rest<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;

export type RecRecord<TPath extends string[], K extends object = {}> = TPath extends [infer C]
  ? C extends string
    ? {[P in C]: K}
    : never
  : {[P in First<TPath>] : RecRecord<Rest<TPath>, K>};

export type PathRecord<T extends string, K extends object> = T extends '' ? K : RecRecord<PathArray<T>, K>;
