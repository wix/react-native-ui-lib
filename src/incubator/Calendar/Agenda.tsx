import React, {useContext, useCallback, useRef} from 'react';
import {runOnJS, useAnimatedReaction, useSharedValue} from 'react-native-reanimated';
import {FlashList, ViewToken} from '@shopify/flash-list';
import {Constants} from '../../commons/new';
import {BorderRadiuses} from 'style';
import View from '../../components/view';
import Text from '../../components/text';
import {HOUR_TO_MS} from './helpers/DateUtils';
import {InternalEvent, Event, DateSectionHeader, AgendaProps} from './types';
import CalendarContext from './CalendarContext';

function Agenda(props: AgendaProps) {
  const {data, selectedDate, setDate} = useContext(CalendarContext);
  const flashList = useRef<FlashList<InternalEvent>>(null);
  const closestSectionHeader = useSharedValue<DateSectionHeader | null>(null);
  const scrolledByUser = useSharedValue<boolean>(true);

  const keyExtractor = useCallback((item: InternalEvent) => {
    return item.type === 'Event' ? item.id : item.header;
  }, []);

  const renderEvent = useCallback((item: Event) => {
    return (
      <View
        marginV-1
        marginH-10
        paddingH-10
        height={(50 * (item.end - item.start)) / HOUR_TO_MS}
        style={{borderWidth: 1, borderRadius: BorderRadiuses.br20, justifyContent: 'center'}}
      >
        <Text style={{}}>
          Item for{' '}
          {new Date(item.start).toLocaleString('en-GB', {
            month: 'short',
            day: 'numeric',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
          })}
          -{new Date(item.end).toLocaleString('en-GB', {hour12: false, hour: '2-digit', minute: '2-digit'})}
        </Text>
      </View>
    );
  }, []);

  const renderHeader = useCallback((item: DateSectionHeader) => {
    return (
      <View margin-5 marginT-15>
        <Text>{item.header}</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(({item, index}: {item: InternalEvent; index: number}) => {
    switch (item.type) {
      case 'Event':
        return renderEvent(item);
      case 'Header':
        return renderHeader(item);
    }
  },
  [renderEvent, renderHeader]);

  const getItemType = useCallback(item => item.type, []);

  const findClosestDateAfter = useCallback((selected: number) => {
    'worklet';
    for (let index = 0; index < data.length; ++index) {
      const item = data[index];
      if (item.type === 'Header') {
        if (item.date >= selected) {
          return {dateSectionHeader: item, index};
        }
      }
    }

    return null;
  },
  [data]);

  const scrollToIndex = useCallback((index: number, isInitial: boolean) => {
    if (isInitial) {
      setTimeout(() => {
        flashList.current?.scrollToIndex({index, animated: false});
      },
      Constants.isIOS ? 500 : 1000); // TODO: Find a better solution (compare where we got to?)
    } else {
      flashList.current?.scrollToIndex({index, animated: true});
    }
  }, []);

  useAnimatedReaction(() => {
    return selectedDate.value;
  },
  (selected, previous) => {
    if (selected !== previous && selected !== closestSectionHeader.value?.date) {
      const result = findClosestDateAfter(selected);
      if (result !== null) {
        const {dateSectionHeader, index} = result;
        closestSectionHeader.value = dateSectionHeader;
        scrolledByUser.value = false;
        runOnJS(scrollToIndex)(index, !previous);
      }
    }
  },
  [findClosestDateAfter]);

  const onViewableItemsChanged = useCallback(({viewableItems}: {viewableItems: ViewToken[]}) => {
    if (scrolledByUser.value) {
      const result = viewableItems.find(item => item.item.type === 'Header');
      if (result) {
        const {item}: {item: DateSectionHeader} = result;
        if (closestSectionHeader.value?.date !== item.date) {
          closestSectionHeader.value = item;
          setDate(item.date);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMomentumScrollBegin = useCallback(() => {
    scrolledByUser.value = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScrollBeginDrag = useCallback(() => {
    scrolledByUser.value = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlashList
      ref={flashList}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      getItemType={getItemType}
      onViewableItemsChanged={onViewableItemsChanged}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onScrollBeginDrag={onScrollBeginDrag}
    />
  );
}

export default Agenda;
