import React, {useImperativeHandle} from 'react';

export interface TabControllerImperativeMethods {
  setTab: (index: number) => void;
}

const useImperativeTabControllerHandle = (ref: React.Ref<any>, setCurrentIndex: (index: number) => void) => {
  useImperativeHandle(ref, () => {
    return {
      setTab: (tabIndex: number) => setCurrentIndex(tabIndex)
    };
  });
};

export default useImperativeTabControllerHandle;
