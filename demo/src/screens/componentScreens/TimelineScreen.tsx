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
  const [anchorIndex, setAnchorIndex] = useState(0);
  const [expand, setExpand] = useState(false);
  const anchor = useRef();

  const onPress = useCallback(() => {
    setAnchorIndex(anchorIndex === 0 ? 1 : 0);
  }, [anchorIndex]);

  const onPressExpand = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  const renderExtraContent = () => {
    return (
      <View style={{flex: 1, marginTop: 10, backgroundColor: Colors.grey70}}>
        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
      </View>
    );
  };

  const renderContent = (index = 0, anchorRef?: any) => {
    return (
      <Card padding-page>
        <Text text70BO ref={anchorRef}>
          Step {index + 1}
        </Text>
        <View marginT-5 padding-8 bg-grey70 br30>
          <Text>{contents[index]}</Text>
          <View right>
            <Button marginT-10 link size={'small'} label={!expand ? 'More info' : 'Close'} onPress={onPressExpand}/>
          </View>
          {expand && renderExtraContent()}
        </View>
      </Card>
    );
  };

  return (
    <>
      <View row margin-20 spread>
        <Text h1 $textDefault margin-20>
          Timeline
        </Text>
        <Button margin-20 link size={'small'} label={'Change Points Anchor'} onPress={onPress}/>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Timeline
          // key={String(expand)}
          // topLine={{
          //   type: Timeline.lineTypes.DASHED, 
          //   entry: true
          // }}
          bottomLine={{type: Timeline.lineTypes.DASHED}}
          // bottomLine={{state: Timeline.states.SUCCESS}}
          point={{anchorRef: anchorIndex === 0 ? anchor : undefined}}
        >
          {renderContent(0, anchorIndex === 0 ? anchor : undefined)}
        </Timeline>
        <Timeline
          topLine={{type: Timeline.lineTypes.DASHED}}
          bottomLine={{state: Timeline.states.SUCCESS}}
          point={{
            state: Timeline.states.SUCCESS,
            label: 2,
            anchorRef: anchorIndex === 1 ? anchor : undefined
          }}
        >
          {renderContent(1, anchorIndex === 1 ? anchor : undefined)}
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
            color: Colors.purple30
          }}
          point={{
            type: Timeline.pointTypes.OUTLINE,
            color: Colors.purple30,
            icon: Assets.icons.demo.camera
          }}
        >
          {renderContent(3)}
        </Timeline>
        <Timeline
          topLine={{
            type: Timeline.lineTypes.DASHED,
            color: Colors.purple30
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
