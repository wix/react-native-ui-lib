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

type DotExtendedString<T extends string> = `${T}.`;
export type PathArray<S extends string> = DotExtendedString<S> extends `${infer A}.${infer B}` ?
  A extends '' ? [] : [A, ...PathArray<B>]
  : [];

export type RecRecord<Path extends string[], K = {}> = Path extends [infer Next, ...infer Rest] ?
  {[P in Next] : RecRecord<Rest, K>}
  : K;

export type PathRecord<T extends string, K = {}> = RecRecord<PathArray<T>, K>;
