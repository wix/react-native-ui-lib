import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Constants from '../../helpers/Constants';
import Colors from '../../style/colors';
import Typography from '../../style/typography';

export default class Badge extends Component {

  static propTypes = {
    label: React.PropTypes.string,
    color: React.PropTypes.string,
  };

  render() {
    return (<View style={[styles.badge, this.props.color && {backgroundColor: this.props.color}]}>
      <Text style={styles.count} numberOfLines={1} testID="badge">{this.props.label}</Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  badge: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: Colors.blue20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    ...Typography.text70,
    color: Colors.white,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

