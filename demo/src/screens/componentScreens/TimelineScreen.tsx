import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Assets, Colors, Timeline, View, Card, Text, Button} from 'react-native-ui-lib';

const contents = [
  'CURRENT (default) state with dashed line.\nAligned to title',
  'SUCCESS state with label.',
  'ERROR state with icon.',
  'Custom color with icon and outline.\nAligned to title',
  'NEXT state with outline.',
  'NEXT state with circle point and entry point.'
];

const TimelineScreen = () => {
  const [expand, setExpand] = useState(false);
  const target = useRef();

  const onPress = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  const renderContent = (index = 0, targetRef?: any) => {
    return (
      <Card padding-page>
        <Text text70BO ref={targetRef}>
          Step {index + 1}
        </Text>
        <View marginT-5 padding-8 bg-grey70 br30>
          <Text>{contents[index]}</Text>
          <Button marginT-10 size={'small'} label={'Expand'} onPress={onPress}/>
          {expand && <View style={{height: 100, margin: 10, backgroundColor: 'red'}}/>}
        </View>
      </Card>
    );
  };

  return (
    <>
      <Text h1 $textDefault margin-20>
        Timeline
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        <Timeline
          // topLine={{
          //   type: Timeline.lineTypes.DASHED, 
          //   entry: true
          // }}
          bottomLine={{type: Timeline.lineTypes.DASHED}}
          point={{alignmentTargetRef: target}}
        >
          {renderContent(0, target)}
        </Timeline>
        <Timeline
          topLine={{type: Timeline.lineTypes.DASHED}}
          bottomLine={{state: Timeline.states.SUCCESS}}
          point={{
            state: Timeline.states.SUCCESS,
            label: 2
          }}
        >
          {renderContent(1)}
        </Timeline>

        <Timeline
          topLine={{state: Timeline.states.SUCCESS}}
          bottomLine={{state: Timeline.states.ERROR}}
          point={{
            state: Timeline.states.ERROR,
            icon: Assets.icons.demo.settings
          }}
        >
          {renderContent(2)}
        </Timeline>
        <Timeline
          topLine={{state: Timeline.states.ERROR}}
          bottomLine={{
            type: Timeline.lineTypes.DASHED,
            color: Colors.orange40
          }}
          point={{
            type: Timeline.pointTypes.OUTLINE,
            color: Colors.orange40,
            icon: Assets.icons.demo.camera
          }}
        >
          {renderContent(3)}
        </Timeline>
        <Timeline
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
        >
          {renderContent(4)}
        </Timeline>

        <Timeline
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
        >
          {renderContent(5)}
        </Timeline>
      </ScrollView>
    </>
  );
};

export default TimelineScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  }
});
