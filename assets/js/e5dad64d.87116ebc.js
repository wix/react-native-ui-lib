"use strict";(self.webpackChunkuilib_docs=self.webpackChunkuilib_docs||[]).push([[4410],{77320:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>d,default:()=>h,frontMatter:()=>l,metadata:()=>s,toc:()=>a});const s=JSON.parse('{"id":"components/overlays/ActionSheet","title":"ActionSheet","description":"Cross platform Action Sheet, with a support for native iOS solutions","source":"@site/versioned_docs/version-7.0.0/components/overlays/ActionSheet.md","sourceDirName":"components/overlays","slug":"/components/overlays/ActionSheet","permalink":"/react-native-ui-lib/docs/components/overlays/ActionSheet","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/edit/main/website/versioned_docs/version-7.0.0/components/overlays/ActionSheet.md","tags":[],"version":"7.0.0","frontMatter":{"id":"ActionSheet","title":"ActionSheet","sidebar_label":"ActionSheet"},"sidebar":"componentsSidebar","previous":{"title":"TopBar","permalink":"/react-native-ui-lib/docs/components/overlays/Modal/Modal.TopBar"},"next":{"title":"FeatureHighlight","permalink":"/react-native-ui-lib/docs/components/overlays/FeatureHighlight"}}');var i=t(74848),o=t(28453);const l={id:"ActionSheet",title:"ActionSheet",sidebar_label:"ActionSheet"},d=void 0,r={},a=[{value:"Usage",id:"usage",level:3},{value:"API",id:"api",level:2},{value:"cancelButtonIndex",id:"cancelbuttonindex",level:3},{value:"containerStyle",id:"containerstyle",level:3},{value:"destructiveButtonIndex",id:"destructivebuttonindex",level:3},{value:"dialogStyle",id:"dialogstyle",level:3},{value:"message",id:"message",level:3},{value:"onDismiss",id:"ondismiss",level:3},{value:"onModalDismissed",id:"onmodaldismissed",level:3},{value:"iOS only, modal only",id:"ios-only-modal-only",level:4},{value:"options",id:"options",level:3},{value:"optionsStyle",id:"optionsstyle",level:3},{value:"renderAction",id:"renderaction",level:3},{value:"You will need to call &#39;onOptionPress&#39; so the option&#39;s &#39;onPress&#39; will be called",id:"you-will-need-to-call-onoptionpress-so-the-options-onpress-will-be-called",level:4},{value:"renderTitle",id:"rendertitle",level:3},{value:"showCancelButton",id:"showcancelbutton",level:3},{value:"testID",id:"testid",level:3},{value:"title",id:"title",level:3},{value:"If both &#39;title&#39; and &#39;message&#39; are not passed will not render the title view at all",id:"if-both-title-and-message-are-not-passed-will-not-render-the-title-view-at-all",level:4},{value:"useNativeIOS",id:"usenativeios",level:3},{value:"useSafeArea",id:"usesafearea",level:3},{value:"visible",id:"visible",level:3}];function c(e){const n={a:"a",br:"br",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["Cross platform Action Sheet, with a support for native iOS solutions",(0,i.jsx)(n.br,{}),"\n",(0,i.jsx)(n.a,{href:"https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionSheetScreen.tsx",children:"(code example)"})]}),"\n",(0,i.jsx)("div",{style:{display:"flex",flexDirection:"row",overflowX:"auto",maxHeight:"500px",alignItems:"center"},children:(0,i.jsx)("img",{style:{maxHeight:"420px"},src:"https://media.giphy.com/media/l0HUpXOR6RqB2ct5S/giphy.gif"})}),"\n",(0,i.jsx)(n.h3,{id:"usage",children:"Usage"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-jsx",metastring:"live",live:!0,children:"<ActionSheet\n title={'Title'}\n message={'Message goes here'}\n cancelButtonIndex={3}\n destructiveButtonIndex={0}\n options={[\n  {label: '', onPress: },\n  {label: '', onPress: },\n  {label: 'Cancel', onPress: () => console.log('cancel')0}\n ]}\n/>\n"})}),"\n",(0,i.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,i.jsx)(n.h3,{id:"cancelbuttonindex",children:"cancelButtonIndex"}),"\n",(0,i.jsxs)(n.p,{children:["Index of the option represents the cancel action (to be displayed as the separated bottom bold button)\n",(0,i.jsx)(n.code,{children:"number "})]}),"\n",(0,i.jsx)(n.h3,{id:"containerstyle",children:"containerStyle"}),"\n",(0,i.jsxs)(n.p,{children:["Add or override style of the action sheet (wraps the title and actions)\n",(0,i.jsx)(n.code,{children:"ViewStyle "})]}),"\n",(0,i.jsx)(n.h3,{id:"destructivebuttonindex",children:"destructiveButtonIndex"}),"\n",(0,i.jsxs)(n.p,{children:["Index of the option represents the destructive action (will display red text. Usually used for delete or abort actions)\n",(0,i.jsx)(n.code,{children:"number "})]}),"\n",(0,i.jsx)(n.h3,{id:"dialogstyle",children:"dialogStyle"}),"\n",(0,i.jsxs)(n.p,{children:["Add or override style of the dialog wrapping the action sheet\n",(0,i.jsx)(n.code,{children:"ViewStyle "})]}),"\n",(0,i.jsx)(n.h3,{id:"message",children:"message"}),"\n",(0,i.jsxs)(n.p,{children:["Message of the action sheet\n",(0,i.jsx)(n.code,{children:"string "})]}),"\n",(0,i.jsx)(n.h3,{id:"ondismiss",children:"onDismiss"}),"\n",(0,i.jsxs)(n.p,{children:["Called when dismissing the action sheet (usually used for setting 'visible' prop to false)\n",(0,i.jsx)(n.code,{children:"DialogProps['onDismiss'] "})]}),"\n",(0,i.jsx)(n.h3,{id:"onmodaldismissed",children:"onModalDismissed"}),"\n",(0,i.jsx)(n.h4,{id:"ios-only-modal-only",children:"iOS only, modal only"}),"\n",(0,i.jsxs)(n.p,{children:["Called once the modal has been dismissed\n",(0,i.jsx)(n.code,{children:"DialogProps['onDialogDismissed'] "})]}),"\n",(0,i.jsx)(n.h3,{id:"options",children:"options"}),"\n",(0,i.jsxs)(n.p,{children:["List of options for the action sheet, follows the Button prop types (supply 'label' string and 'onPress' function)\n",(0,i.jsx)(n.code,{children:"Array<ButtonProps> "})]}),"\n",(0,i.jsx)(n.h3,{id:"optionsstyle",children:"optionsStyle"}),"\n",(0,i.jsxs)(n.p,{children:["Add or override style of the options list\n",(0,i.jsx)(n.code,{children:"ViewStyle "})]}),"\n",(0,i.jsx)(n.h3,{id:"renderaction",children:"renderAction"}),"\n",(0,i.jsx)(n.h4,{id:"you-will-need-to-call-onoptionpress-so-the-options-onpress-will-be-called",children:"You will need to call 'onOptionPress' so the option's 'onPress' will be called"}),"\n",(0,i.jsxs)(n.p,{children:["Render custom action\n",(0,i.jsx)(n.code,{children:"( option: ButtonProps,  index: number,  onOptionPress: ActionSheetOnOptionPress ) => JSX.Element"})]}),"\n",(0,i.jsx)(n.h3,{id:"rendertitle",children:"renderTitle"}),"\n",(0,i.jsxs)(n.p,{children:["Render custom title\n",(0,i.jsx)(n.code,{children:"() => JSX.Element "})]}),"\n",(0,i.jsx)(n.h3,{id:"showcancelbutton",children:"showCancelButton"}),"\n",(0,i.jsxs)(n.p,{children:["When passed (only with useNativeIOS), will display a cancel button at the bottom (overrides cancelButtonIndex)\n",(0,i.jsx)(n.code,{children:"boolean "})]}),"\n",(0,i.jsx)(n.h3,{id:"testid",children:"testID"}),"\n",(0,i.jsxs)(n.p,{children:["The test id for e2e tests\n",(0,i.jsx)(n.code,{children:"string "})]}),"\n",(0,i.jsx)(n.h3,{id:"title",children:"title"}),"\n",(0,i.jsx)(n.h4,{id:"if-both-title-and-message-are-not-passed-will-not-render-the-title-view-at-all",children:"If both 'title' and 'message' are not passed will not render the title view at all"}),"\n",(0,i.jsxs)(n.p,{children:["Title of the action sheet\n",(0,i.jsx)(n.code,{children:"string "})]}),"\n",(0,i.jsx)(n.h3,{id:"usenativeios",children:"useNativeIOS"}),"\n",(0,i.jsxs)(n.p,{children:["Should use the native action sheet for iOS\n",(0,i.jsx)(n.code,{children:"boolean "})]}),"\n",(0,i.jsx)(n.h3,{id:"usesafearea",children:"useSafeArea"}),"\n",(0,i.jsxs)(n.p,{children:["In iOS, use safe area, in case component attached to the bottom\n",(0,i.jsx)(n.code,{children:"boolean "})]}),"\n",(0,i.jsx)(n.h3,{id:"visible",children:"visible"}),"\n",(0,i.jsxs)(n.p,{children:["Whether to show the action sheet or not\n",(0,i.jsx)(n.code,{children:"boolean "})]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>d});var s=t(96540);const i={},o=s.createContext(i);function l(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);