type DotExtendedString<T extends string> = `${T}.`;
type PathArray<S extends string> =
  DotExtendedString<S> extends `${infer A}.${infer B}` ? (A extends '' ? [] : [A, ...PathArray<B>]) : [];

type RecRecord<Path extends string[], K extends object = {}> = Path extends [infer Next, ...infer Rest]
  ? {[P in Next]: RecRecord<Rest, K>}
  : K;

type DeepGet<K extends object, T extends string> = _DeepGet<K, PathArray<T>>;

type _DeepGet<K extends object, T extends Array<string>> = T extends [infer First, ...infer Rest]
  ? First extends keyof K
    ? _DeepGet<K[First], Rest>
    : never
  : K;

type PathRecord<T extends string, K = {}> = RecRecord<PathArray<T>, K>;

export type AssetRecord<T extends string, K extends object = {}, This extends object> = PathRecord<
  T,
  DeepGet<This, T> extends never ? K : DeepGet<This, T> & K
>;
