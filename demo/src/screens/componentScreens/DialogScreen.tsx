import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {View, Text, Card, Button, Dialog, DialogHeaderProps, Colors, Spacings, ModalProps} from 'react-native-ui-lib';

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

export default class DialogScreen extends Component {
  state = {visible: false};
  modalProps: ModalProps = {supportedOrientations: ['portrait', 'landscape']};
  headerProps: DialogHeaderProps = {title: 'Title (swipe here)'};

  renderVerticalItem = ({item}: {item: Item}) => {
    return (
      <Text text50 marginH-s5 marginV-s2 color={item.value} onPress={this.closeDialog}>
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

  onDismiss = () => {
    this.setState({visible: false});
  };

  render() {
    const {visible} = this.state;

    return (
      <View bg-$backgroundNeutralLight flex padding-20>
        <Card height={100} center padding-20>
          <Text $textDefault text50>
            DialogScreen
          </Text>
        </Card>
        <View flex center>
          <Button marginV-s5 label="Open Dialog" onPress={this.openDialog}/>
        </View>
        <Dialog
          useSafeArea
          visible={visible}
          onDismiss={this.onDismiss}
          bottom
          centerH
          modalProps={this.modalProps}
          headerProps={this.headerProps}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.verticalScroll}
            data={colors}
            renderItem={this.renderVerticalItem}
            keyExtractor={this.keyExtractor}
          />
        </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  verticalScroll: {
    paddingVertical: Spacings.s2
  }
});
