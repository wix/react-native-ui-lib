import React, {Component} from 'react';
import {Constants, View, Text, Button, Image, FeatureHighlight} from 'react-native-ui-lib'; // eslint-disable-line

class FeatureHighlightScreen extends Component {

  constructor(props) {
    super(props);
    this.closeHighlight = this.closeHighlight.bind(this);
  }

  state = {
    showFeatureHighlight: true,
  };

  closeHighlight() {
    this.setState({showFeatureHighlight: false});
  }

  render() {
    const {showFeatureHighlight} = this.state;
    return (
      <View flex center padding-25>
        <View marginT-20>
          <Button label="Keep Reading"/>
        </View>
        <View>
          <Text marginT-20>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, <Text>remaining</Text> essentially unchanged.
          </Text>
        </View>
        <View marginT-20 ref={r => (this.target = r)} style={{opacity: 1}}>
          <Button label="Keep Reading"/>
        </View>
        <FeatureHighlight
          visible={showFeatureHighlight}
          title="Get Notified"
          message="Important notifications appear right on your clubs and groups.
           Tap them to get more information about the most important things that you should pay attention to."
          confirmButtonProps={{label: 'Got It', onPress: this.closeHighlight}}
          getTarget={() => this.target}
          highlightFrame={{x: 0, y: 200, width: 176.5, height: 53}}
        />
      </View>
    );
  }
}

export default FeatureHighlightScreen;
