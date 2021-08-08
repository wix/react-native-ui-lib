import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../style';
import {asBaseComponent} from '../../commons/new';
import TouchableOpacity from '../../components/touchableOpacity';
import View from '../view';
import ListItemPart from './ListItemPart';
import {ListItemProps} from './types';

type ListItemState = {
  pressed: boolean;
}

class ListItem extends Component<ListItemProps, ListItemState> {
  static displayName = 'ListItem';

  static defaultProps = {
    height: 63,
    containerElement: TouchableOpacity,
    underlayColor: Colors.dark70
  };

  static Part = ListItemPart;

  styles = createStyles(this.props.height);

  constructor(props: ListItemProps) {
    super(props);
    this.state = {
      pressed: false
    };
  }

  onHideUnderlay() {
    this.setPressed(false);
  }
  onShowUnderlay() {
    this.setPressed(true);
  }
  setPressed(isPressed: boolean) {
    this.setState({pressed: isPressed});
  }

  render() {
    const {
      containerElement,
      containerStyle,
      style,
      onPress,
      onLongPress,
      underlayColor,
      testID,
      ...others
    } = this.props;
    const {pressed} = this.state;
    const pressedStyle = {backgroundColor: underlayColor};
    const Container = onPress || onLongPress ? containerElement : View;

    return (
      <Container
        activeOpacity={1}
        style={[this.styles.container, containerStyle]}
        onPress={onPress}
        onLongPress={onLongPress}
        onHideUnderlay={this.onHideUnderlay}
        onShowUnderlay={this.onShowUnderlay}
        testID={testID}
        {...others}
      >
        <View style={[this.styles.innerContainer, style, pressed && pressedStyle]}>{this.props.children}</View>
      </Container>
    );
  }
}

function createStyles(height: ListItemProps['height']) {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.white
    },
    innerContainer: {
      flexDirection: 'row',
      height
    }
  });
}

export default asBaseComponent<ListItemProps>(ListItem);
