import _ from 'lodash';
import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {BaseComponent} from '../../commons';
import View from '../view';
import Text from '../text';
import {Colors, Spacings, BorderRadiuses, Typography} from '../../style';
import {Constants} from '../../helpers';

/*eslint-disable*/
/**
 * @description: DialogView component's main purpose is for displaying custom content inside a Dialog with a little more slick UI
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DialogViewScreen.js
 *
 * The default rendering is:
 * <View>
 *   <header>
 *     title                <renderRightOfTitle
 *     message                                 />
 *     <renderBelowTitle/>
 *   </header>
 *   <content/>
 * </View>
 *
 * Note: if the user provides none of [title, message, renderRightOfTitle, renderBelowTitle, renderHeader] a header will not be rendered
 */
/*eslint-enable*/
export default class DialogView extends BaseComponent {
  static displayName = 'DialogView';
  static propTypes = {
    /**
     * Title
     */
    title: PropTypes.string,
    /**
     * A message below the title (subtitle)
     */
    message: PropTypes.string,
    /**
     * Should show the knob at the top of the header
     */
    showKnob: PropTypes.bool,
    /**
     * Should show the divider at the bottom of the header
     */
    showDivider: PropTypes.bool,
    /**
     * Renders to the right of the title
     */
    renderRightOfTitle: PropTypes.func,
    /**
     * Render below the title section
     */
    renderBelowTitle: PropTypes.func,
    /**
     * Renders the whole header
     * If this is provided the title, message, renderRightOfTitle, renderBelowTitle
     */
    renderHeader: PropTypes.func,
    /**
     * An alternative knob style
     */
    knobStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * An alternative divider style
     */
    dividerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * An alternative style surrounding the whole header
     */
    headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * An alternative style surrounding the title, message and the renderRightOfTitle
     */
    titleOuterContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * An alternative style surrounding both title and message
     */
    titleInnerContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * An alternative style for the title
     */
    titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * An alternative style for the message
     */
    messageStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * An alternative container style for the DialogView
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  renderKnob = () => {
    const {knobStyle} = this.getThemeProps();
    return <View style={[styles.knob, knobStyle]} />;
  };

  hasTitle = () => {
    const {title, message, renderRightOfTitle} = this.getThemeProps();
    return !_.isUndefined(title) || !_.isUndefined(message) || !_.isUndefined(renderRightOfTitle);
  };

  renderTitle = () => {
    const {
      testID,
      title,
      message,
      renderRightOfTitle,
      titleOuterContainerStyle,
      titleInnerContainerStyle,
      titleStyle,
      messageStyle,
    } = this.getThemeProps();

    return (
      <View style={[styles.titleOuterContainer, titleOuterContainerStyle]}>
        <View style={[styles.titleInnerContainer, titleInnerContainerStyle]}>
          <Text testID={`${testID}.title`} style={[styles.title, titleStyle]}>
            {title}
          </Text>
          {message && (
            <Text testID={`${testID}.message`} style={[styles.message, messageStyle]}>
              {message}
            </Text>
          )}
        </View>
        {renderRightOfTitle && renderRightOfTitle()}
      </View>
    );
  };

  renderDivider = () => {
    const {dividerStyle} = this.getThemeProps();
    return <View style={[styles.divider, dividerStyle]} />;
  };

  renderHeader = () => {
    const {headerStyle, showKnob, renderBelowTitle, showDivider} = this.getThemeProps();
    const hasTitle = this.hasTitle();

    return (
      <View style={[styles.header, headerStyle]}>
        {showKnob && this.renderKnob()}
        {hasTitle && this.renderTitle()}
        {renderBelowTitle && renderBelowTitle()}
        {showDivider && this.renderDivider()}
      </View>
    );
  };

  hasHeader = () => {
    const {showKnob, title, message, renderRightOfTitle, renderBelowTitle, renderHeader} = this.getThemeProps();
    return (
      showKnob ||
      !_.isUndefined(title) ||
      !_.isUndefined(message) ||
      !_.isUndefined(renderRightOfTitle) ||
      !_.isUndefined(renderBelowTitle) ||
      !_.isUndefined(renderHeader)
    );
  };

  render() {
    const {containerStyle, children} = this.getThemeProps();
    const hasHeader = this.hasHeader();

    return (
      <View style={[styles.container, containerStyle]}>
        {hasHeader && this.renderHeader()}
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadiuses.br60,
    overflow: 'hidden',
    margin: Spacings.s3,
    marginBottom: Constants.isIphoneX ? -Spacings.s2 : Spacings.s3,
  },
  header: {},
  knob: {
    alignSelf: 'center',
    width: 44,
    height: Spacings.s1,
    marginTop: Spacings.s2,
    marginBottom: Spacings.s2,
    backgroundColor: Colors.dark70,
    borderRadius: BorderRadiuses.br10,
  },
  titleOuterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleInnerContainer: {
    flex: 1,
  },
  title: {
    color: Colors.dark30,
    ...Typography.text60,
    marginHorizontal: Spacings.s5,
    marginBottom: Spacings.s2,
  },
  message: {
    color: Colors.dark30,
    ...Typography.text70,
    marginHorizontal: Spacings.s5,
    marginTop: -Spacings.s1,
    marginBottom: Spacings.s2,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: Colors.dark70,
  },
});
