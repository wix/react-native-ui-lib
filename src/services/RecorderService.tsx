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

export type RecorderTag = RecorderTagEnum | `${RecorderTagEnum}`;

export interface RecorderProps {
  /**
   * Recorder tag
   */
  recorderTag?: RecorderTag;
};
