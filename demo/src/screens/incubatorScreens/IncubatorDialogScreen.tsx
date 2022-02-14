import {map} from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ModalProps} from 'react-native';
import {View, Text, Card, Button, Incubator, Colors, Spacings} from 'react-native-ui-lib';

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

const styles = StyleSheet.create({
  verticalScroll: {
    paddingVertical: Spacings.s2
  }
});

const SCROLLABLE_PROPS = {
  enable: true,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: styles.verticalScroll
};

export default class IncubatorDialogScreen extends Component {
  state = {visible: false};
  modalProps: ModalProps = {supportedOrientations: ['portrait', 'landscape']};
  headerProps: Incubator.DialogHeaderProps = {text: {title: 'Title (swipe here)'}};

  renderItem = (item: Item) => {
    return (
      <Text key={item.value} text50 marginH-s5 marginV-s2 color={item.value} onPress={this.closeDialog}>
        {item.label}
      </Text>
    );
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
      <View bg-grey80 flex padding-20>
        <Card height={100} center padding-20>
          <Text text50>IncubatorDialogScreen</Text>
        </Card>
        <View flex center>
          <Button marginV-s5 label="Open Dialog" onPress={this.openDialog}/>
        </View>
        <Incubator.Dialog
          useSafeArea
          visible={visible}
          onDismiss={this.onDismiss}
          bottom
          centerH
          height={'40%'}
          modalProps={this.modalProps}
          headerProps={this.headerProps}
          scrollableProps={SCROLLABLE_PROPS}
        >
          {map(colors, color => {
            return this.renderItem(color);
          })}
        </Incubator.Dialog>
      </View>
    );
  }
}
