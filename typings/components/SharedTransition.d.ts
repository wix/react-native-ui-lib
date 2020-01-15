import {Component, ReactElement} from 'react';

export interface SharedTransitionAreaProps {
    renderDetails?: (data: object) => ReactElement | ReactElement[];
}

export interface SharedTransitionSourceProps {
    data?: object;
}

export namespace SharedTransition {
  export class Area extends Component<SharedTransitionAreaProps> {}
  export class Source extends Component<SharedTransitionSourceProps> {}
  export class Target extends Component {}
}
