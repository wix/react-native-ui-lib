import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Constants, View, Text, Button, Modal} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {

  static id = 'example.Playground';

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {

  }

  toggleModal() {
    const {showModal} = this.state;
    this.setState({showModal: !showModal});
  }

  renderModal() {
    return (
      <Modal
        animationType={'slide'}
        visible
        onRequestClose={() => this.toggleModal}
        transparent
        enableModalBlur
      >
        <Modal.TopBar
          onCancel={this.toggleModal}
          onDone={this.toggleModal}
        />
        <View flex>
          <Text>MODAL</Text>
        </View>
      </Modal>
    );
  }

  render() {
    const {showModal} = this.state;

    return (
      <View flex center style={styles.container}>
        <Button onPress={this.toggleModal} label={'Show'}/>
        {showModal && this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cyan60,
  },
});
