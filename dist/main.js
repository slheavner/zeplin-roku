(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["extension"] = factory();
	else
		root["extension"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Export functions you want to work with, see documentation for details:
 * https://github.com/zeplin/zeplin-extension-documentation
 */
var utils = __webpack_require__(1);

var NEWLINE_REGEX = /[\n\r]/g;

function layer(context, selectedLayer) {
  var type = selectedLayer.type,
      rect = selectedLayer.rect,
      content = selectedLayer.content,
      name = selectedLayer.name,
      fills = selectedLayer.fills;
  var parent = selectedLayer.parent;

  if (context.getOption('useRealXY')) {
    while (parent) {
      rect.x += parent.rect.x;
      rect.y += parent.rect.y;
      parent = parent.parent;
    }
  }

  var color = utils.formatColor(context, getColorFromFills(fills));
  var components = utils.getComponentNames(context);
  var fields = {
    id: name.replace(/ /g, '_'),
    width: rect.width,
    height: rect.height,
    translation: "[".concat(rect.x, ", ").concat(rect.y, "]")
  };

  if (type === 'text') {
    fields.text = content.replace(NEWLINE_REGEX, '&#xA;');
    return utils.createElement(context, 'label', fields);
  } else if (type === 'shape') {
    if (selectedLayer.borderRadius != 0 && context.getOption('use9PatchForRadius')) {
      fields.uri = utils.formatRadiusUri(context, selectedLayer.borderRadius);
      fields.blendColor = color;
      return utils.createElement(context, 'poster', fields);
    } else {
      fields.color = color;
      return utils.createElement(context, 'rectangle', fields);
    }
  } else {
    if (selectedLayer.exportable) {
      fields.uri = context.getOption('imageUriPlaceholder');
      return utils.createElement(context, 'poster', fields);
    }
  }
}

function getColorFromFills(fills) {
  var WHITE = {
    r: 'FF',
    g: 'FF',
    b: 'FF',
    a: 'FF'
  };
  var colors = fills.map(function (f) {
    if (f.color) {
      return f.color.toHex();
    } else {
      return WHITE;
    }
  });
  return colors.length > 0 ? colors[0] : WHITE;
}

function screen(context, selectedVersion, selectedScreen) {}

function component(context, selectedVersion, selectedComponent) {}

function colors(context) {
  var colors = context.project.colors.map(function (c) {
    var hex = c.toHex();
    var value = "0x".concat(hex.r).concat(hex.g).concat(hex.b).concat(hex.a);
    return "".concat(c.name.replace(/ /g, '_'), ": \"").concat(value, "\"");
  });
  return {
    language: 'javascript',
    code: "\nfunction projectColors() as object\n    return {\n        ".concat(colors.join('\n        '), "\n    }\nend function\n        ")
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function textStyles(context) {
  var components = utils.getComponentNames(context);
  var styles = context.project.textStyles.map(function (f) {
    var fontFamily = f.fontFamily,
        fontSize = f.fontSize,
        weightText = f.weightText,
        fontStyle = f.fontStyle;
    var name = "".concat(fontFamily, "-").concat(capitalize(weightText)).concat(fontStyle === 'normal' ? '' : capitalize(fontStyle));
    var id = "".concat(fontFamily).concat(capitalize(weightText)).concat(fontStyle === 'normal' ? '' : capitalize(fontStyle)).concat(fontSize);
    var fields = {
      id: id,
      uri: utils.formatFontPath(context, name),
      size: fontSize
    };
    var element = utils.createElement(context, 'font', fields);
    return _objectSpread({}, element, {
      id: id
    });
  });
  var map = {};
  styles.forEach(function (element) {
    map[element.id] = element.code;
  });
  return {
    language: 'xml',
    code: Object.values(map).join('\n\n')
  };
}

function spacing(context) {}

function exportColors(context) {}

function exportTextStyles(context) {}

function exportSpacing(context) {}
/**
 * The following functions will be deprecated. Your extensions can export them to support old versions of Zeplin's macOS app.
 * See Zeplin Extensions migration guide for details:
 * https://zpl.io/shared-styleguides-extensions-migration-guide
 */


function styleguideColors(context, colors) {}

function styleguideTextStyles(context, textStyles) {}

function exportStyleguideColors(context, colors) {}

function exportStyleguideTextStyles(context, textStyles) {}

function comment(context, text) {}

/* harmony default export */ __webpack_exports__["default"] = ({
  layer,
  screen,
  component,
  colors,
  textStyles,
  spacing,
  exportColors,
  exportTextStyles,
  exportSpacing,
  styleguideColors,
  styleguideTextStyles,
  exportStyleguideColors,
  exportStyleguideTextStyles,
  comment
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatColor", function() { return formatColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatFontPath", function() { return formatFontPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatId", function() { return formatId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getComponentNames", function() { return getComponentNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatRadiusUri", function() { return formatRadiusUri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
var path = __webpack_require__(2);

function formatColor(context, color) {
  var useHex = context.getOption('colorFormat');
  var prefix = useHex ? '0x' : '#';
  return "".concat(prefix).concat(color.r).concat(color.g).concat(color.b).concat(color.a);
}

function formatFontPath(context, id) {
  var root = context.getOption('fontPath');
  return path.join(root, "".concat(id, ".ttf"));
}

function formatRadiusUri(context, radius) {
  var root = context.getOption('roundedRectPath');
  return "".concat(root).concat(radius, "px.9.png");
}

function formatId(context, id) {
  var addId = context.getOption('addId');
  return addId ? "id=\"".concat(id.replace(/ /g, '_'), "\"") : '';
}

function getComponentNames(context) {
  return {
    rectangle: context.getOption('rectangleName'),
    label: context.getOption('labelName'),
    poster: context.getOption('posterName'),
    font: context.getOption('fontName')
  };
}

function createElement(context, type, fields) {
  var name = getComponentNames(context)[type];
  var lines = Object.keys(fields).map(function (key) {
    if (key === 'id') {
      return formatId(context, fields[key]);
    }

    return "".concat(key, "=\"").concat(fields[key], "\"");
  }).filter(function (s) {
    return s;
  });
  var end = context.getOption('selfClosingTags') ? '/>' : ">\n</".concat(name, ">");
  var code = "<".concat(name, " \n  ").concat(lines.join('\n  '), " ").concat(end);
  return {
    language: 'xml',
    code
  };
}



/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leHRlbnNpb24vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2V4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leHRlbnNpb24vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZXh0ZW5zaW9uLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL2V4dGVuc2lvbi9leHRlcm5hbCBcInBhdGhcIiJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJORVdMSU5FX1JFR0VYIiwibGF5ZXIiLCJjb250ZXh0Iiwic2VsZWN0ZWRMYXllciIsInR5cGUiLCJyZWN0IiwiY29udGVudCIsIm5hbWUiLCJmaWxscyIsInBhcmVudCIsImdldE9wdGlvbiIsIngiLCJ5IiwiY29sb3IiLCJmb3JtYXRDb2xvciIsImdldENvbG9yRnJvbUZpbGxzIiwiY29tcG9uZW50cyIsImdldENvbXBvbmVudE5hbWVzIiwiZmllbGRzIiwiaWQiLCJyZXBsYWNlIiwid2lkdGgiLCJoZWlnaHQiLCJ0cmFuc2xhdGlvbiIsInRleHQiLCJjcmVhdGVFbGVtZW50IiwiYm9yZGVyUmFkaXVzIiwidXJpIiwiZm9ybWF0UmFkaXVzVXJpIiwiYmxlbmRDb2xvciIsImV4cG9ydGFibGUiLCJXSElURSIsInIiLCJnIiwiYiIsImEiLCJjb2xvcnMiLCJtYXAiLCJmIiwidG9IZXgiLCJsZW5ndGgiLCJzY3JlZW4iLCJzZWxlY3RlZFZlcnNpb24iLCJzZWxlY3RlZFNjcmVlbiIsImNvbXBvbmVudCIsInNlbGVjdGVkQ29tcG9uZW50IiwicHJvamVjdCIsImMiLCJoZXgiLCJ2YWx1ZSIsImxhbmd1YWdlIiwiY29kZSIsImpvaW4iLCJjYXBpdGFsaXplIiwic3RyIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRleHRTdHlsZXMiLCJzdHlsZXMiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJ3ZWlnaHRUZXh0IiwiZm9udFN0eWxlIiwiZm9ybWF0Rm9udFBhdGgiLCJzaXplIiwiZWxlbWVudCIsImZvckVhY2giLCJPYmplY3QiLCJ2YWx1ZXMiLCJzcGFjaW5nIiwiZXhwb3J0Q29sb3JzIiwiZXhwb3J0VGV4dFN0eWxlcyIsImV4cG9ydFNwYWNpbmciLCJzdHlsZWd1aWRlQ29sb3JzIiwic3R5bGVndWlkZVRleHRTdHlsZXMiLCJleHBvcnRTdHlsZWd1aWRlQ29sb3JzIiwiZXhwb3J0U3R5bGVndWlkZVRleHRTdHlsZXMiLCJjb21tZW50IiwicGF0aCIsInVzZUhleCIsInByZWZpeCIsInJvb3QiLCJyYWRpdXMiLCJmb3JtYXRJZCIsImFkZElkIiwicmVjdGFuZ2xlIiwibGFiZWwiLCJwb3N0ZXIiLCJmb250IiwibGluZXMiLCJrZXlzIiwia2V5IiwiZmlsdGVyIiwicyIsImVuZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7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Q0FBaEIsQ0FBZjtBQUNEOztBQUNELHFCQUFVQSxHQUFWLGdCQUFrQjFFLE1BQU0sQ0FBQzBFLEdBQUQsQ0FBeEI7QUFDRCxHQU5XLEVBT1hDLE1BUFcsQ0FPSixVQUFDQyxDQUFEO0FBQUEsV0FBT0EsQ0FBUDtBQUFBLEdBUEksQ0FBZDtBQVFBLE1BQU1DLEdBQUcsR0FBRzdGLE9BQU8sQ0FBQ1EsU0FBUixDQUFrQixpQkFBbEIsSUFBdUMsSUFBdkMsa0JBQXNESCxJQUF0RCxNQUFaO0FBQ0EsTUFBTTRDLElBQUksY0FBTzVDLElBQVAsa0JBQ1JtRixLQUFLLENBQUN0QyxJQUFOLENBQVcsTUFBWCxDQURRLGNBQ2MyQyxHQURkLENBQVY7QUFFQSxTQUFPO0FBQ0w3QyxZQUFRLEVBQUUsS0FETDtBQUVMQztBQUZLLEdBQVA7QUFJRDs7Ozs7Ozs7QUNqREQsaUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImV4dGVuc2lvblwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJleHRlbnNpb25cIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qKlxuICogRXhwb3J0IGZ1bmN0aW9ucyB5b3Ugd2FudCB0byB3b3JrIHdpdGgsIHNlZSBkb2N1bWVudGF0aW9uIGZvciBkZXRhaWxzOlxuICogaHR0cHM6Ly9naXRodWIuY29tL3plcGxpbi96ZXBsaW4tZXh0ZW5zaW9uLWRvY3VtZW50YXRpb25cbiAqL1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJylcbmNvbnN0IE5FV0xJTkVfUkVHRVggPSAvW1xcblxccl0vZ1xuXG5mdW5jdGlvbiBsYXllcihjb250ZXh0LCBzZWxlY3RlZExheWVyKSB7XG4gIGNvbnN0IHsgdHlwZSwgcmVjdCwgY29udGVudCwgbmFtZSwgZmlsbHMgfSA9IHNlbGVjdGVkTGF5ZXJcbiAgbGV0IHBhcmVudCA9IHNlbGVjdGVkTGF5ZXIucGFyZW50XG4gIGlmIChjb250ZXh0LmdldE9wdGlvbigndXNlUmVhbFhZJykpIHtcbiAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICByZWN0LnggKz0gcGFyZW50LnJlY3QueFxuICAgICAgcmVjdC55ICs9IHBhcmVudC5yZWN0LnlcbiAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRcbiAgICB9XG4gIH1cbiAgY29uc3QgY29sb3IgPSB1dGlscy5mb3JtYXRDb2xvcihjb250ZXh0LCBnZXRDb2xvckZyb21GaWxscyhmaWxscykpXG4gIGNvbnN0IGNvbXBvbmVudHMgPSB1dGlscy5nZXRDb21wb25lbnROYW1lcyhjb250ZXh0KVxuICBjb25zdCBmaWVsZHMgPSB7XG4gICAgaWQ6IG5hbWUucmVwbGFjZSgvIC9nLCAnXycpLFxuICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgIGhlaWdodDogcmVjdC5oZWlnaHQsXG4gICAgdHJhbnNsYXRpb246IGBbJHtyZWN0Lnh9LCAke3JlY3QueX1dYCxcbiAgfVxuICBpZiAodHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgZmllbGRzLnRleHQgPSBjb250ZW50LnJlcGxhY2UoTkVXTElORV9SRUdFWCwgJyYjeEE7JylcbiAgICByZXR1cm4gdXRpbHMuY3JlYXRlRWxlbWVudChjb250ZXh0LCAnbGFiZWwnLCBmaWVsZHMpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NoYXBlJykge1xuICAgIGlmIChcbiAgICAgIHNlbGVjdGVkTGF5ZXIuYm9yZGVyUmFkaXVzICE9IDAgJiZcbiAgICAgIGNvbnRleHQuZ2V0T3B0aW9uKCd1c2U5UGF0Y2hGb3JSYWRpdXMnKVxuICAgICkge1xuICAgICAgZmllbGRzLnVyaSA9IHV0aWxzLmZvcm1hdFJhZGl1c1VyaShjb250ZXh0LCBzZWxlY3RlZExheWVyLmJvcmRlclJhZGl1cylcbiAgICAgIGZpZWxkcy5ibGVuZENvbG9yID0gY29sb3JcbiAgICAgIHJldHVybiB1dGlscy5jcmVhdGVFbGVtZW50KGNvbnRleHQsICdwb3N0ZXInLCBmaWVsZHMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkcy5jb2xvciA9IGNvbG9yXG4gICAgICByZXR1cm4gdXRpbHMuY3JlYXRlRWxlbWVudChjb250ZXh0LCAncmVjdGFuZ2xlJywgZmllbGRzKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoc2VsZWN0ZWRMYXllci5leHBvcnRhYmxlKSB7XG4gICAgICBmaWVsZHMudXJpID0gY29udGV4dC5nZXRPcHRpb24oJ2ltYWdlVXJpUGxhY2Vob2xkZXInKVxuICAgICAgcmV0dXJuIHV0aWxzLmNyZWF0ZUVsZW1lbnQoY29udGV4dCwgJ3Bvc3RlcicsIGZpZWxkcylcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q29sb3JGcm9tRmlsbHMoZmlsbHMpIHtcbiAgY29uc3QgV0hJVEUgPSB7XG4gICAgcjogJ0ZGJyxcbiAgICBnOiAnRkYnLFxuICAgIGI6ICdGRicsXG4gICAgYTogJ0ZGJyxcbiAgfVxuICBjb25zdCBjb2xvcnMgPSBmaWxscy5tYXAoKGYpID0+IHtcbiAgICBpZiAoZi5jb2xvcikge1xuICAgICAgcmV0dXJuIGYuY29sb3IudG9IZXgoKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gV0hJVEVcbiAgICB9XG4gIH0pXG4gIHJldHVybiBjb2xvcnMubGVuZ3RoID4gMCA/IGNvbG9yc1swXSA6IFdISVRFXG59XG5cbmZ1bmN0aW9uIHNjcmVlbihjb250ZXh0LCBzZWxlY3RlZFZlcnNpb24sIHNlbGVjdGVkU2NyZWVuKSB7fVxuXG5mdW5jdGlvbiBjb21wb25lbnQoY29udGV4dCwgc2VsZWN0ZWRWZXJzaW9uLCBzZWxlY3RlZENvbXBvbmVudCkge31cblxuZnVuY3Rpb24gY29sb3JzKGNvbnRleHQpIHtcbiAgY29uc3QgY29sb3JzID0gY29udGV4dC5wcm9qZWN0LmNvbG9ycy5tYXAoKGMpID0+IHtcbiAgICBjb25zdCBoZXggPSBjLnRvSGV4KClcbiAgICBjb25zdCB2YWx1ZSA9IGAweCR7aGV4LnJ9JHtoZXguZ30ke2hleC5ifSR7aGV4LmF9YFxuICAgIHJldHVybiBgJHtjLm5hbWUucmVwbGFjZSgvIC9nLCAnXycpfTogXCIke3ZhbHVlfVwiYFxuICB9KVxuICByZXR1cm4ge1xuICAgIGxhbmd1YWdlOiAnamF2YXNjcmlwdCcsXG4gICAgY29kZTogYFxuZnVuY3Rpb24gcHJvamVjdENvbG9ycygpIGFzIG9iamVjdFxuICAgIHJldHVybiB7XG4gICAgICAgICR7Y29sb3JzLmpvaW4oJ1xcbiAgICAgICAgJyl9XG4gICAgfVxuZW5kIGZ1bmN0aW9uXG4gICAgICAgIGAsXG4gIH1cbn1cblxuZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxufVxuXG5mdW5jdGlvbiB0ZXh0U3R5bGVzKGNvbnRleHQpIHtcbiAgY29uc3QgY29tcG9uZW50cyA9IHV0aWxzLmdldENvbXBvbmVudE5hbWVzKGNvbnRleHQpXG4gIGNvbnN0IHN0eWxlcyA9IGNvbnRleHQucHJvamVjdC50ZXh0U3R5bGVzLm1hcCgoZikgPT4ge1xuICAgIGNvbnN0IHsgZm9udEZhbWlseSwgZm9udFNpemUsIHdlaWdodFRleHQsIGZvbnRTdHlsZSB9ID0gZlxuICAgIGNvbnN0IG5hbWUgPSBgJHtmb250RmFtaWx5fS0ke2NhcGl0YWxpemUod2VpZ2h0VGV4dCl9JHtcbiAgICAgIGZvbnRTdHlsZSA9PT0gJ25vcm1hbCcgPyAnJyA6IGNhcGl0YWxpemUoZm9udFN0eWxlKVxuICAgIH1gXG4gICAgY29uc3QgaWQgPSBgJHtmb250RmFtaWx5fSR7Y2FwaXRhbGl6ZSh3ZWlnaHRUZXh0KX0ke1xuICAgICAgZm9udFN0eWxlID09PSAnbm9ybWFsJyA/ICcnIDogY2FwaXRhbGl6ZShmb250U3R5bGUpXG4gICAgfSR7Zm9udFNpemV9YFxuICAgIGNvbnN0IGZpZWxkcyA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIHVyaTogdXRpbHMuZm9ybWF0Rm9udFBhdGgoY29udGV4dCwgbmFtZSksXG4gICAgICBzaXplOiBmb250U2l6ZSxcbiAgICB9XG4gICAgY29uc3QgZWxlbWVudCA9IHV0aWxzLmNyZWF0ZUVsZW1lbnQoY29udGV4dCwgJ2ZvbnQnLCBmaWVsZHMpXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmVsZW1lbnQsXG4gICAgICBpZDogaWQsXG4gICAgfVxuICB9KVxuICBjb25zdCBtYXAgPSB7fVxuICBzdHlsZXMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIG1hcFtlbGVtZW50LmlkXSA9IGVsZW1lbnQuY29kZVxuICB9KVxuICByZXR1cm4geyBsYW5ndWFnZTogJ3htbCcsIGNvZGU6IE9iamVjdC52YWx1ZXMobWFwKS5qb2luKCdcXG5cXG4nKSB9XG59XG5cbmZ1bmN0aW9uIHNwYWNpbmcoY29udGV4dCkge31cblxuZnVuY3Rpb24gZXhwb3J0Q29sb3JzKGNvbnRleHQpIHt9XG5cbmZ1bmN0aW9uIGV4cG9ydFRleHRTdHlsZXMoY29udGV4dCkge31cblxuZnVuY3Rpb24gZXhwb3J0U3BhY2luZyhjb250ZXh0KSB7fVxuXG4vKipcbiAqIFRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIHdpbGwgYmUgZGVwcmVjYXRlZC4gWW91ciBleHRlbnNpb25zIGNhbiBleHBvcnQgdGhlbSB0byBzdXBwb3J0IG9sZCB2ZXJzaW9ucyBvZiBaZXBsaW4ncyBtYWNPUyBhcHAuXG4gKiBTZWUgWmVwbGluIEV4dGVuc2lvbnMgbWlncmF0aW9uIGd1aWRlIGZvciBkZXRhaWxzOlxuICogaHR0cHM6Ly96cGwuaW8vc2hhcmVkLXN0eWxlZ3VpZGVzLWV4dGVuc2lvbnMtbWlncmF0aW9uLWd1aWRlXG4gKi9cblxuZnVuY3Rpb24gc3R5bGVndWlkZUNvbG9ycyhjb250ZXh0LCBjb2xvcnMpIHt9XG5cbmZ1bmN0aW9uIHN0eWxlZ3VpZGVUZXh0U3R5bGVzKGNvbnRleHQsIHRleHRTdHlsZXMpIHt9XG5cbmZ1bmN0aW9uIGV4cG9ydFN0eWxlZ3VpZGVDb2xvcnMoY29udGV4dCwgY29sb3JzKSB7fVxuXG5mdW5jdGlvbiBleHBvcnRTdHlsZWd1aWRlVGV4dFN0eWxlcyhjb250ZXh0LCB0ZXh0U3R5bGVzKSB7fVxuXG5mdW5jdGlvbiBjb21tZW50KGNvbnRleHQsIHRleHQpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbGF5ZXIsXG4gIHNjcmVlbixcbiAgY29tcG9uZW50LFxuICBjb2xvcnMsXG4gIHRleHRTdHlsZXMsXG4gIHNwYWNpbmcsXG4gIGV4cG9ydENvbG9ycyxcbiAgZXhwb3J0VGV4dFN0eWxlcyxcbiAgZXhwb3J0U3BhY2luZyxcbiAgc3R5bGVndWlkZUNvbG9ycyxcbiAgc3R5bGVndWlkZVRleHRTdHlsZXMsXG4gIGV4cG9ydFN0eWxlZ3VpZGVDb2xvcnMsXG4gIGV4cG9ydFN0eWxlZ3VpZGVUZXh0U3R5bGVzLFxuICBjb21tZW50LFxufVxuIiwiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxuXG5mdW5jdGlvbiBmb3JtYXRDb2xvcihjb250ZXh0LCBjb2xvcikge1xuICBjb25zdCB1c2VIZXggPSBjb250ZXh0LmdldE9wdGlvbignY29sb3JGb3JtYXQnKVxuICBjb25zdCBwcmVmaXggPSB1c2VIZXggPyAnMHgnIDogJyMnXG4gIHJldHVybiBgJHtwcmVmaXh9JHtjb2xvci5yfSR7Y29sb3IuZ30ke2NvbG9yLmJ9JHtjb2xvci5hfWBcbn1cblxuZnVuY3Rpb24gZm9ybWF0Rm9udFBhdGgoY29udGV4dCwgaWQpIHtcbiAgY29uc3Qgcm9vdCA9IGNvbnRleHQuZ2V0T3B0aW9uKCdmb250UGF0aCcpXG4gIHJldHVybiBwYXRoLmpvaW4ocm9vdCwgYCR7aWR9LnR0ZmApXG59XG5cbmZ1bmN0aW9uIGZvcm1hdFJhZGl1c1VyaShjb250ZXh0LCByYWRpdXMpIHtcbiAgY29uc3Qgcm9vdCA9IGNvbnRleHQuZ2V0T3B0aW9uKCdyb3VuZGVkUmVjdFBhdGgnKVxuICByZXR1cm4gYCR7cm9vdH0ke3JhZGl1c31weC45LnBuZ2Bcbn1cblxuZnVuY3Rpb24gZm9ybWF0SWQoY29udGV4dCwgaWQpIHtcbiAgY29uc3QgYWRkSWQgPSBjb250ZXh0LmdldE9wdGlvbignYWRkSWQnKVxuICByZXR1cm4gYWRkSWQgPyBgaWQ9XCIke2lkLnJlcGxhY2UoLyAvZywgJ18nKX1cImAgOiAnJ1xufVxuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lcyhjb250ZXh0KSB7XG4gIHJldHVybiB7XG4gICAgcmVjdGFuZ2xlOiBjb250ZXh0LmdldE9wdGlvbigncmVjdGFuZ2xlTmFtZScpLFxuICAgIGxhYmVsOiBjb250ZXh0LmdldE9wdGlvbignbGFiZWxOYW1lJyksXG4gICAgcG9zdGVyOiBjb250ZXh0LmdldE9wdGlvbigncG9zdGVyTmFtZScpLFxuICAgIGZvbnQ6IGNvbnRleHQuZ2V0T3B0aW9uKCdmb250TmFtZScpLFxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoY29udGV4dCwgdHlwZSwgZmllbGRzKSB7XG4gIGNvbnN0IG5hbWUgPSBnZXRDb21wb25lbnROYW1lcyhjb250ZXh0KVt0eXBlXVxuICBjb25zdCBsaW5lcyA9IE9iamVjdC5rZXlzKGZpZWxkcylcbiAgICAubWFwKChrZXkpID0+IHtcbiAgICAgIGlmIChrZXkgPT09ICdpZCcpIHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdElkKGNvbnRleHQsIGZpZWxkc1trZXldKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGAke2tleX09XCIke2ZpZWxkc1trZXldfVwiYFxuICAgIH0pXG4gICAgLmZpbHRlcigocykgPT4gcylcbiAgY29uc3QgZW5kID0gY29udGV4dC5nZXRPcHRpb24oJ3NlbGZDbG9zaW5nVGFncycpID8gJy8+JyA6IGA+XFxuPC8ke25hbWV9PmBcbiAgY29uc3QgY29kZSA9IGA8JHtuYW1lfSBcbiAgJHtsaW5lcy5qb2luKCdcXG4gICcpfSAke2VuZH1gXG4gIHJldHVybiB7XG4gICAgbGFuZ3VhZ2U6ICd4bWwnLFxuICAgIGNvZGUsXG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgZm9ybWF0Q29sb3IsXG4gIGZvcm1hdEZvbnRQYXRoLFxuICBmb3JtYXRJZCxcbiAgZ2V0Q29tcG9uZW50TmFtZXMsXG4gIGZvcm1hdFJhZGl1c1VyaSxcbiAgY3JlYXRlRWxlbWVudCxcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==