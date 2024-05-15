
/**
 * Adds dot at end of string.
 */
type DotExtendedString<T extends string> = `${T}.`;


/**
 * Converts path string to a an array of the path. Acts like split('.')
 *
 * Example: PathArray<'path1.path2.path3'> --> ['path1', 'path2', 'path3']
 */
type PathArray<S extends string> =
  DotExtendedString<S> extends `${infer A}.${infer B}` ? (A extends '' ? [] : [A, ...PathArray<B>]) : [];

/**
 * Creates a nested record with the nesting of path of the strings in the array that ends with object K.
 *
 * Example: NestedRecord<'path1.path2', {last: number}> --> {path1: { path2: {last: number}}}
 */
type NestedRecord<Path extends string[], K extends object = {}> = Path extends [infer Next, ...infer Rest]
  ? {[P in Next]: NestedRecord<Rest, K>}
  : K;

/**
 * Gets type of K at Path.
 */
type DeepGet<K extends object, Path extends string> = _DeepGet<K, PathArray<Path>>;

type _DeepGet<K extends object, T extends Array<string>> = T extends [infer First, ...infer Rest]
  ? First extends keyof K
    ? _DeepGet<K[First], Rest>
    : never
  : K;

/**
 * Create nested object from a PathString.
 *
 * Example: PathRecord<'path1.path2', {last: number}> --> {path1: { path2: {last: number}}}
 */
type PathRecord<T extends string, K = {}> = NestedRecord<PathArray<T>, K>;


/**
 * Combines a record at Path with existing record of an object or creates it if it doesn't exist.
 *
 * Example: AssertRecord<{path1: {path2: {last: number}}}, 'path1.path2', {reallyLast: string}> --> {path1: {path2: {last: number; reallyLast: string}}}
 */
export type AssetRecord<This extends object, Path extends string, Asset extends object = {}> = PathRecord<
  Path,
  DeepGet<This, Path> extends never ? Asset : (DeepGet<This, Path> & Asset)
>;
