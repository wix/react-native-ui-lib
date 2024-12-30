import _ from 'lodash';
import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {View, Image, Text, ListItem, ButtonProps, ImageProps} from '../../index';
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
  const {visible: propsVisibility, onDismiss, dialogProps, footerCustomElement, gridOptions, testID, ...others} = props;

  const [visible, setVisible] = useState<boolean | undefined>(undefined);
  const selection = useRef<Selection | undefined>();

  useEffect(() => {}, [visible, propsVisibility]);

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

  const _headerProps = useMemo(() => {
    const {headerProps} = dialogProps || {};
    return {
      showKnob: true,
      showDivider: true,
      ...headerProps
    };
  }, [dialogProps]);

  const _modalProps = useMemo(() => {
    const {modalProps} = dialogProps || {};
    return {accessibilityLabel: 'Close action menu', ...modalProps};
  }, [dialogProps]);

  const handleRenderIcon = (option: ButtonProps) => {
    // @ts-ignore
    let source = option.icon;
    if (!source) {
      source = _.isFunction(option.iconSource) ? option.iconSource() : (option.iconSource as ImageProps['source']);
    }
    return source && renderIcon(source);
  };

  const renderIcon = (iconSource: ImageProps['source']) => {
    return <Image source={iconSource} resizeMode={'contain'} style={{width: 20, height: 20, marginRight: 16}}/>;
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
          {handleRenderIcon(selectedOption)}
          <Text text70 $textDefault numberOfLines={1} style={selectedOption.labelStyle}>
            {selectedOption.label}
          </Text>
        </View>
      </ListItem>
    );
  };

  const renderActions = () => {
    const {options, renderAction} = props;

    return (
      <View>
        {_.map(options, (option, index) => {
          return renderAction ? renderAction(option, index) : renderActionItem(option, index);
        })}
      </View>
    );
  };

  const renderList = () => {
    return (
      <View>
        {renderActions()}
        {footerCustomElement}
      </View>
    );
  };

  const content = () => {
    return (
      <FadedScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always" {...props}>
        {gridOptions ? (
          <GridOptions {...props} /* contentContainerStyle={styles.gridContentContainer} */ onItemPress={onItemPress}/>
        ) : (
          renderList()
        )}
        {footerCustomElement}
      </FadedScrollView>
    );
  };

  return (
    <Dialog
      visible={visible && propsVisibility}
      testID={testID}
      {...dialogProps}
      headerProps={_headerProps}
      modalProps={_modalProps}
      onDismiss={_onDismiss}
      {...others}
    >
      {content()}
    </Dialog>
  );
};

// const styles = StyleSheet.create({
//   listContentContainer: {
//     paddingTop: Spacings.s3,
//     paddingBottom: Spacings.s4
//   },
//   listContentContainerNoTitle: {
//     paddingTop: 0,
//     paddingBottom: Spacings.s4
//   },
//   gridContentContainer: {
//     paddingTop: Spacings.s8,
//     paddingBottom: Spacings.s1, // Spacings.s8 from guidelines - Spacings.s7 from gridItemContainerStyle (in GridOptions)
//     alignSelf: 'center'
//   },
//   footerCheckbox: {
//     marginVertical: Spacings.s5,
//     marginLeft: Spacings.s5
//   }
// });

ActionSheet.displayName = 'ActionSheet';
ActionSheet.dismissReason = ActionSheetDismissReason;

export default withScrollReached<ActionSheetProps>(withScrollEnabler<ScrollReachedProps>(ActionSheet));
