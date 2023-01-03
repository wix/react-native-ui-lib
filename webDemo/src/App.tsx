import React, {useState, useRef} from 'react';
import {StyleSheet, ScrollView, ActivityIndicator, Animated} from 'react-native';

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

import {
  Colors,
  Spacings,
  Typography,
  Assets,
  Text,
  Incubator
} from 'react-native-ui-lib';

import Picker from './examples/Picker';
import RadioGroup from './examples/RadioButtonGroup';
import Timeline from './examples/Timeline';
import StackAggregator from './examples/StackAggregator';
import {Image, ProgressiveImage} from './examples/Image';
import List from './examples/List';
import CarouselWrapper from './examples/Carousel';
interface ItemToRender {
  title: string,
  FC: React.FC
}

const itemsToRender: ItemToRender[] = [
  {
    title: 'ca',
    FC: CarouselWrapper

  },
  {
    title: 'Text',
    FC: () => {
      const [toggle, setToggle] = useState(false);
      const animatedValue = useRef(new Animated.Value(0)).current;

      const animate = () => {
        setToggle(!toggle);
        Animated.timing(animatedValue, {
          toValue: Number(toggle),
          duration: 300,
          useNativeDriver: true
        }).start();
      };

      return (
        <Text
          // blue50
          // text60
          // bg-grey60
          underline
          highlightString={'UI-lib'}
          highlightStyle={{fontWeight: '2', color: Colors.blue10}}
          animated
          style={{fontSize: 24, color: Colors.blue50, fontWeight: 'bold', transform: [{scale: animatedValue.interpolate({inputRange: [0, 1], outputRange: [1, 2]})}]}}
          onPress={animate}
        >
          This is mobile UI-lib text
        </Text>
      );
    }
  },
  {
    title: 'Button',
    FC: () => (
      <Button
        label={'Press'}
        size={Button.sizes.medium}
        iconSource={Assets.icons.check}
        iconOnRight
        onPress={() => {
          console.log('button pressed');
        }}
      />
    )
  },
  {
    title: 'Link Button',
    FC: () => (
      <Button
        label={'Press'}
        size={Button.sizes.medium}
        link
        onPress={() => {
          console.log('link button pressed');
        }}
      />
    )
  },
  {
    title: 'Chip',
    FC: () => (

      <Chip
        resetSpacings
        borderRadius={22}
        label={'Chip'}
        labelStyle={{color: Colors.red20, marginHorizontal: Spacings.s3, ...Typography.text80BO}}
        iconStyle={{width: 16, height: 16}}
        avatarProps={{
          source: {
            uri: 'https://randomuser.me/api/portraits/women/24.jpg'
          }, size: 28
        }}
        onDismiss={() => alert('onDismiss')}
        dismissIconStyle={{width: 10, height: 10, marginRight: Spacings.s3}}
        dismissColor={Colors.red20}
        containerStyle={{
          borderColor: Colors.red20,
          borderBottomRightRadius: 0,
          marginLeft: Spacings.s3
        }}
      />
    )
  },
  {
    title: 'Badge',
    FC: () => (
      <Badge label={'999'} size={20}/>
    )
  },
  {
    title: 'ProgressBar',
    FC: () => {
      const [value, setProgressValue] = useState(0);

      const startProgress = () => {
        const newValue = Math.min(value + 5, 100);
        setProgressValue(newValue);
      };

      return (
        <View flex style={{width: 200}}>
          <Button label={'Start'} onPress={startProgress} size={Button.sizes.medium} marginB-s3 style={{width: 50, alignSelf: 'center'}}/>
          <ProgressBar
            progress={value}
            fullWidth
          />
        </View>
      );
    }
  },
  {
    title: 'TextField',
    FC: () => {
      const [defaultValue, setDefaultValue] = useState('I am Default value');
      const updateDefaultValue = () => {
        setDefaultValue(`${defaultValue}1`);
      };

      return (
        <>
          <Button label="update default value" onPress={updateDefaultValue}/>
          <Incubator.TextField
            text70
            migrate
            defaultValue={defaultValue}
            containerStyle={{marginBottom: 10}}
            placeholder="type here..."
            onChangeText={(text: string) => {
              console.log(text);
            }}
          />
        </>
      );
    }
  },
  {
    title: 'Switch',
    FC: () => {
      const [switchValue, setSwitchValue] = useState(true);
      return (
        <Switch

          value={switchValue}
          onValueChange={setSwitchValue}
          style={{marginBottom: 20}}
        />
      );
    }
  },
  {
    title: 'RadioGroup',
    FC: RadioGroup
  },
  {
    title: 'Checkbox',
    FC: () => {
      const [isChecked, setIsChecked] = useState(true);
      return (
        <Checkbox
          value={isChecked}
          onValueChange={setIsChecked}
          borderRadius={2}
          size={30}
          selectedIcon={Assets.icons.check}
          marginL-s5
          label={'With label'}
          iconColor={Colors.white}
        />
      );
    }
  },
  {
    title: 'Slider',
    FC: () => {
      const [sliderValue, setSliderValue] = useState(0);
      return (
        <View style={{width: 400}}>
          <Slider
            onValueChange={(value: any) => {
              console.log('setSliderValue: ', value);
              setSliderValue(value);

            }}
            value={sliderValue}
            minimumValue={0}
            maximumValue={10}
            step={1}
          />
        </View>
      );
    }
  },
  {
    title: 'Activity Indicator',
    FC: ActivityIndicator
  },
  {
    title: 'Image',
    FC: Image
  },
  {
    title: 'Progressive Image',
    FC: ProgressiveImage
  },
  {
    title: 'Animated Image',
    FC: () => (
      <AnimatedImage
        containerStyle={{backgroundColor: Colors.black, marginBottom: 10}}
        style={{resizeMode: 'cover', height: 100}}
        source={{uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/07/Large-Sample-Image-download-for-Testing.jpg'}}
        loader={<ActivityIndicator/>}
        key={'AnimatedImage'}
        animationDuration={800}
      />
    )
  },
  {
    title: 'Avatar',
    FC: () => (
      <Avatar
        title={'Big pimple'}
        size={70}
        backgroundColor={'red'}
        source={{
          uri: 'https://randomuser.me/api/portraits/women/24.jpg'
        }}
        badgeProps={{size: 14, borderWidth: 0, backgroundColor: Colors.green30}}
        badgePosition={'TOP_LEFT'}
        animate
      />
    )
  },
  {
    title: 'Drawer',
    FC: () => (
      <Drawer
        rightItems={[{text: 'Read', background: Colors.blue30, onPress: () => console.log('read pressed')}]}
        leftItem={{text: 'Delete', background: Colors.red30, onPress: () => console.log('delete pressed')}}
      >
        <View centerV padding-s4 bg-white style={{height: 60, width: 300}}>
          <Text text70>Slide   left / right</Text>
        </View>
      </Drawer>
    )
  },
  {
    title: 'Stepper',
    FC: Stepper
  },
  {
    title: 'Icon',
    FC: () => (<Icon source={{uri: 'https://github.com/wix/react-native-ui-lib/blob/master/demo/src/assets/icons/delete.png?raw=true'}} size={24} tintColor={Colors.grey40}/>)
  },
  {
    title: 'Picker',
    FC: Picker
  },
  {
    title: 'Date',
    FC: () => (
      <DateTimePicker
        mode={'time'}
        title={'Time'}
        placeholder={'Select time'}

      // timeFormat={'h:mm A'}
      // value={new Date('2015-03-25T12:00:00-06:30')}
      />)
  },
  {
    title: 'StackAggregator',
    FC: StackAggregator
  },
  {
    title: 'List',
    FC: List
  },
  {
    title: 'Timeline',
    FC: Timeline
  }
];

function App() {
  return (
    <View flex>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to react-native-ui-lib for Web</Text>
        </View>

        {
          itemsToRender.map(({title, FC}: ItemToRender) =>
            (
              <View style={styles.componentContainer} key={'component_' + title}>
                <Text style={styles.compTitle}> {title} </Text>
                <FC/>
              </View>
            ))
        }

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
    backgroundColor: '#F5FCFF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderBottomWidth: 5,
    paddingBottom: 20,
    paddingTop: 20
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
