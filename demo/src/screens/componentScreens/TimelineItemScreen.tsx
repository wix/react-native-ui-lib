import React, {useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Assets, Colors, TimelineItem, Card, Text} from 'react-native-ui-lib';

const TimelineItemScreen = () => {
  
  const renderContent = useCallback(() => {
    return (
      <Card flex center style={{height: 200, backgroundColor: Colors.green50}}>
        <Text>This is content</Text>
      </Card>
    );
  }, []);

  return (
    <ScrollView>
      <TimelineItem 
        state={TimelineItem.states.NEXT} 
        renderContent={renderContent}
        topLine={{type: TimelineItem.lineTypes.DASHED, color: Colors.violet40}}
        // bottomLine={{type: TimelineItem.lineTypes.FULL}}
        point={{
          type: TimelineItem.pointTypes.HALO,
          color: Colors.orange40,
          // icon: Assets.icons.demo.camera,
          label: 2
        }}
      />
    </ScrollView>
  );
};

export default TimelineItemScreen;
