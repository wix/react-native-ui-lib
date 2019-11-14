import {ComponentType} from 'react';

export namespace DocsGenerator {
  export interface ComponentInfo {
    componentName: string;
    defaultProps: { [key: string]: any };
    props: { [key: string]: any };
  }

  export function extractComponentInfo(instance: ComponentType): ComponentInfo;
  export function generateSnippet(componentInfo: ComponentInfo): string;
}
