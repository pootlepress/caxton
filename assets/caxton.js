(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function _possibleConstructorReturn(e,t){return!t||"object"!==_typeof(t)&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function initCaxton(e,t,o,n,i){window.caxtonWPEditor=wp.blockEditor?wp.blockEditor:wp.editor;var a=caxtonWPEditor,l=n.__,r=t.registerBlockType,c=function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);return e},s=function(t,n,i){n||(n={}),i||(i="div");var a=e.extend({dangerouslySetInnerHTML:{__html:t}},n);return o(i,a)},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=caxtonFAIconsSvg[e];if(o||(o=caxtonFAIconsSvg[e+"-solid"])||(o=caxtonFAIconsSvg[e+"-brand"])||(o=caxtonFAIconsSvg[e+"-regular"]),t){var n="object"===_typeof(t)?t:{};return s(o,n)}return o},d=function(){function t(o){_classCallCheck(this,t);var n=this;this.keySuffix=0,o.id||console.error("Parameter `id` is required for CaxtonBlock"),this.block=e.extend({title:o.id,icon:"star-filled",category:"layout",fields:{},attributes:{}},o),n.tpl=o.tpl,o.toolbars?o.fields=jQuery.extend(o.fields,o.toolbars):o.toolbars={},n.fields=n.processFields(o.fields),n.sections=o.sections?o.sections:{},n.sectionsFields=n.processSections(n.fields),n.toolbars=n.processFields(o.toolbars),n.registerBlock()}return _createClass(t,[{key:"preprocessField_background",value:function(e,t){Object.assign(t[e],{section:"Background",tpl:'<div class="cover bg-center absolute absolute--fill" style="background-color:{{Background color}};{{Gradient type}}{{Background image}}{{Background image position}}{{Background parallax}}"></div><div class="absolute absolute--fill" style="background-color:{{Background color}};{{Gradient type}}{{Background colors opacity}}"></div>'});var o=t[e];Object.assign(t,{"Background image":{type:"image",section:o.section,tpl:"background-image:url(%s);"},"Background image position":{type:"position",section:o.section,tpl:"background-position:%s;"},"Background parallax":{type:"toggle",value:"background-attachment:fixed;",section:o.section},"Background color":{type:"color",section:o.section},"Gradient color":{type:"color",section:o.section,tpl:", %s"},"Gradient type":{type:"select",options:[{value:"linear-gradient( ",label:"Linear vertical"},{value:"linear-gradient( 90deg, ",label:"Linear horizontal"},{value:"linear-gradient( 45deg, ",label:"Linear 45 deg"},{value:"linear-gradient( -45deg, ",label:"Linear 45 deg anticlockwise"},{value:"radial-gradient( ",label:"Radial gradient"}],default:"linear-gradient( ",section:o.section,tpl:"background-image:%s{{Background color}}{{Gradient color}});"},"Background colors opacity":{type:"range",min:0,max:1,step:.05,help:"Reduce opacity to have transparent colors over image",default:"1",section:o.section,tpl:"opacity:%s;"}})}},{key:"preprocessFields",value:function(e){for(var t in e)e.hasOwnProperty(t)&&e[t].type&&"function"==typeof this["preprocessField_"+e[t].type]&&this["preprocessField_"+e[t].type](t,e);return e}},{key:"processFields",value:function(e){var t=[];for(var o in e=this.preprocessFields(e))if(e.hasOwnProperty(o)){var n=e[o],i={};"object"===_typeof(n)?i=n:i.type=n,i.id=o,i.label=i.label?i.label:o,"checkbox"!==i.type&&"toggle"!==i.type||(i.value=i.value||"1"),!i.default&&isNaN(i.default)&&(i.default=""),i.attr?this.block.attributes[o]=i.attr:this.block.attributes[o]={type:this.fieldAttrType(i)},t.push(i)}return t}},{key:"fieldAttrType",value:function(e){var t=e.type,o={number:"number",range:"number"};return o[t]?o[t]:"string"}},{key:"processSections",value:function(e){for(var t={},o=0;o<e.length;o++){var n=e[o].section;n&&(t[n]||(t[n]=[]),t[n].push(e[o]))}return t}},{key:"fieldProps",value:function(t,o){var n=t.id,i=this,a=e.extend({},t);return a.key="".concat(a.type,"-").concat(o),a.onChange||(a.value=i.attrs[n],a.onChange=function(e,o){var a={};a[n]=e,"checkbox"!==t.type&&"toggle"!==t.type||(a[n]=e?t.value:""),i.focussedProps.setAttributes(a),"function"==typeof t.onChange&&t.onChange(e,i,o)},delete a.id,delete a.type),a}},{key:"backgroundFieldEl",value:function(e,t){return null}},{key:"imageFieldEl",value:function(e,t){var n=this.fieldProps(e,t);n.className||(n.className="");var r=l("Select image"),c=null;return n.value&&(n.value.indexOf("featured_image")>-1&&n.onChange(caxton.content_vars[n.value]),r=[o("img",{src:n.value,key:"image"}),l("Click the image to edit or update")],c=o("a",{className:"caxton-remove-image",href:"#",onClick:function(){n.onChange("",{})}},o("i",{className:"dashicons dashicons-no"}),"Remove")),n.className+=" caxton-image-picker",o(i.BaseControl,n,o(a.MediaUpload,{key:"imagePicker",onSelect:function(e){n.onChange(e.url,e)},type:"image",value:n.value,label:n.label,render:function(e){var t=e.open;return o("span",{className:"v-mid dib"},c,o(i.Button,{className:n.value?"image-button":"button button-large",onClick:t},r))}}))}},{key:"colorFieldEl",value:function(e,t){var n=[],i=this.fieldProps(e,t);return i.title=i.label,void 0===i.initialOpen&&(i.initialOpen=!i.value),e.help&&n.push(e.help),i.colorSettings=[{label:i.label,value:i.value,onChange:i.onChange}],o(caxtonWPEditor.PanelColorSettings,i,n)}},{key:"checkboxFieldEl",value:function(e,t){var n=this.fieldProps(e,t);return n.checked=!!this.attrs[e.id],o(i.CheckboxControl,n)}},{key:"radioFieldEl",value:function(e,t){var n=this.fieldProps(e,t);return n.selected=n.value,o(i.RadioControl,n)}},{key:"rangeFieldEl",value:function(e,t){return o(i.RangeControl,this.fieldProps(e,t))}},{key:"selectFieldEl",value:function(e,t){return o(i.SelectControl,this.fieldProps(e,t))}},{key:"orderedSelectFieldEl",value:function(t,n){for(var a,l,r=this.fieldProps(t,n),c=r.delimiter?r.delimiter:",",s=void 0===r.multiple||r.multiple,u={},d=[],p=[],f=r.value?r.value.split(c):[],h=0;h<r.options.length;h++)a=r.options[h],l=o("div",{className:"caxton-orderedselect-option","data-val":a.value,key:"option-".concat(a.value)},a.image?o("img",{src:a.image}):null,a.label),"number"==typeof a.value&&(a.value=a.value.toString()),f.includes(a.value)?u[a.value]=a:p.push(l);for(h=0;h<f.length;h++)a=u[f[h]],l=o("div",{className:"caxton-orderedselect-option","data-val":a.value,key:"option-".concat(a.value)},a.image?o("img",{src:a.image}):null,a.label),d.push(l);return d.length||d.push(o("span",{className:"caxton-placeholder o70",key:"placeholder"},"Please choose...")),d.push(o("i",{className:"dashicons dashicons-arrow-down",key:"down-arrow-icon"})),o(i.BaseControl,r,o("div",{className:"caxton-orderedselect-wrap",key:"orderedselect-wrap"},o("div",{className:"caxton-orderedselect-selected",key:"selected-options",onClick:function(t){var o,n=t.target,i=e(n);i.hasClass("caxton-orderedselect-option")?(o=i.attr("data-val"),f.splice(f.indexOf(o),1),r.onChange(f.join(c))):i.closest(".caxton-orderedselect-wrap").toggleClass("caxton-orderedselect-open")}},d),o("div",{className:"caxton-orderedselect-available",key:"available-options",onClick:function(t){var o,n=t.target,i=e(n);i.hasClass("caxton-orderedselect-option")&&(o=i.attr("data-val"),s?f.push(o):f=[o],r.onChange(f.join(c)))}},p)))}},{key:"fontFieldEl",value:function(t,n){t.tpl||(t.tpl="font-family: %s;");var a=this.fieldProps(t,n),l=a.onChange;return a.onChange=function(t){if(!t.includes(",")){var o=e("<link rel='stylesheet' class='caxton-google-font'>");o.attr("href","https://fonts.googleapis.com/css?family=".concat(t)),e("body").append(o)}l(t)},a.options=caxton.fonts,o(i.SelectControl,a)}},{key:"textFieldEl",value:function(e,t){return o(i.TextControl,this.fieldProps(e,t))}},{key:"customFieldEl",value:function(e,t){return e.render(this.fieldProps(e),this)}},{key:"textareaFieldEl",value:function(e,t){return o(i.TextareaControl,this.fieldProps(e,t))}},{key:"toggleFieldEl",value:function(e,t){var n=this.fieldProps(e,t);return n.checked=!!this.attrs[e.id],o(i.ToggleControl,n)}},{key:"iconFieldEl",value:function(t,n){var a=this.fieldProps(t,n),r=[];a.title=a.label,a.className="caxton-icon-picker-panel";for(var c=0;c<100;c++){var s=caxtonFAIconsData[c];r.push(u(s.n,{key:c,className:"icon-choice","data-icon":s.n},"i"))}return r.push(o("p",{key:"helptext"},"Search icons for more from all Font Awesome icons")),o(i.PanelBody,a,o("div",{className:"caxton-icon-picker",onClick:function(t){var o=t.target,n=e(o).closest(".icon-choice");n.length&&(console.log(n.html()),a.onChange(n.html()))}},o("input",{type:"text",placeholder:l("Search icons","caxton"),onKeyUp:function(t){var o,n=t.target,i=n.value,a=0;i=i.toLowerCase(),(o=e(n).siblings(".caxton-matching-icons")).html("");for(var l=0;a<50&&l<caxtonFAIconsData.length;l++){var r=caxtonFAIconsData[l];r.n.includes(i)?(a++,o.append('<i data-icon="'.concat(r.n,'" class="icon-choice">')+u(r.n,!1)+"</i>")):a<34&&r.s.includes(i)&&(a++,o.append('<i data-icon="'.concat(r.n,'" class="icon-choice order-2">')+u(r.n,!1)+"</i>"))}}}),o("span",{className:"dashicons dashicons-search",title:l("Search","caxton")}),o("span",{className:"dashicons dashicons-no",title:l("Remove icon","caxton"),style:{cursor:"pointer",display:a.value?"block":"none"},onClick:function(){a.onChange("")}}),o("div",{className:"caxton-matching-icons",onClick:function(e){var t=e.target;"I"===t.tagName&&a.onChange(" ".concat(t.className.replace(" o-70","")))}},r)))}},{key:"positionFieldEl",value:function(e,t){var n=this.fieldProps(e,t);return n.selected=n.value,n.options=[{value:"center top",label:"Top"},{value:"",label:"Center"},{value:"center bottom",label:"Bottom"}],o(i.RadioControl,n)}},{key:"AlignmentToolbarInit",value:function(e,t){var n=this.fieldProps(e,t);return n.controls=[{icon:"editor-alignleft",title:l("Align left"),isActive:" tl"===n.value,onClick:function(){n.onChange(" tl")}},{icon:"editor-aligncenter",title:l("Align center"),isActive:" tc"===n.value,onClick:function(){n.onChange(" tc")}},{icon:"editor-alignright",title:l("Align right"),isActive:" tr"===n.value,onClick:function(){n.onChange(" tr")}}],n.wideControlsEnabled=!0,o(i.Toolbar,n)}},{key:"BlockWidthToolbarInit",value:function(e,t){var n=this.fieldProps(e,t);return n.controls=[{icon:"align-center",title:l("Default"),isActive:!n.value,onClick:function(){n.onChange("")}},{icon:"align-wide",title:l("Wide width"),isActive:" vw-100-bg"===n.value,onClick:function(){n.onChange(" vw-100-bg")}},{icon:"align-full-width",title:l("Full width"),isActive:" vw-100"===n.value,onClick:function(){n.onChange(" vw-100")}}],n.wideControlsEnabled=!0,o(i.Toolbar,n)}},{key:"BlockAlignToolbarInit",value:function(e,t){var n=this.fieldProps(e,t);return n.controls=[{icon:"align-left",title:l("Align left"),isActive:" fl"===n.value,onClick:function(){n.onChange(" fl")}},{icon:"align-center",title:l("Align center"),isActive:!n.value,onClick:function(){n.onChange("")}},{icon:"align-right",title:l("Align right"),isActive:" rl"===n.value,onClick:function(){n.onChange(" rl")}}],n.wideControlsEnabled=!0,o(i.Toolbar,n)}},{key:"renderPanel",value:function(t){this.fields;var n,a={};return this.sections[t]&&(a=this.sections[t]),(a=e.extend(a,{title:t,className:"",key:"CaxtonPanel".concat(t),initialOpen:!1})).className+="caxton-section caxton-section-".concat(t.toLowerCase().replace(/[^0-z]/g,"-")),n=this.renderFields(this.sectionsFields[t],t),o(i.PanelBody,a,n)}},{key:"fieldEl",value:function(e,t,o){return void 0===o&&(o=this.keySuffix++),t||(t=e.type+"FieldEl"),this[t](e,o)}},{key:"renderFields",value:function(e,t,o){var n=[],i=[];o||(o="FieldEl");for(var a=0;a<e.length;a++){var l,r=e[a];o.includes("Toolbar")&&(r.type=r.type.replace("Toolbar","")),"function"==typeof r.render&&(r.type="custom"),"function"==typeof this[l=r.type+o]?r.hide||(t?r.section==t&&n.push(this.fieldEl(r,l,a)):r.section?i.includes(r.section)||(i.push(r.section),n.push(this.renderPanel(r.section))):n.push(this.fieldEl(r,l,a))):r.type.includes("Toolbar")||console.error("".concat(o.replace("Init","")," ").concat(r.id," of type ").concat(r.type," and callback ").concat(l," not supported."))}return n}},{key:"toolbarElements",value:function(){var e=this.renderFields(this.toolbars,!1,"ToolbarInit");if(e.length)return o(a.BlockControls,{key:"toolbars"},e)}},{key:"inspectorFields",value:function(){var e=this.fields,t=[];if((t=t.concat(this.renderFields(e)))&&t.length)return o(a.InspectorControls,{key:"inspector"},t)}},{key:"populateField_editable",value:function(e,t,o){var n=l("Click to Edit");return t.tag||(t.tag="span"),o?(e===t.default&&(e="<".concat(t.tag,' class="default">').concat(e,"</").concat(t.tag,">")),e="<".concat(t.tag,' contentEditable="true" title="').concat(n,'" data-caxtonEditableProp="').concat(t.id,'">').concat(e,"</").concat(t.tag,">")):e&&(e="<".concat(t.tag,">").concat(e,"</").concat(t.tag,">")),e}},{key:"populateField_background",value:function(e,t){return"1"}},{key:"populateFields",value:function(e,t){if(!e)return"";for(var o in this.fields)if(this.fields.hasOwnProperty(o)){var n,i=this.fields[o],a=n=this.attrs[i.id];"function"==typeof this["populateField_"+i.type]&&(a=this["populateField_"+i.type](a,i,t)),(a||"number"==typeof a)&&i.tpl&&(a=this.getTpl(i.tpl,a).replace(/%s/g,a)),e=(e=e.split("{{_".concat(i.id,"}}")).join(n)).split("{{".concat(i.id,"}}")).join(a)}return e}},{key:"outputHTML",value:function(e,t){return e=this.populateFields(e,t),{__html:e=this.populateFields(e,t)}}},{key:"getTpl",value:function(e,t){return"function"==typeof e?e(t,this):e}},{key:"getBlockTpl",value:function(e){return this.getTpl(this.tpl,e)}},{key:"edit",value:function(t){var n=this;if(n.block)return"function"==typeof n.block.edit?n.block.edit(t,n):o("div",{key:"block",dangerouslySetInnerHTML:n.outputHTML(n.getBlockTpl(t),"edit"),onClick:function(e){e.preventDefault()},onKeyDown:function(t){var o=t.target,n=e(o).find(".default");n.length&&n.remove()},onBlur:function(t){var o=t.target,i=e(o),a={};a[i.attr("data-caxtonEditableProp")]=i.html(),n.focussedProps.setAttributes(a)}})}},{key:"save",value:function(e){this.block.id;if(this.block)return"function"==typeof this.block.save?this.block.save(e,this):o("div",{dangerouslySetInnerHTML:this.outputHTML(this.getBlockTpl(e))})}},{key:"saveBlockProperties",value:function(e){for(var t in this.props=e,this.attrs=this.props.attributes,this.fields)if(this.fields.hasOwnProperty(t)){var o=this.fields[t];!this.attrs[o.id]&&isNaN(this.attrs[o.id])?this.attrs[o.id]=o.default:"image"===o.type&&this.attrs[o.id].indexOf("featured_image")>-1?this.attrs[o.id]=caxton.content_vars[this.attrs[o.id]]:this.attrs[o.id]=this.attrs[o.id]}}},{key:"registerBlock",value:function(){var t,n=this,i=this.block,a=e.extend({},i);if(i.icon.includes("<svg")){var l=jQuery(i.icon),u={};e.each(l[0].attributes,function(){this.specified&&(t=this.name.replace(/[-:]([a-z])/g,function(e){return e[1].toUpperCase()}),u[t]=this.value)}),u.height=20,u.width=20,i.icon=s(l.html(),u,"svg")}delete a.fields,delete a.tpl,delete a.id,a.icon=i.icon;var d=function(e){var t=[];if(n.saveBlockProperties(e),"function"==typeof n.block.beforeEdit){var i=n.block.beforeEdit(e,n);i&&t.push(i)}if(e.isSelected&&(n.focussedProps=e,t.push(n.inspectorFields()),t.push(n.toolbarElements())),t.push(n.edit(e)),"function"==typeof n.block.afterEdit){var a=n.block.afterEdit(e,n);a&&t.push(a)}return o("div",{key:"block-content"},t)};if(a.edit=d,a.getEditWrapperProps=function(e){var t={},o=e.Layout,a=e.BlockAlignment;if(a=a||e["Block Alignment"],o&&(t["caxton-layout"]=o),a){t["data-align"]={" fl":"left"," rl":"right"}[a]}return"function"==typeof i.registerBlockProps&&(t=jQuery.extend(i.registerBlockProps(e,n),t)),"function"==typeof n.block.wrapperProps&&(t=n.block.wrapperProps(t,e,this)),t},a.save=function(e){return n.saveBlockProperties(e),n.save(e)},"function"==typeof i.apiCallback){"function"!=typeof i.apiUrl&&(i.apiUrl=function(){return{apiData:i.apiUrl}}),n.block.edit=i.apiCallback;var p=function(e){function t(e){var o;return _classCallCheck(this,t),(o=_possibleConstructorReturn(this,_getPrototypeOf(t).apply(this,arguments))).state={dataProps:c({},e),block:i,editCallback:d},o}return _inherits(t,React.Component),_createClass(t,[{key:"fetchUrls",value:function(){var e=this.state,t=this.state.block.apiUrl(e.dataProps),o=this,n=function(n){t.hasOwnProperty(n)&&(e.dataProps[n]&&t[n]===e.dataProps[n].path||(e.dataProps[n]={},wp.apiFetch({path:t[n]}).then(function(i){o&&e.dataProps[n].data!==i&&(e.dataProps[n].data=i,e.dataProps[n].path=t[n],o.setState(e))})))};for(var i in t)n(i)}},{key:"render",value:function(){return c(this.state.dataProps,this.props),this.fetchUrls(),this.state.editCallback(this.state.dataProps)}}]),t}();a.edit=p,a.save=function(){return null}}i.id.includes("/")||(i.id="caxton/".concat(i.id)),r(i.id,a)}}]),t}();d.prototype.orderedselectFieldEl=d.prototype.orderedSelectFieldEl,window.CaxtonBlock=function(e){return new d(e)},window.caxtonRegisterFieldType=function(e,t){},window.Caxton={el2html:function(e){var t="";if(e){e.length||(e=[e]);for(var o=0;o<e.length;o++){var n=e[o];switch(_typeof(n)){case"object":t+=wp.element.renderToString(n);break;default:t+=n}}}return t},html2el:s,copyObj:c,tplProc:function(e,t){var o;for(o in t)t.hasOwnProperty(o)&&(e=e.split("{{".concat(o,"}}")).join(t[o]));for(o in t)t.hasOwnProperty(o)&&(e=e.split("{{".concat(o,"}}")).join(t[o]));return e},iconSvg:u}}initCaxton(jQuery,wp.blocks,wp.element.createElement,window.wp.i18n,wp.components),jQuery(function(e){setTimeout(function(){if("string"==typeof ajaxurl){for(var t,o,n=wp.data.select("core/blocks").getBlockTypes(),i={},a=0;a<n.length;a++)o="object"===_typeof(o=(t=n[a]).icon.src)?Caxton.el2html(o):'<span class="dashicons dashicons-'.concat(o,'"></span>'),i[t.name]={title:t.title,icon:o,category:t.category};e.post(ajaxurl,{action:"caxton_save_blocks",blocks:JSON.stringify(i)})}},2500)}),setTimeout(function(){CaxtonUtils.asset("icons-data.js"),CaxtonUtils.asset("icons-svg.js")},2500);

},{}]},{},[1]);
