import {ComponentDriver, TextDriver} from '../../testkit';
import {ComponentDriverArgs} from '../../testkit/Component.driver';

class ActionSheetActionDriver extends ComponentDriver {
    private readonly labelDriver: TextDriver;
    constructor(componentDriverArgs: ComponentDriverArgs) {
      super(componentDriverArgs);
      this.labelDriver = new TextDriver({...componentDriverArgs, testID: `${this.testID}.label`});
    }
    getLabel = () => this.labelDriver.getTextContent();
}

type ActionSheetDriverArgs = ComponentDriverArgs & {optionsTestIds?: string[]}

export class ActionSheetDriver extends ComponentDriver {
  private readonly titleDriver: TextDriver;
  private readonly actionDrivers: ActionSheetActionDriver[];

  constructor(actionSheetDriverArgs: ActionSheetDriverArgs) {
    super(actionSheetDriverArgs);
    const {optionsTestIds = [], ...componentDriverArgs} = actionSheetDriverArgs;
    this.titleDriver = new TextDriver({...componentDriverArgs, testID: `${this.testID}.title`});
    this.actionDrivers = optionsTestIds.map((testID) => new ActionSheetActionDriver({...componentDriverArgs, testID}));
  }

  getActionDrivers = () => [...this.actionDrivers];

  getTitle = () => this.titleDriver.getTextContent();
}
