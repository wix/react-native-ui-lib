(self.webpackChunkuilib_docs=self.webpackChunkuilib_docs||[]).push([[4612],{90986:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=[{id:"a",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:1},mediaUrl:"https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"},{id:"b",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:2},mediaUrl:"https://images.pexels.com/photos/3737604/pexels-photo-3737604.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"},{id:"c",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:1},mediaUrl:"https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"},{id:"d",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"Out of Stock",quantity:0},mediaUrl:"https://images.pexels.com/photos/4202467/pexels-photo-4202467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"},{id:"e",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:3},mediaUrl:"https://static.wixstatic.com/media/cda177_f9de629d8c97416f82b398725bd49918.jpg_128"},{id:"f",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"statu",status:"Out of Stock",quantity:0},mediaUrl:"https://static.wixstatic.com/media/cda177_1782572f1dfc49d397e830918d912568.jpg_128"},{id:"g",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:10},mediaUrl:"https://static.wixstatic.com/media/cda177_03906910d07749199b09e443ce9fed6c.jpg_128"},{id:"h",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:11},mediaUrl:"https://static.wixstatic.com/media/cda177_9d3e5b8fc70e4d2997806ece35e7de54.jpg_128"},{id:"i",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:10},mediaUrl:"https://static.wixstatic.com/media/cda177_db24e0568cdc4a82be0a8559fb123b55.jpg_128"},{id:"j",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:2},mediaUrl:"https://static.wixstatic.com/media/cda177_085a5f9575ba4b208f6091b26cbda4c4.jpg_128"},{id:"k",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:8},mediaUrl:"https://static.wixstatic.com/media/cda177_82d66fece3e54a7aa10d49bda4d98259.jpg_128"},{id:"l",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:8},mediaUrl:"https://static.wixstatic.com/media/84770f_c611ded729fd4461a1bb57134d4e9dd2.png_128"},{id:"m",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:3},mediaUrl:"https://images.pexels.com/photos/3612182/pexels-photo-3612182.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=150"},{id:"n",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:22},mediaUrl:"https://images.pexels.com/photos/4841529/pexels-photo-4841529.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=150"},{id:"o",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:10},mediaUrl:"https://images.pexels.com/photos/4173450/pexels-photo-4173450.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=150"},{id:"p",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:10},mediaUrl:"https://images.pexels.com/photos/10513273/pexels-photo-10513273.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=150"}]},17022:(e,t,i)=>{var a=i(95754).default,o=i(47635).default;Object.defineProperty(t,"__esModule",{value:!0}),t.IFRAME_MESSAGE_TYPE=void 0,t.default=function(e){var t=e.code,i=(0,s.useState)(t),a=(0,r.default)(i,2),o=a[0],n=a[1],g=(0,s.useState)(!1),x=(0,r.default)(g,2),b=x[0],v=x[1],A=(0,c.default)().siteConfig,y=(0,s.useRef)(null);(0,s.useEffect)((function(){b&&j(o)}),[b,o]);var j=function(e){var t,i={type:m,code:e};null==(t=y.current)||t.contentWindow.postMessage(i,"*")},S=(0,s.useMemo)((function(){return{overflowY:"scroll",scrollbarWidth:"none"}}),[]);return(0,h.jsx)(l.default,{children:function(){var e=""+window.location.origin+(null==A?void 0:A.baseUrl)+"livePreview";return(0,h.jsx)(u.View,{row:!0,"gap-s2":!0,style:f.liveCodeWrapper,children:(0,h.jsxs)(d.LiveProvider,{code:o,scope:p.default,children:[(0,h.jsx)(u.View,{flex:!0,style:f.editorWrapper,children:(0,h.jsx)(d.LiveEditor,{className:"font-mono",onChange:n,style:S})}),(0,h.jsx)(u.View,{"bg-$backgroundDefault":!0,"margin-s2":!0,style:f.iframeWrapper,children:(0,h.jsx)("iframe",{ref:y,style:f.iframe,src:e,title:"Simulator",onLoad:function(){return v(!0)}})})]})})}})};var r=o(i(27883)),s=a(i(96540)),n=o(i(47998)),d=i(86850),c=o(i(22777)),l=o(i(7351)),u=i(22199),p=o(i(28265)),h=i(74848),m=t.IFRAME_MESSAGE_TYPE="LIVE_PREVIEW_CODE_UPDATE_MESSAGE";var f=n.default.create({liveCodeWrapper:{borderRadius:20,borderWidth:1,backgroundColor:"#011627",height:725,width:900},editorWrapper:{maxHeight:700,padding:10,borderRadius:20,overflow:"hidden"},iframeWrapper:{alignSelf:"center",overflow:"hidden",borderRadius:40,borderWidth:4,borderColor:u.Colors.$outlineDisabledHeavy,width:320,height:700},iframe:{width:335,height:"100%",position:"absolute",top:0,left:0,border:0,padding:10,background:"transparent"}})},71014:(e,t,i)=>{var a=i(47635).default;Object.defineProperty(t,"__esModule",{value:!0}),t.ToggleControl=function(e){var t=e.state,i=e.setState,a=e.title,n=e.spread,d=void 0!==n&&n,c=e.key,l=void 0===c?"does not change":c;return(0,s.jsxs)(o.View,{row:!0,centerV:!0,spread:d,"marginB-s4":!0,children:[(0,s.jsx)(o.Text,{$textDefault:!0,flex:d,"marginR-s4":!d,children:a}),(0,s.jsx)(r.default,{testID:l,value:t,onValueChange:i},l)]},l)};a(i(96540));var o=i(22199),r=a(i(86280)),s=i(74848)},74564:(e,t,i)=>{i(22199).ThemeManager.setComponentForcedTheme("Icon",(function(e){var t=e.source;return null!=t&&t.source?t:void 0}))},28265:(e,t,i)=>{var a=i(95754).default,o=i(47635).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(i(96540)),s=o(i(90986)),n=i(25979),d=i(22199),c=o(i(49833)),l=o(i(7605)),u=o(i(69829)),p=o(i(61374)),h=o(i(47685)),m=o(i(95125)),f=o(i(11682)),g=o(i(44483)),x=o(i(8741)),b=o(i(72997)),v=o(i(43841)),A=o(i(54341)),y=o(i(47841)),j=o(i(13770)),S=o(i(4153)),w=o(i(52888)),I=o(i(56988)),k=o(i(86280)),P=o(i(33975)),C=a(i(71014));i(74564),l.default.loadAssetsGroup("icons.demo",{chevronRight:{source:i(74906).A,style:{width:24,height:24}},drag:{source:i(90825).A,style:{width:10,height:16}}});var W={products:s.default},z=Object.assign({React:r.default},r.default,{Data:W,Playground:C,ActionBar:c.default,Assets:l.default,Badge:u.default,BorderRadiuses:d.BorderRadiuses,Button:d.Button,Card:p.default,Carousel:h.default,Checkbox:m.default,Chip:f.default,Constants:g.default,Colors:n.Colors,Drawer:x.default,Icon:b.default,Image:d.Image,Incubator:v.default,MaskedInput:A.default,RadioButton:y.default,RadioGroup:j.default,SegmentedControl:S.default,SortableGridList:w.default,SortableList:I.default,Spacings:d.Spacings,Switch:k.default,Text:d.Text,TextField:P.default,TouchableOpacity:d.TouchableOpacity,View:d.View});t.default=z},98175:(e,t,i)=>{"use strict";i.r(t),i.d(t,{assets:()=>c,contentTitle:()=>d,default:()=>p,frontMatter:()=>n,metadata:()=>a,toc:()=>l});const a=JSON.parse('{"id":"components/navigation/Wizard/Wizard.Step","title":"Wizard.Step","description":"A wizard presents a series of steps in  prescribed order. That the user needs to complete in order to accomplish a goal (e.g. purchase a product)","source":"@site/../docs/components/navigation/Wizard/Wizard.Step.md","sourceDirName":"components/navigation/Wizard","slug":"/components/navigation/Wizard/Wizard.Step","permalink":"/react-native-ui-lib/docs/next/components/navigation/Wizard/Wizard.Step","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/edit/main/website/../docs/components/navigation/Wizard/Wizard.Step.md","tags":[],"version":"current","frontMatter":{"id":"Wizard.Step","title":"Wizard.Step","sidebar_label":"Step"},"sidebar":"componentsSidebar","previous":{"title":"Wizard","permalink":"/react-native-ui-lib/docs/next/components/navigation/Wizard/"},"next":{"title":"PageControl","permalink":"/react-native-ui-lib/docs/next/components/navigation/PageControl"}}');var o=i(74848),r=i(28453),s=i(17022);const n={id:"Wizard.Step",title:"Wizard.Step",sidebar_label:"Step"},d=void 0,c={},l=[{value:"Usage",id:"usage",level:3},{value:"API",id:"api",level:2},{value:"accessibilityInfo",id:"accessibilityinfo",level:3},{value:"circleBackgroundColor",id:"circlebackgroundcolor",level:3},{value:"circleColor",id:"circlecolor",level:3},{value:"circleSize",id:"circlesize",level:3},{value:"color",id:"color",level:3},{value:"connectorStyle",id:"connectorstyle",level:3},{value:"enabled",id:"enabled",level:3},{value:"icon",id:"icon",level:3},{value:"indexLabelStyle",id:"indexlabelstyle",level:3},{value:"label",id:"label",level:3},{value:"labelStyle",id:"labelstyle",level:3},{value:"state",id:"state",level:3}];function u(e){const t={a:"a",admonition:"admonition",br:"br",code:"code",h2:"h2",h3:"h3",p:"p",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(t.p,{children:["A wizard presents a series of steps in  prescribed order. That the user needs to complete in order to accomplish a goal (e.g. purchase a product)",(0,o.jsx)(t.br,{}),"\n",(0,o.jsx)(t.a,{href:"https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WizardScreen.tsx",children:"(code example)"})]}),"\n",(0,o.jsx)(t.admonition,{type:"note",children:(0,o.jsx)(t.p,{children:"Use Wizard with nested Wizard.Step(s) to achieve the desired result."})}),"\n",(0,o.jsxs)("div",{style:{display:"flex",flexDirection:"row",overflowX:"auto",maxHeight:"500px",alignItems:"center"},children:[(0,o.jsx)("img",{style:{maxHeight:"420px"},src:"https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/Wizard.gif?raw=true"}),(0,o.jsx)("img",{style:{maxHeight:"420px"},src:"https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/WizardPresets.png?raw=true"})]}),"\n",(0,o.jsx)(t.h3,{id:"usage",children:"Usage"}),"\n",(0,o.jsx)(s.default,{code:"<Wizard.Step state={Wizard.States.ENABLED} label={'Label'}/>"}),"\n",(0,o.jsx)(t.h2,{id:"api",children:"API"}),"\n",(0,o.jsx)(t.h3,{id:"accessibilityinfo",children:"accessibilityInfo"}),"\n",(0,o.jsxs)(t.p,{children:["Extra text to be read in accessibility mode\n",(0,o.jsx)(t.code,{children:"string "})]}),"\n",(0,o.jsx)(t.h3,{id:"circlebackgroundcolor",children:"circleBackgroundColor"}),"\n",(0,o.jsxs)(t.p,{children:["Circle's background color\n",(0,o.jsx)(t.code,{children:"string "})]}),"\n",(0,o.jsx)(t.h3,{id:"circlecolor",children:"circleColor"}),"\n",(0,o.jsxs)(t.p,{children:["Color of the circle\n",(0,o.jsx)(t.code,{children:"string "})]}),"\n",(0,o.jsx)(t.h3,{id:"circlesize",children:"circleSize"}),"\n",(0,o.jsxs)(t.p,{children:["The step's circle size (diameter)\n",(0,o.jsx)(t.code,{children:"number "})]}),"\n",(0,o.jsx)(t.h3,{id:"color",children:"color"}),"\n",(0,o.jsxs)(t.p,{children:["Color of the step index (or of the icon, when provided)\n",(0,o.jsx)(t.code,{children:"string "})]}),"\n",(0,o.jsx)(t.h3,{id:"connectorstyle",children:"connectorStyle"}),"\n",(0,o.jsxs)(t.p,{children:["Additional styles for the connector\n",(0,o.jsx)(t.code,{children:"ViewStyle "})]}),"\n",(0,o.jsx)(t.h3,{id:"enabled",children:"enabled"}),"\n",(0,o.jsxs)(t.p,{children:["Whether the step should be enabled\n",(0,o.jsx)(t.code,{children:"boolean "})]}),"\n",(0,o.jsx)(t.h3,{id:"icon",children:"icon"}),"\n",(0,o.jsxs)(t.p,{children:["Icon to replace the (default) index\n",(0,o.jsx)(t.code,{children:"ImageProps "})]}),"\n",(0,o.jsx)(t.h3,{id:"indexlabelstyle",children:"indexLabelStyle"}),"\n",(0,o.jsxs)(t.p,{children:["Additional styles for the index's label (when icon is not provided)\n",(0,o.jsx)(t.code,{children:"TextStyle "})]}),"\n",(0,o.jsx)(t.h3,{id:"label",children:"label"}),"\n",(0,o.jsxs)(t.p,{children:["The label of the item\n",(0,o.jsx)(t.code,{children:"string "})]}),"\n",(0,o.jsx)(t.h3,{id:"labelstyle",children:"labelStyle"}),"\n",(0,o.jsxs)(t.p,{children:["Additional styles for the label\n",(0,o.jsx)(t.code,{children:"TextStyle "})]}),"\n",(0,o.jsx)(t.h3,{id:"state",children:"state"}),"\n",(0,o.jsxs)(t.p,{children:["The state of the step (Wizard.States.X)\n",(0,o.jsx)(t.code,{children:"WizardStepStates "})]})]})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},74906:(e,t,i)=>{"use strict";i.d(t,{A:()=>a});const a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD9SURBVHgB7ZQ7DoJAFEUffnpKCzWzhLEzGhPdgXa2di5Dl+AK3IKtFZJY0MkOHD8FJdZ+8BL80EjeS6yUmxDeTC73MPBmiHL9vCyOSenOluiGqtww/iokgQp8q6WILo7SXZsEYgLOPQAMCg3InARiAYzvmRSkr3SbDSlyjWFwDO1K1QVkiKtpV+qY27tfAySQQwDIEoAxhl0ORARIQXaA9BNI7YQ575Nf0EVplaJ3bWV2FWsfpKV0C51U2DyGU+OvJ1l+0QqUbio84nDDRYAkvByHx59kxgmPxTwqnuER7rRA+ICYYq7gFe7jB49IoBLfGhmi6wBvLzrscv2B7itSTy7LV3HIAAAAAElFTkSuQmCC"},90825:(e,t,i)=>{"use strict";i.d(t,{A:()=>a});const a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAABGdBTUEAALGPC/xhBQAAAFhJREFUKBVjvHrzpufffwyzGICAmYkhTVtdfTuIjS7OAlb0/78MSPLvP0aQBlkIG6gZSZwJJEgMYAJZx8DI+ASEwWyoLlzixBhKnBpGdN+N+ho5DQxgXAMAg0hiTS684QAAAAAASUVORK5CYII="},49746:()=>{},19977:()=>{},197:()=>{},21866:()=>{},52739:()=>{},77982:()=>{},2845:()=>{},44809:()=>{},35326:()=>{},84807:()=>{},28453:(e,t,i)=>{"use strict";i.d(t,{R:()=>s,x:()=>n});var a=i(96540);const o={},r=a.createContext(o);function s(e){const t=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function n(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),a.createElement(r.Provider,{value:t},e.children)}}}]);