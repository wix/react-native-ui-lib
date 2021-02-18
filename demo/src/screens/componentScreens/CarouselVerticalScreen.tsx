import {Carousel, Constants, Text, View, Colors} from 'react-native-ui-lib';
import React, {Component} from 'react';
import _ from 'lodash';
import {StyleSheet} from 'react-native';
import {
  renderBooleanOption,
  renderSliderOption
} from '../ExampleScreenPresenter';

interface Props {}

interface State {
  numberOfPagesShown: number;
  autoplay: boolean;
}

const BACKGROUND_COLORS = [
  Colors.red50,
  Colors.yellow20,
  Colors.purple50,
  Colors.green50,
  Colors.cyan50,
  Colors.purple20,
  Colors.blue60,
  Colors.red10,
  Colors.green20,
  Colors.purple60
];

const pageHeight = Constants.windowHeight / 2;

class CarouselVerticalScreen extends Component<Props, State> {
  carousel = React.createRef<typeof Carousel>();

  constructor(props: Props) {
    super(props);

    this.state = {
      numberOfPagesShown: 5,
      autoplay: false
    };
  }

  render() {
    const {numberOfPagesShown, autoplay} = this.state
    return (
      <View flex paddingT-20>
        <View marginH-20 marginB-20>
          {renderBooleanOption.call(this, 'autoplay', 'autoplay')}
          {renderSliderOption.call(
            this,
            'Number of pages shown',
            'numberOfPagesShown',
            {
              min: 3,
              max: 10,
              step: 1,
              initial: 5
            }
          )}
        </View>
        <Carousel
          key={'carousel'}
          ref={this.carousel}
          autoplay={autoplay}
          pageWidth={Constants.windowWidth}
          pageHeight={pageHeight}
          initialPage={0}
          containerStyle={{height: pageHeight}}
          allowAccessibleLayout
          horizontal={false}
        >
          {_.map([...Array(numberOfPagesShown)], (_, index) => (
            <Page
              style={{backgroundColor: BACKGROUND_COLORS[index]}}
              key={index}
            >
              <Text style={styles.pageText}>{index}</Text>
            </Page>
          ))}
        </Carousel>
      </View>
    );
  }
}

// @ts-ignore
const Page = ({children, style, ...others}) => {
  return (
    <View center {...others} style={[styles.page, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  page: {
    flex: 1,
    height: pageHeight,
    width: Constants.windowWidth
  },
  pageText: {
    fontSize: 40,
    color: 'white'
  }
});

export default CarouselVerticalScreen
