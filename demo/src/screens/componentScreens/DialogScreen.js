import _ from 'lodash';
import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, Alert, TouchableWithoutFeedback} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Text, View, Button, Dialog, Colors, List, PanningProvider} from 'react-native-ui-lib'; // eslint-disable-line

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
    {value: Colors.yellow70, label: 'Yellow70'}
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
      dialogSwipeHorizontal: false,
      dialogWithHeader: false,
      dialogWithVerticalScrollableContent: false,
      dialogWithHorizontalScrollableContent: false
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
          height: '60%'
        }
      },
      {
        stateId: 'showDialog2',
        text: 'Show bottom dialog',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '100%',
          height: '35%',
          bottom: true,
          useSafeArea: true,
          centerH: true
        }
      },
      {
        stateId: 'showDialog3',
        text: 'Show bottom dialog with padding',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white, marginVertical: 20, borderRadius: 12},
          width: '90%',
          height: '60%',
          bottom: true,
          centerH: true
        }
      },
      {
        stateId: 'showDialog4',
        text: 'Show top dialog different animation',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '100%',
          height: '40%',
          top: true,
          centerH: true
        }
      },
      {
        stateId: 'showDialog5',
        text: 'Show dialog with height based on content',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '100%',
          height: null,
          bottom: true,
          useSafeArea: true,
          centerH: true
        },
        functionExtraProps: {flex: false}
      },
      {
        stateId: 'showDialog6',
        text: 'Show dialog with animation configuration',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          width: '80%',
          height: '40%',
          bottom: true,
          centerH: true,
          animationConfig: {animation: 'slideInLeft', duration: 1000}
        },
        functionExtraProps: {'marginV-20': true, 'bg-yellow60': true}
      },
      {
        stateId: 'showDialog7',
        text: 'Show dialog with disabled pan gesture',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '80%',
          height: '40%',
          disablePan: true
        }
      },
      {
        stateId: 'dialogSwipeHorizontal',
        text: 'Show center dialog with horizontal swipe',
        showHeader: false,
        contentFunction: this.renderDialogContent,
        extraProps: {
          style: {backgroundColor: Colors.white},
          width: '80%',
          height: '40%',
          panDirections: [PanningProvider.Directions.LEFT, PanningProvider.Directions.RIGHT]
        }
      },
      {
        stateId: 'dialogWithHeader',
        text: 'Show bottom dialog with header (wrapped content)',
        showHeader: true,
        contentFunction: this.renderDialogContent,
        extraProps: {
          useTemplate: true
        },
        functionExtraProps: {flex: false}
      },
      {
        stateId: 'dialogWithVerticalScrollableContent',
        text: 'Dialog with vertical scrollable content',
        showHeader: true,
        contentFunction: this.renderContentWithScrollableContent,
        extraProps: {
          useTemplate: true
        }
      },
      {
        stateId: 'dialogWithHorizontalScrollableContent',
        text: 'Dialog with horizontal scrollable content',
        showHeader: true,
        contentFunction: this.renderContentWithHorizontalScrollableContent,
        extraProps: {
          useTemplate: true
        }
      }
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
    return <Button key={text + '-button'} size={'small'} label={text} style={styles.button} onPress={onPress}/>;
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
        renderHeader={renderHeader}
        {...extraProps}
      >
        {contentFunction(stateId, functionExtraProps)}
      </Dialog>
    );
  };

  onDismiss = ({stateId}) => {
    this.setState({[stateId]: false});
  }

  renderHeader = props => {
    const {title, message} = props;
    return (
      <View>
        <View marginT-20 marginL-20 marginR-20>
          <Text marginB-8>{title}</Text>
          <Text marginB-8>{message}</Text>
        </View>
        <View height={2} bg-dark70/>
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
          <Button stateId={stateId} text60 label="Done" link onPress={this.onDone}/>
        </View>
      </View>
    );
  };

  onDone = ({stateId}) => {
    this.setState({[stateId]: false});
  }

  keyExtractor = (item) => {
    return item.value;
  }

  renderContentWithScrollableContent = () => {
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
      <Text text50 margin-20 color={color.value}>{color.label}</Text>
    );
  };

  titlePressed = ({title}) => {
    Alert.alert('Pressed on', title);
  }

  renderContentWithHorizontalScrollableContent = () => {
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
          <Text>{'\u25c0'} Scroll me {'\u25b6'}</Text>
        </View>
      </View>
    );
  };

  renderHorizontalItem = ({item: color}) => {
    return (
      // Note: you only need to wrap with a TouchableWithoutFeedback (or a TouchableOpacity) if you don't
      // already have it. This is done to make the scrolling possible within the FlatList \ ScrollList
      <TouchableWithoutFeedback>
        <View flex width={100} height={1000} style={{backgroundColor: color.value}}/>
      </TouchableWithoutFeedback>
    );
  };

  renderOverlayButton = () => {
    return this.renderButton({stateId: 'showDialog8', text: 'Show dialog in RNN overlay'}, this.showOverlay);
  };

  showOverlay = async () => {
    this.overlay = await Navigation.showOverlay({
      component: {
        name: 'unicorn.CustomScreen',
        passProps: {
          onDismiss: this.dismissOverlay
        },
        options: {
          layout: {
            backgroundColor: 'transparent'
          },
          overlay: {
            interceptTouchOutside: false
          }
        }
      }
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
    alignSelf: 'flex-start'
  },
  scrollView: {
    paddingBottom: 12
  },
  horizontalContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontalTextContainer: {
    position: 'absolute',
    top: 10
  }
});
