import _ from 'lodash';
import React, {Component} from 'react';
import {Incubator} from 'react-native-ui-lib';
import MockServer from './MockServer';

export default class CalendarScreen extends Component {
  pageIndex = 0;

  state = {
    date: new Date().getTime(),
    events: [] as any[],
    showLoader: false
  };

  componentDidMount(): void {
    this.loadEvents(this.state.date);
  }

  loadEvents = async (date: number) => {
    this.setState({showLoader: true});
    const {events} = this.state;
    const newEvents = await MockServer.getEvents(date);
    this.pageIndex++;
    this.setState({events: _.uniqBy([...events, ...newEvents], e => e.id), showLoader: false});
  };

  onChangeDate = (date: number) => {
    console.log('Date change: ', date);
    const {events} = this.state;
    if (date < events[0]?.start || date > _.last(events)?.start) {
      console.log('Load new events');
      this.loadEvents(date);
    }
  };

  onEndReached = (date: number) => {
    console.log('Reached End: ', date);
    this.loadEvents(date);
  };

  render() {
    const {date, events/* , showLoader */} = this.state;
    return (
      <Incubator.Calendar data={events} initialDate={date} /* onChangeDate={this.onChangeDate} */ staticHeader>
        {/* <Incubator.Calendar.Agenda onEndReached={this.onEndReached} showLoader={showLoader}/> */}
      </Incubator.Calendar>
    );
  }
}
