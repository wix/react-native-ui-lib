import React from 'react';

const useCombinedRefs = <T>(...refs: React.Ref<any>[]) => {
  const targetRef = React.useRef(undefined);

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        // @ts-expect-error
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef as T;
};

export default useCombinedRefs;
