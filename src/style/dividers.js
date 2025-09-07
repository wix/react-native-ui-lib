import Colors from "./colors";
const Dividers = {
  get d10() {
    return {
      borderBottomWidth: 1,
      borderColor: Colors.$outlineDefault
    };
  },
  get d20() {
    return {
      borderBottomWidth: 8,
      borderColor: Colors.$outlineDefault
    };
  }
};
export default Dividers;