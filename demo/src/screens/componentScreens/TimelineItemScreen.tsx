import React, {useCallback, useRef} from 'react';
import {ScrollView} from 'react-native';
import {Assets, Colors, TimelineItem, View, Card, Text} from 'react-native-ui-lib';

const TimelineItemScreen = () => {
  const header = useRef();

  const renderContent = useCallback(() => {
    return (
      <Card flex padding-page>
        <Text text70BO ref={header}>title</Text>
        <View flex margin-10>
          <Text>content</Text>
        </View>
      </Card>
    );
  }, []);

  return (
    <ScrollView>
      <TimelineItem 
        height={200}
        renderContent={renderContent}
        bottomLine={{type: TimelineItem.lineTypes.DASHED}}
        point={{alignmentTargetRef: header}}
      />
      <TimelineItem 
        height={120}
        renderContent={renderContent}
        topLine={{
          type: TimelineItem.lineTypes.DASHED
        }}
        bottomLine={{
          state: TimelineItem.states.SUCCESS
        }}
        point={{
          state: TimelineItem.states.SUCCESS,
          label: 2
        }}
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
          type: TimelineItem.pointTypes.HALO
        }}
      />
      <TimelineItem 
        height={120}
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
          alignmentTargetRef: header
        }}
      />
      <TimelineItem 
        height={80}
        renderContent={renderContent}
        topLine={{
          type: TimelineItem.lineTypes.DASHED,
          color: Colors.orange40
        }}
        bottomLine={{
          state: TimelineItem.states.NEXT,
          initial: true
        }}
        point={{
          state: TimelineItem.states.NEXT,
          type: TimelineItem.pointTypes.HOLLOW
        }}
      />
    </ScrollView>
  );
};

export default TimelineItemScreen;
