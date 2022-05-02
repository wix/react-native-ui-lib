import React, {useCallback, useRef} from 'react';
import {ScrollView/* , LayoutChangeEvent */} from 'react-native';
import {Assets, Colors, TimelineItem, TimelineItemProps, View, Card, Text} from 'react-native-ui-lib';

const contents = [
  'Current (default) state with dashed and full (default) lines.\nAligned to title',
  'Success state with label.',
  'Error state with icon.',
  'Custom color with icon and halo.\nAligned to title',
  'Next state with halo.',
  'Next state with hollow point and entry point.'
];

const TimelineItemScreen = () => {
  const parent = useRef();
  const target = useRef();

  // const onLayout = useCallback((event: LayoutChangeEvent) => {
  //   const {x, y, width, height} = event.nativeEvent.layout;
  //   console.warn('onLayout: ', x, y, width, height);
  // }, []);

  const renderContent = useCallback((props: TimelineItemProps) => {
    const index = Number(props.testID) || 0;
    return (
      <Card flex padding-page ref={parent}>
        <Text text70BO ref={target}/*  onLayout={onLayout} */>Step {index + 1}</Text>
        <View flex marginT-5 padding-5 bg-grey80 br30>
          <Text>{contents[index]}</Text>
        </View>
      </Card>
    );
  }, []);

  return (
    <>
      <Text h1 $textDefault margin-20>Timeline</Text>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <TimelineItem 
          height={180}
          renderContent={renderContent}
          topLine={{type: TimelineItem.lineTypes.DASHED}}
          point={{
            parentRef: parent,
            alignmentTargetRef: target
          }}
          testID={'0'}
        />
        <TimelineItem 
          height={120}
          renderContent={renderContent}
          bottomLine={{
            state: TimelineItem.states.SUCCESS
          }}
          point={{
            state: TimelineItem.states.SUCCESS,
            label: 2
          }}
          testID={'1'}
        />
        <TimelineItem 
          height={120}
          renderContent={renderContent}
          topLine={{
            state: TimelineItem.states.SUCCESS
          }}
          bottomLine={{
            state: TimelineItem.states.ERROR
          }}
          point={{
            state: TimelineItem.states.ERROR,
            icon: Assets.icons.demo.settings
          }}
          testID={'2'}
        />
        <TimelineItem 
          height={150}
          renderContent={renderContent}
          topLine={{
            state: TimelineItem.states.ERROR
          }}
          bottomLine={{
            type: TimelineItem.lineTypes.DASHED,
            color: Colors.orange40
          }}
          point={{
            type: TimelineItem.pointTypes.HALO,
            color: Colors.orange40,
            icon: Assets.icons.demo.camera,
            parentRef: parent,
            alignmentTargetRef: target
          }}
          testID={'3'}
        />
        <TimelineItem 
          height={120}
          renderContent={renderContent}
          topLine={{
            type: TimelineItem.lineTypes.DASHED,
            color: Colors.orange40
          }}
          bottomLine={{
            state: TimelineItem.states.NEXT,
            type: TimelineItem.lineTypes.DASHED
          }}
          point={{
            state: TimelineItem.states.NEXT,
            type: TimelineItem.pointTypes.HALO
          }}
          testID={'4'}
        />
        <TimelineItem 
          height={150}
          renderContent={renderContent}
          topLine={{
            state: TimelineItem.states.NEXT,
            type: TimelineItem.lineTypes.DASHED
          }}
          bottomLine={{
            state: TimelineItem.states.NEXT,
            entry: true
          }}
          point={{
            state: TimelineItem.states.NEXT,
            type: TimelineItem.pointTypes.HOLLOW
          }}
          testID={'5'}
        />
      </ScrollView>
    </>
  );
};

export default TimelineItemScreen;
