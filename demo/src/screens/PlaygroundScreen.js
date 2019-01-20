import React, {Component} from 'react';
import {StyleSheet, LayoutAnimation, FlatList} from 'react-native';
import _ from 'lodash';
import {Colors, View, SharedElement, Card, Button, Text, Modal} from 'react-native-ui-lib'; //eslint-disable-line

const DATA = [
  {
    id: '12',
    title: 'white pendant lamp',
    location: 'Paris, France',
    views: 1224,
    image:
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: '13',
    title: 'black floor lamp at the corner',
    location: 'Paris, France',
    views: 302,
    image:
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1494&q=80',
  },
  {
    id: '14',
    title: 'gray desk lamp near white wall',
    location: 'Paris, France',
    views: 554,
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  },
  {
    id: '15',
    title: 'round white and yellow bowl illustration',
    location: 'Paris, France',
    views: 1999,
    image:
      'https://images.unsplash.com/photo-1526308430620-59f514ed2152?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  },
  {
    id: '16',
    title: 'black and orange polka dot print textile',
    location: 'Paris, France',
    views: 2014,
    image:
      'https://images.unsplash.com/photo-1544070643-24128d1f6033?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  },
];

const ANIMATION_DURATION = 200;

export default class PlaygroundScreen extends Component {
  constructor(props) {
    super(props);

    this.cards = [];
  }

  state = {
    showDetails: false,
  };

  componentDidUpdate() {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: ANIMATION_DURATION,
    });
  }

  focusItem = id => {
    const {itemId} = this.state;
    if (itemId) {
      this.backToList();
    } else {
      const card = this.cards[id];
      card.measureInWindow((x, y, width, height) => {
        const itemLayout = {x, y, width, height};
        this.setState({itemId: id, itemLayout});

        setTimeout(() => {
          this.setState({showDetails: true});
        }, ANIMATION_DURATION);
      });
    }
  };

  backToList = () => {
    this.setState({showDetails: false});

    setTimeout(() => {
      this.setState({itemId: undefined, itemLayout: undefined});
    }, ANIMATION_DURATION);
  };

  renderItem = ({item}) => {
    return (
      <View marginB-20 padding-20 row height={280}>
        <Card padding-20 marginV-20 width={'60%'} style={{zIndex: 10}} spread>
          <View>
            <Text text70 dark10>
              {item.title}
            </Text>
            <Text text80 dark30>
              {item.location}
            </Text>
          </View>
          <View>
            <Text text70 dark30>
              <Text text50 purple30>
                {item.views}
              </Text>
              {' Views'}
            </Text>
          </View>
        </Card>
        {this.renderSharedElement(item)}
      </View>
    );
  };

  renderList() {
    return <FlatList data={DATA} renderItem={this.renderItem} keyExtractor={item => item.title} />;
  }

  renderSharedElement(item, style) {
    return (
      <Card
        width={'50%'}
        onPress={() => this.focusItem(item.id)}
        borderRadius={10}
        style={[{overflow: 'hidden', position: 'absolute', right: 20, top: 20, bottom: 20}, style]}
        ref={r => {
          if (!this.cards[item.id]) {
            this.cards[item.id] = r;
          }
        }}
      >
        <Card.Image
          height={'100%'}
          width={'100%'}
          imageSource={{
            uri: item.image,
          }}
        />
      </Card>
    );
  }

  renderDetails() {
    const {showDetails, itemId, itemLayout} = this.state;
    if (itemId) {
      const item = _.find(DATA, {id: itemId});
      const style = showDetails
        ? {
          position: 'absolute',
          top: 100,
          left: -10,
          width: itemLayout.width,
          height: itemLayout.height,
        }
        : {
          width: itemLayout.width,
          height: itemLayout.height,
          position: 'absolute',
          top: itemLayout.y,
          left: itemLayout.x,
        };
      return (
        <Modal visible={!!itemId} animationType="fade" onBackgroundPress={this.backToList}>
          {item && <SharedElement element={this.cards[itemId]}>{this.renderSharedElement(item, style)}</SharedElement>}
          {showDetails && (
            <View style={{paddingTop: 100, paddingLeft: itemLayout.width}}>
              <Text text60>{item.title}</Text>
              <Text text80 dark30>
                {item.location}
              </Text>
            </View>
          )}
        </Modal>
      );
    }
  }

  render() {
    // const {move} = this.state;
    // const position = move && {position: 'absolute', bottom: 100, right: 10};

    return (
      <View flex dark80>
        {this.renderList()}
        {this.renderDetails()}
        {/* <View center padding-20>
          <Button label="Move" onPress={() => this.setState({move: !move})} />
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark80,
  },
});
