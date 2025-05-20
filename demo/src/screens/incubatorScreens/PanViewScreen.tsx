import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  Assets,
  View,
  Text,
  Colors,
  Incubator,
  Card,
  Constants,
  Modal,
  BorderRadiuses,
  Icon,
  TouchableOpacity
} from 'react-native-ui-lib';
const {PanView} = Incubator;

interface Item {
  value: string;
  label: string;
}

const OVERLAY_BACKGROUND_COLOR = Colors.rgba(Colors.$backgroundInverted, 0.3);
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
const TOAST_DIRECTIONS = [PanView.directions.LEFT, PanView.directions.DOWN, PanView.directions.RIGHT];
const DIALOG_DIRECTIONS = [PanView.directions.DOWN];
const TOAST_THRESHOLD = {y: 10};

class PanViewScreen extends Component {
  state = {
    showToast: false,
    showDialog: false
  };

  onDialogDismissed = () => {
    this.setState({showDialog: false});
  };

  keyExtractor = (item: Item) => {
    return item.value;
  };

  renderVerticalItem = ({item}: {item: Item}) => {
    return (
      <Text text50 margin-20 color={item.value}>
        {item.label}
      </Text>
    );
  };

  renderDialog = () => {
    return (
      <View flex>
        <Modal
          transparent
          onBackgroundPress={this.onDialogDismissed}
          overlayBackgroundColor={OVERLAY_BACKGROUND_COLOR}
          useGestureHandlerRootView
          visible
        >
          <PanView
            directions={DIALOG_DIRECTIONS}
            dismissible
            animateToOrigin
            containerStyle={styles.panView}
            onDismiss={this.onDialogDismissed}
          >
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
          </PanView>
        </Modal>
      </View>
    );
  };

  onToastDismissed = () => {
    this.setState({showToast: false});
  };

  renderToast = () => {
    return (
      <PanView
        directions={TOAST_DIRECTIONS}
        dismissible
        animateToOrigin
        directionLock
        threshold={TOAST_THRESHOLD}
        containerStyle={styles.panView}
        onDismiss={this.onToastDismissed}
      >
        <TouchableOpacity center style={styles.toast} onPress={this.onToastDismissed}>
          <Text>Swipe or click to dismiss</Text>
        </TouchableOpacity>
      </PanView>
    );
  };

  renderCard = (key: string, name: string) => {
    // @ts-expect-error
    const value = this.state[key];
    const text = value ? `I'm still showing or being dismissed` : `Click me (${name})`;
    const onPress = value ? undefined : () => this.setState({[key]: true});
    return (
      <Card margin-page onPress={onPress}>
        <View padding-15>
          <Text text30 grey30>
            {text}
          </Text>
        </View>
      </Card>
    );
  };

  render() {
    const {showToast, showDialog} = this.state;
    return (
      <GestureHandlerRootView style={styles.root}>
        <View marginL-page height={50} centerV>
          <Text text50>New Pan View</Text>
        </View>
        <ScrollView>
          {this.renderCard('showToast', 'toast')}
          {this.renderCard('showDialog', 'dialog')}
          <View height={Constants.screenHeight} centerH>
            <Text text50 marginB-s2>
              Scrollable
            </Text>
            <Icon source={Assets.icons.demo.chevronDown}/>
          </View>
        </ScrollView>
        {showToast && this.renderToast()}
        {showDialog && this.renderDialog()}
      </GestureHandlerRootView>
    );
  }
}

export default PanViewScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.grey80
  },
  panView: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  },
  toast: {
    backgroundColor: Colors.white,
    width: 200,
    height: 40,
    borderRadius: BorderRadiuses.br20,
    borderWidth: 0.5,
    borderColor: Colors.grey30
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
