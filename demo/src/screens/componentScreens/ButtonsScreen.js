import React from 'react';
import {ScrollView, StyleSheet, Alert, Image} from 'react-native';
import {Text, View, Assets, Constants, Button, Colors, Typography} from 'react-native-ui-lib'; //eslint-disable-line
import DemoScreen from '../DemoScreen';

const ButtonSpace = 20;
const plusIcon = require('../../assets/icons/plus.png');

const labelButton = {label: 'Animated'};
const iconButton = {round: true, iconStyle: {tintColor: Colors.white}};

export default class ButtonsScreen extends DemoScreen {
  constructor(props) {
    super(props);

    this.propsToRender = [
      'label',
      'color',
      'backgroundColor',
      'size',
      'outlineColor',
      'outline',
      'disabled',
      'link',
      'enableShadow',
      'borderRadius',
    ];

    this.state = {
      snippet: '',
      backgroundColor: Colors.yellow30,
      label: 'Button',
      // outline: true,
      buttonProps: labelButton,
    };
  }

  changeProps = () => {
    if (this.state.buttonProps === labelButton) {
      this.setState({buttonProps: iconButton});
    }
    if (this.state.buttonProps === iconButton) {
      this.setState({buttonProps: labelButton});
    }
  }

  showSnippet(element) {
    const snippet = element.getSnippet();
    this.setState({
      snippet,
    });
  }

  hideSnippet() {
    this.setState({snippet: ''});
  }

  getComponent() {
    return Button;
  }

