import _ from 'lodash';
import React, {useCallback} from 'react';
import {StyleSheet, FlatList, TextInput, ListRenderItemInfo} from 'react-native';
import {Typography, Colors} from '../../style';
import Assets from '../../assets';
import Modal from '../modal';
import View from '../view';
import Icon from '../icon';
import {PickerItemProps, PickerItemsListProps} from './types';

const keyExtractor = (_item: string, index: number) => index.toString();

const PickerItemsList = (props: PickerItemsListProps) => {
  const {
    topBarProps,
    listProps,
    children,
    showSearch,
    searchStyle = {},
    searchPlaceholder = 'Search...',
    onSearchChange,
    renderCustomSearch,
    useSafeArea,
    testID
  } = props;

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

  return (
    <View bg-$backgroundDefault flex useSafeArea={useSafeArea}>
      <Modal.TopBar {...topBarProps}/>
      {renderSearchInput()}

      <FlatList
        data={_.times(React.Children.count(children))}
        // @ts-expect-error
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...listProps}
      />
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
