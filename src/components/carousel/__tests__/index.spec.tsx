import {map} from 'lodash';
import React from 'react';
import {Text, View} from 'react-native';
import {fireOnMomentumScrollEnd} from '../../../uilib-test-renderer';
import Carousel from '../index';
import {Constants} from '../../../commons/new';
import {CarouselDriver} from '../Carousel.driver';

const numberOfPagesShown = 5;
const onChangePageMock = jest.fn();
const onScrollMock = jest.fn();
const testID = 'carousel';
const TestCase = (props: any) => {
  return (
    <Carousel
      testID={testID}
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

const Page = ({children, ...others}:{children: React.ReactNode, others?: any}) => {
  return (
    <View {...others} style={{flex: 1}}>
      {children}
    </View>
  );
};

describe('Carousel render tests', () => {
  afterEach(() => CarouselDriver.clear());

  describe('initialPage', () => {
    it('should be set to default initialPage', async () => {
      const driver = new CarouselDriver({component: <TestCase/>, testID});

      expect((await driver.getContentOffset()).x).toBe(0);
    });

    it('should be set to initialPage = 2', async () => {
      const driver = new CarouselDriver({component: <TestCase initialPage={2}/>, testID});

      expect((await driver.getContentOffset()).x).toBe(Constants.screenWidth * 2);
    });
  });

  describe('onScroll', () => {
    it('should trigger onScroll from the second scroll', async () => {
      const driver = new CarouselDriver({component: <TestCase/>, testID});

      await driver.scroll(Constants.screenWidth); //NOTE: first scroll doesn't fire onScroll
      expect(onScrollMock).not.toHaveBeenCalled();

      await driver.scroll(Constants.screenWidth);
      expect(onScrollMock).toHaveBeenCalled();
    });
  });

  describe('onChangePage', () => {
    it('should trigger onChangePage with current page', async () => {
      const driver = new CarouselDriver({component: <TestCase/>, testID});
      const scrollView = await driver.getElement();

      await driver.scroll(Constants.screenWidth); //NOTE: first scroll doesn't fire onScroll
      await driver.scroll(Constants.screenWidth);
      expect(onChangePageMock).not.toHaveBeenCalled();

      fireOnMomentumScrollEnd(scrollView, {x: Constants.screenWidth});
      expect(onChangePageMock).toHaveBeenCalledWith(1, 0, {isAutoScrolled: false});
    });
  });
});
