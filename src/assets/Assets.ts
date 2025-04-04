import _ from 'lodash';

type NestedObject<Path extends string, U> = Path extends `${infer Key}.${infer Rest}`
  ? {[K in Key]: NestedObject<Rest, U>}
  : {[K in Path]: U};

function assignProperties(a: unknown, b: {[key: string]: any}) {
  if (a) {
    Object.keys(b).forEach(key => {
      // @ts-ignore
      Object.defineProperty(a, key, Object.getOwnPropertyDescriptor(b, key));
    });
  }

  return a;
}

function ensurePath(obj: Record<string, any>, path: string) {
  let pointer = obj;

  const pathArray = path.split('.');
  const n = pathArray.length;

  for (let i = 0; i < n; i++) {
    const segment = pathArray[i];

    if (pointer[segment]) {
      const descriptor = Object.getOwnPropertyDescriptor(pointer, segment);
      if (descriptor?.get) {
        Object.defineProperty(pointer, segment, descriptor);
      }
    } else {
      pointer[segment] = pointer[segment] || {};
    }
    pointer = pointer[segment];
  }

  return pointer;
}

export const Assets = <T extends Record<string, unknown>>(initialAssets = {} as T) => {
  const assets = initialAssets;

  const loadAssetsGroup = <Path extends string, U extends Record<string, unknown>>(
    groupName: Path,
    assetsToLoad: U
  ) => {
    if (!_.isString(groupName)) {
      throw new Error('group name should be a string');
    }

    if (!_.isPlainObject(assetsToLoad)) {
      throw new Error('assets should be a hash map or a function (for lazy access)');
    }
    if (groupName === '') {
      assignProperties(assets, assetsToLoad);
    } else {
      assignProperties(ensurePath(assets, groupName), assetsToLoad);
    }
    return Assets(assets as T & NestedObject<Path, U>);
  };

  const build = () => {
    return assets;
  };

  return {
    loadAssetsGroup,
    build
  };
};
