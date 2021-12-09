interface UseOrientationProps {
    onOrientationChange?: Function;
}
declare const useOrientation: ({ onOrientationChange }?: UseOrientationProps) => {
    orientation: import("../../helpers/Constants").orientations;
};
export default useOrientation;
