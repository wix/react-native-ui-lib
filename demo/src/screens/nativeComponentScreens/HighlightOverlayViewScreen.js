import React, {PureComponent} from 'react';
import ReactNative from 'react-native';
import {Text, Button, View, Colors, HighlighterOverlayView} from 'react-native-ui-lib'; //eslint-disable-line

export default class HighlightOverlayViewScreen extends PureComponent {

  constructor(props) {
    super(props);

    this.onRefUpdated = this.onRefUpdated.bind(this);

    this.state = {
      fteHighlightViewTag: undefined,
      showFTE: false,
    };
  }

  componentDidMount() {
    this.setState({showFTE: true});
  }

  onRefUpdated(ref) {
    if (ref) {
      this.setState({fteHighlightViewTag: ReactNative.findNodeHandle(ref)});
    }
  }

  renderHighlighterOverlay() {
    return (
      <HighlighterOverlayView
        visible={this.state.showFTE}
        overlayColor={'rgba(242, 242, 242, 0.93)'}
        strokeColor={Colors.blue30}
        strokeWidth={1}
        highlightViewTag={this.state.fteHighlightViewTag}
      >
        <View marginT-125 paddingH-14 right>
          <Text text50 black style={{textAlign: 'right'}}>{'Check out this new amazing feature, just tap here!'}</Text>
          <Button marginT-15 link blue30 text50M label='Got it' onPress={() => this.setState({showFTE: false})}/>
        </View>
      </HighlighterOverlayView>
    );
  }

  render() {
    return (
      <View flex center>
        <View collapsable={false} ref={this.onRefUpdated}>
          <Text>{'Highlight Me'}</Text>
        </View>
        {this.renderHighlighterOverlay()}
      </View>
    );
  }
}
