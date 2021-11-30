import {map} from 'lodash';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Text, View} from 'react-native';
import {Constants} from '../../../helpers';
import Carousel from '../index';

const numberOfPagesShown = 5;
const eventData = {
  nativeEvent: {
    contentOffset: {
      x: Constants.screenWidth
    }
  }
};
const onChangePageMock = jest.fn();
const onScrollMock = jest.fn();
const props = {
  testID: 'carousel',
  initialPage: 0,
  pagingEnabled: true,
  autoplay: false,
  autoplayInterval: 4000,
  horizontal: true,
  onChangePage: onChangePageMock,
  onScroll: onScrollMock
  //animatedScrollOffset: // set to check Animated
};

const TestCase = props => {
  return (
    <Carousel {...props}>
      {map([...Array(numberOfPagesShown)], (_, index) => (
        <Page key={index}>
          <Text testID={`page-${index}`}>Page #{index}</Text>
        </Page>
      ))}
    </Carousel>
  );
};

const Page = ({children, ...others}) => {
  return (
    <View {...others} style={{flex: 1}}>
      {children}
    </View>
  );
};

describe('Carousel render tests', () => {
  
  describe('default setup', () => {
    it('should be set to default', () => {
      const component = render(<TestCase {...props}/>);

      component.getByText('Page #0'); // Validates that the text is there
    });

    it('should trigger onScroll from the second scroll', () => {
      const component = render(<TestCase {...props}/>);
      const scrollView = component.getByTestId('carousel.scrollView');

      fireEvent.scroll(scrollView, eventData); //NOTE: first scroll will no fire onScroll
      expect(onScrollMock).not.toHaveBeenCalled();

      fireEvent.scroll(scrollView, eventData);
      expect(onScrollMock).toHaveBeenCalled();
    });

    it('should trigger onChangePage with current page', async () => {
      const component = render(<TestCase {...props}/>);
      const scrollView = component.getByTestId('carousel.scrollView');

      fireEvent.scroll(scrollView, eventData); //NOTE: first scroll will no fire onScroll
      fireEvent.scroll(scrollView, eventData);
      expect(onChangePageMock).not.toHaveBeenCalled();

      // await new Promise(r => setTimeout(r, 1000));
      fireEvent(scrollView, 'onMomentumScrollEnd', eventData);
      expect(onChangePageMock).toHaveBeenCalled();
      expect(onChangePageMock).toHaveBeenCalledWith(1, 0, {isAutoScrolled: false});
    });
  });
});
