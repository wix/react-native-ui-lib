import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import _ from 'lodash';
import {Card, Incubator, Colors, View, Text, Image, Assets, Button} from 'react-native-ui-lib'; //eslint-disable-line

class Tab2 extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 1200);
  }

  render() {
    const {loading} = this.state;

    return (
      <ScrollView>
        <View flex padding-20>
          <Text text40>TAB 3</Text>

          {loading && (
            <Text marginT-20 text60>
              Loading...
            </Text>
          )}

          {!loading &&
            _.times(20, index => {
              return (
                <Card margin-20 padding-20 key={index} onPress={_.noop}>
                  <Text text40>{index}</Text>
                </Card>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

export default Tab2;
