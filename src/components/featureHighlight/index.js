import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, findNodeHandle, TouchableWithoutFeedback} from 'react-native';
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
const contentViewRightMargin = Constants.isIOS ? 45 : 46;
const titleBottomMargin = Constants.isIOS ? 15 : 12;
const messageBottomMargin = Constants.isIOS ? 30 : 24;
const messageLineHeight = 22;
const defaultButtonLabel = 'Got it';

/*eslint-disable*/
/**
 * @description: FeatureHighlight component for feature discovery
 * @notes: 1) FeatureHighlight component must be a direct child of the root view returned in render()., 2) If the element to be highlighted doesn't have a style attribute add 'style={{opacity: 1}}' so the Android OS can detect it.
 * @extends: HighlighterOverlayView
 * @extendslink: docs/HighlighterOverlayView
 * @notes: 1) The component MUST be a direct child of the root view returned in render()., 2) If the element to be highlighted doesn't have a style attribute add 'style={{opacity: 1}}' so the Android OS can detect it.
 * @extends: HighlighterOverlayView
 * @gif: https://media.giphy.com/media/3ohs4D5irZm5GojsDS/giphy.gif, https://media.giphy.com/media/3oxQNaDQckPZI78rWo/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FeatureHighlightScreen.js
 */
/*eslint-enable*/
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
     * Title's max number of lines
     */
    titleNumberOfLines: PropTypes.number,
    /**
     * Message's max number of lines
     */
    messageNumberOfLines: PropTypes.number,
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
     * The minimum size of the highlighted component (Android API 21+, and only when passing a ref in 'getTarget')
     */
    minimumRectSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    /**
     * The padding of the highlight frame around the highlighted element's frame (only when passing ref in 'getTarget')
     */
    innerPadding: PropTypes.number,
    /**
     * Use to identify the component in tests
     */
    testID: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.getComponentDimensions = this.getComponentDimensions.bind(this);
  }

  static defaultProps = {
    titleNumberOfLines: 1,
    messageNumberOfLines: 5,
    minimumRectSize: {width: 56, height: 56},
    innerPadding: 10,
  };

  componentWillReceiveProps(nextProps) {
    this.setTargetPosition(nextProps);
  }

  findTargetNode(target) {
    return findNodeHandle(target);
  }

  setTargetPosition(props = this.props) {
    if (!this.state.node) {
      if (props.getTarget !== undefined) {
        const target = props.getTarget();

        const node = this.findTargetNode(target);
        this.setState({node});

        if (target) {
          setTimeout(() => {
            target.measureInWindow((x, y, width, height) => {
              this.setState({
                targetPosition: {left: x, top: y, width, height},
              });
            });
          }, 0);
        }
      } else {
        const frame = props.highlightFrame;
        if (frame) {
          this.setState({
            targetPosition: {left: frame.x, top: frame.y, width: frame.width, height: frame.height},
          });
        }
      }
    }
  }

  getContentPositionStyle() {
    const {highlightFrame, minimumRectSize, innerPadding} = this.props;
    const {targetPosition, contentViewHeight} = this.state;
    const {top, height} = targetPosition || {};
    const screenVerticalCenter = Constants.screenHeight / 2;
    const targetCenter = top + (height / 2);
    const isAlignedTop = targetCenter > screenVerticalCenter;
    let topPosition = isAlignedTop ? top - contentViewHeight : top + height;
    if (!highlightFrame && !isAlignedTop) {
      const minRectHeight = minimumRectSize.height;
      const isUnderMin = height >= minRectHeight;
      topPosition = isUnderMin ? topPosition + innerPadding : targetCenter + (minRectHeight / 2) + (innerPadding / 2);
    }
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
    const {title, message, confirmButtonProps, textColor, titleNumberOfLines, messageNumberOfLines}
      = this.getThemeProps();
    const color = textColor || defaultTextColor;

    return (
      <View
        style={[styles.highlightContent, this.getContentPositionStyle()]}
        onLayout={this.getComponentDimensions}
        pointerEvents="box-none"
      >
        {title && (
          <Text text60 style={[styles.title, {color}]} numberOfLines={titleNumberOfLines} pointerEvents="none">
            {title}
          </Text>
        )}
        {message && (
          <Text text70 style={[styles.message, {color}]} numberOfLines={messageNumberOfLines} pointerEvents="none">
            {message}
          </Text>
        )}
        <Button
          label={defaultButtonLabel}
          size="small"
          outline
          outlineColor={color}
          activeBackgroundColor={Colors.rgba(color, 0.3)}
          {...confirmButtonProps}
        />
      </View>
    );
  }

  render() {
    const {testID, visible, highlightFrame, overlayColor, borderColor, borderWidth, minimumRectSize, innerPadding,
      confirmButtonProps} = this.getThemeProps();
    const {node, targetPosition} = this.state;
    const {onPress} = confirmButtonProps;

    return (
      <HighlighterOverlayView
        testID={testID}
        highlightViewTag={node}
        highlightFrame={highlightFrame}
        visible={visible}
        overlayColor={overlayColor || defaultOverlayColor}
        strokeColor={borderColor || defaultStrokeColor}
        strokeWidth={borderWidth || defaultStrokeWidth}
        minimumRectSize={minimumRectSize}
        innerPadding={innerPadding}
      >
        <TouchableWithoutFeedback style={styles.touchableOverlay} onPress={onPress}>
          <View flex/>
        </TouchableWithoutFeedback>
        {targetPosition && this.renderHighlightMessage()}
      </HighlighterOverlayView>
    );
  }
}

const styles = StyleSheet.create({
  highlightContent: {
    position: 'absolute',
    padding: contentViewPadding,
    marginRight: contentViewRightMargin,
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: '500',
    marginBottom: titleBottomMargin,
  },
  message: {
    marginBottom: messageBottomMargin,
    lineHeight: messageLineHeight,
  },
  touchableOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default FeatureHighlight;
