import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import _ from 'lodash';
import {Card, Avatar, View, Text} from 'react-native-ui-lib';

class Tab2 extends Component {
  state = {
    counter: 0,
    loading: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 1200);

    /* Uncomment to test TabPage freeze functionality when the page lose focus */
    // setInterval(() => {
    //   this.setState({counter: this.state.counter + 1});
    // }, 1000);
  }

  componentDidUpdate() {
    /* Uncomment to test TabPage freeze functionality when the page lose focus */
    // if (this.state.counter % 3 === 0) {
    //   console.warn('freeze counter', this.state.counter);
    // }
  }

  slow(iterations = 10) {
    if (iterations === 0) {
      return;
    }

    setTimeout(() => {
      _.times(5000, () => {
        console.log('slow log');
      });

      this.slow(iterations - 1);
    }, 10);
  }

  render() {
    const {loading} = this.state;

    return (
      <ScrollView>
        <View flex padding-20>
          <Text text40>Reviews</Text>

          {loading && (
            <Text marginT-20 text60>
              Loading...
            </Text>
          )}

          {!loading &&
            _.times(20, index => {
              return (
                <Card row centerV margin-20 padding-20 key={index} onPress={_.noop}>
                  <Avatar
                    size={50}
                    source={{
                      uri: 'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    }}
                  />
                  <Text text40 marginL-20>
                    {index}
                  </Text>
                </Card>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

export default Tab2;
