!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.extension=n():t.extension=n()}("undefined"!=typeof self?self:this,(function(){return function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";e.r(n);var r=e(1),o=/[\n\r]/g;function c(t,n,e){var o=r.getComponentNames(t),c=n.image;return{language:"xml",code:"\n<".concat(o.poster," ").concat(r.formatId(e.name),'\n    width="').concat(c.width,'"\n    height="').concat(c.height,'"\n    uri="').concat(r.formatImagePath(c.url),'"\n    />\n        ')}}function i(t){return t.charAt(0).toUpperCase()+t.slice(1)}n.default={layer:function(t,n){var e=n.type,c=n.rect,i=n.content,a=n.name,u=function(t){var n={r:"FF",g:"FF",b:"FF",a:"FF"},e=t.map((function(t){return t.color?t.color.toHex():n}));return e.length>0?e[0]:n}(n.fills),f=r.getComponentNames(t);return"text"===e?{language:"xml",code:"\n<".concat(f.label," ").concat(r.formatId(t,a),'\n    text="').concat(i.replace(o,"&#xA;"),'"\n    color="').concat(r.formatColor(t,u),'"\n    width="').concat(c.width,'"\n    height="').concat(c.height,'"\n    translation="[').concat(c.x,", ").concat(c.y,']" />\n          ')}:"shape"===e?n.exportable?{language:"xml",code:"\n<".concat(f.poster," ").concat(r.formatId(t,a),'\n    uri="').concat(JSON.stringify(n.assets),'"\n    width="').concat(c.width,'"\n    height="').concat(c.height,'"\n    translation="[').concat(c.x,", ").concat(c.y,']"></Rectangle>\n            ')}:{language:"xml",code:"\n<".concat(f.rectangle," ").concat(r.formatId(t,a),'\n    color="').concat(r.formatColor(t,u),'"\n    width="').concat(c.width,'"\n    height="').concat(c.height,'"\n    translation="[').concat(c.x,", ").concat(c.y,']"></Rectangle>\n              ')}:void 0},screen:function(t,n,e){},component:c,colors:function(t){var n=t.project.colors.map((function(t){var n=t.toHex(),e="0x".concat(n.r).concat(n.g).concat(n.b).concat(n.a);return'"'.concat(t.name,'": "').concat(e,'"')}));return{language:"brightscript",code:"\nfunction projectColors() as object\n    return {\n        ".concat(n.join("\n        "),"\n    }\nend function\n        ")}},textStyles:function(t){for(var n=r.getComponentNames(t),e=t.project.textStyles.map((function(t){var e=t.fontFamily,r=t.fontSize,o=t.weightText,c=t.fontStyle,a="".concat(e,"-").concat(i(o)).concat("normal"===c?"":i(c)),u="".concat(e).concat(i(o)).concat("normal"===c?"":i(c)).concat(r);return{id:u,code:"\n<".concat(n.font,' \n    id="').concat(u,'"\n    uri="pkg:/fonts/').concat(a,'.ttf\n    size="').concat(r,'" />\n    ')}})),o={},c=0;c<e.length;c++)o[e[c].id]=e[c].code;return Object.values(o).join("\n\n")},spacing:function(t){},exportColors:function(t){},exportTextStyles:function(t){},exportSpacing:function(t){},styleguideColors:function(t,n){},styleguideTextStyles:function(t,n){},exportStyleguideColors:function(t,n){},exportStyleguideTextStyles:function(t,n){},comment:function(t,n){}},console.log(c)},function(t,n,e){"use strict";e.r(n),e.d(n,"formatColor",(function(){return o})),e.d(n,"formatFontPath",(function(){return c})),e.d(n,"formatId",(function(){return a})),e.d(n,"getComponentNames",(function(){return u})),e.d(n,"formatImagePath",(function(){return i}));var r=e(2);function o(t,n){var e=t.getOption("colorFormat");return"".concat(e?"0x":"#").concat(n.r).concat(n.g).concat(n.b).concat(n.a).toUpperCase()}function c(t,n){var e=t.getOption("fontPath");return r.join(e,"".concat(n,".ttf"))}function i(t,n){var e=t.getOption("imagePath");return r.join(e,"".concat(n))}function a(t,n){return t.getOption("addId")?'\n    id="'.concat(n.replace(/ /g,"_"),'"'):""}function u(t){return{rectangle:t.getOption("rectangleName"),label:t.getOption("labelName"),poster:t.getOption("posterName"),font:t.getOption("fontName")}}},function(t,n,e){(function(t){function e(t,n){for(var e=0,r=t.length-1;r>=0;r--){var o=t[r];"."===o?t.splice(r,1):".."===o?(t.splice(r,1),e++):e&&(t.splice(r,1),e--)}if(n)for(;e--;e)t.unshift("..");return t}function r(t,n){if(t.filter)return t.filter(n);for(var e=[],r=0;r<t.length;r++)n(t[r],r,t)&&e.push(t[r]);return e}n.resolve=function(){for(var n="",o=!1,c=arguments.length-1;c>=-1&&!o;c--){var i=c>=0?arguments[c]:t.cwd();if("string"!=typeof i)throw new TypeError("Arguments to path.resolve must be strings");i&&(n=i+"/"+n,o="/"===i.charAt(0))}return(o?"/":"")+(n=e(r(n.split("/"),(function(t){return!!t})),!o).join("/"))||"."},n.normalize=function(t){var c=n.isAbsolute(t),i="/"===o(t,-1);return(t=e(r(t.split("/"),(function(t){return!!t})),!c).join("/"))||c||(t="."),t&&i&&(t+="/"),(c?"/":"")+t},n.isAbsolute=function(t){return"/"===t.charAt(0)},n.join=function(){var t=Array.prototype.slice.call(arguments,0);return n.normalize(r(t,(function(t,n){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))},n.relative=function(t,e){function r(t){for(var n=0;n<t.length&&""===t[n];n++);for(var e=t.length-1;e>=0&&""===t[e];e--);return n>e?[]:t.slice(n,e-n+1)}t=n.resolve(t).substr(1),e=n.resolve(e).substr(1);for(var o=r(t.split("/")),c=r(e.split("/")),i=Math.min(o.length,c.length),a=i,u=0;u<i;u++)if(o[u]!==c[u]){a=u;break}var f=[];for(u=a;u<o.length;u++)f.push("..");return(f=f.concat(c.slice(a))).join("/")},n.sep="/",n.delimiter=":",n.dirname=function(t){if("string"!=typeof t&&(t+=""),0===t.length)return".";for(var n=t.charCodeAt(0),e=47===n,r=-1,o=!0,c=t.length-1;c>=1;--c)if(47===(n=t.charCodeAt(c))){if(!o){r=c;break}}else o=!1;return-1===r?e?"/":".":e&&1===r?"/":t.slice(0,r)},n.basename=function(t,n){var e=function(t){"string"!=typeof t&&(t+="");var n,e=0,r=-1,o=!0;for(n=t.length-1;n>=0;--n)if(47===t.charCodeAt(n)){if(!o){e=n+1;break}}else-1===r&&(o=!1,r=n+1);return-1===r?"":t.slice(e,r)}(t);return n&&e.substr(-1*n.length)===n&&(e=e.substr(0,e.length-n.length)),e},n.extname=function(t){"string"!=typeof t&&(t+="");for(var n=-1,e=0,r=-1,o=!0,c=0,i=t.length-1;i>=0;--i){var a=t.charCodeAt(i);if(47!==a)-1===r&&(o=!1,r=i+1),46===a?-1===n?n=i:1!==c&&(c=1):-1!==n&&(c=-1);else if(!o){e=i+1;break}}return-1===n||-1===r||0===c||1===c&&n===r-1&&n===e+1?"":t.slice(n,r)};var o="b"==="ab".substr(-1)?function(t,n,e){return t.substr(n,e)}:function(t,n,e){return n<0&&(n=t.length+n),t.substr(n,e)}}).call(this,e(3))},function(t,n){var e,r,o=t.exports={};function c(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function a(t){if(e===setTimeout)return setTimeout(t,0);if((e===c||!e)&&setTimeout)return e=setTimeout,setTimeout(t,0);try{return e(t,0)}catch(n){try{return e.call(null,t,0)}catch(n){return e.call(this,t,0)}}}!function(){try{e="function"==typeof setTimeout?setTimeout:c}catch(t){e=c}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(t){r=i}}();var u,f=[],l=!1,s=-1;function p(){l&&u&&(l=!1,u.length?f=u.concat(f):s=-1,f.length&&g())}function g(){if(!l){var t=a(p);l=!0;for(var n=f.length;n;){for(u=f,f=[];++s<n;)u&&u[s].run();s=-1,n=f.length}u=null,l=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(n){try{return r.call(null,t)}catch(n){return r.call(this,t)}}}(t)}}function h(t,n){this.fun=t,this.array=n}function d(){}o.nextTick=function(t){var n=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)n[e-1]=arguments[e];f.push(new h(t,n)),1!==f.length||l||a(g)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=d,o.addListener=d,o.once=d,o.off=d,o.removeListener=d,o.removeAllListeners=d,o.emit=d,o.prependListener=d,o.prependOnceListener=d,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}}]).default}));