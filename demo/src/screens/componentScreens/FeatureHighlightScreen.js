import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Constants, View, Text, Button, Image, FeatureHighlight} from 'react-native-ui-lib'; // eslint-disable-line

class FeatureHighlightScreen extends Component {

  constructor(props) {
    super(props);
    this.closeHighlight = this.closeHighlight.bind(this);
    this.showHighlight = this.showHighlight.bind(this);
    this.onRefUpdated = this.onRefUpdated.bind(this);

    this.state = {
      showFTE: false,
      fteHighlightViewTag: undefined,
    };
  }

  componentDidMount() {
    this.showHighlight();
  }

  onRefUpdated(ref) {
    if (ref) {
      this.setState({fteHighlightViewTag: ReactNative.findNodeHandle(ref)});
      this.target = ref;
    }
  }

  closeHighlight() {
    this.setState({showFTE: false});
  }

  showHighlight() {
    this.setState({showFTE: true});
  }

  renderHighlighterOverlay() {
    const {showFTE} = this.state;
    return (
      <FeatureHighlight
        visible={showFTE}
        title="Get Notified"
        message="Important notifications appear right on your clubs and groups.
            Tap them to get more information about the most important things that you should pay attention to."
        confirmButtonProps={{label: 'Got It', onPress: this.closeHighlight}}
        getTarget={() => this.target}
        // highlightFrame={{x: 30, y: 70, width: 150, height: 30}}
        // highlightFrame={{x: 175, y: 334, width: 150, height: 56}}
      />
    );
  }

  render() {
    return (
      <View flex>
        <View row flex>
          <View bg-green10 style={{height: 47}}/>
          <View left>
            <View marginT-40 bg-yellow10 style={{width: 32, height: 32}}/>
            <View marginT-40 bg-red10 style={{width: 12, height: 12}}/>
          </View>
          <View right flex>
            <View row flex>
              <View marginT-40 marginR-60 bg-violet30 style={{width: 50, height: 70}}/>
              <View marginT-40 bg-violet30 style={{width: 70, height: 50}}/>
            </View>
            <View
              marginT-40 marginR-50
              bg-purple40
              style={{width: 150, height: 56}}
              // ref={r => (this.target = r)}
            />
          </View>
        </View>
        <View center padding-25>
          <View>
            <Text marginT-20>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, <Text>remaining</Text> essentially unchanged.
            </Text>
          </View>
          <View marginT-20 ref={r => (this.target = r)} style={{opacity: 1}}>
            <Button label="Show Overlay" onPress={this.showHighlight}/>
          </View>
        </View>
        {this.renderHighlighterOverlay()}
      </View>
    );
  }
}

export default FeatureHighlightScreen;
