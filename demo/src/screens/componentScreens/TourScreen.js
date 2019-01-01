import React, {Component} from 'react';
import {Colors, View, Text, Button, Assets, Tour} from 'react-native-ui-lib'; //eslint-disable-line

export default class TourScreen extends Component {
  state = {};

  componentDidMount() {
    this.setState({
      showButtonTour: true,
    });

    setTimeout(() => {
      this.setState({
        showButtonTour: false,
      });
    }, 4000);
  }

  render() {
    return (
      <View flex center>
        <Text text20>Hellow</Text>
        <Tour
          visible={this.state.showButtonTour}
          overlayColor={Colors.dark10}
          message='Check out this nice button and how nice it is'
          onClose={() => this.setState({showButtonTour: false})}
        >
          <View centerH ref2={r => (this.target = r)} onLayout2={() => this.saveLayout()}>
            <Button label='Show Tour' onPress={() => this.setState({showButtonTour: true})} />
          </View>
        </Tour>
        <Text text70>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </Text>

        <Tour
          overlayColor={Colors.violet50}
          visible={this.state.showIconTour}
          onClose={() => this.setState({showIconTour: false})}
        >
          <View>
            <Button label={Assets.emojis.tea} link onPress={() => this.setState({showIconTour: true})} />
          </View>
        </Tour>
      </View>
    );
  }
}
