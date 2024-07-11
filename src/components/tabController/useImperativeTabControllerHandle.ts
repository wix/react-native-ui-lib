import {type Ref, useImperativeHandle} from 'react';

export interface TabControllerImperativeMethods {
  setTab: (index: number) => void;
}

const useImperativeTabControllerHandle = (ref: Ref<TabControllerImperativeMethods>,
  setCurrentIndex: (index: number) => void) => {
  useImperativeHandle(ref, () => {
    return {
      setTab: (tabIndex: number) => setCurrentIndex(tabIndex)
    };
  });
};

export default useImperativeTabControllerHandle;
