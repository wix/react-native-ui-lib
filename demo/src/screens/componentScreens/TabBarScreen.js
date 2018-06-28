import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Constants, Colors, Shadows, TabBar, View, Text, Image} from 'react-native-ui-lib'; //eslint-disable-line

export default class TabBarScreen extends Component {
  state = {
    snippet: '',
    selectedIndex: 0,
    selectedIndex1: 1,
    selectedIndex2: 2,
    selectedIndex3: 3,
  };

  componentDidMount() {
    const snippet = this.tabbar.getSnippet();
    this.setState({
      snippet,
    });
  }

  render() {
    const {snippet, selectedIndex, selectedIndex1, selectedIndex2, selectedIndex3} = this.state;
    const starIcon = require('../../assets/icons/star.png');
    const fontWeightBold = Constants.isIOS ? '600' : '700';
    
    return (
      <ScrollView style={{backgroundColor: Colors.dark80}}>
        {/* fit */}
        <TabBar
          selectedIndex={selectedIndex1}
          onChangeIndex={index => this.setState({selectedIndex1: index})}
          ref={element => (this.tabbar = element)}
        >
          <TabBar.Item label="FEED"/>
          <TabBar.Item label="SERVICES"/>
          <TabBar.Item label="CHAT"/>
          <TabBar.Item>
            <Text text90 purple30={selectedIndex1 === 3} style={selectedIndex1 === 3 && {fontWeight: fontWeightBold}}>ABOUT</Text>
          </TabBar.Item>
        </TabBar>

        <View style={{height: 30}}/>

        {/* relative FIT - Don't forget to set flex! */}
        <View row>
          <TabBar
            style={{flex: 1, height: 48}}
            selectedIndex={selectedIndex1}
            onChangeIndex={index => this.setState({selectedIndex1: index})}
            ref={element => (this.tabbar = element)}
          >
            <TabBar.Item label="FEED"/>
            <TabBar.Item label="SERVICES"/>
            <TabBar.Item label="CHAT"/>
          </TabBar>
          <View center style={{backgroundColor: Colors.dark70}}>
            <Image source={starIcon} resizeMode={'contain'} style={[{marginHorizontal: 10, width: 20, height: 20, tintColor: Colors.blue30}]}/>
          </View>
        </View>

        <View style={{height: 30}}/>

        {/* relative SCROLL - Don't forget to set the width! */}
        <View row>
          <TabBar
            mode={TabBar.modes.SCROLL}
            selectedIndex={selectedIndex1}
            onChangeIndex={index => this.setState({selectedIndex1: index})}
            ref={element => (this.tabbar = element)}
            style={{height: 48, width: Constants.screenWidth - 40}}
            useGradientFinish
          >
            <TabBar.Item label="FEED"/>
            <TabBar.Item label="SERVICES"/>
            <TabBar.Item label="CHAT"/>
            <TabBar.Item label="ABOUT"/>
            <TabBar.Item label="WHAT"/>
            <TabBar.Item label="WHY"/>
          </TabBar>
          <View style={{width: 10}}/>
          <View center style={{backgroundColor: Colors.dark70}}>
            <Image source={starIcon} resizeMode={'contain'} style={[{marginHorizontal: 5, width: 20, height: 20, tintColor: Colors.blue30}]}/>
          </View>
        </View>

        <View style={{height: 30}}/>

        {/* scroll*/}
        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex2}
          onChangeIndex={index => this.setState({selectedIndex2: index})}
          ref={element => (this.tabbar = element)}
          style={{height: 48, backgroundColor: Colors.red80}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.cyan30}}
          useGradientFinish
        >
          <TabBar.Item labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.cyan30}} label="ACTIVE"/>
          <TabBar.Item labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.cyan30}} label="PHOTO ALBUM"/>
          <TabBar.Item labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.cyan30}} label="INACTIVE"/>
          <TabBar.Item>
            <Image source={starIcon} resizeMode={'contain'} style={[{width: 20, height: 20}, selectedIndex2 === 3 && {tintColor: Colors.cyan30}]}/>
          </TabBar.Item>
          <TabBar.Item>
            <Text text90 cyan30={selectedIndex2 === 4}>OVERFLOW</Text>
          </TabBar.Item>
          <TabBar.Item labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.cyan30}} label="OVERFLOW"/>
        </TabBar>

        <View style={{height: 30}}/>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex2}
          onChangeIndex={index => this.setState({selectedIndex2: index})}
          ref={element => (this.tabbar = element)}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.purple30}}
          useGradientFinish
        >
          <TabBar.Item divider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="ACTIVE"/>
          <TabBar.Item divider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="PHOTO ALBUM"/>
          <TabBar.Item divider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="INACTIVE"/>
          <TabBar.Item divider>
            <Image source={starIcon} resizeMode={'contain'} style={[{width: 20, height: 20}, selectedIndex2 === 3 && {tintColor: Colors.purple30}]}/>
          </TabBar.Item>
          <TabBar.Item divider>
            <Text text90 purple30={selectedIndex2 === 4}>OVERFLOW</Text>
          </TabBar.Item>
          {/* <TabBar.Item divider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="OVERFLOW"/> */}
          <TabBar.Item labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="OVERFLOW"/>
        </TabBar>

        <View style={{height: 30}}/>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex}
          onChangeIndex={index => this.setState({selectedIndex: index})}
          ref={element => (this.tabbar = element)}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.violet30}}
          useGradientFinish
        >
          <TabBar.Item divider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.violet30}} label="ACTIVE"/>
          <TabBar.Item divider>
            <View row center>
              <Image source={starIcon} resizeMode={'contain'} style={{width: 20, height: 20, tintColor: Colors.violet30}}/>
              <Text marginL-8 text90 violet30 style={{fontWeight: fontWeightBold}}>Add More Apps</Text>
            </View>
          </TabBar.Item>
        </TabBar>

        <View style={{height: 30}}/>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex2}
          onChangeIndex={index => this.setState({selectedIndex2: index})}
          ref={element => (this.tabbar = element)}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.orange30}}
          useGradientFinish
        >
          <TabBar.Item divider labelStyle={{color: Colors.orange30}} selectedLabelStyle={{color: Colors.orange30}} label="ACTIVE"/>
          <TabBar.Item divider maxLines={2} labelStyle={{color: Colors.orange30}} selectedLabelStyle={{color: Colors.orange30}} label="LONGEST TEXT EVER"/>
          <TabBar.Item labelStyle={{color: Colors.orange30}} selectedLabelStyle={{color: Colors.orange30}} label="INACTIVE"/>
        </TabBar>

        <View style={{height: 30}}/>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex3}
          onChangeIndex={index => this.setState({selectedIndex3: index})}
          ref={element => (this.tabbar = element)}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.green30}}
          useGradientFinish
        >
          <TabBar.Item divider labelStyle={{color: Colors.green30, fontWeight: fontWeightBold}} selectedLabelStyle={{color: Colors.green30, fontWeight: '900'}} label="ACTIVE"/>
          <TabBar.Item divider labelStyle={{color: Colors.green30, fontWeight: fontWeightBold}} selectedLabelStyle={{color: Colors.green30, fontWeight: '900'}} label="PHOTO ALBUM"/>
          <TabBar.Item divider labelStyle={{color: Colors.green30, fontWeight: fontWeightBold}} selectedLabelStyle={{color: Colors.green30, fontWeight: '900'}} label="INACTIVE"/>
          <TabBar.Item divider width={48}>
            <Image source={starIcon} resizeMode={'contain'} style={{width: 20, height: 20, tintColor: Colors.green30}}/>
          </TabBar.Item>
        </TabBar>

        <View style={{height: 30}}/>
      </ScrollView>
    );
  }
}
