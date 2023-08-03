(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-comments"] = factory(require("vue"));
	else
		root["vue-comments"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "04f8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__("2d00");
var fails = __webpack_require__("d039");
var global = __webpack_require__("da84");

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var call = __webpack_require__("c65b");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPropertyKey = __webpack_require__("a04b");
var hasOwn = __webpack_require__("1a2d");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "07fa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toLength = __webpack_require__("50c4");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "0928":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon-file.1f89d962.svg";

/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0d51":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "113c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_comments_vue_vue_type_style_index_0_id_10dfa284_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("907b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_comments_vue_vue_type_style_index_0_id_10dfa284_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_comments_vue_vue_type_style_index_0_id_10dfa284_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "13d2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");
var hasOwn = __webpack_require__("1a2d");
var DESCRIPTORS = __webpack_require__("83ab");
var CONFIGURABLE_FUNCTION_NAME = __webpack_require__("5e77").CONFIGURABLE;
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ "14d9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var lengthOfArrayLike = __webpack_require__("07fa");
var setArrayLength = __webpack_require__("3a34");
var doesNotExceedSafeInteger = __webpack_require__("3511");
var fails = __webpack_require__("d039");

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 and Safari <= 15.4, FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ "1626":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $documentAll = __webpack_require__("8ea1");

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "1a2d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");
var toObject = __webpack_require__("7b0b");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "1d80":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isNullOrUndefined = __webpack_require__("7234");

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__("5926");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var defineBuiltIn = __webpack_require__("cb2d");
var defineGlobalProperty = __webpack_require__("6374");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "2d30":
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = isTouchDevice;
function isTouchDevice() {
  return !!(typeof window !== 'undefined' && ('ontouchstart' in window || window.DocumentTouch && typeof document !== 'undefined' && document instanceof window.DocumentTouch)) || !!(typeof navigator !== 'undefined' && (navigator.maxTouchPoints || navigator.msMaxTouchPoints));
}
module.exports = exports['default'];

/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ "3511":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ "3a34":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var isArray = __webpack_require__("e8b5");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ "3a9b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "3f9a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "40d5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");
var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ "44dc":
/***/ (function(module, exports) {

module.exports = {
  link: /(https?:\/\/[^\s]+)/g
};

/***/ }),

/***/ "485a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__("c65b");
var isCallable = __webpack_require__("1626");
var isObject = __webpack_require__("861d");

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var toAbsoluteIndex = __webpack_require__("23cb");
var lengthOfArrayLike = __webpack_require__("07fa");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__("5926");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.32.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.32.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var uncurryThis = __webpack_require__("e330");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5926":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var trunc = __webpack_require__("b42e");

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ "59ad":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_comments_item_vue_vue_type_style_index_0_id_1e58f3af_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a61e");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_comments_item_vue_vue_type_style_index_0_id_1e58f3af_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_comments_item_vue_vue_type_style_index_0_id_1e58f3af_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "59ed":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__("1626");
var tryToString = __webpack_require__("0d51");

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "5e77":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var hasOwn = __webpack_require__("1a2d");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "6374":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_WEAK_MAP = __webpack_require__("cdce");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var hasOwn = __webpack_require__("1a2d");
var shared = __webpack_require__("c6cd");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6b0d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.default = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ "7234":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ "7418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "7839":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var requireObjectCoercible = __webpack_require__("1d80");

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7f0b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_comments_form_vue_vue_type_style_index_0_id_88b6bec2_lang_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3f9a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_comments_form_vue_vue_type_style_index_0_id_88b6bec2_lang_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_comments_form_vue_vue_type_style_index_0_id_88b6bec2_lang_sass__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__("861d");

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "861d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__("1626");
var $documentAll = __webpack_require__("8ea1");

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");
var isCallable = __webpack_require__("1626");
var store = __webpack_require__("c6cd");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "8d00":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEVVYIDn7O3///9KVnlTXn/q7+9NWXva4ONRXH7t8vJMWHvp7u9FUna+xM1JVXlibIng4udZZIP09feTmazc3uRrdJBeaIa2usbGydNye5SAh57t7vH4+frV2N+6vsqnrryJkaWhprZ8hJunrLuQlqrEytKZoLHL0dZueJKEjaHT2d6zE6BNAAAMeElEQVR4nO2de5eCOA+HK5RargJeUMdRRx1v3/8DLqCOKNcmQdg9+zvv2T3v/qE+0zRJ2zRlWttahf7JjX4Oy8V0NAsYY8FsNF0sDz+Re/LDVevfz1r87NCf/2zPzHF0yxKSc844SxT/k3MpLEt3nOC83c/9sMVf0Rah744XgafHYKxaMaruBYux67f0S9og9KMls3RRx/bCKXQrWEZtUFIThvMxcyypAPeUtBw2nlNbLCnh13rJdQGie0jocrn+ovxRhITzHddhg/c2lDrfuXQ+lopwcvBI8B6Q+uGb6JeREIbR1Kl1mmri0plGJFOSgNA/Mp0W7w6psyOBc0UTTpYC51uqJMRy0jHh94LaPF8VG+sCOSFRhN87h867lEI6OxQjgtC/ACO7qqS+RMxHMGE49j7DlzJ6B7BfhRJGVnv+pUjC2nyU8Huqf5QvkT6FTUcI4erQSvyrE9cPkFwOQHj6sIE+JeTpA4Th2OmIL5Gj7nFUCb9HXQ3gTSKYt0v408kMzIp7Py0Sfi0+70Lz0s9KK2QVwhP/XIyvkuQqlqpAuO/cQh/i+r4NwktvABPECznh17RbH/ouMWo6GRsSTmb9mIJPyaDh2rgZ4Ulpe/cz4rKZv2lEOO8yjSmXs6YijJz+jWAqJ6Ih3Hs9BYyDf4NFYz0hLWByxkb4aV59YKwl3BPMweSwUNclC4LZaDSaBUGyqW3Vn7w1kFObpdYRbjzkT5DCY+fLceOertfh0B8MBv5weL2e3M3xcmYeGrN2FGsII0wiw7lwgm10HQ5M0zBsO/7fXcn/MUxzMLxG25kjMJbL9Rp3U024RnhRLuR5M4nZbHtQphjUNK+bs0TEW+64cEJEHOTW6GcYj1wp3FPxaF5/RhaYkTuVW1RVhBNwKsq9szswm+DdIc3B+gz32bIqgasg/AqgXykCN55qjflSezUMd2YBv48HFWl4BeEImGxLubebD19mII29hH7lFEJ4AdqoOF9NAF8i83oGDqNVvl4sJdwDt2T0wwAygPdhHGyhX1uav5URzmHzPk6jTLUJ+CrbBO6VcK9sLVVC+AVLNbi1gVroQ+YGFje4LPE2JYRT2JTHA6aIoO8u8zbFhEfYbLCOeMAYcQxD1IuT8ELCOSzdlju4j8nINhYwC/IKc5siwhAY6uWQhHBgDGGEfFR0bFNEeIBFQj2isNFEZgSbJWLcjPAEy7f5AhMmXmWfYVbkFJwv5glXwMzJ+iUk/IXmNvlT4jwh0Eb5gmYS3mQsYINYYKc5wm9g2iRcUsI1MCvWc/40RziFLpnobDSRDfwVPBf33wmBXowJkmD/lDmGDuL7ts0bYQhd1uu/lEYam+kv9LhZhJWEQDcTR/sBsZUOoJtT787mldCH7o7KJe0Qxog7qEPw/ArCJfSUUPzQTsN4Ih7B5nQpJ4RGijjSrmmNNJ6IEXRfilnfpYQ78EGvfqImtE/gP7dclhF+wzeAxZCccAgvHHAmJYTAZVmqFgjhP0buigkniHO0mU9POIP/HMcvJAQ70jhX6hlhdiY+CX342Ug8hi1YaQD/OVz4BYTg+JOqBULM0ak45glDDB/nLRDiTofDHCF0UdFTwucS448QvC7sJ+FznfggRET7XhI+o/6DcIuqzOshoTy8Eq5wxaM9JOT66oXQxRVw95CQ6fMXQviqoreEj7zmRviFLEzqIyFjXxnCNfKWQS8JdTdDiEi6+0t4381ICUNsEXcvCRkP/wjn2Ksw/SS8FS+khND95Z4T3nZOU0LkJ/WVkAUPQh9dBtxTwnQzIyGE70z2nNBa3wmxsaK3hGlawyimYV8JGbsR+mgj7S1hsiHF0OuKPhMmiRsjiIZJB7Y29rwJxvCYEgLLHrKSJ+rjw8HAOBH85RcJYYjYeb2LrhoqK2hlVFZBGBOCz33/xBdtAMaIeOvS/ZgQnXYzrwUbTWT8ov/4+jwm3KPT7im1l/nTCJ1872NC3D5iLDlux0iTohr0bzvEhMAywKdE1I6RxmYKLIh+KnambIV2pZbblpXaa3S6FaxYiF466aQ1e1kZ+HTLCRl+cdhvQp/Bizr+FYT6ibloU+81oeUy/AK/34QR+0Hnt70mFD/sgN7C6DWhHLMlPrvtMyG/MIL8vdeEO4aqUPgXEJ7ZCPsZ/SaM+Wb/7TFkM0awh9FrQjxf/wn/H8N6tbg+xCfNJGNobfq7xk8I8b60z/s0SbTAx0M+Ir4R9JCN32tjbEqQ05Df6noIfrvrqTinITi14OeW9rwJ/vpxXopfWyRtN1o5t9gQ9IOVF4L1YdIO45ce0fylaNYYrw/xa/xE3CVGtM01Ses6sSfYp0nlkQZF2xwAm2O8S0QEe22p+JRwEO3hkRM1hLVcgv3SVNwivBdkjtHHag/p3wR73jdR3se36bpHOj7BucVN8kBmphSR/iFnxVZEH0WYu5kXuqbFwYrg/PAui+qirO3TGWlyfog/A76LrKuCEdE11k7PgNHn+HfxGZGZQpvTFMlKzvGBTaHyItrNoPQzt1oMfD3NXXJHYqYGoZ+51dMQ1ETd5VAUtxlXyhcmZiFRXdtNJL7GpPJ8iW51bRS1iQ/hMzdjSJawsb/aRIJNybsImgqSDmF6fy2pESYbQ3zAsK+kbzDca4QJ6rwfQg8iqSO9XbigqdV/fiRuEA1on7Zi/dXq42ur/oTsxGMSpjMsc9+CaonIkoUwJiaaEaUjzdyZ0chifjyIW/gg2sCel2XiAd3dtYwEvH2iuaV9refWHON2/5DQOPgU6mwMl/g5osz9w5ByfltAZ2MPwT3gS5S5Q6pRRiFuXUGDaC6JhzB7D1hzKX0YrLLdRL8V8q6Xu9zY+/ivggRFihsy78rex6dMaxI7VT7ZN4b4s+g3vfZUILhWkhVnqv7U3pEP4VtfDI00HwSs9smHkFnaKyFl0IcQEpzYv+qvyeeDENOOLq8eEOZ6DOH6ROU+vnPCfJ8odHuTF3VP6K1zhNBm+oXqnjDI92vTaA70b+qcUDxfgngSfv2HCLlV1DeRMv3umjDbSjhDSLiZ0TVhSf9SwuS0Y8KyHrSEUb9jwtI+wnQzsVvC8l7Q2gTThjarTgm5NSkl1Kg2u9R3TQmTRrnVygm/aF4XVz+hsckOMRnXq/rqI5sJPyR3qkNIUdF9l3XUqghp6oeEcqGiTZf48+r3LbQ1xY6XvCoTYnpbv8ireaME13r+LsjZBfjVlTfJ8ztQjnCCrz2WE/XCGgPVvvtPb5GikBDvbBzQQTDNjrA45ngKXiVD9mfSx7DSKIpdfc4LcPL/Cdf4Wj8qvpP7kG3v0FuaRW8fF72dd4R/k2DwllG2fUQmHE3fztNW0CRR6tsh4hzfNt0p6qXzxu8fahPQ93BvcVJ4qbqQcbAewRnzb66VEmoAv8atqYt6KPcmw4ymwHil7wtZSt6SVT4osUZRxSvxSox2BLJVuShGKSFU2z3lgm8QLznnGCG2ypnae8Dad/NB5NI6+gQG+pRt2OuR2mqcF0/CCsLmKbgUlwkpX6rEVlUY1d/l1rRDo/UM93ZYB1rGOFg3n49iW8pRTqgt6g2V66Nfu62b3ArzsezF6hrCcFS3kBKziN4+M7INs9F85LOiUF9PqPmVOTgXwZ7QgZaoSezg0q+gqCKs3CKW3nHY6gD+MdbZKi/KtxsSlj/vLPXLZ/hSRns9K7dV7swrGaoJS6pQuGjLgZYxmqWxg+vraoQawsKwqJ8pMlBFxrLYkdt5UiXUondDtVjUXoCoZiyYj05ppG9MqL1WJgu274RvUJjLca8WsAFhtkpDSOIMVFFx7DhnGHmtiTYj1ObOY1Jvr13ypYzJfHwAOjVOpjFhHDSSv5sYnbrmuzFGt8v6dWFChVCbMMnE0ehoAr7JNgfb2FS5rAz0ioTa10hSd75AyDbXgTWrStXUCbWwpa7kQJnXZUWyDSLUtP4MYSKz8e9uTqiFXVNl1HQA1Qi1Vddcf1op/GoVQk3rx1y0lX6zGmEvLFXBQgGE2qrrmG+rWCiEsGuf2tyHwgk7dTiqAwgj7G4Y1QcQStjNbFSegRjCLpyqogtFE36aEWSgSMJPTkcTZqBoQm31GUYDwYckjBnbz+OADoaKsPVxxNgnEaHW5nzE89EQxn61jfhoQ+PDq2gIWzBWiuFLRUWokULivOerCAk1Ikiy0buJllDDQtrEeFoLhImAlGZIjqe1RBhrtTIVqsDseOzaoEvUFmGq1Sqs44zZwtbgUrVKeNcqJg1N07DtFDf5l2GaCVmraHf9A3HEDN2tpOABAAAAAElFTkSuQmCC"

/***/ }),

