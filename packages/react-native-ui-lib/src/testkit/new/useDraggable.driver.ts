import {fireEvent} from '@testing-library/react-native';
import {ComponentDriverResult} from './Component.driver';

export type DragEvent = {
  absoluteX?: number;
  absoluteY?: number;
  translationX?: number;
  translationY?: number;
  velocityX?: number;
  velocityY?: number;
  x?: number;
  y?: number;
};

export interface DraggableDriverResult extends ComponentDriverResult {
  drag: (distanceOrEvent: DragEvent | DragEvent[] | number) => void;
}

export const useDraggableDriver = <
  DriverProps extends ComponentDriverResult = ComponentDriverResult // Allows for chaining multiple drivers
>(
    driver: DriverProps
  ): DraggableDriverResult & DriverProps => {
  const drag = (distanceOrEvent: DragEvent | DragEvent[] | number) => {
    let data: DragEvent | DragEvent[];
    if (typeof distanceOrEvent === 'number') {
      const distance = distanceOrEvent;
      data = [{translationY: distance}];
    } else {
      const event = distanceOrEvent;
      data = event;
    }

    fireEvent(driver.getElement(), 'onPan', data);
  };

  return {
    ...driver,
    drag
  };
};
