import _ from 'lodash';
import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet, FlatList, TextInput, ListRenderItemInfo} from 'react-native';
import {Typography, Colors} from '../../style';
import Assets from '../../assets';
import Modal from '../modal';
import View from '../view';
import Text from '../text';
import Icon from '../icon';
import WheelPicker from '../../incubator/WheelPicker';
import {PickerItemProps, PickerItemsListProps, PickerSingleValue} from './types';
import PickerContext from './PickerContext';

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
    useSafeArea,
    testID
  } = props;
  const context = useContext(PickerContext);
  const [wheelPickerValue, setWheelPickerValue] = useState<PickerSingleValue>(context.value ?? items?.[0].value);

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

  const renderList = () => {
    return (
      <FlatList
        data={_.times(React.Children.count(children))}
        // @ts-expect-error
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...listProps}
      />
    );
  };

  const renderWheel = () => {
    return (
      <View>
        <View row spread padding-page>
          <Text>{topBarProps?.title}</Text>
          <Text text70 $textPrimary accessibilityRole={'button'} onPress={() => context.onPress(wheelPickerValue)}>
            {topBarProps?.doneLabel ?? 'Select'}
          </Text>
        </View>
        <WheelPicker
          flatListProps={listProps}
          initialValue={context.value as PickerSingleValue}
          items={items}
          onChange={setWheelPickerValue}
        />
      </View>
    );
  };

  return (
    <View bg-$backgroundDefault flex useSafeArea={useSafeArea}>
      {!useWheelPicker && (
        <>
          {<Modal.TopBar {...topBarProps}/>}
          {renderSearchInput()}
          {renderList()}
        </>
      )}

      {useWheelPicker && renderWheel()}
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
