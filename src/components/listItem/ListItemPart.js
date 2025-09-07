import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { asBaseComponent } from "../../commons/new";
import View from "../view";
import { ListItemPartProps } from "./types";

/**
 * @description: ListItem.Part, a sub ListItem component for layout-ing inside a ListItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.tsx
 */
class ListItemPart extends Component {
  static displayName = 'ListItem.Part';
  styles = createStyles(this.props);
  render() {
    const {
      containerStyle,
      ...others
    } = this.props;
    return <View style={[this.styles.container, containerStyle]} {...others}>
        {this.props.children}
      </View>;
  }
}
export { ListItemPartProps };
export default asBaseComponent(ListItemPart);
function createStyles({
  left,
  right,
  middle,
  column
}) {
  let justifyContent;
  if (!column) {
    justifyContent = 'space-between';
    if (left) {
      justifyContent = 'flex-start';
    }
    if (right) {
      justifyContent = 'flex-end';
    }
    if (middle) {
      justifyContent = 'space-between';
    }
  } else {
    justifyContent = 'center';
  }
  return StyleSheet.create({
    container: {
      flexDirection: column ? undefined : 'row',
      flex: middle ? 1 : 0,
      justifyContent,
      alignItems: column ? undefined : 'center'
    }
  });
}