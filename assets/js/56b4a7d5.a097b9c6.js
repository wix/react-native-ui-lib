"use strict";(self.webpackChunkuilib_docs=self.webpackChunkuilib_docs||[]).push([[8497],{45421:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>s,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"foundation/theme-manager","title":"ThemeManager","description":"Use ThemeManager to set default global behavior for your app.","source":"@site/versioned_docs/version-7.0.0/foundation/theme-manager.md","sourceDirName":"foundation","slug":"/foundation/theme-manager","permalink":"/react-native-ui-lib/docs/foundation/theme-manager","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/edit/main/website/versioned_docs/version-7.0.0/foundation/theme-manager.md","tags":[],"version":"7.0.0","sidebarPosition":5,"frontMatter":{"sidebar_position":5,"sidebar_label":"ThemeManager","title":"ThemeManager"},"sidebar":"guidesSidebar","previous":{"title":"Modifiers","permalink":"/react-native-ui-lib/docs/foundation/modifiers"},"next":{"title":"Testing","permalink":"/react-native-ui-lib/docs/foundation/testing"}}');var r=t(74848),a=t(28453);const s={sidebar_position:5,sidebar_label:"ThemeManager",title:"ThemeManager"},i=void 0,c={},d=[{value:"setComponentTheme",id:"setcomponenttheme",level:4},{value:"setComponentForcedTheme",id:"setcomponentforcedtheme",level:4}];function l(e){const n={code:"code",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:["Use ",(0,r.jsx)(n.code,{children:"ThemeManager"})," to set default global behavior for your app."]}),"\n",(0,r.jsx)(n.h4,{id:"setcomponenttheme",children:"setComponentTheme"}),"\n",(0,r.jsxs)(n.p,{children:["Set default props for a component by passing an object or a callback (for dynamic, runtime default props)\nThe default value will be overridden if a prop is being passed to the component instance (see ",(0,r.jsx)(n.code,{children:"setComponentForcedTheme"})," for that)."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"ThemeManager.setComponentTheme(componentName, defaultPropsObject);"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"ThemeManager.setComponentTheme(componentName, componentProps => newDefaultPropsObject);"})}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Example"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import {ThemeManager} from 'react-native-ui-lib';\n\nThemeManager.setComponentTheme('Text', {\n    text70: true, // will set the text70 typography modifier prop to be true by default\n    grey10: true, // will set the grey10 color modifier prop to be true by default \n});\n\n\nThemeManager.setComponentTheme('Button', (props, context) => {\n\n  return {\n    // this will apply a different backgroundColor\n    // depending on whether the Button has an outline or not\n    backgroundColor: props.outline ? 'black' : 'green',\n  };\n});\n"})}),"\n",(0,r.jsx)(n.h4,{id:"setcomponentforcedtheme",children:"setComponentForcedTheme"}),"\n",(0,r.jsxs)(n.p,{children:["Same as ",(0,r.jsx)(n.code,{children:"setComponentTheme"}),", but can't be overridden by props passed to the component."]}),"\n",(0,r.jsx)(n.p,{children:"Example"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"ThemeManager.setComponentForcedTheme('Card', (props, context) => {\n  return {\n    containerStyle: [styles.defaultContainerStyle, props.containerStyle]\n  };\n});\n"})})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>i});var o=t(96540);const r={},a=o.createContext(r);function s(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);