import React from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import View from '../view';
import {asBaseComponent} from '../../commons/new';
import Image from '../image';
import {Spacings} from '../../style';
import TouchableOpacity from '../touchableOpacity';
import Text from '../text';

interface ChipProps {
  dismiss?: Function;
  label?: string;
  icon?: number;
  onPress?: Function;
  style?: StyleProp<ViewStyle>;
  /**
   * ChipItem's Background color.
   */
  /**
   * Selected ChipItem's background color.
   */
  selectedBackgroundColor?: string;
  /**
   * Color of the label.
   */
  labelColor?: string;
  /**
   * Selected chip's label color.
   */
  selectedLabelColor?: string;
  /**
   * Text to show to the right of the label or inside the Badge.
   */
  counterLabel?: string;
  /**
   * Color of the counter label.
   */
  counterColor?: string;
  /**
   * Color of the counter label when selected.
   */
  selectedCounterColor?: string;
  /**
   * Badge props object.
   */
  badge?: any;
  /**
   * Is the ChipItem selected.
   */
  selected?: string;
  /**
   * Outline color.
   */
  outlineColor?: string;
  /**
   * Selected outline color.
   */
  selectedOutlineColor?: string;

  textStyle?: object;
  /**
  * Add a dismiss button which when pressed will call this callback
  */
  onDismiss?: Function;

  dismissColor?: string;
  /**
   * Avatar object
   */
  avatar?: any;
}

const Chip: React.FC<ChipProps> = (props) => {
  const {avatar, onPress, index} = props;

  const Container = onPress ? TouchableOpacity : View;
  return (
    <Container
      index={index}
      activeOpacity={1}
      onPress={this.onPress}
      activeBackgroundColor={this.getActiveBackgroundColor()}
      backgroundColor={selected ? selectedBackgroundColor : backgroundColor}
      testID={testID}
      style={[
        styles.container,
        {
          paddingRight: useBadge ? Spacings.s2 : Spacings.s3,
          borderColor: selected ? selectedOutlineColor : outlineColor
        },
        shouldAnimateOut && styles.hidden
      ]}
    >
      {avatar && (
        <Avatar containerStyle={this.styles.avatar} {...avatar} size={20} />
      )}
      {icon && (
        <Image
          source={icon}
          tintColor={color}
          style={[this.styles.image, !emptyText && {marginRight: 6}]}
        />
      )}
      <Text
        text90M
        color={selected ? selectedLabelColor : labelColor}
        textAlign={'center'}
        testID={`${testID}.label`}
      >
        {label}
      </Text>
      <View style={styles.counterLabel}>
        {!_.isNil(counterLabel) && this.renderCounter()}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: Spacings.s7,
    minWidth: Spacings.s10,
    paddingLeft: Spacings.s3,
    borderWidth: 1,
    borderRadius: 14,
    marginHorizontal: Spacings.s1
  }
});

export default asBaseComponent<ChipProps>(Chip);
