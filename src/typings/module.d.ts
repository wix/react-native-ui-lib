declare namespace globalThis {
  // eslint-disable-next-line no-var
  var _UILIB_TESTING: boolean;
}

declare namespace JSX {
  interface IntrinsicAttributes {
    fsTagName?: string;
  }
}

// This support importing png files, typing wise
declare module '*.png';
