import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import {View, Text, ListItem, Avatar, AnimatableManager, Card, Image, Colors} from 'react-native-ui-lib';

const posts = [{
  height: 294,
  avatar: 'https://images.pexels.com/photos/3496994/pexels-photo-3496994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  name: 'Jack',
  nickname: '@jackywhite',
  description: 'Join our live webinar and discover the secrets of successful serverless monitoring.',
  time: '1h',
  link: {
    website: 'helloworld.com',
    description: 'Live Webinar: Secrets of Serverless monitoring. Register Now!',
    thumbnail: 'https://images.pexels.com/photos/3271010/pexels-photo-3271010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  }
}, {
  height: 184,
  avatar: 'https://images.pexels.com/photos/3297502/pexels-photo-3297502.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  name: 'Jessica Alba',
  nickname: '@jessicaalba',
  description: 'I am a Jessica Marie Alba, an American actress, model and businesswoman. I began my television and movie appearances at age 13 in Camp Nowhere and The Secret World of Alex Mack, but rose to prominence at age 19 as the lead actress of the television series Dark Angel, for which she received a Golden Globe nomination.',
  time: '47m',
}, {
  height: 294,
  avatar: 'https://images.pexels.com/photos/3323694/pexels-photo-3323694.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  name: 'New York Times',
  nickname: '@NYTimesMagazine',
  description: 'Solar Power Mandate Approved for California Buildings',
  time: '1m',
  link: {
    website: 'newyorktimes.com',
    description: 'Californians have felt an urgency to move away from using fossil fuels as climate...',
    thumbnail: 'https://images.pexels.com/photos/3206153/pexels-photo-3206153.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
}];

class Twitter extends Component {
  keyExtractor = (item: any) => item.nickname;
  
  renderPost(post: any, id: number) {
    return (
      <AnimatableView {...AnimatableManager.getEntranceByIndex(id, {})}>
        <ListItem key={id} height={post.height} containerStyle={{marginVertical: 10}}>
          <ListItem.Part left containerStyle={{justifyContent: 'space-between'}}>
            <Avatar
              source={post.avatar ? {uri: post.avatar} : null}
              containerStyle={{alignSelf: 'flex-start', marginRight: 8}}
            />
          </ListItem.Part>
          <ListItem.Part middle column>
            <View row centerV>
              <Text text80M>{post.name} </Text>
              <Text dark40>{post.nickname}</Text>
              <Text dark40>{' • ' + post.time}</Text>
            </View>
            <Text>{post.description}</Text>
            {post.link
              ? <Card
                style={{marginTop: 10}}
                height={200}
              >
                <Card.Section imageSource={{uri: post.link.thumbnail}} imageStyle={{height: 120}}/>
                <View padding-s3>
                  <Text dark40>{post.link.website}</Text>
                  <Text>{post.link.description}</Text>
                </View>
              </Card>
            : null}
            <View row style={{justifyContent: 'space-between', marginTop: 10}}>
              <Image
                style={{tintColor: Colors.dark40}}
                source={require('../../../assets/icons/video.png')}/>
              <Image
                style={{tintColor: Colors.dark40}}
                source={require('../../../assets/icons/tags.png')}/>
              <Image
                style={{tintColor: Colors.dark40}}
                source={require('../../../assets/icons/star.png')}/>
              <Image
                style={{tintColor: Colors.dark40}}
                source={require('../../../assets/icons/share.png')}/>
            </View>
          </ListItem.Part>
        </ListItem>
      </AnimatableView>
    );
  }
  
  render() {
    return (
      <FlatList
        data={posts}
        renderItem={({item, index}) => this.renderPost(item, index)}
        keyExtractor={this.keyExtractor}
        style={{paddingHorizontal: 20}}
      />
    );
  }
}

export default Twitter;
