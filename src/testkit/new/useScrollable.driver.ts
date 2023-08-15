import {fireEvent} from '@testing-library/react-native';
import {ComponentDriverResult} from './Component.driver';
import {ScrollViewProps, NativeScrollEvent, NativeScrollPoint} from 'react-native';

export type ScrollableDriverOptions = Omit<NativeScrollEvent, 'contentOffset'>;

export type ContentOffest = Partial<NativeScrollPoint>;

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
    scroll
  };
};
