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
}
