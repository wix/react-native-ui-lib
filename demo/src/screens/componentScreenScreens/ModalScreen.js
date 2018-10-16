import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Colors, Carousel, PageControl, Modal, View, Text, Constants} from 'react-native-ui-lib';//eslint-disable-line

export default class ModalScreen extends Component {

  // static navigatorStyle = {
  //   navBarHidden: true,
  // };

  static options(passProps) {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
      },
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
    };
  }

  closeScreen() {
    // const {navigator} = this.props;
    // navigator.pop({
    //   animated: true,
    // });
    Navigation.pop(this.props.componentId);
  }

  render() {
    return (
      <View flex>
        <PageControl
          containerStyle={[styles.pageControl, styles.absoluteContainer]}
          numOfPages={4}
          currentPage={this.state.currentPage}
          color={Colors.dark10}
          size={15}
        />
        <Carousel onChangePage={currentPage => this.setState({currentPage})}>
          <View bg-green50 flex style={styles.page}>
            <Modal.TopBar
              title="modal title"
              onCancel={() => this.closeScreen()}
              onDone={() => alert('done')}
              doneButtonProps={{
                disabled: true,
              }}
            />
            <View padding-20>
              <Text text70>
                This is an example of a custom modal top bar.
              </Text>
              <Text text70>
                By default you get the 'x' cancel icon and 'save' as done label
              </Text>
            </View>
          </View>

          <View bg-violet80 flex style={styles.page}>
            <Modal.TopBar
              title="another example"
              onCancel={() => alert('cancel')}
              onDone={() => alert('done')}
              cancelIcon={null}
              cancelLabel="back"
            />
            <View padding-20>
              <Text text70>
                You can of course change it by changing the values of
                cancelIcon, cancelLabel, doneIcon, doneLabel and other props..
              </Text>
            </View>
          </View>

          <View bg-orange70 flex style={styles.page}>
            <Modal.TopBar
              title="last one"
              onCancel={() => alert('cancel')}
              onDone={() => alert('done')}
              cancelIcon={null}
              cancelLabel="back"
            />
            <View padding-20>
              <Text text70>
                Sending onDone/onCancel is required for rendering done/cancel actions
              </Text>
            </View>
          </View>

          <View bg-dark70 flex style={styles.page}>
            <Modal.TopBar
              title="Custom Style"
              onCancel={() => alert('cancel')}
              onDone={() => alert('done')}
              doneButtonProps={{color: Colors.orange30}}
              cancelButtonProps={{iconStyle: {tintColor: Colors.orange30}}}
            />
            <View padding-20>
              <Text text70>
                use doneButtonProps/cancelButtonProps properties to have custom behaviour or style for done/cancel actions
              </Text>
            </View>
          </View>

        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    width: Constants.screenWidth,
  },
  pageControl: {
    zIndex: 1,
  },
  absoluteContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 0,
  },
});
