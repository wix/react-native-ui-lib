import React, { forwardRef, useEffect } from 'react';
// @ts-expect-error
import MaskedInputOld from "./old";
import MaskedInputNew, { MaskedInputProps } from "./new";
import { LogService } from "../../services";
function MaskedInputMigrator(props, refToForward) {
  const {
    migrate,
    ...others
  } = props;
  useEffect(() => {
    if (!migrate) {
      LogService.warn(`UILib MaskedInput implementation has been updated and now requires manual migration. To proceed, pass the "migrate" prop and check if the functionality works as expected.`);
    }
  }, []);
  if (migrate) {
    return <MaskedInputNew {...others} ref={refToForward} />;
  } else {
    return <MaskedInputOld {...others} ref={refToForward} />;
  }
}
export { MaskedInputProps };
export default forwardRef(MaskedInputMigrator);