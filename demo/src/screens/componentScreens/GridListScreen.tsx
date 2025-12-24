import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  Constants,
  GridList,
  Card,
  Spacings,
  BorderRadiuses,
  GridListProps,
  GridListItem
} from 'react-native-ui-lib';
import products from '../../data/products';
import {renderBooleanOption, renderMultipleSegmentOptions} from '../ExampleScreenPresenter';

class GridListScreen extends Component {
  state = {
    orientation: Constants.orientation,
    useGridListItem: true,
    horizontalAlignment: GridListItem.horizontalAlignment.left,
    overlayText: false,
    alignToStart: false
  };

  renderHeader = () => {
    return (
      <View>
        <Text h1 marginV-s3>
          GridList
        </Text>
        {renderBooleanOption.call(this, 'UseGridListItem', 'useGridListItem')}
        <Text h3 marginV-s2>
          GridListItem props
        </Text>
        {renderMultipleSegmentOptions.call(this, 'Horizontal Alignment:', 'horizontalAlignment', [
          {label: 'left', value: GridListItem.horizontalAlignment.left},
          {label: 'center', value: GridListItem.horizontalAlignment.center},
          {label: 'right', value: GridListItem.horizontalAlignment.right}
        ])}
        {renderBooleanOption.call(this, 'Align to start:', 'alignToStart')}
        {renderBooleanOption.call(this, 'Use overlay text:', 'overlayText')}
      </View>
    );
  };

  renderItem: GridListProps<(typeof products)[0]>['renderItem'] = ({item}) => {
    const {useGridListItem, horizontalAlignment, overlayText, alignToStart} = this.state;

    if (useGridListItem) {
      return (
        <GridListItem
          // containerStyle={{width: '100%', borderWidth: 1}}
          itemSize={{width: '100%', height: 200}}
          imageProps={{source: {uri: item.mediaUrl}}}
          renderCustomItem={() => <Text>Custom Text</Text>}
          title="Title"
          subtitle="Subtile"
          alignToStart={alignToStart}
          overlayText={overlayText}
          horizontalAlignment={horizontalAlignment}
          accessible={false}
        />
      );
    } else {
      return (
        <Card flex>
          <Card.Section imageSource={{uri: item.mediaUrl}} imageStyle={styles.itemImage}/>
          <View padding-s2>
            <Text $textDefault>{item.name}</Text>
            <Text $textDefault>{item.formattedPrice}</Text>
            {item.inventory.status === 'Out of Stock' && (
              <Text text90M $textDangerLight>
                {item.inventory.status}
              </Text>
            )}
          </View>
        </Card>
      );
    }
  };

  render() {
    return (
      <GridList<(typeof products)[0]>
        ListHeaderComponent={() => this.renderHeader()}
        data={products}
        renderItem={this.renderItem}
        numColumns={2}
        // maxItemWidth={140}
        itemSpacing={Spacings.s3}
        listPadding={Spacings.s5}
        // keepItemSize
        contentContainerStyle={styles.list}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: Spacings.s5
  },
  itemImage: {
    width: '100%',
    height: 85,
    borderRadius: BorderRadiuses.br10
  }
});

export default GridListScreen;
