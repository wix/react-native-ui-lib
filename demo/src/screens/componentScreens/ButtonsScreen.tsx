import React, {Component} from 'react';
import {ScrollView, StyleSheet, Alert} from 'react-native';
import {
  Text,
  View,
  Assets,
  Constants,
  Button,
  Colors,
  Typography,
  ButtonProps,
  Incubator,
  Image
} from 'react-native-ui-lib';

const ButtonSpace = 20;
const plusIcon = Assets.getAssetByPath('icons.demo.plus');
const settingsIcon = Assets.getAssetByPath('icons.demo.settings');
const labelButton = {label: 'Animated'};
const iconButton = {round: true};

export default class ButtonsScreen extends Component {
  state = {
    backgroundColor: Colors.yellow30,
    label: 'Button',
    // outline: true,
    buttonProps: labelButton as ButtonProps
  };

  changeProps = () => {
    if (this.state.buttonProps === labelButton) {
      this.setState({buttonProps: iconButton});
    }
    if (this.state.buttonProps === iconButton) {
      this.setState({buttonProps: labelButton});
    }
  };

  render() {
    const {buttonProps} = this.state;

    return (
      <View useSafeArea>
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
              outlineColor={Colors.$backgroundInverted}
              label="SHOP HOLIDAY"
              borderRadius={0}
              size={Button.sizes.medium}
              text60
              $textDefault
              labelStyle={{fontWeight: '700', letterSpacing: 4}}
              style={{borderWidth: 3, marginBottom: ButtonSpace}}
            />

            <Button
              backgroundColor="#439F4F"
              label="MOVE TO BAG"
              size={Button.sizes.small}
              borderRadius={0}
              text90
              labelStyle={{fontWeight: '500', letterSpacing: -0.5}}
              style={{marginBottom: ButtonSpace}}
            />
            <Button
              backgroundColor="#3C9BF0"
              label="Follow"
              size={Button.sizes.small}
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
            <Button
              label={'Red Button'}
              backgroundColor={Colors.$backgroundDangerHeavy}
              style={{marginBottom: ButtonSpace}}
            />
            <Button
              label={'Dark Label'}
              $textDanger
              backgroundColor={Colors.$backgroundDangerLight}
              style={{marginBottom: ButtonSpace}}
            />
            <Button label={'With Shadow'} enableShadow style={{marginBottom: ButtonSpace}}/>

            <Text style={styles.header}>Inside Out</Text>
            <Button label="Outline" outline style={{marginBottom: ButtonSpace}}/>
            <Button label="Outline M" size={Button.sizes.medium} outline style={{marginBottom: ButtonSpace}}/>

            <Button label="Outline S" size={Button.sizes.small} outline style={{marginBottom: ButtonSpace}}/>
            <Button
              label="Red Outline"
              outline
              outlineWidth={3}
              outlineColor={Colors.$outlineDanger}
              style={{marginBottom: ButtonSpace}}
            />

            <Button
              label="Outline with background"
              outlineColor={Colors.$outlineDisabledHeavy}
              backgroundColor={Colors.$backgroundNeutralIdle}
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
                size={Button.sizes.xSmall}
              />
              <Button
                round
                backgroundColor="#ff4fa7"
                style={{margin: ButtonSpace}}
                iconSource={settingsIcon}
                size={Button.sizes.small}
              />
              <Button
                round
                backgroundColor="#ff369b"
                style={{margin: ButtonSpace}}
                iconSource={settingsIcon}
                size={Button.sizes.medium}
              />
              <Button round backgroundColor="#ff1d8e" style={{margin: ButtonSpace}} iconSource={settingsIcon}/>
            </View>

            <Text style={styles.header}>Animated</Text>
            <Button
              size={'small'}
              style={{marginBottom: ButtonSpace / 4, marginLeft: ButtonSpace}}
              backgroundColor={Colors.$backgroundSuccessHeavy}
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
              backgroundColor={Colors.$backgroundSuccessHeavy}
              iconSource={settingsIcon}
              {...buttonProps}
              onPress={this.changeProps}
              animateLayout
            />
            <Button
              style={{marginBottom: ButtonSpace / 4, marginRight: ButtonSpace}}
              backgroundColor={Colors.$backgroundSuccessHeavy}
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
              <Button iconSource={plusIcon} style={{width: 44, height: 44}} color={Colors.$iconDefaultLight}/>

              <Button iconSource={plusIcon} style={{width: 44, height: 44}} link/>

              <Button
                iconSource={plusIcon}
                outline
                style={{width: 44, height: 44}}
                outlineColor={Colors.$outlineDanger}
              />
            </View>

            <Button style={{marginBottom: ButtonSpace}} size={Button.sizes.small} iconSource={plusIcon} label="Icon"/>
            
            <Button marginB-s5 iconSource={plusIcon} iconProps={{tintColor: 'red'}} label="Custom icon color"/>

            <Button marginB-s5 iconSource={plusIcon} iconStyle={{tintColor: 'pink'}} label="Custom icon style"/>

            <Button style={{marginBottom: ButtonSpace}} outline iconSource={plusIcon} label="Icon"/>

            <Button onPress={() => Alert.alert('Button #3')} style={{marginBottom: ButtonSpace}}>
              <Text>
                {Assets.emojis.cloud} {Assets.emojis.airplane} {Assets.emojis.sunny}
              </Text>
            </Button>
            <Button outline onPress={() => Alert.alert('Button #3')} style={{marginBottom: ButtonSpace}}>
              <Image source={plusIcon}/>
              <Text marginL-10>Custom Icon</Text>
            </Button>
            <Button
              label={'Custom Icon Renderer'}
              outline
              onPress={() => Alert.alert('Custom icon renderer')}
              style={{marginBottom: ButtonSpace}}
              iconSource={iconStyle => (
                <View
                  style={[
                    iconStyle,
                    {
                      width: 20,
                      height: 20,
                      // @ts-expect-error
                      backgroundColor: iconStyle[0]?.tintColor,
                      borderRadius: 10
                    }
                  ]}
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
            <Button link premium marginB-20 label="Button"/>

            <Button
            margin-20
            size={Button.sizes.xSmall}
            round
            iconSource={Assets.icons.general.optionsSmall}
            />
            <Button label="n" link style={{marginBottom: ButtonSpace}}/>

            <Button label="hyperlink button" hyperlink style={{marginBottom: ButtonSpace}}/>

            <Button label="Icon on right" iconSource={plusIcon} iconOnRight/>

            <Text style={styles.header}>Custom Backgrounds</Text>
            <Button
              label="Gradient Background"
              customBackground={
                <Incubator.Gradient
                  colors={[Colors.$backgroundPrimaryHeavy, Colors.$backgroundPrimaryMedium]}
                  type="rectangle"
                  width={200}
                  height={50}
                />
              }
              style={{marginBottom: ButtonSpace}}
            />
            <Button
              label="Image Background"
              customBackground={
                <Image
                  source={{
                    uri: 'https://images.pexels.com/photos/748837/pexels-photo-748837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                  }}
                  style={{width: 200, height: 50}}
                  resizeMode="cover"
                />
              }
              style={{marginBottom: ButtonSpace}}
              $textNeutralHeavy
            />
          </View>

          <View marginT-20>
            <View centerH marginB-10>
              <Text text50>Full Width Buttons</Text>
            </View>
            <Button fullWidth label="Full Width" marginB-10/>

            <Button
              fullWidth
              size="medium"
              bg-$backgroundDangerLight
              $textDefault
              label="Medium Size Full Width"
              marginB-10
            />
            <Button fullWidth size="small" bg-$backgroundSuccessLight $textSuccess label="Small Size Full Width"/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 25
  },
  title: {
    ...Typography.text20,
    color: Colors.$textDefault
  },
  header: {
    ...Typography.text60,
    marginVertical: 20,
    color: Colors.$textDefault
  }
});
