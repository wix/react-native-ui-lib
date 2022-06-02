import {ComponentDriver, TextDriver, IconDriver} from '../../testkit';
import {ComponentDriverArgs} from '../../testkit/Component.driver';

type BadgeDriverArgs = ComponentDriverArgs & {customComponentTestId?: string}

export class BadgeDriver extends ComponentDriver {
  private readonly labelDriver: TextDriver;
  private readonly iconDriver: IconDriver;
  private readonly customComponentDriver: ComponentDriver | undefined;

  constructor(badgeDriverArgs: BadgeDriverArgs) {
    super(badgeDriverArgs);
    const {customComponentTestId, ...componentDriverArgs} = badgeDriverArgs;
    this.labelDriver = new TextDriver({...componentDriverArgs, testID: `badge`});
    this.iconDriver = new IconDriver({...componentDriverArgs, testID: `${this.testID}.icon`});
    this.customComponentDriver = customComponentTestId ? 
      new ComponentDriver({...componentDriverArgs, testID: customComponentTestId})
      : undefined;
  }

  hasLabel = () => this.labelDriver.exists();
  hasIcon = () => this.iconDriver.exists();
  hasCustomComponent = () => this.customComponentDriver?.exists() || false;
}
