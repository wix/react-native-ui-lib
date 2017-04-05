import React, {Component} from 'react';
import {View} from 'react-native';
import {GridList, Avatar, Badge, AvatarHelper, Colors, Card, Constants, Text, SelectableComponent} from 'react-native-ui-lib';//eslint-disable-line

const plusIcon = require('../../assets/icons/plus.png');

export class ProducItem extends SelectableComponent {

  static itemsPerRow = 2;

  renderSelectableContainer() {
    return (
      <View style={{position: 'absolute', top: 15, right: 15}}>
        {this.renderSelectableIndicator()}
      </View>
    );
  }

  render() {
    const props = this.props;
    const index = Number(props.id);
    const addRightMargin = index % 2 === 0;
    return (
      <Card
        height={210}
        containerStyle={[{marginBottom: 15, flex: 1}, addRightMargin && {marginRight: 15}]}
        onPress={this.onSelect}
      >
        <Card.Image
          top
          imageSource={props.imageSource}
          height={183} style={{position: 'absolute', top: 0, left: 0, right: 0}}
        />
        <Card.Section
          body
          enableBlur={Constants.isIOS}
          blurOptions={{blurType: 'xlight'}}
          style={{
            position: 'absolute',
            paddingVertical: 12,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: Constants.isIOS ? 'transparent' : Colors.white
          }}
        >
          <Card.Section footer style={{justifyContent: 'center'}}>
            <Card.Item column style={{alignItems: 'center'}}>
              <Text text70 dark10 style={[{fontWeight: '400', marginBottom: 4}]}>{props.title}</Text>
              <Text text70 dark10 style={[{marginBottom: 4}]}>{props.secondaryTitle}</Text>
              <Text text90 dark50>{props.subtitle}</Text>
            </Card.Item>
          </Card.Section>
        </Card.Section>
        {this.renderSelectableContainer()}
      </Card>
    );
  }
}

export const SimpleItem = () => {
  return (
    <View style={{height: 70, width: 100, backgroundColor: Colors.violet70, marginBottom: 10}}/>
  );
};
SimpleItem.itemsPerRow = 3;
