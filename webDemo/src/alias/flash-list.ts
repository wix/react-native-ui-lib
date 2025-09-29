import * as React from 'react';

type AnyProps = {[key: string]: any};

export const FlashList: React.FC<AnyProps> = ({children}) => {
  return React.createElement('div', null, children);
};

export const AnimatedFlashList = FlashList;
export const MasonryFlashList = FlashList;

export default FlashList;


