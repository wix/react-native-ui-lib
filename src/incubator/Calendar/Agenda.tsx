import React, {useContext, useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import View from '../../components/view';
import Text from '../..//components/text';
import {HOUR_TO_MS} from './helpers/DateUtils';
import {BorderRadiuses} from 'style';
import CalendarContext from './CalendarContext';
import {AgendaProps} from './types';

function Agenda(props: AgendaProps) {
  const {data} = useContext(CalendarContext);

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

  return <FlashList data={data} keyExtractor={keyExtractor} renderItem={renderItem}/>;
}

export default Agenda;

// TODO: Calendar events data should be like this
// [{} , {} ,{}] => group by startDate => rebuild array for Flashlist (with sections items)
