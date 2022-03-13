declare const useIndicesManager: () => {
    requestIndexChange: (draggedInitialIndex: number, movingDown: boolean) => boolean;
};
export default useIndicesManager;
