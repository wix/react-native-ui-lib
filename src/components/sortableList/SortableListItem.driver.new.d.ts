import { ComponentProps } from '../../testkit/new/Component.driver';
export declare const SortableListItemDriver: (props: ComponentProps) => {
    dragUp: (indices: number) => Promise<void>;
    dragDown: (indices: number) => Promise<void>;
    dragLeft: (indices: number) => Promise<void>;
    dragRight: (indices: number) => Promise<void>;
    drag: (distanceOrEvent: number | import("../../testkit/new/useDraggable.driver").DragEvent | import("../../testkit/new/useDraggable.driver").DragEvent[]) => void;
    getElement: () => import("react-test-renderer").ReactTestInstance;
    queryElement: () => import("react-test-renderer").ReactTestInstance | undefined;
    exists: () => boolean;
};
