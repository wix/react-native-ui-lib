export declare const animationConfig: {
    easing: import("react-native-reanimated").EasingFunction;
    duration: number;
};
type ItemsOrder = string[];
declare const usePresenter: () => {
    getTranslationByIndexChange: (newIndex: number, oldIndex: number, itemSize: number) => number;
    getIndexByPosition: (position: number, itemSize: number) => number;
    getItemIndexById: (itemsOrder: ItemsOrder, itemId: string) => number;
    getIdByItemIndex: (itemsOrder: ItemsOrder, orderIndex: number) => string;
};
export default usePresenter;
