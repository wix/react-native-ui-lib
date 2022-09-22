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
};

/**
 * @description: List item component to render inside a List component
 * @extends: TouchableOpacity
 * @gif: https://media.giphy.com/media/l1IBjHowyPcOTWAY8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.tsx
 */
class ListItem extends Component<ListItemProps, ListItemState> {
  static displayName = 'ListItem';

  static defaultProps = {
    height: 63,
    containerElement: TouchableOpacity,
    underlayColor: Colors.grey70
  };

  static Part: typeof ListItemPart;

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

  renderViewContainer = () => {
    const {pressed} = this.state;
    const {containerStyle, style, underlayColor, ...others} = this.props;
    const pressedStyle = {backgroundColor: underlayColor};
    return (
      <View style={[this.styles.container, containerStyle]} {...others}>
        <View style={[this.styles.innerContainer, style, pressed && pressedStyle]}>{this.props.children}</View>
      </View>
    );
  };

  renderCustomContainer = (Container: React.ComponentType) => {
    const {...others} = this.props;
    return <Container {...others}>{this.renderChildren()}</Container>;
  };

  renderChildren = () => {
    const {pressed} = this.state;
    const {underlayColor, style, children} = this.props;
    const pressedStyle = {backgroundColor: underlayColor};
    return <View style={[this.styles.innerContainer, style, pressed && pressedStyle]}>{children}</View>;
  };

  render() {
    const {containerElement} = this.props;
    return containerElement ? this.renderCustomContainer(containerElement) : this.renderViewContainer();
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

export {ListItemProps};

ListItem.Part = ListItemPart;

export default asBaseComponent<ListItemProps, typeof ListItem>(ListItem);
