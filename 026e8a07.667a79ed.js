(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{55:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return s})),a.d(t,"metadata",(function(){return p})),a.d(t,"rightToc",(function(){return d})),a.d(t,"default",(function(){return u}));var n=a(2),r=a(6),l=(a(0),a(86)),o=a(93),i=a(91),c=a(92),s={title:"Plugins"},p={unversionedId:"plugin",id:"plugin",isDocsHomePage:!1,title:"Plugins",description:"Plugin based architecture that supports module loading, custom types, scopes, and more.",source:"@site/docs/plugin.mdx",slug:"/plugin",permalink:"/docs/plugin",editUrl:"https://github.com/milesj/boost/edit/master/website/docs/plugin.mdx",version:"current",sidebar:"docs",previous:{title:"Pipelines",permalink:"/docs/pipeline"},next:{title:"Terminal utilities",permalink:"/docs/terminal"}},d=[{value:"Installation",id:"installation",children:[]},{value:"Events",id:"events",children:[]},{value:"Preface",id:"preface",children:[]},{value:"Registries",id:"registries",children:[]},{value:"Plugins",id:"plugins",children:[{value:"Priority",id:"priority",children:[]},{value:"Life cycles",id:"life-cycles",children:[]}]},{value:"Modules",id:"modules",children:[{value:"Naming guidelines",id:"naming-guidelines",children:[]}]},{value:"Loading plugins",id:"loading-plugins",children:[{value:"Tool instances",id:"tool-instances",children:[]},{value:"Configuration files",id:"configuration-files",children:[]}]},{value:"Ecosystem",id:"ecosystem",children:[]}],b={rightToc:d};function u(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(l.a)("wrapper",Object(n.a)({},b,a,{components:t,mdxType:"MDXLayout"}),Object(l.a)(o.a,{backend:!0,tooling:!0,mdxType:"EnvBadges"}),Object(l.a)("p",null,"Plugin based architecture that supports module loading, custom types, scopes, and more."),Object(l.a)("h2",{id:"installation"},"Installation"),Object(l.a)(i.a,{groupId:"package-manager",defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"NPM",value:"npm"}],mdxType:"Tabs"},Object(l.a)(c.a,{value:"yarn",mdxType:"TabItem"},Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"yarn add @boost/plugin\n"))),Object(l.a)(c.a,{value:"npm",mdxType:"TabItem"},Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-bash"}),"npm install @boost/plugin\n")))),Object(l.a)("h2",{id:"events"},"Events"),Object(l.a)("table",null,Object(l.a)("thead",{parentName:"table"},Object(l.a)("tr",{parentName:"thead"},Object(l.a)("th",Object(n.a)({parentName:"tr"},{align:null}),"Event"),Object(l.a)("th",Object(n.a)({parentName:"tr"},{align:null}),"Arguments"),Object(l.a)("th",Object(n.a)({parentName:"tr"},{align:null}),"Description"))),Object(l.a)("tbody",{parentName:"table"},Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"Registry#onAfterRegister")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"Plugin")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Called after a plugin is registered.")),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"Registry#onAfterUnregister")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"Plugin")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Called after a plugin is unregistered.")),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"Registry#onBeforeRegister")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"Plugin")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Called before a plugin is registered and the ",Object(l.a)("inlineCode",{parentName:"td"},"startup")," life-cycle.")),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"Registry#onBeforeUnregister")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"Plugin")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Called before a plugin is unregistered and the ",Object(l.a)("inlineCode",{parentName:"td"},"shutdown")," life-cycle.")),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"Registry#onLoad")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"string, object")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Called after a plugin is loaded but before it's registered.")))),Object(l.a)("h2",{id:"preface"},"Preface"),Object(l.a)("p",null,"The plugin system is comprised of 2 parts -- one for projects or libraries that want plugins, and\nthe other for plugin authors. ",Object(l.a)("a",Object(n.a)({parentName:"p"},{href:"#registries"}),"Project owners")," can integrate into the system using a\nregistry, which is based around the idea of loading plugins from third-party packages or file system\npaths. ",Object(l.a)("a",Object(n.a)({parentName:"p"},{href:"#plugins"}),"Plugin authors")," can create and provide packages that register and hook into the\nproject."),Object(l.a)("p",null,"Our system is generic and robust enough to be integrated into any and all projects, with the ability\nto handle multiple plugins in parallel through configuration and setting based approaches."),Object(l.a)("h2",{id:"registries"},"Registries"),Object(l.a)("p",null,'For project authors, we begin by defining a unique plugin type, like "renderer", "engine", "asset",\nor simply "plugin" if you\'re not looking to be creative. We can accomplish this with the ',Object(l.a)("inlineCode",{parentName:"p"},"Registry"),"\nclass, which requires a project name (used as a ",Object(l.a)("a",Object(n.a)({parentName:"p"},{href:"#naming-guidelines"}),"package prefix and scope"),"),\nplugin type name, and customizable options."),Object(l.a)("p",null,'In our examples moving forward, we will use "renderer" as our plugin type.'),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { Registry, Pluggable } from '@boost/plugin';\n\nexport interface Renderable<T> extends Pluggable<T> {\n  render(): string | Promise<string>;\n}\n\nconst rendererRegistry = new Registry<Renderable>('boost', 'renderer', {\n  validate(plugin) {\n    if (typeof plugin.render !== 'function') {\n      throw new TypeError('Renderers require a `render()` method.');\n    }\n  },\n});\n\nexport default rendererRegistry;\n")),Object(l.a)("p",null,"You may have noticed the ",Object(l.a)("inlineCode",{parentName:"p"},"validate")," option above. This option is required as it forces you to verify\na plugin being loaded or registered abides the contract you expect. In the example above, we expect\nall our renderers to have a ",Object(l.a)("inlineCode",{parentName:"p"},"render"),' method, otherwise, what would happen if an "engine" plugin was\npassed instead? Nothing good.'),Object(l.a)("p",null,"Besides ",Object(l.a)("inlineCode",{parentName:"p"},"validate"),", the following options can be passed, all of which are optional. For more\ninformation on life cycles, continue to the next ",Object(l.a)("a",Object(n.a)({parentName:"p"},{href:"#plugins"}),"plugins")," chapter."),Object(l.a)("ul",null,Object(l.a)("li",{parentName:"ul"},Object(l.a)("inlineCode",{parentName:"li"},"beforeStartup")," (",Object(l.a)("inlineCode",{parentName:"li"},"async (plugin: T) => void"),") - Callback fired before a plugin's ",Object(l.a)("inlineCode",{parentName:"li"},"startup")," life\ncycle is executed."),Object(l.a)("li",{parentName:"ul"},Object(l.a)("inlineCode",{parentName:"li"},"beforeShutdown")," (",Object(l.a)("inlineCode",{parentName:"li"},"async (plugin: T) => void"),") - Callback fired before a plugin's ",Object(l.a)("inlineCode",{parentName:"li"},"shutdown")," life\ncycle is executed."),Object(l.a)("li",{parentName:"ul"},Object(l.a)("inlineCode",{parentName:"li"},"afterStartup")," (",Object(l.a)("inlineCode",{parentName:"li"},"async (plugin: T) => void"),") - Callback fired after a plugin's ",Object(l.a)("inlineCode",{parentName:"li"},"startup")," life\ncycle is executed."),Object(l.a)("li",{parentName:"ul"},Object(l.a)("inlineCode",{parentName:"li"},"afterShutdown")," (",Object(l.a)("inlineCode",{parentName:"li"},"async (plugin: T) => void"),") - Callback fired after a plugin's ",Object(l.a)("inlineCode",{parentName:"li"},"shutdown")," life\ncycle is executed.")),Object(l.a)("h2",{id:"plugins"},"Plugins"),Object(l.a)("p",null,"For both project owners and plugin authors, we keep talking about plugins, but what exactly is a\nplugin? In the context of this system, a plugin is either a plain object, or class instance that\nextends ",Object(l.a)("inlineCode",{parentName:"p"},"Plugin"),", with both abiding a defined contract (the ",Object(l.a)("inlineCode",{parentName:"p"},"validate")," option). A plugin must also\nhave a unique ",Object(l.a)("inlineCode",{parentName:"p"},"name")," property, which is typically the NPM package name."),Object(l.a)(i.a,{groupId:"plugin-format",defaultValue:"class",values:[{label:"Class",value:"class"},{label:"Object",value:"object"}],mdxType:"Tabs"},Object(l.a)(c.a,{value:"class",mdxType:"TabItem"},Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { Plugin } from '@boost/plugin';\nimport { Renderable } from './registry';\n\nexport default class Renderer extends Plugin implements Renderable {\n  // Using private scope\n  name = '@boost/renderer-example';\n\n  render() {\n    return 'Something rendered here?';\n  }\n}\n"))),Object(l.a)(c.a,{value:"object",mdxType:"TabItem"},Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"const renderer = {\n  // Using public scope\n  name: 'boost-renderer-example',\n\n  render() {\n    return 'Something rendered here?';\n  },\n};\n\nexport default renderer;\n")))),Object(l.a)("p",null,"Now why would we use a class instead of an object, as an object seems much simpler? For 2 reasons,\nthe 1st being that ",Object(l.a)("inlineCode",{parentName:"p"},"Plugin")," extends from ",Object(l.a)("a",Object(n.a)({parentName:"p"},{href:"/docs/common/contract"}),Object(l.a)("inlineCode",{parentName:"a"},"Contract")),", which allows the plugin\nto inherit options through its constructor. This automatically happens when loading plugins from a\nconfiguration file."),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { Blueprint, Predicates } from '@boost/common';\nimport { Plugin } from '@boost/plugin';\nimport { Renderable } from './registry';\n\nexport interface RendererOptions {\n  async?: boolean;\n}\n\nexport default class Renderer extends Plugin<unknown, RendererOptions> implements Renderable {\n  // ...\n\n  blueprint({ bool }: Predicates): Blueprint<RendererOptions> {\n    return {\n      async: bool(),\n    };\n  }\n}\n\n// Example\nconst renderer = new Renderer({ async: true });\n")),Object(l.a)("p",null,"The 2nd reason is for TypeScript, as we can type our ",Object(l.a)("a",Object(n.a)({parentName:"p"},{href:"#tool-instances"}),"tool")," that is passed to\n",Object(l.a)("a",Object(n.a)({parentName:"p"},{href:"#life-cycles"}),"life cycles")," -- more specifically, the ",Object(l.a)("inlineCode",{parentName:"p"},"Pluggable")," type. More information on the tool\ncan be found in later chapters."),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { Plugin } from '@boost/plugin';\nimport { Renderable } from './registry';\nimport Tool from './Tool';\n\nexport default class Renderer extends Plugin<Tool> implements Renderable<Tool> {\n  // ...\n}\n")),Object(l.a)("h3",{id:"priority"},"Priority"),Object(l.a)("p",null,'After a plugin is loaded, the current plugins list is sorted based on priority. Priority is simply a\nnumber, in ascending order, that determines the order and precedence of plugins. Priority enables\nplugin authors and consumers to "mark" as high or low priority.'),Object(l.a)("p",null,"Plugin authors can set a priority using the ",Object(l.a)("inlineCode",{parentName:"p"},"priority")," property."),Object(l.a)(i.a,{groupId:"plugin-format",defaultValue:"class",values:[{label:"Class",value:"class"},{label:"Object",value:"object"}],mdxType:"Tabs"},Object(l.a)(c.a,{value:"class",mdxType:"TabItem"},Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { Plugin } from '@boost/plugin';\nimport { Renderable } from './registry';\n\nexport default class Renderer extends Plugin implements Renderable {\n  name = '@boost/renderer-example';\n\n  priority = 50;\n\n  render() {\n    return 'Something rendered here?';\n  }\n}\n"))),Object(l.a)(c.a,{value:"object",mdxType:"TabItem"},Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"const renderer = {\n  name: 'boost-renderer-example',\n\n  priority: 50,\n\n  render() {\n    return 'Something rendered here?';\n  },\n};\n\nexport default renderer;\n")))),Object(l.a)("p",null,"While ",Object(l.a)("a",Object(n.a)({parentName:"p"},{href:"#loading-plugins"}),"consumers can override")," the priority using the ",Object(l.a)("inlineCode",{parentName:"p"},"priority")," option."),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"rendererRegistry.load('boost-renderer-example', {}, { priority: 50 });\n")),Object(l.a)("blockquote",null,Object(l.a)("p",{parentName:"blockquote"},"The default priority for all plugins is ",Object(l.a)("inlineCode",{parentName:"p"},"100"),".")),Object(l.a)("h3",{id:"life-cycles"},"Life cycles"),Object(l.a)("p",null,"A life cycle is an optional method on a plugin that is executed at specific points in the life of a\nplugin. Currently, plugins support 2 life cycles, ",Object(l.a)("inlineCode",{parentName:"p"},"startup")," and ",Object(l.a)("inlineCode",{parentName:"p"},"shutdown"),". Startup is executed\nafter a plugin is loaded and validated, but before it's registered in the registry. Shutdown on the\notherhand is executed before a plugin is unregistered from the registry."),Object(l.a)("p",null,"All life cycles are asynchronouse and receive a ",Object(l.a)("a",Object(n.a)({parentName:"p"},{href:"#tool-instances"}),"tool")," as its only argument."),Object(l.a)(i.a,{groupId:"plugin-format",defaultValue:"class",values:[{label:"Class",value:"class"},{label:"Object",value:"object"}],mdxType:"Tabs"},Object(l.a)(c.a,{value:"class",mdxType:"TabItem"},Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { Plugin } from '@boost/plugin';\nimport { Renderable } from './registry';\nimport Tool from './Tool';\n\nexport default class Renderer extends Plugin<Tool> implements Renderable<Tool> {\n  // ...\n\n  async startup(tool: Tool) {\n    // Do something\n  }\n\n  async shutdown(tool: Tool) {\n    // Do something\n  }\n}\n"))),Object(l.a)(c.a,{value:"object",mdxType:"TabItem"},Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import Tool from './Tool';\n\nconst renderer = {\n  // ...\n\n  async startup(tool: Tool) {\n    // Do something\n  },\n\n  async shutdown(tool: Tool) {\n    // Do something\n  },\n};\n\nexport default renderer;\n")))),Object(l.a)("h2",{id:"modules"},"Modules"),Object(l.a)("p",null,"Typically plugins are represented as an NPM package or file module for easy consumption. This\npattern is first class in Boost, but there are specific requirements to be followed. The 1st is that\nall plugin modules ",Object(l.a)("em",{parentName:"p"},"must")," return a factory function from the default index import. Using a factory\nfunction provides the following benefits:"),Object(l.a)("ul",null,Object(l.a)("li",{parentName:"ul"},"The return value of the factory may change without breaking the import contract."),Object(l.a)("li",{parentName:"ul"},"Option objects are passed to the factory, which allows implementors to handle it however they\nplease."),Object(l.a)("li",{parentName:"ul"},"Runtime and boostrap based logic is encapsulated within the function."),Object(l.a)("li",{parentName:"ul"},"Multiple instances can be created from a single imported package."),Object(l.a)("li",{parentName:"ul"},"Asynchronous aware and compatible.")),Object(l.a)("p",null,"Using our renderer examples, we would have the following factories. One sync and the other async."),Object(l.a)(i.a,{groupId:"plugin-format",defaultValue:"class",values:[{label:"Class (async)",value:"class"},{label:"Object (sync)",value:"object"}],mdxType:"Tabs"},Object(l.a)(c.a,{value:"class",mdxType:"TabItem"},Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts",metastring:'title="@boost/renderer-example/src/index.ts"',title:'"@boost/renderer-example/src/index.ts"'}),"import { Renderable } from './registry';\nimport Renderer, { RendererOptions } from './Renderer';\n\nexport default async function (options: RendererOptions): Renderable {\n  await someProcessThatNeedsToBeAwaited();\n\n  return new Renderer(options);\n}\n"))),Object(l.a)(c.a,{value:"object",mdxType:"TabItem"},Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts",metastring:'title="boost-renderer-example/src/index.ts"',title:'"boost-renderer-example/src/index.ts"'}),"import { RendererOptions, Renderable } from './registry';\n\nexport default function (options: RendererOptions): Renderable {\n  return {\n    name: 'boost-renderer-example',\n\n    render() {\n      if (options.async) {\n        return Promise.resolve('Ooo, this is a fancy render.');\n      }\n\n      return 'Something rendered here?';\n    },\n  };\n}\n")))),Object(l.a)("h3",{id:"naming-guidelines"},"Naming guidelines"),Object(l.a)("p",null,"You may have noticed in the examples above that we've been referencing both scoped and non-scoped\npackage names. All plugin packages follow the format of ",Object(l.a)("inlineCode",{parentName:"p"},"<project>-<type>-<name>")," for public\nthird-party packages, and ",Object(l.a)("inlineCode",{parentName:"p"},"@<project>/<type>-<name>")," for official project owner packages. A 3rd\nformat exists for public third-party packages that exist within a scope,\n",Object(l.a)("inlineCode",{parentName:"p"},"@<scope>/<project>-<type>-<name>"),"."),Object(l.a)("p",null,'If the plugin name is "example", and our project name is "boost", and our plugin type is "renderer",\nthe following package names are valid. ',Object(l.a)("em",{parentName:"p"},"No other formats are supported.")),Object(l.a)("table",null,Object(l.a)("thead",{parentName:"table"},Object(l.a)("tr",{parentName:"thead"},Object(l.a)("th",Object(n.a)({parentName:"tr"},{align:null}),"Package"),Object(l.a)("th",Object(n.a)({parentName:"tr"},{align:null}),"Name"))),Object(l.a)("tbody",{parentName:"table"},Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Private/Owner"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"@boost/renderer-example"))),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Public"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"boost-renderer-example"))),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Scoped public"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("inlineCode",{parentName:"td"},"@scope/boost-renderer-example"))))),Object(l.a)("p",null,"All name parts should be in kebab-case and abide the official\n",Object(l.a)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/npm/validate-npm-package-name"}),"NPM package naming guidelines"),"."),Object(l.a)("h2",{id:"loading-plugins"},"Loading plugins"),Object(l.a)("p",null,"Plugins are either asynchronously loaded from an NPM package, a relative file system path, or\nexplicitly passed using the ",Object(l.a)("inlineCode",{parentName:"p"},"Registry")," class. The ",Object(l.a)("inlineCode",{parentName:"p"},"load()")," method can be used to load a single\nplugin, while ",Object(l.a)("inlineCode",{parentName:"p"},"loadMany()")," will load multiple. Loading accepts 3 different formats, which are\noutlined with the examples below."),Object(l.a)("p",null,"Passing a string will load based on module name or file path. Names can either be short (just the\nplugin name), or in the long fully qualified form (project, type, and plugin name). When using the\nshort form, the loader will attempt to find both the scoped (",Object(l.a)("inlineCode",{parentName:"p"},"@boost/renderer-example"),") and\nnon-scoped packages (",Object(l.a)("inlineCode",{parentName:"p"},"boost-renderer-example"),"), with scoped taking precedence."),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"// Load by short module name\nconst renderer = await rendererRegistry.load('foo');\n\n// Load by long module name with options\nconst renderer = await rendererRegistry.load('boost-renderer-foo', { async: true });\n\n// Load by file path\nconst renderer = await rendererRegistry.load('./renderers/qux.js');\n")),Object(l.a)("p",null,"You may also load many plugins in parallel, by passing an array of module names or plugin instances,\nor by passing an object of module names that map to booleans or options."),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"// Load many with default options\nconst renderers = await rendererRegistry.loadMany([\n  'foo',\n  '@boost/renderer-bar',\n  '@scope/boost-renderer-baz',\n]);\n\n// Load many with custom options\nconst renderers = await rendererRegistry.loadMany({\n  foo: { async: true },\n  '@boost/renderer-bar': true, // Enabled\n  '@scope/boost-renderer-baz': false, // Disabled\n});\n")),Object(l.a)("p",null,"And lastly, passing a plugin object directly is also supported."),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"const renderer = await rendererRegistry.load({\n  name: '@scope/boost-renderer-baz',\n  render() {\n    return 'Hello world';\n  },\n});\n\n// Or\nconst renderer = await rendererRegistry.load(new Renderer());\n")),Object(l.a)("p",null,"Loaded and registered plugins should then be accessed with ",Object(l.a)("inlineCode",{parentName:"p"},"get()"),", ",Object(l.a)("inlineCode",{parentName:"p"},"getMany()"),", or ",Object(l.a)("inlineCode",{parentName:"p"},"getAll()"),", all\nof which check based on the plugin's ",Object(l.a)("inlineCode",{parentName:"p"},"name")," property."),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"const renderer = rendererRegistry.get('boost-renderer-foo');\n")),Object(l.a)("h3",{id:"tool-instances"},"Tool instances"),Object(l.a)("p",null,"Most projects have a central object or class instance that powers their entire process, for\ninstance, Webpack has the ",Object(l.a)("inlineCode",{parentName:"p"},"Compiler")," and ",Object(l.a)("inlineCode",{parentName:"p"},"Compilation")," instances. In Boost this is called a tool (as\nin developer or build tool)."),Object(l.a)("p",null,"Tools are optional, but when defined, they're passed to plugin life cycles, so that plugins may\ninteract and integrate with them. For proper type-safety, the Tool type should be passed as a\ngeneric to ",Object(l.a)("inlineCode",{parentName:"p"},"Registry"),", ",Object(l.a)("inlineCode",{parentName:"p"},"Plugin"),", and ",Object(l.a)("inlineCode",{parentName:"p"},"Pluggable"),"."),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import { Registry, Pluggable, Plugin } from '@boost/plugin';\nimport Tool from './Tool';\n\nexport interface Renderable<T> extends Pluggable<T> {\n  render(): string | Promise<string>;\n}\n\nclass Renderer<T> extends Plugin<T> implements Renderable<T> {}\n\nconst registry = new Registry<Renderable, Tool>(/* ... */);\nconst renderer = new Renderer<Tool>();\n")),Object(l.a)("p",null,"If you have a tool instance, pass the tool as an option to ",Object(l.a)("inlineCode",{parentName:"p"},"Registry#load()")," and\n",Object(l.a)("inlineCode",{parentName:"p"},"Registry#loadMany()"),"."),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-ts"}),"import Tool from './Tool';\n\nconst tool = new Tool();\n\nawait registry.load('foo', {}, { tool });\nawait registry.loadMany(['foo', 'bar'], { tool });\n")),Object(l.a)("h3",{id:"configuration-files"},"Configuration files"),Object(l.a)("p",null,"The loader methods were built to support plugins defined in ",Object(l.a)("a",Object(n.a)({parentName:"p"},{href:"/docs/config"}),"configuration files"),", as\nthis is a common use case. Take the following examples that showcase JSON and JS based\nconfigurations."),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-json"}),'{\n  "renderers": {\n    "foo": { "async": true },\n    "@boost/renderer-bar": {},\n    "@scope/boost-renderer-baz": true\n  }\n}\n')),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"module.exports = {\n  renderers: {\n    foo: { async: true },\n    '@boost/renderer-bar': {},\n    '@scope/boost-renderer-baz': true,\n  },\n};\n")),Object(l.a)("p",null,"And Webpack/Rollup styled configurations where plugins are instantiated manually."),Object(l.a)("pre",null,Object(l.a)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import foo from 'boost-renderer-foo';\nimport bar from '@boost/renderer-bar';\nimport baz from '@scope/boost-renderer-baz';\nimport qux from './renderers/qux';\n\nconst barInstance = bar();\nbarInstance.priority = 1;\n\nexport default {\n  renderers: [\n    foo({ async: true }),\n    barInstance,\n    baz(),\n    qux(),\n  ],\n};\n")),Object(l.a)("h2",{id:"ecosystem"},"Ecosystem"),Object(l.a)("p",null,"Below are a list of third-party projects and their current plugin implementations. These were used\nas a basis and reference for Boost's plugin system."),Object(l.a)("table",null,Object(l.a)("thead",{parentName:"table"},Object(l.a)("tr",{parentName:"thead"},Object(l.a)("th",Object(n.a)({parentName:"tr"},{align:null}),"Project"),Object(l.a)("th",Object(n.a)({parentName:"tr"},{align:null}),"Plugin pattern"),Object(l.a)("th",Object(n.a)({parentName:"tr"},{align:null}),"Options pattern"),Object(l.a)("th",Object(n.a)({parentName:"tr"},{align:null}),"Package names"),Object(l.a)("th",Object(n.a)({parentName:"tr"},{align:null}),"Lifecycle events"))),Object(l.a)("tbody",{parentName:"table"},Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("a",Object(n.a)({parentName:"td"},{href:"https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-writing-your-first-babel-plugin"}),"Babel")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Function that returns an object"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Function argument"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"babel-plugin-foo, @babel/plugin-foo"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"pre(), post()")),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("a",Object(n.a)({parentName:"td"},{href:"https://eslint.org/docs/developer-guide/working-with-plugins"}),"ESLint")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Object"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"eslint-plugin-foo"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}))),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("a",Object(n.a)({parentName:"td"},{href:"https://gulpjs.com/docs/en/getting-started/using-plugins"}),"Gulp")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Function that returns a stream"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Function argument"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"N/A"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}))),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("a",Object(n.a)({parentName:"td"},{href:"https://parceljs.org/asset_types.html"}),"Parcel asset")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Class that extends ",Object(l.a)("inlineCode",{parentName:"td"},"Asset")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Constructor"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"parcel-asset-foo,",Object(l.a)("br",null),"@parcel/asset-foo"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}))),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("a",Object(n.a)({parentName:"td"},{href:"https://parceljs.org/plugins.html"}),"Parcel plugin")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Function that binds events"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"parcel-plugin-foo, @parcel/plugin-foo"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}))),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("a",Object(n.a)({parentName:"td"},{href:"https://prettier.io/docs/en/plugins.html"}),"Prettier")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Named exports"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"prettier-plugin-foo, @prettier/plugin-foo, @scope/prettier-plugin-foo"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}))),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("a",Object(n.a)({parentName:"td"},{href:"https://rollupjs.org/guide/en/#plugins-overview"}),"Rollup")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Function that returns an object"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Function argument"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"rollup-plugin-foo"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Many")),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("a",Object(n.a)({parentName:"td"},{href:"https://webpack.js.org/contribute/writing-a-plugin/"}),"Webpack")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Stand-alone class"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Constructor (implementation dependent)"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"apply()")),Object(l.a)("tr",{parentName:"tbody"},Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),Object(l.a)("a",Object(n.a)({parentName:"td"},{href:"https://next.yarnpkg.com/advanced/plugin-tutorial"}),"Yarn")),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"Object with ",Object(l.a)("inlineCode",{parentName:"td"},"factory()")," that returns an object"),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null})),Object(l.a)("td",Object(n.a)({parentName:"tr"},{align:null}),"factory()")))))}u.isMDXComponent=!0},86:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a(0),r=a.n(n);function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){l(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=r.a.createContext({}),p=function(e){var t=r.a.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),b=p(a),u=n,m=b["".concat(o,".").concat(u)]||b[u]||d[u]||l;return a?r.a.createElement(m,i(i({ref:t},s),{},{components:a})):r.a.createElement(m,i({ref:t},s))}));function u(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=a.length,o=new Array(l);o[0]=b;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:n,o[1]=i;for(var s=2;s<l;s++)o[s]=a[s];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}b.displayName="MDXCreateElement"},87:function(e,t,a){"use strict";function n(e){var t,a,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(a=n(e[t]))&&(r&&(r+=" "),r+=a);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,a=0,r="";a<arguments.length;)(e=arguments[a++])&&(t=n(e))&&(r&&(r+=" "),r+=t);return r}},88:function(e,t,a){"use strict";var n=a(0),r=Object(n.createContext)(void 0);t.a=r},89:function(e,t,a){"use strict";var n=a(0),r=a(88);t.a=function(){var e=Object(n.useContext)(r.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},90:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(0),r=a.n(n);function l(e){var t=e.children,a=e.type;return r.a.createElement("span",{className:"badge badge--"+a},t)}},91:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(89),o=a(87),i=a(48),c=a.n(i),s=37,p=39;t.a=function(e){var t=e.block,a=e.children,i=e.defaultValue,d=e.values,b=e.groupId,u=Object(l.a)(),m=u.tabGroupChoices,g=u.setTabGroupChoices,j=Object(n.useState)(i),O=j[0],f=j[1],h=Object(n.useState)(!1),y=h[0],N=h[1];if(null!=b){var w=m[b];null!=w&&w!==O&&d.some((function(e){return e.value===w}))&&f(w)}var v=function(e){f(e),null!=b&&g(b,e)},x=[],C=function(e){e.metaKey||e.altKey||e.ctrlKey||N(!0)},T=function(){N(!1)};return Object(n.useEffect)((function(){window.addEventListener("keydown",C),window.addEventListener("mousedown",T)}),[]),r.a.createElement("div",null,r.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(o.a)("tabs",{"tabs--block":t})},d.map((function(e){var t=e.value,a=e.label;return r.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":O===t,className:Object(o.a)("tabs__item",c.a.tabItem,{"tabs__item--active":O===t}),style:y?{}:{outline:"none"},key:t,ref:function(e){return x.push(e)},onKeyDown:function(e){!function(e,t,a){switch(a.keyCode){case p:!function(e,t){var a=e.indexOf(t)+1;e[a]?e[a].focus():e[0].focus()}(e,t);break;case s:!function(e,t){var a=e.indexOf(t)-1;e[a]?e[a].focus():e[e.length-1].focus()}(e,t)}}(x,e.target,e),C(e)},onFocus:function(){return v(t)},onClick:function(){v(t),N(!1)},onPointerDown:function(){return N(!1)}},a)}))),r.a.createElement("div",{role:"tabpanel",className:"margin-vert--md"},n.Children.toArray(a).filter((function(e){return e.props.value===O}))[0]))}},92:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=function(e){return r.a.createElement("div",null,e.children)}},93:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(0),r=a.n(n),l=a(90),o=a(47),i=a.n(o);function c(e){var t=e.children;return r.a.createElement("span",{className:i.a.badgeGroup},t)}function s(e){var t=e.backend,a=e.frontend,n=e.tooling;return r.a.createElement(c,null,t&&r.a.createElement(l.a,{type:"warning"},"Backend"),a&&r.a.createElement(l.a,{type:"success"},"Frontend"),n&&r.a.createElement(l.a,{type:"primary"},"Tooling"))}}}]);