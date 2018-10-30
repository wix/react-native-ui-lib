import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {ThemeManager, Colors, BorderRadiuses, ListItem, Text} from 'react-native-ui-lib'; //eslint-disable-line
import orders from '../../data/orders';


export default class BasicListScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      onEdit: false,
      updating: false,
    };
  }

  keyExtractor = (item, index) => item.name;

  renderRow(row, id) {
    const statusColor = row.inventory.status === 'Paid' ? Colors.green30 : Colors.red30;
    return (
      <ListItem
        activeBackgroundColor={Colors.dark60}
        activeOpacity={0.3}
        height={77.5}
        onPress={() => Alert.alert(`pressed on order #${id + 1}`)}
        animation="fadeIn"
        easing="ease-out-expo"
        duration={1000}
        useNativeDriver
      >
        <ListItem.Part left>
          <Animatable.Image
            source={{uri: row.mediaUrl}}
            style={styles.image}
            animation="fadeInLeft"
            easing="ease-out-expo"
            duration={600}
            delay={_.sample([20, 120, 220])}
            useNativeDriver
          />
        </ListItem.Part>
        <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
          <ListItem.Part containerStyle={{marginBottom: 3}}>
            <Text dark10 text70 style={{flex: 1, marginRight: 10}} numberOfLines={1}>{row.name}</Text>
            <Text dark10 text70 style={{marginTop: 2}}>{row.formattedPrice}</Text>
          </ListItem.Part>
          <ListItem.Part>
            <Text style={{flex: 1, marginRight: 10}} text90 dark40 numberOfLines={1}>{`${row.inventory.quantity} item`}</Text>
            <Text text90 color={statusColor} numberOfLines={1}>{row.inventory.status}</Text>
          </ListItem.Part>
        </ListItem.Part>
      </ListItem>
    );
  }

  render() {
    return (
      <FlatList
        data={orders}
        renderItem={({item, index}) => this.renderRow(item, index)}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
});
