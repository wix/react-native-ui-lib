import React, {Component} from 'react';
import {LayoutAnimation, FlatList} from 'react-native';
import {Colors, View, Image, TouchableOpacity, SharedTransition, Card, Button, Text, Modal} from 'react-native-ui-lib'; //eslint-disable-line

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

export default class SharedTransitionScreen extends Component {
  constructor(props) {
    super(props);

    this.cards = [];
  }

  state = {
    showDetails: false,
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
        <SharedTransition.Source
          id={item.id}
          data={item}
          style={[
            {overflow: 'hidden', position: 'absolute', right: 20, top: 20, bottom: 20, width: '45%', height: 200},
          ]}
        >
          {this.renderSharedElement(item)}
        </SharedTransition.Source>
      </View>
    );
  };

  renderList() {
    return <FlatList data={DATA} renderItem={this.renderItem} keyExtractor={item => item.title} />;
  }

  renderSharedElement(item = {}) {
    return (
      <View flex>
        <Image
          style={{width: '100%', height: '100%', borderRadius: 10}}
          source={{
            uri: item.image,
          }}
        />
      </View>
    );
  }

  renderDetails = (data = {}) => {
    return (
      <View flex pointerEvents="box-none" padding-20 paddingT-50>
        <View row>
          <SharedTransition.Target style={{width: 200, height: 280, marginLeft: -30}}>
            {data && this.renderSharedElement(data, true)}
          </SharedTransition.Target>
          <View flex paddingL-20>
            <Text text50>{data.title}</Text>
            <Text text90 purple30 marginT-10>
              {data.views} Views
            </Text>
          </View>
        </View>
        <View left marginT-20>
          <Text text60>{data.location}</Text>
          <Text>
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
          </Text>
          <Button link marginT-20 dark10 label="Learn More" size="small" />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View flex dark80>
        <SharedTransition.Area renderDetails={this.renderDetails}>{this.renderList()}</SharedTransition.Area>
      </View>
    );
  }
}
