import {Component} from 'react';

export interface SharedTransitionAreaProps {
    renderDetails?: (...args: any[]) => any;
}

declare class SharedTransitionArea extends Component<SharedTransitionAreaProps> {}

export interface SharedTransitionSourceProps {
    data?: object;
}

declare class SharedTransitionSource extends Component<SharedTransitionSourceProps> {}

declare class SharedTransitionTarget extends Component {}

export const SharedTransition: {
  Area: typeof SharedTransitionArea;
  Source: typeof SharedTransitionSource;
  Target: typeof SharedTransitionTarget;
}
