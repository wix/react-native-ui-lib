(self.webpackChunkuilib_docs=self.webpackChunkuilib_docs||[]).push([[7751],{90986:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=[{id:"a",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:1},mediaUrl:"https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"},{id:"b",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:2},mediaUrl:"https://images.pexels.com/photos/3737604/pexels-photo-3737604.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"},{id:"c",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:1},mediaUrl:"https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"},{id:"d",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"Out of Stock",quantity:0},mediaUrl:"https://images.pexels.com/photos/4202467/pexels-photo-4202467.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"},{id:"e",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:3},mediaUrl:"https://static.wixstatic.com/media/cda177_f9de629d8c97416f82b398725bd49918.jpg_128"},{id:"f",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"statu",status:"Out of Stock",quantity:0},mediaUrl:"https://static.wixstatic.com/media/cda177_1782572f1dfc49d397e830918d912568.jpg_128"},{id:"g",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:10},mediaUrl:"https://static.wixstatic.com/media/cda177_03906910d07749199b09e443ce9fed6c.jpg_128"},{id:"h",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:11},mediaUrl:"https://static.wixstatic.com/media/cda177_9d3e5b8fc70e4d2997806ece35e7de54.jpg_128"},{id:"i",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:10},mediaUrl:"https://static.wixstatic.com/media/cda177_db24e0568cdc4a82be0a8559fb123b55.jpg_128"},{id:"j",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:2},mediaUrl:"https://static.wixstatic.com/media/cda177_085a5f9575ba4b208f6091b26cbda4c4.jpg_128"},{id:"k",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:8},mediaUrl:"https://static.wixstatic.com/media/cda177_82d66fece3e54a7aa10d49bda4d98259.jpg_128"},{id:"l",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:8},mediaUrl:"https://static.wixstatic.com/media/84770f_c611ded729fd4461a1bb57134d4e9dd2.png_128"},{id:"m",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:3},mediaUrl:"https://images.pexels.com/photos/3612182/pexels-photo-3612182.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=150"},{id:"n",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:22},mediaUrl:"https://images.pexels.com/photos/4841529/pexels-photo-4841529.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=150"},{id:"o",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:10},mediaUrl:"https://images.pexels.com/photos/4173450/pexels-photo-4173450.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=150"},{id:"p",name:"I'm a Product",formattedPrice:"$19.99",inventory:{trackingMethod:"status",status:"In Stock",quantity:10},mediaUrl:"https://images.pexels.com/photos/10513273/pexels-photo-10513273.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=150"}]},17022:(e,t,a)=>{var i=a(95754).default,s=a(47635).default;Object.defineProperty(t,"__esModule",{value:!0}),t.IFRAME_MESSAGE_TYPE=void 0,t.default=function(e){var t=e.code,a=(0,o.useState)(t),i=(0,n.default)(a,2),s=i[0],r=i[1],g=(0,o.useState)(!1),v=(0,n.default)(g,2),x=v[0],A=v[1],b=(0,c.default)().siteConfig,y=(0,o.useRef)(null);(0,o.useEffect)((function(){x&&j(s)}),[x,s]);var j=function(e){var t,a={type:h,code:e};null==(t=y.current)||t.contentWindow.postMessage(a,"*")},S=(0,o.useMemo)((function(){return{overflowY:"scroll",scrollbarWidth:"none"}}),[]);return(0,m.jsx)(l.default,{children:function(){var e=""+window.location.origin+(null==b?void 0:b.baseUrl)+"livePreview";return(0,m.jsx)(u.View,{row:!0,"gap-s2":!0,style:f.liveCodeWrapper,children:(0,m.jsxs)(d.LiveProvider,{code:s,scope:p.default,children:[(0,m.jsx)(u.View,{flex:!0,style:f.editorWrapper,children:(0,m.jsx)(d.LiveEditor,{className:"font-mono",onChange:r,style:S})}),(0,m.jsx)(u.View,{"bg-$backgroundDefault":!0,"margin-s2":!0,style:f.iframeWrapper,children:(0,m.jsx)("iframe",{ref:y,style:f.iframe,src:e,title:"Simulator",onLoad:function(){return A(!0)}})})]})})}})};var n=s(a(27883)),o=i(a(96540)),r=s(a(47998)),d=a(86850),c=s(a(22777)),l=s(a(7351)),u=a(22199),p=s(a(28265)),m=a(74848),h=t.IFRAME_MESSAGE_TYPE="LIVE_PREVIEW_CODE_UPDATE_MESSAGE";var f=r.default.create({liveCodeWrapper:{borderRadius:20,borderWidth:1,backgroundColor:"#011627",height:725,width:900},editorWrapper:{maxHeight:700,padding:10,borderRadius:20,overflow:"hidden"},iframeWrapper:{alignSelf:"center",overflow:"hidden",borderRadius:40,borderWidth:4,borderColor:u.Colors.$outlineDisabledHeavy,width:320,height:700},iframe:{width:335,height:"100%",position:"absolute",top:0,left:0,border:0,padding:10,background:"transparent"}})},71014:(e,t,a)=>{var i=a(47635).default;Object.defineProperty(t,"__esModule",{value:!0}),t.ToggleControl=function(e){var t=e.state,a=e.setState,i=e.title,r=e.spread,d=void 0!==r&&r,c=e.key,l=void 0===c?"does not change":c;return(0,o.jsxs)(s.View,{row:!0,centerV:!0,spread:d,"marginB-s4":!0,children:[(0,o.jsx)(s.Text,{$textDefault:!0,flex:d,"marginR-s4":!d,children:i}),(0,o.jsx)(n.default,{testID:l,value:t,onValueChange:a},l)]},l)};i(a(96540));var s=a(22199),n=i(a(86280)),o=a(74848)},74564:(e,t,a)=>{a(22199).ThemeManager.setComponentForcedTheme("Icon",(function(e){var t=e.source;return null!=t&&t.source?t:void 0}))},28265:(e,t,a)=>{var i=a(95754).default,s=a(47635).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(a(96540)),o=s(a(90986)),r=a(25979),d=a(22199),c=s(a(49833)),l=s(a(7605)),u=s(a(69829)),p=s(a(61374)),m=s(a(47685)),h=s(a(95125)),f=s(a(11682)),g=s(a(44483)),v=s(a(8741)),x=s(a(72997)),A=s(a(43841)),b=s(a(54341)),y=s(a(47841)),j=s(a(13770)),S=s(a(4153)),I=s(a(52888)),w=s(a(56988)),k=s(a(86280)),P=s(a(33975)),C=i(a(71014));a(74564),l.default.loadAssetsGroup("icons.demo",{chevronRight:{source:a(74906).A,style:{width:24,height:24}},drag:{source:a(90825).A,style:{width:10,height:16}}});var M={products:o.default},U=Object.assign({React:n.default},n.default,{Data:M,Playground:C,ActionBar:c.default,Assets:l.default,Badge:u.default,BorderRadiuses:d.BorderRadiuses,Button:d.Button,Card:p.default,Carousel:m.default,Checkbox:h.default,Chip:f.default,Constants:g.default,Colors:r.Colors,Drawer:v.default,Icon:x.default,Image:d.Image,Incubator:A.default,MaskedInput:b.default,RadioButton:y.default,RadioGroup:j.default,SegmentedControl:S.default,SortableGridList:I.default,SortableList:w.default,Spacings:d.Spacings,Switch:k.default,Text:d.Text,TextField:P.default,TouchableOpacity:d.TouchableOpacity,View:d.View});t.default=U},91221:(e,t,a)=>{"use strict";a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>d,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"components/form/Stepper","title":"Stepper","description":"A stepper component","source":"@site/../docs/components/form/Stepper.md","sourceDirName":"components/form","slug":"/components/form/Stepper","permalink":"/react-native-ui-lib/docs/next/components/form/Stepper","draft":false,"unlisted":false,"editUrl":"https://github.com/facebook/docusaurus/edit/main/website/../docs/components/form/Stepper.md","tags":[],"version":"current","frontMatter":{"id":"Stepper","title":"Stepper","sidebar_label":"Stepper"},"sidebar":"componentsSidebar","previous":{"title":"SegmentedControl","permalink":"/react-native-ui-lib/docs/next/components/form/SegmentedControl"},"next":{"title":"TextField","permalink":"/react-native-ui-lib/docs/next/components/form/TextField"}}');var s=a(74848),n=a(28453),o=a(17022);const r={id:"Stepper",title:"Stepper",sidebar_label:"Stepper"},d=void 0,c={},l=[{value:"Usage",id:"usage",level:3},{value:"API",id:"api",level:2},{value:"accessibilityLabel",id:"accessibilitylabel",level:3},{value:"disabled",id:"disabled",level:3},{value:"maxValue",id:"maxvalue",level:3},{value:"minValue",id:"minvalue",level:3},{value:"onValueChange",id:"onvaluechange",level:3},{value:"small",id:"small",level:3},{value:"step",id:"step",level:3},{value:"testID",id:"testid",level:3},{value:"type",id:"type",level:3},{value:"value",id:"value",level:3}];function u(e){const t={a:"a",br:"br",code:"code",h2:"h2",h3:"h3",p:"p",...(0,n.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["A stepper component",(0,s.jsx)(t.br,{}),"\n",(0,s.jsx)(t.a,{href:"https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StepperScreen.tsx",children:"(code example)"})]}),"\n",(0,s.jsx)("div",{style:{display:"flex",flexDirection:"row",overflowX:"auto",maxHeight:"500px",alignItems:"center"}}),"\n",(0,s.jsx)(t.h3,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(o.default,{code:"<Stepper/>"}),"\n",(0,s.jsx)(t.h2,{id:"api",children:"API"}),"\n",(0,s.jsx)(t.h3,{id:"accessibilitylabel",children:"accessibilityLabel"}),"\n",(0,s.jsxs)(t.p,{children:["Component accessibility label\n",(0,s.jsx)(t.code,{children:"string "})]}),"\n",(0,s.jsx)(t.h3,{id:"disabled",children:"disabled"}),"\n",(0,s.jsxs)(t.p,{children:["Disables interaction with the stepper\n",(0,s.jsx)(t.code,{children:"boolean "})]}),"\n",(0,s.jsx)(t.h3,{id:"maxvalue",children:"maxValue"}),"\n",(0,s.jsxs)(t.p,{children:["Maximum value\n",(0,s.jsx)(t.code,{children:"number "})]}),"\n",(0,s.jsx)(t.h3,{id:"minvalue",children:"minValue"}),"\n",(0,s.jsxs)(t.p,{children:["Minimum value\n",(0,s.jsx)(t.code,{children:"number "})]}),"\n",(0,s.jsx)(t.h3,{id:"onvaluechange",children:"onValueChange"}),"\n",(0,s.jsxs)(t.p,{children:["Value change callback function\n",(0,s.jsx)(t.code,{children:"(value: number, testID?: string) => void "})]}),"\n",(0,s.jsx)(t.h3,{id:"small",children:"small"}),"\n",(0,s.jsxs)(t.p,{children:["Renders a small sized Stepper\n",(0,s.jsx)(t.code,{children:"boolean "})]}),"\n",(0,s.jsx)(t.h3,{id:"step",children:"step"}),"\n",(0,s.jsxs)(t.p,{children:["The step to increase and decrease by (default is 1)\n",(0,s.jsx)(t.code,{children:"number "})]}),"\n",(0,s.jsx)(t.h3,{id:"testid",children:"testID"}),"\n",(0,s.jsxs)(t.p,{children:["Test id for component\n",(0,s.jsx)(t.code,{children:"string "})]}),"\n",(0,s.jsx)(t.h3,{id:"type",children:"type"}),"\n",(0,s.jsxs)(t.p,{children:["Stepper style type\n",(0,s.jsx)(t.code,{children:"StepperType "})]}),"\n",(0,s.jsx)(t.h3,{id:"value",children:"value"}),"\n",(0,s.jsxs)(t.p,{children:["Stepper value\n",(0,s.jsx)(t.code,{children:"number "})]})]})}function p(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},74906:(e,t,a)=>{"use strict";a.d(t,{A:()=>i});const i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD9SURBVHgB7ZQ7DoJAFEUffnpKCzWzhLEzGhPdgXa2di5Dl+AK3IKtFZJY0MkOHD8FJdZ+8BL80EjeS6yUmxDeTC73MPBmiHL9vCyOSenOluiGqtww/iokgQp8q6WILo7SXZsEYgLOPQAMCg3InARiAYzvmRSkr3SbDSlyjWFwDO1K1QVkiKtpV+qY27tfAySQQwDIEoAxhl0ORARIQXaA9BNI7YQ575Nf0EVplaJ3bWV2FWsfpKV0C51U2DyGU+OvJ1l+0QqUbio84nDDRYAkvByHx59kxgmPxTwqnuER7rRA+ICYYq7gFe7jB49IoBLfGhmi6wBvLzrscv2B7itSTy7LV3HIAAAAAElFTkSuQmCC"},90825:(e,t,a)=>{"use strict";a.d(t,{A:()=>i});const i="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAYAAAAvf+5AAAAABGdBTUEAALGPC/xhBQAAAFhJREFUKBVjvHrzpufffwyzGICAmYkhTVtdfTuIjS7OAlb0/78MSPLvP0aQBlkIG6gZSZwJJEgMYAJZx8DI+ASEwWyoLlzixBhKnBpGdN+N+ho5DQxgXAMAg0hiTS684QAAAAAASUVORK5CYII="},49746:()=>{},19977:()=>{},197:()=>{},21866:()=>{},52739:()=>{},77982:()=>{},2845:()=>{},44809:()=>{},35326:()=>{},84807:()=>{},28453:(e,t,a)=>{"use strict";a.d(t,{R:()=>o,x:()=>r});var i=a(96540);const s={},n=i.createContext(s);function o(e){const t=i.useContext(n);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(n.Provider,{value:t},e.children)}}}]);