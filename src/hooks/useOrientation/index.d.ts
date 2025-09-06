interface UseOrientationProps {
    onOrientationChange?: Function;
}
declare const useOrientation: ({ onOrientationChange }?: UseOrientationProps) => {
    orientation: import("../../commons/Constants").orientations;
};
export default useOrientation;
