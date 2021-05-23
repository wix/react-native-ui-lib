import {isEmpty} from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  BorderRadiuses,
  Button,
  Colors,
  Image,
  PanningProvider,
  Shadows,
  SwipeToDismissView,
  View
} from 'react-native-ui-lib';
// @ts-ignore
import {renderBooleanOption} from '../ExampleScreenPresenter';

const VIEW_SIZE_SMALL = 40;
const VIEW_SIZE_LARGE = 200;
const chevronUp = require('../../assets/icons/chevronUp.png');
const chevronDown = require('../../assets/icons/chevronDown.png');
const chevronLeft = require('../../assets/icons/chevronLeft.png');
const chevronRight = require('../../assets/icons/chevronRight.png');

export default class SwipeToDismissScreen extends Component {
  private threshold = {x: 20, y: 20};
  state = {
    panUp: true,
    panDown: true,
    panLeft: true,
    panRight: true,
    reset: 1
  };

  reset = () => {
    this.setState({reset: !this.state.reset});
  };

  getPanDirections = () => {
    const {panUp, panDown, panLeft, panRight} = this.state;
    const panDirections = [];
    if (panUp) {
      panDirections.push(PanningProvider.Directions.UP);
    }
    if (panDown) {
      panDirections.push(PanningProvider.Directions.DOWN);
    }
    if (panLeft) {
      panDirections.push(PanningProvider.Directions.LEFT);
    }
    if (panRight) {
      panDirections.push(PanningProvider.Directions.RIGHT);
    }

    return panDirections;
  };

  renderContent = () => {
    const {panUp, panDown, panLeft, panRight} = this.state;
    const width = panLeft && panRight ? VIEW_SIZE_LARGE : VIEW_SIZE_SMALL;
    const height = panUp && panDown ? VIEW_SIZE_LARGE : VIEW_SIZE_SMALL;

    return (
      <View center style={[styles.contentContainer, {width, height}]}>
        <Image source={chevronUp} tintColor={panUp ? undefined : Colors.white}/>
        <View row>
          <Image source={chevronLeft} tintColor={panLeft ? undefined : Colors.white}/>
          <View flex/>
          <Image source={chevronRight} tintColor={panRight ? undefined : Colors.white}/>
        </View>
        <Image source={chevronDown} tintColor={panDown ? undefined : Colors.white}/>
      </View>
    );
  };

  render() {
    const {reset, panUp, panDown, panLeft, panRight} = this.state;
    const panDirections = this.getPanDirections();

    return (
      <View flex bg-grey80>
        <View margin-20>
          {renderBooleanOption.call(this, 'Pan up:', 'panUp')}
          {renderBooleanOption.call(this, 'Pan down:', 'panDown')}
          {renderBooleanOption.call(this, 'Pan left:', 'panLeft')}
          {renderBooleanOption.call(this, 'Pan right:', 'panRight')}
        </View>
        <Button label="Reset" size={Button.sizes.medium} outline style={styles.button} onPress={this.reset}/>
        <View
          absF
          pointerEvents="box-none"
          left={!panRight}
          right={!panLeft && panRight}
          centerH={(panLeft && panRight) || (panUp && !panDown) || (!panUp && panDown) || isEmpty(panDirections)}
          top={!panDown}
          bottom={!panUp && panDown}
          centerV={(panUp && panDown) || (panLeft && !panRight) || (!panLeft && panRight) || isEmpty(panDirections)}
          margin-20
        >
          <SwipeToDismissView
            key={`${reset}-${panUp}-${panDown}-${panLeft}-${panRight}`}
            panDirections={panDirections}
            renderContent={this.renderContent}
            threshold={this.threshold}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadiuses.br40,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    padding: 4,
    borderColor: Colors.grey30,
    borderWidth: 1,
    ...Shadows.dark20.top,
    ...Shadows.dark20.bottom
  },
  button: {
    alignSelf: 'center',
    marginBottom: 20
  }
});
