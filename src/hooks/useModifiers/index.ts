import {useMemo} from 'react';
import * as Modifiers from '../../commons/modifiers';

type Options = Parameters<typeof Modifiers.generateModifiersStyle>[0];

const useModifiers = (props: any, options: Options) => {
  const modifiers = useMemo(() => {
    return Modifiers.generateModifiersStyle(options, props);
  }, [props]);
  return modifiers;
};

export default useModifiers;
