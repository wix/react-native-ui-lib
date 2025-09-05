import React from 'react';
import SwipeableCard, {type SwipeableCardProps} from './SwipeableCard';
import {useSharedValue} from 'react-native-reanimated';
import View from '../view';

interface SwipeableCardsViewProps<T> {
  currentItem: T;
  nextItems: T[];
  onSwipe?: SwipeableCardProps['onSwipe'];
  currentIndex: number;
  renderNextCard: (nextItem: T) => JSX.Element;
  renderRightCard: () => JSX.Element;
  renderLeftCard: () => JSX.Element;
  renderMainCard: () => JSX.Element;
}

const SwipeableCardsView = (props: SwipeableCardsViewProps<any>) => {
  const {
    currentItem, nextItems, onSwipe, currentIndex, renderNextCard, 
    renderRightCard, renderLeftCard, renderMainCard
  } = props;

  const animatedValue = useSharedValue(0);

  return (
    <View flex>
      {nextItems.filter(Boolean).map((nextItem, index) => (
        <SwipeableCard
          key={index}
          {...{onSwipe, animatedValue, currentIndex}} 
          currentIndex={currentIndex} 
          itemIndex={currentIndex + index + 1}
        >
          {renderNextCard(nextItem)}
        </SwipeableCard>
      ))}
      <SwipeableCard
        {...{onSwipe, animatedValue}}
        currentIndex={currentIndex}
        itemIndex={currentIndex}
        key={currentItem?.id}
        cardContent={{
          right: renderRightCard(),
          left: renderLeftCard()
        }}
      >
        <View flex>
          {renderMainCard()}
        </View>
      </SwipeableCard>
    </View>

  );
};

export default SwipeableCardsView;
