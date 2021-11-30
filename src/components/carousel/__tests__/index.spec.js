import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Text, View} from 'react-native';
import {Constants} from '../../../helpers';
import Carousel from '../index';

const getEventData = ({y = 0, x = 0}) => {
  return {
    nativeEvent: {
      contentOffset: {y, x}
    }
  };
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
      <Page key={index}>
        <Text testID={`page-0`}>Page #0</Text>
      </Page>
      <Page key={index}>
        <Text testID={`page-1`}>Page #1</Text>
      </Page>
      <Page key={index}>
        <Text testID={`page-2`}>Page #2</Text>
      </Page>
      <Page key={index}>
        <Text testID={`page-3`}>Page #3</Text>
      </Page>
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

      fireEvent.scroll(scrollView, getEventData({x: Constants.screenWidth})); //NOTE: first scroll doesn't fire onScroll
      expect(onScrollMock).not.toHaveBeenCalled();

      fireEvent.scroll(scrollView, getEventData({x: Constants.screenWidth}));
      expect(onScrollMock).toHaveBeenCalled();
    });
  });

  describe('onChangePage', () => {
    it('should trigger onChangePage with current page', async () => {
      const component = render(<TestCase/>);
      const scrollView = component.getByTestId('carousel.scrollView');

      fireEvent.scroll(scrollView, getEventData({x: Constants.screenWidth})); //NOTE: first scroll doesn't fire onScroll
      fireEvent.scroll(scrollView, getEventData({x: Constants.screenWidth}));
      expect(onChangePageMock).not.toHaveBeenCalled();

      // await new Promise(r => setTimeout(r, 1000));
      fireEvent(scrollView, 'onMomentumScrollEnd', getEventData({x: Constants.screenWidth}));
      expect(onChangePageMock).toHaveBeenCalledWith(1, 0, {isAutoScrolled: false});
    });
  });
});
