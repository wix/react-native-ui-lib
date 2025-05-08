import _ from 'lodash';
import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {View, Text, ListItem, Icon} from '../../index';
import FadedScrollView from '../../components/fadedScrollView';
import {Dialog} from '../../incubator';
import {withScrollReached, withScrollEnabler} from '../../commons/new';
import {Colors} from '../../style';
import GridOptions from './GridOptions';
import {
  ActionSheetProps,
  ActionSheetOptionProps,
  ActionSheetGridItemProps,
  ActionSheetDismissReason,
  ScrollReachedProps
} from './types';

export {ActionSheetProps, ActionSheetOptionProps, ActionSheetGridItemProps, ActionSheetDismissReason};

type SelectedOption = ActionSheetOptionProps | ActionSheetGridItemProps;
type Selection = {
  selectedOption: SelectedOption;
  selectedIndex: number;
};

const ActionSheet = (props: ActionSheetProps) => {
  const {
    dialogProps,
    footerCustomElement,
    options,
    gridOptions,
    onDismiss,
    testID,
    visible: propsVisibility,
    ...others
  } = props;

  const [visible, setVisible] = useState<boolean | undefined>(undefined);
  const selection = useRef<Selection | undefined>();

  useEffect(() => {
    if (propsVisibility && visible === undefined) {
      setVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsVisibility]);

  const invokeUserOnPress = useCallback(() => {
    selection.current?.selectedOption.onPress?.(selection.current?.selectedOption, selection.current?.selectedIndex);
  }, []);

  const resetSelected = useCallback(() => {
    selection.current = undefined;
  }, []);

  const onItemPress = useCallback(({customValue}: {customValue: Selection}) => {
    selection.current = customValue;
    if (selection.current?.selectedOption.avoidDismiss) {
      // do not dismiss (but notify the user the option was pressed)
      invokeUserOnPress();
      resetSelected();
      return;
    }
    setVisible(false);
  },
  [invokeUserOnPress, resetSelected, setVisible]);

  const invokeAfterActionSelected = useCallback(() => {
    invokeUserOnPress();
    onDismiss?.(ActionSheet.dismissReason.ACTION);
    resetSelected();
    setVisible(undefined);
  }, [invokeUserOnPress, onDismiss, resetSelected, setVisible]);

  const _onDismiss = useCallback(() => {
    if (!_.isUndefined(selection.current)) {
      invokeAfterActionSelected();
    } else {
      onDismiss?.(ActionSheet.dismissReason.CANCELED);
      resetSelected();
      setVisible(undefined);
    }
  }, [invokeAfterActionSelected, onDismiss, resetSelected, setVisible]);

  const _modalProps = useMemo(() => {
    const {modalProps} = dialogProps || {};
    return {accessibilityLabel: 'Close action menu', ...modalProps};
  }, [dialogProps]);

  const renderIcon = (icon: ActionSheetOptionProps['icon']) => {
    return <Icon {...icon}/>;
  };

  const renderSectionHeader = (option: ActionSheetOptionProps, index: number) => {
    const {key, title, titleStyle, sectionHeaderStyle, testID} = option;
    return (
      <View key={key || index} row spread style={sectionHeaderStyle} testID={testID}>
        <Text flex style={titleStyle} testID={`${testID}.title`}>
          {title}
        </Text>
      </View>
    );
  };

  const renderActionItem = (selectedOption: ActionSheetOptionProps, selectedIndex: number) => {
    return (
      <ListItem
        style={{backgroundColor: 'transparent'}}
        height={48}
        key={selectedIndex}
        testID={selectedOption.testID}
        onPress={() => onItemPress({customValue: {selectedOption, selectedIndex}})}
        activeBackgroundColor={Colors.$backgroundNeutralLight}
      >
        <View row paddingL-16 flex centerV>
          {renderIcon(selectedOption.icon)}
          <Text text70 $textDefault numberOfLines={1} style={selectedOption.titleStyle}>
            {selectedOption.title}
          </Text>
        </View>
      </ListItem>
    );
  };

  const renderList = () => {
    const {renderAction} = props;
    return (
      <View>
        {_.map(options as ActionSheetOptionProps, (option: ActionSheetOptionProps, index: number) => {
          const {isSectionHeader} = option;
          if (isSectionHeader) {
            return renderSectionHeader(option, index);
          } else {
            return renderAction ? renderAction(option, index) : renderActionItem(option, index);
          }
        })}
      </View>
    );
  };

  const _gridOptions = useMemo(() => {
    if (gridOptions) {
      return {
        ...gridOptions,
        options,
        onItemPress
      };
    }
  }, [gridOptions, options, onItemPress]);

  const content = () => {
    return (
      <FadedScrollView
        showsVerticalScrollIndicator={false}
        showStartFader={false}
        showEndFader
        keyboardShouldPersistTaps="always"
        useGestureHandlerRootView={false}
        {...props}
      >
        {_gridOptions ? <GridOptions {..._gridOptions}/> : renderList()}
        {footerCustomElement}
      </FadedScrollView>
    );
  };

  return (
    <Dialog
      visible={visible && propsVisibility}
      testID={testID}
      {...dialogProps}
      modalProps={_modalProps}
      onDismiss={_onDismiss}
      {...others}
    >
      {content()}
    </Dialog>
  );
};

ActionSheet.displayName = 'ActionSheet';
ActionSheet.dismissReason = ActionSheetDismissReason;

export default withScrollReached<ActionSheetProps>(withScrollEnabler<ScrollReachedProps>(ActionSheet));
