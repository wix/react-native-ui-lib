import React from 'react';
const useCombinedRefs = (...refs) => {
  const targetRef = React.useRef();
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
  return targetRef;
};
export default useCombinedRefs;