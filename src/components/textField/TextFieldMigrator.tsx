import React, {forwardRef} from 'react';
import {mapKeys} from 'lodash';
// @ts-ignore
import OldTextField from './index';
import NewTextField from '../../incubator/TextField';
import {LogService} from '../../services';

const propsMigrationMap: Dictionary<string> = {
  /* LABEL */
  helperText: 'hint',
  title: 'label',
  titleColor: 'labelColor',
  titleStyle: 'labelStyle',
  /* CHAR COUNTER */
  showCharacterCounter: 'showCharCounter'
};

const specialMigrationMap: Dictionary<string> = {
  prefix: 'leadingAccessory',
  prefixStyle: 'leadingAccessory',
  rightIconSource: 'trailingAccessory',
  rightIconStyle: 'trailingAccessory',
  rightButtonProps: 'trailingAccessory',
  leadingIcon: 'leadingAccessory',
  useTopErrors: 'validationMessagePosition'
};

const customMessageMap: Dictionary<string> = {
  centered: `Pass textAlign to 'style' prop instead.`,
  error: `Use 'validationMessage' with 'validate' props`,
  expandable: 'This prop will not be supported anymore',
  renderExpandableInput: 'This prop will not be supported anymore',
  renderExpandable: 'This prop will not be supported anymore',
  onToggleExpandableModal: 'This prop will not be supported anymore',
  topBarProps: 'This prop will not be supported anymore',
  transformer: 'This prop will not be supported anymore'
};

function migrateProps(props: any) {
  const fixedProps = mapKeys(props, (_value, key) => {
    if (propsMigrationMap[key]) {
      LogService.deprecationWarn({component: 'TextField', oldProp: key, newProp: propsMigrationMap[key]});
      return propsMigrationMap[key];
    } else if (specialMigrationMap[key]) {
      LogService.warn(`The new TextField implementation does not support the '${key}' prop. Please use the '${specialMigrationMap[key]}' instead`);
    } else if (customMessageMap[key]) {
      LogService.warn(`The new TextField implementation does not support the '${key}' prop. ${customMessageMap[key]}`);
    }
    return key;
  });

  return fixedProps;
}

export default forwardRef(({migrate = false, ...props}: any, ref) => {
  if (migrate) {
    const migratedProps = migrateProps(props);
    // @ts-ignore
    return <NewTextField {...migratedProps} ref={ref}/>;
  } else {
    LogService.warn(`RNUILib TextField component will soon be replaced with a new implementation, in order to start the migration - please pass the 'migrate' prop`);
    return <OldTextField {...props} ref={ref}/>;
  }
});
