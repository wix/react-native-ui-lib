import React, {PropTypes} from 'react';
import {View, TouchableHighlight, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';

import ListItemPart from './ListItemPart';

class ListItem extends BaseComponent {

  static displayName = 'ListItem';

  static propTypes = {
    /**
     * the list item height
     */
    height: PropTypes.number,
    /**
     * action for when pressing the item
     */
    onPress: PropTypes.func,
    /**
     * action for when long pressing the item
     */
    onLongPress: PropTypes.func,
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Use to identify the ListItem in tests
     */
    testID: PropTypes.string,
  };

  static defaultProps = {
    height: 63,
  }

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {style, onPress, onLongPress, testID} = this.props;
    const {pressed} = this.state;
    const containerStyle = this.extractContainerStyle(this.props);
    const animationProps = this.extractAnimationProps();
    const Container = (onPress || onLongPress) ? TouchableHighlight : View;

    return (
      <Container
        activeOpacity={1}
        style={[this.styles.container, containerStyle]}
        onPress={onPress}
        onLongPress={onLongPress}
        onHideUnderlay={() => this.setState({pressed: false})}
        onShowUnderlay={() => this.setState({pressed: true})}
        testID={testID}
      >
        <Animatable.View
          {...animationProps}
          style={[this.styles.innerContainer, style, pressed && this.styles.pressed]}
        >
          {this.props.children}
        </Animatable.View>
      </Container>
    );
  }
}

function createStyles({height}) {
  return StyleSheet.create({
    container: {
    },
    pressed: {
      backgroundColor: Colors.dark70,
    },
    innerContainer: {
      flexDirection: 'row',
      backgroundColor: Colors.white,
      height,
    },
  });
}

ListItem.Part = ListItemPart;

export default ListItem;
