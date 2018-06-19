import _ from "lodash";
import { Constants } from "../helpers";
class BorderRadiuses {
    constructor() {
        this.br0 = Constants.isIOS ? 0 : 0;
        this.br10 = Constants.isIOS ? 3 : 2;
        this.br20 = 6;
        this.br30 = Constants.isIOS ? 9 : 8;
        this.br40 = 12;
        this.br50 = Constants.isIOS ? 15 : 16;
        this.br60 = 20;
        this.br100 = 999;
    }
    getKeysPattern() {
        return new RegExp(_.chain(this)
            .keys()
            .map(key => [`${key}`])
            .flatten()
            .join("|")
            .value());
    }
}
export default new BorderRadiuses();
