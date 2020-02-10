export namespace LogService {
  export function warn(message: string): void;
  export function deprecationWarn(args: { component: string, oldProp: string, newProp: string }): void;
}
