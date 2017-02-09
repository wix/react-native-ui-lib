import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../../style/colors';
import {BaseComponent} from '../../commons';
import {Typography, ThemeManager} from '../../style';

/**
 * Round colored badge, typically used to show a number
 */
export default class Badge extends BaseComponent {
  static displayName = 'Badge';
  static propTypes = {
    /**
     * Text to show inside the badge
     */
    label: React.PropTypes.string,
    /**
     * Color of the badge background
     */
    backgroundColor: React.PropTypes.string,
    /**
     * Additional styles for the top container
     */
    containerStyle: React.PropTypes.object,
  };

  generateStyles() {
    this.styles = createStyles();
  }

  render() {
    const containerStyle = this.extractContainerStyle(this.props);
    const backgroundStyle = this.props.backgroundColor && {backgroundColor: this.props.backgroundColor};
    return (
      <View style={[this.styles.badge, containerStyle, backgroundStyle]}>
        <Text style={this.styles.count} numberOfLines={1} testID="badge">{this.props.label}</Text>
      </View>
    );
  }
}

function createStyles() {
  const styles = StyleSheet.create({
    badge: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: ThemeManager.primaryColor,
      alignItems: 'center',
      justifyContent: 'center',
    },
    count: {
      ...Typography.text90,
      color: Colors.white,
      backgroundColor: 'rgba(0,0,0,0)',
    },
  });
  return styles;
}