/***/ "8ea1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ "907b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "90e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");
var isCallable = __webpack_require__("1626");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__("aed9");
var anObject = __webpack_require__("825a");
var toPropertyKey = __webpack_require__("a04b");

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "a04b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__("c04e");
var isSymbol = __webpack_require__("d9b5");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "a5f4":
/***/ (function(module) {

module.exports = JSON.parse("{\"gif\":true,\"jpeg\":true,\"jpg\":true,\"png\":true,\"webp\":true,\"svg\":true}");

/***/ }),

/***/ "a61e":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "aed9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ "b42e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var hasOwn = __webpack_require__("1a2d");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("04f8");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var call = __webpack_require__("c65b");
var isObject = __webpack_require__("861d");
var isSymbol = __webpack_require__("d9b5");
var getMethod = __webpack_require__("dc4a");
var ordinaryToPrimitive = __webpack_require__("485a");
var wellKnownSymbol = __webpack_require__("b622");

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = false;


/***/ }),

/***/ "c65b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__("40d5");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var defineGlobalProperty = __webpack_require__("6374");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__("e330");
var hasOwn = __webpack_require__("1a2d");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "cb2d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__("1626");
var definePropertyModule = __webpack_require__("9bf2");
var makeBuiltIn = __webpack_require__("13d2");
var defineGlobalProperty = __webpack_require__("6374");

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cdce":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ "d012":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("da84");
var isCallable = __webpack_require__("1626");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "d9b5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var isCallable = __webpack_require__("1626");
var isPrototypeOf = __webpack_require__("3a9b");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || this || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "dc4a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__("59ed");
var isNullOrUndefined = __webpack_require__("7234");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ "dd54":
/***/ (function(module) {

module.exports = JSON.parse("[\"😀\",\"😃\",\"😄\",\"😁\",\"😆\",\"😅\",\"😂\",\"🤣\",\"😇\",\"😉\",\"😊\",\"🙂\",\"🙃\",\"😋\",\"😌\",\"😍\",\"🥳\",\"😘\",\"😗\",\"😚\",\"🤪\",\"😜\",\"😎\",\"😓\",\"👌\",\"👋\",\"👍\",\"👎\"]");

/***/ }),

/***/ "e330":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__("40d5");

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hasOwn = __webpack_require__("1a2d");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "f7fe":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/pug-plain-loader??ref--15!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/comments/comments.vue?vue&type=template&id=10dfa284&lang=pug

const _hoisted_1 = {
  class: "comments__emoji-list"
};
const _hoisted_2 = ["onClick"];
const _hoisted_3 = {
  class: "comments__panel-form-add"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_comments_svg_icons = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("comments-svg-icons");
  const _component_comments_form = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("comments-form");
  const _component_comments_item = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("comments-item");
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["comments", {
      'comments--lock': _ctx.isScrollDocument,
      [_ctx.optionsInit.yourCssClass]: _ctx.optionsInit.yourCssClass
    }]),
    "data-vue-comments": ""
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_comments_svg_icons), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Transition"], {
    name: "fade"
  }, {
    default: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withCtx"])(() => [_ctx.emojiList.isShow ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: 0,
      class: "comments__emoji",
      onMouseleave: _cache[0] || (_cache[0] = $event => _ctx.toggleEmojiList(null, $event, false)),
      "data-vue-comments-emoji-list": "",
      style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
        top: `${_ctx.emojiList.top}px`,
        left: `${_ctx.emojiList.left}px`
      })
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_1, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.optionsInit.emojiLilst, (item, index) => {
      return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
        class: "comments__emoji-list-item",
        onClick: $event => _ctx.addEmoji(item),
        key: index
      }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item), 9, _hoisted_2);
    }), 128))])], 36)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]),
    _: 1
  }), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_3, [_ctx.optionsInit.formAddShowAlways || _ctx.optionsInit.user.auth ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_comments_form, {
    key: 0
  })) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.mapItems[_ctx.optionsInit.parentIdStart] ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["comments__list", {
      'comments__list--scroll': _ctx.isHorizontalScroll
    }]),
    ref: "list",
    onMousedown: _cache[1] || (_cache[1] = $event => _ctx.setMousedownCord($event)),
    onMousemove: _cache[2] || (_cache[2] = $event => _ctx.setHorizontalScroll($event)),
    onMouseleave: _cache[3] || (_cache[3] = $event => _ctx.setMousedownCord($event))
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.mapItems[_ctx.optionsInit.parentIdStart].items, (commentId, i) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      class: "comments__item",
      key: commentId
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_comments_item, {
      comment: _ctx.comments[commentId],
      comments: _ctx.comments,
      mapItems: _ctx.mapItems,
      widthResizeWindow: _ctx.widthResizeWindow
    }, null, 8, ["comment", "comments", "mapItems", "widthResizeWindow"])]);
  }), 128))], 34)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2);
}
// CONCATENATED MODULE: ./src/components/comments/comments.vue?vue&type=template&id=10dfa284&lang=pug

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/pug-plain-loader??ref--15!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/comments/comments-item.vue?vue&type=template&id=1e58f3af&lang=pug

