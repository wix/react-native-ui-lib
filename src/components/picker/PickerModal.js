import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, FlatList, TextInput} from 'react-native';
import {Constants} from '../../helpers';
import {Typography, Colors} from '../../style';
import Assets from '../../assets';
import {BaseComponent} from '../../commons';
import Modal from '../modal';
import View from '../view';
import Image from '../image';

class PickerModal extends BaseComponent {
  static displayName = 'IGNORE';

  static propTypes = {
    ...Modal.propTypes,
    topBarProps: PropTypes.shape(Modal.TopBar.propTypes),
    scrollPosition: PropTypes.number,
    showSearch: PropTypes.bool,
    searchStyle: PropTypes.shape({
      color: PropTypes.string,
      placeholderTextColor: PropTypes.string,
      selectionColor: PropTypes.string
    }),
    searchPlaceholder: PropTypes.string,
    onSearchChange: PropTypes.func,
    renderCustomSearch: PropTypes.elementType,
    listProps: PropTypes.object
  };

  static defaultProps = {
    searchPlaceholder: 'Search...',
    searchStyle: {}
  };

  state = {
    scrollHeight: undefined,
    scrollContentHeight: undefined
  };

  keyExtractor = (_item, index) => index.toString();

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  renderSearchInput() {
    const {showSearch, searchStyle, searchPlaceholder, onSearchChange, renderCustomSearch, testID} = this.props;

    if (showSearch) {
      if (_.isFunction(renderCustomSearch)) {
        return renderCustomSearch(this.props);
      }

      return (
        <View style={this.styles.searchInputContainer}>
          <Image style={this.styles.searchIcon} source={Assets.icons.search}/>
          <TextInput
            testID={testID}
            ref={r => (this.search = r)}
            style={[this.styles.searchInput, {color: searchStyle.color}]}
            placeholderTextColor={searchStyle.placeholderTextColor}
            selectionColor={searchStyle.selectionColor}
            placeholder={searchPlaceholder}
            onChangeText={_.throttle(onSearchChange, 300)}
            autoCorrect={false}
            underlineColorAndroid="transparent"
          />
        </View>
      );
    }
  }

  renderItem = ({index}) => {
    const {children} = this.props;
    return React.Children.toArray(children)[index];
  };

  render() {
    const {visible, enableModalBlur, topBarProps, listProps, children} = this.props;
    return (
      <Modal
        animationType={'slide'}
        transparent={Constants.isIOS && enableModalBlur}
        enableModalBlur={Constants.isIOS && enableModalBlur}
        visible={visible}
        onRequestClose={topBarProps.onCancel}
      >
        <Modal.TopBar {...topBarProps}/>
        {this.renderSearchInput()}

        <FlatList
          data={_.times(React.Children.count(children))}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          {...listProps}
        />
      </Modal>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    modalBody: {},
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: Colors.dark60
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
}

export default PickerModal;
