import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, findNodeHandle} from 'react-native';
import {BaseComponent} from '../../commons';
import View from '../view';
import Text from '../text';
import Button from '../button';
import {Colors} from '../../style';
import {HighlighterOverlayView} from '../../nativeComponents';

class FeatureHighlight extends BaseComponent {
  static propTypes = {
    visible: PropTypes.bool,
    getTarget: PropTypes.func,
    message: PropTypes.string,
    confirmButtonProps: PropTypes.object,
  };

  state = {};

  componentDidMount() {
    this.findTargetsNodes();
  }

  componentWillReceiveProps(nextProps) {
    this.findTargetsNodes(nextProps);
  }

  findTargetsNodes(props = this.props) {
    if (!this.state.node) {
      const target = props.getTarget();
      const node = findNodeHandle(target);
      this.setState({node});

      setTimeout(() => {
        target.measureInWindow((x, y, width, height) => {
          console.log('ethan - position', x, y);
          this.setState({
            targetPosition: {left: x, top: y, width, height},
          });
        });
      }, 0);
    }
  }

  getContentPositionStyle() {
    const {targetPosition} = this.state;
    const {top, height} = targetPosition || {};

    return {
      top: top + height,
      left: 0,
      right: 0,
      marginTop: 20,
    };
  }

  renderHighlightMessage() {
    const {message, confirmButtonProps} = this.props;
    return (
      <View style={[styles.highlightContent, this.getContentPositionStyle()]}>
        <Text text70 dark10>
          {message}
        </Text>
        <Button marginT-20 label="Got It" link {...confirmButtonProps} />
      </View>
    );
  }

  render() {
    const {visible} = this.props;
    const {node} = this.state;

    return (
      <HighlighterOverlayView highlightViewTag={node} visible={visible} overlayColor={Colors.rgba(Colors.dark80, 0.93)}>
        {this.renderHighlightMessage()}
      </HighlighterOverlayView>
    );
  }
}

const styles = StyleSheet.create({
  highlightContent: {
    position: 'absolute',
    padding: 14,
    alignItems: 'flex-start',
  },
});

export default FeatureHighlight;
