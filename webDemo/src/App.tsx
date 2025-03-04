import _ from 'lodash';
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, ScrollView, ActivityIndicator, Animated as RNAnimated} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
// import TextField from 'react-native-ui-lib/TextField';
import View from 'react-native-ui-lib/View';
import Button from 'react-native-ui-lib/Button';
import Switch from 'react-native-ui-lib/Switch';
import Checkbox from 'react-native-ui-lib/Checkbox';
import Slider from 'react-native-ui-lib/Slider';
import Stepper from 'react-native-ui-lib/Stepper';
import Icon from 'react-native-ui-lib/Icon';
import DateTimePicker from 'react-native-ui-lib/DateTimePicker';
// import FloatingButton from 'react-native-ui-lib/FloatingButton'
import Chip from 'react-native-ui-lib/Chip';
import Badge from 'react-native-ui-lib/Badge';
import ProgressBar from 'react-native-ui-lib/ProgressBar';
import AnimatedImage from 'react-native-ui-lib/AnimatedImage';
import Avatar from 'react-native-ui-lib/Avatar';
import Drawer from 'react-native-ui-lib/Drawer';
import Image from 'react-native-ui-lib/Image';

import {
  Colors,
  Spacings,
  Typography,
  Assets,
  Text,
  Incubator,
  SegmentedControl,
  ColorPicker
} from 'react-native-ui-lib';

import Picker from './examples/Picker';
import RadioGroup from './examples/RadioButtonGroup';
import Timeline from './examples/Timeline';
import StackAggregator from './examples/StackAggregator';
// import {Image, ProgressiveImage} from './examples/Image';
import List from './examples/List';
import CarouselWrapper from './examples/Carousel';
import Test from './examples/Test';
interface ItemToRender {
  title: string;
  FC: React.FC;
}
const svgData =
  '<svg data-bbox="18.5 31.5 163.1 137.2" viewBox="0 0 200 200" height="200" width="200" xmlns="http://www.w3.org/2000/svg" data-type="color">\n    <g>\n        <path d="M18.5 99.5c0-5.7 2.3-10.8 6-14.5L72 37.5c3.7-3.7 8.8-6 14.5-6 11.4 0 20.5 9.2 20.5 20.5 0 5.7-2.3 10.8-6 14.5L88.1 79.4h72.3c11.7 0 21.2 9.5 21.2 21.2s-9.5 21.2-21.2 21.2H89.1l11.9 11.9c3.7 3.7 6 8.8 6 14.5 0 11.3-9.2 20.5-20.5 20.5-5.7 0-10.8-2.3-14.5-6L24.5 115c-3.7-3.7-6-8.8-6-14.5 0-.2 0-.4.1-.6 0 0-.1-.3-.1-.4z" fill="#000010" data-color="1"/>\n    </g>\n</svg>\n';
const COLORS = [Colors.red40, Colors.blue40, Colors.green40, Colors.yellow30];

const itemsToRender: ItemToRender[] = [
  // {title: 'Test', FC: Test},
  {
    title: 'AnimatedImage',
    FC: () => {
      const AnimatedImage = Animated.createAnimatedComponent(Image);
      const opacity = useSharedValue(0); // Initial opacity set to 0

      useEffect(() => {
        // Start the fade-in animation
        opacity.value = withTiming(1, {duration: 1000}); // Adjust duration as needed
      }, [opacity]);

      // Create an animated style for the image
      const animatedStyle = useAnimatedStyle(() => {
        return {
          opacity: opacity.value // Animated opacity value
        };
      });

      return (
        <View bg-grey80 flex padding-20>
          <Animated.Image
            source={{
              uri: 'https://randomuser.me/api/portraits/women/24.jpg'
            }}
            width={100}
            height={100}
            style={animatedStyle} // Apply the animated style
          />
        </View>
      );
    }
  }
  // {
  //   title: 'Avatar',
  //   FC: () => (
  //     <Avatar
  //       source={{
  //         uri: 'https://randomuser.me/api/portraits/women/24.jpg'
  //       }}
  //       animate
  //     />
  //   )
  // },
  // {
  //   title: 'ColorPicker',
  //   FC: () => {
  //     const [color, setColor] = useState<string | undefined>(COLORS[0]);
  //     const [colors, setColors] = useState<string[]>(COLORS);

  //     const onValueChange = (color: string) => {
  //       setColor(color);
  //       console.log(`updating color to ${color}`);
  //     };

  //     const onSubmit = (color: string) => {
  //       const newArray = _.clone(colors);
  //       newArray.push(color);
  //       setColors(newArray);
  //     };

  //     return (
  //       <View>
  //         <Text center marginT-s2 style={{color}}>
  //           Selected color: {color}
  //         </Text>

  //         <ColorPicker
  //           initialColor={COLORS[0]}
  //           value={color}
  //           onSubmit={onSubmit}
  //           colors={colors}
  //           onValueChange={onValueChange}
  //           dialogProps={{
  //             width: '30%'
  //           }}
  //         />
  //       </View>
  //     );
  //   }
  // }
];

function App() {
  return (
    <View flex>
      <ScrollView>
        <View padding-page>
          <Text style={styles.title}>Welcome to react-native-ui-lib for Web</Text>
        </View>

        {itemsToRender.map(({title, FC}: ItemToRender) => (
          <View bg-grey80 paddingT-s5 paddingB-s5 center style={styles.componentContainer} key={'component_' + title}>
            <Text style={styles.compTitle}> {title} </Text>
            <FC />
          </View>
        ))}
      </ScrollView>
      {/* <FloatingButton
        visible={true}
        button={{ label: 'Approve', onPress: () => console.log('approved') }}
        secondaryButton={{ label: 'Not now', color: Colors.$textDangerLight }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20
  },
  componentContainer: {
    width: '100%',
    borderColor: 'white',
    borderBottomWidth: 5
  },
  compTitle: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginVertical: 4,
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginVertical: '1em',
    textAlign: 'center'
  }
});

export default App;
