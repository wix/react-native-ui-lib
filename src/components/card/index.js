import React, {PropTypes} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Shadows, BorderRadiuses} from '../../style';
import {Constants} from '../../helpers';
import {BaseComponent} from '../../commons';

import CardSection from './CardSection';
import CardItem from './CardItem';
import CardImage from './CardImage';

class Card extends BaseComponent {

  static displayName = 'Card';

  static propTypes = {
    /**
     * card custom width
     */
    width: PropTypes.number,
    /**
     * card custom height
     */
    height: PropTypes.number,
    /**
     * action for when pressing the card
     */
    onPress: PropTypes.func,
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Use to identify the button in tests
     */
    testId: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {onPress, style, containerStyle, testId} = this.props;
    // const containerStyle =  this.extractContainerStyle(this.props);
    const Container = onPress ? TouchableOpacity : View;
    return (
      <Container style={[this.styles.container, containerStyle]} onPress={onPress} testId={testId}>
        <View style={[this.styles.innerContainer, style]}>
          {this.props.children}
        </View>
      </Container>
    );
  }
}

function createStyles({width, height}) {
  // const customBorderRadius = _.isString(borderRadius) ? BorderRadiuses[borderRadius] : borderRadius;
  return StyleSheet.create({
    container: {
      width,
      height,
      backgroundColor: 'transparent',
      ...Shadows.white40.bottom,
    },
    innerContainer: {
      backgroundColor: Colors.white,
      borderRadius: Constants.isIOS ? BorderRadiuses.br40 : BorderRadiuses.br10,
      overflow: 'hidden',
      flexGrow: 1,
    },
  });
}

Card.Section = CardSection;
Card.Item = CardItem;
Card.Image = CardImage;

export default Card;
