import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Colors, Carousel, PageControl, Modal, View, Text, Assets} from 'react-native-ui-lib'; // eslint-disable-line

const BUTTONS_HIT_SLOP = {right: 5, left: 5, top: 10, bottom: 10};
interface ModalScreenProps {
  componentId: string;
}

interface State {
  currentPage: number;
}

export default class ModalScreen extends Component<ModalScreenProps, State> {
  static options() {
    return {
      topBar: {
        drawBehind: true,
        visible: false
      }
    };
  }

  constructor(props: ModalScreenProps) {
    super(props);

    this.state = {
      currentPage: 0
    };
  }

  closeScreen() {
    Navigation.pop(this.props.componentId);
  }

  render() {
    return (
      <View flex>
        <PageControl
          containerStyle={[styles.pageControl, styles.absoluteContainer]}
          numOfPages={5}
          currentPage={this.state.currentPage}
          color={Colors.grey10}
          size={15}
        />
        <Carousel onChangePage={currentPage => this.setState({currentPage})} containerStyle={{flex: 1}}>
          <View bg-green50 flex style={styles.page}>
            <Modal.TopBar
              title="modal title"
              onCancel={() => this.closeScreen()}
              onDone={() => Alert.alert('done')}
              doneButtonProps={{
                disabled: true
              }}
            />
            <View padding-20>
              <Text text70>This is an example of a custom modal top bar.</Text>
              <Text text70>By default you get the &apos;x&apos; cancel icon and &apos;save&apos; as done label</Text>
            </View>
          </View>

          <View bg-violet80 flex style={styles.page}>
            <Modal.TopBar
              title="another example"
              subtitle="with a subtitle"
              onCancel={() => Alert.alert('cancel')}
              onDone={() => Alert.alert('done')}
              cancelIcon={null}
              cancelLabel="back"
            />
            <View padding-20>
              <Text text70>
                You can of course change it by changing the values of cancelIcon, cancelLabel, doneIcon, doneLabel and
                other props..
              </Text>
            </View>
          </View>

          <View bg-orange70 flex style={styles.page}>
            <Modal.TopBar
              title="last one"
              onCancel={() => Alert.alert('cancel')}
              onDone={() => Alert.alert('done')}
              cancelIcon={null}
              cancelLabel="back"
            />
            <View padding-20>
              <Text text70>Sending onDone/onCancel is required for rendering done/cancel actions</Text>
            </View>
          </View>

          <View bg-grey70 flex style={styles.page}>
            <Modal.TopBar
              title="Custom Style"
              onCancel={() => Alert.alert('cancel')}
              onDone={() => Alert.alert('done')}
              doneButtonProps={{color: Colors.orange30}}
              cancelButtonProps={{iconStyle: {tintColor: Colors.orange30}}}
            />
            <View padding-20>
              <Text text70>
                use doneButtonProps/cancelButtonProps properties to have custom behaviour or style for done/cancel
                actions
              </Text>
            </View>
          </View>

          <View bg-yellow80 flex style={styles.page}>
            <Modal.TopBar
              title="custom button"
              rightButtons={[
                {
                  label: 'save',
                  buttonProps: {labelStyle: {color: Colors.yellow10, marginRight: 14}},
                  onPress: () => Alert.alert('save')
                },
                {
                  icon: Assets.icons.demo.settings,
                  onPress: () => Alert.alert('settings'),
                  buttonProps: {hitSlop: BUTTONS_HIT_SLOP, iconStyle: {tintColor: Colors.yellow10}}
                }
              ]}
              leftButtons={[
                {
                  icon: Assets.icons.demo.x,
                  onPress: () => Alert.alert('back'),
                  buttonProps: {hitSlop: BUTTONS_HIT_SLOP, iconStyle: {tintColor: Colors.yellow10}}
                }
              ]}
            />
            <View padding-20>
              <Text text70>
                This is an example for using the rightButtons and leftButtons props for having more than one button each
                side
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
    flex: 1
  },
  pageControl: {
    zIndex: 1
  },
  absoluteContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 0
  }
});
