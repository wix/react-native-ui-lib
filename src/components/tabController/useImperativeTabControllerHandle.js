import { useImperativeHandle } from 'react';
const useImperativeTabControllerHandle = (ref, setCurrentIndex) => {
  useImperativeHandle(ref, () => {
    return {
      setTab: tabIndex => setCurrentIndex(tabIndex)
    };
  });
};
export default useImperativeTabControllerHandle;