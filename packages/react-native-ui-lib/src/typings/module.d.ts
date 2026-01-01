declare namespace globalThis {
  // eslint-disable-next-line no-var
  var _UILIB_TESTING: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var _UILIB_TESTING: boolean;
}

// This support importing png files, typing wise
declare module '*.png';

import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicAttributes {
      fsTagName?: string;
    }
  }
}
