import _ from 'lodash';
import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Alert} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Text, View, Button, Dialog, Colors, PanningProvider} from 'react-native-ui-lib'; // eslint-disable-line

export default class DialogScreen extends Component {
  static colors = [
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
    {value: Colors.yellow70, label: 'Yellow70'},
  ];

  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);

    this.state = {
      showDialog1: false,
      showDialog2: false,
      showDialog3: false,
      showDialog4: false,
      showDialog5: false,
      showDialog6: false,
      showDialog7: false,
      showDialog8: false,
      dialogSwipeLeft: false,
      dialogSwipeRight: false,
      dialogWithHeader: false,
      dialogWithVerticalScroll: false,
      dialogWithHorizontalScroll: false,
      reactNativeOverlay: false,
    };

    this.useCases = [
      {
        stateId: 'showDialog1',
        text: 'Show default dialog in center',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '90%',
          height: '60%',
        },
      },
      {
        stateId: 'showDialog2',
        text: 'Show dialog in center pull up',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '90%',
          height: '60%',
          panDirection: PanningProvider.Directions.UP,
        },
      },
      {
        stateId: 'showDialog3',
        text: 'Show bottom dialog',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '100%',
          height: '35%',
          bottom: true,
          useSafeArea: true,
          centerH: true,
        },
      },
      {
        stateId: 'showDialog4',
        text: 'Show bottom dialog with padding',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white, marginVertical: 20, borderRadius: 12},
          width: '90%',
          height: '60%',
          bottom: true,
          centerH: true,
        },
      },
      {
        stateId: 'showDialog5',
        text: 'Show top dialog',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '100%',
          height: '40%',
          top: true,
          useSafeArea: true,
          centerH: true,
        },
      },
      {
        stateId: 'showDialog6',
        text: 'Show dialog with height based on content (bottom)',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '100%',
          bottom: true,
          useSafeArea: true,
          centerH: true,
        },
        functionExtraProps: {flex: false},
      },
      {
        stateId: 'showDialog7',
        text: 'Show dialog with height based on content (top)',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '100%',
          top: true,
          useSafeArea: true,
          centerH: true,
        },
        functionExtraProps: {flex: false},
      },
      {
        stateId: 'showDialog8',
        text: 'Show dialog with disabled pan gesture',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '80%',
          height: '40%',
          disablePan: true,
        },
      },
      {
        stateId: 'dialogSwipeLeft',
        text: 'Show center dialog with swipe to left',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '80%',
          height: '40%',
          panDirection: PanningProvider.Directions.LEFT,
        },
      },
      {
        stateId: 'dialogSwipeRight',
        text: 'Show center dialog with swipe to right',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '80%',
          height: '40%',
          panDirection: PanningProvider.Directions.RIGHT,
        },
      },
      {
        stateId: 'dialogWithHeader',
        text: 'Show bottom dialog with header',
        showHeader: true,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white, marginVertical: 20, borderRadius: 12},
          bottom: true,
          centerH: true,
        },
        functionExtraProps: {flex: false},
      },
      {
        stateId: 'dialogWithVerticalScroll',
        text: 'Dialog with vertical scroll',
        showHeader: true,
        contentFunction: this.renderContentWithVerticalScroll,
        extraProps: {
          style: {backgroundColor: Colors.white, marginVertical: 20, borderRadius: 12},
          height: '70%',
          bottom: true,
          centerH: true,
        },
      },
      {
        stateId: 'dialogWithHorizontalScroll',
        text: 'Dialog with horizontal scroll',
        showHeader: true,
        contentFunction: this.renderContentWithHorizontalScroll,
        extraProps: {
          style: {backgroundColor: Colors.white, marginVertical: 20, borderRadius: 12},
          height: '70%',
          bottom: true,
          centerH: true,
        },
      },
    ];
  }

  renderButtons = () => {
    return (
      <View>
        {_.map(this.useCases, useCase => {
          return this.renderButton(useCase);
        })}
        {this.renderOverlayButton()}
      </View>
    );
  };

  renderButton = ({stateId, text}, onPress = () => this.setState({[stateId]: true})) => {
    return <Button key={text + '-button'} size={'small'} label={text} style={styles.button} onPress={onPress} />;
  };

  renderDialogs = () => {
    return _.map(this.useCases, useCase => {
      return this.renderDialog(useCase);
    });
  };

  renderDialog = ({stateId, text, showHeader, contentFunction, extraProps, functionExtraProps}) => {
    const shouldShow = this.state[stateId];
    const renderHeader = showHeader ? this.renderHeader : undefined;

    return (
      <Dialog
        key={text + '-dialog'}
        stateId={stateId}
        migrate
        title={text}
        message={'Message'}
        visible={shouldShow}
        onDismiss={this.onDismiss}
        renderPannableHeader={renderHeader}
        supportedOrientations={['portrait', 'landscape']}
        {...extraProps}
      >
        {contentFunction(stateId, functionExtraProps)}
      </Dialog>
    );
  };

  onDismiss = ({stateId}) => {
    this.setState({[stateId]: false});
  };

  renderHeader = props => {
    const {title, message} = props;
    return (
      <View>
        <View margin-20>
          <Text marginB-8>{title}</Text>
          <Text>{message}</Text>
        </View>
        <View height={2} bg-dark70 />
      </View>
    );
  };

  renderDialogContent = (stateId, extraProps) => {
    return (
      <View flex padding-18 spread {...extraProps}>
        <View height={100}>
          <Text text50>This is Dialog</Text>
        </View>
        <View right>
          <Button stateId={stateId} text60 label="Done" link onPress={this.onDone} />
        </View>
      </View>
    );
  };

  onDone = ({stateId}) => {
    this.setState({[stateId]: false});
  };

  keyExtractor = item => {
    return item.value;
  };

  renderContentWithVerticalScroll = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        data={DialogScreen.colors}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  };

  renderItem = ({item: color}) => {
    return (
      <Text text50 margin-20 color={color.value}>
        {color.label}
      </Text>
    );
  };

  titlePressed = ({title}) => {
    Alert.alert('Pressed on', title);
  };

  renderContentWithHorizontalScroll = () => {
    return (
      <View pointerEvents="box-none" style={styles.horizontalContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DialogScreen.colors}
          renderItem={this.renderHorizontalItem}
          keyExtractor={this.keyExtractor}
        />
        <View row pointerEvents="none" style={styles.horizontalTextContainer}>
          <Text>
            {'\u25c0'} Scroll me {'\u25b6'}
          </Text>
        </View>
      </View>
    );
  };

  renderHorizontalItem = ({item: color}) => {
    return (
      <View flex width={100} height={1000} style={{backgroundColor: color.value}} />
    );
  };

  renderOverlayButton = () => {
    return this.renderButton({stateId: 'reactNativeOverlay', text: 'Show dialog in RNN overlay'}, this.showOverlay);
  };

  showOverlay = async () => {
    this.overlay = await Navigation.showOverlay({
      component: {
        name: 'unicorn.CustomScreen',
        passProps: {
          onDismiss: this.dismissOverlay,
        },
        options: {
          layout: {
            backgroundColor: 'transparent',
          },
          overlay: {
            interceptTouchOutside: false,
          },
        },
      },
    });
  };

  dismissOverlay = () => {
    Navigation.dismissOverlay(this.overlay);
  };

  render() {
    return (
      <ScrollView>
        <View flex padding-12>
          <Text text30 dark10 marginB-20>
            Dialog
          </Text>
          {this.renderButtons()}
          {this.renderDialogs()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    alignSelf: 'flex-start',
  },
  scrollView: {
    paddingBottom: 12,
  },
  horizontalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalTextContainer: {
    position: 'absolute',
    top: 10,
  },
});
