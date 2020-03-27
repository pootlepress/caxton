(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var _layoutBlocks=require("./layout-blocks/layout-blocks.es6");function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}!function(e,t,o,a,l){var n=l.SelectControl,i=l.TextControl,s=l.ToggleControl,r=l.RangeControl,c=t.createBlock,d=caxtonWPEditor.InspectorControls,p=a.__;(0,_layoutBlocks.CaxtonLayoutBlocksSetup)(e,wp),CaxtonBlock({id:"hero",title:"Cover with button",icon:"archive",category:"caxton",tpl:'<div class="cover bg-center{{Full width}}" style="background-image:url({{Background image}});{{Background parallax}}"><div class="pv4 min-h-7 dt w-100 center-mid-children {{Dim image}}{{Full height}}"><div class="tc white ph3 ph4-l{{Text position}}"><h2 style="color:{{Title color}};font-size:{{Title size}}px">{{Title}}</h2><div style="margin: 0 1em 1em;color:{{Sub-title color}};font-size:{{Sub-title size}}px">{{Sub-title}}</div><a href="{{Button Link}}" class="no-underline tc {{Buttons style}} pa2" style="color:{{Button text color}};background:{{Button background color}};font-size:{{Button size}}px">{{Call to action button}}</a></div></div></div>',fields:{"Background image":"image","Dim image":{type:"radio",options:[{value:" bg-white-50",label:"Lighter"},{value:" bg-white-30",label:"Light"},{value:" ",label:"Don't dim"},{value:" bg-black-20",label:"Dark"},{value:" bg-black-40",label:"Darker"}],default:" bg-black-20"},"Text position":{type:"radio",options:[{value:" mba",label:"Top"},{value:" mva",label:"Center"},{value:" mta",label:"Bottom"}],default:" mva"},"Background parallax":{type:"toggle",value:"background-attachment:fixed;"},"Full width":{type:"toggle",value:" vw-100"},"Full height":{type:"toggle",value:" min-vh-100"},Title:{type:"editable",default:"Click here to edit title"},"Title color":{type:"color",default:"#fff"},"Title size":{type:"range",default:"20"},"Sub-title":{type:"editable",default:"Edit sub-title"},"Sub-title color":{type:"color",default:"#fff"},"Sub-title size":{type:"range",default:"16"},"Call to action button":{type:"editable",default:"Button"},"Button Link":{type:"text",default:"#"},"Button size":{type:"range",default:"16"},"Button text color":{type:"color",default:"#444"},"Button background color":{type:"color",default:"#eee"},"Buttons style":{type:"radio",options:[{value:"br0",label:"Boxed corners"},{value:"br3",label:"Rounded corners"},{value:"ph3 br-pill",label:"Pill"}],default:"br2"}}}),CaxtonBlock({id:"social-share-icons",title:"Social share icons",icon:"admin-links",category:"caxton",tpl:'<div class="pv4 ph2 {{All caps}} tc-l">\n<a class="no-underline white-80 hover-white inline-flex items-center ma2 tc {{Buttons style}} pa2" href="https://www.facebook.com/sharer/sharer.php?u={{Share URL}}" title="Facebook" style="background-color:#3b5998"><svg class="dib h2 w2" fill="currentColor" enable-background="new 0 0 470.513 470.513" version="1.1" viewBox="0 0 470.51 470.51" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m271.52 154.17v-40.541c0-6.086 0.28-10.8 0.849-14.13 0.567-3.335 1.857-6.615 3.859-9.853 1.999-3.236 5.236-5.47 9.706-6.708 4.476-1.24 10.424-1.858 17.85-1.858h40.539v-81.08h-64.809c-37.5 0-64.433 8.897-80.803 26.691-16.368 17.798-24.551 44.014-24.551 78.658v48.82h-48.542v81.086h48.539v235.26h97.362v-235.26h64.805l8.566-81.086h-73.37z"/></svg><span class="f6 ml2">Facebook</span></a><a class="no-underline white-80 hover-white inline-flex items-center ma2 tc {{Buttons style}} {{All caps}} pa2" href="http://pinterest.com/pin/create/bookmarklet/?media=&url={{Share URL}}" title="Pinterest" style="background-color:#bd081c"><svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title id="simpleicons-pinterest-icon">Pinterest icon</title><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg><span class="f6 ml2">Pinterest</span></a><a class="no-underline white-80 hover-white inline-flex items-center ma2 tc {{Buttons style}} {{All caps}} pa2" href="http://twitter.com/share?url={{Share URL}}" title="Twitter" style="background-color:#1da1f2"><svg class="dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.375-1.337.648-2.085.795-.598-.638-1.45-1.036-2.396-1.036-1.812 0-3.282 1.468-3.282 3.28 0 .258.03.51.085.75C5.152 5.39 2.733 4.084 1.114 2.1.83 2.583.67 3.147.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.416-.02-.617-.058.418 1.304 1.63 2.253 3.067 2.28-1.124.88-2.54 1.404-4.077 1.404-.265 0-.526-.015-.783-.045 1.453.93 3.178 1.474 5.032 1.474 6.038 0 9.34-5 9.34-9.338 0-.143-.004-.284-.01-.425.64-.463 1.198-1.04 1.638-1.7z" fill-rule="nonzero"/></svg><span class="f6 ml2">Twitter</span></a><a class="no-underline white-80 hover-white inline-flex items-center ma2 tc {{Buttons style}} {{All caps}} pa2" href="mailto:?body={{Share URL}}" title="Mail" style="background-color:#ea4335"><svg class="dib h2 w2" fill="currentColor" enable-background="new 0 0 511.626 511.626" version="1.1" viewBox="0 0 511.63 511.63" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m49.106 178.73c6.472 4.567 25.981 18.131 58.528 40.685 32.548 22.554 57.482 39.92 74.803 52.099 1.903 1.335 5.946 4.237 12.131 8.71 6.186 4.476 11.326 8.093 15.416 10.852 4.093 2.758 9.041 5.852 14.849 9.277 5.806 3.422 11.279 5.996 16.418 7.7 5.14 1.718 9.898 2.569 14.275 2.569h0.575c4.377 0 9.137-0.852 14.277-2.569 5.137-1.704 10.615-4.281 16.416-7.7 5.804-3.429 10.752-6.52 14.845-9.277 4.093-2.759 9.229-6.376 15.417-10.852 6.184-4.477 10.232-7.375 12.135-8.71 17.508-12.179 62.051-43.11 133.62-92.79 13.894-9.703 25.502-21.411 34.827-35.116 9.332-13.699 13.993-28.07 13.993-43.105 0-12.564-4.523-23.319-13.565-32.264-9.041-8.947-19.749-13.418-32.117-13.418h-420.26c-14.655 0-25.933 4.948-33.832 14.844-7.898 9.898-11.847 22.27-11.847 37.115 0 11.991 5.236 24.985 15.703 38.974 10.466 13.99 21.604 24.983 33.403 32.976z"/><path d="m483.07 209.28c-62.424 42.251-109.82 75.087-142.18 98.501-10.849 7.991-19.65 14.229-26.409 18.699-6.759 4.473-15.748 9.041-26.98 13.702-11.228 4.668-21.692 6.995-31.401 6.995h-0.578c-9.707 0-20.177-2.327-31.405-6.995-11.228-4.661-20.223-9.229-26.98-13.702-6.755-4.47-15.559-10.708-26.407-18.699-25.697-18.842-72.995-51.68-141.9-98.501-10.852-7.228-20.464-15.513-28.839-24.838v226.68c0 12.57 4.471 23.319 13.418 32.265 8.945 8.949 19.701 13.422 32.264 13.422h420.27c12.56 0 23.315-4.473 32.261-13.422 8.949-8.949 13.418-19.694 13.418-32.265v-226.68c-8.186 9.132-17.7 17.417-28.555 24.838z"/></svg><span class="f6 ml2">Mail</span></a></ul>',fields:{"Share URL":{type:"text",help:"Please specify a url for users to share",default:""},"All caps":{type:"toggle",value:"ttu"},"Buttons style":{type:"radio",options:[{value:"br0",label:"Boxed corners"},{value:"br3",label:"Rounded corners"},{value:"ph3 br-pill",label:"Pill"}],default:"br2"}}}),CaxtonBlock({id:"super-text",title:"Super Text",icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g><path d="M18 3v2H2V3h16zm-6 4v2H2V7h10zm6 0v2h-4V7h4zM8 11v2H2v-2h6zm10 0v2h-8v-2h8zm-4 4v2H2v-2h12z"/></g></svg>',category:"caxton",tpl:'<{{Element Tag}} class="{{Alignment}}" style="{{Letter Spacing}}{{Margin top}}{{Margin bottom}}{{Inner Padding}}{{Left/right Inner Padding}}{{Weight}}{{Font}}{{Text color}}{{Background color}}{{Font size}}{{Line height}}{{Text Glow/Shadow}}" data-mobile-css="{{Font size mobile}}" data-tablet-css="{{Font size tablet}}" data-desktop-css="{{Font size}}"><span class="{{Lines as wide as content}}">{{Overline}}{{Text}}{{Underline}}</span></{{Element Tag}}>',transforms:{from:[{type:"block",blocks:["core/paragraph"],transform:function(e){var t=e.content;return c("caxton/super-text",{Text:Caxton.el2html(t)})}},{type:"block",blocks:["core/heading"],transform:function(e){var t=e.content,o=e.nodeName;return c("caxton/super-text",{Text:Caxton.el2html(t),"Element Tag":o.toLowerCase()})}},{type:"block",blocks:["core/subhead"],transform:function(e){var t=e.content;return c("caxton/super-text",{Text:Caxton.el2html(t)})}}]},toolbars:{Alignment:"AlignmentToolbar"},fields:{Text:{type:"editable",default:"Click here to edit text"},"Element Tag":{type:"radio",section:"Layout",options:[{value:"p",label:"Paragraph"},{value:"h1",label:"Heading 1"},{value:"h2",label:"Heading 2"},{value:"h3",label:"Heading 3"},{value:"h4",label:"Heading 4"},{value:"h5",label:"Heading 5"},{value:"h6",label:"Heading 6"},{value:"div",label:"Normal div"}],default:"p"},"Background color":{type:"color",tpl:"background-color:%s;",section:"Layout"},Font:{type:"font",tpl:"font-family:%s;",section:"Typography"},"Letter Spacing":{type:"range",max:25,min:-5,tpl:"letter-spacing:%spx;",section:"Typography"},"Font size":{type:"range",min:5,max:250,tpl:"font-size:%spx;",section:"Typography"},"Line height":{type:"range",min:.5,max:5,step:.1,tpl:"line-height:%s;",section:"Typography"},"Font size tablet":{type:"range",min:5,max:250,tpl:"font-size:%spx;",section:"Typography"},"Font size mobile":{type:"range",min:5,max:250,tpl:"font-size:%spx;",section:"Typography"},Weight:{type:"range",min:100,max:900,step:100,default:400,help:"Effect of weight depends on support by selected font.",tpl:"font-weight:%s;",section:"Typography"},"Text color":{type:"color",default:"#555",tpl:"color:%s;",section:"Typography"},Overline:{type:"select",options:[{value:"",label:"None"},{value:'<div style="border-bottom: 2px dotted {{Line color}};margin-bottom:{{Line spacing}};"></div>',label:"Dotted"},{value:'<div style="border-bottom: 2px dashed {{Line color}};margin-bottom:{{Line spacing}};"></div>',label:"Dashed"},{value:'<div style="border-bottom: 1px solid {{Line color}};margin-bottom:{{Line spacing}};"></div>',label:"Thin"},{value:'<div style="padding:1px;border-top: 1px solid {{Line color}};border-bottom: 1px solid {{Line color}};margin-bottom:{{Line spacing}};"></div>',label:"Thin + Thin"},{value:'<div style="padding:1px;border-top: 1px solid {{Line color}};border-bottom: 2px solid {{Line color}};margin-bottom:{{Line spacing}};"></div>',label:"Thin + Thick"},{value:'<div style="padding:1px;border-top: 2px solid {{Line color}};border-bottom: 1px solid {{Line color}};margin-bottom:{{Line spacing}};"></div>',label:"Thick + Thin"},{value:'<div style="border-bottom: 2px solid {{Line color}};margin-bottom:{{Line spacing}};"></div>',label:"Thick"}],section:"Underline & Overline"},Underline:{type:"select",options:[{value:"",label:"None"},{value:'<div style="border-bottom: 2px dotted {{Line color}};margin-top:{{Line spacing}};"></div>',label:"Dotted"},{value:'<div style="border-bottom: 2px dashed {{Line color}};margin-top:{{Line spacing}};"></div>',label:"Dashed"},{value:'<div style="border-bottom: 1px solid {{Line color}};margin-top:{{Line spacing}};"></div>',label:"Thin"},{value:'<div style="padding:1px;border-top: 1px solid {{Line color}};border-bottom: 1px solid {{Line color}};margin-top:{{Line spacing}};"></div>',label:"Thin + Thin"},{value:'<div style="padding:1px;border-top: 1px solid {{Line color}};border-bottom: 2px solid {{Line color}};margin-top:{{Line spacing}};"></div>',label:"Thin + Thick"},{value:'<div style="padding:1px;border-top: 2px solid {{Line color}};border-bottom: 1px solid {{Line color}};margin-top:{{Line spacing}};"></div>',label:"Thick + Thin"},{value:'<div style="border-bottom: 2px solid {{Line color}};margin-top:{{Line spacing}};"></div>',label:"Thick"}],section:"Underline & Overline"},"Lines as wide as content":{type:"toggle",value:" dib",section:"Underline & Overline"},"Line color":{type:"color",section:"Underline & Overline"},"Line spacing":{type:"range",min:-.5,max:2.5,step:.1,tpl:"%sem;",section:"Underline & Overline"},"Text Glow/Shadow":{type:"select",options:[{value:"",label:"No shadow/glow"},{value:"255,255,255",label:"Glow"},{value:"0,0,0",label:"Shadow"}],section:"Glow/Shadow",tpl:"text-shadow:{{Shadow position}} {{Shadow Blur}} rgba(%s,{{Shadow Strength}});"},"Shadow position":{type:"select",options:[{value:"calc( -2px + -.05em ) calc( 2px + .03em )",label:"Far Left"},{value:"calc( -1px + -.03em ) calc( 1px + .01em )",label:"Left"},{value:"0 0",label:"Center"},{value:"calc( 1px + .03em ) calc( 1px + .01em )",label:"Right"},{value:"calc( 2px + .05em ) calc( 2px + .03em )",label:"Far Right"}],default:"0 0",section:"Glow/Shadow"},"Shadow Blur":{type:"range",tpl:"%spx ",default:3,max:25,section:"Glow/Shadow"},"Shadow Strength":{type:"range",min:.1,step:.1,default:.1,max:1,section:"Glow/Shadow"},"Margin top":{type:"range",section:"Margin/Padding",min:0,max:10,step:.5,tpl:"margin-top:%sem;"},"Margin bottom":{type:"range",section:"Margin/Padding",min:0,max:10,step:.5,tpl:"margin-bottom:%sem;"},"Inner Padding":{type:"range",section:"Margin/Padding",min:0,max:10,step:.5,tpl:"padding:%sem calc( .5em + %sem );"},"Left/right Inner Padding":{type:"range",section:"Margin/Padding",min:0,max:10,step:.5,tpl:"padding-left:%sem;padding-right:%sem;"}}}),CaxtonBlock({id:"super-button",title:"Button",icon:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M17 5H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm1 7c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h14c.6 0 1 .4 1 1v5z"></path></svg>',category:"caxton",tpl:'<div class="{{Alignment}}{{BlockAlignment}}" style="{{Margin top}}{{Margin bottom}}"><a class="caxton-btn no-underline dib {{Text Glow/Shadow}}" href="{{URL}}" data-hover-css="{{Hover Text color}}{{Hover Background color}}{{Hover Border color}}" style="{{Letter Spacing}}{{Weight}}{{Font}}{{Text color}}{{Background color}}{{Button size}}border:{{Border weight}} solid {{Border color}};padding:{{Inner Padding top/bottom}} {{Inner Padding left/right}};{{Rounded Corners}}{{Button Glow/Shadow}};" data-mobile-css="{{Font size mobile}}" data-tablet-css="{{Font size tablet}}" data-desktop-css="{{Button size}}">{{Icon before text}}{{Text}}{{Icon after text}}</a></div>',transforms:{from:[{type:"block",blocks:["core/button"],transform:function(e){var t=e.text,o=e.url,a=e.textColor,l=e.color;return c("caxton/super-button",{Text:Caxton.el2html(t),URL:o,"Text color":a,"Background color":l})}}]},toolbars:{Alignment:"AlignmentToolbar",BlockAlignment:"BlockAlignToolbar"},fields:{Text:{type:"editable",default:"Click here to edit text"},URL:{type:"text",default:"#"},"Text color":{type:"color",default:"#555",tpl:"color:%s;"},"Background color":{type:"color",tpl:"background-color:%s;"},"Button size":{type:"range",min:5,max:250,tpl:"font-size:%spx;"},Font:{type:"font",tpl:"font-family:%s;",section:"Typography"},"Letter Spacing":{type:"range",max:25,min:-5,default:2,tpl:"letter-spacing:%spx;",section:"Typography"},"Font size tablet":{type:"range",min:5,max:250,tpl:"font-size:%spx;",section:"Typography"},"Font size mobile":{type:"range",min:5,max:250,tpl:"font-size:%spx;",section:"Typography"},Weight:{type:"range",min:100,max:800,step:100,default:400,help:"Effect of weight depends on support by selected font.",tpl:"font-weight:%s;",section:"Typography"},"Inner Padding left/right":{type:"range",section:"Margin/Padding",min:0,default:1,max:5,step:.05,tpl:"%sem"},"Inner Padding top/bottom":{type:"range",section:"Margin/Padding",min:0,default:.5,max:5,step:.05,tpl:"%sem"},"Margin top":{type:"range",section:"Margin/Padding",min:0,max:10,step:.5,tpl:"margin-top:%sem;"},"Margin bottom":{type:"range",section:"Margin/Padding",min:0,max:10,step:.5,tpl:"margin-bottom:%sem;"},"Border color":{type:"color",section:"Border"},"Border weight":{type:"range",min:0,default:2,max:50,tpl:"%spx ",section:"Border"},"Rounded Corners":{type:"range",section:"Border",min:0,max:50,tpl:"border-radius:%spx;"},"Icons color":{type:"color",tpl:"color:%s;",section:"Button icons"},"Icons size":{type:"slider",min:.2,max:5,step:.2,tpl:"font-size:%sem;",section:"Button icons"},"Icon before text":{type:"icon",tpl:function(e){return-1===e.indexOf("<svg")?'<i class="%s" class="{{Icons size}}{{Icons color}}"></i>':'<i class="caxton-icon" style="{{Icons size}}{{Icons color}}">%s</i>'},section:"Button icons"},"Icon after text":{type:"icon",tpl:function(e){return-1===e.indexOf("<svg")?'<i class="%s" class="{{Icons size}}{{Icons color}}"></i>':'<i class="caxton-icon" style="{{Icons size}}{{Icons color}}">%s</i>'},section:"Button icons"},"Hover Text color":{type:"color",default:"#555",tpl:"color:%s;",section:"Hover Colors"},"Hover Background color":{type:"color",tpl:"background-color:%s;",section:"Hover Colors"},"Hover Border color":{type:"color",section:"Hover Colors",tpl:"border-color:%s;"},"Text Glow/Shadow":{type:"select",options:[{value:"",label:"None"},{value:" text-glow",label:"Glow"},{value:" text-shadow",label:"Shadow"}],section:"Button Glow/Shadow"},"Button Glow/Shadow":{type:"select",options:[{value:"",label:"No shadow/glow"},{value:"255,255,255",label:"Glow"},{value:"0,0,0",label:"Shadow"}],section:"Button Glow/Shadow",tpl:"box-shadow:{{Shadow position}} {{Blur}} {{Spread}} rgba(%s,{{Strength}});"},"Shadow position":{type:"select",options:[{value:"calc( -2px + -.05em ) calc( 2px + .03em )",label:"Far Left"},{value:"calc( -1px + -.03em ) calc( 1px + .01em )",label:"Left"},{value:"0 0",label:"Center"},{value:"calc( 1px + .03em ) calc( 1px + .01em )",label:"Right"},{value:"calc( 2px + .05em ) calc( 2px + .03em )",label:"Far Right"}],default:"0 0",section:"Button Glow/Shadow"},Spread:{type:"range",tpl:"%spx",default:2,max:25,section:"Button Glow/Shadow"},Blur:{type:"range",tpl:"%spx",default:8,max:25,section:"Button Glow/Shadow"},Strength:{type:"range",min:.1,step:.1,default:.2,max:1,section:"Button Glow/Shadow"}}}),CaxtonBlock({id:"super-icon",title:"Icon",icon:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M211.7 241.1v51.7c0 2.1-1.6 3.7-3.7 3.7h-22.2c-2.1 0-3.7-1.6-3.7-3.7v-51.7c0-2.1 1.6-3.7 3.7-3.7H208c2.1 0 3.7 1.6 3.7 3.7zm114.5-3.7H304c-2.1 0-3.7 1.6-3.7 3.7v51.7c0 2.1 1.6 3.7 3.7 3.7h22.2c2.1 0 3.7-1.6 3.7-3.7v-51.7c-.1-2.1-1.7-3.7-3.7-3.7zm-29.1 263.2c-.9.1-1.7.3-2.6.4-1 .2-2.1.3-3.1.5-.9.1-1.8.3-2.8.4-1 .1-2 .3-3 .4-1 .1-2 .2-2.9.3-1 .1-1.9.2-2.9.3-1 .1-2.1.2-3.1.3-.9.1-1.8.2-2.7.2-1.1.1-2.3.1-3.4.2-.8 0-1.7.1-2.5.1-1.3.1-2.6.1-3.9.1-.7 0-1.4.1-2.1.1-2 0-4 .1-6 .1s-4 0-6-.1c-.7 0-1.4 0-2.1-.1-1.3 0-2.6-.1-3.9-.1-.8 0-1.7-.1-2.5-.1-1.1-.1-2.3-.1-3.4-.2-.9-.1-1.8-.1-2.7-.2-1-.1-2.1-.2-3.1-.3-1-.1-1.9-.2-2.9-.3-1-.1-2-.2-2.9-.3-1-.1-2-.2-3-.4-.9-.1-1.8-.3-2.8-.4-1-.1-2.1-.3-3.1-.5-.9-.1-1.7-.3-2.6-.4-65.6-10.9-122.5-47.7-160-99.4-.2-.2-.3-.5-.5-.7-.8-1.1-1.6-2.2-2.3-3.3-.3-.4-.6-.8-.8-1.2-.7-1.1-1.4-2.1-2.1-3.2-.3-.5-.6-.9-.9-1.4-.7-1.1-1.4-2.1-2-3.2-.3-.5-.6-.9-.9-1.4-.7-1.1-1.3-2.2-2-3.3-.2-.4-.5-.8-.7-1.2-2.4-4-4.6-8.1-6.8-12.2-.1-.2-.2-.3-.3-.5-.6-1.1-1.1-2.2-1.7-3.3-.3-.6-.6-1.1-.8-1.7-.5-1-1-2.1-1.5-3.1-.3-.7-.6-1.3-.9-2-.5-1-.9-2-1.4-3l-.9-2.1c-.4-1-.9-2-1.3-3-.3-.7-.6-1.5-.9-2.2l-1.2-3c-.3-.8-.6-1.5-.9-2.3-.4-1-.8-2-1.1-3-.3-.9-.6-1.8-1-2.8-.6-1.6-1.1-3.3-1.7-4.9-.3-.9-.6-1.8-.9-2.8-.3-.9-.5-1.8-.8-2.7-.3-.9-.6-1.9-.8-2.8-.3-.9-.5-1.8-.8-2.7-.3-1-.5-1.9-.8-2.9-.2-.9-.5-1.8-.7-2.7-.3-1-.5-2-.7-3-.2-.9-.4-1.7-.6-2.6-.2-1.1-.5-2.2-.7-3.2-.2-.8-.3-1.6-.5-2.4-.3-1.3-.5-2.7-.8-4-.1-.6-.2-1.1-.3-1.7l-.9-5.7c-.1-.6-.2-1.3-.3-1.9-.2-1.3-.4-2.6-.5-3.9-.1-.8-.2-1.5-.3-2.3-.1-1.2-.3-2.4-.4-3.6-.1-.8-.2-1.6-.2-2.4-.1-1.2-.2-2.4-.3-3.5-.1-.8-.1-1.6-.2-2.4-.1-1.2-.2-2.4-.2-3.7 0-.8-.1-1.5-.1-2.3-.1-1.3-.1-2.7-.2-4 0-.7 0-1.3-.1-2 0-2-.1-4-.1-6 0-53.5 16.9-103 45.8-143.6 2.3-3.2 4.7-6.4 7.1-9.5 4.9-6.2 10.1-12.3 15.6-18 2.7-2.9 5.5-5.7 8.4-8.4 2.9-2.7 5.8-5.4 8.8-8 4.5-3.9 9.1-7.6 13.9-11.2 1.6-1.2 3.2-2.4 4.8-3.5C140 34.2 171.7 20.1 206 13c16.1-3.3 32.9-5 50-5s33.8 1.7 50 5c34.3 7 66 21.1 93.6 40.7 1.6 1.2 3.2 2.3 4.8 3.5 4.8 3.6 9.4 7.3 13.9 11.2 12 10.4 23 21.9 32.8 34.4 2.5 3.1 4.8 6.3 7.1 9.5C487.1 153 504 202.5 504 256c0 2 0 4-.1 6 0 .7 0 1.3-.1 2 0 1.3-.1 2.7-.2 4 0 .8-.1 1.5-.1 2.3-.1 1.2-.1 2.4-.2.7-.1.8-.1 1.6-.2 2.4-.1 1.2-.2 2.4-.3 3.5-.1.8-.2 1.6-.2 2.4-.1 1.2-.3 2.4-.4 3.6-.1.8-.2 1.5-.3 2.3-.2 1.3-.4 2.6-.5 3.9-.1.6-.2 1.3-.3 1.9l-.9 5.7c-.1.6-.2 1.1-.3 1.7-.2 1.3-.5 2.7-.8 4-.2.8-.3 1.6-.5 2.4-.2 1.1-.5 2.2-.7 3.2-.2.9-.4 1.7-.6 2.6-.2 1-.5 2-.7 3-.2.9-.5 1.8-.7 2.7-.3 1-.5 1.9-.8 2.9-.2.9-.5 1.8-.8 2.7-.3.9-.6 1.9-.8 2.8-.3.9-.5 1.8-.8 2.7-.3.9-.6 1.8-.9 2.8-.5 1.6-1.1 3.3-1.7 4.9-.3.9-.6 1.8-1 2.8-.4 1-.7 2-1.1 3-.3.8-.6 1.5-.9 2.3l-1.2 3c-.3.7-.6 1.5-.9 2.2-.4 1-.8 2-1.3 3l-.9 2.1c-.4 1-.9 2-1.4 3-.3.7-.6 1.3-.9 2-.5 1-1 2.1-1.5 3.1-.3.6-.6 1.1-.8 1.7-.6 1.1-1.1 2.2-1.7 3.3-.1.2-.2.3-.3.5-2.2 4.1-4.4 8.2-6.8 12.2-.2.4-.5.8-.7 1.2-.7 1.1-1.3 2.2-2 3.3-.3.5-.6.9-.9 1.4-.7 1.1-1.4 2.1-2 3.2-.3.5-.6.9-.9 1.4-.7 1.1-1.4 2.1-2.1 3.2-.3.4-.6.8-.8 1.2-.8 1.1-1.5 2.2-2.3 3.3-.2.2-.3.5-.5.7-37.6 54.7-94.5 91.4-160.1 102.4zm117.3-86.2c13-13 24.2-27.4 33.6-42.9v-71.3c0-2.1-1.6-3.7-3.7-3.7h-22.2c-2.1 0-3.7 1.6-3.7 3.7V326h-29.5V182c0-2.1-1.6-3.7-3.7-3.7h-22.1c-2.1 0-3.7 1.6-3.7 3.7v25.9h-29.5V182c0-2.1-1.6-3.7-3.7-3.7H304c-2.1 0-3.7 1.6-3.7 3.7v25.9h-29.5V182c0-4.8-6.5-3.7-9.5-3.7v-30.7c6.7-1.6 13.8-2.8 20.8-2.8 8.8 0 16.8 3.5 25.4 3.5 3.7 0 22.4-.9 22.4-6.5V93.4c0-2.1-1.6-3.7-3.7-3.7-4.2 0-12.2 3.5-19.4 3.5-7.9 0-16.9-3.5-26.3-3.5-6.5 0-12.9.9-19.2 2.3v-3.9c4.4-2.1 7.4-6.7 7.4-11.5 0-16.8-25.4-16.8-25.4 0 0 4.8 3 9.5 7.4 11.5v90.2c-3 0-9.5-1.1-9.5 3.7v25.9h-29.5V182c0-2.1-1.6-3.7-3.7-3.7h-22.2c-2.1 0-3.7 1.6-3.7 3.7v25.9h-29.5V182c0-2.1-1.6-3.7-3.7-3.7h-22.1c-2.1 0-3.7 1.6-3.7 3.7v144H93.5v-25.8c0-2.1-1.6-3.7-3.7-3.7H67.7c-2.1 0-3.7 1.6-3.7 3.7v71.3c9.4 15.5 20.6 29.9 33.6 42.9 20.6 20.6 44.5 36.7 71.2 48 13.9 5.9 28.2 10.3 42.9 13.2v-75.8c0-58.6 88.6-58.6 88.6 0v75.8c14.7-2.9 29-7.4 42.9-13.2 26.7-11.3 50.6-27.4 71.2-48"/></svg>',category:"caxton",tpl:function(e,t){return-1===e.attributes.Icon.indexOf("<svg")?'<div class="{{Alignment}}{{BlockAlignment}}" style="{{Margin top}}{{Margin bottom}}"><a {{URL}} class="no-underline caxton-icon {{Glow/Shadow}}{{Icon}}" data-hover-css="{{Hover icon color}}{{Hover Background color}}{{Hover Border color}}" style="{{Icon color}}{{Background color}}{{Icon size}}border:{{Border weight}} solid {{Border color}};{{Inner Padding}}{{Rounded Corners}};{{Icon Glow/Shadow}};" data-mobile-css="{{Icon size mobile}}" data-tablet-css="{{Icon size tablet}}" data-desktop-css="{{Icon size}}"><span style="display:none;">&nbsp;</span></a></div>':'<div class="{{Alignment}}{{BlockAlignment}}" style="{{Margin top}}{{Margin bottom}}"><a {{URL}} class="no-underline caxton-icon {{Glow/Shadow}}" data-hover-css="{{Hover icon color}}{{Hover Background color}}{{Hover Border color}}" style="{{Icon color}}{{Background color}}{{Icon size}}border:{{Border weight}} solid {{Border color}};{{Inner Padding}}{{Rounded Corners}};{{Icon Glow/Shadow}};" data-mobile-css="{{Icon size mobile}}" data-tablet-css="{{Icon size tablet}}" data-desktop-css="{{Icon size}}">{{Icon}}</a></div>'},toolbars:{Alignment:"AlignmentToolbar",BlockAlignment:"BlockAlignToolbar"},fields:{Icon:{type:"icon",default:" fab fa-font-awesome-flag"},URL:{help:"Type in a URL to make icon link to it.",type:"text",tpl:'href="%s"'},"Icon color":{type:"color",default:"#555",tpl:"color:%s;"},"Icon size":{type:"range",min:5,max:250,default:16,tpl:"font-size:%spx;",section:"Icon size"},"Icon size tablet":{type:"range",min:5,max:250,tpl:"font-size:%spx;",section:"Icon size"},"Icon size mobile":{type:"range",min:5,max:250,tpl:"font-size:%spx;",section:"Icon size"},"Inner Padding":{type:"range",section:"Margin/Padding",min:0,default:.25,max:5,step:.05,tpl:"padding:%sem;"},"Margin top":{type:"range",section:"Margin/Padding",min:0,max:10,step:.5,tpl:"margin-top:%sem;"},"Margin bottom":{type:"range",section:"Margin/Padding",min:0,max:10,step:.5,tpl:"margin-bottom:%sem;"},"Background color":{type:"color",tpl:"background-color:%s;",section:"Color and decoration"},"Border color":{type:"color",section:"Color and decoration"},"Border weight":{type:"range",min:0,default:2,max:50,tpl:"%spx ",section:"Color and decoration"},"Rounded Corners":{type:"range",min:0,max:50,tpl:"border-radius:%spx;",section:"Color and decoration"},"Glow/Shadow":{type:"select",options:[{value:"",label:"None"},{value:" glow",label:"Glow"},{value:" shadow",label:"Shadow"}],section:"Icon Glow/Shadow"},"Icon Glow/Shadow":{type:"select",options:[{value:"",label:"No shadow/glow"},{value:"255,255,255",label:"Glow"},{value:"0,0,0",label:"Shadow"}],section:"Icon Glow/Shadow",tpl:"text-shadow:{{Shadow position}} {{Shadow Blur}} rgba(%s,{{Shadow Strength}});"},"Shadow position":{type:"select",options:[{value:"calc( -2px + -.05em ) calc( 2px + .03em )",label:"Far Left"},{value:"calc( -1px + -.03em ) calc( 1px + .01em )",label:"Left"},{value:"0 0",label:"Center"},{value:"calc( 1px + .03em ) calc( 1px + .01em )",label:"Right"},{value:"calc( 2px + .05em ) calc( 2px + .03em )",label:"Far Right"}],default:"0 0",section:"Icon Glow/Shadow"},"Shadow Blur":{type:"range",tpl:"%spx ",default:3,max:25,section:"Icon Glow/Shadow"},"Shadow Strength":{type:"range",min:.1,step:.1,default:.1,max:1,section:"Icon Glow/Shadow"},"Hover icon color":{type:"color",default:"",tpl:"color:%s;",section:"Hover Colors"},"Hover Background color":{type:"color",tpl:"background-color:%s;",section:"Hover Colors"},"Hover Border color":{type:"color",section:"Hover Colors",tpl:"border-color:%s;"}}}),CaxtonBlock({id:"slider",title:"Slider",icon:"slides",category:"caxton",tpl:'<div class="caxton-slider caxton-slider-pending-setup {{Alignment}}{{BlockAlignment}}" style="{{Text color}}{{Height}}{{Font size}}{{Text Glow/Shadow}};" data-mobile-css="{{Font size mobile}}" data-tablet-css="{{Font size tablet}}" data-desktop-css="{{Font size}}"><ul class="slides">{{Slide 1 image}}{{Slide 2 image}}{{Slide 3 image}}{{Slide 4 image}}{{Slide 5 image}}</ul></div>',toolbars:{Alignment:"AlignmentToolbar",BlockAlignment:"BlockAlignToolbar"},afterEdit:function(){setTimeout(CaxtonUtils.flexslider,700)},fields:{Height:{type:"range",tpl:"min-height:%svh;",min:25,max:125,help:"Relative to screen height. Set to 100 to have it full height.",section:"Layout"},"Slide 1 image":{type:"image",tpl:'<li style="background-image: url(\'%s\')"><div class="flex-caption  header-slide-text">{{Slide 1 title}}{{Slide 1 text}}{{Slide 1 button text}}</div></li>',section:"Slide 1"},"Slide 1 title":{type:"text",tpl:"<h2>%s</h2>",section:"Slide 1"},"Slide 1 text":{type:"textarea",tpl:"<p>%s</p>",section:"Slide 1"},"Slide 1 button text":{type:"text",tpl:'<a style="{{Button color}}{{Button text color}}" class="button" href="{{Slide 1 button url}}">%s</a>',section:"Slide 1"},"Slide 1 button url":{type:"text",section:"Slide 1"},"Slide 2 image":{type:"image",tpl:'<li style="background-image: url(\'%s\')"><div class="flex-caption  header-slide-text">{{Slide 2 title}}{{Slide 2 text}}{{Slide 2 button text}}</div></li>',section:"Slide 2"},"Slide 2 title":{type:"text",tpl:"<h2>%s</h2>",section:"Slide 2"},"Slide 2 text":{type:"textarea",tpl:"<p>%s</p>",section:"Slide 2"},"Slide 2 button text":{type:"text",tpl:'<a style="{{Button color}}{{Button text color}}" class="button" href="{{Slide 2 button url}}">%s</a>',section:"Slide 2"},"Slide 2 button url":{type:"text",section:"Slide 2"},"Slide 3 image":{type:"image",tpl:'<li style="background-image: url(\'%s\')"><div class="flex-caption  header-slide-text">{{Slide 3 title}}{{Slide 3 text}}{{Slide 3 button text}}</div></li>',section:"Slide 3"},"Slide 3 title":{type:"text",tpl:"<h2>%s</h2>",section:"Slide 3"},"Slide 3 text":{type:"textarea",tpl:"<p>%s</p>",section:"Slide 3"},"Slide 3 button text":{type:"text",tpl:'<a style="{{Button color}}{{Button text color}}" class="button" href="{{Slide 3 button url}}">%s</a>',section:"Slide 3"},"Slide 3 button url":{type:"text",section:"Slide 3"},"Slide 4 image":{type:"image",tpl:'<li style="background-image: url(\'%s\')"><div class="flex-caption  header-slide-text">{{Slide 4 title}}{{Slide 4 text}}{{Slide 4 button text}}</div></li>',section:"Slide 4"},"Slide 4 title":{type:"text",tpl:"<h2>%s</h2>",section:"Slide 4"},"Slide 4 text":{type:"textarea",tpl:"<p>%s</p>",section:"Slide 4"},"Slide 4 button text":{type:"text",tpl:'<a style="{{Button color}}{{Button text color}}" class="button" href="{{Slide 4 button url}}">%s</a>',section:"Slide 4"},"Slide 4 button url":{type:"text",section:"Slide 4"},"Slide 5 image":{type:"image",tpl:'<li style="background-image: url(\'%s\')"><div class="flex-caption  header-slide-text">{{Slide 5 title}}{{Slide 5 text}}{{Slide 5 button text}}</div></li>',section:"Slide 5"},"Slide 5 title":{type:"text",tpl:"<h2>%s</h2>",section:"Slide 5"},"Slide 5 text":{type:"textarea",tpl:"<p>%s</p>",section:"Slide 5"},"Slide 5 button text":{type:"text",tpl:'<a style="{{Button color}}{{Button text color}}" class="button" href="{{Slide 5 button url}}">%s</a>',section:"Slide 5"},"Slide 5 button url":{type:"text",section:"Slide 5"},"Button color":{type:"color",default:"#0693e3",tpl:"background:%s;",section:"Typography"},"Button text color":{type:"color",default:"#ffffff",tpl:"color:%s;",section:"Typography"},"Text color":{type:"color",tpl:"color:%s;",default:"#ffffff",section:"Typography"},"Font size":{type:"range",min:5,max:250,default:16,tpl:"font-size:%spx;",section:"Typography"},"Font size tablet":{type:"range",min:5,max:250,tpl:"font-size:%spx;",section:"Typography"},"Font size mobile":{type:"range",min:5,max:250,tpl:"font-size:%spx;",section:"Typography"},"Text Glow/Shadow":{type:"select",options:[{value:"",label:"No shadow/glow"},{value:"255,255,255",label:"Glow"},{value:"0,0,0",label:"Shadow"}],section:"Text Glow/Shadow",tpl:"text-shadow:{{Text Shadow position}} .05em rgba(%s,{{Text Shadow strength}});"},"Text Shadow position":{type:"select",options:[{value:"calc( -3px + -.07em ) calc( 2px + .03em )",label:"Far Left"},{value:"calc( -1px + -.03em ) calc( 1px + .01em )",label:"Left"},{value:"0 0",label:"Center"},{value:"calc( 1px + .03em ) calc( 1px + .01em )",label:"Right"},{value:"calc( 2px + .05em ) calc( 2px + .03em )",label:"Far Right"}],default:"0 0",section:"Text Glow/Shadow"},"Text Shadow strength":{type:"select",options:[{value:".25",label:"Light"},{value:".5",label:"Normal"},{value:".75",label:"Strong"}],default:".5",section:"Text Glow/Shadow"}}}),CaxtonBlock({id:"super-hero",title:"Super Hero",icon:"archive",category:"caxton",toolbars:{Layout:"BlockWidthToolbar"},fields:{"Background image":{type:"image",section:"Background image",tpl:"background-image:url(%s);"},"Background image position":{type:"position",section:"Background image",tpl:"background-position:%s;"},"Background parallax":{type:"toggle",value:"background-attachment:fixed;",section:"Background image"},"Background color":{type:"color",section:"Background colors"},"Gradient color":{type:"color",section:"Background colors",tpl:", %s"},"Gradient type":{type:"select",options:[{value:"linear-gradient( ",label:"Linear vertical"},{value:"linear-gradient( 90deg, ",label:"Linear horizontal"},{value:"linear-gradient( 45deg, ",label:"Linear 45 deg"},{value:"linear-gradient( -45deg, ",label:"Linear 45 deg anticlockwise"},{value:"radial-gradient( ",label:"Radial gradient"}],default:"linear-gradient( ",section:"Background colors"},"Background colors opacity":{type:"range",min:0,max:1,step:.05,help:"Reduce opacity to have transparent colors over image",default:".9",section:"Background colors",tpl:"opacity:%s;"},Columns:{type:"range",min:1,max:8,section:"Layout",default:1},"Column gap":{type:"select",options:[{value:"grid-gap-none",label:"None"},{value:"grid-gap-tight",label:"Tight"},{value:"",label:"Normal"},{value:"grid-gap-wide",label:"Wide"},{value:"grid-gap-wider",label:"Wider"}],section:"Layout"},"Inner Padding top":{type:"range",section:"Layout",default:5},"Inner Padding left":{type:"range",max:70,section:"Layout",default:5},"Inner Padding bottom":{type:"range",section:"Layout",default:5},"Inner Padding right":{type:"range",max:70,section:"Layout",default:5},"Inner Padding left/right tablet":{type:"range",max:70,section:"Layout",default:5},"Inner Padding left/right mobile":{type:"range",max:70,section:"Layout",default:5},"Inner Padding unit":{type:"select",options:[{value:"%",label:"Responsive"},{value:"px",label:"Pixels x 5"}],default:"%",section:"Layout"}},edit:function(e,t){var a,l,n,i,s,r,c=["core/column"];var d="relative ",p="relative caxton-columns",u=t.attrs["Inner Padding left/right tablet"],g=t.attrs["Inner Padding left/right mobile"];return a=t.attrs["Inner Padding unit"],l=t.attrs["Inner Padding top"],n=t.attrs["Inner Padding left"],i=t.attrs["Inner Padding bottom"],s=t.attrs["Inner Padding right"],r=t.attrs.Columns,"px"===a&&(l*=5,n*=5,i*=5,s*=5),l=l?l+a:0,n=n?n+a:0,i=i?i+a:0,s=s?s+a:0,t.attrs.Layout&&(d+=" ".concat(t.attrs.Layout)),t.attrs["Column gap"]&&(p+=" ".concat(t.attrs["Column gap"])),'<div class="cover bg-center absolute absolute--fill" style="{{Background image}}{{Background image position}}{{Background parallax}}"></div><div class="absolute absolute--fill" style="background-color: {{Background color}};background-image:{{Gradient type}}{{Background color}}{{Gradient color}});{{Background colors opacity}}"></div>',o("div",{className:d,key:"super-hero-block"},o("div",{key:"bg",className:"absolute absolute--fill",dangerouslySetInnerHTML:t.outputHTML('<div class="cover bg-center absolute absolute--fill" style="{{Background image}}{{Background image position}}{{Background parallax}}"></div><div class="absolute absolute--fill" style="background-color: {{Background color}};background-image:{{Gradient type}}{{Background color}}{{Gradient color}});{{Background colors opacity}}"></div>')}),o("div",{className:"".concat(p," caxton-").concat(r,"-columns"),style:{paddingTop:l,paddingLeft:n,paddingBottom:i,paddingRight:s},"data-tablet-css":"padding-left:".concat(g,"em;padding-right:").concat(g,"em;"),"data-mobile-css":"padding-left:".concat(u,"em;padding-right:").concat(u,"em;"),key:"block"},o(caxtonWPEditor.InnerBlocks,{template:function(e){return Array(+e).fill(c)}(t.attrs.Columns),templateLock:"all",allowedBlock:c,key:"innerblockscontent"})))},save:function(e,t){var a,l,n,i,s,r,c="relative",d="relative caxton-columns",p=t.attrs["Inner Padding left/right tablet"],u=t.attrs["Inner Padding left/right mobile"];a=t.attrs["Inner Padding unit"],l=t.attrs["Inner Padding top"],n=t.attrs["Inner Padding left"],i=t.attrs["Inner Padding bottom"],s=t.attrs["Inner Padding right"],r=t.attrs.Columns,"px"==a&&(l*=5,n*=5,i*=5,s*=5),l=l?l+a:0,n=n?n+a:0,i=i?i+a:0,s=s?s+a:0,t.attrs.Layout&&(c+=" ".concat(t.attrs.Layout)),t.attrs["Column gap"]&&(d+=" ".concat(t.attrs["Column gap"]));var g=o(caxtonWPEditor.InnerBlocks.Content,{});return o("div",{className:c,key:"super-hero-block"},[o("div",{key:"bg",className:"absolute absolute--fill",dangerouslySetInnerHTML:t.outputHTML('<div key="bg-image" class="cover bg-center absolute absolute--fill" style="{{Background image}}{{Background image position}}{{Background parallax}}"></div><div key="bg-colors" class="absolute absolute--fill" style="background-color: {{Background color}};background-image:{{Gradient type}}{{Background color}}{{Gradient color}});{{Background colors opacity}}"></div>')}),o("div",{className:"".concat(d," caxton-").concat(r,"-columns"),style:{paddingTop:l,paddingLeft:n,paddingBottom:i,paddingRight:s},"data-mobile-css":"padding-left:".concat(p,"em;padding-right:").concat(p,"em;"),"data-tablet-css":"padding-left:".concat(u,"em;padding-right:").concat(u,"em;"),key:"block"},g)])}}),CaxtonBlock({id:"divider",title:"Shape Divider",icon:"cloud",category:"caxton",tpl:function(e){var t={"":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="xMidYMax slice"><path d="M265.8 3.5c-10.9 0-15.9 6.2-15.9 6.2s-3.6-3.5-9.2-.9c-9.1 4.1-4.4 13.4-4.4 13.4s-1.2.2-1.9.9c-.6.7-.5 1.9-.5 1.9s-1-.5-2.3-.2c-1.3.3-1.6 1.4-1.6 1.4s.4-3.4-1.5-5c-3.9-3.4-8.3-.2-8.3-.2s-.6-.7-.9-.9c-.4-.2-1.2-.2-1.2-.2s-4.4-3.6-11.5-2.6-10.4 7.9-10.4 7.9-.5-3.3-3.9-4.9c-4.8-2.4-7.4 0-7.4 0s2.4-4.1-1.9-6.4-6.2 1.2-6.2 1.2-.9-.5-2.1-.5-2.3 1.1-2.3 1.1.1-.7-1.1-1.1c-1.2-.4-2 0-2 0s3.6-6.8-3.5-8.9c-6-1.8-7.9 2.6-8.4 4-.1-.3-.4-.7-.9-1.1-1-.7-1.3-.5-1.3-.5s1-4-1.7-5.2c-2.7-1.2-4.2 1.1-4.2 1.1s-3.1-1-5.7 1.4-2.1 5.5-2.1 5.5-.9 0-2.1.7-1.4 1.7-1.4 1.7-1.7-1.2-4.3-1.2c-2.6 0-4.5 1.2-4.5 1.2s-.7-1.5-2.8-2.4c-2.1-.9-4 0-4 0s2.6-5.9-4.7-9c-7.3-3.1-12.6 3.3-12.6 3.3s-.9 0-1.9.2c-.9.2-1.5.9-1.5.9S99.4 3 94.9 3.9c-4.5.9-5.7 5.7-5.7 5.7s-2.8-5-12.3-3.9-11.1 6-11.1 6-1.2-1.4-4-.7c-.8.2-1.3.5-1.8.9-.9-2.1-2.7-4.9-6.2-4.4-3.2.4-4 2.2-4 2.2s-.5-.7-1.2-.7h-1.4s-.5-.9-1.7-1.4-2.4 0-2.4 0-2.4-1.2-4.7 0-3.1 4.1-3.1 4.1-1.7-1.4-3.6-.7c-1.9.7-1.9 2.8-1.9 2.8s-.5-.5-1.7-.2c-1.2.2-1.4.7-1.4.7s-.7-2.3-2.8-2.8c-2.1-.5-4.3.2-4.3.2s-1.7-5-11.1-6c-3.8-.4-6.6.2-8.5 1v21.2h283.5V11.1c-.9.2-1.6.4-1.6.4s-5.2-8-16.1-8z"/></svg>',book:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="xMidYMax slice"><path d="M194,99c186.7,0.7,305-78.3,306-97.2c1,18.9,119.3,97.9,306,97.2c114.3-0.3,194,0.3,194,0.3s0-91.7,0-100c0,0,0,0,0-0 L0,0v99.3C0,99.3,79.7,98.7,194,99z"></path></svg>',waves:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="xMidYMax slice">\n<path class="elementor-shape-fill" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"/></svg>',pyramids:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="xMidYMax slice"><path class="elementor-shape-fill" d="M761.9,44.1L643.1,27.2L333.8,98L0,3.8V0l1000,0v3.9"/></svg>',tilt:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="xMidYMax slice"><path class="elementor-shape-fill" d="M0,6V0h1000v100L0,6z"/></svg>'},o=t[""];return t[e.attributes.Shape]&&(o=t[e.attributes.Shape]),'<div class="caxton-shape-divider cover bg-center{{Full width}}{{Position}}" style="background:{{Color 2}};color:{{Color 1}};"><div class="{{Flip}}">'+o+"</div></div>"},fields:{Shape:{type:"select",options:[{value:"",label:"Clouds"},{value:"book",label:"Book"},{value:"waves",label:"Waves"},{value:"pyramids",label:"Pyramids"},{value:"tilt",label:"Tilt"}]},"Full width":{type:"toggle",value:" vw-100"},Flip:{type:"toggle",value:" flip-v"},Position:{type:"select",options:[{value:"",label:"Normal"},{value:" caxton-shape-divider-onxt",label:"Over previous block"},{value:" caxton-shape-divider-oprv",label:"Over next block"}],value:" aspect-ratio"},"Color 1":{type:"color",default:"#fff"},"Color 2":{type:"color",default:"#fff"}}});var u=function(t){function a(e){var t;return _classCallCheck(this,a),(t=_possibleConstructorReturn(this,_getPrototypeOf(a).apply(this,arguments))).state={dataProps:Caxton.copyObj({},e)},t}return _inherits(a,React.Component),_createClass(a,[{key:"fetchUrls",value:function(){var t=this.state,o=this,a=t.dataProps,l=e.extend({cat:[],order:"date/desc",rows:4,columns:2},a),n=l.order.split("/"),i="/caxton/v1/posts?posts_per_page=".concat(l.rows*l.columns,"&post__not_in=").concat(caxton.post,"&cat=").concat(l.cat).concat(l.postIDs?"&post__in=".concat(l.postIDs):"").concat(l.displayPostWithoutImages?"&meta_key=":"","&orderby=").concat(n[0],"&order=").concat(n[1]);t.dataProps.posts&&i===t.dataProps.posts.path||(t.dataProps.posts={},wp.apiFetch({path:i}).then(function(e){o&&t.dataProps.posts.data!==e&&(t.dataProps.posts.data=e,t.dataProps.posts.path=i,o.setState(t))}))}},{key:"render",value:function(){Caxton.copyObj(this.state.dataProps,this.props),this.fetchUrls();var t,a,l=this.state.dataProps,c=e.extend({cat:"",order:"date/desc",rows:4,columns:2,titleSize:20},l.attributes),u='<span class="fa fa-comments"></span>',g='<span class="fa fa-user-circle-o"></span>',m=[],b=l.isSelected,h="".concat(l.className," ").concat(l.name.replace("/","-")," caxton-grid");if(h+=" caxton-".concat(c.imagesType,"-images"),c.titleBelowImage&&(h+=" caxton-title-below-image"),l.posts.data)if(0===l.posts.data.length)m.push(o("div",{className:"caxton-notification",key:"notice"},"No posts match criteria."));else{var y="grid-item";c.border&&(y+=" ba");for(var v=0;v<l.posts.data.length;v++)t=l.posts.data[v],(a=[o("a",{className:"grid-link",href:"#",key:"anchor"},o("div",{className:"grid-image",style:{backgroundImage:"url(".concat(t.thumb_ml,")")}},o("h3",{className:"grid-title",style:{fontSize:c.titleSize}},t.title)))]).push(o("h3",{className:"grid-title",style:{fontSize:c.titleSize},key:"title"},e("<div/>").html(t.title).text())),c.displayDate&&a.push(o("time",{key:"date"},t.date)),c.displayExcerpt&&a.push(o("p",{key:"excerpt"},e("<div/>").html(t.excerpt).text())),a.push(o("div",{className:"grid-meta",dangerouslySetInnerHTML:c.displayMeta?{__html:'<span class="author">'.concat(g).concat(t.author,'</span><span class="comments">').concat(u," ").concat(t.comments,"</span>")}:{__html:""},key:"meta"})),m.push(o("div",{className:y,style:{width:"".concat(100/c.columns-2,"%")},key:"post-".concat(t.id)},a))}else m.push(o("div",{className:"caxton-notification",key:"notice"},"Loading posts..."));return[!!b&&o(d,{key:"inspector"},o(n,{label:"Category",value:c.cat,instanceId:"caxton-postCats",options:caxton.postCategories,onChange:function(e){l.setAttributes({postIDs:"",cat:e})}}),c.cat?"":o(i,{label:"Hand picked posts",instanceId:"caxton-postIDs",options:caxton.postCategories,help:"Type in the IDs of posts separated by comma",onChange:function(e){l.setAttributes({postIDs:e})}}),o(n,{label:"Order",value:c.order,options:[{label:p("Newest to Oldest"),value:"date/desc"},{label:p("Oldest to Newest"),value:"date/asc"},{label:p("A → Z"),value:"title/asc"},{label:p("Z → A"),value:"title/desc"}],onChange:function(e){l.setAttributes({order:e})}}),o(n,{label:"Images shape",value:c.imagesType,options:[{label:p("Square"),value:""},{label:p("Circle"),value:"circle"},{label:p("Rectangle"),value:"rectangle"}],onChange:function(e){l.setAttributes({imagesType:e})}}),o(s,{label:"Include posts without image",checked:c.displayPostWithoutImages,onChange:function(e){e.target?l.setAttributes({displayPostWithoutImages:e.target.checked}):l.setAttributes({displayPostWithoutImages:e})}}),o(s,{label:"Display post date",checked:c.displayDate,onChange:function(e){e.target?l.setAttributes({displayDate:e.target.checked}):l.setAttributes({displayDate:e})}}),o(s,{label:"Display post meta",checked:c.displayMeta,onChange:function(e){e.target?l.setAttributes({displayMeta:e.target.checked}):l.setAttributes({displayMeta:e})}}),o(s,{label:"Show Border",checked:c.border,onChange:function(e){e.target?l.setAttributes({border:e.target.checked}):l.setAttributes({border:e})}}),o(s,{label:"Display post excerpt",checked:c.displayExcerpt,onChange:function(e){e.target?l.setAttributes({displayExcerpt:e.target.checked}):l.setAttributes({displayExcerpt:e})}}),o(s,{label:"Show title below image",checked:c.titleBelowImage,onChange:function(e){e.target?l.setAttributes({titleBelowImage:e.target.checked}):l.setAttributes({titleBelowImage:e})}}),o(r,{label:"Title size",value:c.titleSize,onChange:function(e){l.setAttributes({titleSize:e})},min:10,max:50}),o(r,{label:"Post columns",value:c.columns,onChange:function(e){l.setAttributes({columns:e})},min:1,max:5}),o(r,{label:"Post rows",value:c.rows,onChange:function(e){l.setAttributes({rows:e})},min:1,max:20})),o("div",{className:h,key:"grid"},m)]}}]),a}();wp.blocks.registerBlockType("caxton/posts-grid",{title:"Posts grid",icon:"screenoptions",category:"caxton",attributes:{postIDs:{type:"string"},cat:{type:"string"},order:{type:"string"},imagesType:{type:"string"},displayPostWithoutImages:{type:"boolean"},border:{type:"boolean"},displayDate:{type:"boolean"},displayExcerpt:{type:"boolean"},displayMeta:{type:"boolean"},titleBelowImage:{type:"boolean"},titleSize:{type:"number"},rows:{type:"number"},columns:{type:"number"}},edit:u,save:function(){return null}})}(jQuery,wp.blocks,wp.element.createElement,wp.i18n,wp.components);

},{"./layout-blocks/layout-blocks.es6":6}],2:[function(require,module,exports){
module.exports={
	"2-sections": [
		[ "1,12", "1,12" ],
		[ "1,6", "1,6" ],
		[ "1,8", "1,4" ],
		[ "1,4", "1,8" ]
	],
	"3-sections": [
		[ "1,12", "1,12", "1,12" ],
		[ "1,12", "1,6", "1,6" ],
		[ "1,6", "1,6", "1,12" ],
		[ "1,4", "1,4", "1,4" ]
	],
	"4-sections": [
		[ "1,12", "1,12", "1,12", "1,12" ],
		[ "1,6", "1,6", "1,6", "1,6" ],
		[ "1,12", "1,4", "1,4", "1,4" ],
		[ "1,4", "1,4", "1,4", "1,12" ]
	],
	"5-sections": [
		[ "1,12", "1,12", "1,12", "1,12", "1,12" ],
		[ "1,12", "1,6", "1,6", "1,6", "1,6" ],
		[ "1,6", "1,6", "1,12", "1,6", "1,6" ],
		[ "1,6", "1,6", "1,6", "1,6", "1,12" ]
	],
	"6-sections": [
		[ "1,12", "1,12", "1,12", "1,12", "1,12", "1,12" ],
		[ "1,12", "1,6", "1,6", "1,12", "1,6", "1,6" ],
		[ "1,12", "1,6", "1,6", "1,6" , "1,6", "1,12" ],
		[ "1,6", "1,6", "1,6", "1,6", "1,6", "1,6" ],
		[ "1,4", "1,4", "1,4", "1,4", "1,4", "1,4" ]
	],
	"7-sections": []
}
},{}],3:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.tplFields=exports.flexFields=exports.sectionFields=exports.gridFields=void 0;var gridFields={Background:{type:"background",section:"Background"},Layout:{type:"select",options:[{value:"",label:"Normal"},{value:"vw-100-bg",label:"Full width background"},{value:"vw-100",label:"Full width content"}],section:"Layout"},"Column gap":{type:"select",options:[{value:"grid-gap-none",label:"None"},{value:"grid-gap-tight",label:"Tight"},{value:"",label:"Normal"},{value:"grid-gap-wide",label:"Wide"},{value:"grid-gap-wider",label:"Wider"}],section:"Layout"},"Inner Padding top":{type:"range",section:"Layout"},"Inner Padding left":{type:"range",max:70,section:"Layout"},"Inner Padding bottom":{type:"range",section:"Layout"},"Inner Padding right":{type:"range",max:70,section:"Layout"},"Inner Padding left/right tablet":{type:"range",max:70,section:"Layout"},"Inner Padding left/right mobile":{type:"range",max:70,section:"Layout"},"Inner Padding unit":{type:"select",options:[{value:"vw",label:"Responsive"},{value:"px",label:"Pixels x 5"}],default:"px",section:"Layout"},"Mobile layout":{type:"select",section:"Responsive layout",childField:"Mobile grid area"},"Tablet layout":{type:"select",section:"Responsive layout",childField:"Tablet grid area"}};exports.gridFields=gridFields;var sectionFields={Background:{type:"background",section:"Background"},"Inner Padding top":{type:"range",section:"Layout",default:1},"Inner Padding bottom":{type:"range",section:"Layout",default:1},"Inner Padding left":{type:"range",max:50,section:"Layout",default:1},"Inner Padding right":{type:"range",max:50,section:"Layout",default:1},"Inner Padding left/right tablet":{type:"range",max:50,section:"Layout",default:1},"Inner Padding left/right mobile":{type:"range",max:50,section:"Layout",default:1},"Inner Padding unit":{type:"select",options:[{value:"vw",label:"Responsive"},{value:"px",label:"Pixels x 5"}],default:"px",section:"Layout"},"Vertical Alignment":{type:"select",section:"Layout",options:[{value:"flex-start",label:"Top"},{value:"center",label:"Center"},{value:"flex-end",label:"Bottom"}]},"Grid area":{type:"text",description:"Change grid-area CSS property.",section:"Jedi controls",default:"span 1 / span 4 / auto / auto"},"Tablet grid area":{type:"text",description:"Change grid-area CSS property for Tablet devices.",section:"Jedi controls"},"Mobile grid area":{type:"text",description:"Change grid-area CSS property for Mobile devices.",section:"Jedi controls"}};exports.sectionFields=sectionFields;var flexFields={Background:{type:"background",section:"Background"},"Content direction":{type:"select",section:"Layout",options:[{value:"",label:"Horizontal"},{value:"column",label:"Vertical"}]},"Content justify":{type:"select",section:"Layout",options:[{value:"flex-start",label:"Start"},{value:"center",label:"Center"},{value:"flex-end",label:"End"},{value:"space-between",label:"Justify"}]},Alignment:{type:"select",section:"Layout",options:[{value:"flex-start",label:"Start"},{value:"center",label:"Center"},{value:"flex-end",label:"End"}]},"Items margin":{type:"range",section:"Layout"},"Minimum content height":{type:"range",section:"Layout"},"Content height unit":{type:"select",options:[{value:"px",label:"Pixels x 10"},{value:"vh",label:"Screen Height %"},{value:"vw",label:"Screen Width %"}],default:"vh",section:"Layout"},"Inner Padding top":{type:"range",section:"Layout",default:1},"Inner Padding bottom":{type:"range",section:"Layout",default:1},"Inner Padding left":{type:"range",max:50,section:"Layout",default:1},"Inner Padding right":{type:"range",max:50,section:"Layout",default:1},"Inner Padding left/right tablet":{type:"range",max:50,section:"Layout",default:1},"Inner Padding left/right mobile":{type:"range",max:50,section:"Layout",default:1},"Inner Padding unit":{type:"select",options:[{value:"vw",label:"Responsive"},{value:"px",label:"Pixels x 5"}],default:"px",section:"Layout"},"Tablet Alignment":{type:"select",section:"Layout",options:[{value:"flex-start",label:"Left"},{value:"center",label:"Center"},{value:"flex-end",label:"Right"},{value:"space-between",label:"Justify"}]},"Mobile Alignment":{type:"select",section:"Layout",options:[{value:"flex-start",label:"Left"},{value:"center",label:"Center"},{value:"flex-end",label:"Right"},{value:"space-between",label:"Justify"}]}};exports.flexFields=flexFields;var tplFields={Background:{type:"background",section:"Background"},Alignment:{type:"select",section:"Layout",options:[{value:"flex-start",label:"Left"},{value:"center",label:"Center"},{value:"flex-end",label:"Right"},{value:"space-between",label:"Justify"}],default:1},"Vertical Alignment":{type:"select",section:"Layout",options:[{value:"flex-start",label:"Top"},{value:"center",label:"Center"},{value:"flex-end",label:"Bottom"}]},"Inner Padding top":{type:"range",section:"Layout",default:1},"Inner Padding bottom":{type:"range",section:"Layout",default:1},"Inner Padding left":{type:"range",max:50,section:"Layout",default:1},"Inner Padding right":{type:"range",max:50,section:"Layout",default:1},"Inner Padding left/right tablet":{type:"range",max:50,section:"Layout",default:1},"Inner Padding left/right mobile":{type:"range",max:50,section:"Layout",default:1},"Inner Padding unit":{type:"select",options:[{value:"vw",label:"Responsive"},{value:"px",label:"Pixels x 5"}],default:"px",section:"Layout"}};exports.tplFields=tplFields;

},{}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.flexRender=void 0;var flexRender=function(t,e,n){var a,s,i,r,l,d=wp.element.createElement,o={className:"relative caxton-flex-block","data-mobile-css":"","data-tablet-css":"",key:"block"},g=e.attrs["Inner Padding left/right tablet"],m=e.attrs["Inner Padding left/right mobile"];return"caxon/horizontal"===e.name&&(o.className="relative caxton-listing-block"),a=e.attrs["Inner Padding unit"],s=e.attrs["Inner Padding top"],i=e.attrs["Inner Padding left"],r=e.attrs["Inner Padding bottom"],l=e.attrs["Inner Padding right"],"px"===a&&(s*=5,i*=5,r*=5,l*=5),s=s?s+a:0,i=i?i+a:0,r=r?r+a:0,l=l?l+a:0,o.style={paddingTop:s,paddingLeft:i,paddingBottom:r,paddingRight:l,justifyContent:e.attrs.Alignment,minHeight:e.attrs["Minimum content height"],alignItems:e.attrs.Alignment},o["data-desktop-css"]="padding-left:"+i+"em;padding-right:"+l+"em;",o["data-mobile-css"]="padding-left:"+g+"em;padding-right:"+g+"em;",o["data-tablet-css"]="padding-left:"+m+"em;padding-right:"+m+"em;",e.attrs["Column gap"]&&(o.className+=" "+e.attrs["Column gap"]),"px"===e.attrs["Content height unit"]?o.style.minHeight=10*parseInt(o.style.minHeight)+"px":o.style.minHeight=parseInt(o.style.minHeight)+e.attrs["Content height unit"],e.attrs["Content direction"]&&(o.style["flex-direction"]=e.attrs["Content direction"]),e.attrs["Items margin"]&&(o.style["--caxton-gap"]=e.attrs["Items margin"]+"px"),e.attrs["Content justify"]&&(o.style["justify-content"]=e.attrs["Content justify"]),e.attrs["Mobile Alignment"]&&(o["data-mobile-css"]+="justify-content:"+e.attrs["Mobile Alignment"]+";",o["data-desktop-css"]+="justify-content:"+e.attrs["Content justify"]+";"),e.attrs["Tablet Alignment"]&&(o["data-tablet-css"]+="justify-content:"+e.attrs["Tablet Alignment"]+";",o["data-desktop-css"]+="justify-content:"+e.attrs["Content justify"]+";"),d("div",{className:"relative",key:"caxton-flex-block-wrap"},[d("div",{key:"bg",className:"absolute absolute--fill",dangerouslySetInnerHTML:e.outputHTML("{{Background}}")}),d("div",o,n)])};exports.flexRender=flexRender;

},{}],5:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.gridRender=gridRender,exports.gridContent=gridContent,exports.responsiveLayoutPicker=responsiveLayoutPicker;var _layouts=_interopRequireDefault(require("./layouts.json")),_altLayouts=_interopRequireDefault(require("./alt-layouts.json"));function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function gridRender(t,e,a){var r,o,n,l,i,s=wp.element.createElement,u=(jQuery,"relative "),p="relative caxton-columns caxton-grid-block",c=e.attrs["Inner Padding left/right tablet"],d=e.attrs["Inner Padding left/right mobile"];return r=e.attrs["Inner Padding unit"],o=e.attrs["Inner Padding top"],n=e.attrs["Inner Padding left"],l=e.attrs["Inner Padding bottom"],i=e.attrs["Inner Padding right"],"px"===r&&(o*=5,n*=5,l*=5,i*=5),o=o?o+r:0,n=n?n+r:0,l=l?l+r:0,i=i?i+r:0,e.attrs.Layout&&(u+=" "+e.attrs.Layout),e.attrs["Column gap"]&&(p+=" "+e.attrs["Column gap"]),e.attrs["Full height"]&&(p+=" "+e.attrs["Full height"]),s("div",{className:u,key:"caxton-grid-block"},s("div",{key:"bg",className:"absolute absolute--fill",dangerouslySetInnerHTML:e.outputHTML("{{Background}}")}),s("div",{className:p,style:{paddingTop:o,paddingLeft:n,paddingBottom:l,paddingRight:i,gridTemplateColumns:"repeat(12, 1fr)"},"data-tablet-css":"padding-left:"+d+"em;padding-right:"+d+"em;","data-mobile-css":"padding-left:"+c+"em;padding-right:"+c+"em;",key:"block"},a))}function parseLayout(t){var e=0,a={attr:{},tpl:[],_numRows:0};if(t.tpl&&t.tpl.length){for(var r=0;r<t.tpl.length;r++){var o=t.tpl[r];if("object"===_typeof(o)&&o[1]&&o[0]&&(o[1],o=o[0]),"object"===_typeof(o))a.tpl.push(["caxton/section",o]);else if("string"==typeof o){if(/[0-9]{1,2},[0-9]{1,2}/.test(o)){var n=o.split(",");o="span "+n.join("/span "),e+=n[0]*n[1]}a.tpl.push(["caxton/section",{"Grid area":o}])}}return"object"===_typeof(t.attr)&&(a.attr=t.attr),t._numRows?a._numRows=t._numRows:e&&(a._numRows=Math.ceil(e/12)),a}}function layoutElement(t,e){e=e||0;for(var a=wp.element.createElement,r=[],o=0;o<t.tpl.length;o++){var n=t.tpl[o];r.push(a("div",{className:"caxton-layout-preview-section",key:"layout-section-"+o,style:{gridArea:n[1]["Grid area"]}}))}return a("div",{className:"caxton-layout-preview-wrap",key:"layout-wrap-"+e},a("div",{className:"caxton-layout-preview",key:"layout-"+e,"data-layout":JSON.stringify(t)},r))}function gridLayoutPicker(t){for(var e,a=[],r=[],o=wp.element.createElement,n=0;n<_layouts.default.length;n++){var l=parseLayout(_layouts.default[n]);r[e=l._numRows]||(r[e]=[]),r[e].push(layoutElement(l,n)),l.attr&&t.setAttributes(l.attr)}for(var i=0;i<r.length;i++)a.push(o("div",{className:"clear"},r[i]));return o("div",{className:"caxton-layout-picker",key:"caxton-layout-picker",onClick:function(e){var a=jQuery(e.target).closest(".caxton-layout-preview").data("layout");"string"==typeof a&&(a=JSON.parse(a)),"object"===_typeof(a.tpl)&&(a.tpl=JSON.stringify(a.tpl)),t.setAttributes(a)}},o("h3",{},"Please choose a layout..."),o("div",{},a))}function gridContent(t,e){var a=wp.element.createElement;if(t.attributes.tpl&&0===t.attributes.tpl.indexOf("[")&&t.attributes.tpl.indexOf("]")>0){var r=JSON.parse(t.attributes.tpl);return a(caxtonWPEditor.InnerBlocks,{allowedBlocks:["caxton/section"],template:r,templateLock:"all",key:"innerblocks"})}return gridLayoutPicker(t)}function responsiveLayoutElement(t,e,a){e=e||0;var r="span "+t.join("|span ").replace(/,/g,"/span "),o="caxton-layout-preview";r===a.value&&(o+=" caxton-layout-selected");for(var n=wp.element.createElement,l=[],i=0;i<t.length;i++){var s=t[i].split(",");l.push(n("div",{className:"caxton-layout-preview-section",key:"layout-section-"+i,style:{gridArea:"span "+s.join("/span ")}}))}return n("div",{className:"caxton-layout-preview-wrap",key:"layout-wrap-"+e},n("div",{className:o,key:"layout-"+e,"data-layout":r},l))}function responsiveLayoutPicker(t,e){t.title=t.label;var a=e.props,r=wp.element.createElement;if(!e.attrs.tpl)return r("div",{},"Please select a layout to get started.");var o=e.attrs.tpl?JSON.parse(e.attrs.tpl).length:0,n=[],l=_altLayouts.default[o+"-sections"];if(l&&l.length>1){for(var i=0;i<l.length;i++)n.push(responsiveLayoutElement(l[i],i,t));return r(wp.components.PanelBody,t,r("div",{className:"caxton-layout-picker caxton-responsive-layout-picker",onClick:function(e){var r=e.target,o=$(r).closest("[data-layout]");if(o.length){var n=o.data("layout");n=n?n.split("|"):[];var l=wp.data.select("core/block-editor").getBlocksByClientId(a.clientId)[0];if(l&&n)for(var i=l.innerBlocks,s=0;s<i.length;s++)n[s]&&(i[s].attributes[t.childField]=n[s]);t.onChange(o.data("layout"))}}},n,r("div",{className:"clear"})))}return r(wp.components.PanelBody,t,r("div",{},"No alternative layouts found."))}

},{"./alt-layouts.json":2,"./layouts.json":7}],6:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CaxtonLayoutBlocksSetup=void 0;var _fields=require("./fields.es6"),_grid=require("./grid.es6"),_section=require("./section.es6"),_flex=require("./flex.es6"),_tpl=require("./tpl.es6");function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var CaxtonLayoutBlocksSetup=function(e,t){var o=t.element,n=caxtonWPEditor,r=o.createElement;_fields.gridFields["Mobile layout"].render=_grid.responsiveLayoutPicker,_fields.gridFields["Tablet layout"].render=_grid.responsiveLayoutPicker,CaxtonBlock({id:"caxton/grid",title:"Caxton Layouts",icon:"screenoptions",category:"caxton",fields:_fields.gridFields,attributes:{tpl:{type:"string"}},edit:function(e,t){return(0,_grid.gridRender)(e,t,(0,_grid.gridContent)(e,t))},save:function(e,t){return(0,_grid.gridRender)(e,t,r(n.InnerBlocks.Content,{key:"innerblockscontent"}))}}),CaxtonBlock({id:"caxton/section",title:"Caxton section",icon:"screenoptions",parent:["caxton/grid"],category:"caxton",attributes:{tpl:{type:"string"}},fields:_fields.sectionFields,edit:function(e,t){var o=[];e.attributes.tpl&&0===e.attributes.tpl.indexOf("[")&&e.attributes.tpl.indexOf("]")>0&&(o=JSON.parse(e.attributes.tpl));var n=r(caxtonWPEditor.InnerBlocks,{template:o,templateLock:!1,key:"innerblocks"});return(0,_section.sectionRender)(e,t,n)},save:function(e,t){return(0,_section.sectionRender)(e,t,[r(n.InnerBlocks.Content,{key:"innerblockscontent"})])},wrapperProps:function(e,t){return e["data-caxton-section"]=t["Grid area"],e.style={},e.style.gridArea=t["Grid area"],e}}),CaxtonBlock({id:"caxton/horizontal",title:"Horizontal blocks (deprecated)",icon:"text",category:"caxton",fields:_fields.flexFields,edit:function(e,t){return(0,_flex.flexRender)(e,t,[r(n.InnerBlocks,{key:"innerblocks",templateLock:!1})])},save:function(e,t){return(0,_flex.flexRender)(e,t,[r(n.InnerBlocks.Content,{key:"innerblockscontent"})])}}),CaxtonBlock({id:"caxton/flex",title:"Flex blocks (beta)",icon:"text",category:"caxton",fields:_fields.flexFields,edit:function(e,t){return(0,_flex.flexRender)(e,t,[r(n.InnerBlocks,{key:"innerblocks",templateLock:!1})])},save:function(e,t){return(0,_flex.flexRender)(e,t,[r(n.InnerBlocks.Content,{key:"innerblockscontent"})])},transforms:{from:[{type:"caxton/horizontal"}]}}),window.CaxtonLayoutOptionsBlock=function(e,t){e.id&&e.title||console.error("Function CaxtonLayoutOptionsBlock requires `id` and `title` properties on first parameter object."),e.debug&&(_fields.tplFields.tpl={type:"textarea",section:"Layout"});var o={icon:"screenoptions",category:"caxton",fields:_fields.tplFields,attributes:{tpl:{type:"string"}},chooseLayoutTitle:"Please choose a layout",optionsRenderer:function(e,o){for(var n=function(t){var o=jQuery(t.target).closest(".caxton-layout-option").data("props");"string"==typeof o&&(o=JSON.parse(o)),"object"===_typeof(o.tpl)&&(o.tpl=JSON.stringify(o.tpl)),e.setAttributes(o)},i=[],l=0;l<t.length;l++){var s=t[l];i.push(r("div",{className:"caxton-layout-option",key:"option-"+l,"data-props":JSON.stringify(s.props),onClick:n},r("img",{src:s.img}),r("h5",{},s.title)))}return r("div",{},[r("h4",{key:"heading"},"Select a layout"),r("div",{key:"options",className:"caxton-layout-options"},i)])},edit:function(e,t){return(0,_tpl.tplRender)(e,t,(0,_tpl.tplContent)(e,t,o.optionsRenderer))},save:function(e,t){return(0,_tpl.tplRender)(e,t,r(n.InnerBlocks.Content,{key:"innerblockscontent"}))}};for(var i in e)o[i]=e[i];CaxtonBlock(o)}};exports.CaxtonLayoutBlocksSetup=CaxtonLayoutBlocksSetup;

},{"./fields.es6":3,"./flex.es6":4,"./grid.es6":5,"./section.es6":8,"./tpl.es6":9}],7:[function(require,module,exports){
module.exports=[
	{
		"tpl": [
			{
				"Grid area": "span 1/span 12"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 6"
			},
			{
				"Grid area": "span 1/span 6"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 1/span 4"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 3"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 8"
			},
			{
				"Grid area": "span 1/span 4"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 1/span 8"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 9"
			},
			{
				"Grid area": "span 1/span 3"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 9"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 6"
			},
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 3"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 6"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 6"
			},
			{
				"Grid area": "span 1/span 3"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 2"
			},
			{
				"Grid area": "span 1/span 2"
			},
			{
				"Grid area": "span 1/span 2"
			},
			{
				"Grid area": "span 1/span 2"
			},
			{
				"Grid area": "span 1/span 2"
			},
			{
				"Grid area": "span 1/span 2"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 12"
			},
			{
				"Grid area": "span 2/span 6"
			},
			{
				"Grid area": "span 2/span 6"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 12"
			},
			{
				"Grid area": "span 2/span 4"
			},
			{
				"Grid area": "span 2/span 4"
			},
			{
				"Grid area": "span 2/span 4"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 2/span 8"
			},
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 1/span 8"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 1/span 8"
			},
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 2/span 8"
			},
			{
				"Grid area": "span 1/span 4"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 2/span 4"
			},
			{
				"Grid area": "span 2/span 8"
			},
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 1/span 4"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 2/span 8"
			},
			{
				"Grid area": "span 2/span 4"
			},
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 1/span 4"
			},
			{
				"Grid area": "span 1/span 4"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 2/span 6"
			},
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 2/span 6"
			},
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 3"
			}
		]
	},
	{
		"tpl": [
			{
				"Grid area": "span 2/span 6"
			},
			{
				"Grid area": "span 2/span 6"
			},
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 3"
			},
			{
				"Grid area": "span 1/span 3"
			}
		]
	}
]
},{}],8:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.sectionRender=void 0;var sectionRender=function(t,e,a){var r,d,i,n,s,l=wp.element.createElement,o="relative caxton-section-block",g=e.attrs["Inner Padding left/right tablet"],c=e.attrs["Inner Padding left/right mobile"];r=e.attrs["Inner Padding unit"],d=e.attrs["Inner Padding top"],i=e.attrs["Inner Padding left"],n=e.attrs["Inner Padding bottom"],s=e.attrs["Inner Padding right"],"px"===r&&(d*=5,i*=5,n*=5,s*=5),d=d?d+r:0,i=i?i+r:0,n=n?n+r:0,s=s?s+r:0,e.attrs["Column gap"]&&(o+=" "+e.attrs["Column gap"]);var p={className:"relative",key:"caxton-section-block",style:{gridArea:e.attrs["Grid area"]}},b={className:o,style:{paddingTop:d,paddingLeft:i,paddingBottom:n,paddingRight:s},"data-mobile-css":"padding-left:"+g+"em;padding-right:"+g+"em;","data-tablet-css":"padding-left:"+c+"em;padding-right:"+c+"em;",key:"block"};return e.attrs["Mobile grid area"]&&(p["data-mobile-css"]="grid-area:"+e.attrs["Mobile grid area"]+";",p["data-desktop-css"]="grid-area:"+e.attrs["Grid area"]+";"),e.attrs["Tablet grid area"]&&(p["data-tablet-css"]="grid-area:"+e.attrs["Tablet grid area"]+";",p["data-desktop-css"]="grid-area:"+e.attrs["Grid area"]+";"),e.attrs["Vertical Alignment"]&&(b.style["justify-content"]=e.attrs["Vertical Alignment"]),l("div",p,[l("div",{key:"bg",className:"absolute absolute--fill",dangerouslySetInnerHTML:e.outputHTML("{{Background}}")}),l("div",b,a)])};exports.sectionRender=sectionRender;

},{}],9:[function(require,module,exports){
"use strict";function tplRender(t,e,a){var n,r,l,d,i,s=wp.element.createElement,o="relative ",p="relative "+e.block.id.replace("/","-"),g=e.attrs["Inner Padding left/right tablet"],u=e.attrs["Inner Padding left/right mobile"];return n=e.attrs["Inner Padding unit"],r=e.attrs["Inner Padding top"],l=e.attrs["Inner Padding left"],d=e.attrs["Inner Padding bottom"],i=e.attrs["Inner Padding right"],"px"===n&&(r*=5,l*=5,d*=5,i*=5),r=r?r+n:0,l=l?l+n:0,d=d?d+n:0,i=i?i+n:0,e.attrs.Layout&&(o+=" "+e.attrs.Layout),e.attrs["Column gap"]&&(p+=" "+e.attrs["Column gap"]),e.attrs["Full height"]&&(p+=" "+e.attrs["Full height"]),s("div",{className:o,key:"caxton-grid-block"},s("div",{key:"bg",className:"absolute absolute--fill",dangerouslySetInnerHTML:e.outputHTML("{{Background}}")}),s("div",{className:p,style:{paddingTop:r,paddingLeft:l,paddingBottom:d,paddingRight:i,gridTemplateColumns:"repeat(12, 1fr)"},"data-tablet-css":"padding-left:"+u+"em;padding-right:"+u+"em;","data-mobile-css":"padding-left:"+g+"em;padding-right:"+g+"em;",key:"block"},a))}function tplContent(t,e,a){var n=wp.element.createElement;if(t.attributes.tpl&&0===t.attributes.tpl.indexOf("[")&&t.attributes.tpl.indexOf("]")>0){var r=JSON.parse(t.attributes.tpl);return n(caxtonWPEditor.InnerBlocks,{template:r,templateLock:!1,key:"innerblocks"})}return a(t,e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.tplRender=tplRender,exports.tplContent=tplContent;

},{}]},{},[1]);
