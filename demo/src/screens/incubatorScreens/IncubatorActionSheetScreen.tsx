import _ from 'lodash';
import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {View, Button, Incubator, Text, Switch, RadioButton, RadioGroup, Typography, Colors} from 'react-native-ui-lib';
import {listItems, gridItems, TEXT_LENGTH, OPTIONS_TYPE, State, ICONS} from './ActionSheetItems';

function IncubatorActionSheetScreen() {
  const [actionSheetOptions, setActionSheetOptions] = useState<State>({
    titleLength: TEXT_LENGTH.SHORT,
    titleIsProminent: false,
    titleIsClickable: false,
    subtitleLength: TEXT_LENGTH.SHORT,
    showFooter: false,
    optionsType: OPTIONS_TYPE.REGULAR,
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
    const onPress = titleIsClickable ? () => clicked('Header clicked') : undefined;
    const titleStyle = titleIsProminent ? {...Typography.text70BO} : undefined;

    return {
      title: getTitle(),
      titleProps: {accessibilityLabel: 'Custom accessibility label for ActionSheet header'},
      subtitle: getSubtitle(),
      titleStyle,
      onPress
    };
  };

  const getGridOptions = () => {
    const {optionsType} = actionSheetOptions;
    if (optionsType === OPTIONS_TYPE.GRID_VIEW || optionsType === OPTIONS_TYPE.GRID_VIEW_LONG) {
      return {
        numColumns: 3
      };
    }
  };

  const getList = () => {
    const {optionsType} = actionSheetOptions;
    switch (optionsType) {
      case 'None':
        return [];
      case 'Regular':
        return listItems;
      case 'With icons':
        return listItems.map((item, index) => ({
          ...item,
          icon: {
            source: ICONS[index % ICONS.length],
            tintColor: index % ICONS.length === 2 && 'red',
            style: {marginRight: 10}
          }
        }));
      case 'Grid view':
        return gridItems.slice(0, 6).map(item => ({
          ...item,
          containerStyle: styles.gridItemsContainer
        }));
      case 'Grid view long':
        return gridItems.map(item => ({
          ...item,
          containerStyle: styles.gridItemsContainer
        }));
      case 'Section headers':
        return listItems.map((item, index) => ({
          ...item,
          isSectionHeader: index % 3 === 0,
          titleStyle: index % 3 === 0 && {...Typography.text65},
          sectionHeaderStyle: styles.sectionHeaders
        }));
      default:
        return [];
    }
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
    const list = getList();
    const headerProps = getHeaderProps();
    const gridOptions = getGridOptions();
    const footerCustomElement = showFooter ? (
      <View style={{height: 50}} flex bg-grey70 center>
        <Text red30 text70BO>
          Footer
        </Text>
      </View>
    ) : undefined;

    return (
      <Incubator.ActionSheet
        testID={'uilib.actionSheet'}
        visible={visible}
        options={list}
        onDismiss={() => {
          console.log(`props onDismiss called!`);
          setVisible(false);
        }}
        dialogProps={{
          bottom: true,
          centerH: true,
          width: '95%',
          height: _.isEmpty(list) && !gridOptions ? 150 : undefined,
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
          <Text>Add footer:</Text>
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
  },
  gridItemsContainer: {margin: 5, justifyContent: 'center', alignItems: 'center'},
  sectionHeaders: {backgroundColor: Colors.grey60, padding: 10}
});

export default IncubatorActionSheetScreen;
