"use strict";(self.webpackChunkuilib_docs=self.webpackChunkuilib_docs||[]).push([[5606],{25428:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>d});const o=JSON.parse('{"id":"components/overlays/FloatingButton","title":"FloatingButton","description":"Hovering button with gradient background","source":"@site/versioned_docs/version-7.0.0/components/overlays/FloatingButton.md","sourceDirName":"components/overlays","slug":"/components/overlays/FloatingButton","permalink":"/react-native-ui-lib/docs/components/overlays/FloatingButton","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/edit/main/website/versioned_docs/version-7.0.0/components/overlays/FloatingButton.md","tags":[],"version":"7.0.0","frontMatter":{"id":"FloatingButton","title":"FloatingButton","sidebar_label":"FloatingButton"},"sidebar":"componentsSidebar","previous":{"title":"FeatureHighlight","permalink":"/react-native-ui-lib/docs/components/overlays/FeatureHighlight"},"next":{"title":"Hint","permalink":"/react-native-ui-lib/docs/components/overlays/Hint"}}');var i=n(74848),s=n(28453);const r={id:"FloatingButton",title:"FloatingButton",sidebar_label:"FloatingButton"},l=void 0,a={},d=[{value:"Usage",id:"usage",level:3},{value:"API",id:"api",level:2},{value:"bottomMargin",id:"bottommargin",level:3},{value:"button",id:"button",level:3},{value:"buttonLayout",id:"buttonlayout",level:3},{value:"duration",id:"duration",level:3},{value:"fullWidth",id:"fullwidth",level:3},{value:"Relevant to vertical layout only",id:"relevant-to-vertical-layout-only",level:4},{value:"hideBackgroundOverlay",id:"hidebackgroundoverlay",level:3},{value:"secondaryButton",id:"secondarybutton",level:3},{value:"testID",id:"testid",level:3},{value:"Use <code>testID.button</code> for the main button or <code>testID.secondaryButton</code> for the secondary",id:"use-testidbutton-for-the-main-button-or-testidsecondarybutton-for-the-secondary",level:4},{value:"visible",id:"visible",level:3},{value:"withoutAnimation",id:"withoutanimation",level:3}];function c(t){const e={a:"a",admonition:"admonition",br:"br",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...t.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(e.p,{children:["Hovering button with gradient background",(0,i.jsx)(e.br,{}),"\n",(0,i.jsx)(e.a,{href:"https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FloatingButtonScreen.tsx",children:"(code example)"})]}),"\n",(0,i.jsx)(e.admonition,{type:"tip",children:(0,i.jsxs)(e.p,{children:["This component support ",(0,i.jsx)(e.strong,{children:"margin, background, color"})," modifiers."]})}),"\n",(0,i.jsx)("div",{style:{display:"flex",flexDirection:"row",overflowX:"auto",maxHeight:"500px",alignItems:"center"},children:(0,i.jsx)("img",{style:{maxHeight:"420px"},src:"https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/FloatingButton/FloatingButton.gif?raw=true"})}),"\n",(0,i.jsx)(e.h3,{id:"usage",children:"Usage"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-jsx",metastring:"live",live:!0,children:"<FloatingButton visible={isVisible} button={{label: 'Approve', onPress: () => console.log('approved')}}}/>\n"})}),"\n",(0,i.jsx)(e.h2,{id:"api",children:"API"}),"\n",(0,i.jsx)(e.h3,{id:"bottommargin",children:"bottomMargin"}),"\n",(0,i.jsxs)(e.p,{children:["The bottom margin of the button, or secondary button if passed\n",(0,i.jsx)(e.code,{children:"number "})]}),"\n",(0,i.jsx)(e.h3,{id:"button",children:"button"}),"\n",(0,i.jsxs)(e.p,{children:["Props for the Button component\n",(0,i.jsx)(e.code,{children:"ButtonProps "})]}),"\n",(0,i.jsx)(e.h3,{id:"buttonlayout",children:"buttonLayout"}),"\n",(0,i.jsxs)(e.p,{children:["Button layout direction: vertical or horizontal\n",(0,i.jsx)(e.code,{children:"FloatingButtonLayouts "})]}),"\n",(0,i.jsx)(e.h3,{id:"duration",children:"duration"}),"\n",(0,i.jsxs)(e.p,{children:["The duration of the button's animations (show/hide)\n",(0,i.jsx)(e.code,{children:"number "})]}),"\n",(0,i.jsx)(e.h3,{id:"fullwidth",children:"fullWidth"}),"\n",(0,i.jsx)(e.h4,{id:"relevant-to-vertical-layout-only",children:"Relevant to vertical layout only"}),"\n",(0,i.jsxs)(e.p,{children:["Whether the buttons get the container's full with\n",(0,i.jsx)(e.code,{children:"boolean "})]}),"\n",(0,i.jsx)(e.h3,{id:"hidebackgroundoverlay",children:"hideBackgroundOverlay"}),"\n",(0,i.jsxs)(e.p,{children:["Whether to show background overlay\n",(0,i.jsx)(e.code,{children:"boolean "})]}),"\n",(0,i.jsx)(e.h3,{id:"secondarybutton",children:"secondaryButton"}),"\n",(0,i.jsxs)(e.p,{children:["Props for the secondary Button component\n",(0,i.jsx)(e.code,{children:"ButtonProps "})]}),"\n",(0,i.jsx)(e.h3,{id:"testid",children:"testID"}),"\n",(0,i.jsxs)(e.h4,{id:"use-testidbutton-for-the-main-button-or-testidsecondarybutton-for-the-secondary",children:["Use ",(0,i.jsx)(e.code,{children:"testID.button"})," for the main button or ",(0,i.jsx)(e.code,{children:"testID.secondaryButton"})," for the secondary"]}),"\n",(0,i.jsxs)(e.p,{children:["The test id for e2e tests\n",(0,i.jsx)(e.code,{children:"string "})]}),"\n",(0,i.jsx)(e.h3,{id:"visible",children:"visible"}),"\n",(0,i.jsxs)(e.p,{children:["Whether the component is visible\n",(0,i.jsx)(e.code,{children:"boolean "})]}),"\n",(0,i.jsx)(e.h3,{id:"withoutanimation",children:"withoutAnimation"}),"\n",(0,i.jsxs)(e.p,{children:["Whether to show/hide the button without animation\n",(0,i.jsx)(e.code,{children:"boolean "})]})]})}function u(t={}){const{wrapper:e}={...(0,s.R)(),...t.components};return e?(0,i.jsx)(e,{...t,children:(0,i.jsx)(c,{...t})}):c(t)}},28453:(t,e,n)=>{n.d(e,{R:()=>r,x:()=>l});var o=n(96540);const i={},s=o.createContext(i);function r(t){const e=o.useContext(s);return o.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function l(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:r(t.components),o.createElement(s.Provider,{value:e},t.children)}}}]);