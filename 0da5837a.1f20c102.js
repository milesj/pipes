(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{102:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return m}));var a=t(0),i=t.n(a);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=i.a.createContext({}),s=function(e){var n=i.a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=s(e.components);return i.a.createElement(c.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},d=i.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=s(t),d=a,m=u["".concat(l,".").concat(d)]||u[d]||b[d]||r;return t?i.a.createElement(m,o(o({ref:n},c),{},{components:t})):i.a.createElement(m,o({ref:n},c))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,l=new Array(r);l[0]=d;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var c=2;c<r;c++)l[c]=t[c];return i.a.createElement.apply(null,l)}return i.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},103:function(e,n,t){"use strict";function a(e){var n,t,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(n=0;n<e.length;n++)e[n]&&(t=a(e[n]))&&(i&&(i+=" "),i+=t);else for(n in e)e[n]&&(i&&(i+=" "),i+=n);return i}n.a=function(){for(var e,n,t=0,i="";t<arguments.length;)(e=arguments[t++])&&(n=a(e))&&(i&&(i+=" "),i+=n);return i}},104:function(e,n,t){"use strict";var a=t(0),i=t(105);n.a=function(){var e=Object(a.useContext)(i.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},105:function(e,n,t){"use strict";var a=t(0),i=Object(a.createContext)(void 0);n.a=i},106:function(e,n,t){"use strict";t.d(n,"a",(function(){return r}));var a=t(0),i=t.n(a);function r(e){var n=e.children,t=e.type;return i.a.createElement("span",{className:"badge badge--"+t},n)}},107:function(e,n,t){"use strict";var a=t(0),i=t.n(a),r=t(104),l=t(103),o=t(56),p=t.n(o),c=37,s=39;n.a=function(e){var n=e.lazy,t=e.block,o=e.defaultValue,u=e.values,b=e.groupId,d=e.className,m=Object(r.a)(),h=m.tabGroupChoices,O=m.setTabGroupChoices,j=Object(a.useState)(o),f=j[0],g=j[1],N=a.Children.toArray(e.children);if(null!=b){var w=h[b];null!=w&&w!==f&&u.some((function(e){return e.value===w}))&&g(w)}var C=function(e){g(e),null!=b&&O(b,e)},y=[];return i.a.createElement("div",null,i.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(l.a)("tabs",{"tabs--block":t},d)},u.map((function(e){var n=e.value,t=e.label;return i.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":f===n,className:Object(l.a)("tabs__item",p.a.tabItem,{"tabs__item--active":f===n}),key:n,ref:function(e){return y.push(e)},onKeyDown:function(e){!function(e,n,t){switch(t.keyCode){case s:!function(e,n){var t=e.indexOf(n)+1;e[t]?e[t].focus():e[0].focus()}(e,n);break;case c:!function(e,n){var t=e.indexOf(n)-1;e[t]?e[t].focus():e[e.length-1].focus()}(e,n)}}(y,e.target,e)},onFocus:function(){return C(n)},onClick:function(){C(n)}},t)}))),n?Object(a.cloneElement)(N.filter((function(e){return e.props.value===f}))[0],{className:"margin-vert--md"}):i.a.createElement("div",{className:"margin-vert--md"},N.map((function(e,n){return Object(a.cloneElement)(e,{key:n,hidden:e.props.value!==f})}))))}},108:function(e,n,t){"use strict";var a=t(0),i=t.n(a);n.a=function(e){var n=e.children,t=e.hidden,a=e.className;return i.a.createElement("div",{role:"tabpanel",hidden:t,className:a},n)}},109:function(e,n,t){"use strict";t.d(n,"a",(function(){return c}));var a=t(0),i=t.n(a),r=t(106),l=t(55),o=t.n(l);function p(e){var n=e.children;return i.a.createElement("span",{className:o.a.badgeGroup},n)}function c(e){var n=e.backend,t=e.frontend,a=e.tooling;return i.a.createElement(p,null,n&&i.a.createElement(r.a,{type:"warning"},"Backend"),t&&i.a.createElement(r.a,{type:"success"},"Frontend"),a&&i.a.createElement(r.a,{type:"primary"},"Tooling"))}},68:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return s})),t.d(n,"toc",(function(){return u})),t.d(n,"default",(function(){return d}));var a=t(3),i=t(7),r=(t(0),t(102)),l=t(109),o=t(107),p=t(108),c={title:"Pipelines"},s={unversionedId:"pipeline",id:"pipeline",isDocsHomePage:!1,title:"Pipelines",description:"Pipe an input through a series of type-safe routines and tasks to produce an output, or simply, run",source:"@site/docs/pipeline.mdx",slug:"/pipeline",permalink:"/docs/pipeline",editUrl:"https://github.com/milesj/boost/edit/master/website/docs/pipeline.mdx",version:"current",sidebar:"docs",previous:{title:"Logging",permalink:"/docs/log"},next:{title:"Plugins",permalink:"/docs/plugin"}},u=[{value:"Installation",id:"installation",children:[]},{value:"Events",id:"events",children:[]},{value:"Pipelines",id:"pipelines",children:[{value:"Contexts",id:"contexts",children:[]},{value:"Input &amp; output types",id:"input--output-types",children:[]}]},{value:"Work types",id:"work-types",children:[{value:"<code>Task</code>",id:"task",children:[]},{value:"<code>Routine</code>",id:"routine",children:[]}]},{value:"Pipeline types",id:"pipeline-types",children:[{value:"Parallel",id:"parallel",children:[]},{value:"<code>ConcurrentPipeline</code>",id:"concurrentpipeline",children:[]},{value:"<code>AggregatedPipeline</code>",id:"aggregatedpipeline",children:[]},{value:"<code>PooledPipeline</code>",id:"pooledpipeline",children:[]},{value:"Serial",id:"serial",children:[]},{value:"<code>WaterfallPipeline</code>",id:"waterfallpipeline",children:[]}]},{value:"Caveats",id:"caveats",children:[{value:"Serial pipelines",id:"serial-pipelines",children:[]}]}],b={toc:u};function d(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},b,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)(l.a,{backend:!0,tooling:!0,mdxType:"EnvBadges"}),Object(r.b)("p",null,"Pipe an input through a series of type-safe routines and tasks to produce an output, or simply, run\nlogic in a series of stages."),Object(r.b)("h2",{id:"installation"},"Installation"),Object(r.b)(o.a,{groupId:"package-manager",defaultValue:"yarn",values:[{label:"Yarn",value:"yarn"},{label:"NPM",value:"npm"}],mdxType:"Tabs"},Object(r.b)(p.a,{value:"yarn",mdxType:"TabItem"},Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"yarn add @boost/pipeline\n"))),Object(r.b)(p.a,{value:"npm",mdxType:"TabItem"},Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"npm install @boost/pipeline\n")))),Object(r.b)("h2",{id:"events"},"Events"),Object(r.b)("table",null,Object(r.b)("thead",{parentName:"table"},Object(r.b)("tr",{parentName:"thead"},Object(r.b)("th",{parentName:"tr",align:null},"Event"),Object(r.b)("th",{parentName:"tr",align:null},"Arguments"),Object(r.b)("th",{parentName:"tr",align:null},"Description"))),Object(r.b)("tbody",{parentName:"table"},Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Pipeline#onAfterRun")),Object(r.b)("td",{parentName:"tr",align:null}),Object(r.b)("td",{parentName:"tr",align:null},"Called after the pipeline executes work units.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Pipeline#onBeforeRun")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"input: Input")),Object(r.b)("td",{parentName:"tr",align:null},"Called before the pipeline executes work units.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Pipeline#onRunWorkUnit")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"work: WorkUnit, input: Input")),Object(r.b)("td",{parentName:"tr",align:null},"Called before a single work unit is executed.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Routine#onCommand")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"command: string, args: string[]")),Object(r.b)("td",{parentName:"tr",align:null},"Called after ",Object(r.b)("inlineCode",{parentName:"td"},"execa")," was executed.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"Routine#onCommandData")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"command: string, line: string")),Object(r.b)("td",{parentName:"tr",align:null},"Called while a command is being executed.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"WorkUnit#onFail")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"error: Error")),Object(r.b)("td",{parentName:"tr",align:null},"Called when an execution fails.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"WorkUnit#onPass")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"output: Output")),Object(r.b)("td",{parentName:"tr",align:null},"Called when an execution succeeds.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"WorkUnit#onRun")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"input: Input")),Object(r.b)("td",{parentName:"tr",align:null},"Called before a work unit is executed. Can return ",Object(r.b)("inlineCode",{parentName:"td"},"true")," to skip the work unit.")),Object(r.b)("tr",{parentName:"tbody"},Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"WorkUnit#onSkip")),Object(r.b)("td",{parentName:"tr",align:null},Object(r.b)("inlineCode",{parentName:"td"},"input: Input")),Object(r.b)("td",{parentName:"tr",align:null},"Called when an execution is skipped.")))),Object(r.b)("h2",{id:"pipelines"},"Pipelines"),Object(r.b)("p",null,"A pipeline can be used to process an input, either in parallel or serial, through a series of\nactions known as work units, to produce an output. If you don't need an input, but merely need to\nprocess work in stages, the pipeline supports that as well. There are multiple types of\n",Object(r.b)("a",{parentName:"p",href:"#work-types"},"work units")," and ",Object(r.b)("a",{parentName:"p",href:"#pipeline-types"},"pipelines"),", so choose the best one for each use\ncase."),Object(r.b)("p",null,"To begin, instantiate a pipeline with a ",Object(r.b)("a",{parentName:"p",href:"#contexts"},"context"),", and an ",Object(r.b)("em",{parentName:"p"},"optional")," input value."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"import { Context, ConcurrentPipeline } from '@boost/pipeline';\nimport { referenceFunction } from './example';\n\nconst input = 123;\nconst pipeline = new ConcurrentPipeline(new Context(), input);\n")),Object(r.b)("p",null,"Once instantiated, we must register work units (either a ",Object(r.b)("a",{parentName:"p",href:"#task"},"task")," or ",Object(r.b)("a",{parentName:"p",href:"#routine"},"routine"),") that\nwill process the input value, either with ",Object(r.b)("inlineCode",{parentName:"p"},"ParallelPipeline#add()")," or ",Object(r.b)("inlineCode",{parentName:"p"},"SerialPipeline#pipe()"),". All\nwork units require a descriptive title, and are passed the context and current value when being\nexecuted."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"// Tasks\npipeline.add('Task using an anonymous function', (context, value) => value);\npipeline.add('Task using a function reference', referenceFunction);\npipeline.add(new Task('Task using a class instance', referenceFunction));\n\n// Routines\npipeline.add(new ExampleRoutine('key', 'Explicit routine using a class instance'));\n")),Object(r.b)("p",null,"And to finish, we can execute our pipeline to process each work unit and produce the final output\nvalue."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"const output = await pipeline.run();\n")),Object(r.b)("h3",{id:"contexts"},"Contexts"),Object(r.b)("p",null,"A ",Object(r.b)("inlineCode",{parentName:"p"},"Context")," is merely a plain class that provides contextual information to all work units, and is\npassed as the 1st argument when executing. It's highly encouraged to create custom contexts with\ntyped properties, helper methods, and more."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"import { Context } from '@boost/pipeline';\n\nexport default class ProcessContext extends Context {\n  readonly cwd: string;\n\n  readonly root: string;\n\n  constructor(root: string, cwd?: string) {\n    this.cwd = cwd || process.cwd();\n    this.root = root;\n  }\n}\n")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"A good example of context usage can be found in the\n",Object(r.b)("a",{parentName:"p",href:"https://github.com/beemojs/beemo/tree/master/packages/core/src/contexts"},"Beemo project"),".")),Object(r.b)("p",null,"A unique feature of contexts is the ability to deep clone itself using ",Object(r.b)("inlineCode",{parentName:"p"},"Context#clone()"),". This\nmethod is extremely useful when a context of the same shape must be passed to another pipeline\nwithout collisions or mutations occurring."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"const newContext = context.clone();\n")),Object(r.b)("h3",{id:"input--output-types"},"Input & output types"),Object(r.b)("p",null,"The input type is inferred from the 2nd constructor argument, while the output type defaults to the\ninput type. If you need to customize either the input or output type manually, the pipeline generics\ncan be customized upon instantiation."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"const pipeline = new ConcurrentPipeline<Context, number, string[]>(new Context(), 123);\n")),Object(r.b)("h2",{id:"work-types"},"Work types"),Object(r.b)("p",null,"There are 2 types of work units that can be registered in a pipeline."),Object(r.b)("h3",{id:"task"},Object(r.b)("inlineCode",{parentName:"h3"},"Task")),Object(r.b)("p",null,"A task is simply a function/method (in any form) that accepts an input and returns an output. It can\nbe represented by a standard function or a ",Object(r.b)("inlineCode",{parentName:"p"},"Task")," instance."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"import { Context } from '@boost/pipeline';\n\nfunction task(context: Context, value: number): string {\n  return value.toLocaleString();\n}\n\nparallelPipeline.add('A title for this task', task);\n")),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"import { Context, Task } from '@boost/pipeline';\n\nconst task = new Task('A title for this task', (context: Context, value: number) =>\n  value.toLocaleString(),\n);\n\nserialPipeline.pipe(task);\n")),Object(r.b)("h3",{id:"routine"},Object(r.b)("inlineCode",{parentName:"h3"},"Routine")),Object(r.b)("p",null,"A ",Object(r.b)("inlineCode",{parentName:"p"},"Routine")," is a specialized work unit implemented with a class. It provides helper methods, the\nability to create nested hierarchical pipelines, and an implicit encapsulation of similar logic and\ntasks."),Object(r.b)("p",null,"To begin, import the ",Object(r.b)("inlineCode",{parentName:"p"},"Routine")," class and implement the ",Object(r.b)("inlineCode",{parentName:"p"},"Routine#blueprint()")," and ",Object(r.b)("inlineCode",{parentName:"p"},"Routine#execute()"),"\nmethods. The class requires 3 generics to be defined, starting with an output type (defaults to\n",Object(r.b)("inlineCode",{parentName:"p"},"unknown"),"), an input type (defaults to ",Object(r.b)("inlineCode",{parentName:"p"},"unknown"),"), and an options interface (defaults to an empty\nobject)."),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"Routine#blueprint()")," method is inherited from ",Object(r.b)("a",{parentName:"p",href:"/docs/common#contract"},Object(r.b)("inlineCode",{parentName:"a"},"Contract")),", and should\nreturn an object that matches the structure of the generic options interface. The\n",Object(r.b)("inlineCode",{parentName:"p"},"Routine#execute()")," method should accept the input type and return the expected output type."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"import { Blueprint, Predicates, Bind } from '@boost/common';\nimport { Routine } from '@boost/pipeline';\n\ninterface ExampleOptions {\n  limit?: number;\n}\n\ntype Input = number;\ntype Output = string;\n\nexport default class ExampleRoutine extends Routine<Output, Input, ExampleOptions> {\n  blueprint({ number }: Predicates): Blueprint<ExampleOptions> {\n    return {\n      limit: number(10),\n    };\n  }\n\n  async execute(context: Context, value: Input): Promise<Output> {\n    return this.createWaterfallPipeline(context, value)\n      .pipe('Rounding to cents', this.roundToCents)\n      .pipe('Converting to readable format', this.makeReadable)\n      .pipe('Adding currency', this.addCurrency)\n      .run();\n  }\n\n  @Bind\n  roundToCents(context: Context, value: number): number {\n    return Number(value.toFixed(2));\n  }\n\n  @Bind\n  makeReadable(context: Context, value: number): string {\n    return value.toLocaleString();\n  }\n\n  @Bind\n  addCurrency(context: Context, value: string): string {\n    return `$${value}`;\n  }\n}\n")),Object(r.b)("p",null,"When instantiating a routine, a unique key and title must be provided, both of which are primarily\nused for streaming to a console. An options object can be passed as the 3rd argument."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"new ExampleRoutine('key', 'Custom title here', { limit: 5 });\n")),Object(r.b)("h4",{id:"creating-hierarchical-pipelines"},"Creating hierarchical pipelines"),Object(r.b)("p",null,"The most prominent feature of ",Object(r.b)("inlineCode",{parentName:"p"},"Routine")," is the ability to create hierarchical pipelines that can be\nnested or executed in any fashion. This can be achieved with the\n",Object(r.b)("inlineCode",{parentName:"p"},"Routine#createAggregatedPipeline()"),", ",Object(r.b)("inlineCode",{parentName:"p"},"createConcurrentPipeline()"),", ",Object(r.b)("inlineCode",{parentName:"p"},"createPooledPipeline()"),", and\n",Object(r.b)("inlineCode",{parentName:"p"},"createWaterfallPipeline()")," methods, all of which require a ",Object(r.b)("a",{parentName:"p",href:"#contexts"},"context")," and an initial\nvalue."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"class ExampleRoutine extends Routine<Item[]> {\n  async execute(context: Context, items: Item[]): Promise<Item[]> {\n    return this.createConcurrentPipeline(context, [])\n      .add('Load items from cache', this.loadItemsFromCache)\n      .add('Fetch remote items', this.fetchItems)\n      .add('Sort and enqueue items', () => {\n        return this.createWaterfallPipeline(context, items)\n          .pipe(new SortRoutine('sort', 'Sorting items'))\n          .pipe(new QueueRoutine('queue', 'Enqueueing items'))\n          .run(),\n      })\n      .run();\n  }\n}\n")),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"Routine#depth")," property denotes the current depth within the hierarchy tree, while\n",Object(r.b)("inlineCode",{parentName:"p"},"Routine#index")," is the current index amongst all work at the same depth."),Object(r.b)("h4",{id:"executing-local-binaries"},"Executing local binaries"),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"Routine#executeCommand()")," method can be used to execute binaries and commands on the host\nmachine (it uses ",Object(r.b)("a",{parentName:"p",href:"https://github.com/sindresorhus/execa"},"execa")," under the hood). This is extremely\nuseful for executing locally installed NPM/Yarn binaries."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"class ExampleRoutine extends Routine<string> {\n  async execute(context: Context): Promise<string> {\n    return this.executeCommand('babel', ['./src', '--out-dir', './lib'], {\n      preferLocal: true,\n    }).then((result) => result.stdout);\n  }\n}\n")),Object(r.b)("h2",{id:"pipeline-types"},"Pipeline types"),Object(r.b)("p",null,"There are 4 types of pipelines, grouped into parallel and serial based patterns."),Object(r.b)("h3",{id:"parallel"},"Parallel"),Object(r.b)("p",null,"Parallel pipelines register work units with ",Object(r.b)("inlineCode",{parentName:"p"},"ParallelPipeline#add()"),", and process the work units in\nparallel when executing ",Object(r.b)("inlineCode",{parentName:"p"},"ParallelPipeline#run()"),"."),Object(r.b)("h3",{id:"concurrentpipeline"},Object(r.b)("inlineCode",{parentName:"h3"},"ConcurrentPipeline")),Object(r.b)("p",null,"Executes all work units in parallel, and returns a list of values once all resolve. If an error\noccurs, the pipeline will be interrupted."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"import { Context, ConcurrentPipeline } from '@boost/pipeline';\n\nconst pipeline = new ConcurrentPipeline(new Context(), initialValue)\n  .add('First task', doSomething)\n  .add('Second task', anotherSomething)\n  .add('Final task', finalSomething);\n\nconst values = await pipeline.run();\n")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"This pipeline will run ",Object(r.b)("em",{parentName:"p"},"all")," work units at once. If there are far too many work units, it may\ndegrade performance. In that case, use ",Object(r.b)("a",{parentName:"p",href:"#pooledpipeline"},"PooledPipeline")," instead.")),Object(r.b)("h3",{id:"aggregatedpipeline"},Object(r.b)("inlineCode",{parentName:"h3"},"AggregatedPipeline")),Object(r.b)("p",null,"Executes all work units in parallel ",Object(r.b)("em",{parentName:"p"},"without")," interruption, and returns an object with a list of\n",Object(r.b)("inlineCode",{parentName:"p"},"errors")," and ",Object(r.b)("inlineCode",{parentName:"p"},"results")," once all resolve."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"import { Context, AggregatedPipeline } from '@boost/pipeline';\n\nconst pipeline = new AggregatedPipeline(new Context(), initialValue)\n  .add('First task', doSomething)\n  .add('Second task', anotherSomething)\n  .add('Final task', finalSomething);\n\nconst { errors, results } = await pipeline.run();\n")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"Like ",Object(r.b)("inlineCode",{parentName:"p"},"ConcurrentPipeline"),", all work units are ran at once. For performance improvements, use\n",Object(r.b)("a",{parentName:"p",href:"#pooledpipeline"},"PooledPipeline")," when dealing with a large number of work units.")),Object(r.b)("h3",{id:"pooledpipeline"},Object(r.b)("inlineCode",{parentName:"h3"},"PooledPipeline")),Object(r.b)("p",null,"Executes a distinct set of work units in parallel ",Object(r.b)("em",{parentName:"p"},"without")," interruption, based on a max concurrency\nlimit, until all work units have ran. Returns an object with a list of ",Object(r.b)("inlineCode",{parentName:"p"},"errors")," and ",Object(r.b)("inlineCode",{parentName:"p"},"results")," once\nall resolve."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"import { Context, PooledPipeline } from '@boost/pipeline';\n\nconst pipeline = new PooledPipeline(new Context(), initialValue)\n  .add('First task', doSomething)\n  .add('Second task', anotherSomething)\n  .add('Final task', finalSomething);\n\nconst { errors, results } = await pipeline.run();\n")),Object(r.b)("h4",{id:"options"},"Options"),Object(r.b)("p",null,"The following options can be passed as a 3rd argument to ",Object(r.b)("inlineCode",{parentName:"p"},"PooledPipeline"),"."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"concurrency")," (",Object(r.b)("inlineCode",{parentName:"li"},"number"),") - How many work units to process in parallel. Defaults to the number of\nCPUs."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"filo")," (",Object(r.b)("inlineCode",{parentName:"li"},"boolean"),") - Process with first-in-last-out (FILO) order, instead of first-in-first-out\n(FIFO). Defaults to ",Object(r.b)("inlineCode",{parentName:"li"},"false"),"."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"timeout")," (",Object(r.b)("inlineCode",{parentName:"li"},"number"),") - Timeout in milliseconds that each work unit may run, or ",Object(r.b)("inlineCode",{parentName:"li"},"0")," to avoid a\ntimeout. Defaults to ",Object(r.b)("inlineCode",{parentName:"li"},"0"),".")),Object(r.b)("h3",{id:"serial"},"Serial"),Object(r.b)("p",null,"Serial pipelines register work units in a sequence with ",Object(r.b)("inlineCode",{parentName:"p"},"SerialPipeline#pipe()"),", and process the\nwork units one by one when executing ",Object(r.b)("inlineCode",{parentName:"p"},"SerialPipeline#run()"),"."),Object(r.b)("h3",{id:"waterfallpipeline"},Object(r.b)("inlineCode",{parentName:"h3"},"WaterfallPipeline")),Object(r.b)("p",null,"Executes each work unit one by one, with the return value of the previous work unit being passed as\na value argument to the next work unit. Returns the final value once all resolve."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"import { Context, WaterfallPipeline } from '@boost/pipeline';\n\nconst pipeline = new WaterfallPipeline(new Context(), 1000)\n  .pipe('Multiply initial value', (ctx, value) => value * 3)\n  .pipe('Convert to a readable string', (ctx, value) => value.toLocaleString())\n  .pipe('Convert to an array for reasons unknown', (ctx, value) => [value]);\n\nconst finalValue = await pipeline.run(); // ['3,000']\n")),Object(r.b)("h2",{id:"caveats"},"Caveats"),Object(r.b)("h3",{id:"serial-pipelines"},"Serial pipelines"),Object(r.b)("p",null,Object(r.b)("a",{parentName:"p",href:"#serial"},"Serial pipelines")," are designed using a linked list, with each call to\n",Object(r.b)("inlineCode",{parentName:"p"},"SerialPipeline#pipe()")," returning a new instance. It was designed this way so that input and output\ntypes would cascade correctly down the chain. However, this pattern causes issues where pipes are\ncalled within conditionals, resulting in new pipes to be lost. For example, this is ",Object(r.b)("em",{parentName:"p"},"invalid"),"."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"const pipeline = new WaterfallPipeline(new Context());\n\nif (condition) {\n  pipeline.pipe('Do this', thisAction);\n} else {\n  pipeline.pipe('Do that', thatAction);\n}\n\nawait pipeline\n  .pipe('Then finish', finishAction)\n  .run();\n")),Object(r.b)("p",null,"While this is technically valid (note the ",Object(r.b)("inlineCode",{parentName:"p"},"let")," and ",Object(r.b)("inlineCode",{parentName:"p"},"pipeline")," assignment), but will break down if\ntypes conflict."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"let pipeline = new WaterfallPipeline(new Context());\n\nif (condition) {\n  pipeline = pipeline.pipe('Do this', thisAction);\n} else {\n  pipeline = pipeline.pipe('Do that', thatAction);\n}\n\nawait pipeline\n  .pipe('Then finish', finishAction)\n  .run();\n")),Object(r.b)("p",null,"Instead, it's suggested to use separate pipelines within each conditional block. This approach\nrequires a bit of duplication, but avoids all other issues."),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-ts"},"if (condition) {\n  await new WaterfallPipeline(new Context())\n    .pipe('Do this', thisAction)\n    .pipe('Then finish', finishAction)\n    .run()\n} else {\n  await new WaterfallPipeline(new Context())\n    .pipe('Do that', thatAction)\n    .pipe('Then finish', finishAction)\n    .run()\n}\n")))}d.isMDXComponent=!0}}]);