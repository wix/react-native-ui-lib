import React, {PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors, Shadows, BorderRadiuses} from '../../style';
import {BaseComponent} from '../../commons';

import CardSection from './CardSection';
import CardItem from './CardItem';
import CardImage from './CardImage';

class Card extends BaseComponent {

  static displayName = 'Card';

  static propTypes = {
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.object,
    /**
     * Use to identify the button in tests
     */
    testId: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {testId} = this.props;
    const containerStyle = this.extractContainerStyle(this.props);
    return (
      <View style={[this.styles.container, containerStyle]} testId={testId}>
        <View style={this.styles.innerContainer}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

function createStyles() {
  // const customBorderRadius = _.isString(borderRadius) ? BorderRadiuses[borderRadius] : borderRadius;
  return StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      ...Shadows.white40.bottom,
    },
    innerContainer: {
      backgroundColor: Colors.white,
      borderRadius: BorderRadiuses.br40,
      overflow: 'hidden',
    },
  });
}

Card.Section = CardSection;
Card.Item = CardItem;
Card.Image = CardImage;

export default Card;
