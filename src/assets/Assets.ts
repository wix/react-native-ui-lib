import _ from 'lodash';

interface CustomObject {
  [key: string]: any;
}

function assignProperties(a: CustomObject, b: {[key: string]: any}) {
  if (a) {
    Object.keys(b).forEach(key => {
      // @ts-ignore
      Object.defineProperty(a, key, Object.getOwnPropertyDescriptor(b, key));
    });
  }

  return a;
}

function ensurePath(obj: CustomObject, path: string) {
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

export class Assets {
  [key: string]: any;

  loadAssetsGroup(groupName: string, assets: object) {
    if (!_.isString(groupName)) {
      throw new Error('group name should be a string');
    }

    if (!_.isPlainObject(assets)) {
      throw new Error('assets should be a hash map or a function (for lazy access)');
    }

    if (groupName === '') {
      assignProperties(this, assets);
    } else {
      assignProperties(ensurePath(this, groupName), assets);
    }

    return this;
  }

  getAssetByPath(path: string) {
    return _.get(this, path);
  }
}
