import {ComponentDriver, AvatarDriver, TextDriver, IconDriver, BadgeDriver} from '../../testkit';
import {ComponentDriverArgs} from '../../testkit/Component.driver';

export class ChipDriver extends ComponentDriver {
  private readonly labelDriver: TextDriver;
  private readonly avatarDriver: AvatarDriver;
  private readonly leftIconDriver: IconDriver;
  private readonly rightIconDriver: IconDriver;
  private readonly badgeDriver: BadgeDriver;
  private readonly dismissIconDriver: ComponentDriver;

  constructor(componentDriverArgs: ComponentDriverArgs) {
    super(componentDriverArgs);
    this.labelDriver = new TextDriver({...componentDriverArgs, testID: `${this.testID}.label`});
    this.avatarDriver = new AvatarDriver({...componentDriverArgs, testID: `${this.testID}.avatar`});
    this.leftIconDriver = new IconDriver({...componentDriverArgs, testID: `${this.testID}.icon.left`});
    this.rightIconDriver = new IconDriver({...componentDriverArgs, testID: `${this.testID}.icon.right`});
    this.badgeDriver = new BadgeDriver({...componentDriverArgs, testID: `${this.testID}.counter`});
    this.dismissIconDriver = new ComponentDriver({...componentDriverArgs, testID: `${this.testID}.dismiss`});
  }

  hasLabel = () => this.labelDriver.exists();
  hasAvatar= () => this.avatarDriver.exists();
  hasLeftIcon = () => this.leftIconDriver.exists();
  hasRightIcon = () => this.rightIconDriver.exists();
  hasBadge = () => this.badgeDriver.exists();
  hasDismissIcon = () => this.dismissIconDriver.exists();
  dismiss = async () => {
    if (await this.hasDismissIcon) {
      await this.dismissIconDriver.press();
    } else {
      console.warn('dismiss icon was not found');
    }
  }
}
