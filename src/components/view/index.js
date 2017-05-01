import React, {PropTypes} from 'react';
import {View as RNView, StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';

export default class View extends BaseComponent {

  static displayName = 'View';
  static propTypes = {
    ...RNView.propTypes,
    ...BaseComponent.propTypes,
    testId: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    const {backgroundColor, borderRadius, paddings, margins, alignments, flex} = this.state;
    const {style, left, top, right, bottom, ...others} = this.props;
    return (
      <RNView
        {...others}
        style={[
          this.styles.container,
          backgroundColor && {backgroundColor},
          borderRadius && {borderRadius},
          flex && {flex},
          paddings,
          margins,
          alignments,
          style,
        ]}
      >
        {this.props.children}
      </RNView>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
    },
  });
}
