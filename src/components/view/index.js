import React, {PropTypes} from 'react';
import {View as RNView, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';

export default class View extends BaseComponent {

  static displayName = 'Text';
  static propTypes = {
    row: PropTypes.bool,
    ...RNView.propTypes,
    ...BaseComponent.propTypes,
    testId: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const backgroundColor = this.extractBackgroundColorValue();
    const {style, ...others} = this.props;
    return (
      <RNView
        {...others}
        style={[
          this.styles.container,
          backgroundColor && {backgroundColor},
          style,
        ]}
      >
        {this.props.children}
      </RNView>
    );
  }
}

function createStyles({row}) {
  return StyleSheet.create({
    container: {
      flexDirection: row ? 'row' : undefined,
    },
  });
}
