import React, {PropTypes} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {LoaderScreen} from 'react-native-ui-lib';//eslint-disable-line
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import * as Assets from '../../assets';
import {Colors} from '../../style';

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
      return (<Button link onPress={onDone}>
        <Image style={this.styles.icon} source={doneIcon}/>
        <Text blue30 text70>{doneLabel}</Text>
      </Button>);
    }
    return null;
  }

  renderCancel() {
    const {cancelLabel, cancelIcon, onCancel} = this.props;
    if (onCancel && (cancelLabel || cancelIcon)) {
      return (
        <Button link onPress={onCancel}>
          <Image style={this.styles.icon} source={cancelIcon}/>
          <Text blue30 text70>{cancelLabel}</Text>
        </Button>
      );
    }
    return null;
  }

  render() {
    const {title} = this.props;

    return (
      <View style={this.styles.container}>
        <View style={[this.styles.part, this.styles.leftPart]}>
          {this.renderCancel()}
        </View>
        <View style={[this.styles.part, this.styles.middlePart]}>
          <Text text70 style={{fontWeight: '500'}}>{title}</Text>
        </View>
        <View style={[this.styles.part, this.styles.rightPart]}>
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
    part: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    leftPart: {
      paddingLeft: 20,
    },
    middlePart: {
      justifyContent: 'center',
    },
    rightPart: {
      justifyContent: 'flex-end',
      paddingRight: 20,
    },
    icon: {
      width: 16,
      height: 16,
      tintColor: Colors.dark10,
    },
  });
}
