import _ from 'lodash';
import React, {Component} from 'react';
import {Alert} from 'react-native';
import {Colors, View, Text, Hint, Button, Switch, Assets, Incubator} from 'react-native-ui-lib';
// @ts-expect-error
import {renderMultipleSegmentOptions} from '../ExampleScreenPresenter';

const settingsIcon = require('../../assets/icons/settings.png');
const reactions = ['❤️', '😮', '😔', '😂', '😡'];

type HintScreenProps = {};

export default class HintsScreen extends Component<HintScreenProps> {
  targetRef = React.createRef();

  state = {
    showHint: true,
    useShortMessage: false,
    showBottomHint: false,
    showIcon: false,
    targetPosition: 'flex-start',
    useTargetRef: false,
    useTargetFrame: false,
    useSideTip: false,
    showCustomContent: false,
    showReactionStrip: false,
    enableShadow: false
  };

  toggleHintPosition = () => {
    this.setState({
      showBottomHint: !this.state.showBottomHint
    });
  };

  onHintPressed = () => {
    Alert.alert('Hint Pressed');
  };

  onReactionPress = () => {
    Alert.alert('Reaction button pressed');
  };

  renderCustomContent() {
    return (
      <Text text70 white>
        Click
        <Text onPress={() => Alert.alert('custom content :)')} text70BO red40>
          {' here '}
        </Text>
        for more information
      </Text>
    );
  }

  renderReactionStrip() {
    return (
      <View row padding-8>
        {_.map(reactions, (item, index) => (
          <Button round link key={index} label={item} onPress={this.onReactionPress}/>
        ))}
      </View>
    );
  }

  renderOptionsFAB() {
    return (
      <View absR absB padding-page style={{zIndex: 10}}>
        <Incubator.ExpandableOverlay
          useDialog
          expandableContent={this.renderScreenOptions()}
          dialogProps={{bottom: true}}
        >
          <Button round iconSource={Assets.icons.demo.settings} white/>
        </Incubator.ExpandableOverlay>
      </View>
    );
  }

  renderScreenOptions() {
    const {showIcon, useTargetRef, useTargetFrame, showCustomContent, showReactionStrip, enableShadow} = this.state;
    return (
      <View bg-white br20 padding-20 collapsable={false}>
        <Text h2 marginB-s4>
          Hint Options
        </Text>
        {renderMultipleSegmentOptions.call(this, 'Button Position', 'targetPosition', [
          {label: 'Left', value: 'flex-start'},
          {label: 'Center', value: 'center'},
          {label: 'Right', value: 'flex-end'}
        ])}

        {renderMultipleSegmentOptions.call(this, 'Tip Position', 'useSideTip', [
          {label: 'Side Tip', value: true},
          {label: 'Middle Top', value: false}
        ])}

        {renderMultipleSegmentOptions.call(this, 'Hint Position', 'showBottomHint', [
          {label: 'Above', value: false},
          {label: 'Under', value: true}
        ])}

        {renderMultipleSegmentOptions.call(this, 'Message Length', 'useShortMessage', [
          {label: 'Short', value: true},
          {label: 'Long', value: false}
        ])}

        <View row centerV marginV-10>
          <Switch value={showIcon} onValueChange={value => this.setState({showIcon: value})}/>
          <Text marginL-10>Toggle Icon</Text>
        </View>

        <View row centerV marginV-10>
          <Switch value={enableShadow} onValueChange={value => this.setState({enableShadow: value})}/>
          <Text marginL-10>Toggle shadow</Text>
        </View>

        <View row centerV marginV-10>
          <Switch value={useTargetRef} onValueChange={value => this.setState({useTargetRef: value, showHint: false})}/>
          <Text marginL-10>Use target ref</Text>
        </View>

        <View row centerV marginV-10>
          <Switch value={useTargetFrame} onValueChange={value => this.setState({useTargetFrame: value})}/>
          <Text marginL-10>Use random position</Text>
        </View>

        <View row centerV marginV-10>
          <Switch value={showCustomContent} onValueChange={value => this.setState({showCustomContent: value})}/>
          <Text marginL-10>Show custom content</Text>
        </View>

        <View row centerV marginV-10>
          <Switch
            value={showReactionStrip}
            onValueChange={value => this.setState({showReactionStrip: value, enableShadow: true})}
          />
          <Text marginL-10>Show reaction strip</Text>
        </View>
      </View>
    );
  }

  render() {
    const {
      showHint,
      showBottomHint,
      showIcon,
      targetPosition,
      useShortMessage,
      useSideTip,
      useTargetRef,
      useTargetFrame,
      showCustomContent,
      showReactionStrip,
      enableShadow
    } = this.state;
    const targetFrame = {x: 140, y: 100, width: 10, height: 10};
    const message = useShortMessage
      ? 'Add other cool and useful stuff.'
      : 'Add other cool and useful stuff through adding apps to your visitors to enjoy.';

    return (
      <View flex>
        <View
          flex
          padding-20
          paddingT-100
          bg-grey80
          style={{zIndex: 10}}
          key={useTargetFrame ? 'withTargetFrame' : 'withElement'}
        >
          {/* <Button bg-purple30 label="Background" style={{position: 'absolute', right: 50, bottom: 100}}/> */}
          <Hint
            visible={!useTargetRef && showHint}
            // color={Colors.orange30}
            message={message}
            // message={
            //   <Text>
            //     {message}{' '}
            //     <Text style={{textDecorationLine: 'underline'}} onPress={() => {}}>
            //       click here
            //     </Text>
            //   </Text>
            // }
            // messageStyle={{color: 'red'}}
            icon={showIcon ? settingsIcon : undefined}
            // iconStyle={{tintColor: 'red'}}
            // offset={35}
            position={showBottomHint ? Hint.positions.BOTTOM : Hint.positions.TOP}
            useSideTip={useSideTip}
            key={targetPosition}
            onPress={this.onHintPressed}
            targetFrame={useTargetFrame ? targetFrame : undefined}
            // borderRadius={BorderRadiuses.br40}
            // edgeMargins={30}
            // onBackgroundPress={() => this.setState({showHint: !showHint})}
            customContent={
              showCustomContent
                ? this.renderCustomContent()
                : showReactionStrip
                  ? this.renderReactionStrip()
                  : undefined
            }
            color={!showCustomContent && showReactionStrip ? Colors.white : undefined}
            removePaddings={!showCustomContent && showReactionStrip}
            enableShadow={enableShadow}
            testID={'Hint'}
          >
            {!useTargetFrame && (
              <Button
                label={showHint ? 'Hide' : 'Show'}
                onPress={() => this.setState({showHint: !showHint})}
                style={{alignSelf: targetPosition}}
                testID={'Hint.button'}
                ref={this.targetRef}
                // style={{alignSelf: targetPosition, marginLeft: 30}}
                // style={{alignSelf: targetPosition, position: 'absolute', top: 160, left: 100}}
              />
            )}
          </Hint>

          {useTargetFrame && (
            <View
              bg-red50
              style={{
                position: 'absolute',
                top: targetFrame.y,
                left: targetFrame.x,
                width: targetFrame.width,
                height: targetFrame.height
              }}
            />
          )}

          <Hint
            visible={useTargetRef && showHint}
            message="This Hint is using targetRef"
            targetRef={this.targetRef}
            position={showBottomHint ? Hint.positions.BOTTOM : Hint.positions.TOP}
            useSideTip={useSideTip}
          />
        </View>

        {this.renderOptionsFAB()}
      </View>
    );
  }
}
