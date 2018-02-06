import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, findNodeHandle} from 'react-native';
import {BaseComponent} from '../../commons';
import View from '../view';
import Text from '../text';
import Button from '../button';
import {Colors} from '../../style';
import {Constants} from '../../helpers';
import {HighlighterOverlayView} from '../../nativeComponents';

const defaultOverlayColor = Colors.rgba(Colors.black, 0.82);
const defaultStrokeColor = Colors.rgba(Colors.white, 0.12);
const defaultStrokeWidth = 12;
const contentViewPadding = Constants.isIOS ? 35 : 32;
const titleBottomMargin = Constants.isIOS ? 15 : 12;
const messageBottomMargin = Constants.isIOS ? 30 : 24;
const defaultButtonLabel = 'Got it';


class FeatureHighlight extends BaseComponent {
  static propTypes = {
    visible: PropTypes.bool,
    highlightFrame: PropTypes.object,
    getTarget: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    confirmButtonProps: PropTypes.object,
  };

  state = {};

  constructor(props) {
    super(props);
    this.getComponentDimensions = this.getComponentDimensions.bind(this);
  }

  componentDidMount() {
    this.findTargetsNodes();
  }

  componentWillReceiveProps(nextProps) {
    this.findTargetsNodes(nextProps);
  }

  findTargetsNodes(props = this.props) {
    if (!this.state.node) {
      if (props.getTarget !== undefined) {
        const target = props.getTarget();
        const node = findNodeHandle(target);
        this.setState({node});

        setTimeout(() => {
          target.measureInWindow((x, y, width, height) => {
            this.setState({
              targetPosition: {left: x, top: y, width, height},
            });
          });
        }, 0);
      } else {
        const frame = props.highlightFrame;
        this.setState({
          targetPosition: {left: frame.x, top: frame.y, width: frame.width, height: frame.height},
        });
      }
    }
  }

  getContentPositionStyle() {
    const {targetPosition} = this.state;
    const {top, height} = targetPosition || {};
    const screenVerticalCenter = Constants.screenHeight / 2;
    const targetCenter = top + (height / 2);
    const topPosition = (targetCenter > screenVerticalCenter) ? top - this.state.viewHeight : top + height;
    if (topPosition < 0 || topPosition + this.state.viewHeight > Constants.screenHeight) {
      console.warn('Content is too long and might appear off screen. ' +
        'Please adjust the message length for better results.');
    }
    return {top: topPosition};
  }

  // This method will be called more than once in case of layout change!
  getComponentDimensions(event) {
    const height = event.nativeEvent.layout.height;
    this.setState({viewHeight: height});
  }

  renderHighlightMessage() {
    const {title, message, confirmButtonProps} = this.props;
    return (
      <View style={[styles.highlightContent, this.getContentPositionStyle()]} onLayout={this.getComponentDimensions}>
        {title && (
          <Text text60 white style={styles.title}>
            {title}
          </Text>
        )}
        {message && (
          <Text text70 white style={styles.message}>
            {message}
          </Text>
        )}
        <Button
          label={defaultButtonLabel}
          size="small"
          outline
          outlineColor={Colors.white}
          {...confirmButtonProps}
        />
      </View>
    );
  }

  render() {
    const {visible, highlightFrame} = this.props;
    const {node} = this.state;

    return (
      <HighlighterOverlayView
        highlightViewTag={node}
        highlightFrame={highlightFrame}
        visible={visible}
        overlayColor={defaultOverlayColor}
        strokeColor={defaultStrokeColor}
        strokeWidth={defaultStrokeWidth}
      >
        {this.renderHighlightMessage()}
      </HighlighterOverlayView>
    );
  }
}

const styles = StyleSheet.create({
  highlightContent: {
    position: 'absolute',
    padding: contentViewPadding,
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: titleBottomMargin,
  },
  message: {
    marginBottom: messageBottomMargin,
  },
});

export default FeatureHighlight;
