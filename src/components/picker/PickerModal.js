import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ScrollView, TextInput} from 'react-native';
import _ from 'lodash';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import {Modal} from '../../screensComponents';
import View from '../view';
import Image from '../image';
import {Typography, Colors} from '../../style';
import Assets from '../../assets';

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
      selectionColor: PropTypes.string,
    }),
    searchPlaceholder: PropTypes.string,
    onSearchChange: PropTypes.func,
  };

  static defaultProps = {
    searchPlaceholder: 'Search...',
  }

  state = {
    scrollHeight: undefined,
    scrollContentHeight: undefined,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.scrollToSelected(nextProps.scrollPosition);
  }

  onScrollViewLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    this.setState({scrollHeight: height}, () => {
      this.scrollToSelected();
    });
  };

  onScrollViewContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({scrollContentHeight: contentHeight}, () => {
      this.scrollToSelected();
    });
  };

  scrollToSelected(scrollPosition = this.props.scrollPosition) {
    const isSearchFocused = _.invoke(this.search, 'isFocused');
    if (!scrollPosition || isSearchFocused) return;

    const {scrollHeight, scrollContentHeight} = this.state;
    if (this.scrollView && scrollHeight && scrollContentHeight) {
      const pageNumber = Math.floor(scrollPosition / scrollHeight);
      const numberOfPages = Math.ceil(scrollContentHeight / scrollHeight);

      if (pageNumber === numberOfPages - 1) {
        this.scrollView.scrollToEnd({animated: false});
      } else {
        this.scrollView.scrollTo({x: 0, y: pageNumber * scrollHeight, animated: false});
      }
    }
  }

  renderSearchInput() {
    const {showSearch, searchStyle, searchPlaceholder, onSearchChange} = this.props;
    if (showSearch) {
      return (
        <View style={this.styles.searchInputContainer}>
          <Image style={this.styles.searchIcon} source={Assets.icons.search}/>
          <TextInput
            ref={r => this.search = r}
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

  render() {
    const {visible, enableModalBlur, topBarProps, children} = this.props;
    return (
      <Modal
        animationType={'slide'}
        transparent={Constants.isIOS && enableModalBlur}
        enableModalBlur={Constants.isIOS && enableModalBlur}
        visible={visible}
        onRequestClose={topBarProps.onCancel}
      >
        <Modal.TopBar {...topBarProps} />
        {this.renderSearchInput()}
        <ScrollView
          ref={r => (this.scrollView = r)}
          onLayout={this.onScrollViewLayout}
          onContentSizeChange={this.onScrollViewContentSizeChange}
          keyboardShouldPersistTaps="always"
        >
          <View style={this.styles.modalBody}>{children}</View>
        </ScrollView>
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
      borderBottomColor: Colors.dark60,
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      height: 60,
      paddingRight: 16,
      flex: 1,
      ...Typography.text70,
    },
  });
}

export default PickerModal;
