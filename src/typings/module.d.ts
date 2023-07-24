declare namespace globalThis {
  // eslint-disable-next-line no-var
  var _UILIB_TESTING: boolean;
}

// This support importing png files, typing wise
declare module '*.png';

declare namespace JSX {
  interface IntrinsicAttributes {
    fsTagName?: string;
  }
}