const comments_itemvue_type_template_id_1e58f3af_lang_pug_hoisted_1 = {
  class: "comments-item__row-comment"
};
const comments_itemvue_type_template_id_1e58f3af_lang_pug_hoisted_2 = {
  class: "comments-item__col-avatar"
};
const comments_itemvue_type_template_id_1e58f3af_lang_pug_hoisted_3 = ["src"];
const _hoisted_4 = {
  key: 0,
  class: "comments-item__content"
};
const _hoisted_5 = {
  key: 0,
  class: "comments-item__error-text"
};
const _hoisted_6 = {
  class: "comments-item__panel-top"
};
const _hoisted_7 = {
  class: "comments-item__user-name",
  "data-comments-item-user-name": ""
};
const _hoisted_8 = {
  key: 0,
  class: "comments-item__answer-to"
};
const _hoisted_9 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", {
  class: "comments-item__answer-to-icon"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-share`
})], -1);
const _hoisted_10 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", {
  class: "comments-item__btn-settings-icon"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-settings`
})], -1);
const _hoisted_11 = {
  key: 0,
  class: "comments-spiner"
};
const _hoisted_12 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  class: "comments-spiner__element"
}, null, -1);
const _hoisted_13 = [_hoisted_12];
const _hoisted_14 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-closed`
})], -1);
const _hoisted_15 = [_hoisted_14];
const _hoisted_16 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", {
  class: "comments-item__settings-icon"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-edit`
})], -1);
const _hoisted_17 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const _hoisted_18 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", {
  class: "comments-item__settings-icon"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-delete`
})], -1);
const _hoisted_19 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-closed`
}, null, -1);
const _hoisted_20 = [_hoisted_19];
const _hoisted_21 = {
  class: "comments-item__file-gallery-box-img"
};
const _hoisted_22 = ["href"];
const _hoisted_23 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-download`
})], -1);
const _hoisted_24 = [_hoisted_23];
const _hoisted_25 = ["src", "alt"];
const _hoisted_26 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-arrow-left`
})], -1);
const _hoisted_27 = [_hoisted_26];
const _hoisted_28 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", null, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-arrow-right`
})], -1);
const _hoisted_29 = [_hoisted_28];
const _hoisted_30 = ["href"];
const _hoisted_31 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("br", null, null, -1);
const _hoisted_32 = {
  key: 1,
  class: "comments-item__file-gallery-count"
};
const _hoisted_33 = {
  class: "comments-item__text-box"
};
const _hoisted_34 = ["innerHTML"];
const _hoisted_35 = {
  key: 1,
  class: "comments-item__date-update"
};
const _hoisted_36 = {
  key: 1,
  class: "comments-item__panel-bottom"
};
const _hoisted_37 = {
  class: "comments-item__panel-bottom-col comments-item__panel-bottom-col--1"
};
const _hoisted_38 = {
  class: "comments-item__date-create"
};
const _hoisted_39 = {
  class: "comments-item__panel-bottom-col comments-item__panel-bottom-col--2"
};
const _hoisted_40 = {
  key: 0,
  class: "comments-spiner"
};
const _hoisted_41 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  class: "comments-spiner__element"
}, null, -1);
const _hoisted_42 = [_hoisted_41];
const _hoisted_43 = {
  key: 1,
  class: "comments-item__vote"
};
const _hoisted_44 = {
  key: 0,
  class: "comments-spiner"
};
const _hoisted_45 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  class: "comments-spiner__element"
}, null, -1);
const _hoisted_46 = [_hoisted_45];
const _hoisted_47 = {
  class: "comments-item__vote-item"
};
const _hoisted_48 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-like`
}, null, -1);
const _hoisted_49 = [_hoisted_48];
const _hoisted_50 = {
  class: "comments-item__vote-count"
};
const _hoisted_51 = {
  class: "comments-item__vote-item"
};
const _hoisted_52 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-dislike`
}, null, -1);
const _hoisted_53 = [_hoisted_52];
const _hoisted_54 = {
  class: "comments-item__vote-count"
};
const _hoisted_55 = {
  key: 2,
  class: "comments-item__row-btn-more"
};
const _hoisted_56 = {
  key: 0,
  class: "comments-spiner"
};
const _hoisted_57 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  class: "comments-spiner__element"
}, null, -1);
const _hoisted_58 = [_hoisted_57];
const _hoisted_59 = {
  class: "comments-item__panel-form-add"
};
const _hoisted_60 = {
  key: 3,
  class: "comments-item__panel-bottom comments-item__panel-bottom--edited"
};
const _hoisted_61 = {
  class: "comments-item__panel-bottom-col comments-item__panel-bottom-col--1"
};
const _hoisted_62 = {
  class: "comments-item__date-create"
};
const _hoisted_63 = {
  class: "comments-item__panel-bottom-col comments-item__panel-bottom-col--2"
};
const _hoisted_64 = {
  key: 0,
  class: "comments-item__row-answer"
};
function comments_itemvue_type_template_id_1e58f3af_lang_pug_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_comments_form = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("comments-form");
  const _component_comments_item = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("comments-item", true);
  return _ctx.isShow ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["comments-item", {
      'comments-item--delete': _ctx.mapItems[_ctx.comment.id].isDelete
    }])
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", comments_itemvue_type_template_id_1e58f3af_lang_pug_hoisted_1, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", comments_itemvue_type_template_id_1e58f3af_lang_pug_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
    class: "comments-item__avatar-img",
    src: _ctx.comment.userImg || _ctx.options.imgDefaultUser,
    loading: "lazy"
  }, null, 8, comments_itemvue_type_template_id_1e58f3af_lang_pug_hoisted_3)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["comments-item__col-content", {
      'comments-item__col-content--form-show': _ctx.isFormShow
    }])
  }, [!_ctx.isEdited ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_4, [_ctx.error ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_5, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.error), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_7, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.comment.userName), 1), _ctx.userNameAnswer ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", _hoisted_8, [_hoisted_9, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
    class: "comments-item__answer-to-user",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.scrollToComment(_ctx.comment.parentId))
  }, "@" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.userNameAnswer), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.comment.isManageEdit || _ctx.comment.isManageDelete ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    class: "comments-item__btn-settings",
    onClick: _cache[5] || (_cache[5] = $event => _ctx.toggleSettings())
  }, [_hoisted_10, _ctx.isShowSettings ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    class: "comments-item__settings",
    onMouseleave: _cache[4] || (_cache[4] = $event => _ctx.toggleSettings())
  }, [_ctx.isDeleteSending ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_11, _hoisted_13)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: "comments-item__settings-closed",
    onMouseup: _cache[1] || (_cache[1] = $event => _ctx.toggleSettings())
  }, _hoisted_15, 32), _ctx.comment.isManageEdit ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 1,
    class: "comments-item__settings-item",
    onClick: _cache[2] || (_cache[2] = $event => (_ctx.toggleSettings(), _ctx.toggleEdited(true), _ctx.toggleForm(true)))
  }, [_hoisted_16, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.options.translation.settingsEdit), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _hoisted_17, _ctx.comment.isManageDelete ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 2,
    class: "comments-item__settings-item",
    onClick: _cache[3] || (_cache[3] = $event => _ctx.deleteMessage(_ctx.comment))
  }, [_hoisted_18, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.options.translation.settingsDelete), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 32)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.files.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 1,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["comments-item__file-gallery", {
      active: _ctx.isOpenGallery
    }])
  }, [_ctx.isOpenGallery ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", {
    key: 0,
    class: "comments-item__file-gallery-closed",
    onClick: _cache[6] || (_cache[6] = $event => _ctx.toggleGallery(false))
  }, _hoisted_20)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_21, [_ctx.files[_ctx.slideNum].type === 'icon' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 0,
    download: "",
    href: _ctx.files[_ctx.slideNum].src,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(`comments-item__file-gallery-icon`)
  }, _hoisted_24, 8, _hoisted_22)) : (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("img", {
    key: 1,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["comments-item__file-gallery", `comments-item__file-gallery-img`]),
    loading: "lazy",
    onClick: _cache[7] || (_cache[7] = $event => _ctx.toggleGallery(true)),
    src: !_ctx.isOpenGallery ? _ctx.files[_ctx.slideNum].preview : _ctx.files[_ctx.slideNum].src,
    alt: _ctx.files[_ctx.slideNum].name
  }, null, 8, _hoisted_25)), _ctx.files.length > 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 2,
    class: "comments-item__file-gallery-arrow comments-item__file-gallery-arrow--prev",
    onClick: _cache[8] || (_cache[8] = $event => _ctx.leafSlide(-1))
  }, _hoisted_27)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.files.length > 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 3,
    class: "comments-item__file-gallery-arrow comments-item__file-gallery-arrow--next",
    onClick: _cache[9] || (_cache[9] = $event => _ctx.leafSlide(1))
  }, _hoisted_29)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.files[_ctx.slideNum].type === 'icon' ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("a", {
    key: 4,
    class: "comments-item__file-gallery-download",
    download: "download",
    href: _ctx.files[_ctx.slideNum].src
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.options.translation.btnFileDownload), 1), _hoisted_31, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.files[_ctx.slideNum].name), 1)], 8, _hoisted_30)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), _ctx.files.length > 1 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_32, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("b", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.slideNum + 1), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" из "), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("b", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.files.length), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_33, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: "comments-item__text",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])(_ctx.isTextBriefЕxpand ? {
      'line-clamp': _ctx.options.text.briefMaxLine
    } : {}),
    innerHTML: _ctx.isTextBriefЕxpand ? _ctx.text.brief : _ctx.text.all,
    ref: "text"
  }, null, 12, _hoisted_34), _ctx.isTextBrief ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
    key: 0,
    class: "comments-item__text-more",
    onClick: _cache[10] || (_cache[10] = $event => _ctx.toggleTextBrief(_ctx.comment.text))
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.isTextBriefЕxpand ? _ctx.options.translation.btnЕxpand : _ctx.options.translation.btnCollapse), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.comment.dateUpdate ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_35, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("b", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.options.translation.dateEditedText), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(" " + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.formatDate(_ctx.comment.dateUpdate)), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), !_ctx.isEdited ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_36, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_37, [_ctx.options.btnAnswerShowAlways || _ctx.options.user.auth ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    class: "comments-item__btn-ansfer",
    onClick: _cache[11] || (_cache[11] = $event => _ctx.toggleForm())
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.options.translation.btnAnswer), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_38, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.formatDate(_ctx.comment.dateCreate)), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_39, [_ctx.mapItems[_ctx.comment.id].quantity && (_ctx.mapItems[_ctx.comment.id].items.length == 0 || _ctx.options.list.secondShowStart == 0 && !_ctx.mapItems[_ctx.comment.id].qShowNext) ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("button", {
    key: 0,
    class: "comments-item__btn-more comments-item__btn-more--answers",
    onClick: _cache[12] || (_cache[12] = $event => _ctx.showComments({
      parentId: _ctx.comment.id,
      insertTo: 'after'
    }))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.options.translation.btnMoreAnswers), 1), _ctx.mapItems[_ctx.comment.id].isProcessing ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_40, _hoisted_42)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.options.isShowVote ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_43, [_ctx.isVoteSending ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_44, _hoisted_46)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_47, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["comments-item__vote-btn", {
      active: _ctx.comment.voteValue == 1
    }]),
    onClick: _cache[13] || (_cache[13] = $event => _ctx.sendVote(1, _ctx.comment))
  }, _hoisted_49, 2)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_50, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.comment.like || ""), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_51, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["comments-item__vote-btn", {
      active: _ctx.comment.voteValue == -1
    }]),
    onClick: _cache[14] || (_cache[14] = $event => _ctx.sendVote(-1, _ctx.comment))
  }, _hoisted_53, 2)), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_54, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.comment.dislike || ""), 1)])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.mapItems[_ctx.comment.parentId].btnMoreNext == _ctx.comment.id && _ctx.mapItems[_ctx.comment.parentId].qShowBalance > 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_55, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("button", {
    class: "comments-item__btn-more",
    onClick: _cache[15] || (_cache[15] = $event => _ctx.showComments({
      parentId: _ctx.comment.parentId,
      insertTo: 'after'
    }))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createTextVNode"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.options.translation.btnMore) + " (" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.mapItems[_ctx.comment.parentId].qShowBalance) + ")", 1), _ctx.mapItems[_ctx.comment.parentId].isProcessing ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_56, _hoisted_58)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_59, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])(_component_comments_form, {
    comment: _ctx.comment,
    userNameAnswer: _ctx.comment.userName,
    isEdited: _ctx.isEdited
  }, null, 8, ["comment", "userNameAnswer", "isEdited"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.isFormShow]]), _ctx.isEdited ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_60, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_61, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_62, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.formatDate(_ctx.comment.dateCreate)), 1)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", _hoisted_63, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: "comments-item__btn-cancel-editing",
    onClick: _cache[16] || (_cache[16] = $event => _ctx.cancelEditing())
  }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.options.translation.btnСancelEditing), 1)])])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2)]), _ctx.mapItems[_ctx.comment.id] ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_64, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.mapItems[_ctx.comment.id].items, answerId => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_comments_item, {
      userNameAnswer: _ctx.comment.userName,
      comments: _ctx.comments,
      mapItems: _ctx.mapItems,
      widthResizeWindow: _ctx.widthResizeWindow,
      comment: _ctx.comments[answerId],
      key: answerId
    }, null, 8, ["userNameAnswer", "comments", "mapItems", "widthResizeWindow", "comment"]);
  }), 128))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 2)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true);
}
// CONCATENATED MODULE: ./src/components/comments/comments-item.vue?vue&type=template&id=1e58f3af&lang=pug

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/pug-plain-loader!./node_modules/pug-plain-loader??ref--15!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/comments/comments-form.vue?vue&type=template&id=88b6bec2&lang=pug

