import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {View, Text, Card, Button, Incubator, Colors, BorderRadiuses} from 'react-native-ui-lib'; //eslint-disable-line

interface Item {
  value: string;
  label: string;
}

const colors: Item[] = [
  {value: Colors.red10, label: 'Red10'},
  {value: Colors.red30, label: 'Red30'},
  {value: Colors.red50, label: 'Red50'},
  {value: Colors.red70, label: 'Red70'},
  {value: Colors.blue10, label: 'Blue10'},
  {value: Colors.blue30, label: 'Blue30'},
  {value: Colors.blue50, label: 'Blue50'},
  {value: Colors.blue70, label: 'Blue70'},
  {value: Colors.purple10, label: 'Purple10'},
  {value: Colors.purple30, label: 'Purple30'},
  {value: Colors.purple50, label: 'Purple50'},
  {value: Colors.purple70, label: 'Purple70'},
  {value: Colors.green10, label: 'Green10'},
  {value: Colors.green30, label: 'Green30'},
  {value: Colors.green50, label: 'Green50'},
  {value: Colors.green70, label: 'Green70'},
  {value: Colors.yellow10, label: 'Yellow10'},
  {value: Colors.yellow30, label: 'Yellow30'},
  {value: Colors.yellow50, label: 'Yellow50'},
  {value: Colors.yellow70, label: 'Yellow70'}
];

export default class IncubatorDialogScreen extends Component {
  state = {visible: false};

  renderVerticalItem = ({item}: {item: Item}) => {
    return (
      <Text text50 margin-20 color={item.value}>
        {item.label}
      </Text>
    );
  };

  keyExtractor = (item: Item) => {
    return item.value;
  };

  openDialog = () => {
    this.setState({visible: true});
  };

  closeDialog = () => {
    this.setState({visible: false});
  };

  render() {
    const {visible} = this.state;

    return (
      <View bg-dark80 flex padding-20>
        <Card height={100} center padding-20>
          <Text text50>IncubatorDialogScreen</Text>
        </Card>
        <View flex center>
          <Button marginV-20 label="Open Dialog" onPress={this.openDialog}/>
        </View>
        <Incubator.Dialog visible={visible} onDismiss={this.closeDialog} bottom containerStyle={styles.dialogContainer}>
          <View style={styles.dialog}>
            <Text text60 margin-s2>
              Title (swipe here)
            </Text>
            <View height={1} bg-grey40/>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={styles.verticalScroll}
              data={colors}
              renderItem={this.renderVerticalItem}
              keyExtractor={this.keyExtractor}
            />
          </View>
        </Incubator.Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dialogContainer: {
    bottom: 20,
    alignSelf: 'center'
  },
  dialog: {
    backgroundColor: Colors.white,
    width: 200,
    height: 300,
    borderRadius: BorderRadiuses.br20
  },
  verticalScroll: {
    marginTop: 20
  }
});
