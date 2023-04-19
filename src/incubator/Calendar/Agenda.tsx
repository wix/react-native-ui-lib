import React, {useContext, useCallback, useRef} from 'react';
import {ActivityIndicator} from 'react-native';
import {runOnJS, useAnimatedReaction, useSharedValue} from 'react-native-reanimated';
import {FlashListPackage} from 'optionalDeps';
import type {FlashList as FlashListType, ViewToken} from '@shopify/flash-list';
import {BorderRadiuses, Colors} from 'style';
import View from '../../components/view';
import Text from '../../components/text';
import {isSameDay, isSameMonth} from './helpers/DateUtils';
import {AgendaProps, InternalEvent, Event, DateSectionHeader, UpdateSource} from './types';
import CalendarContext from './CalendarContext';

const FlashList = FlashListPackage?.FlashList;

// TODO: Fix initial scrolling
function Agenda(props: AgendaProps) {
  const {onEndReached, showLoader} = props;
  const {data, selectedDate, setDate, updateSource} = useContext(CalendarContext);
  const flashList = useRef<FlashListType<InternalEvent>>(null);
  const closestSectionHeader = useSharedValue<DateSectionHeader | null>(null);
  const scrolledByUser = useSharedValue<boolean>(false);

  const keyExtractor = useCallback((item: InternalEvent) => {
    return item.type === 'Event' ? item.id : item.header;
  }, []);

  const renderEvent = useCallback((item: Event) => {
    return (
      <View
        marginV-1
        marginH-10
        paddingH-10
        height={50}
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
      <View marginB-1 paddingB-4 marginH-10 paddingH-10 height={50} bottom>
        <Text>{item.header}</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(({item}: {item: InternalEvent; index: number}) => {
    switch (item.type) {
      case 'Event':
        return renderEvent(item);
      case 'Header':
        return renderHeader(item);
    }
  },
  [renderEvent, renderHeader]);

  const getItemType = useCallback((item: any) => item.type, []);

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

  const scrollToIndex = useCallback((index: number, animated: boolean) => {
    flashList.current?.scrollToIndex({index, animated});
  }, []);

  useAnimatedReaction(() => {
    return selectedDate.value;
  },
  (selected, previous) => {
    if (updateSource.value !== UpdateSource.AGENDA_SCROLL) {
      if (
        selected !== previous &&
          (closestSectionHeader.value?.date === undefined || !isSameDay(selected, closestSectionHeader.value?.date))
      ) {
        const result = findClosestDateAfter(selected);
        if (result !== null) {
          const {dateSectionHeader, index} = result;
          closestSectionHeader.value = dateSectionHeader;
          scrolledByUser.value = false;
          // TODO: Can the animation be improved (not in JS)?
          if (previous) {
            const _isSameMonth = isSameMonth(selected, previous);
            runOnJS(scrollToIndex)(index, _isSameMonth);
          }
        }
      }
    }
  },
  [findClosestDateAfter]);

  // TODO: look at https://docs.swmansion.com/react-native-reanimated/docs/api/hooks/useAnimatedScrollHandler
  const onViewableItemsChanged = useCallback(({viewableItems}: {viewableItems: ViewToken[]}) => {
    if (scrolledByUser.value) {
      const result = viewableItems.find(item => item.item.type === 'Header');
      if (result) {
        const {item}: {item: DateSectionHeader} = result;
        if (closestSectionHeader.value?.date !== item.date) {
          closestSectionHeader.value = item;
          setDate(item.date, UpdateSource.AGENDA_SCROLL);
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

  const _onEndReached = useCallback(() => {
    onEndReached?.(selectedDate.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEndReached]);

  return (
    <View flex>
      <FlashList
        ref={flashList}
        estimatedItemSize={52}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemType={getItemType}
        onViewableItemsChanged={onViewableItemsChanged}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScrollBeginDrag={onScrollBeginDrag}
        initialScrollIndex={findClosestDateAfter(selectedDate.value)?.index ?? 0}
        onEndReached={_onEndReached}
      />
      {showLoader && (
        <View absF center style={{backgroundColor: Colors.rgba(Colors.grey10, 0.2)}}>
          <ActivityIndicator/>
        </View>
      )}
    </View>
  );
}

export default Agenda;