const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_1 = {
  class: "comments-form"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_2 = {
  key: 0,
  class: "comments-form__col-avatar"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_3 = ["src"];
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_4 = {
  key: 0,
  class: "comments-spiner"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_5 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
  class: "comments-spiner__element"
}, null, -1);
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_6 = [comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_5];
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_7 = {
  class: "comments-form__textarea-content"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_8 = {
  key: 0,
  class: "comments-form__answer-to"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_9 = {
  class: "comments-form__answer-to-text"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_10 = {
  class: "comments-form__answer-to-user-name"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_11 = {
  key: 1,
  class: "comments-form__textarea-error-text"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_12 = {
  key: 2,
  class: "comments-form__file-list"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_13 = ["onClick", "title"];
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_14 = ["onClick"];
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_15 = {
  class: "comments-form__file-preview"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_16 = ["src", "alt"];
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_17 = {
  key: 0,
  class: "comments-form__file-preview-text"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_18 = ["placeholder"];
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_19 = {
  class: "comments-form__textarea-panel"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_20 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", {
  class: "comments-form__textarea-panel-icon"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-image`
})], -1);
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_21 = ["accept"];
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_22 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("svg", {
  class: "comments-form__textarea-panel-icon"
}, [/*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-smile`
})], -1);
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_23 = [comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_22];
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_24 = {
  key: 0,
  class: "comments-form__message-file-params"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_25 = {
  class: "comments-form__col-btn-send"
};
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_26 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("use", {
  "xlink:href": `#vue-comments-symbol-icon-send`
}, null, -1);
const comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_27 = [comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_26];
function comments_formvue_type_template_id_88b6bec2_lang_pug_render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_1, [!_ctx.isEdited ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_2, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
    class: "comments-form__avatar-img",
    src: _ctx.options.user.img
  }, null, 8, comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_3)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: "comments-form__col-textarea",
    onClick: _cache[8] || (_cache[8] = $event => _ctx.checkAuth($event, 'form'))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["comments-form__textarea", [{
      'comments-form__textarea-error': _ctx.error
    }]])
  }, [_ctx.isFormSending ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_4, comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_6)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_7, [!_ctx.isEdited && _ctx.userNameAnswer ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_8, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_9, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.options.translation.formAnswerTo), 1), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_10, "@" + Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.userNameAnswer), 1)])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.error ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_11, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.error), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.files.length ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_12, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.files, (file, index) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["comments-form__file-item", file.isDelete ? 'comments-form__file-item--delete' : '']),
      key: index
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
      class: "comments-form__file-btn-delete",
      onClick: $event => _ctx.deleteFile(index),
      title: _ctx.options.translation.fileDelete
    }, null, 8, comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_13), file.isDelete ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", {
      key: 0,
      class: "comments-form__file-btn-restore",
      onClick: $event => _ctx.restoreFile(index)
    }, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.options.translation.fileRestore), 9, comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_14)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_15, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("img", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(["comments-form__file-preview", `comments-form__file-preview${_ctx.options.imgExtensions[file.extension] ? '-img' : '-icon'}`]),
      src: _ctx.options.imgExtensions[file.extension] ? file.src : _ctx.iconFile,
      alt: file.name
    }, null, 10, comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_16), !_ctx.options.imgExtensions[file.extension] ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_17, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(file.name), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 2);
  }), 128))])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("textarea", {
    class: "comments-form__message",
    onInput: _cache[0] || (_cache[0] = $event => _ctx.getPosCursor()),
    onClick: _cache[1] || (_cache[1] = $event => _ctx.getPosCursor()),
    placeholder: _ctx.options.translation.formPlaceholder,
    ref: "text",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => _ctx.text = $event)
  }, null, 40, comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_18), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vModelText"], _ctx.text]])]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_19, [_ctx.options.isShowBtnUpload ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("label", {
    key: 0,
    class: "comments-form__textarea-panel-upload-file",
    onClick: _cache[3] || (_cache[3] = $event => _ctx.createFilePreview($event, _ctx.$refs.files.files)),
    onChange: _cache[4] || (_cache[4] = $event => _ctx.createFilePreview($event, _ctx.$refs.files.files))
  }, [comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_20, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("input", {
    class: "comments-form__textarea-panel-upload-file-input",
    type: "file",
    ref: "files",
    accept: _ctx.options.validExtensions.str,
    multiple: "multiple"
  }, null, 8, comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_21)], 32)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true), _ctx.options.isShowBtnEmoji ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 1,
    class: "comments-form__textarea-panel-emoji-box",
    "data-vue-comments-form-emoji-btn": "",
    onTouchend: _cache[5] || (_cache[5] = $event => _ctx.toggleEmojiList(this, $event)),
    onMouseenter: _cache[6] || (_cache[6] = $event => _ctx.toggleEmojiList(this, $event, true)),
    onMouseleave: _cache[7] || (_cache[7] = $event => _ctx.toggleEmojiList(null, $event, false))
  }, comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_23, 32)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 2), _ctx.options.translation.messageFileParams ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_24, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(_ctx.options.translation.messageFileParams), 1)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_25, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", {
    class: "comments-form__btn-send",
    onClick: _cache[9] || (_cache[9] = $event => _ctx.sendComment($event))
  }, comments_formvue_type_template_id_88b6bec2_lang_pug_hoisted_27))])]);
}
// CONCATENATED MODULE: ./src/components/comments/comments-form.vue?vue&type=template&id=88b6bec2&lang=pug

// EXTERNAL MODULE: ./src/components/comments/img/icon-file.svg
var icon_file = __webpack_require__("0928");
var icon_file_default = /*#__PURE__*/__webpack_require__.n(icon_file);

// CONCATENATED MODULE: ./src/components/comments/comments-form.js


