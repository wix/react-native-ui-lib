import React, {PropTypes} from 'react';
import {StyleSheet, Image} from 'react-native';
import {LoaderScreen} from 'react-native-ui-lib';//eslint-disable-line
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import * as Assets from '../../assets';
import {Colors} from '../../style';
import View from '../../components/view';

import Button from '../../components/button';
import Text from '../../components/text';

export default class TopBar extends BaseComponent {

  static propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    doneLabel: PropTypes.string,
    donelIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    doneStyle: PropTypes.object,
    onDone: PropTypes.func,
    cancelLabel: PropTypes.string,
    cancelIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    cancelStyle: PropTypes.object,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    doneLabel: 'Save',
    cancelIcon: Assets.icons.x,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  renderDone() {
    const {doneLabel, doneIcon, onDone} = this.props;
    if (onDone && (doneLabel || doneIcon)) {
      return (
        <Button link onPress={onDone}>
          {doneIcon && <Image style={this.styles.icon} source={doneIcon}/>}
          {doneLabel && <Text numberOfLines={1} blue30 text70>{doneLabel}</Text>}
        </Button>
      );
    }
    return null;
  }

  renderCancel() {
    const {cancelLabel, cancelIcon, onCancel} = this.props;
    if (onCancel && (cancelLabel || cancelIcon)) {
      return (
        <Button link onPress={onCancel}>
          {cancelIcon && <Image style={this.styles.icon} source={cancelIcon}/>}
          {cancelLabel && <Text numberOfLines={1} blue30 text70>{cancelLabel}</Text>}
        </Button>
      );
    }
    return null;
  }

  render() {
    const {title} = this.props;

    return (
      <View style={this.styles.container}>
        <View row flex bottom paddingL-15>
          {this.renderCancel()}
        </View>
        <View row flex-3 bottom centerH>
          <Text numberOfLines={1} text70 style={this.styles.title}>{title}</Text>
        </View>
        <View row flex bottom right paddingR-15>
          {this.renderDone()}
        </View>
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 32 + Constants.statusBarHeight,
    },
    title: {
      fontWeight: '500',
    },
    icon: {
      width: 16,
      height: 16,
      tintColor: Colors.dark10,
      marginBottom: 2,
    },
  });
}
