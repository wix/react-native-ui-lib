import _map from "lodash/map";
import React from 'react';
import { Text, View } from 'react-native';
import { fireOnMomentumScrollEnd } from "../../../uilib-test-renderer";
import { render } from '@testing-library/react-native';
import Carousel from "../index";
import { Constants } from "../../../commons/new";
import { CarouselDriver } from "../Carousel.driver.new";
const numberOfPagesShown = 5;
const onChangePageMock = jest.fn();
const onScrollMock = jest.fn();
const testID = 'carousel';
const TestCase = props => {
  return <Carousel testID={testID} onChangePage={onChangePageMock} onScroll={onScrollMock} {...props}>
      {_map([...Array(numberOfPagesShown)], (_, index) => <Page key={index}>
          <Text testID={`page-${index}`}>Page #{index}</Text>
        </Page>)}
    </Carousel>;
};
const Page = ({
  children,
  ...others
}) => {
  return <View {...others} style={{
    flex: 1
  }}>
      {children}
    </View>;
};
describe('Carousel render tests', () => {
  describe('initialPage', () => {
    it('should be set to default initialPage', async () => {
      const renderTree = render(<TestCase />);
      const driver = CarouselDriver({
        renderTree,
        testID
      });
      expect((await driver.getContentOffset()).x).toBe(0);
    });
    it('should be set to initialPage = 2', async () => {
      const renderTree = render(<TestCase initialPage={2} />);
      const driver = CarouselDriver({
        renderTree,
        testID
      });
      expect((await driver.getContentOffset()).x).toBe(Constants.screenWidth * 2);
    });
  });
  describe('onScroll', () => {
    it('should trigger onScroll from the second scroll', async () => {
      const renderTree = render(<TestCase />);
      const driver = CarouselDriver({
        renderTree,
        testID
      });
      await driver.scroll({
        x: Constants.screenWidth
      }); //NOTE: first scroll doesn't fire onScroll
      expect(onScrollMock).not.toHaveBeenCalled();
      await driver.scroll({
        x: Constants.screenWidth
      });
      expect(onScrollMock).toHaveBeenCalled();
    });
  });
  describe('onChangePage', () => {
    it('should trigger onChangePage with current page', async () => {
      const renderTree = render(<TestCase />);
      const driver = CarouselDriver({
        renderTree,
        testID
      });
      const scrollView = await driver.getElement();
      await driver.scroll({
        x: Constants.screenWidth
      }); //NOTE: first scroll doesn't fire onScroll
      await driver.scroll({
        x: Constants.screenWidth
      });
      expect(onChangePageMock).not.toHaveBeenCalled();
      fireOnMomentumScrollEnd(scrollView, {
        x: Constants.screenWidth
      });
      expect(onChangePageMock).toHaveBeenCalledWith(1, 0, {
        isAutoScrolled: false
      });
    });
  });
});