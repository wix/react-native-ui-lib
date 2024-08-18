import _ from 'lodash';
import React, {useCallback, useContext, useState, useMemo} from 'react';
import {StyleSheet, FlatList, TextInput, ListRenderItemInfo} from 'react-native';
import {Typography, Colors} from '../../style';
import Assets from '../../assets';
import Modal from '../modal';
import View from '../view';
import Text from '../text';
import Icon from '../icon';
import Button from '../button';
import WheelPicker from '../WheelPicker';
import {PickerItemProps, PickerItemsListProps, PickerSingleValue, PickerModes} from './types';
import PickerContext from './PickerContext';
import PickerItem from './PickerItem';
import {Constants} from '../../commons/new';

const keyExtractor = (_item: string, index: number) => index.toString();

const PickerItemsList = (props: PickerItemsListProps) => {
  const {
    useWheelPicker,
    topBarProps,
    listProps,
    children,
    items,
    showSearch,
    searchStyle = {},
    searchPlaceholder = 'Search...',
    onSearchChange,
    renderCustomSearch,
    renderHeader,
    useSafeArea,
    useDialog,
    mode,
    backgroundColor = Colors.$backgroundDefault,
    testID
  } = props;
  const context = useContext(PickerContext);

  const [wheelPickerValue, setWheelPickerValue] = useState<PickerSingleValue>(context.value ?? items?.[0]?.value);
  // TODO: Might not need this memoized style, instead we can move it to a stylesheet
  const wrapperContainerStyle = useMemo(() => {
    // const shouldFlex = Constants.isWeb ? 1 : useDialog ? 1 : 1;
    const shouldFlex = true;
    const style = {
      flex: shouldFlex ? 1 : 0,
      maxHeight: Constants.isWeb ? Constants.windowHeight * 0.75 : undefined,
      backgroundColor
    };
    return style;
  }, [
    backgroundColor
    /* useDialog */
  ]);

  const renderSearchInput = () => {
    if (showSearch) {
      if (_.isFunction(renderCustomSearch)) {
        return renderCustomSearch(props);
      }

      return (
        <View style={styles.searchInputContainer}>
          <Icon
            style={styles.searchIcon}
            tintColor={Colors.$iconDefault}
            source={searchStyle.icon || Assets.icons.search}
          />
          <TextInput
            testID={testID}
            // ref={r => (this.search = r)}
            style={[styles.searchInput, {color: searchStyle.color}]}
            placeholderTextColor={searchStyle.placeholderTextColor}
            selectionColor={searchStyle.selectionColor}
            placeholder={searchPlaceholder}
            // @ts-expect-error
            onChangeText={_.throttle(onSearchChange, 300)}
            autoCorrect={false}
            underlineColorAndroid="transparent"
          />
        </View>
      );
    }
  };

  const renderItem = useCallback(({index}: ListRenderItemInfo<PickerItemProps>) => {
    return React.Children.toArray(children)[index];
  },
  [children]);

  const renderPropItems = useCallback(({item}: ListRenderItemInfo<PickerItemProps>) => {
    return <PickerItem {...item}/>;
  }, []);

  const renderList = () => {
    if (items) {
      return (
        <FlatList
          testID={`${testID}.list`}
          data={items}
          renderItem={renderPropItems}
          keyExtractor={keyExtractor}
          {...listProps}
        />
      );
    }
    return (
      <FlatList
        data={_.times(React.Children.count(children))}
        // @ts-expect-error
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        testID={`${testID}.list`}
        {...listProps}
      />
    );
  };

  const renderCancel = () => {
    const {cancelButtonProps, cancelLabel, onCancel} = topBarProps ?? {};
    return (
      <>
        {cancelLabel ? (
          <Text text70 $textPrimary accessibilityRole={'button'} onPress={onCancel}>
            {cancelLabel}
          </Text>
        ) : cancelButtonProps ? (
          <Button key={'cancel-button'} link onPress={onCancel} {...cancelButtonProps}/>
        ) : undefined}
      </>
    );
  };

  const renderPickerHeader = () => {
    const {cancelButtonProps, cancelLabel, doneLabel, title, titleStyle, containerStyle, onDone, onCancel} =
      topBarProps ?? {};
    if (renderHeader) {
      return renderHeader?.({onDone, onCancel});
    } else if (useWheelPicker) {
      return (
        <View row spread padding-page style={containerStyle}>
          {(cancelButtonProps || cancelLabel) && renderCancel()}
          <Text style={titleStyle}>{title}</Text>
          <Text text70 $textPrimary accessibilityRole={'button'} onPress={() => context.onPress(wheelPickerValue)}>
            {doneLabel ?? 'Select'}
          </Text>
        </View>
      );
    } else if (!useDialog || mode === PickerModes.MULTI) {
      return <Modal.TopBar testID={`${props.testID}.topBar`} {...topBarProps}/>;
    }
  };

  const renderWheel = () => {
    return (
      <View useSafeArea={useSafeArea}>
        <WheelPicker
          flatListProps={listProps}
          initialValue={context.value as PickerSingleValue}
          items={items}
          onChange={setWheelPickerValue}
        />
      </View>
    );
  };

  const renderContent = () => {
    return useWheelPicker ? (
      renderWheel()
    ) : (
      <>
        {renderSearchInput()}
        {renderList()}
      </>
    );
  };

  return (
    <View style={wrapperContainerStyle} useSafeArea={useSafeArea}>
      {renderPickerHeader()}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  modalBody: {},
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.$outlineDefault
  },
  searchIcon: {
    marginRight: 12
  },
  searchInput: {
    height: 60,
    paddingRight: 16,
    flex: 1,
    ...Typography.text70
  }
});

export default PickerItemsList;
