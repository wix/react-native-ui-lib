import React, {Component} from 'react';
import {StyleSheet, ScrollView, LayoutAnimation} from 'react-native';
import {Assets, Colors, Typography, View, Drawer, Text, Button, Avatar, Badge, DrawerProps} from 'react-native-ui-lib';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import conversations from '../../data/conversations';

import {renderBooleanOption, renderSliderOption, renderColorOption} from '../ExampleScreenPresenter';

const ITEMS = {
  read: {
    icon: require('../../assets/icons/mail.png'),
    text: 'Read',
    background: Colors.green30,
    testID: 'left_item_read'
  },
  archive: {
    icon: require('../../assets/icons/archive.png'),
    text: 'Archive',
    background: Colors.blue30,
    testID: 'right_item_archive'
  },
  delete: {
    icon: require('../../assets/icons/delete.png'),
    text: 'Delete',
    background: Colors.red30,
    testID: 'right_item_delete'
  }
};

class DrawerScreen extends Component {
  state = {
    hideItem: false,
    showRightItems: true,
    fullSwipeRight: true,
    showLeftItem: true,
    fullSwipeLeft: true,
    unread: true,
    itemsTintColor: undefined,
    bounciness: undefined,
    itemsIconSize: undefined
  };

  ref: React.Ref<typeof Drawer> = null;

  componentDidUpdate(_prevProps: any, prevState: typeof this.state) {
    if (this.state.hideItem && prevState.hideItem) {
      this.showItem();
    }
  }

