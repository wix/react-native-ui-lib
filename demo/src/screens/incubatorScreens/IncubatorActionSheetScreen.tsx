import _ from 'lodash';
import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {View, Button, Incubator, Text, Switch, RadioButton, RadioGroup, Typography} from 'react-native-ui-lib';
import {listItems, gridItems, TEXT_LENGTH, OPTIONS_TYPE, State} from './ActionSheetItems';

function IncubatorActionSheetScreen() {
  const gridOptions = {};
  const [actionSheetOptions, setActionSheetOptions] = useState<State>({
    shouldShowModal: false,
    titleLength: TEXT_LENGTH.NO_TEXT,
    titleIsProminent: false,
    titleIsClickable: false,
    subtitleLength: TEXT_LENGTH.NO_TEXT,
    showFooter: false,
    optionsType: OPTIONS_TYPE.NONE,
    visible: false
  });

  const updateState = (newValues: Partial<State>) => {
    setActionSheetOptions(prevOptions => ({
      ...prevOptions,
      ...newValues
    }));
  };

  const setTitleLength = (titleLength: TEXT_LENGTH) => {
    if (titleLength !== actionSheetOptions.titleLength) {
      updateState({titleLength});
    }
  };

  const toggleProminent = () => {
    updateState({titleIsProminent: !actionSheetOptions.titleIsProminent});
  };

  const toggleClickable = () => {
    updateState({titleIsClickable: !actionSheetOptions.titleIsClickable});
  };

  const setSubtitleLength = (subtitleLength: TEXT_LENGTH) => {
    if (subtitleLength !== actionSheetOptions.subtitleLength) {
      updateState({subtitleLength});
    }
  };

  const toggleFooter = () => {
    updateState({showFooter: !actionSheetOptions.showFooter});
  };

  const setOptionsType = (optionsType: OPTIONS_TYPE) => {
    if (optionsType !== actionSheetOptions.optionsType) {
      updateState({optionsType});
    }
  };

  const showActionSheet = () => {
    updateState({visible: true});
  };

  const setVisible = (visible: boolean) => {
    updateState({visible});
  };

  const getTitle = () => {
    const {titleLength} = actionSheetOptions;
    switch (titleLength) {
      case TEXT_LENGTH.NO_TEXT:
        return undefined;
      case TEXT_LENGTH.SHORT:
      default:
        return 'Title';
      case TEXT_LENGTH.LONG:
        return 'This is a very long title, perhaps too long';
    }
  };

  const clicked = (text: string) => {
    Alert.alert(text);
  };

  const getSubtitle = () => {
    const {subtitleLength} = actionSheetOptions;
    switch (subtitleLength) {
      case TEXT_LENGTH.NO_TEXT:
      default:
        return undefined;
      case TEXT_LENGTH.SHORT:
        return 'Subtitle';
      case TEXT_LENGTH.LONG:
        return 'This is a very long subtitle that hopefully tests two lines';
    }
  };

  const getHeaderProps = () => {
    const {titleIsProminent, titleIsClickable} = actionSheetOptions;
    const onPress = titleIsClickable ? clicked('Header clicked') : undefined;
    const titleStyle = titleIsProminent ? {...Typography.text70BO} : undefined;

    return {
      title: getTitle(),
      titleProps: {accessibilityLabel: 'Custom accessibility label for ActionSheet header'},
      subtitle: getSubtitle(),
      titleStyle,

      onPress
    };
  };

  const createGridViewItems = () => {
    const {optionsType} = actionSheetOptions;
    const data = optionsType === OPTIONS_TYPE.GRID_VIEW ? gridItems : gridItems.concat(gridItems).concat(gridItems);
    return _.map(data, (quickAction, index: number) => ({
      testID: `Option ${index + 1}`,
      ...quickAction,
      avoidDismiss: index === 5
    }));
  };

  const getGridOptions = () => {
    const {optionsType} = actionSheetOptions;
    if (optionsType !== OPTIONS_TYPE.GRID_VIEW) {
      return;
    } else if (gridOptions[optionsType]) {
      return gridOptions[optionsType];
    }
    gridOptions[optionsType] = createGridViewItems();

    return {...gridOptions[optionsType]};
  };

  const renderRadioButton = (key: string, value: string, hasLeftMargin: boolean) => {
    return <RadioButton testID={key} key={key} value={value} label={value} marginT-10 marginR-10={hasLeftMargin}/>;
  };

  const renderRadioGroup = (title: string,
    data: {[s: number]: string},
    initialValue?: string,
    onValueChange?: (data: any) => void) => {
    const radioButtons: React.ReactElement[] = [];
    Object.entries(data).forEach(([key, value], index) => {
      radioButtons.push(renderRadioButton(`${title}_${key}`, value, index !== _.size(data) - 1));
    });

    return (
      <RadioGroup marginT-20 initialValue={initialValue} onValueChange={onValueChange}>
        <Text>{title}:</Text>
        <View row style={{flexWrap: 'wrap'}}>
          {radioButtons}
        </View>
      </RadioGroup>
    );
  };

  const renderTitleSwitches = () => {
    const {titleIsProminent, titleIsClickable} = actionSheetOptions;

    return (
      <View row centerV marginT-10>
        <Text>Prominent style:</Text>
        <Switch testID={'prominentTitleSwitch'} value={titleIsProminent} onValueChange={toggleProminent} marginL-10/>
        <Text marginL-40>Clickable:</Text>
        <Switch testID={'clickableTitleSwitch'} value={titleIsClickable} onValueChange={toggleClickable} marginL-10/>
      </View>
    );
  };

  const renderActionSheet = () => {
    const {visible, showFooter} = actionSheetOptions;
    const headerProps = getHeaderProps();
    const gridOptions = getGridOptions();
    const footerCustomElement = showFooter ? <Text red30>Footer</Text> : undefined;

    return (
      <Incubator.ActionSheet
        testID={'uilib.actionSheet'}
        visible={visible}
        options={listItems}
        onDismiss={() => {
          console.log(`props onDismiss called!`);
          setVisible(false);
        }}
        dialogProps={{
          bottom: true,
          centerH: true,
          width: '95%',
          headerProps
        }}
        gridOptions={gridOptions}
        footerCustomElement={footerCustomElement}
      />
    );
  };

  return (
    <View bg-grey80 flex padding-20>
      <Text text30 grey10>
        Action Sheet
      </Text>

      <ScrollView contentContainerStyle={styles.scrollViewContainer} testID="scrollView">
        {renderRadioGroup('Title', TEXT_LENGTH, actionSheetOptions.titleLength, setTitleLength)}
        {renderTitleSwitches()}
        {renderRadioGroup('Subtitle', TEXT_LENGTH, actionSheetOptions.subtitleLength, setSubtitleLength)}
        {renderRadioGroup('Options', OPTIONS_TYPE, actionSheetOptions.optionsType, setOptionsType)}
        <View row centerV marginT-10>
          <Text text65>Add footer:</Text>
          <Switch value={actionSheetOptions.showFooter} onValueChange={toggleFooter} marginL-10/>
        </View>

        <Button testID={'uilib.openActionSheet'} marginT-30 label={'Show action sheet'} onPress={showActionSheet}/>
        {renderActionSheet()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dismissButton: {
    justifyContent: 'center'
  },
  scrollViewContainer: {
    paddingBottom: 12
  }
});

export default IncubatorActionSheetScreen;
