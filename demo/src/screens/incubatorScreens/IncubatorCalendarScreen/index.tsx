import React, {Component} from 'react';
import {View, Incubator} from 'react-native-ui-lib';
import {data} from './MockData';

export default class CalendarScreen extends Component {
  // constructor(props) {
  //   super(props);
    
  //   setTimeout(() => {
  //     this.setState({date: 1676026748000});
  //   }, 2000);
  // }

  // state = {
  //   date: undefined
  // };
  
  render() {
    return (
      <View flex>
        <Incubator.Calendar data={data} staticHeader /* initialDate={this.state.date} */>
          <Incubator.Calendar.Agenda/>
        </Incubator.Calendar>
      </View>
    );
  }
}
