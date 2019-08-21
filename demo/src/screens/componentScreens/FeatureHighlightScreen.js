import _ from 'lodash';
import React, {Component} from 'react';
import {Colors, View, Text, Button, FeatureHighlight} from 'react-native-ui-lib'; // eslint-disable-line


const titles = [
  'Get Notified',
  'Title two is a long title that will not get cut by default, but can be limited',
  'Title number three',
  'Title number four',
  'Title number five',
  'Only a title and headline'
];
const messages = [
  'Important notifications appear right on your clubs and groups. Tap them to get more information about the most' +
  'important things that you should pay attention to.',
  'Short message with information about the above highlighted feature',
  'A long message, that will not get cut (but can be limited) with information about the highlighted feature.' +
  ' Please note that if the message is too long and will cause the content box to render off screen, you will get a' +
  ' warning about it',
  'Very short message',
  'Short message with information about the below highlighted feature',
  undefined
];
const headlines = [
  'Welcome to uilib demo!'
];

class FeatureHighlightScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showFTE: false,
      currentTargetIndex: 0
    };

    this.targets = {};
  }

  componentDidMount() {
    // setting timeout to allow Android's transition animation to complete
    setTimeout(() => {
      this.showHighlight();
    }, 1000);
  }

  closeHighlight = () => {
    this.setState({showFTE: false});
  }

  showHighlight = () => {
    this.setState({showFTE: true});
  }

  addTarget(ref, id) {
    if (ref && !this.targets[id]) {
      this.targets[id] = ref;
    }
  }

  moveNext = () => {
    const {currentTargetIndex} = this.state;
    const newTargetIndex = currentTargetIndex + 1;

    this.moveToPage(newTargetIndex);
  }

  moveToPage(index) {
    if (index < _.size(this.targets)) {
      this.setState({currentTargetIndex: index});
    } else {
      this.closeHighlight();
    }
  }

  getPageControlProps() {
    return {
      numOfPages: titles.length, 
      currentPage: this.state.currentTargetIndex, 
      onPagePress: this.onPagePress,
      color: Colors.dark30,
      inactiveColor: Colors.dark80,
      size: 8
    };
  }

  onPagePress = (index) => {
    this.moveToPage(index);
  }

  renderHighlighterOverlay() {
    const {showFTE, currentTargetIndex} = this.state;
    const lastPage = titles.length - 1;

    return (
      <FeatureHighlight
        visible={showFTE}
        title={titles[currentTargetIndex]}
        message={messages[currentTargetIndex]}
        headline={currentTargetIndex === lastPage ? headlines[0] : undefined}
        confirmButtonProps={{label: 'Got It', onPress: this.moveNext}}
        onBackgroundPress={this.closeHighlight}
        getTarget={() => this.targets[currentTargetIndex]}
        // highlightFrame={{x: 30, y: 70, width: 150, height: 30}}
        // highlightFrame={{x: 160, y: 336, width: 150, height: 56}}
        borderRadius={currentTargetIndex === 2 ? 4 : undefined}
        pageControlProps={currentTargetIndex < lastPage ? this.getPageControlProps() : undefined}
      />
    );
  }

  render() {
    return (
      <View flex>
        <View row flex>
          <View left>
            <View
              marginT-40 br100 bg-yellow10
              style={{width: 32, height: 32}}
              testID={'0'}
              ref={r => (this.addTarget(r, '0'))}
            />
            <View marginT-40 bg-red10 style={{width: 12, height: 12}} testID={'1'} ref={r => (this.addTarget(r, '1'))}/>
          </View>
          <View right flex>
            <View row flex>
              <View
                marginT-40 marginR-60 bg-cyan30
                style={{width: 50, height: 70}}
                testID={'2'}
                ref={r => (this.addTarget(r, '2'))}
              />
              <View marginT-40 bg-violet30 style={{width: 70, height: 50}} testID={'3'} ref={r => (this.addTarget(r, '3'))}/>
            </View>
            <View
              marginT-40 marginR-50
              bg-purple40
              style={{width: 150, height: 56}}
              testID={'4'}
              ref={r => (this.addTarget(r, '4'))}
            />
          </View>
        </View>
        <View center padding-25>
          <View>
            <Text marginT-20>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, <Text>remaining</Text> essentially unchanged.
            </Text>
          </View>
          <View marginT-20 testID={'5'} ref={r => (this.addTarget(r, '5'))}>
            <Button label="Show Overlay" onPress={this.showHighlight}/>
          </View>
        </View>
        {this.renderHighlighterOverlay()}
      </View>
    );
  }
}

export default FeatureHighlightScreen;
