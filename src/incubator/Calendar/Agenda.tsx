import React, {useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import View from '../../components/view';
import Text from '../..//components/text';
import {HOUR_TO_MS} from './helpers/DateUtils';
import {BorderRadiuses} from 'style';

// TODO: move to types
interface AgendaProps {
  // Type: list(events)/timeline
  // layout:
  // scrollTo(date)
}

interface Event {
  id: string;
  start: number;
  end: number;
}

// TODO: Move mock file next to the example screen
// TODO: Create a util that create events and add lots of them
const DATA: Event[] = [
  {
    id: '1',
    start: new Date(Date.UTC(2023, 0, 10, 15, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 10, 15, 30)).valueOf()
  },
  {
    id: '2',
    start: new Date(Date.UTC(2023, 0, 10, 17, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 10, 18, 0)).valueOf()
  },
  {
    id: '3',
    start: new Date(Date.UTC(2023, 0, 11, 16, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 11, 16, 30)).valueOf()
  },
  {
    id: '4',
    start: new Date(Date.UTC(2023, 0, 11, 18, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 11, 19, 0)).valueOf()
  },
  {
    id: '5',
    start: new Date(Date.UTC(2023, 0, 12, 15, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 12, 15, 30)).valueOf()
  },
  {
    id: '6',
    start: new Date(Date.UTC(2023, 0, 12, 17, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 12, 18, 0)).valueOf()
  },
  {
    id: '7',
    start: new Date(Date.UTC(2023, 0, 13, 16, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 13, 16, 30)).valueOf()
  },
  {
    id: '8',
    start: new Date(Date.UTC(2023, 0, 14, 18, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 14, 19, 0)).valueOf()
  },
  {
    id: '9',
    start: new Date(Date.UTC(2023, 0, 15, 15, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 15, 15, 30)).valueOf()
  },
  {
    id: '10',
    start: new Date(Date.UTC(2023, 0, 15, 17, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 15, 18, 0)).valueOf()
  },
  {
    id: '11',
    start: new Date(Date.UTC(2023, 0, 16, 16, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 16, 16, 30)).valueOf()
  },
  {
    id: '12',
    start: new Date(Date.UTC(2023, 0, 16, 18, 0)).valueOf(),
    end: new Date(Date.UTC(2023, 0, 16, 19, 0)).valueOf()
  }
];

function Agenda(props: AgendaProps) {
  const keyExtractor = useCallback((item: Event) => {
    return item.id;
  }, []);

  const renderItem = useCallback(({item, index}: {item: Event; index: number}) => {
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

  return <FlashList data={DATA} keyExtractor={keyExtractor} renderItem={renderItem}/>;
}

export default Agenda;

// TODO: Calendar events data should be like this
// [{} , {} ,{}] => group by startDate => rebuild array for Flashlist (with sections items)