  deleteItem = () => {
    // TODO: consider including this functionality as part of the drawer component
    setTimeout(() => {
      LayoutAnimation.configureNext({
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleY
        },
        delete: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleY,
          duration: 2000
        },
        duration: 120
      });
      this.setState({hideItem: true});
    }, 200);
  };

  toggleReadState = () => {
    this.setState({unread: !this.state.unread});
  };

  showItem = () => {
    this.setState({hideItem: false});
  };

  openLeftDrawer = () => {
    if (this.ref) {
      // @ts-expect-error
      this.ref.openLeft();
    }
  };
  openLeftDrawerFull = () => {
    if (this.ref) {
      // @ts-expect-error
      this.ref.openLeftFull();
    }
  };
  toggleLeftDrawer = () => {
    if (this.ref) {
      // @ts-expect-error
      this.ref.toggleLeft();
    }
  };
  openRightDrawer = () => {
    if (this.ref) {
      // @ts-expect-error
      this.ref.openRight();
    }
  };
  openRightDrawerFull = () => {
    if (this.ref) {
      // @ts-expect-error
      this.ref.openRightFull();
    }
  };
  closeDrawer = () => {
    if (this.ref) {
      // @ts-expect-error
      this.ref.closeDrawer();
    }
  };

  renderActions() {
    return (
      <View center marginB-s4>
        <Text text70>Actions</Text>
        <View row>
          <View>
            <Button
              onPress={this.openLeftDrawer}
              label="Open left"
              style={{margin: 3}}
              size={'xSmall'}
              testID="open_left_btn"
            />
            <Button
              onPress={this.openLeftDrawerFull}
              label="Full left swipe"
              style={{margin: 3}}
              size={'xSmall'}
              testID="swipe_left_btn"
            />
            <Button
              onPress={this.toggleLeftDrawer}
              label="Left toggle"
              style={{margin: 3}}
              size={'xSmall'}
              testID="toggle_left_btn"
            />
          </View>

          <View marginH-20>
            <Button onPress={this.closeDrawer} label="Close" style={{margin: 3}} size={'xSmall'} testID="close_btn"/>
          </View>

          <View>
            <Button
              onPress={this.openRightDrawer}
              label="Open right"
              style={{margin: 3}}
              size={'xSmall'}
              testID="open_right_btn"
            />
            <Button
              onPress={this.openRightDrawerFull}
              label="Full right swipe"
              style={{margin: 3}}
              size={'xSmall'}
              testID="swipe_right_btn"
            />
          </View>
        </View>
      </View>
    );
  }

  renderListItem() {
    const data = conversations[2];

    return (
      <View
        bg-grey80
        paddingH-20
        paddingV-10
        row
        centerV
        style={{borderBottomWidth: 1, borderColor: Colors.grey60}}
        testID="drawer_item"
      >
        {this.state.unread && (
          <Badge testID="drawer_item_badge" size={6} backgroundColor={Colors.red30} containerStyle={{marginRight: 8}}/>
        )}
        <Avatar source={{uri: data.thumbnail}}/>
        <View marginL-20>
          <Text text70R={!this.state.unread} text70BO={this.state.unread}>
            {data.name}
          </Text>
          <Text text80 marginT-2>
            {data.text}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const {
      showRightItems,
      fullSwipeRight,
      showLeftItem,
      fullSwipeLeft,
      itemsTintColor,
      bounciness,
      itemsIconSize,
      hideItem
    } = this.state;

    const drawerProps: DrawerProps = {
      itemsTintColor,
      itemsIconSize,
      bounciness,
      // @ts-expect-error
      ref: component => (this.ref = component),
      fullSwipeRight,
      onFullSwipeRight: this.deleteItem,
      fullSwipeLeft,
      onWillFullSwipeLeft: this.deleteItem,
      onToggleSwipeLeft: this.toggleReadState,
      testID: 'drawer'
    };
    if (showRightItems) {
      drawerProps.rightItems = [{...ITEMS.delete, onPress: this.deleteItem}, ITEMS.archive];
    }

    if (showLeftItem) {
      drawerProps.leftItem = {
        ...ITEMS.read,
        icon: this.state.unread ? require('../../assets/icons/mail.png') : require('../../assets/icons/refresh.png'),
        text: !this.state.unread ? 'Unread' : 'Read',
        background: this.state.unread ? Colors.green30 : Colors.orange30,
        onPress: this.toggleReadState
      };
    }

    return (
      <View flex>
        <View row padding-20 paddingB-0 marginB-20 centerV>
          <Text text40>Drawer</Text>
          <Button
            link
            grey10
            marginL-s1
            marginT-2
            iconSource={Assets.icons.demo.refresh}
            onPress={this.showItem}
            disabled={!hideItem}
            testID="refresh_btn"
          />
        </View>
        {!hideItem && (
          <>
            <Drawer key={Date.now()} {...drawerProps}>
              {this.renderListItem()}
            </Drawer>
          </>
        )}

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View padding-20>
            {this.renderActions()}
            {renderBooleanOption.call(this, 'rightItems', 'showRightItems')}
            {showRightItems && renderBooleanOption.call(this, 'fullSwipeRight', 'fullSwipeRight')}
            {renderBooleanOption.call(this, 'leftItem', 'showLeftItem')}
            {showLeftItem && renderBooleanOption.call(this, 'fullSwipeLeft', 'fullSwipeLeft')}
            {renderColorOption.call(this, 'icon+text color', 'itemsTintColor')}
            {renderSliderOption.call(this, 'bounciness', 'bounciness', {
              min: 5,
              max: 15,
              step: 1,
              initial: 5
            })}
            {renderSliderOption.call(this, 'iconSize', 'itemsIconSize', {
              min: 15,
              max: 25,
              step: 1,
              initial: 20
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white
  },
  contentContainer: {
    paddingBottom: 50
  },
  drawer: {
    marginTop: 20
  },
  listContent: {
    backgroundColor: Colors.grey80
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey80
  },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.violet40,
    margin: 20
  },
  rowTitle: {
    ...Typography.text70,
    fontWeight: 'bold',
    color: Colors.grey20
  },
  rowSubtitle: {
    ...Typography.text80,
    color: Colors.grey30
  },
  rowButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 10
  }
});

export default gestureHandlerRootHOC(DrawerScreen);
