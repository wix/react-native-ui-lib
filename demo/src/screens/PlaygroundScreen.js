import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors, Image, Card, View, Text} from 'react-native-ui-lib'; //eslint-disable-line

const data = [
  {
    title: 'Parrot',
    description:
      'Parrots, also known as psittacines, are birds of the roughly 393 species in 92 genera that make up the order Psittaciformes, found in most tropical and subtropical regions. The order is subdivided into three superfamilies: the Psittacoidea, the Cacatuoidea, and the Strigopoidea.',
    image: 'https://pbs.twimg.com/profile_images/378800000736064818/a8fbf8e2b843f6d6756c8fbd831fb2ba.jpeg',
  },
  {
    title: 'Owl',
    description:
      'DescriptionOwls are birds from the order Strigiformes, which includes about 200 species of mostly solitary and nocturnal birds of prey typified by an upright stance, a large, broad head, binocular vision, binaural hearing, sharp talons, and feathers adapted for silent flight.',
    image: 'https://i.pinimg.com/originals/e5/e3/92/e5e3927bdc7b3afae1e0503757dfee42.jpg',
  },
  {
    title: 'Penguin',
    description:
      'DescriptionPenguins are a group of aquatic flightless birds. They live almost exclusively in the Southern Hemisphere, with only one species, the Galapagos penguin, found north of the equator. Highly adapted for life in the water, penguins have countershaded dark and white plumage, and their wings have evolved into flippers.',
    image: 'https://sites.google.com/site/cabrillolab/_/rsrc/1359185743777/penguin-research-links/Gentoo.png',
  },
  {
    title: 'Stork',
    description:
      'DescriptionStorks are large, long-legged, long-necked wading birds with long, stout bills. They belong to the family called Ciconiidae, and make up the order Ciconiiformes. Ciconiiformes previously included a number of other families, such as herons and ibises, but those families have been moved to other orders. ',
    image: 'https://cdn130.picsart.com/296060988068201.jpg?c256x256',
  },
  {
    title: 'Goose',
    description:
      'DescriptionGeese are waterfowl of the family Anatidae. This group comprises the genera Anser and Branta. Chen, a genus comprising \'white geese\', is sometimes used to refer to a group of species that are more commonly placed within Anser. Some other birds, mostly related to the shelducks, have "goose" as part of their names.',
    image: 'https://static-s.aa-cdn.net/img/ios/1216464827/8c6ebccbcff77b69747998fbd1456883?v=1',
  },
];

export default class PlaygroundScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static options = {
    topBar: {
      visible: false,
    },
  };

  componentDidMount() {}

  renderCard(index) {
    return (
      <Card padding-20 marginB-20>
        <View row centerV>
          <Image source={{uri: data[index].image}} style={{height: 50, width: 50, borderRadius: 2}} />
          <Text marginL-10 text40>
            {data[index].title}
          </Text>
        </View>

        <Text marginT-10 tex80 numberOfLines={3} dark20>
          {data[index].description}
        </Text>
      </Card>
    );
  }

  render() {
    return (
      <ScrollView>
        <View flex padding-20>
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
          {this.renderCard(4)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
