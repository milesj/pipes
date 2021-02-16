(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{102:function(e,t,a){"use strict";a.d(t,"a",(function(){return b})),a.d(t,"b",(function(){return m}));var n=a(0),r=a.n(n);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=r.a.createContext({}),i=function(e){var t=r.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):p(p({},t),e)),a},b=function(e){var t=i(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),b=i(a),d=n,m=b["".concat(c,".").concat(d)]||b[d]||u[d]||o;return a?r.a.createElement(m,p(p({ref:t},l),{},{components:a})):r.a.createElement(m,p({ref:t},l))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,c=new Array(o);c[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:n,c[1]=p;for(var l=2;l<o;l++)c[l]=a[l];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,a)}d.displayName="MDXCreateElement"},94:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return p})),a.d(t,"toc",(function(){return s})),a.d(t,"default",(function(){return i}));var n=a(3),r=a(7),o=(a(0),a(102)),c={title:"Project"},p={unversionedId:"common/project",id:"common/project",isDocsHomePage:!1,title:"Project",description:"A Project class provides workspace and package metadata for a project. A project is denoted by a",source:"@site/docs/common/project.md",slug:"/common/project",permalink:"/docs/common/project",editUrl:"https://github.com/milesj/boost/edit/master/website/docs/common/project.md",version:"current",sidebar:"docs",previous:{title:"PathResolver",permalink:"/docs/common/path-resolver"},next:{title:"Configuration",permalink:"/docs/config"}},s=[{value:"Workspaces",id:"workspaces",children:[]},{value:"API",id:"api",children:[{value:"<code>getPackage</code>",id:"getpackage",children:[]},{value:"<code>getWorkspaceGlobs</code>",id:"getworkspaceglobs",children:[]},{value:"<code>getWorkspacePackages</code>",id:"getworkspacepackages",children:[]},{value:"<code>getWorkspacePackagePaths</code>",id:"getworkspacepackagepaths",children:[]}]}],l={toc:s};function i(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},l,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"A ",Object(o.b)("inlineCode",{parentName:"p"},"Project")," class provides workspace and package metadata for a project. A project is denoted by a\nroot ",Object(o.b)("inlineCode",{parentName:"p"},"package.json")," file and abides the NPM and Node.js module pattern. To begin, import and\ninstantiate the ",Object(o.b)("inlineCode",{parentName:"p"},"Project")," class with a path to the project's root."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"import { Project } from '@boost/common';\n\nconst project = new Project();\n")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Root defaults to ",Object(o.b)("inlineCode",{parentName:"p"},"process.cwd()")," if not provided.")),Object(o.b)("h2",{id:"workspaces"},"Workspaces"),Object(o.b)("p",null,"The primary feature of this class is to extract metadata about a project's workspaces. Workspaces\nare used to support multi-package architectures known as monorepos, typically through\n",Object(o.b)("a",{parentName:"p",href:"https://yarnpkg.com/features/workspaces"},"Yarn"),", ",Object(o.b)("a",{parentName:"p",href:"https://pnpm.js.org/en/pnpm-workspace_yaml"},"PNPM"),",\nor ",Object(o.b)("a",{parentName:"p",href:"https://github.com/lerna/lerna#lernajson"},"Lerna"),". In Boost, our implementation of workspaces\naligns with:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"Project")," - Typically a repository with a root ",Object(o.b)("inlineCode",{parentName:"li"},"package.json"),". Can either be a collection of\npackages, or a package itself."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"Package")," - A folder with a ",Object(o.b)("inlineCode",{parentName:"li"},"package.json")," file that represents an NPM package. Contains source\nand test files specific to the package."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"Workspace")," - A folder that houses one or many packages.")),Object(o.b)("h2",{id:"api"},"API"),Object(o.b)("h3",{id:"getpackage"},Object(o.b)("inlineCode",{parentName:"h3"},"getPackage")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Project#getPackage<T extends PackageStructure",">","(): T")),Object(o.b)("p",null,"Return the contents of the ",Object(o.b)("inlineCode",{parentName:"p"},"package.json")," found in the defined root path."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"const pkg = project.getPackage();\n")),Object(o.b)("h3",{id:"getworkspaceglobs"},Object(o.b)("inlineCode",{parentName:"h3"},"getWorkspaceGlobs")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Project#getWorkspaceGlobs(options?: ProjectSearchOptions): FilePath[]")),Object(o.b)("p",null,"Returns a list of all workspaces globs as they are defined in ",Object(o.b)("inlineCode",{parentName:"p"},"package.json")," (under ",Object(o.b)("inlineCode",{parentName:"p"},"workspaces"),"),\n",Object(o.b)("inlineCode",{parentName:"p"},"lerna.json")," (under ",Object(o.b)("inlineCode",{parentName:"p"},"packages"),"), or ",Object(o.b)("inlineCode",{parentName:"p"},"pnpm-workspace.yaml")," (under ",Object(o.b)("inlineCode",{parentName:"p"},"packages"),")."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"const globs = project.getWorkspaceGlobs(); // => ['packages/*']\n")),Object(o.b)("h3",{id:"getworkspacepackages"},Object(o.b)("inlineCode",{parentName:"h3"},"getWorkspacePackages")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Project#getWorkspacePackages<T extends PackageStructure",">","(): WorkspacePackage<T",">","[]")),Object(o.b)("p",null,"Return all ",Object(o.b)("inlineCode",{parentName:"p"},"package.json"),"s from all workspace packages. Once loaded, append workspace path metadata."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"const pkgs = project.getWorkspacePackages();\n")),Object(o.b)("h3",{id:"getworkspacepackagepaths"},Object(o.b)("inlineCode",{parentName:"h3"},"getWorkspacePackagePaths")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Project#getWorkspacePackagePaths(options?: ProjectSearchOptions): FilePath[]")),Object(o.b)("p",null,"Returns a list of file system paths for all workspaces packages."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"const paths = project.getWorkspacePackagePaths(); // => ['packages/foo', 'packages/bar']\n")))}i.isMDXComponent=!0}}]);