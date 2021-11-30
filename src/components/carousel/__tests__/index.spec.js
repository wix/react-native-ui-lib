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

const TestCase = props => {
  return (
    <Carousel 
      testID={'carousel'}
      onChangePage={onChangePageMock}
      onScroll={onScrollMock}
      {...props}
    >
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
  
  describe('initialPage', () => {
    it('should be set to default initialPage', () => {
      const component = render(<TestCase/>);
      const scrollView = component.getByTestId('carousel.scrollView');
      
      expect(scrollView.props.contentOffset.x).toBe(0);
    });

    it('should be set to initialPage = 2', () => {
      const component = render(<TestCase initialPage={2}/>);
      const scrollView = component.getByTestId('carousel.scrollView');
      
      expect(scrollView.props.contentOffset.x).toBe(Constants.screenWidth * 2);
    });
  });

  describe('onScroll', () => {
    it('should trigger onScroll from the second scroll', () => {
      const component = render(<TestCase/>);
      const scrollView = component.getByTestId('carousel.scrollView');

      fireEvent.scroll(scrollView, eventData); //NOTE: first scroll doesn't fire onScroll
      expect(onScrollMock).not.toHaveBeenCalled();

      fireEvent.scroll(scrollView, eventData);
      expect(onScrollMock).toHaveBeenCalled();
    });
  });

  describe('onChangePage', () => {
    it('should trigger onChangePage with current page', async () => {
      const component = render(<TestCase/>);
      const scrollView = component.getByTestId('carousel.scrollView');

      fireEvent.scroll(scrollView, eventData); //NOTE: first scroll doesn't fire onScroll
      fireEvent.scroll(scrollView, eventData);
      expect(onChangePageMock).not.toHaveBeenCalled();

      // await new Promise(r => setTimeout(r, 1000));
      fireEvent(scrollView, 'onMomentumScrollEnd', eventData);
      expect(onChangePageMock).toHaveBeenCalledWith(1, 0, {isAutoScrolled: false});
    });
  });
});
