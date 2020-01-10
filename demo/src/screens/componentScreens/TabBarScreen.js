import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Colors, Typography, View, Button, TabBar} from 'react-native-ui-lib';


const labelsArray = [
  ['ONE TWO', 'THREE', 'THREEEEEEEE', 'FOUR', 'FIVE FIVE', 'SIX', 'SEVEN-ELEVEN'],
  ['ONE TWO', 'THREE', 'THREEEEEEEE', 'FOUR', 'FIVE FIVE', 'SIX', 'SEVEN-ELEVEN'],
  ['SEVEN-ELEVEN', 'ONE TWO', 'THREE', 'THREEEEEEEE', 'FOUR', 'FIVE FIVE', 'SIX'],
  ['SIX', 'ONE TWO', 'THREE', 'THREEEEEEEE', 'FOUR', 'FIVE FIVE', 'SEVEN-ELEVEN'],
  ['FIVE FIVE', 'ONE TWO', 'THREE', 'THREEEEEEEE', 'FOUR', 'SIX', 'SEVEN-ELEVEN']
];
const ADD_ITEM_ICON = require('../../assets/icons/plus.png');
const themeColors = [Colors.violet30, Colors.green30, Colors.red30, Colors.blue30, Colors.yellow30];


export default class TabBarScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 1,
      selectedIndex1: 1,
      labels: labelsArray[0],
      currentTabs: [],
      themeColor: themeColors[0]
    };

    this.counter = 0;
    this.colorCounter = 0;
  }

  /** Index change */
  changeIndex = () => {
    let index;
    
    do {
      index = Math.floor(Math.random() * this.tabbar.props.children.length);
    } while (index === this.state.selectedIndex);

    this.setState({selectedIndex: index});
  };

  /** Labels change */
  count() {
    if (this.counter < labelsArray.length - 1) {
      this.counter++;
    } else {
      this.counter = 0;
    }
  }

  changeLabels = () => {
    this.count();
    this.setState({labels: labelsArray[this.counter]});
  };

  /** Colors change */
  countColors() {
    if (this.colorCounter < themeColors.length - 1) {
      this.colorCounter++;
    } else {
      this.colorCounter = 0;
    }
  }

  changeColors = () => {
    this.countColors();
    this.setState({themeColor: themeColors[this.colorCounter]});
  };

  /** Children Count change */
  addTab = () => {
    const random = Math.floor(Math.random() * 100000);
    const newTabs = this.state.currentTabs;
    
    newTabs.push({id: random, displayLabel: `tab #${this.state.currentTabs.length}`});
    this.setState({currentTabs: newTabs});
  };

  removeTab = () => {
    const index = this.state.selectedIndex;
    const newTabs = this.state.currentTabs;
    
    if (newTabs.length >= 0) {
      newTabs.splice(index, 1);
    }
    this.setState({currentTabs: newTabs});
  };

  /** Actions */
  getTabs(showAddTab) {
    const tabs = _.map(this.state.currentTabs, tab => this.renderTabs(tab));
    
    if (showAddTab) {
      tabs.push(this.renderAddTabsTab());
    } else {
      tabs.push(
        this.renderTabs({id: this.state.currentTabs.length, displayLabel: `tab #${this.state.currentTabs.length}`})
      );
    }
    return tabs;
  }

  /** Renders */
  renderTabs(tab) {
    return <TabBar.Item key={tab.id} label={tab.displayLabel} onPress={tab.onPress}/>;
  }

  renderAddTabsTab() {
    return (
      <TabBar.Item
        key={'ADD_TABS'}
        label={this.state.currentTabs.length >= 2 ? undefined : 'ADD TABS'}
        width={this.state.currentTabs.length >= 2 ? 48 : undefined}
        onPress={this.addTab}
        icon={ADD_ITEM_ICON}
        ignore
      />
    );
  }

  render() {
    return (
      <ScrollView style={{overflow: 'visible'}} showsVerticalScrollIndicator={false}>
        <View flex bg-dark80>
          <TabBar style={styles.tabbar} selectedIndex={0} enableShadow>
            <TabBar.Item 
              label="single tab" 
              labelStyle={{color: Colors.green30, fontWeight: 'bold', textTransform: 'capitalize'}}
            />
          </TabBar>

          <TabBar style={styles.tabbar} selectedIndex={0} enableShadow>
            <TabBar.Item label="Fixed" uppercase/>
            <TabBar.Item label="Tab" badge={{label: '100'}} uppercase/>
            <TabBar.Item label="Bar" uppercase/>
          </TabBar>

          <TabBar style={styles.tabbar} selectedIndex={0} enableShadow>
            <TabBar.Item label="Fixed"/>
            <TabBar.Item label="Width"/>
            <TabBar.Item icon={ADD_ITEM_ICON} width={48}/>
          </TabBar>

          <TabBar style={styles.tabbar} selectedIndex={0} ref={r => (this.tabbar = r)} enableShadow>
            <TabBar.Item label="Scroll"/>
            <TabBar.Item label="View" badge={{size: 'pimpleSmall'}}/>
            <TabBar.Item label="tab"/>
            <TabBar.Item label="bar"/>
            <TabBar.Item label="Container"/>
            <TabBar.Item label="Mode"/>
          </TabBar>

          <View center row>
            <Button size={'small'} margin-20 label={`Add tabs`} onPress={this.addTab}/>
            <Button size={'small'} margin-20 label={`Remove tabs`} onPress={this.removeTab}/>
          </View>
          <TabBar style={styles.tabbar} selectedIndex={0} enableShadow>
            {this.getTabs(false)}
          </TabBar>
          <TabBar
            style={styles.tabbar}
            selectedIndex={0}
            enableShadow
            // selectedIndex={this.getTabs(true).length - 2}
          >
            {this.getTabs(true)}
          </TabBar>

          <Button
            size={'small'}
            margin-20
            label={`Change index: ${this.state.selectedIndex}`}
            onPress={this.changeIndex}
          />
          <TabBar style={styles.tabbar} selectedIndex={this.state.selectedIndex} enableShadow>
            <TabBar.Item label="LONG LABEL"/>
            <TabBar.Item label="ACTIVE"/>
            <TabBar.Item label="INACTIVE"/>
            <TabBar.Item label="SCROLL"/>
            <TabBar.Item label="VIEW"/>
            <TabBar.Item label="TAB"/>
            <TabBar.Item label="BAR"/>
            <TabBar.Item label="CONTAINER"/>
            <TabBar.Item label="MODE"/>
          </TabBar>

          <View row>
            <Button size={'small'} margin-20 label={`Change Labels`} onPress={this.changeLabels}/>
            <Button size={'small'} margin-20 label={`Change Color`} onPress={this.changeColors}/>
          </View>
          <TabBar
            style={styles.tabbar}
            selectedIndex={this.state.selectedIndex1}
            onChangeIndex={index => this.setState({selectedIndex1: index})}
            indicatorStyle={{backgroundColor: this.state.themeColor}}
            enableShadow
          >
            <TabBar.Item label={this.state.labels[0]}/>
            <TabBar.Item label={this.state.labels[1]}/>
            <TabBar.Item label={this.state.labels[2]}/>
          </TabBar>
          <TabBar
            style={styles.tabbar}
            selectedIndex={this.state.selectedIndex2}
            onChangeIndex={index => this.setState({selectedIndex2: index})}
            enableShadow
          >
            <TabBar.Item label={this.state.labels[0]}/>
            <TabBar.Item label={this.state.labels[1]}/>
            <TabBar.Item label={this.state.labels[2]}/>
            <TabBar.Item label={this.state.labels[3]}/>
            <TabBar.Item label={this.state.labels[4]}/>
            <TabBar.Item label={this.state.labels[5]}/>
            <TabBar.Item label={this.state.labels[6]}/>
          </TabBar>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    marginVertical: 10
  }
});
