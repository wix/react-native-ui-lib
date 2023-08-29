import {fireEvent} from '@testing-library/react-native';
import {ComponentDriverResult} from './Component.driver';
import {ScrollViewProps, NativeScrollEvent, NativeScrollPoint} from 'react-native';

type ScrollableDriverOptions = Omit<NativeScrollEvent, 'contentOffset'>;

type ContentOffest = Partial<NativeScrollPoint>;

export type ScrollProps = {contentOffset: ContentOffest; options?: ScrollableDriverOptions};

export interface ScrollableDriverResult<Props> extends ComponentDriverResult<Props> {
  scroll: (contentOffset: ContentOffest, options?: ScrollableDriverOptions) => void;
}

export type ScrollableDriverProps = Partial<Pick<ScrollViewProps, 'contentOffset'>>;

export const useScrollableDriver = <
  Props extends ScrollableDriverProps,
  DriverProps extends ComponentDriverResult<Props> = ComponentDriverResult<Props> // Allows for chaining multiple drivers
>(
    driver: DriverProps
  ): ScrollableDriverResult<Props> & DriverProps => {
  const getContentOffset = async () => await driver.getElement().props.contentOffset;
  const scroll = ({x = 0, y = 0}, options?: ScrollableDriverOptions) => {
    fireEvent.scroll(driver.getElement(), {
      nativeEvent: {
        ...options,
        contentOffset: {x, y}
      }
    });
  };

  return {
    ...driver,
    getContentOffset,
    scroll
  };
};
