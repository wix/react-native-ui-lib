import React from 'react';
export interface TabControllerImperativeMethods {
    setTab: (index: number) => void;
}
declare const useImperativeTabControllerHandle: (ref: React.Ref<TabControllerImperativeMethods>, setCurrentIndex: (index: number) => void) => void;
export default useImperativeTabControllerHandle;
