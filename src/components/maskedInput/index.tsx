import React, {forwardRef} from 'react';
// @ts-expect-error
import MaskedInputOld from './old';
import MaskedInputNew from './new';

function MaskedInputMigrator(props: any, refToForward: any) {
  const {migrate, ...others} = props;

  if (migrate) {
    return <MaskedInputNew {...others} ref={refToForward}/>;
  } else {
    return <MaskedInputOld {...others} ref={refToForward}/>;
  }
}

export default forwardRef(MaskedInputMigrator);
