import { useMemo } from 'react';
import * as Modifiers from "../../commons/modifiers";
const useModifiers = (props, options) => {
  const modifiers = useMemo(() => {
    return Modifiers.generateModifiersStyle(options, props);
  }, [props]);
  return modifiers;
};
export default useModifiers;