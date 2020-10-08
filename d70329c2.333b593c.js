(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{80:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return b})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return m}));var a=n(2),r=n(6),o=(n(0),n(86)),c=n(93),l=n(91),i=n(92),s={title:"Common utilities",sidebar_label:"Overview"},b={unversionedId:"common",id:"common",isDocsHomePage:!1,title:"Common utilities",description:"A collection of common utilities, classes, and helpers.",source:"@site/docs/common.mdx",slug:"/common",permalink:"/docs/common",editUrl:"https://github.com/milesj/boost/edit/master/website/docs/common.mdx",version:"current",sidebar_label:"Overview",sidebar:"docs",previous:{title:"CLIs",permalink:"/docs/cli"},next:{title:"Contract",permalink:"/docs/common/contract"}},p=[{value:"Installation",id:"installation",children:[]},{value:"Helpers",id:"helpers",children:[{value:"<code>createBlueprint</code>",id:"createblueprint",children:[]},{value:"<code>formatMs</code>",id:"formatms",children:[]},{value:"<code>instanceOf</code>",id:"instanceof",children:[]},{value:"<code>isEmpty</code>",id:"isempty",children:[]},{value:"<code>isFilePath</code>",id:"isfilepath",children:[]},{value:"<code>isModuleName</code>",id:"ismodulename",children:[]},{value:"<code>isObject</code>",id:"isobject",children:[]},{value:"<code>parseFile</code>",id:"parsefile",children:[]},{value:"<code>requireModule</code>",id:"requiremodule",children:[]},{value:"<code>toArray</code>",id:"toarray",children:[]}]},{value:"Serializers",id:"serializers",children:[{value:"JSON",id:"json",children:[]},{value:"YAML",id:"yaml",children:[]}]}],u={rightToc:p};function m(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)(c.a,{backend:!0,tooling:!0,mdxType:"EnvBadges"}),Object(o.b)("p",null,"A collection of common utilities, classes, and helpers."),Object(o.b)("h2",{id:"installation"},"Installation"),Object(o.b)(l.a,{groupId:"package-manager",defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"NPM",value:"npm"}],mdxType:"Tabs"},Object(o.b)(i.a,{value:"yarn",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"yarn add @boost/common\n"))),Object(o.b)(i.a,{value:"npm",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"npm install @boost/common\n")))),Object(o.b)("h2",{id:"helpers"},"Helpers"),Object(o.b)("h3",{id:"createblueprint"},Object(o.b)("inlineCode",{parentName:"h3"},"createBlueprint")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"createBlueprint<T",">","(factory: BlueprintFactory<T",">","): Blueprint<T",">")),Object(o.b)("p",null,"Can be used to generate a blueprint object for use within\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/milesj/optimal"}),"optimal")," checks. All supported optimal predicates are passed as\nan object to the factory."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { optimal, createBlueprint } from '@boost/common';\n\nconst blueprint = createBlueprint(({ string, number }) => ({\n  name: string().required(),\n  age: number().gt(0),\n}));\n\nconst data = optimal({}, blueprint);\n")),Object(o.b)("h3",{id:"formatms"},Object(o.b)("inlineCode",{parentName:"h3"},"formatMs")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"formatMs(time: number, options?: Options): string")),Object(o.b)("p",null,"Can be used to format a UNIX timestamp in milliseconds into a shorthand human readable format. Wraps\nthe ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.npmjs.com/package/pretty-ms"}),"pretty-ms")," package to handle infinite numbers, zeros,\nand more."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { formatMs } from '@boost/common';\n\nformatMs(1337000000); // 15d 11h 23m 20s\n")),Object(o.b)("h3",{id:"instanceof"},Object(o.b)("inlineCode",{parentName:"h3"},"instanceOf")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"instanceOf(object: unknown, declaration: Constructor, loose?: boolean): boolean")),Object(o.b)("p",null,"Performs a loose instance check by comparing class names up the prototype chain if ",Object(o.b)("inlineCode",{parentName:"p"},"instanceof"),"\ninitially fails. To disable this loose check, pass ",Object(o.b)("inlineCode",{parentName:"p"},"false")," as the 3rd argument."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { instanceOf } from '@boost/common';\n\nif (instanceOf(error, Error)) {\n  console.log(error.stack);\n}\n")),Object(o.b)("p",null,"Generics can be used to type the object being checked. This will default to the declaration passed\nto the 2nd argument."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"instanceOf<ParseError>(error, Error);\n")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Loose checks can be useful if multiple copies of the same class declaration exists in the module\ntree. For example, multiple versions of the same package are imported.")),Object(o.b)("h3",{id:"isempty"},Object(o.b)("inlineCode",{parentName:"h3"},"isEmpty")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"isEmpty(value: unknown): boolean")),Object(o.b)("p",null,"Returns ",Object(o.b)("inlineCode",{parentName:"p"},"true")," if an object has no properties, an array has no items, or the value is falsy,\notherwise, it returns ",Object(o.b)("inlineCode",{parentName:"p"},"false"),"."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { isEmpty } from '@boost/common';\n\nisEmpty({}); // true\nisEmpty({ name: 'Boost' }); // false\n\nisEmpty([]); // true\nisEmpty(['Boost']); // false\n")),Object(o.b)("h3",{id:"isfilepath"},Object(o.b)("inlineCode",{parentName:"h3"},"isFilePath")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"isFilePath(path: PortablePath): boolean")),Object(o.b)("p",null,"Returns ",Object(o.b)("inlineCode",{parentName:"p"},"true")," if a string or ",Object(o.b)("inlineCode",{parentName:"p"},"Path")," instance looks like a file system path, by checking for\nabsolute or relative path markers, or the existence of path separating slashes. Will return ",Object(o.b)("inlineCode",{parentName:"p"},"false"),"\nfor values that are only the file or folder name."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { isFilePath } from '@boost/common';\n\nisFilePath('./path/to/file.ts'); // true\nisFilePath(new Path('/path/to/folder')); // true\nisFilePath('file.ts'); // false\n")),Object(o.b)("h3",{id:"ismodulename"},Object(o.b)("inlineCode",{parentName:"h3"},"isModuleName")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"isModuleName(name: ModuleName): boolean")),Object(o.b)("p",null,"Returns ",Object(o.b)("inlineCode",{parentName:"p"},"true")," if a string is a valid Node module package name, according to the rules defined in\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/npm/validate-npm-package-name"}),"validate-npm-package-name"),". Will ",Object(o.b)("inlineCode",{parentName:"p"},"return")," false\nfor native builtin modules, like ",Object(o.b)("inlineCode",{parentName:"p"},"fs"),", and for the old name format."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { isModuleName } from '@boost/common';\n\nisModuleName('boost'); // true\nisModuleName('@boost/common'); // true\nisModuleName('fs'); // false\n")),Object(o.b)("h3",{id:"isobject"},Object(o.b)("inlineCode",{parentName:"h3"},"isObject")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"isObject<T",">","(value: unknown): value is T")),Object(o.b)("p",null,"Returns ",Object(o.b)("inlineCode",{parentName:"p"},"true")," if the value is a plain object."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { isObject } from '@boost/common';\n\nisObject({}); // true\nisObject([]); // false\n")),Object(o.b)("p",null,"Generics can be used to type the return value of the object (when necessary)."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"interface Person {\n  name: string;\n}\n\nif (isObject<Person>(person)) {\n  console.log(person.name);\n}\n")),Object(o.b)("h3",{id:"parsefile"},Object(o.b)("inlineCode",{parentName:"h3"},"parseFile")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"parseFile<T",">","(path: string): T")),Object(o.b)("p",null,"Can be used to ",Object(o.b)("em",{parentName:"p"},"sync"),"hronously parse and return an object for the following file types & extensions:\n",Object(o.b)("inlineCode",{parentName:"p"},"js"),", ",Object(o.b)("inlineCode",{parentName:"p"},"jsx"),", ",Object(o.b)("inlineCode",{parentName:"p"},"json"),", ",Object(o.b)("inlineCode",{parentName:"p"},"json5"),", ",Object(o.b)("inlineCode",{parentName:"p"},"yaml"),", ",Object(o.b)("inlineCode",{parentName:"p"},"yml"),". The function requires an absolute file path, and any\nunsupported file type will throw an error."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { parseFile } from '@boost/common';\n\nconst data: ReturnShape = parseFile('/absolute/file/path');\n")),Object(o.b)("h3",{id:"requiremodule"},Object(o.b)("inlineCode",{parentName:"h3"},"requireModule")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"requireModule<T",">","(path: string): T")),Object(o.b)("p",null,"Works in a similar fashion to the native NodeJS ",Object(o.b)("inlineCode",{parentName:"p"},"require()"),", but also handles files built with Babel\nor TypeScript, by properly returning the ",Object(o.b)("inlineCode",{parentName:"p"},"default")," export, and also allowing the expected type to be\ndefined."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { requireModule } from '@boost/common';\n\nconst defaultImport: ReturnShape = requireModule('../../some/module');\n")),Object(o.b)("h3",{id:"toarray"},Object(o.b)("inlineCode",{parentName:"h3"},"toArray")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"toArray<T",">","(value?: T | T[]): T[]")),Object(o.b)("p",null,"Converts a non-array to an array. If the provided value is falsy, an empty array is returned. If the\nprovided value is truthy and a non-array, an array of 1 item is returned."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { toArray } from '@boost/common';\n\ntoArray(123); // [123]\ntoArray('abc'); // ['abc']\ntoArray(['a', 'b', 'c']); // ['a', 'b', 'c']\n")),Object(o.b)("h2",{id:"serializers"},"Serializers"),Object(o.b)("h3",{id:"json"},"JSON"),Object(o.b)("p",null,"Powered by the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.npmjs.com/package/json5"}),"JSON5")," package, the ",Object(o.b)("inlineCode",{parentName:"p"},"json")," serializer can be\nused to parse and stringify JSON data."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { json } from '@boost/common';\n\njson.parse(data);\njson.stringify(data);\n")),Object(o.b)("h3",{id:"yaml"},"YAML"),Object(o.b)("p",null,"Powered by the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.npmjs.com/package/yaml"}),"YAML")," package, the ",Object(o.b)("inlineCode",{parentName:"p"},"yaml")," serializer can be used\nto parse and stringify YAML data."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ts"}),"import { yaml } from '@boost/common';\n\nyaml.parse(data);\nyaml.stringify(data);\n")))}m.isMDXComponent=!0},86:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),b=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=b(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=b(n),m=a,d=p["".concat(c,".").concat(m)]||p[m]||u[m]||o;return n?r.a.createElement(d,l(l({ref:t},s),{},{components:n})):r.a.createElement(d,l({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,c=new Array(o);c[0]=m;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,c[1]=l;for(var s=2;s<o;s++)c[s]=n[s];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},87:function(e,t,n){"use strict";function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}},88:function(e,t,n){"use strict";var a=n(0);const r=Object(a.createContext)(void 0);t.a=r},89:function(e,t,n){"use strict";var a=n(0),r=n(88);t.a=function(){const e=Object(a.useContext)(r.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},90:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(0),r=n.n(a);function o(e){var t=e.children,n=e.type;return r.a.createElement("span",{className:"badge badge--"+n},t)}},91:function(e,t,n){"use strict";var a=n(0),r=n.n(a),o=n(89),c=n(87),l=n(48),i=n.n(l);const s=37,b=39;t.a=function(e){const{block:t,children:n,defaultValue:l,values:p,groupId:u}=e,{tabGroupChoices:m,setTabGroupChoices:d}=Object(o.a)(),[j,O]=Object(a.useState)(l),[f,h]=Object(a.useState)(!1);if(null!=u){const e=m[u];null!=e&&e!==j&&p.some(t=>t.value===e)&&O(e)}const y=e=>{O(e),null!=u&&d(u,e)},g=[],N=e=>{e.metaKey||e.altKey||e.ctrlKey||h(!0)},v=()=>{h(!1)};return Object(a.useEffect)(()=>{window.addEventListener("keydown",N),window.addEventListener("mousedown",v)},[]),r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(c.a)("tabs",{"tabs--block":t})},p.map(({value:e,label:t})=>r.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":j===e,className:Object(c.a)("tabs__item",i.a.tabItem,{"tabs__item--active":j===e}),style:f?{}:{outline:"none"},key:e,ref:e=>g.push(e),onKeyDown:e=>{((e,t,n)=>{switch(n.keyCode){case b:((e,t)=>{const n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()})(e,t);break;case s:((e,t)=>{const n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()})(e,t)}})(g,e.target,e),N(e)},onFocus:()=>y(e),onClick:()=>{y(e),h(!1)},onPointerDown:()=>h(!1)},t))),r.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},a.Children.toArray(n).filter(e=>e.props.value===j)[0]))}},92:function(e,t,n){"use strict";var a=n(0),r=n.n(a);t.a=function(e){return r.a.createElement("div",null,e.children)}},93:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(0),r=n.n(a),o=n(90),c=n(47),l=n.n(c);function i(e){var t=e.children;return r.a.createElement("span",{className:l.a.badgeGroup},t)}function s(e){var t=e.backend,n=e.frontend,a=e.tooling;return r.a.createElement(i,null,t&&r.a.createElement(o.a,{type:"warning"},"Backend"),n&&r.a.createElement(o.a,{type:"success"},"Frontend"),a&&r.a.createElement(o.a,{type:"primary"},"Tooling"))}}}]);