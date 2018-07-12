import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView, Alert} from 'react-native';
import {Constants, Assets, Colors, TabBar, View, Text, Image} from 'react-native-ui-lib'; //eslint-disable-line


const starIcon = require('../../assets/icons/star.png');
const fontWeightBold = Constants.isIOS ? '600' : '700';

export default class TabBarScreen extends Component {
  state = {
    selectedIndex: 0,
    selectedIndex1: 1,
    selectedIndex2: 2,
    selectedIndex3: 3,
  };

  onChangeIndex = (index) => {
    this.setState({selectedIndex: index}); 
    Alert.alert(`index changed to ${index}`);
  }

  render() {
    const {selectedIndex, selectedIndex1, selectedIndex2, selectedIndex3} = this.state;
    
    return (
      <ScrollView style={{backgroundColor: Colors.dark80}}>
        <Text style={styles.text}>FIT Mode (default) - items will get equal space</Text>

        <TabBar>
          <TabBar.Item label="FEED"/>
          <TabBar.Item label="SERVICES"/>
          <TabBar.Item label="CHAT"/>
          <TabBar.Item label="ABOUT"/>
        </TabBar>

        <Text style={styles.text}>Even a single tab. Note: this tab will get the selected label style</Text>
        <TabBar>
          <TabBar.Item showDivider label="ADD APPS" icon={Assets.icons.check} labelStyle={{color: Colors.blue30}} iconColor={Colors.blue30}/>
        </TabBar>

        <Text style={styles.text}>Items can render children</Text>
        <TabBar
          selectedIndex={selectedIndex1}
          onChangeIndex={index => this.setState({selectedIndex1: index})}
        >
          <TabBar.Item label="FEED"/>
          <TabBar.Item label="SERVICES"/>
          <TabBar.Item label="CHAT"/>
          <TabBar.Item>
            <Text text90 purple30={selectedIndex1 === 3} style={selectedIndex1 === 3 && {fontWeight: fontWeightBold}}>ABOUT</Text>
          </TabBar.Item>
        </TabBar>

        <Text style={styles.text}>Relative FIT mode - Don't forget to set flex!</Text>

        <View row>
          <TabBar
            style={{flex: 1, height: 48}}
            selectedIndex={selectedIndex1}
            onChangeIndex={index => this.setState({selectedIndex1: index})}
          >
            <TabBar.Item label="FEED"/>
            <TabBar.Item label="SERVICES"/>
            <TabBar.Item label="CHAT"/>
          </TabBar>
          <View center style={{backgroundColor: Colors.dark70, width: 50}}>
            <Image source={starIcon} resizeMode={'contain'} style={[{marginHorizontal: 10, width: 20, height: 20, tintColor: Colors.blue30}]}/>
          </View>
        </View>

        <Text style={styles.text}>Relative SCROLL mode - Don't forget to set width!</Text>

        <View row>
          <TabBar
            mode={TabBar.modes.SCROLL}
            selectedIndex={selectedIndex1}
            onChangeIndex={index => this.setState({selectedIndex1: index})}
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
          <View center style={{backgroundColor: Colors.dark70, height: 47.5}}>
            <Image source={starIcon} resizeMode={'contain'} style={[{marginHorizontal: 5, width: 20, height: 20, tintColor: Colors.blue30}]}/>
          </View>
        </View>

        <Text style={styles.text}>SCROLL mode - items will fit their content</Text>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex2}
          onChangeIndex={index => this.setState({selectedIndex2: index})}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.purple30}}
          useGradientFinish
        >
          <TabBar.Item showDivider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="ACTIVE"/>
          <TabBar.Item showDivider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="PHOTO ALBUM"/>
          <TabBar.Item showDivider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="INACTIVE"/>
          <TabBar.Item showDivider icon={starIcon} iconSelectedColor={Colors.purple30}/>
          <TabBar.Item showDivider>
            <Text text90 purple30={selectedIndex2 === 4}>OVERFLOW</Text>
          </TabBar.Item>
          <TabBar.Item labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.purple30}} label="OVERFLOW"/>
        </TabBar>

        <Text style={styles.text}>Style the TabBar</Text>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex2}
          onChangeIndex={index => this.setState({selectedIndex2: index})}
          style={{height: 48, backgroundColor: Colors.red80}}
          indicatorStyle={{borderBottomWidth: 4, borderColor: Colors.cyan30}}
          useGradientFinish
        >
          <TabBar.Item labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.cyan30}} label="ACTIVE"/>
          <TabBar.Item labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.cyan30}} label="PHOTO ALBUM"/>
          <TabBar.Item labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.cyan30}} label="INACTIVE"/>
          <TabBar.Item icon={starIcon} iconSelectedColor={Colors.cyan30}/>
          <TabBar.Item>
            <Text text90 cyan30={selectedIndex2 === 4}>OVERFLOW</Text>
          </TabBar.Item>
          <TabBar.Item labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.cyan30}} label="OVERFLOW"/>
        </TabBar>

        <Text style={styles.text}>SCROLL turned to FIT when content is too short</Text>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex}
          onChangeIndex={index => this.setState({selectedIndex: index})}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.violet30}}
          useGradientFinish
        >
          <TabBar.Item showDivider labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.violet30}} label="ACTIVE"/>
          <TabBar.Item showDivider label="Add More Apps" icon={starIcon} labelStyle={{color: Colors.dark10}} selectedLabelStyle={{color: Colors.violet30}}/>
        </TabBar>

        <Text style={styles.text}>Allow two lines</Text>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex2}
          onChangeIndex={index => this.setState({selectedIndex2: index})}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.orange30}}
          useGradientFinish
        >
          <TabBar.Item labelStyle={{color: Colors.orange30}} selectedLabelStyle={{color: Colors.orange30}} label="ACTIVE"/>
          <TabBar.Item maxLines={2} labelStyle={{color: Colors.orange30}} selectedLabelStyle={{color: Colors.orange30}} label="LONGEST TEXT EVER"/>
          <TabBar.Item labelStyle={{color: Colors.orange30}} selectedLabelStyle={{color: Colors.orange30}} label="INACTIVE"/>
        </TabBar>

        <Text style={styles.text}>Give some items fixed width</Text>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex2}
          onChangeIndex={index => this.setState({selectedIndex2: index})}
          style={{height: 48}}
          indicatorStyle={{borderBottomWidth: 2, borderColor: Colors.green30}}
          useGradientFinish
        >
          <TabBar.Item labelStyle={{color: Colors.green30, fontWeight: fontWeightBold}} selectedLabelStyle={{color: Colors.green30, fontWeight: '900'}} label="ACTIVE"/>
          <TabBar.Item labelStyle={{color: Colors.green30, fontWeight: fontWeightBold}} selectedLabelStyle={{color: Colors.green30, fontWeight: '900'}} label="PHOTO ALBUM"/>
          <TabBar.Item labelStyle={{color: Colors.green30, fontWeight: fontWeightBold}} selectedLabelStyle={{color: Colors.green30, fontWeight: '900'}} label="INACTIVE"/>
          <TabBar.Item width={48} icon={starIcon} iconSelectedColor={Colors.green30}/>
        </TabBar>

        <Text style={styles.text}>Pass 'isContentIndicator' to mark only the item's content</Text>

        <TabBar
          selectedIndex={selectedIndex}
          onChangeIndex={index => this.setState({selectedIndex: index})}
          isContentIndicator
        >
          <TabBar.Item label="INACTIVE" showDivider/>
          <TabBar.Item showDivider label="ADD APPS" icon={Assets.icons.check} labelStyle={{color: Colors.red30}} selectedLabelStyle={{color: Colors.green30}} iconColor={Colors.blue30}/>
          <TabBar.Item icon={Assets.icons.check} iconColor={Colors.yellow30}/>
        </TabBar>

        <Text style={styles.text}>Pass 'ignoreLastTab' to limit the indicator (tab is NOT disabled)</Text>

        <TabBar
          selectedIndex={selectedIndex}
          onChangeIndex={this.onChangeIndex}
          isContentIndicator
          ignoreLastTab
        >
          <TabBar.Item label="INACTIVE"/>
          <TabBar.Item label="ADD APPS" icon={Assets.icons.check} selectedLabelStyle={{color: Colors.green30}}/>
          <TabBar.Item width={48} icon={Assets.icons.check} iconColor={Colors.yellow30}/>
        </TabBar>

        <View style={{height: 30}}/>

        <TabBar
          mode={TabBar.modes.SCROLL}
          selectedIndex={selectedIndex3}
          onChangeIndex={index => this.setState({selectedIndex3: index})}
          isContentIndicator
        >
          <TabBar.Item label="INACTIVE"/>
          <TabBar.Item label="ADD APPS" icon={Assets.icons.check} labelStyle={{color: Colors.red30}} selectedLabelStyle={{color: Colors.green30}}/>
          <TabBar.Item icon={Assets.icons.check} iconColor={Colors.yellow30}/>
          <TabBar.Item label="INACTIVE"/>
          <TabBar.Item label="INACTIVE"/>
        </TabBar>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    height: 30,
    paddingTop: 8,
    paddingLeft: 8,
    color: Colors.dark30,
    fontSize: 11
  }
});
