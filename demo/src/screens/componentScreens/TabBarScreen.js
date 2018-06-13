import React, {Component} from 'react';
import _ from 'lodash';
import {Constants, Colors, TabBar, View, Text, Image} from 'react-native-ui-lib'; //eslint-disable-line

export default class TabBarScreen extends Component {
  state = {
    snippet: '',
    selectedIndex: 0,
    selectedIndex2: 1,
    selectedIndex3: 3,
  };

  componentDidMount() {
    const snippet = this.tabbar.getSnippet();
    this.setState({
      snippet,
    });
  }

  render() {
    const {snippet, selectedIndex, selectedIndex2, selectedIndex3} = this.state;
    const starIcon = require('../../assets/icons/star.png');
    const fontWeightBold = Constants.isIOS ? '600' : '700';
    return (
      <View bg-dark80>
        {/* fit */}
        <TabBar
          selectedIndex={selectedIndex}
          onChangeIndex={index => this.setState({selectedIndex: index})}
          ref={element => (this.tabbar = element)}
        >
          <TabBar.Item label="FEED"/>
          <TabBar.Item label="SERVICES"/>
          <TabBar.Item label="CHAT"/>
          <TabBar.Item>
            <Text text90 purple30={selectedIndex === 3} style={selectedIndex === 3 && {fontWeight: fontWeightBold}}>ABOUT</Text>
          </TabBar.Item>
        </TabBar>

        <View style={{height: 40}}/>

        {/* scroll*/}
        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex2}
          onChangeIndex={index => this.setState({selectedIndex2: index})}
          ref={element => (this.tabbar = element)}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.purple30}}
        >
          <TabBar.Item divider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="ACTIVE"/>
          <TabBar.Item divider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="PHOTO ALBUM"/>
          <TabBar.Item divider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="INACTIVE"/>
          <TabBar.Item divider>
            <Image source={starIcon} resizeMode={'contain'} style={[{width: 20, height: 20}, selectedIndex2 === 3 && {tintColor: Colors.purple30}]}/>
          </TabBar.Item>
          <TabBar.Item divider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="OVERFLOW"/>
          <TabBar.Item labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="OVERFLOW"/>
        </TabBar>

        <View style={{height: 40}}/>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex}
          onChangeIndex={index => this.setState({selectedIndex: index})}
          ref={element => (this.tabbar = element)}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.violet30}}
        >
          <TabBar.Item divider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.violet30}} label="ACTIVE"/>
          <TabBar.Item divider>
            <View row center>
              <Image source={starIcon} resizeMode={'contain'} style={{width: 20, height: 20, tintColor: Colors.violet30}}/>
              <Text marginL-8 text90 violet30 style={{fontWeight: fontWeightBold}}>Add More Apps</Text>
            </View>
          </TabBar.Item>
        </TabBar>

        <View style={{height: 40}}/>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex2}
          onChangeIndex={index => this.setState({selectedIndex2: index})}
          ref={element => (this.tabbar = element)}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.orange30}}
        >
          <TabBar.Item divider labelStyle={{color: Colors.orange30}} selectedLabelStyle={{color: Colors.orange30}} label="ACTIVE"/>
          <TabBar.Item divider maxLines={2} labelStyle={{color: Colors.orange30}} selectedLabelStyle={{color: Colors.orange30}} label="LONGEST TEXT EVER"/>
          <TabBar.Item labelStyle={{color: Colors.orange30}} selectedLabelStyle={{color: Colors.orange30}} label="INACTIVE"/>
        </TabBar>

        <View style={{height: 40}}/>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex3}
          onChangeIndex={index => this.setState({selectedIndex3: index})}
          ref={element => (this.tabbar = element)}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.green30}}
        >
          <TabBar.Item divider labelStyle={{color: Colors.green30, fontWeight: fontWeightBold}} selectedLabelStyle={{color: Colors.green30, fontWeight: '900'}} label="ACTIVE"/>
          <TabBar.Item divider labelStyle={{color: Colors.green30, fontWeight: fontWeightBold}} selectedLabelStyle={{color: Colors.green30, fontWeight: '900'}} label="PHOTO ALBUM"/>
          <TabBar.Item divider labelStyle={{color: Colors.green30, fontWeight: fontWeightBold}} selectedLabelStyle={{color: Colors.green30, fontWeight: '900'}} label="INACTIVE"/>
          <TabBar.Item divider width={48}>
            <Image source={starIcon} resizeMode={'contain'} style={{width: 20, height: 20, tintColor: Colors.green30}}/>
          </TabBar.Item>
        </TabBar>

        <View style={{height: 40}}/>
      </View>
    );
  }
}
