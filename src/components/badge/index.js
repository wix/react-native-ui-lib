import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../../style/colors';
import Typography from '../../style/typography';

/**
 * Round colored badge, typically used to show a number
 */
export default class Badge extends Component {

  static propTypes = {
    /**
     * Text to show inside the badge
     */
    label: React.PropTypes.string,
    /**
     * Color of the badge background
     */
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
    width: 24,
    height: 24,
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

