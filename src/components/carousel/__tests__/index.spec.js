import {map} from 'lodash';
import React from 'react';
import {render} from '@testing-library/react-native';
import {Text, View} from 'react-native';
import {fireOnScroll, fireOnMomentumScrollEnd} from '../../../uilib-test-renderer';
import {Constants} from '../../../commons';
import Carousel from '../index';

const numberOfPagesShown = 5;
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
      const {getByTestId} = render(<TestCase/>);
      const scrollView = getByTestId('carousel');
      
      expect(scrollView.props.contentOffset.x).toBe(0);
    });

    it('should be set to initialPage = 2', () => {
      const {getByTestId} = render(<TestCase initialPage={2}/>);
      const scrollView = getByTestId('carousel');
      
      expect(scrollView.props.contentOffset.x).toBe(Constants.screenWidth * 2);
    });
  });

  describe('onScroll', () => {
    it('should trigger onScroll from the second scroll', () => {
      const {getByTestId} = render(<TestCase/>);
      const scrollView = getByTestId('carousel');

      fireOnScroll(scrollView, {x: Constants.screenWidth}); //NOTE: first scroll doesn't fire onScroll
      expect(onScrollMock).not.toHaveBeenCalled();

      fireOnScroll(scrollView, {x: Constants.screenWidth});
      expect(onScrollMock).toHaveBeenCalled();
    });
  });

  describe('onChangePage', () => {
    it('should trigger onChangePage with current page', async () => {
      const {getByTestId} = render(<TestCase/>);
      const scrollView = getByTestId('carousel');

      fireOnScroll(scrollView, {x: Constants.screenWidth}); //NOTE: first scroll doesn't fire onScroll
      fireOnScroll(scrollView, {x: Constants.screenWidth});
      expect(onChangePageMock).not.toHaveBeenCalled();

      // await new Promise(r => setTimeout(r, 1000));
      fireOnMomentumScrollEnd(scrollView, {x: Constants.screenWidth});
      expect(onChangePageMock).toHaveBeenCalledWith(1, 0, {isAutoScrolled: false});
    });
  });
});
