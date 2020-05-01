(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(n,!0).forEach(function(t){_defineProperty(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var n=[],o=!0,i=!1,a=void 0;try{for(var l,r=e[Symbol.iterator]();!(o=(l=r.next()).done)&&(n.push(l.value),!t||n.length!==t);o=!0);}catch(e){i=!0,a=e}finally{try{o||null==r.return||r.return()}finally{if(i)throw a}}return n}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function initCaxton(e,t,n,o,i){window.caxtonWPEditor=wp.blockEditor?wp.blockEditor:wp.editor;var a=caxtonWPEditor,l=o.__,r=t.registerBlockType,s=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},c=function(t,o,i){t?t.__html&&(t=t.__html):t="",o||(o={}),i||(i="div");var a=e.extend({dangerouslySetInnerHTML:{__html:t}},o);return n(i,a)},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=caxtonFAIconsSvg[e];if(n||(n=caxtonFAIconsSvg[e+"-solid"])||(n=caxtonFAIconsSvg[e+"-brand"])||(n=caxtonFAIconsSvg[e+"-regular"]),t){var o="object"===_typeof(t)?t:{};return c(n,o)}return n},p=function(){function t(n){_classCallCheck(this,t);var o=this;this.setProps(),n.id||console.error("Parameter `id` is required for CaxtonBlock"),this.block=e.extend({title:n.id,icon:"star-filled",category:"layout",fields:{},attributes:{}},n),o.tpl=n.tpl,n.toolbars?n.fields=jQuery.extend(n.fields,n.toolbars):n.toolbars={},n.resizable&&(n.resizable.height&&(this.block.attributes[n.resizable.height]={type:"string"}),n.resizable.width&&(this.block.attributes[n.resizable.width]={type:"string"})),o.fields=o.processFields(n.fields),o.sections=n.sections?n.sections:{},o.sectionsFields=o.processSections(o.fields),o.toolbars=o.processFields(n.toolbars),o.registerBlock()}return _createClass(t,[{key:"setProps",value:function(){this.keySuffix=0}}]),_createClass(t,[{key:"preprocessField_overlay",value:function(e,t){var n=s({color:"",color2:"",gradient:"linear-gradient( ",opacity:"1"},t[e].defaults||{});t[e]=Object.assign({section:"Overlay",tpl:'<div class="absolute absolute--fill" style="background-color:{{Background color}};{{Gradient type}}{{Background colors opacity}}"></div>'},t[e]);var o=t[e].section;Object.assign(t,{"Background color":{type:"color",section:o,default:n.color},"Gradient color":{type:"color",section:o,tpl:", %s",default:n.color2},"Gradient type":{type:"select",options:[{value:"linear-gradient( ",label:"Linear vertical"},{value:"linear-gradient( 90deg, ",label:"Linear horizontal"},{value:"linear-gradient( 45deg, ",label:"Linear 45 deg"},{value:"linear-gradient( -45deg, ",label:"Linear 45 deg anticlockwise"},{value:"radial-gradient( ",label:"Radial gradient"}],section:o,tpl:"background-image:%s{{Background color}}{{Gradient color}});",default:n.gradient},"Background colors opacity":{type:"range",min:0,max:1,step:.05,help:"Reduce opacity to have transparent colors over image",section:o,tpl:"opacity:%s;",default:n.opacity}})}},{key:"preprocessField_background",value:function(e,t){var n=s({image:"",image_position:"",parallax:""},t[e].defaults||{}),o="background-color:{{Background color}};{{Gradient type}}",i='<div class="absolute absolute--fill cover bg-center" style="'+o+'{{Background image}}{{Background image position}}{{Background parallax}}"></div><div class="absolute absolute--fill" style="'+o+'{{Background colors opacity}}"></div>';t[e]=Object.assign({section:"Background",tpl:i},t[e]);var a=t[e].section;Object.assign(t,{"Background image":{type:"image",section:a,tpl:"background-image:url(%s);",default:n.image},"Background image position":{type:"position",section:a,tpl:"background-position:%s;",default:n.image_position},"Background parallax":{type:"toggle",value:"background-attachment:fixed;",section:a,default:n.parallax}}),this.preprocessField_overlay(e,t),t[e].tpl=i}},{key:"preprocessFields",value:function(e){for(var t in e)e.hasOwnProperty(t)&&e[t].type&&"function"==typeof this["preprocessField_"+e[t].type]&&this["preprocessField_"+e[t].type](t,e);return e}},{key:"processFields",value:function(e){var t=[];for(var n in e=this.preprocessFields(e))if(e.hasOwnProperty(n)){var o=e[n],i={};"object"===_typeof(o)?i=o:i.type=o,i.id=n,i.label=i.label?i.label:n,"checkbox"!==i.type&&"toggle"!==i.type||(i.value=i.value||"1"),!i.default&&isNaN(i.default)?i.default="":i.default=""+i.default,i.attr?this.block.attributes[n]=i.attr:this.block.attributes[n]={type:this.fieldAttrType(i)},t.push(i)}return t}},{key:"fieldAttrType",value:function(e){var t=e.type,n={number:"number",range:"number"};return n[t]?n[t]:"string"}},{key:"processSections",value:function(e){for(var t={},n=0;n<e.length;n++){var o=e[n].section;o&&(t[o]||(t[o]=[]),t[o].push(e[n]))}return t}},{key:"fieldProps",value:function(t,n){var o=t.id,i=this,a=e.extend({},t);return a.key="".concat(a.type,"-").concat(n),a.onChange||(a.value=i.attrs[o],a.onChange=function(e,n){var a={};a[o]=e,"checkbox"!==t.type&&"toggle"!==t.type||(a[o]=e?t.value:""),i.focussedProps.setAttributes(a),"function"==typeof t.onChange&&t.onChange(e,i,n)},delete a.id,delete a.type),a}},{key:"editableFieldEl",value:function(e,t){return null}},{key:"overlayFieldEl",value:function(e,t){return null}},{key:"backgroundFieldEl",value:function(e,t){return null}},{key:"imageFieldEl",value:function(e,t){var o=this.fieldProps(e,t);o.className||(o.className="");var r=l("Select image"),s=null;return o.value&&(o.value.indexOf("featured_image")>-1&&o.onChange(caxton.content_vars[o.value]),r=[n("img",{src:o.value,key:"image"}),l("Click the image to edit or update")],s=n("a",{className:"caxton-remove-image",href:"#",onClick:function(){o.onChange("",{})}},n("i",{className:"dashicons dashicons-no"}),"Remove")),o.className+=" caxton-image-picker",n(i.BaseControl,o,n(a.MediaUpload,{key:"imagePicker",onSelect:function(e){o.onChange(e.url,e)},type:"image",value:o.value,label:o.label,render:function(e){var t=e.open;return n("span",{className:"v-mid dib"},s,n(i.Button,{className:o.value?"image-button":"ml3 button button-large ",onClick:t},r))}}))}},{key:"colorFieldEl",value:function(e,t){var o=[],i=this.fieldProps(e,t);return i.title=i.label,void 0===i.initialOpen&&(i.initialOpen=!i.value),e.help&&o.push(e.help),i.colorSettings=[{label:i.label,value:i.value,onChange:i.onChange}],n(caxtonWPEditor.PanelColorSettings,i,o)}},{key:"checkboxFieldEl",value:function(e,t){var o=this.fieldProps(e,t);return o.checked=!!this.attrs[e.id],n(i.CheckboxControl,o)}},{key:"radioFieldEl",value:function(e,t){var o=this.fieldProps(e,t);return o.selected=o.value,n(i.RadioControl,o)}},{key:"rangeFieldEl",value:function(e,t){return n(i.RangeControl,this.fieldProps(e,t))}},{key:"selectFieldEl",value:function(e,t){return n(i.SelectControl,this.fieldProps(e,t))}},{key:"orderedSelectFieldEl",value:function(t,o){for(var a,l,r=this.fieldProps(t,o),s=r.delimiter?r.delimiter:",",c=void 0===r.multiple||r.multiple,u={},p=[],d=[],f=r.value?r.value.split(s):[],h=0;h<r.options.length;h++)a=r.options[h],l=n("div",{className:"caxton-orderedselect-option","data-val":a.value,key:"option-".concat(a.value)},a.image?n("img",{src:a.image}):null,a.label),"number"==typeof a.value&&(a.value=a.value.toString()),f.includes(a.value)?u[a.value]=a:d.push(l);for(h=0;h<f.length;h++)a=u[f[h]],l=n("div",{className:"caxton-orderedselect-option","data-val":a.value,key:"option-".concat(a.value)},a.image?n("img",{src:a.image}):null,a.label),p.push(l);return p.length||p.push(n("span",{className:"caxton-placeholder o70",key:"placeholder"},"Please choose...")),p.push(n("i",{className:"dashicons dashicons-arrow-down",key:"down-arrow-icon"})),n(i.BaseControl,r,n("div",{className:"caxton-orderedselect-wrap",key:"orderedselect-wrap"},n("div",{className:"caxton-orderedselect-selected",key:"selected-options",onClick:function(t){var n,o=t.target,i=e(o);i.hasClass("caxton-orderedselect-option")?(n=i.attr("data-val"),f.splice(f.indexOf(n),1),r.onChange(f.join(s))):i.closest(".caxton-orderedselect-wrap").toggleClass("caxton-orderedselect-open")}},p),n("div",{className:"caxton-orderedselect-available",key:"available-options",onClick:function(t){var n,o=t.target,i=e(o);i.hasClass("caxton-orderedselect-option")&&(n=i.attr("data-val"),c?f.push(n):f=[n],r.onChange(f.join(s)))}},d)))}},{key:"fontFieldEl",value:function(t,o){t.tpl||(t.tpl="font-family: %s;");var a=this.fieldProps(t,o),l=a.onChange;return a.onChange=function(t){if(!t.includes(",")){var n=e("<link rel='stylesheet' class='caxton-google-font'>");n.attr("href","https://fonts.googleapis.com/css?family=".concat(t)),e("body").append(n)}l(t)},a.options=caxton.fonts,n(i.SelectControl,a)}},{key:"textFieldEl",value:function(e,t){return n(i.TextControl,this.fieldProps(e,t))}},{key:"customFieldEl",value:function(e,t){return e.render(this.fieldProps(e),this)}},{key:"textareaFieldEl",value:function(e,t){return n(i.TextareaControl,this.fieldProps(e,t))}},{key:"dateTimeFieldEl",value:function(e,t){return datetimeFieldEl(e,t)}},{key:"datetimeFieldEl",value:function(e,t){var o=this.fieldProps(e,t);return o.currentDate=o.value,n(i.PanelBody,{title:o.label},n(i.DateTimePicker,o))}},{key:"toggleFieldEl",value:function(e,t){var o=this.fieldProps(e,t);return o.checked=!!this.attrs[e.id],n(i.ToggleControl,o)}},{key:"iconFieldEl",value:function(t,o){var a=this.fieldProps(t,o),r=[];a.title=a.label,a.className="caxton-icon-picker-panel";for(var s=0;s<100;s++){var c=caxtonFAIconsData[s];r.push(u(c.n,{key:s,className:"icon-choice","data-icon":c.n},"i"))}return r.push(n("p",{key:"helptext"},"Search icons for more from all Font Awesome icons")),n(i.PanelBody,a,n("div",{className:"caxton-icon-picker",onClick:function(t){var n=t.target,o=e(n).closest(".icon-choice");o.length&&a.onChange(o.html())}},n("input",{type:"text",placeholder:l("Search icons","caxton"),onKeyUp:function(t){var n,o=t.target,i=o.value,a=0;i=i.toLowerCase(),(n=e(o).siblings(".caxton-matching-icons")).html("");for(var l=0;a<50&&l<caxtonFAIconsData.length;l++){var r=caxtonFAIconsData[l];r.n.includes(i)?(a++,n.append('<i data-icon="'.concat(r.n,'" class="icon-choice">')+u(r.n,!1)+"</i>")):a<34&&r.s.includes(i)&&(a++,n.append('<i data-icon="'.concat(r.n,'" class="icon-choice order-2">')+u(r.n,!1)+"</i>"))}}}),n("span",{className:"dashicons dashicons-search",title:l("Search","caxton")}),n("span",{className:"dashicons dashicons-no",title:l("Remove icon","caxton"),style:{cursor:"pointer",display:a.value?"block":"none"},onClick:function(){a.onChange("")}}),n("div",{className:"caxton-matching-icons",onClick:function(e){var t=e.target;"I"===t.tagName&&a.onChange(" ".concat(t.className.replace(" o-70","")))}},r)))}},{key:"positionFieldEl",value:function(e,t){var o=this.fieldProps(e,t);return o.selected=o.value,o.options=[{value:"center top",label:"Top"},{value:"",label:"Center"},{value:"center bottom",label:"Bottom"}],n(i.RadioControl,o)}},{key:"AlignmentToolbarInit",value:function(t,o){var a=this.fieldProps(t,o),r=e.extend({left:" tl",right:" tr",center:" tc"},a.values||{});return a.controls=[{icon:"editor-alignleft",title:l("Align left"),isActive:a.value===r.left,onClick:function(){a.onChange(r.left)}},{icon:"editor-aligncenter",title:l("Align center"),isActive:a.value===r.left,onClick:function(){a.onChange(r.left)}},{icon:"editor-alignright",title:l("Align right"),isActive:a.value===r.center,onClick:function(){a.onChange(r.center)}}],a.wideControlsEnabled=!0,n(i.Toolbar,a)}},{key:"BlockWidthToolbarInit",value:function(e,t){var o=this.fieldProps(e,t);return o.controls=[{icon:"align-center",title:l("Default"),isActive:!o.value,onClick:function(){o.onChange("")}},{icon:"align-wide",title:l("Wide width"),isActive:" vw-100-bg"===o.value,onClick:function(){o.onChange(" vw-100-bg")}},{icon:"align-full-width",title:l("Full width"),isActive:" vw-100"===o.value,onClick:function(){o.onChange(" vw-100")}}],o.wideControlsEnabled=!0,n(i.Toolbar,o)}},{key:"BlockAlignToolbarInit",value:function(e,t){var o=this.fieldProps(e,t);return o.controls=[{icon:"align-left",title:l("Align left"),isActive:" fl"===o.value,onClick:function(){o.onChange(" fl")}},{icon:"align-center",title:l("Align center"),isActive:!o.value,onClick:function(){o.onChange("")}},{icon:"align-right",title:l("Align right"),isActive:" rl"===o.value,onClick:function(){o.onChange(" rl")}}],o.wideControlsEnabled=!0,n(i.Toolbar,o)}},{key:"renderPanel",value:function(t){this.fields;var o,a={};return this.sections[t]&&(a=this.sections[t]),(a=e.extend(a,{title:t,className:"",key:"CaxtonPanel".concat(t),initialOpen:!1})).className+="caxton-section caxton-section-".concat(t.toLowerCase().replace(/[^0-z]/g,"-")),o=this.renderFields(this.sectionsFields[t],t),n(i.PanelBody,a,o)}},{key:"fieldEl",value:function(e,t,n){return void 0===n&&(n=this.keySuffix++),t||(t=e.type+"FieldEl"),this[t](e,n)}},{key:"renderFields",value:function(e,t,n){var o=[],i=[];n||(n="FieldEl");for(var a=0;a<e.length;a++){var l,r=e[a];n.includes("Toolbar")&&(r.type=r.type.replace("Toolbar","")),"function"==typeof r.render&&(r.type="custom"),"function"==typeof this[l=r.type+n]?r.hide||(t?r.section==t&&o.push(this.fieldEl(r,l,a)):r.section?i.includes(r.section)||(i.push(r.section),o.push(this.renderPanel(r.section))):o.push(this.fieldEl(r,l,a))):r.type.includes("Toolbar")||console.error("".concat(n.replace("Init","")," ").concat(r.id," of type ").concat(r.type," and callback ").concat(l," not supported."))}return o}},{key:"resizableElement",value:function(e,t,o){var a,l=(o=o||this.props).attributes,r=o.setAttributes,s=o.isSelected,c=e.height,u=e.width,p=_slicedToArray(wp.element.useState(!1),2),d=p[0],f=p[1];if(c||u){a=(e=jQuery.extend({enable:[],onResizeStop:function(){},onResize:function(){},onResizeStart:function(){}},e)).enable.toString().toLowerCase();var h={top:!1,right:!1,bottom:!1,left:!1,topRight:!1,bottomRight:!1,bottomLeft:!1,topLeft:!1},v={key:"caxton-resizable",className:{"caxton-resizable":!0,"is-selected":s,"is-resizing":d},size:{},onResizeStop:function(t,n,o,i){e.onResizeStop(t,n,o,i),f(!1)},onResize:function(t,n,o,i){e.onResize(t,n,o,i);var a={};c&&(a[c]=o.clientHeight),u&&(a[u]=o.clientWidth),r(a)},onResizeStart:function(t,n,o,i){e.onResizeStart(t,n,o,i),f(!0)}};return e.size&&(v.size=e.size),c&&(l[c]&&(v.size.height=l[c]),v.minHeight=e.minHeight||50,a.indexOf("top")>-1||a.indexOf("bottom")>-1||e.enable.push("bottom")),u&&(l[u]&&(v.size.width=l[u]),v.minWidth=e.minWidth||50,a.indexOf("left")>-1||a.indexOf("right")>-1||e.enable.push("right")),e.enable.forEach(function(e){h.hasOwnProperty(e)&&(h[e]=!0)}),v.enable=h,n(i.ResizableBox,v,n("div",{className:"caxton-resizable-contents h-100"},t))}return t}},{key:"toolbarElements",value:function(){var e=this.renderFields(this.toolbars,!1,"ToolbarInit");if(e.length)return n(a.BlockControls,{key:"toolbars"},e)}},{key:"inspectorFields",value:function(){var e=this.fields,t=[];if((t=t.concat(this.renderFields(e)))&&t.length)return n(a.InspectorControls,{key:"inspector"},t)}},{key:"populateField_editable",value:function(e,t,n){var o=l("Click to Edit");return t.tag||(t.tag="span"),n?(e===t.default&&(e="<".concat(t.tag,' class="default">').concat(e,"</").concat(t.tag,">")),e="<".concat(t.tag,' contentEditable="true" title="').concat(o,'" data-caxtonEditableProp="').concat(t.id,'">').concat(e,"</").concat(t.tag,">")):e&&(e="<".concat(t.tag,">").concat(e,"</").concat(t.tag,">")),e}},{key:"populateField_overlay",value:function(e,t){return"1"}},{key:"populateField_background",value:function(e,t){return"1"}},{key:"populateFields",value:function(e,t){if(!e)return"";for(var n in this.fields)if(this.fields.hasOwnProperty(n)){var o,i=this.fields[n],a=o=this.attrs[i.id];"function"==typeof this["populateField_"+i.type]&&(a=this["populateField_"+i.type](a,i,t)),(a||"number"==typeof a)&&i.tpl&&(a=this.callbackValue(i.tpl,a).replace(/%s/g,a)),e=(e=e.split("{{_".concat(i.id,"}}")).join(o)).split("{{".concat(i.id,"}}")).join(a)}return e}},{key:"parseTpl",value:function(e,t){return e=this.populateFields(e,t),this.populateFields(e,t)}},{key:"outputHTML",value:function(e,t){return{__html:this.parseTpl(e,t)}}},{key:"callbackValue",value:function(e,t){return"function"==typeof e?e(t,this):e}},{key:"editableTpl",value:function(t,o){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=this;return o=this.callbackValue(o,t),i=s({key:"block",dangerouslySetInnerHTML:a.outputHTML(o,"edit"),onClick:function(e){e.preventDefault()},onKeyDown:function(t){var n=t.target,o=e(n).find(".default");o.length&&o.remove()},onBlur:function(t){var n=t.target,o=e(n),i={};i[o.attr("data-caxtonEditableProp")]=o.html(),a.focussedProps.setAttributes(i)}},i),n("div",i)}},{key:"edit",value:function(e){if(this.block)return"function"==typeof this.block.edit?this.block.edit(e,this):this.editableTpl(e,this.tpl)}},{key:"save",value:function(e){this.block.id;if(this.block)return"function"==typeof this.block.save?this.block.save(e,this):n("div",{dangerouslySetInnerHTML:this.outputHTML(this.callbackValue(this.tpl,e))})}},{key:"saveBlockProperties",value:function(e){for(var t in this.props=e,this.attrs=this.props.attributes,this.fields)if(this.fields.hasOwnProperty(t)){var n=this.fields[t];!this.attrs[n.id]&&isNaN(this.attrs[n.id])?this.attrs[n.id]=n.default:"image"===n.type&&this.attrs[n.id].indexOf("featured_image")>-1?this.attrs[n.id]=caxton.content_vars[this.attrs[n.id]]:this.attrs[n.id]=this.attrs[n.id]}}},{key:"registerBlock",value:function(){var t,o=this,i=this.block,a=e.extend({},i);if(i.icon.includes("<svg")){var l=jQuery(i.icon),u={};e.each(l[0].attributes,function(){this.specified&&(t=this.name.replace(/[-:]([a-z])/g,function(e){return e[1].toUpperCase()}),u[t]=this.value)}),u.height=20,u.width=20,i.icon=c(l.html(),u,"svg")}delete a.fields,delete a.tpl,delete a.id,a.icon=i.icon;var p=function(e){var t=[];if(o.saveBlockProperties(e),"function"==typeof o.block.beforeEdit){var i=o.block.beforeEdit(e,o);i&&t.push(i)}e.isSelected&&(o.focussedProps=e,t.push(o.inspectorFields()),t.push(o.toolbarElements()));var a=o.edit(e);if(o.block.resizable&&(a=o.resizableElement(o.block.resizable,a)),t.push(a),"function"==typeof o.block.afterEdit){var l=o.block.afterEdit(e,o);l&&t.push(l)}return n("div",{key:"block-content"},t)};if(a.edit=p,a.getEditWrapperProps=function(e){var t={},n=e.Layout,a=e.BlockAlignment;if(a=a||e["Block Alignment"],n&&(t["caxton-layout"]=n),a){t["data-align"]={" fl":"left"," rl":"right"}[a]}return"function"==typeof i.registerBlockProps&&(t=jQuery.extend(i.registerBlockProps(e,o),t)),"function"==typeof o.block.wrapperProps&&(t=o.block.wrapperProps(t,e,o)),t},a.save=function(e){return o.saveBlockProperties(e),o.save(e)},void 0!==i.apiUrl){"function"!=typeof i.apiUrl&&(i.apiUrl=function(){return{apiData:i.apiUrl}}),"function"==typeof i.apiCallback&&(o.block.edit=i.apiCallback);a.edit=function(e){var t=_slicedToArray(wp.element.useState("{}"),2),n=t[0],o=t[1],a=JSON.parse(n),l=i.apiUrl(e),r=function(e){l.hasOwnProperty(e)&&(a[e]&&l[e]===a[e].path||(a[e]={},wp.apiFetch({path:l[e]}).then(function(t){a[e].data!==t&&(a[e].data=t,a[e].path=l[e],o(JSON.stringify(a)))})))};for(var c in l)r(c);return p(s(_objectSpread({},e),a))},"function"!=typeof this.block.save&&(a.save=function(){return null})}-1===i.id.indexOf("/")&&(i.id="caxton/".concat(i.id)),r(i.id,a)}}]),t}();p.prototype.orderedselectFieldEl=p.prototype.orderedSelectFieldEl,window.CaxtonBlock=function(e){return new p(e)},window.CaxtonContentBlock=function(e){for(var t=Caxton.copyObj({tag:"div",props:{},tplProps:{},innerProps:{classname:"caxton-content-wrapper"},prefix:"",prefixProps:{},suffix:"",suffixProps:{},template:[]},e),o=["tag","props","innerProps","template","prefix","prefixProps","tplProps","suffix","suffixProps"],i=0;i<o.length;i++){delete e[o[i]]}return e.edit=function(e,o){var i=function(t){return o.callbackValue(t,e)};return n(t.tag,i(t.props),t.prefix&&o.editableTpl(e,i(t.prefix),i(t.prefixProps)),t.tpl&&o.editableTpl(e,i(t.tpl),i(t.tplProps)),n("div",i(t.innerProps),n(a.InnerBlocks,{template:t.template})),t.suffix&&o.editableTpl(e,i(t.suffix),i(t.suffixProps)))},e.save=function(e,o){var i=function(t){return o.callbackValue(t,e)};return n(t.tag,o.callbackValue(t.props),t.prefix&&c(o.outputHTML(i(t.prefix)),i(t.prefixProps)),t.tpl&&c(o.outputHTML(i(t.tpl)),i(t.tplProps)),n("div",i(t.innerProps),n(a.InnerBlocks.Content)),t.suffix&&c(o.outputHTML(i(t.suffix)),i(t.suffixProps)))},new p(e)},window.caxtonRegisterFieldType=function(e,t){},window.Caxton={el:n,el2html:function(e){var t="";if(e){e.length||(e=[e]);for(var n=0;n<e.length;n++){var o=e[n];switch(_typeof(o)){case"object":t+=wp.element.renderToString(o);break;default:t+=o}}}return t},html2el:c,copyObj:s,styleObject:function(e){for(var t={},n=e.split(";"),o=0;o<n.length;o++){var i=n[o].split(/:(.+)/);t[i[0]]=i[1]}return t},tplProc:function(e,t){var n;for(n in t)t.hasOwnProperty(n)&&(e=e.split("{{".concat(n,"}}")).join(t[n]));for(n in t)t.hasOwnProperty(n)&&(e=e.split("{{".concat(n,"}}")).join(t[n]));return e},iconSvg:u}}initCaxton(jQuery,wp.blocks,wp.element.createElement,window.wp.i18n,wp.components),jQuery(function(e){setTimeout(function(){if("string"==typeof ajaxurl){for(var t,n,o=wp.data.select("core/blocks").getBlockTypes(),i={},a=0;a<o.length;a++)n="object"===_typeof(n=(t=o[a]).icon.src)?Caxton.el2html(n):'<span class="dashicons dashicons-'.concat(n,'"></span>'),i[t.name]={title:t.title,icon:n,category:t.category};e.post(ajaxurl,{action:"caxton_save_blocks",blocks:JSON.stringify(i)})}},2500)}),setTimeout(function(){CaxtonUtils.asset("icons-data.js"),CaxtonUtils.asset("icons-svg.js")},2500);

},{}]},{},[1]);