/* harmony default export */ var comments_form = ({
  name: "CommentsForm",
  inject: ["options", "preparationRequestData", "addCommentToList", "editCommentToList", "emitMessage", "toggleForm", "toggleEmojiList", "addEmoji"],
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      }
    },
    isEdited: {
      type: Boolean,
      default: false
    },
    userNameAnswer: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      text: "",
      files: [],
      iconFile: icon_file_default.a,
      accept: "",
      error: "",
      // Указывает на то что в данный момент выполняется отправка формы
      isFormSending: false,
      // Позиция курсора
      posCursor: 0
    };
  },
  watch: {
    isEdited: {
      immediate: true,
      handler() {
        // При редактировании
        if (this.isEdited) {
          this.files = this.createFileList(this.comment.files);
          this.text = this.comment.text;
        } else {
          // Если нажать кнопку отмена
          this.clearForm();
        }
        this.error = "";
      }
    }
  },
  methods: {
    // Создание превью файла
    createFilePreview($event, files) {
      this.checkAuth($event, "form-btn-upload");
      this.error = "";
      let {
        validExtensions,
        fileMaxSize,
        translation
      } = this.options;
      for (let file of files) {
        let extensionFile = this.getExtension(file.name);
        if (validExtensions.str && !validExtensions.items[extensionFile]) {
          this.error = translation.errorFileExtension;
          continue;
        }
        if (file.size > fileMaxSize) {
          this.error = translation.errorFileSize;
          continue;
        }
        let infoPreview = {
          file,
          src: null,
          extension: extensionFile,
          name: file.name,
          isDelete: false
        };

        // Изображения
        if (this.options.imgExtensions[extensionFile]) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            infoPreview.src = reader.result;
            this.files.push(infoPreview);
          };
          reader.onerror = () => {
            this.files.push(infoPreview);
          };
        } else {
          // Остальные файлы
          this.files.push(infoPreview);
        }
      }
    },
    // Список файлов на основе ссылок
    createFileList(dataFiles) {
      let files = [];
      for (let item of dataFiles) {
        files.push({
          src: item.src,
          extension: this.getExtension(item.src),
          name: item.name,
          isDelete: false
        });
      }
      return files;
    },
    // Получить расшырение файла
    getExtension(name) {
      return name.match(/[^.]+$/i)[0];
    },
    // Удалить файл
    deleteFile(num) {
      this.files[num].isDelete = true;
    },
    // Востановить файл
    restoreFile(num) {
      this.files[num].isDelete = false;
    },
    // Если пользователь не автроизован, посылаем сообщение
    checkAuth(event, sourceType) {
      if (!this.options.user.auth) {
        event.preventDefault();
        this.emitMessage({
          type: "user-no-auth",
          component: this,
          sourceType
        });
      }
    },
    // Отправить сообщение на сервер
    sendComment(event) {
      this.checkAuth(event, "form-send");
      let {
        user,
        filesMaxCount,
        translation,
        text
      } = this.options;
      let textContent = this.text.trim();
      let isFiles = false;
      let coutFiles = 0;
      if (this.files.length) {
        for (let file of this.files) {
          // Проверяем наличие файлов
          if (!file.isDelete) {
            coutFiles++;
            isFiles = true;
          }
        }
      }

      // Если количество файлов превышает допустимое, возвращаем ошибку
      if (coutFiles > filesMaxCount) {
        this.error = translation.errorFileMaxCount;
        return;
      }

      // Если длина текста не соответсвует условию, возвращаем ошибку
      if (textContent.length < text.minLength || textContent.length > text.maxLength) {
        this.error = translation.errorTextLength;
        return;
      }
      if (!isFiles && !textContent || !user.auth) return;
      this.isFormSending = true;
      this.error = "";
      if (!this.isEdited) {
        this.addComment(textContent);
      } else {
        this.editComment(textContent);
      }
    },
    // Добавить комментарий
    addComment(text) {
      let {
        url,
        params,
        send,
        typeData
      } = this.options.dataApi.commentAdd;
      let files = [];
      if (this.files.length) {
        for (let file of this.files) {
          if (!file.isDelete) {
            files.push(file.file);
          }
        }
      }
      let data = this.preparationRequestData({
        data: {
          text,
          parentId: this.comment.id || 0,
          files
        },
        url,
        params,
        typeData
      });
      send({
        url: data.url,
        params: data.params
      }).then(comment => {
        try {
          let insertTo = this.options.parentIdStart == comment.parentId ? "before" : "after";
          comment.userName = comment.userName || this.options.user.name;
          this.clearForm();
          this.addCommentToList(comment, insertTo);
          if (this.toggleForm) {
            this.toggleForm();
          }
        } catch (error) {
          this.error = this.options.translation.errorUnexpected;
          console.error(error);
        }
      }).catch(error => {
        this.error = this.options.translation.errorFormSend || error;
        console.error(error);
      }).finally(() => {
        this.emitMessage({
          type: "comment-add",
          component: this,
          sourceType: "form",
          error: this.error
        });
        this.isFormSending = false;
      });
    },
    // Редактировать комментарий
    editComment(text) {
      let {
        url,
        params,
        send,
        typeData
      } = this.options.dataApi.commentEdit;
      let files = [];
      let uploadedFiles = [];
      if (this.files.length) {
        for (let file of this.files) {
          // Новые файлы
          if (file.file && !file.isDelete) {
            files.push(file.file);
          }
          // Информация об уже загруженных файлах
          if (!file.file) {
            uploadedFiles.push(file);
          }
        }
      }
      let data = this.preparationRequestData({
        data: {
          text,
          commentId: this.comment.id,
          uploadedFiles: JSON.stringify(uploadedFiles),
          files
        },
        url,
        params,
        typeData
      });
      send({
        url: data.url,
        params: data.params
      }).then(response => {
        try {
          this.editCommentToList(response);
          this.clearForm();
          if (this.toggleForm) {
            this.toggleForm();
          }
        } catch (error) {
          this.error = this.options.translation.errorUnexpected;
          console.error(error);
        }
      }).catch(error => {
        this.error = this.options.translation.errorFormSend || error;
        console.error(error);
      }).finally(() => {
        this.emitMessage({
          type: "comment-edit",
          component: this,
          sourceType: "form",
          error: this.error
        });
        this.isFormSending = false;
      });
    },
    // Очистить форму
    clearForm() {
      this.text = "";
      this.files = [];
      if (this.$refs.files) {
        this.$refs.files.value = "";
        this.$refs.text.style.height = "auto";
      }
    },
    // Получить позицию курсора (нужно для вставки emoji)
    getPosCursor() {
      this.posCursor = this.$refs.text.selectionEnd;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/comments/comments-form.vue?vue&type=script&lang=js

/* harmony default export */ var comments_formvue_type_script_lang_js = (comments_form);
// CONCATENATED MODULE: ./src/components/comments/comments-form.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/comments/comments-form.vue?vue&type=style&index=0&id=88b6bec2&lang=sass
var comments_formvue_type_style_index_0_id_88b6bec2_lang_sass = __webpack_require__("7f0b");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/components/comments/comments-form.vue







const __exports__ = /*#__PURE__*/exportHelper_default()(comments_formvue_type_script_lang_js, [['render',comments_formvue_type_template_id_88b6bec2_lang_pug_render]])

/* harmony default export */ var comments_comments_form = (__exports__);
// EXTERNAL MODULE: ./src/components/comments/reg-exp.js
var reg_exp = __webpack_require__("44dc");
var reg_exp_default = /*#__PURE__*/__webpack_require__.n(reg_exp);

// CONCATENATED MODULE: ./src/components/comments/comments-item.js





/* harmony default export */ var comments_item = ({
  name: "CommentsItem",
  components: {
    CommentsForm: comments_comments_form,
    CommentsItem: comments_comments_item
  },
  inject: ["options", "emitMessage", "addCommentVote", "preparationRequestData", "deleteCommentToList", "showComments", "setMapItemLinkComponent", "scrollToComment"],
  provide() {
    return {
      toggleForm: this.toggleForm
    };
  },
  watch: {
    // При изменении размеров окна
    widthResizeWindow: {
      handler() {
        this.checkIsShowBntTextMore();
      }
    },
    // Указывает на то отображён ли комментарий
    isShow: {
      handler() {
        this.$nextTick(() => {
          this.checkIsShowBntTextMore();
        });
      }
    }
  },
  computed: {
    isShow() {
      return this.mapItems[this.comment.parentId].show[this.comment.id];
    }
  },
  props: {
    comments: {
      type: Object,
      default() {
        return {};
      }
    },
    comment: {
      type: Object,
      default() {
        return {};
      }
    },
    mapItems: {
      type: Object,
      default() {
        return {};
      }
    },
    userNameAnswer: {
      type: String,
      default: ""
    },
    widthResizeWindow: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // Отображаемый текст
      text: {
        brief: "",
        all: ""
      },
      // Показать кнопку Еще
      isTextBrief: false,
      // Переключатель кнопок Еще / Свернуть
      isTextBriefЕxpand: true,
      // Показать / скрыть форму добавления вопроса
      isFormShow: false,
      iconFile: icon_file_default.a,
      files: [],
      // Номер текущего слайда
      slideNum: 0,
      // Открыть галлерею
      isOpenGallery: false,
      // Cписок ссылок в тексте
      listLinks: {},
      // Слушетели событий
      listeners: {},
      // Указывает на то что на сервер в данный ммомент отправляется лайк
      isVoteSending: false,
      // Указывает на то что на сервер отправляется запрос на удаление комментария
      isDeleteSending: false,
      // Указывает на то что в данный момент комментарий находится в состояниии редактирования
      isEdited: false,
      // Показать список настроек: Редактировать / удалить
      isShowSettings: false,
      error: ""
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.setMapItemLinkComponent(this.comment.id, this);
    this.checkIsShowBntTextMore();
  },
  methods: {
    init() {
      this.preparationDataFiles();
      let {
        text: textComment
      } = this.comment;
      let {
        briefMaxLength
      } = this.options.text;
      this.preparationText(textComment, briefMaxLength, reg_exp_default.a);
    },
    preparationDataFiles() {
      this.files = [];
      for (let file of this.comment.files) {
        let partsStr = file.preview.split("?");
        let extension;
        if (partsStr.length > 1) {
          // file-name.jpg?reset=v1
          extension = partsStr[partsStr.length - 2].match(/[^.]+$/i)[0];
        } else {
          // file-name.jpg
          extension = file.preview.match(/[^.]+$/i)[0];
        }
        let item = {
          ...file,
          extension
        };
        if (this.options.imgExtensions[extension]) {
          item.type = "img";
        } else {
          item.type = "icon";
        }
        item.src = file.src;
        this.files.push(item);
      }
    },
    // Плдготовка текста
    preparationText(text, maxLength, regExp) {
      let listLinks = this.createTextListLinks(text, regExp.link);
      let isTextBriefLength = this.checkTextBriefMaxLength(text, maxLength);
      let textBrief = this.cropText(text, maxLength);
      // isTextBrief - на этапе монтирования будет checkTextBriefMaxLine
      this.isTextBrief = isTextBriefLength;
      this.text.all = this.convertTxtToHtml(text, listLinks, regExp.link);
      this.text.brief = this.convertTxtToHtml(textBrief, listLinks, regExp.link);
      return {
        text: {
          all: this.text.all,
          brief: this.text.brief
        },
        isTextBrief: this.isTextBrief
      };
    },
    // Проверяем нужно ли скрывать текст по длине строки
    checkTextBriefMaxLength(text, maxLength) {
      if (maxLength === "none") return false;
      return text.length > maxLength;
    },
    // Проверяем высоту после того как элемент примоттирован
    checkTextBriefMaxLine(maxLine, scrollHeight, clientHeight) {
      if (maxLine === "none") return false;
      return scrollHeight > clientHeight;
    },
    // Проверка нужно ли отображать кнопку "Показать больше" для текста
    checkIsShowBntTextMore() {
      let {
        briefMaxLength,
        briefMaxLine
      } = this.options.text;
      let {
        text: textComment
      } = this.comment;
      let isBriefMaxLength = this.checkTextBriefMaxLength(textComment, briefMaxLength);
      let isBriefMaxLine;
      if (this.$refs.text) {
        let {
          scrollHeight,
          clientHeight
        } = this.$refs.text;
        isBriefMaxLine = this.checkTextBriefMaxLine(briefMaxLine, scrollHeight, clientHeight);
      }
      this.isTextBrief = isBriefMaxLength || isBriefMaxLine;
      return this.isTextBrief;
    },
    // Создать список ссылок которые есть в тексте
    createTextListLinks(text, regExp) {
      let counerLinks = 0;
      let listLinks = {};
      text.replace(regExp, result => {
        counerLinks++;
        listLinks[counerLinks] = result;
      });
      return {
        count: counerLinks,
        items: listLinks
      };
    },
    // Преобразовать текст в HTML
    convertTxtToHtml(text, listLinks, regExp) {
      let counter = 0;
      if (listLinks.count) {
        text = text.replace(regExp, result => {
          counter++;
          return `<a href="${listLinks.items[counter]}" target="_blank">${result}</a>`;
        });
      }
      return text.replace(/\n/g, "<br/>");
    },
    // Обрезаем текст
    cropText(text, maxLength) {
      if (text === "" || maxLength === "none" || text.length <= maxLength) return text;
      return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
    },
    // Свернуть / развернуть текст
    toggleTextBrief() {
      this.isTextBriefЕxpand = !this.isTextBriefЕxpand;
    },
    // Сочитать количество лайков / дизлайков
    calculateVoteCount(comment, voteValue) {
      let isLike, isDislike, like, dislike;
      voteValue = +voteValue;
      isLike = voteValue == 1;
      isDislike = voteValue == -1;
      if (!comment.voteValue && voteValue) {
        like = isLike ? comment.like + 1 : comment.like;
        dislike = isDislike ? comment.dislike + 1 : comment.dislike;
      } else if (comment.voteValue == 1) {
        like = comment.like - 1;
        dislike = isDislike ? comment.dislike + 1 : comment.dislike;
      } else if (comment.voteValue == -1) {
        like = isLike ? comment.like + 1 : comment.like;
        dislike = comment.dislike - 1;
      }
      return {
        like,
        dislike,
        voteValue
      };
    },
    // Отправка лайка на сервер
    sendVote(voteValue, comment) {
      if (this.isVoteSending) return;
      this.error = "";
      let sourceType = "btn-vote";
      if (this.options.user.auth) {
        this.isVoteSending = true;
        let {
          url,
          params,
          send,
          typeData
        } = this.options.dataApi.vote;
        let data = this.preparationRequestData({
          data: {
            commentId: comment.id,
            voteValue
          },
          url,
          params,
          typeData
        });
        send({
          url: data.url,
          params: data.params
        }).then(({
          voteValue
        }) => {
          try {
            let voteData = this.calculateVoteCount(comment, voteValue);
            Object.assign(voteData, {
              parentId: comment.parentId,
              id: comment.id
            });
            comment = this.addCommentVote(voteData);
          } catch (error) {
            this.error = this.options.translation.errorUnexpected;
            console.error(error);
          }
        }).catch(error => {
          this.error = this.options.translation.errorVoteSend;
          console.error(error);
        }).finally(() => {
          this.emitMessage({
            type: "vote",
            component: this,
            sourceType,
            сurentItem: comment,
            error: this.error
          });
          this.isVoteSending = false;
        });
      } else {
        this.emitMessage({
          type: "user-no-auth",
          component: this,
          sourceType,
          сurentItem: comment
        });
      }
    },
    // Удалить комментарий
    deleteMessage(comment) {
      if (!comment.isManageDelete && this.isDeleteSending) return;
      this.isDeleteSending = true;
      this.error = "";
      let {
        url,
        params,
        send,
        typeData
      } = this.options.dataApi.commentDelete;
      let data = this.preparationRequestData({
        data: {
          commentId: comment.id
        },
        url,
        params,
        typeData
      });
      send({
        url: data.url,
        params: data.params
      }).then(() => {
        this.toggleSettings();
        try {
          this.deleteCommentToList({
            commentId: comment.id,
            parentId: comment.parentId
          });
        } catch (error) {
          this.error = this.options.translation.errorUnexpected;
          console.error(error);
        }
      }).catch(error => {
        this.error = this.options.translation.errorFormSend || error;
        console.error(error);
      }).finally(() => {
        this.emitMessage({
          type: "comment-delete",
          component: this,
          sourceType: "form",
          сurentItem: comment,
          error: this.error
        });
        this.isDeleteSending = false;
      });
    },
    // Листть слайдер
    leafSlide(direction) {
      // next
      if (direction === 1) {
        if (this.files.length - 1 > this.slideNum) {
          this.slideNum = this.slideNum + 1;
        } else {
          this.slideNum = 0;
        }
      }
      // prev
      if (direction === -1) {
        if (this.slideNum - 1 >= 0) {
          this.slideNum = this.slideNum - 1;
        } else {
          this.slideNum = this.files.length - 1;
        }
      }
    },
    // Открыть / Закрыть галлерею
    toggleGallery(isOpenGallery = !this.isOpenGallery) {
      this.isOpenGallery = isOpenGallery;
      this.toggleScroll(isOpenGallery);
    },
    // Блокировать / разблокировать скролл
    toggleScroll(isLock) {
      let overflow = "auto";
      if (isLock) {
        overflow = "hidden";
      }
      document.querySelector("body").style.overflow = overflow;
    },
    // Форматировать дату
    formatDate(commentTimestamp) {
      let {
        translation
      } = this.options;
      let commentMs = commentTimestamp * 1000;
      const dayMs = 86400000;
      let commentDate = new Date(commentMs);
      let curentMs = Date.now();
      let year = commentDate.getYear();
      let month = commentDate.getMonth() + 1;
      let day = commentDate.getDate();
      let commentHours = commentDate.getHours();
      let commentMinutes = commentDate.getMinutes();
      let curentHours = new Date(curentMs).getHours();
      let strTime = `${("0" + commentHours).slice(-2)}:${("0" + commentMinutes).slice(-2)}`;
      let strDate = `${("0" + day).slice(-2)}.${("0" + month).slice(-2)}.${("0" + year).slice(-2)}`;
      if (curentMs - commentMs < dayMs) {
        // Сегодня | Вчера
        if (curentHours >= commentHours) {
          return `${translation.dateToday} ${strTime}`;
        } else {
          return `${translation.dateYesterday} ${strTime}`;
        }
      } else if (curentMs - commentMs < dayMs * 2) {
        // Вчера | позавчера
        if (curentHours >= commentHours) {
          return `${translation.dateYesterday} ${strTime}`;
        } else {
          return strDate;
        }
      } else {
        // Раньше
        return strDate;
      }
    },
    // Список настроек: показать / скрыть
    toggleSettings(isShowSettings = !this.isShowSettings) {
      this.isShowSettings = isShowSettings;
    },
    // Переключить форму в режим для редактирования комментраия
    toggleEdited(isEdited = !this.isEdited) {
      this.isEdited = isEdited;
      this.$nextTick(() => {
        this.checkIsShowBntTextMore();
      });
    },
    // Показать / скрыть форму для добавления вопрса
    toggleForm(isFormShow = !this.isFormShow) {
      if (this.options.user.auth) {
        this.isFormShow = isFormShow;
        // При скрытии формы
        if (!isFormShow) {
          // Нужно потому что на "settings" срабатывает "click" и "mouseleave"
          this.toggleSettings(false);
          if (this.isEdited) {
            this.init();
          }
          this.toggleEdited(false);
        }
      } else {
        this.emitMessage({
          type: "user-no-auth",
          component: this,
          sourceType: "btn-toggle-form"
        });
      }
    },
    // Отменить редактирование
    cancelEditing() {
      this.toggleForm();
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/comments/comments-item.vue?vue&type=script&lang=js

/* harmony default export */ var comments_itemvue_type_script_lang_js = (comments_item);
// CONCATENATED MODULE: ./src/components/comments/comments-item.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/comments/comments-item.vue?vue&type=style&index=0&id=1e58f3af&lang=sass
var comments_itemvue_type_style_index_0_id_1e58f3af_lang_sass = __webpack_require__("59ad");

// CONCATENATED MODULE: ./src/components/comments/comments-item.vue







const comments_item_exports_ = /*#__PURE__*/exportHelper_default()(comments_itemvue_type_script_lang_js, [['render',comments_itemvue_type_template_id_1e58f3af_lang_pug_render]])

/* harmony default export */ var comments_comments_item = (comments_item_exports_);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/comments/comments-svg-icons.vue?vue&type=template&id=0c4273c9

const comments_svg_iconsvue_type_template_id_0c4273c9_hoisted_1 = {
  xmlns: "http://www.w3.org/2000/svg"
};
const comments_svg_iconsvue_type_template_id_0c4273c9_hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createStaticVNode"])("<symbol id=\"vue-comments-symbol-icon-image\" viewBox=\"0 0 512 512\"><path fill=\"inherit\" d=\"M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-send\" viewBox=\"0 0 512 512\"><path fill=\"inherit\" d=\"M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-smile\" viewBox=\"0 0 496 512\"><path fill=\"inherit\" d=\"M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-arrow-left\" viewBox=\"0 0 320 512\"><path fill=\"inherit\" d=\"M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-arrow-right\" viewBox=\"0 0 320 512\"><path fill=\"inherit\" d=\"M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-file\" viewBox=\"0 0 384 512\"><path fill=\"inherit\" d=\"M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-closed\" viewBox=\"0 0 352 512\"><path fill=\"inherit\" d=\"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-download\" viewBox=\"0 0 512 512\"><path fill=\"inherit\" d=\"M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-dislike\" viewBox=\"0 0 512 512\"><path fill=\"inherit\" d=\"M0 56v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H24C10.745 32 0 42.745 0 56zm40 200c0-13.255 10.745-24 24-24s24 10.745 24 24-10.745 24-24 24-24-10.745-24-24zm272 256c-20.183 0-29.485-39.293-33.931-57.795-5.206-21.666-10.589-44.07-25.393-58.902-32.469-32.524-49.503-73.967-89.117-113.111a11.98 11.98 0 0 1-3.558-8.521V59.901c0-6.541 5.243-11.878 11.783-11.998 15.831-.29 36.694-9.079 52.651-16.178C256.189 17.598 295.709.017 343.995 0h2.844c42.777 0 93.363.413 113.774 29.737 8.392 12.057 10.446 27.034 6.148 44.632 16.312 17.053 25.063 48.863 16.382 74.757 17.544 23.432 19.143 56.132 9.308 79.469l.11.11c11.893 11.949 19.523 31.259 19.439 49.197-.156 30.352-26.157 58.098-59.553 58.098H350.723C358.03 364.34 384 388.132 384 430.548 384 504 336 512 312 512z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-like\" viewBox=\"0 0 512 512\"><path fill=\"inherit\" d=\"M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-settings\" viewBox=\"0 0 512 512\"><path fill=\"inherit\" d=\"M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-edit\" viewBox=\"0 0 512 512\"><path fill=\"inherit\" d=\"M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-delete\" viewBox=\"0 0 448 512\"><path fill=\"inherit\" d=\"M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z\"></path></symbol><symbol id=\"vue-comments-symbol-icon-share\" viewBox=\"0 0 512 512\"><path fill=\"inherit\" d=\"M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z\"></path></symbol>", 14);
const comments_svg_iconsvue_type_template_id_0c4273c9_hoisted_16 = [comments_svg_iconsvue_type_template_id_0c4273c9_hoisted_2];
function comments_svg_iconsvue_type_template_id_0c4273c9_render(_ctx, _cache) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("svg", comments_svg_iconsvue_type_template_id_0c4273c9_hoisted_1, comments_svg_iconsvue_type_template_id_0c4273c9_hoisted_16);
}
// CONCATENATED MODULE: ./src/components/comments/comments-svg-icons.vue?vue&type=template&id=0c4273c9

// CONCATENATED MODULE: ./src/components/comments/comments-svg-icons.vue

const script = {}


const comments_svg_icons_exports_ = /*#__PURE__*/exportHelper_default()(script, [['render',comments_svg_iconsvue_type_template_id_0c4273c9_render]])

/* harmony default export */ var comments_svg_icons = (comments_svg_icons_exports_);
// EXTERNAL MODULE: ./src/components/comments/img/default-user.png
var default_user = __webpack_require__("8d00");
var default_user_default = /*#__PURE__*/__webpack_require__.n(default_user);

// EXTERNAL MODULE: ./src/components/comments/data/img-extensions.json
var img_extensions = __webpack_require__("a5f4");

// EXTERNAL MODULE: ./src/components/comments/data/emoji.json
var emoji = __webpack_require__("dd54");

// EXTERNAL MODULE: ./node_modules/is-touch-device/build/index.js
var build = __webpack_require__("2d30");
var build_default = /*#__PURE__*/__webpack_require__.n(build);

// EXTERNAL MODULE: ./node_modules/lodash.debounce/index.js
var lodash_debounce = __webpack_require__("f7fe");
var lodash_debounce_default = /*#__PURE__*/__webpack_require__.n(lodash_debounce);

// CONCATENATED MODULE: ./src/components/comments/comments.js









/* harmony default export */ var comments = ({
  name: "Comments",
  components: {
    CommentsItem: comments_comments_item,
    CommentsForm: comments_comments_form,
    CommentsSvgIcons: comments_svg_icons
  },
  provide() {
    return {
      addCommentToList: this.addCommentToList,
      editCommentToList: this.editCommentToList,
      deleteCommentToList: this.deleteCommentToList,
      preparationRequestData: this.preparationRequestData,
      emitMessage: this.emitMessage,
      addCommentVote: this.addCommentVote,
      options: this.optionsInit,
      createListCommentsShow: this.createListCommentsShow,
      showComments: this.showComments,
      setMapItemLinkComponent: this.setMapItemLinkComponent,
      scrollToComment: this.scrollToComment,
      toggleEmojiList: this.toggleEmojiList,
      addEmoji: this.addEmoji
    };
  },
  props: {
    // Список комментариев
    commentsData: {
      type: Object,
      default() {
        return {};
      }
    },
    // Индивидуальные настройки
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      // Смайлики
      emojiList: {
        isShow: false,
        top: 0,
        left: 0
      },
      // Указывает на то что изменились размеры документа
      widthResizeWindow: 0,
      // Указывает на то что пользователь ведет пальцем по документу
      isTouchmovieDocument: false,
      // Указывает на то что документ скролится - для блокироки случайных нажатий на мобильном
      isScrollDocument: false,
      // Контекст текущей формы - для того чтобы добавлять смайлы
      contextCommentsForm: null,
      // Кординаты нажатия правой клавиши мыши в компоненте
      mousedownCord: {
        pageX: 0,
        pageY: 0
      },
      // Указывает на наличие горизонтального скрола
      isHorizontalScroll: false,
      optionsInit: {
        // Кастомный css класс
        yourCssClass: "",
        // Нндификатор первого предка в "mapItems" - с которого начнёт строится список
        parentIdStart: 0,
        // Максимальное количество файлов
        filesMaxCount: Infinity,
        // Максимальный размер файла
        fileMaxSize: 2097152,
        // Допустимые расшырения файлов - передвать как массив
        validExtensions: {
          default: ["jpg", "png", "jpeg", "jpeg", "gif", "svg", "wbpp"],
          items: {},
          str: ""
        },
        // Расшырения рактинок (нужны для превью чтобы понимать где картинка, а где файл)
        imgExtensions: img_extensions,
        // emoji
        emojiLilst: emoji,
        // Проскролить к добавленному комментарию
        isScrollToComment: true,
        // Показывать кнопки для голосования
        isShowVote: true,
        // Показывать кнопку для загрузки файлов
        isShowBtnUpload: true,
        // Показывать кнопку списка emoji
        isShowBtnEmoji: true,
        text: {
          // Минимальная длина текста *
          minLength: 0,
          // Максимальная длина текста *
          maxLength: 1000,
          // Длина текста после которой добавляется кнопка "Еще"
          briefMaxLength: 150,
          // Максимальное количество переносов строк которых добавляется кнопка "Еще". Значения "none" и "число больше 0"
          briefMaxLine: 4
        },
        list: {
          // Кочичество комментриев в главном списка до появления "Показать еще"
          mainShowStart: 5,
          // Кочичество комментриев во вложенном списке до появления "Показать еще"
          secondShowStart: 1,
          // Количество items которые будут показаны после нажатия на "Показать еще", если Infinity то будут отображены все доступные
          mainShow: 5,
          secondShow: 3
        },
        translation: {
          // Кнопка ответить
          btnAnswer: "Answer",
          // Кнопка развернуть текст
          btnЕxpand: "More",
          // Кнопка свернуть текст
          btnCollapse: "Collapse",
          // Кнопка скачать файл
          btnFileDownload: "Download",
          // Плейсхолдер формы
          formPlaceholder: "Add a comment",
          // Удалить файл
          fileDelete: "Delete",
          // Востановить файл
          fileRestore: "Restore",
          // Текст сегодняшней даты "Сегодня"
          dateToday: "Today",
          // Текст вчерашней даты "Вчера"
          dateYesterday: "Yesterday",
          // Текст настройки удалить
          settingsDelete: "Delete",
          // Текст настройки редактировать
          settingsEdit: "Edit",
          // Текст перед датой редактирования
          dateEditedText: "Edited:",
          // Кнопка отменть редактирование
          btnСancelEditing: "Сancel editing",
          // Кнопка показать больше
          btnMore: "Show more",
          // Кнопка показать ответы
          btnMoreAnswers: "Show answers",
          // Фраза в форме при ответе на комментарий
          formAnswerTo: "Answer to",
          // Сообщение о максимальном размере файлв и поддержываемых расшырениях
          messageFileParams: "Maximum file size 2 Mb, supported extentions: jpg, png, jpeg, jpeg, gif, svg, wbpp",
          // Ошибки
          errorVoteSend: "Error sending vote",
          errorFormSend: "Error form send",
          errorUnexpected: "Unexpected error",
          errorGetComments: "Error get comments",
          errorFileExtension: "Error file extension",
          errorFileSize: "Error file size",
          errorFileMaxCount: "Error file limit exceeded",
          errorTextLength: "The length of the text must be between 0 and 1000 characters"
        },
        dataApi: {
          // Лайки
          vote: {
            send: ({
              url,
              params
            }) => {
              return fetch(url, params).then(response => {
                if (!response.ok) {
                  return response.json().then(error => {
                    throw error === null || error === void 0 ? void 0 : error.error;
                  });
                }
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "POST"
            },
            // Тип передаваемых данных по умолчанию "form-data", может быть "json" или параметрами запроса "query"
            typeData: ""
          },
          // Получить комментрарии
          commentsListGet: {
            send: ({
              url,
              params
            }) => {
              return fetch(url, params).then(response => {
                if (!response.ok) {
                  return response.json().then(error => {
                    throw error === null || error === void 0 ? void 0 : error.error;
                  });
                }
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "GET"
            },
            typeData: "query"
          },
          // Добавить комментрарий
          commentAdd: {
            send: ({
              url,
              params
            }) => {
              return fetch(url, params).then(response => {
                if (!response.ok) {
                  return response.json().then(error => {
                    throw error === null || error === void 0 ? void 0 : error.error;
                  });
                }
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "POST"
            },
            typeData: ""
          },
          // Редактировать комментрарий
          commentEdit: {
            send: ({
              url,
              params
            }) => {
              return fetch(url, params).then(response => {
                if (!response.ok) {
                  return response.json().then(error => {
                    throw error === null || error === void 0 ? void 0 : error.error;
                  });
                }
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "PUT"
            },
            typeData: ""
          },
          // Редактировать комментрарий
          commentDelete: {
            send: ({
              url,
              params
            }) => {
              return fetch(url, params).then(response => {
                if (!response.ok) {
                  return response.json().then(error => {
                    throw error === null || error === void 0 ? void 0 : error.error;
                  });
                }
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "DELETE"
            },
            typeData: ""
          }
        },
        user: {
          // Имя пользователя по умолчанию
          name: "User Name",
          // Аватарка по умолчанию
          img: default_user_default.a,
          // Позволяет писать комментарии если "true" (указывает на то что пользователь авторизован)
          auth: false
        },
        // Отображать главную форму добаления комменрарие - если пользователь не авторизован
        formAddShowAlways: true,
        // Отображать кнопку "Ответить" - если пользователь не авторизован
        btnAnswerShowAlways: true,
        // Аватар по умолчанию
        imgDefaultUser: default_user_default.a,
        // Действие преред удалением комментария - после вызова resolve(), комментарий будет удалён
        deleteCommentBefore: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        },
        // Действие после удаления комментария - после вызова resolve(), будет совершено действие
        deleteCommentAfter: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        }
      },
      // Список комментариев (чтобы можно было мутировать)
      comments: {},
      // Структура описывающая вложенность и отношение комментариев
      mapItems: {},
      // Слушатели
      listeners: {},
      // Комментарии этого пользователя в данной сессии (может понадобится чтобы их отфильтровал бекенд)
      newCommentsIds: {}
    };
  },
  mounted() {
    // Скрываем смайлы при клике по другому элементу
    this.listeners["touchstart"] = event => {
      if (!event.target.closest("[data-vue-comments-form-emoji-btn]") && !event.target.closest("[data-vue-comments-emoji-list]")) {
        this.emojiList.isShow = false;
      }
    };

    // Событие указывает на то что пользователь не скролит документ
    this.listeners["touchend"] = () => {
      if (build_default()()) {
        this.isScrollDocument = false;
        this.isTouchmovieDocument = false;
      }
    };
    this.listeners["touchcancel"] = () => {
      if (build_default()()) {
        this.isScrollDocument = false;
        this.isTouchmovieDocument = false;
      }
    };

    // Указывает на то что пользователь ведет пальцем по документу (нужно для определения причины скрола)
    this.listeners["touchmove"] = event => {
      this.isTouchmovieDocument = true;
    };

    // Блокируем случайные нажатия при скроле (например чтобы юзер случайно не поставил лайк)
    this.listeners["scroll"] = event => {
      if (build_default()() && this.isTouchmovieDocument) {
        this.isScrollDocument = true;
      }
      this.toggleEmojiList(null, event, false);
    };

    // Проверяем документ на изменение размеров
    this.listeners["resize"] = lodash_debounce_default()(() => {
      this.widthResizeWindow = window.innerWidth;
    }, 500);
    document.addEventListener("touchstart", this.listeners["touchstart"]);
    document.addEventListener("touchend", this.listeners["touchend"]);
    document.addEventListener("touchcancel", this.listeners["touchcancel"]);
    document.addEventListener("touchmove", this.listeners["touchmove"]);
    document.addEventListener("scroll", this.listeners["scroll"]);
    window.addEventListener("resize", this.listeners["resize"]);
    document.addEventListener("mouseup", this.setMousedownCord);
  },
  beforeUnmount() {
    document.removeEventListener("touchstart", this.listeners["touchstart"]);
    document.removeEventListener("touchend", this.listeners["touchcancel"]);
    document.removeEventListener("touchcancel", this.listeners["touchcancel"]);
    document.removeEventListener("touchmove", this.listeners["touchmove"]);
    document.removeEventListener("scroll", this.listeners["scroll"]);
    window.removeEventListener("resize", this.listeners["resize"]);
    document.removeEventListener("mouseup", this.setMousedownCord);
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler() {
        this.initOptions(this.options);
      }
    },
    // Должен стоять 2-м - чтобы стачала обработались options
    commentsData: {
      immediate: true,
      handler() {
        this.initData(this.commentsData);
      }
    }
  },
  methods: {
    // Инициализация данных
    initData(commentsData) {
      let {
        items = {},
        mapItems = {}
      } = commentsData;
      this.comments = {
        ...items
      };
      if (!mapItems[this.optionsInit.parentIdStart]) {
        mapItems[this.optionsInit.parentIdStart] = {
          quantity: 0,
          items: []
        };
      }
      this.setMapItems(mapItems, "after");
    },
    // Инициализация опций
    initOptions(options) {
      // Создать объект с допустимыми расшырениями
      let createValidExtensions = () => {
        let {
          validExtensions
        } = options;
        let itemsValidExtensions = {};
        validExtensions = validExtensions || this.optionsInit.validExtensions.default;
        for (let item of validExtensions) {
          itemsValidExtensions[item] = item;
        }
        return {
          items: itemsValidExtensions,
          str: validExtensions.length ? "." + validExtensions.join(",.") : ""
        };
      };

      // Object.assign - заменяет вложенные объекты
      let deepExtend = (optionsInit, options) => {
        for (let item in options) {
          let cur = options[item];
          if (typeof cur === "object" && cur !== null && !Array.isArray(cur)) {
            deepExtend(optionsInit[item], options[item]);
          } else if (options[item] !== undefined) {
            optionsInit[item] = options[item];
          }
        }
      };
      deepExtend(this.optionsInit, options);

      // Если пользователь разлогинился, или если пользователь авторизован но нет аватара - ставим дефолтный аватар
      if (options.user && (!options.user.auth || options.user.auth && !options.user.img)) {
        this.optionsInit.user.img = this.optionsInit.imgDefaultUser;
      }
      Object.assign(this.optionsInit.validExtensions, createValidExtensions());
    },
    // Добавить пункты в карту
    setMapItems(mapItems, insertTo, checkUnique = false) {
      let isNewList = false;
      for (let parentId in mapItems) {
        if (!(parentId in this.mapItems)) {
          isNewList = true;
          this.mapItems[parentId] = {
            // Выполняется запрос на сервер
            isProcessing: false,
            // Количество потомков
            quantity: mapItems[parentId].quantity,
            // id потомков
            items: [],
            // id комментария в котором отображается кнопка "Показать больше"
            btnMoreNext: null,
            // Количество отображённых потомков
            qShowBalance: 0,
            qShowNext: 0,
            // id отображённых потомков
            show: {},
            // id удалённых потомков (нужно при нажатии на кнопку показать больше)
            delete: [],
            // Указывает на то что этот комментарий удалён
            isDelete: false
          };
        }
        // Проверка нужна потому что в списке может присутсвовать комментрарий, который был добавлен пользоветелем только что (связано с особенностью выборки на backend)
        if (checkUnique) {
          let uniqueMap = [];
          for (let item of mapItems[parentId].items) {
            if (!this.mapItems[item]) {
              uniqueMap.push(item);
            }
          }
          mapItems[parentId].items = uniqueMap;
        }

        // Устанавливаем количество
        if (mapItems[parentId].quantity) {
          this.mapItems[parentId].quantity = mapItems[parentId].quantity;
        }
        if (insertTo == "before") {
          this.mapItems[parentId].items = [...mapItems[parentId].items, ...this.mapItems[parentId].items];
          this.setMapItemsBefore({
            quantityShow: mapItems[parentId].items.length,
            parentId
          });
        } else if (insertTo == "after") {
          this.mapItems[parentId].items = [...this.mapItems[parentId].items, ...mapItems[parentId].items];
          let quantityShow = this.calcItemsShow({
            isNewList,
            parentId
          });
          this.setMapItemsAfter({
            quantityShow,
            parentId
          });
        }
      }
    },
    // Показать нижние комментарии
    setMapItemsAfter({
      quantityShow,
      parentId
    }) {
      let idShow = this.mapItems[parentId].btnMoreNext;
      // Показать конкретный комментарий
      for (let i = quantityShow.current; quantityShow.next > i; i++) {
        let item = this.mapItems[this.mapItems[parentId].items[i]];
        this.mapItems[parentId].show[this.mapItems[parentId].items[i]] = true;
        // Чтобы кнопка не стала после комментария который только что добален
        if (!(item && item.isNew)) {
          idShow = this.mapItems[parentId].items[i];
        }
      }
      // Показать кнопку
      this.mapItems[parentId].btnMoreNext = idShow;
      this.mapItems[parentId].qShowNext = quantityShow.next;
      this.mapItems[parentId].qShowBalance = this.mapItems[parentId].quantity - quantityShow.next;
    },
    // Показать верхние комментарии
    setMapItemsBefore({
      quantityShow,
      parentId
    }) {
      // Показать конкретный комментарий
      for (let i = 0; quantityShow > i; i++) {
        let idShow = this.mapItems[parentId].items[i];
        this.mapItems[parentId].show[idShow] = true;
      }
      this.mapItems[parentId].qShowNext = this.mapItems[parentId].qShowNext + quantityShow;
      this.mapItems[parentId].qShowBalance = this.mapItems[parentId].quantity - this.mapItems[parentId].qShowNext;
    },
    // Добавить ссылку на компонент для MapItem
    setMapItemLinkComponent(commentId, component) {
      this.mapItems[commentId].component = component;
    },
    // Определяем количество элементов которые нужно отобразить
    calcItemsShow({
      isNewList = false,
      parentId
    }) {
      let shiftQShowNext;
      let {
        qShowNext
      } = this.mapItems[parentId];
      let {
        mainShowStart,
        secondShowStart,
        mainShow,
        secondShow
      } = this.optionsInit.list;
      if (isNewList) {
        let shift = this.optionsInit.parentIdStart == parentId ? mainShowStart : secondShowStart;
        shiftQShowNext = this.mapItems[parentId].quantity >= shift ? shift : shift - (shift - this.mapItems[parentId].quantity);
      } else {
        let step = this.optionsInit.parentIdStart == parentId ? mainShow : secondShow;
        let stepMax = qShowNext + step;
        shiftQShowNext = this.mapItems[parentId].quantity >= stepMax ? stepMax : stepMax - (stepMax - this.mapItems[parentId].quantity);
      }

      // Для вложенных комментариев id которых еще нет (3-й уровень вложенности в запросе)

      if (!this.mapItems[parentId].items.length) {
        qShowNext = 0;
        shiftQShowNext = 0;
      }
      return {
        current: qShowNext,
        next: shiftQShowNext
      };
    },
    // Подгрузить комментарии
    async getComments({
      parentId,
      firstId,
      lastId,
      insertTo
    }) {
      let {
        url,
        params,
        send,
        typeData
      } = this.optionsInit.dataApi.commentsListGet;
      let data = this.preparationRequestData({
        data: {
          parentId,
          firstId,
          lastId,
          insertTo,
          newCommentsIds: this.newCommentsIds[parentId] ? this.newCommentsIds[parentId].join(",") : ""
        },
        url,
        params,
        typeData
      });
      let response = await send({
        url: data.url,
        params: data.params
      });
      return response;
    },
    // Показать комментарии
    async showComments({
      parentId,
      insertTo
    }) {
      let currentState = this.mapItems[parentId];
      let itemsLength = currentState.items.length;
      let firstId = 0;
      let lastId = 0;
      let newIds = [];
      if (currentState.isProcessing) return;
      currentState.isProcessing = true;
      let quantityShow = this.calcItemsShow({
        isNewList: !currentState,
        parentId,
        mapItems: this.mapItems
      });
      // Если загруженных комментариев недостатчно, делаем запрос на бекенд
      // itemsLength == 0 && currentState.quantity > 0 - это для глубоко вложенных - для которых нет id
      if (quantityShow.next > itemsLength || itemsLength == 0 && currentState.quantity > 0) {
        // Последний или первый id
        if (itemsLength > 0) {
          firstId = currentState.items[0];
          for (let i = itemsLength - 1; i > 0; i--) {
            let id = currentState.items[i];
            if (!this.mapItems[id].isNew && !lastId) {
              lastId = id;
              break;
            } else {
              newIds.push(id);
            }
          }
        }
        let {
          mapItems,
          items
        } = await this.getComments({
          firstId,
          lastId,
          parentId,
          insertTo
        });
        try {
          // Учитывает удалённые комментарии
          mapItems[parentId].quantity = mapItems[parentId].quantity + this.mapItems[parentId].delete.length;
          // Параметр "true" указывает что нужно будет проверять сущетвует ли уже такой комментрарий
          this.setMapItems(mapItems, insertTo, true);
          this.addCommentsListToList(items);
        } catch (error) {
          this.error = this.optionsInit.translation.errorGetComments;
          console.error(error);
        }
      } else {
        this.setMapItemsAfter({
          quantityShow,
          parentId
        });
      }
      this.emitMessage({
        type: "comments-show",
        component: this,
        sourceType: "btn-more",
        сurentItem: currentState,
        error: this.error
      });
      currentState.isProcessing = false;
    },
    // Добавить cписок комментариев (которые получены с бекенда) в общий список
    addCommentsListToList(items) {
      Object.assign(this.comments, items);
    },
    // Добавить новый коментарий (который написал этот пользователь) в общий список
    addCommentToList(comment, insertTo) {
      // Создаём для данного комментария mapItems
      this.setMapItems({
        [comment.id]: {
          items: [],
          quantity: 0
        }
      }, insertTo);
      // isNew не будет использоватся в качестве lastId
      this.mapItems[comment.id].isNew = true;
      // Добавляем его в mapItems предка
      let mapItems = {
        [comment.parentId]: {
          items: [comment.id],
          quantity: this.mapItems[comment.parentId].quantity + 1
        }
      };
      this.setMapItems(mapItems, insertTo);
      Object.assign(this.comments, {
        [comment.id]: comment
      });
      this.mapItems[comment.parentId].show[comment.id] = true;
      // Скролим к добавленному комментарию
      if (insertTo == "after" && this.optionsInit.isScrollToComment) {
        this.$nextTick(() => {
          this.scrollToComment(comment.id);
        });
      }
      // ID комментариев которые добавил этот пользователь
      if (!this.newCommentsIds[comment.parentId]) {
        this.newCommentsIds[comment.parentId] = [];
      }
      this.newCommentsIds[comment.parentId].push(comment.id);
      return comment;
    },
    // Редактировать комментарий
    editCommentToList(response) {
      Object.assign(this.comments[response.id], response);
      return this.comments[response.id];
    },
    // Удалить комментарий
    async deleteCommentToList({
      commentId,
      parentId
    }) {
      await this.optionsInit.deleteCommentBefore();
      this.mapItems[commentId].isDelete = true;
      this.mapItems[parentId].delete.push(commentId);
      await this.optionsInit.deleteCommentAfter();
    },
    // Скролим к комментарию
    scrollToComment(commentId) {
      let element = this.mapItems[commentId].component.$el;
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    },
    // Добавить / убрать лайк
    addCommentVote(voteData) {
      Object.assign(this.comments[voteData.id], voteData);
      return this.comments[voteData.id];
    },
    // Подготовить данные для отправки
    preparationRequestData({
      data = {},
      url,
      params = {},
      typeData
    }) {
      switch (typeData) {
        case "json":
          {
            params.body = JSON.stringify(data);
            break;
          }
        case "query":
          {
            let queryParams = Object.keys(data).map(key => key + "=" + data[key]).join("&");
            url = `${url}${url.indexOf("?") + 1 ? "&" : "?"}${queryParams}`;
          }
          break;
        default:
          {
            let formData = new FormData();
            for (let item in data) {
              if (item === "files") {
                for (let itemAttach of data[item]) {
                  formData.append("file", itemAttach);
                }
              } else {
                formData.append(item, data[item]);
              }
            }
            params.body = formData;
            break;
          }
      }
      return {
        params,
        url
      };
    },
    // Создать событие на компоненте
    emitMessage({
      type = "",
      sourceType = "",
      component = null,
      сurentItem = null,
      error = null
    }) {
      this.$emit("message-comment", {
        сurentItem,
        items: this.comments,
        mapItems: this.mapItems,
        component,
        error,
        type,
        sourceType
      });
    },
    // Показать / Скрыть список Emoji
    // context - нужен для "addEmoji"
    toggleEmojiList(context, event, isShow = !this.emojiList.isShow) {
      // При скроле
      if (event.target === document) {
        this.contextCommentsForm = null;
        this.emojiList.isShow = false;
        return;
      }
      let {
        top,
        left
      } = event.target.getBoundingClientRect();
      if (!build_default()()) {
        switch (event.type) {
          case "mouseleave":
            if (!event.toElement.closest("[data-vue-comments-form-emoji-btn]") && !event.toElement.closest("[data-vue-comments-emoji-list]")) {
              this.contextCommentsForm = context;
              this.emojiList.isShow = isShow;
            }
            break;
          case "mouseenter":
            this.contextCommentsForm = context;
            this.emojiList.isShow = isShow;
            break;
        }
      } else {
        switch (event.type) {
          case "touchend":
            this.contextCommentsForm = context;
            this.emojiList.isShow = isShow;
            break;
        }
      }
      this.emojiList.top = top + 34;
      this.emojiList.left = left - 146;
    },
    // Добаввить Emoji в текстовое поле
    addEmoji(emoji) {
      let {
        text,
        posCursor
      } = this.contextCommentsForm;
      this.contextCommentsForm.text = text.slice(0, posCursor) + emoji + text.slice(posCursor, text.length);
      this.contextCommentsForm.posCursor = posCursor + emoji.length;
    },
    // Установить начальные кординаты клика
    setMousedownCord(event) {
      if (!build_default()()) {
        this.isHorizontalScroll = false;
        switch (event.type) {
          case "mousedown":
            this.mousedownCord = {
              pageX: event.pageX,
              pageY: event.pageY
            };
            break;
          default:
            this.mousedownCord = {
              pageX: 0,
              pageY: 0
            };
            break;
        }
      }
    },
    // Горизонтальный скролл
    setHorizontalScroll(event) {
      let {
        pageX
      } = this.mousedownCord;
      let {
        scrollWidth,
        clientWidth,
        scrollLeft
      } = this.$refs.list;
      let offsetX = event.pageX - pageX;
      let maxOffsetX = scrollWidth - clientWidth;
      if (scrollWidth > clientWidth && pageX && !build_default()()) {
        this.isHorizontalScroll = true;
        if (offsetX < 0) {
          // Скролл в право
          offsetX = event.pageX - pageX < maxOffsetX ? event.pageX - pageX : maxOffsetX;
        } else if (offsetX > 0) {
          // Скролл в лево
          offsetX = Math.abs(event.pageX - pageX) < scrollLeft ? event.pageX - pageX : 0;
        }
        this.$refs.list.scrollTo({
          left: Math.abs(offsetX)
        });
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/components/comments/comments.vue?vue&type=script&lang=js

/* harmony default export */ var commentsvue_type_script_lang_js = (comments);
// CONCATENATED MODULE: ./src/components/comments/comments.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./src/components/comments/comments.vue?vue&type=style&index=0&id=10dfa284&lang=sass
var commentsvue_type_style_index_0_id_10dfa284_lang_sass = __webpack_require__("113c");

// CONCATENATED MODULE: ./src/components/comments/comments.vue







const comments_exports_ = /*#__PURE__*/exportHelper_default()(commentsvue_type_script_lang_js, [['render',render]])

/* harmony default export */ var comments_comments = (comments_exports_);
// CONCATENATED MODULE: ./src/lib.js

/* harmony default export */ var lib = (comments_comments);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (lib);



/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__("04f8");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ });
});
//# sourceMappingURL=vue-comments.umd.js.map