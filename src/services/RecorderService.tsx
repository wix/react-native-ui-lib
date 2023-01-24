/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      fsTagName?: string;
    }
  }
}

enum RecorderTagEnum {
    MASK = 'mask',
    UNMASK = 'unmask'
}

type RecorderTag = RecorderTagEnum | `${RecorderTagEnum}`

export {RecorderTag};
