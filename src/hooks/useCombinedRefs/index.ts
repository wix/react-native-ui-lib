import _ from 'lodash';
import React from 'react';

const useCombinedRefs = (...refs: React.Ref<any>[]) => {
  const targetRef = React.useRef();
  console.log(refs);

  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) {
        return;
      }
      console.log('hello');
      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        // @ts-expect-error
        ref.current = targetRef.current;
      }
    });
  },
  _.isArray(refs) ? refs : [refs]);

  return targetRef;
};

export default useCombinedRefs;
