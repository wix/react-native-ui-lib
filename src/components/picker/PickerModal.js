import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';
import {Modal} from '../../screensComponents';

class PickerModal extends BaseComponent {
  static displayName = 'IGNORE';
  static propTypes = {
    ...Modal.propTypes,
    topBarProps: PropTypes.shape(Modal.TopBar.propTypes),
    scrollPosition: PropTypes.number,
  };

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

  onScrollViewLayout = ({nativeEvent: {layout: {height}}}) => {
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
    if (!scrollPosition) return;

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
        <ScrollView
          ref={r => (this.scrollView = r)}
          onLayout={this.onScrollViewLayout}
          onContentSizeChange={this.onScrollViewContentSizeChange}
        >
          <View style={this.styles.modalBody}>{children}</View>
        </ScrollView>
      </Modal>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    modalBody: {
      paddingTop: 30,
    },
  });
}

export default PickerModal;
