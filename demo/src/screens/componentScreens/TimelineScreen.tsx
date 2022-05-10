import React, {useCallback, useRef} from 'react';
import {ScrollView} from 'react-native';
import {Assets, Colors, Timeline, TimelineProps, View, Card, Text} from 'react-native-ui-lib';

const contents = [
  'Current (default) state with dashed and solid (default) lines.\nAligned to title',
  'Success state with label.',
  'Error state with icon.',
  'Custom color with icon and outline.\nAligned to title',
  'Next state with outline.',
  'Next state with circle point and entry point.'
];

const TimelineScreen = () => {
  const targetContainer = useRef();
  const target = useRef();

  const renderContent = useCallback((props: TimelineProps) => {
    const index = Number(props.testID) || 0;
    return (
      <Card flex padding-page ref={targetContainer}>
        <Text text70BO ref={target}>Step {index + 1}</Text>
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
        <Timeline 
          height={180}
          renderContent={renderContent}
          bottomLine={{type: Timeline.lineTypes.DASHED}}
          point={{
            targetContainerRef: targetContainer,
            alignmentTargetRef: target
          }}
          testID={'0'}
        />
        <Timeline 
          height={120}
          renderContent={renderContent}
          topLine={{type: Timeline.lineTypes.DASHED}}
          bottomLine={{
            state: Timeline.states.SUCCESS
          }}
          point={{
            state: Timeline.states.SUCCESS,
            label: 2
          }}
          testID={'1'}
        />
        <Timeline 
          height={120}
          renderContent={renderContent}
          topLine={{
            state: Timeline.states.SUCCESS
          }}
          bottomLine={{
            state: Timeline.states.ERROR
          }}
          point={{
            state: Timeline.states.ERROR,
            icon: Assets.icons.demo.settings
          }}
          testID={'2'}
        />
        <Timeline 
          height={150}
          renderContent={renderContent}
          topLine={{
            state: Timeline.states.ERROR
          }}
          bottomLine={{
            type: Timeline.lineTypes.DASHED,
            color: Colors.orange40
          }}
          point={{
            type: Timeline.pointTypes.OUTLINE,
            color: Colors.orange40,
            icon: Assets.icons.demo.camera,
            targetContainerRef: targetContainer,
            alignmentTargetRef: target
          }}
          testID={'3'}
        />
        <Timeline 
          height={120}
          renderContent={renderContent}
          topLine={{
            type: Timeline.lineTypes.DASHED,
            color: Colors.orange40
          }}
          bottomLine={{
            state: Timeline.states.NEXT,
            type: Timeline.lineTypes.DASHED
          }}
          point={{
            state: Timeline.states.NEXT,
            type: Timeline.pointTypes.OUTLINE
          }}
          testID={'4'}
        />
        <Timeline 
          height={150}
          renderContent={renderContent}
          topLine={{
            state: Timeline.states.NEXT,
            type: Timeline.lineTypes.DASHED
          }}
          bottomLine={{
            state: Timeline.states.NEXT,
            entry: true
          }}
          point={{
            state: Timeline.states.NEXT,
            type: Timeline.pointTypes.CIRCLE
          }}
          testID={'5'}
        />
      </ScrollView>
    </>
  );
};

export default TimelineScreen;
