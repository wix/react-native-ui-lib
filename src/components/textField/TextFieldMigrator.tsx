import React, {useEffect, forwardRef} from 'react';
import {mapKeys} from 'lodash';
import hoistStatics from 'hoist-non-react-statics';
import OldTextField from './index';
import NewTextField, {TextFieldStaticMembers} from '../../incubator/TextField';
import {LogService} from '../../services';

export interface TextFieldMigratorComponent extends React.ForwardRefExoticComponent<any>, TextFieldStaticMembers {}

const propsMigrationMap: Dictionary<string> = {
  /* LABEL */
  helperText: 'hint',
  title: 'label',
  titleColor: 'labelColor',
  titleStyle: 'labelStyle',
  /* CHAR COUNTER */
  showCharacterCounter: 'showCharCounter',
  transformer: 'formatter'
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
  const fixedProps = mapKeys(props, (value, key) => {
    if (propsMigrationMap[key] && value !== undefined) {
      LogService.deprecationWarn({component: 'TextField', oldProp: key, newProp: propsMigrationMap[key]});
      return propsMigrationMap[key];
    } else if (specialMigrationMap[key] && value !== undefined) {
      LogService.warn(`The new TextField implementation does not support the '${key}' prop. Please use the '${specialMigrationMap[key]}' instead`);
    } else if (customMessageMap[key] && value !== undefined) {
      LogService.warn(`The new TextField implementation does not support the '${key}' prop. ${customMessageMap[key]}`);
    }
    return key;
  });

  return fixedProps;
}

const TextFieldMigrator = forwardRef(({migrate = false, customWarning, ...props}: any, ref) => {
  useEffect(() => {
    if (!migrate) {
      LogService.warn(customWarning ??
          `RNUILib TextField component will soon be replaced with a new implementation, in order to start the migration - please pass the 'migrate' prop`);
    }
  }, []);

  if (migrate) {
    const migratedProps = migrateProps(props);
    // @ts-ignore
    return <NewTextField {...migratedProps} ref={ref}/>;
  } else {
    // @ts-expect-error
    return <OldTextField {...props} ref={ref}/>;
  }
}) as TextFieldMigratorComponent;

hoistStatics(TextFieldMigrator, NewTextField);
TextFieldMigrator.displayName = 'TextField';
export default TextFieldMigrator;
