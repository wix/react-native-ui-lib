import React, {PropTypes} from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';


export default class Text extends BaseComponent {

  static displayName = 'Text';
  static propTypes = {
    ...RNText.propTypes,
    ...BaseComponent.propTypes,
    color: PropTypes.string,
    testId: PropTypes.string,
  };

  // static defaultProps = {
  //   color: Colors.dark10,
  // }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const color = this.props.color || this.extractColorValue();
    const typography = this.extractTypographyValue();
    const {style, ...others} = this.props;
    const {margins} = this.state;
    const textStyle = [this.styles.container, typography, color && {color}, margins, style];
    return (
      <RNText {...others} style={textStyle}>
        {this.props.children}
      </RNText>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
    },
  });
}