  render() {
    const {snippet, buttonProps} = this.state;

    return (
      <View useSafeArea>
        {!!snippet && <SnippetBlock snippet={snippet} onClose={() => this.hideSnippet()}/>}
        <ScrollView>
          <View centerH>
            <Text style={styles.title}>Buttons</Text>

            <Button
              backgroundColor='#30B650'
              label='SHUFFLE PLAY'
              labelStyle={{fontWeight: '600'}}
              style={{marginBottom: ButtonSpace}}
              enableShadow
              ref={element => (this.button_1 = element)}
              onPress={() => this.showSnippet(this.button_1)}
            />

            <Button
              backgroundColor='#FB3C62'
              label='Get 3 Months Free'
              borderRadius={7}
              style={{height: 45, marginBottom: ButtonSpace}}
              ref={element => (this.button_2 = element)}
              onPress={() => this.showSnippet(this.button_2)}
            />

            <Button
              outline
              outlineColor={Colors.black}
              label='SHOP HOLIDAY'
              borderRadius={0}
              size='medium'
              text60
              labelStyle={{fontWeight: '700', letterSpacing: 4}}
              style={{borderWidth: 3, marginBottom: ButtonSpace}}
              ref={element => (this.button_3 = element)}
              onPress={() => this.showSnippet(this.button_3)}
            />

            <Button
              backgroundColor='#439F4F'
              label='MOVE TO BAG'
              size='small'
              borderRadius={0}
              text90
              labelStyle={{fontWeight: '500', letterSpacing: -0.5}}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_4 = element)}
              onPress={() => this.showSnippet(this.button_4)}
            />
            <Button
              backgroundColor='#3C9BF0'
              label='Follow'
              size='small'
              borderRadius={3}
              text90
              labelStyle={{fontWeight: '500'}}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_5 = element)}
              onPress={() => this.showSnippet(this.button_5)}
            />

            <Text style={styles.header}>Do you have it in small?</Text>
            <Button
              label={'Default'}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_6 = element)}
              onPress={() => this.showSnippet(this.button_6)}
            />
            <Button
              label={'Medium'}
              size={Button.sizes.medium}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_7 = element)}
              onPress={() => this.showSnippet(this.button_7)}
            />
            <Button
              label={'Small'}
              size={Button.sizes.small}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_8 = element)}
              onPress={() => this.showSnippet(this.button_8)}
            />
            <Button
              label={'xSmall'}
              size={Button.sizes.xSmall}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_81 = element)}
              onPress={() => this.showSnippet(this.button_81)}
            />
            <Button
              label={'This is a button with long text'}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_9 = element)}
              onPress={() => this.showSnippet(this.button_9)}
            />

            <Button
              label={'Disabled'}
              disabled
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_10 = element)}
              onPress={() => this.showSnippet(this.button_10)}
            />

            <Text style={styles.header}>Do you have it in red?</Text>
            <Button
              label={'Bold!'}
              labelStyle={{fontWeight: '800'}}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_11 = element)}
              onPress={() => this.showSnippet(this.button_11)}
            />
            <Button
              label={'Red Button'}
              backgroundColor={Colors.red30}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_12 = element)}
              onPress={() => this.showSnippet(this.button_12)}
            />
            <Button
              label={'Dark Label'}
              red10
              backgroundColor={Colors.red50}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_13 = element)}
              onPress={() => this.showSnippet(this.button_13)}
            />
            <Button
              label={'With Shadow'}
              enableShadow
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_14 = element)}
              onPress={() => this.showSnippet(this.button_14)}
            />

            <Text style={styles.header}>Inside Out</Text>
            <Button
              label='Outline'
              outline
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_15 = element)}
              onPress={() => this.showSnippet(this.button_15)}
            />
            <Button
              label='Outline M'
              size={Button.sizes.medium}
              outline
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_16 = element)}
              onPress={() => this.showSnippet(this.button_16)}
            />

            <Button
              label='Outline S'
              size={Button.sizes.small}
              outline
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_16a = element)}
              onPress={() => this.showSnippet(this.button_16a)}
            />
            <Button
              label='Red Outline'
              outline
              outlineWidth={3}
              outlineColor={Colors.red10}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_16 = element)}
              onPress={() => this.showSnippet(this.button_16)}
            />

            <Button
              label='Outline with background'
              outlineColor={Colors.dark10}
              backgroundColor={Colors.dark40}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_24 = element)}
              onPress={() => this.showSnippet(this.button_24)}
            />

            <Button
              label='Disabled Outline'
              outline
              disabled
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_16 = element)}
              onPress={() => this.showSnippet(this.button_16)}
            />

            <Button
              label='disabled outline + icon'
              outline
              disabled
              iconSource={plusIcon}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_16 = element)}
              onPress={() => this.showSnippet(this.button_16)}
            />

            <Text style={styles.header}>Round</Text>
            <View row width={'100%'} center>
              <Button
                round
                backgroundColor='#FF69B4'
                style={{margin: ButtonSpace}}
                iconSource={Assets.icons.settings}
                iconStyle={{tintColor: Colors.white}}
                ref={element => (this.button_0 = element)}
                onPress={() => this.showSnippet(this.button_0)}
                size={'xSmall'}
              />
              <Button
                round
                backgroundColor='#ff4fa7'
                style={{margin: ButtonSpace}}
                iconSource={Assets.icons.settings}
                iconStyle={{tintColor: Colors.white}}
                ref={element => (this.button_0 = element)}
                onPress={() => this.showSnippet(this.button_0)}
                size={'small'}
              />
              <Button
                round
                backgroundColor='#ff369b'
                style={{margin: ButtonSpace}}
                iconSource={Assets.icons.settings}
                iconStyle={{tintColor: Colors.white}}
                ref={element => (this.button_0 = element)}
                onPress={() => this.showSnippet(this.button_0)}
                size={'medium'}
              />
              <Button
                round
                backgroundColor='#ff1d8e'
                style={{margin: ButtonSpace}}
                iconSource={Assets.icons.settings}
                iconStyle={{tintColor: Colors.white}}
                ref={element => (this.button_0 = element)}
                onPress={() => this.showSnippet(this.button_0)}
              />
            </View>
            
            <Text style={styles.header}>Animated</Text>
            <Button
              size={'small'}
              style={{marginBottom: ButtonSpace / 4, marginLeft: ButtonSpace}}
              backgroundColor={Colors.green20}
              iconSource={Assets.icons.settings}
              {...buttonProps}
              onPress={this.changeProps}
              iconOnRight
              animateLayout
              animateTo={'left'}
            />
            <Button
              size={'medium'}
              style={{marginBottom: ButtonSpace / 4}}
              backgroundColor={Colors.green20}
              iconSource={Assets.icons.settings}
              {...buttonProps}
              onPress={this.changeProps}
              animateLayout
            />
            <Button
              style={{marginBottom: ButtonSpace / 4, marginRight: ButtonSpace}}
              backgroundColor={Colors.green20}
              iconSource={Assets.icons.settings}
              {...buttonProps}
              onPress={this.changeProps}
              animateLayout
              animateTo={'right'}
            />

            <Text style={styles.header}>Let your curves show</Text>
            {Constants.isIOS ? (
              <Button
                label={'Squarish'}
                borderRadius={2}
                style={{marginBottom: ButtonSpace}}
                ref={element => (this.button_17 = element)}
                onPress={() => this.showSnippet(this.button_17)}
              />
            ) : (
              <Button
                label={'Roundish'}
                borderRadius={15}
                style={{marginBottom: ButtonSpace}}
                ref={element => (this.button_17 = element)}
                onPress={() => this.showSnippet(this.button_17)}
              />
            )}
            <Button
              label={'Custom'}
              borderRadius={22}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_18 = element)}
              onPress={() => this.showSnippet(this.button_18)}
            />
            <Button
              label={'No Radius'}
              borderRadius={0}
              style={{marginBottom: ButtonSpace}}
              ref={element => (this.button_19 = element)}
              onPress={() => this.showSnippet(this.button_19)}
            />
            <Text style={styles.header}>Special Cases</Text>

            <View marginB-20 row>
              <Button
                iconSource={plusIcon}
                style={{width: 44, height: 44}}
                color={Colors.white}
                ref={element => (this.button_23 = element)}
                onPress={() => this.showSnippet(this.button_23)}
              />
              
              <Button
                iconSource={plusIcon}
                
                style={{width: 44, height: 44}}
                link
              />
              
              <Button
                iconSource={plusIcon}
                outline
                style={{width: 44, height: 44}}
                outlineColor={Colors.red50}
              />
            </View>

            <Button
              style={{marginBottom: ButtonSpace}}
              size='small'
              iconSource={plusIcon}
              iconStyle={{tintColor: 'white'}}
              label='Icon'
            />

            <Button style={{marginBottom: ButtonSpace}} blue30 outline iconSource={plusIcon} label='Icon' />

            <Button onPress={() => Alert.alert('Button #3')} style={{marginBottom: ButtonSpace}}>
              <Text>
                {Assets.emojis.cloud} {Assets.emojis.airplane} {Assets.emojis.sunny}
              </Text>
            </Button>
            <Button outline onPress={() => Alert.alert('Button #3')} style={{marginBottom: ButtonSpace}}>
              <Image source={plusIcon} />
              <Text style={{marginLeft: 10, color: Colors.blue30}}>Custom Icon</Text>
            </Button>
            <Button
              label={'Custom Icon Renderer'}
              outline
              onPress={() => Alert.alert('Custom icon renderer')}
              style={{marginBottom: ButtonSpace}}
              iconSource={iconStyle => <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: iconStyle[0].tintColor,
                  borderRadius: 10,
                  marginRight: iconStyle[0].marginRight,
                }}
              />}
            />
            <Button text90 link style={{marginBottom: ButtonSpace}} iconSource={plusIcon} label='link icon' />

            <Button text90 link disabled style={{marginBottom: ButtonSpace}} iconSource={plusIcon} label='disabled link' />

            <Button label='link button' link style={{marginBottom: ButtonSpace}} />

            <Button label='Icon on right' iconSource={plusIcon} iconOnRight />
          </View>

          <View marginT-20>
            <View centerH marginB-10>
              <Text text50 dark10>
                Full Width Buttons
              </Text>
            </View>
            <Button
              fullWidth
              label='Full Width'
              marginB-10
              ref={element => (this.button_20 = element)}
              onPress={() => this.showSnippet(this.button_20)}
            />

            <Button
              fullWidth
              size='medium'
              bg-red70
              dark10
              label='Medium Size Full Width'
              marginB-10
              ref={element => (this.button_21 = element)}
              onPress={() => this.showSnippet(this.button_21)}
            />
            <Button
              fullWidth
              size='small'
              bg-green70
              green10
              label='Small Size Full Width'
              ref={element => (this.button_22 = element)}
              onPress={() => this.showSnippet(this.button_22)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const SnippetBlock = ({snippet, onClose}) => {
  return (
    <View flex spread bg-dark10 padding-15 style={{...StyleSheet.absoluteFillObject, zIndex: 1}}>
      <View>
        <Text white text40 marginB-20>
          Snippet Code
        </Text>
        <Text white text70>
          {snippet}
        </Text>
      </View>
      <View row centerH>
        {/* <Button marginR-10 white outline outlineColor={Colors.white} size='small' label='copy'/> */}
        <Button white outline outlineColor={Colors.white} size='small' label='close' onPress={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 25,
  },
  title: {
    ...Typography.text20,
  },
  header: {
    ...Typography.text60,
    marginVertical: 20,
  },
});
