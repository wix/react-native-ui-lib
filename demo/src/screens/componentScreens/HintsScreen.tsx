import _ from 'lodash';
import React, {Component} from 'react';
import {Alert, ViewStyle} from 'react-native';
import {Colors, View, Text, Hint, Button, Assets, Incubator, Constants} from 'react-native-ui-lib';
import {renderMultipleSegmentOptions, renderBooleanOption} from '../ExampleScreenPresenter';

const settingsIcon = require('../../assets/icons/settings.png');
const reactions = ['❤️', '😮', '😔', '😂', '😡'];

type HintScreenProps = {};

const SHORT_MESSAGE = 'Add other cool and useful stuff.';
const DEFAULT_MESSAGE = 'Add other cool and useful stuff through adding apps to your visitors to enjoy.';
const TARGET_FRAMES_MESSAGE = 'Press Back button to go to previous screen';

export default class HintsScreen extends Component<HintScreenProps> {
  state = {
    showHint: true,
    showSecondHint: false,
    useShortMessage: false,
    showBottomHint: false,
    showIcon: false,
    targetPosition: 'flex-start' as ViewStyle['alignSelf'],
    useBackdrop: true,
    useTargetFrame: false,
    useSideTip: false,
    showCustomContent: false,
    showReactionStrip: false,
    enableShadow: false
  };

  toggleHint = () => {
    this.setState({showHint: !this.state.showHint});
  };

  toggleSecondHint = () => {
    this.setState({showSecondHint: !this.state.showSecondHint});
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
      <Text text70 $textDefaultLight>
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
          dialogProps={{bottom: true, useSafeArea: true}}
        >
          <Button round iconSource={Assets.icons.demo.settings} $backgroundDefault/>
        </Incubator.ExpandableOverlay>
      </View>
    );
  }

  renderScreenOptions() {
    return (
      <View bg-$backgroundDefault br20 padding-20 collapsable={false}>
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
          {label: 'Middle Tip', value: false}
        ])}

        {renderMultipleSegmentOptions.call(this, 'Hint Position', 'showBottomHint', [
          {label: 'Above', value: false},
          {label: 'Under', value: true}
        ])}

        {renderMultipleSegmentOptions.call(this, 'Message Length', 'useShortMessage', [
          {label: 'Short', value: true},
          {label: 'Long', value: false}
        ])}

        {renderBooleanOption.call(this, 'With backdrop', 'useBackdrop')}
        {renderBooleanOption.call(this, 'With icon', 'showIcon')}
        {renderBooleanOption.call(this, 'With shadow', 'enableShadow')}
        {renderBooleanOption.call(this, 'Use random position', 'useTargetFrame')}
        {renderBooleanOption.call(this, 'Show custom content', 'showCustomContent')}
        {renderBooleanOption.call(this, 'Show reaction strip', 'showReactionStrip')}
      </View>
    );
  }

  render() {
    const {
      showHint,
      showSecondHint,
      showBottomHint,
      showIcon,
      targetPosition,
      useBackdrop,
      useShortMessage,
      useSideTip,
      useTargetFrame,
      showCustomContent,
      showReactionStrip,
      enableShadow
    } = this.state;
    const targetFrame = {
      x: 20,
      y: Constants.getSafeAreaInsets().top + Constants.statusBarHeight,
      width: 1,
      height: 1
    };

    const message = useTargetFrame ? TARGET_FRAMES_MESSAGE : useShortMessage ? SHORT_MESSAGE : DEFAULT_MESSAGE;
    const color = !showCustomContent && showReactionStrip ? {color: Colors.$backgroundDefault} : undefined;

    const hintKey = `${useSideTip}-${targetPosition}-${useShortMessage}-${showIcon}-${useTargetFrame}-${showCustomContent}-${showReactionStrip}`;

    return (
      <View flex>
        <View
          flex
          padding-20
          paddingT-100
          bg-$backgroundNeutralLight
          style={{zIndex: 10}}
          key={useTargetFrame ? 'withTargetFrame' : 'withElement'}
        >
          {/* <Button bg-purple30 label="Background" style={{position: 'absolute', right: 50, bottom: 100}}/> */}
          <Hint
            visible={showHint}
            // color={Colors.$backgroundMajorHeavy}
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
            position={showBottomHint || useTargetFrame ? Hint.positions.BOTTOM : Hint.positions.TOP}
            useSideTip={useSideTip || useTargetFrame}
            key={hintKey}
            onPress={this.onHintPressed}
            targetFrame={useTargetFrame ? targetFrame : undefined}
            // borderRadius={BorderRadiuses.br40}
            // edgeMargins={30}
            onBackgroundPress={useBackdrop || useTargetFrame ? this.toggleHint : undefined}
            backdropColor={Colors.rgba(Colors.$backgroundInverted, 0.3)}
            customContent={
              showCustomContent
                ? this.renderCustomContent()
                : showReactionStrip
                  ? this.renderReactionStrip()
                  : undefined
            }
            {...color}
            removePaddings={!showCustomContent && showReactionStrip}
            enableShadow={enableShadow}
            testID={'Hint'}
          >
            {!useTargetFrame && (
              <Button
                label={showHint ? 'Hide' : 'Show'}
                onPress={this.toggleHint}
                style={{alignSelf: targetPosition}}
                testID={'Hint.button'}
                /* Change layout and position to test various cases */
                // marginT-150
                // style={{alignSelf: targetPosition, marginLeft: 30}}
                // style={{alignSelf: targetPosition, position: 'absolute', top: 160, left: 100}}
              />
            )}
          </Hint>

          {useTargetFrame && (
            <>
              <View absL absB margin-page>
                <Button label="Show Hint" onPress={this.toggleHint}/>
              </View>
            </>
          )}

          <View marginT-100 row center>
            {targetPosition !== 'flex-start' && <Text marginH-s3>Text pushing button</Text>}
            <Hint
              message={'Hint'}
              visible={showSecondHint}
              onBackgroundPress={this.toggleSecondHint}
              useSideTip={false}
            >
              <Button label="Button" onPress={this.toggleSecondHint}/>
            </Hint>
            {targetPosition === 'flex-start' && <Text marginH-s3>Text pushing button</Text>}
          </View>
        </View>

        {this.renderOptionsFAB()}
      </View>
    );
  }
}
