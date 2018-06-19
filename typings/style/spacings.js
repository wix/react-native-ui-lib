import _ from "lodash";
import { Constants } from "../helpers";
class Spacings {
    constructor() {
        this.s1 = Constants.isIOS ? 3 : 4;
        this.s2 = Constants.isIOS ? 6 : 8;
        this.s3 = Constants.isIOS ? 9 : 12;
        this.s4 = Constants.isIOS ? 12 : 16;
        this.s5 = Constants.isIOS ? 15 : 20;
        this.s6 = Constants.isIOS ? 18 : 24;
        this.s7 = Constants.isIOS ? 21 : 28;
        this.s8 = Constants.isIOS ? 24 : 32;
        this.s9 = Constants.isIOS ? 27 : 36;
        this.s10 = Constants.isIOS ? 30 : 40;
    }
    loadSpacings(spacings) {
        _.forEach(spacings, (value, key) => {
            this[key] = value;
        });
    }
    getKeysPattern() {
        return new RegExp(_.chain(this)
            .keys()
            .join("|")
            .value());
    }
}
export default new Spacings();
