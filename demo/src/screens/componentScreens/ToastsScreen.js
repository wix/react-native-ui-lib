import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Constants, PageControl, Toast, Carousel, Button, Colors} from 'react-native-ui-lib'; // eslint-disable-line

export default class AvatarsScreen extends Component {
  state = {
    currentPage: 0,
    showToast: false,
  };

  render() {
    return (
      <View flex>
        <Carousel onChangePage={currentPage => this.setState({currentPage})} initialPage={this.state.currentPage}>
          <View style={styles.page} bg-red50>
            <Toast visible message="Discount was added to 3 products" />
          </View>

          <View style={styles.page} bg-green50>
            <Toast
              visible
              message="Discount was added to 3 products"
              actions={[{label: 'Undo', onPress: () => alert('undo')}]}
            />
          </View>

          <View style={styles.page} bg-dark50>
            <Toast
              visible
              message="Discount was added to 3 products"
              allowDismiss
              onDismiss={() => alert('dismiss!')}
            />
          </View>

          <View center flex style={styles.page} bg-violet70>
            <Toast
              message="Toast can appear from top"
              allowDismiss
              onDismiss={() => this.setState({showToast: false})}
              visible={this.state.showToast}
            />
            <Button size="medium" label="Show Toast" onPress={() => this.setState({showToast: true})} />

            <Toast
              message="Toast can appear from bottom"
              position="bottom"
              allowDismiss
              onDismiss={() => this.setState({showToast: false})}
              visible={this.state.showToast}
            />
          </View>

          <View flex spread centerH style={styles.page} bg-violet70>
            <View flex spread style={styles.page}>
              <Text>relative position</Text>

              <View style={{position: 'absolute', top: 0, width: Constants.screenWidth}}>
                <Toast
                  visible={this.state.showToast}
                  message="Toast can move content relative to it to the bottom"
                  position="relative"
                  actions={[{label: 'Close', onPress: () => this.setState({showToast: false})}]}
                />

                <View style={{height: 50, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center'}}>
                  <Button size="medium" label="Show Toast" onPress={() => this.setState({showToast: true})}/>
                </View>
              </View>
            </View>

            <View flex spread style={[styles.page, {justifyContent: 'flex-end', alignItems: 'center'}]}>
              <Text style={{marginBottom: 50}}>relative position</Text>

              <View style={{position: 'absolute', bottom: 0, width: Constants.screenWidth}}>
                <Toast
                  visible={this.state.showToast}
                  message="Toast can appear at the top (expanding its relative parent height"
                  position="relative"
                  allowDismiss
                  onDismiss={() => this.setState({showToast: false})}
                />

                <View style={{height: 50, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center'}}>
                  <Button size="medium" label="Show Toast" onPress={() => this.setState({showToast: true})}/>
                </View>
              </View>
            </View>

            <View flex spread style={[styles.page, {justifyContent: 'flex-end', alignItems: 'center'}]}>
              <Text>relative position</Text>

              <View style={{position: 'absolute', bottom: 0, width: Constants.screenWidth}}>
                <View style={{height: 50, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center'}}>
                  <Button size="medium" label="Show Toast" onPress={() => this.setState({showToast: true})}/>
                </View>

                <Toast
                  visible={this.state.showToast}
                  message="Toast can move content relative to it to the top"
                  position="relative"
                  centerMessage
                  backgroundColor={Colors.white}
                  color={Colors.blue30}
                  actions={[
                    {
                      label: 'No, close it',
                      outline: true,
                      outlineColor: Colors.blue30,
                      color: Colors.blue30,
                      onPress: () => this.setState({showToast: false}),
                    },
                    {label: 'Yes, close it', onPress: () => this.setState({showToast: false})},
                  ]}
                />
              </View>
            </View>
          </View>

          <View style={styles.page} bg-yellow70>
            <Toast
              visible
              message="Notfication with different color"
              backgroundColor={Colors.white}
              color={Colors.dark10}
              allowDismiss
            />
          </View>

          <View style={styles.page} bg-red80 padding-10>
            <Text text20>Blurred Text</Text>
            <Toast
              visible
              message="Notification With Blur Effect"
              backgroundColor={Colors.rgba(Colors.white, 0.3)}
              enableBlur
              blurOption={{type: 'light', amount: 5}}
              color={Colors.dark10}
              allowDismiss
            />
          </View>

          <View style={styles.page} bg-orange70>
            <Toast
              visible
              message="Do you approve user request?"
              centerMessage
              backgroundColor={Colors.white}
              color={Colors.blue30}
              actions={[
                {
                  label: 'Block',
                  outline: true,
                  outlineColor: Colors.blue30,
                  color: Colors.blue30,
                  onPress: () => alert('block!'),
                },
                {label: 'Approve', onPress: () => alert('approve!')},
              ]}
            />
          </View>
        </Carousel>
        <PageControl
          containerStyle={styles.pageControl}
          numOfPages={8}
          currentPage={this.state.currentPage}
          color={Colors.dark10}
          size={15}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    width: Constants.screenWidth,
    flex: 1,
  },
  pageControl: {
    position: 'absolute',
    bottom: 70,
    width: Constants.screenWidth,
  },
});
