
import React, {useCallback, useRef, useState} from 'react';
import Timeline from 'react-native-ui-lib/Timeline';
import Card from 'react-native-ui-lib/Card';
import View from 'react-native-ui-lib/View';
import Text from 'react-native-ui-lib/Text';
import Button from 'react-native-ui-lib/Button';
import {Colors} from 'react-native-ui-lib/style';
import {Assets} from 'react-native-ui-lib';

const contents = [
  'CURRENT (default) state with dashed line.\nAligned to title',
  'SUCCESS state with label.',
  'ERROR state with icon.',
  'Custom color with icon and outline.\nAligned to title',
  'NEXT state with outline.',
  'NEXT state with circle point and entry point.'
];

const TimelineWrapper = () => {
  const [expand, setExpand] = useState(false);
  const anchor = useRef();

  const onPressExpand = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  const renderExtraContent = () => {
    return (
      <View style={{flex: 1, marginTop: 10, padding: 10, backgroundColor: Colors.grey70}}>
        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry</Text>
      </View>
    );
  };

  const renderContent = (index = 0, anchorRef?: any) => {
    return (
      <Card style={{padding: 10}}>
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
    <View flex>
      <Timeline
        bottomLine={{type: Timeline.lineTypes.DASHED}}
        point={{anchorRef: anchor}}
      >
        {renderContent(0, anchor)}
      </Timeline>
      <Timeline
        topLine={{type: Timeline.lineTypes.DASHED}}
        bottomLine={{state: Timeline.states.SUCCESS}}
        point={{
          state: Timeline.states.SUCCESS,
          label: 2,
          anchorRef: undefined
        }}
      >
        {renderContent(1, undefined)}
      </Timeline>

      <Timeline
        topLine={{state: Timeline.states.SUCCESS}}
        bottomLine={{state: Timeline.states.ERROR}}
        point={{
          state: Timeline.states.ERROR,
          icon: Assets.internal.icons.check
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
          icon: Assets.internal.icons.search
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
    </View>
  );
};

export default TimelineWrapper;
