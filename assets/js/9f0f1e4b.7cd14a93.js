"use strict";(self.webpackChunkuilib_docs=self.webpackChunkuilib_docs||[]).push([[3236],{80530:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>s,contentTitle:()=>t,default:()=>b,frontMatter:()=>i,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"components/navigation/TabController/TabController","title":"TabController","description":"A performant solution for a tab controller with lazy load mechanism","source":"@site/versioned_docs/version-7.0.0/components/navigation/TabController/TabController.md","sourceDirName":"components/navigation/TabController","slug":"/components/navigation/TabController/","permalink":"/react-native-ui-lib/docs/components/navigation/TabController/","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/edit/main/website/versioned_docs/version-7.0.0/components/navigation/TabController/TabController.md","tags":[],"version":"7.0.0","sidebarPosition":1,"frontMatter":{"sidebar_position":1,"id":"TabController","title":"TabController","sidebar_label":"TabController"},"sidebar":"componentsSidebar","previous":{"title":"ProgressiveImage","permalink":"/react-native-ui-lib/docs/components/media/ProgressiveImage"},"next":{"title":"PageCarousel","permalink":"/react-native-ui-lib/docs/components/navigation/TabController/TabController.PageCarousel"}}');var l=o(74848),a=o(28453);const i={sidebar_position:1,id:"TabController",title:"TabController",sidebar_label:"TabController"},t=void 0,s={},d=[{value:"Usage",id:"usage",level:3},{value:"API",id:"api",level:2},{value:"asCarousel",id:"ascarousel",level:3},{value:"carouselPageWidth;",id:"carouselpagewidth",level:3},{value:"initialIndex",id:"initialindex",level:3},{value:"items",id:"items",level:3},{value:"nestedInScrollView",id:"nestedinscrollview",level:3},{value:"Does not work with asCarousel",id:"does-not-work-with-ascarousel",level:4},{value:"onChangeIndex",id:"onchangeindex",level:3}];function c(e){const n={a:"a",br:"br",code:"code",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(n.p,{children:["A performant solution for a tab controller with lazy load mechanism",(0,l.jsx)(n.br,{}),"\n",(0,l.jsx)(n.a,{href:"https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/TabControllerScreen/index.tsx",children:"(code example)"})]}),"\n",(0,l.jsx)("div",{style:{display:"flex",flexDirection:"row",overflowX:"auto",maxHeight:"500px",alignItems:"center"}}),"\n",(0,l.jsx)(n.h3,{id:"usage",children:"Usage"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",metastring:"live",live:!0,children:"<TabController items={[{label: 'First'}, {label: 'Second'}, {label: 'Third'}]}>\n  <TabController.TabBar enableShadows/>\n  <View flex>\n    <TabController.TabPage index={0}>{renderFirstPage()}</TabController.TabPage>\n    <TabController.TabPage index={1} lazy>{renderSecondPage()}</TabController.TabPage>\n    <TabController.TabPage index={2} lazy>{renderThirdPage()}</TabController.TabPage>\n  </View>\n</TabController>\n"})}),"\n",(0,l.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,l.jsx)(n.h3,{id:"ascarousel",children:"asCarousel"}),"\n",(0,l.jsxs)(n.p,{children:["When using TabController.PageCarousel this should be turned on\n",(0,l.jsx)(n.code,{children:"boolean "})]}),"\n",(0,l.jsx)(n.h3,{id:"carouselpagewidth",children:"carouselPageWidth;"}),"\n",(0,l.jsxs)(n.p,{children:["Pass for custom carousel page width\n",(0,l.jsx)(n.code,{children:"number "})]}),"\n",(0,l.jsx)(n.h3,{id:"initialindex",children:"initialIndex"}),"\n",(0,l.jsxs)(n.p,{children:["Initial selected index\n",(0,l.jsx)(n.code,{children:"number "})]}),"\n",(0,l.jsx)(n.h3,{id:"items",children:"items"}),"\n",(0,l.jsxs)(n.p,{children:["The list of tab bar items\n",(0,l.jsx)(n.code,{children:"TabControllerItemProps[] "})]}),"\n",(0,l.jsx)(n.h3,{id:"nestedinscrollview",children:"nestedInScrollView"}),"\n",(0,l.jsx)(n.h4,{id:"does-not-work-with-ascarousel",children:"Does not work with asCarousel"}),"\n",(0,l.jsxs)(n.p,{children:["Pass when TabController is render inside a ScrollView (with a header)\n",(0,l.jsx)(n.code,{children:"boolean "})]}),"\n",(0,l.jsx)(n.h3,{id:"onchangeindex",children:"onChangeIndex"}),"\n",(0,l.jsxs)(n.p,{children:["Callback for when index has change (will not be called on ignored items)\n",(0,l.jsx)(n.code,{children:"(index: number, prevIndex: number | null) => void "})]})]})}function b(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}},28453:(e,n,o)=>{o.d(n,{R:()=>i,x:()=>t});var r=o(96540);const l={},a=r.createContext(l);function i(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);