import React, {Component} from 'react';
import {ScrollView, StyleSheet, Alert, Image} from 'react-native';
import {Text, View, Assets, Constants, Button, Colors, Typography} from 'react-native-ui-lib'; //eslint-disable-line

const ButtonSpace = 20;
const plusIcon = require('../../assets/icons/plus.png');
const settingsIcon = require('../../assets/icons/settings.png');
const labelButton = {label: 'Animated'};
const iconButton = {round: true, iconStyle: {tintColor: Colors.white}};

export default class ButtonsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snippet: '',
      backgroundColor: Colors.yellow30,
      label: 'Button',
      // outline: true,
      buttonProps: labelButton
    };
  }

  changeProps = () => {
    if (this.state.buttonProps === labelButton) {
      this.setState({buttonProps: iconButton});
    }
    if (this.state.buttonProps === iconButton) {
      this.setState({buttonProps: labelButton});
    }
  };

  render() {
    const {snippet, buttonProps} = this.state;

    return (
      <View useSafeArea>
        {!!snippet && <SnippetBlock snippet={snippet} onClose={() => this.hideSnippet()}/>}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View centerH>
            <Text style={styles.title}>Buttons</Text>

            <Button
              backgroundColor="#30B650"
              label="SHUFFLE PLAY"
              labelStyle={{fontWeight: '600'}}
              style={{marginBottom: ButtonSpace}}
              enableShadow
            />

            <Button
              backgroundColor="#FB3C62"
              label="Get 3 Months Free"
              borderRadius={7}
              style={{height: 45, marginBottom: ButtonSpace}}
            />

            <Button
              outline
              outlineColor={Colors.black}
              label="SHOP HOLIDAY"
              borderRadius={0}
              size="medium"
              text60
              labelStyle={{fontWeight: '700', letterSpacing: 4}}
              style={{borderWidth: 3, marginBottom: ButtonSpace}}
            />

            <Button
              backgroundColor="#439F4F"
              label="MOVE TO BAG"
              size="small"
              borderRadius={0}
              text90
              labelStyle={{fontWeight: '500', letterSpacing: -0.5}}
              style={{marginBottom: ButtonSpace}}
            />
            <Button
              backgroundColor="#3C9BF0"
              label="Follow"
              size="small"
              borderRadius={3}
              text90
              labelStyle={{fontWeight: '500'}}
              style={{marginBottom: ButtonSpace}}
            />

            <Text style={styles.header}>Do you have it in small?</Text>
            <Button label={'Default'} style={{marginBottom: ButtonSpace}}/>
            <Button label={'Medium'} size={Button.sizes.medium} style={{marginBottom: ButtonSpace}}/>
            <Button label={'Small'} size={Button.sizes.small} style={{marginBottom: ButtonSpace}}/>
            <Button label={'xSmall'} size={Button.sizes.xSmall} style={{marginBottom: ButtonSpace}}/>
            <Button label={'This is a button with long text'} style={{marginBottom: ButtonSpace}}/>

            <Button label={'Disabled'} disabled style={{marginBottom: ButtonSpace}}/>

            <Text style={styles.header}>Do you have it in red?</Text>
            <Button label={'Bold!'} labelStyle={{fontWeight: '800'}} style={{marginBottom: ButtonSpace}}/>
            <Button label={'Red Button'} backgroundColor={Colors.red30} style={{marginBottom: ButtonSpace}}/>
            <Button label={'Dark Label'} red10 backgroundColor={Colors.red50} style={{marginBottom: ButtonSpace}}/>
            <Button label={'With Shadow'} enableShadow style={{marginBottom: ButtonSpace}}/>

            <Text style={styles.header}>Inside Out</Text>
            <Button label="Outline" outline style={{marginBottom: ButtonSpace}}/>
            <Button label="Outline M" size={Button.sizes.medium} outline style={{marginBottom: ButtonSpace}}/>

            <Button label="Outline S" size={Button.sizes.small} outline style={{marginBottom: ButtonSpace}}/>
            <Button
              label="Red Outline"
              outline
              outlineWidth={3}
              outlineColor={Colors.red10}
              style={{marginBottom: ButtonSpace}}
            />

            <Button
              label="Outline with background"
              outlineColor={Colors.dark10}
              backgroundColor={Colors.dark40}
              style={{marginBottom: ButtonSpace}}
            />

            <Button label="Disabled Outline" outline disabled style={{marginBottom: ButtonSpace}}/>

            <Button
              label="disabled outline + icon"
              outline
              disabled
              iconSource={plusIcon}
              style={{marginBottom: ButtonSpace}}
            />

            <Text style={styles.header}>Round</Text>
            <View row width={'100%'} center>
              <Button
                round
                backgroundColor="#FF69B4"
                style={{margin: ButtonSpace}}
                iconSource={settingsIcon}
                iconStyle={{tintColor: Colors.white}}
                size={'xSmall'}
              />
              <Button
                round
                backgroundColor="#ff4fa7"
                style={{margin: ButtonSpace}}
                iconSource={settingsIcon}
                iconStyle={{tintColor: Colors.white}}
                size={'small'}
              />
              <Button
                round
                backgroundColor="#ff369b"
                style={{margin: ButtonSpace}}
                iconSource={settingsIcon}
                iconStyle={{tintColor: Colors.white}}
                size={'medium'}
              />
              <Button
                round
                backgroundColor="#ff1d8e"
                style={{margin: ButtonSpace}}
                iconSource={settingsIcon}
                iconStyle={{tintColor: Colors.white}}
              />
            </View>

            <Text style={styles.header}>Animated</Text>
            <Button
              size={'small'}
              style={{marginBottom: ButtonSpace / 4, marginLeft: ButtonSpace}}
              backgroundColor={Colors.green20}
              iconSource={settingsIcon}
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
              iconSource={settingsIcon}
              {...buttonProps}
              onPress={this.changeProps}
              animateLayout
            />
            <Button
              style={{marginBottom: ButtonSpace / 4, marginRight: ButtonSpace}}
              backgroundColor={Colors.green20}
              iconSource={settingsIcon}
              {...buttonProps}
              onPress={this.changeProps}
              animateLayout
              animateTo={'right'}
            />

            <Text style={styles.header}>Let your curves show</Text>
            {Constants.isIOS ? (
              <Button label={'Squarish'} borderRadius={2} style={{marginBottom: ButtonSpace}}/>
            ) : (
              <Button label={'Roundish'} borderRadius={15} style={{marginBottom: ButtonSpace}}/>
            )}
            <Button label={'Custom'} borderRadius={22} style={{marginBottom: ButtonSpace}}/>
            <Button label={'No Radius'} borderRadius={0} style={{marginBottom: ButtonSpace}}/>
            <Text style={styles.header}>Special Cases</Text>

            <View marginB-20 row>
              <Button iconSource={plusIcon} style={{width: 44, height: 44}} color={Colors.white}/>

              <Button iconSource={plusIcon} style={{width: 44, height: 44}} link/>

              <Button iconSource={plusIcon} outline style={{width: 44, height: 44}} outlineColor={Colors.red50}/>
            </View>

            <Button
              style={{marginBottom: ButtonSpace}}
              size="small"
              iconSource={plusIcon}
              iconStyle={{tintColor: 'white'}}
              label="Icon"
            />

            <Button style={{marginBottom: ButtonSpace}} blue30 outline iconSource={plusIcon} label="Icon"/>

            <Button onPress={() => Alert.alert('Button #3')} style={{marginBottom: ButtonSpace}}>
              <Text>
                {Assets.emojis.cloud} {Assets.emojis.airplane} {Assets.emojis.sunny}
              </Text>
            </Button>
            <Button outline onPress={() => Alert.alert('Button #3')} style={{marginBottom: ButtonSpace}}>
              <Image source={plusIcon}/>
              <Text style={{marginLeft: 10, color: Colors.blue30}}>Custom Icon</Text>
            </Button>
            <Button
              label={'Custom Icon Renderer'}
              outline
              onPress={() => Alert.alert('Custom icon renderer')}
              style={{marginBottom: ButtonSpace}}
              iconSource={(iconStyle) => (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: iconStyle[0].tintColor,
                    borderRadius: 10,
                    marginRight: iconStyle[0].marginRight
                  }}
                />
              )}
            />
            <Button text90 link style={{marginBottom: ButtonSpace}} iconSource={plusIcon} label="link icon"/>

            <Button
              text90
              link
              disabled
              style={{marginBottom: ButtonSpace}}
              iconSource={plusIcon}
              label="disabled link"
            />

            <Button label="link button" link style={{marginBottom: ButtonSpace}}/>

            <Button label="Icon on right" iconSource={plusIcon} iconOnRight/>
          </View>

          <View marginT-20>
            <View centerH marginB-10>
              <Text text50 dark10>
                Full Width Buttons
              </Text>
            </View>
            <Button fullWidth label="Full Width" marginB-10/>

            <Button fullWidth size="medium" bg-red70 dark10 label="Medium Size Full Width" marginB-10/>
            <Button fullWidth size="small" bg-green70 green10 label="Small Size Full Width"/>
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
        <Button white outline outlineColor={Colors.white} size="small" label="close" onPress={onClose}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 25
  },
  title: {
    ...Typography.text20
  },
  header: {
    ...Typography.text60,
    marginVertical: 20
  }
});
