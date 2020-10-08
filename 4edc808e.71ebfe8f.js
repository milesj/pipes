(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{69:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var r=n(2),a=n(6),i=(n(0),n(86)),o=n(90),c={title:"Introduction",slug:"/"},l={unversionedId:"index",id:"index",isDocsHomePage:!1,title:"Introduction",description:"A collection of type-safe cross-platform packages for building robust server-side and client-side",source:"@site/docs/index.mdx",slug:"/",permalink:"/docs/",editUrl:"https://github.com/milesj/boost/edit/master/website/docs/index.mdx",version:"current",sidebar:"docs",next:{title:"Arguments",permalink:"/docs/args"}},s=[{value:"Packages",id:"packages",children:[]},{value:"Requirements",id:"requirements",children:[]},{value:"Environments",id:"environments",children:[]}],b={rightToc:s};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"A collection of type-safe cross-platform packages for building robust server-side ",Object(i.b)("em",{parentName:"p"},"and")," client-side\napplications, packages, and tooling."),Object(i.b)("h2",{id:"packages"},"Packages"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/args"}),"args")," - Command line argument parsing and formatting."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/cli"}),"cli")," - Command line program builder that renders with React and Ink."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/common"}),"common")," - Common utilities for all packages."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/config"}),"config")," - Configuration and ignore file loading."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/debug"}),"debug")," - Debugging and crash reporting."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/decorators"}),"decorators")," - Experimental decorators for common patterns."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/event"}),"event")," - Sync or async based event emitters."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/log"}),"log")," - Low-level system logging."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/pipeline"}),"pipeline")," - Serial or parallel based data pipelines."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/plugin"}),"plugin")," - Plugin module registries and loading."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/terminal"}),"terminal")," - Terminal/console utilities."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/translate"}),"translate")," - Low-level file based message translations.")),Object(i.b)("h2",{id:"requirements"},"Requirements"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Linux, OSX, Windows"),Object(i.b)("li",{parentName:"ul"},"Node 10.17+ (for backend and tooling)"),Object(i.b)("li",{parentName:"ul"},"IE 11+ (for frontend)")),Object(i.b)("h2",{id:"environments"},"Environments"),Object(i.b)("p",null,"Each Boost package is usable in one or many of the following environments. Each supported\nenvironment is denoted with a badge under the package's documentation."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)(o.a,{type:"warning",mdxType:"Badge"},"Backend")," - Package is usable on the backend/server-side using Node.js."),Object(i.b)("li",{parentName:"ul"},Object(i.b)(o.a,{type:"success",mdxType:"Badge"},"Frontend")," - Package is usable on the frontend/client-side using a web browser."),Object(i.b)("li",{parentName:"ul"},Object(i.b)(o.a,{type:"primary",mdxType:"Badge"},"Tooling")," - Package is usable within a command line application or an NPM module/package.")))}p.isMDXComponent=!0},86:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),b=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=b(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=b(n),d=r,m=p["".concat(o,".").concat(d)]||p[d]||u[d]||i;return n?a.a.createElement(m,c(c({ref:t},s),{},{components:n})):a.a.createElement(m,c({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var s=2;s<i;s++)o[s]=n[s];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},90:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(0),a=n.n(r);function i(e){var t=e.children,n=e.type;return a.a.createElement("span",{className:"badge badge--"+n},t)}}}]);