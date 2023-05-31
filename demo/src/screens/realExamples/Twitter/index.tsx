import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View, Text, ListItem, Avatar, Card, Colors, Button} from 'react-native-ui-lib';

const posts = [
  {
    height: 310,
    avatar:
      'https://images.pexels.com/photos/3496994/pexels-photo-3496994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    name: 'Jack',
    nickname: '@jackywhite',
    description: 'Join our live webinar and discover the secrets of successful serverless monitoring.',
    time: '1h',
    link: {
      website: 'helloworld.com',
      description: 'Live Webinar: Secrets of Serverless monitoring. Register Now!',
      thumbnail:
        'https://images.pexels.com/photos/3271010/pexels-photo-3271010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    icons: [
      require('../../../assets/icons/video.png'),
      require('../../../assets/icons/tags.png'),
      require('../../../assets/icons/star.png'),
      require('../../../assets/icons/share.png')
    ]
  },
  {
    height: 196,
    avatar: 'https://images.pexels.com/photos/3297502/pexels-photo-3297502.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    name: 'Jessica Alba',
    nickname: '@jessicaalba',
    description:
      'I am a Jessica Marie Alba, an American actress, model and businesswoman. I began my television and movie appearances at age 13 in Camp Nowhere and The Secret World of Alex Mack, but rose to prominence at age 19 as the lead actress of the television series Dark Angel, for which she received a Golden Globe nomination.',
    time: '47m',
    icons: [
      require('../../../assets/icons/video.png'),
      require('../../../assets/icons/tags.png'),
      require('../../../assets/icons/star.png'),
      require('../../../assets/icons/share.png')
    ]
  },
  {
    height: 310,
    avatar:
      'https://images.pexels.com/photos/3323694/pexels-photo-3323694.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    name: 'New York Times',
    nickname: '@NYTimesMagazine',
    description: 'Solar Power Mandate Approved for California Buildings',
    time: '1m',
    link: {
      website: 'newyorktimes.com',
      description: 'Californians have felt an urgency to move away from using fossil fuels as climate...',
      thumbnail:
        'https://images.pexels.com/photos/3206153/pexels-photo-3206153.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    icons: [
      require('../../../assets/icons/video.png'),
      require('../../../assets/icons/tags.png'),
      require('../../../assets/icons/star.png'),
      require('../../../assets/icons/share.png')
    ]
  }
];

class Twitter extends Component {
  keyExtractor = (item: any) => item.nickname;

  renderPost(post: any, id: number) {
    return (
      <View padding-page>
        <ListItem key={id} height={post.height} containerStyle={styles.post}>
          <ListItem.Part left containerStyle={{justifyContent: 'space-between'}}>
            <Avatar source={post.avatar ? {uri: post.avatar} : undefined} containerStyle={styles.avatar}/>
          </ListItem.Part>
          <ListItem.Part middle column>
            <View row centerV>
              <Text text80M>{post.name} </Text>
              <Text grey40>{post.nickname}</Text>
              <Text grey40>{' • ' + post.time}</Text>
            </View>
            <Text>{post.description}</Text>
            {post.link ? (
              <Card style={{marginTop: 10}} height={200}>
                <Card.Section imageSource={{uri: post.link.thumbnail}} imageStyle={{height: 120}}/>
                <View padding-s3>
                  <Text grey40>{post.link.website}</Text>
                  <Text>{post.link.description}</Text>
                </View>
              </Card>
            ) : null}
            <View row style={{justifyContent: 'space-between', marginVertical: 10}}>
              {post.icons
                ? post.icons.map((icnSource: any, index: number) => {
                  return (
                    <Button
                      key={index}
                      iconSource={icnSource}
                      iconStyle={styles.icon}
                      backgroundColor={'transparent'}
                    />
                  );
                })
                : null}
            </View>
          </ListItem.Part>
        </ListItem>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        data={posts}
        renderItem={({item, index}) => this.renderPost(item, index)}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  post: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey70,
    paddingHorizontal: 20
  },
  avatar: {
    alignSelf: 'flex-start',
    marginRight: 8,
    marginTop: 8
  },
  icon: {
    tintColor: Colors.grey40,
    width: 20,
    height: 20
  }
});

export default Twitter;
