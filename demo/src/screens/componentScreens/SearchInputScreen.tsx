import React, {useCallback, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {Colors, View, Text, Switch, SearchInput, SearchInputRef, Button, Icon, Assets} from 'react-native-ui-lib';

const SearchInputScreen = () => {
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showCustomRightElement, setShowCustomRightElement] = useState(false);
  const searchInput = useRef<SearchInputRef>();

  const onChangeText = (text: string) => {
    console.log('UILIB text: ', text);
  };

  const onDismiss = useCallback(() => {
    Alert.alert('Cancel was pressed');
  }, []);

  const customRightElement = (
    <View center marginH-s2>
      <Icon source={Assets.icons.demo.check}/>
    </View>
  );

  return (
    <View style={{marginVertical: 5}}>
      <Text center h3 $textDefault margin-5>
        SearchInput
      </Text>

      <View>
        <SearchInput
          showLoader={showLoader}
          ref={searchInput}
          testID={'searchInput'}
          value=""
          placeholder="Search"
          onDismiss={showCancelBtn ? onDismiss : undefined}
          cancelButtonProps={{label: 'Cancel'}}
          customRightElement={showCustomRightElement ? customRightElement : undefined}
        />
        <View marginV-s2>
          <SearchInput
            showLoader={showLoader}
            invertColors
            value={''}
            placeholder="Search with inverted colors"
            style={{backgroundColor: Colors.$backgroundNeutralHeavy}}
            onDismiss={showCancelBtn ? onDismiss : undefined}
            cancelButtonProps={{label: 'Cancel'}}
            onChangeText={onChangeText}
            customRightElement={showCustomRightElement ? customRightElement : undefined}
          />
        </View>
        <SearchInput
          showLoader={showLoader}
          value={''}
          placeholder="Search with custom colors"
          onDismiss={showCancelBtn ? onDismiss : undefined}
          cancelButtonProps={{label: 'Cancel'}}
          onChangeText={onChangeText}
          style={{backgroundColor: Colors.purple20}}
          placeholderTextColor={Colors.white}
          containerStyle={{color: Colors.white}}
          customRightElement={showCustomRightElement ? customRightElement : undefined}
        />
      </View>

      <View marginV-s2>
        <Text center h3 $textDefault margin-5>
          Search Input Presets:
        </Text>
        <View margin-s2>
          <Text marginL-s3 marginV-s2>
            Default:
          </Text>
          <SearchInput
            showLoader={showLoader}
            testID={'searchInput'}
            value=""
            placeholder="Search"
            onDismiss={showCancelBtn ? onDismiss : undefined}
            cancelButtonProps={{label: 'Cancel'}}
            customRightElement={showCustomRightElement ? customRightElement : undefined}
          />
        </View>
        <Text marginL-s3 marginV-s2>
          Prominent:
        </Text>
        <SearchInput
          showLoader={showLoader}
          testID={'searchInput'}
          value=""
          placeholder="Search"
          onDismiss={showCancelBtn ? onDismiss : undefined}
          cancelButtonProps={{label: 'Cancel'}}
          preset={SearchInput.presets.PROMINENT}
          customRightElement={showCustomRightElement ? customRightElement : undefined}
        />
      </View>

      <View marginT-s8 marginH-s3>
        <Text bodyBold>Settings:</Text>
        <View row marginV-s2>
          <Switch
            value={showCancelBtn}
            onValueChange={value => setShowCancelBtn(value)}
            onColor={Colors.$iconSuccessLight}
          />
          <Text marginL-s4>Toggle cancel button</Text>
        </View>
        <View row marginV-s2>
          <Switch
            value={showCustomRightElement}
            onValueChange={value => setShowCustomRightElement(value)}
            onColor={Colors.$iconSuccessLight}
          />
          <Text marginL-s4>Toggle Custom right element</Text>
        </View>
        <View row marginV-s2>
          <Switch value={showLoader} onValueChange={value => setShowLoader(value)} onColor={Colors.$iconSuccessLight}/>
          <Text marginL-s4>Toggle loader</Text>
        </View>
        <View padding-10 marginV-s1>
          <Text>Actions: on the first example</Text>
          <View row spread marginV-s1>
            <Button size={Button.sizes.small} label={'Blur'} onPress={() => searchInput?.current?.blur()}/>
            <Button size={Button.sizes.small} label={'Focus'} onPress={() => searchInput?.current?.focus()}/>
            <Button size={Button.sizes.small} label={'Clear'} onPress={() => searchInput?.current?.clear()}/>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchInputScreen;
