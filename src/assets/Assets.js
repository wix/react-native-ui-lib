import _ from 'lodash';

function assignProperties(a, b) {
  if (a && b) {
    for (const key in b) {
      if (b.hasOwnProperty(key)) {
        Object.defineProperty(a, key, Object.getOwnPropertyDescriptor(b, key));
      }
    }
  }

  return a;
}

function ensurePath(obj, path) {
  let pointer = obj;

  const pathArray = path.split('.');
  const n = pathArray.length;

  for (let i = 0; i < n; i++) {
    const segment = pathArray[i];
    pointer[segment] = pointer[segment] || {};
    pointer = pointer[segment];
  }

  return pointer;
}

export class Assets {
  loadAssetsGroup(groupName, assets) {
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
}
