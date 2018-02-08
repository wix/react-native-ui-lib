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
const defaultTextColor = Colors.white;
const defaultStrokeColor = Colors.rgba(Colors.white, 0.12);
const defaultStrokeWidth = 12;
const contentViewPadding = Constants.isIOS ? 35 : 32;
const titleBottomMargin = Constants.isIOS ? 15 : 12;
const messageBottomMargin = Constants.isIOS ? 30 : 24;
const defaultButtonLabel = 'Got it';

/**
 * @description: FeatureHighlight component for feature discovery
 * @extends: HighlighterOverlayView
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FeatureHighlightScreen.js
 */
class FeatureHighlight extends BaseComponent {
  static displayName = 'FeatureHighlight';
  static propTypes = {
    /**
     * Boolean to determine if to present the feature highlight component
     */
    visible: PropTypes.bool,
    /**
     * Frame of the area to highlight
     */
    highlightFrame: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    /**
     * Callback that extract the ref of the element to be highlighted
     */
    getTarget: PropTypes.func,
    /**
     * Title of the content to be displayed
     */
    title: PropTypes.string,
    /**
     * Message to be displayed
     */
    message: PropTypes.string,
    /**
     * Props that will be passed to the dismiss button
     */
    confirmButtonProps: PropTypes.object,
    /**
     * Color of the content's background (usually includes alpha for transparency)
     */
    overlayColor: PropTypes.string,
    /**
     * Color of the content's text
     */
    textColor: PropTypes.string,
    /**
     * Color of the border around the highlighted element
     */
    borderColor: PropTypes.string,
    /**
     * Width of the border around the highlighted element
     */
    borderWidth: PropTypes.number,
    /**
     * Use to identify the component in tests
     */
    testID: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getComponentDimensions = this.getComponentDimensions.bind(this);

    this.state = {
      ready: false,
    };
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
              ready: true,
            });
          });
        }, 0);
      } else {
        const frame = props.highlightFrame;
        if (frame) {
          this.setState({
            targetPosition: {left: frame.x, top: frame.y, width: frame.width, height: frame.height},
            ready: true,
          });
        }
      }
    }
  }

  getContentPositionStyle() {
    const {targetPosition, contentViewHeight} = this.state;
    const {top, height} = targetPosition || {};
    const screenVerticalCenter = Constants.screenHeight / 2;
    const targetCenter = top + (height / 2);
    const topPosition = (targetCenter > screenVerticalCenter) ? top - contentViewHeight : top + height;
    if (topPosition < 0 || topPosition + contentViewHeight > Constants.screenHeight) {
      console.warn('Content is too long and might appear off screen. ' +
        'Please adjust the message length for better results.');
    }
    return {top: topPosition};
  }

  // This method will be called more than once in case of layout change!
  getComponentDimensions(event) {
    const height = event.nativeEvent.layout.height;
    this.setState({contentViewHeight: height});
  }

  renderHighlightMessage() {
    const {title, message, confirmButtonProps, textColor} = this.getThemeProps();
    const color = textColor || defaultTextColor;

    return (
      <View style={[styles.highlightContent, this.getContentPositionStyle()]} onLayout={this.getComponentDimensions}>
        {title && (
          <Text text60 style={[styles.title, {color}]}>
            {title}
          </Text>
        )}
        {message && (
          <Text text70 style={[styles.message, {color}]}>
            {message}
          </Text>
        )}
        <Button
          label={defaultButtonLabel}
          size="small"
          outline
          outlineColor={color}
          {...confirmButtonProps}
        />
      </View>
    );
  }

  render() {
    const {testID, visible, highlightFrame, overlayColor, borderColor, borderWidth} = this.getThemeProps();
    const {node, ready} = this.state;

    return (
      <HighlighterOverlayView
        testID={testID}
        highlightViewTag={node}
        highlightFrame={highlightFrame}
        visible={visible && ready}
        overlayColor={overlayColor || defaultOverlayColor}
        strokeColor={borderColor || defaultStrokeColor}
        strokeWidth={borderWidth || defaultStrokeWidth}
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
