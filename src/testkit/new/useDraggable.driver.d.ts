import { ComponentDriverResult } from './Component.driver';
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
export declare const useDraggableDriver: <DriverProps extends ComponentDriverResult = ComponentDriverResult>(driver: DriverProps) => DraggableDriverResult & DriverProps;
