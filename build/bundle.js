/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _defer = __webpack_require__(1);
	
	var _defer2 = _interopRequireDefault(_defer);
	
	var _instanceManager = __webpack_require__(9);
	
	var _instanceManager2 = _interopRequireDefault(_instanceManager);
	
	__webpack_require__(10);
	
	__webpack_require__(13);
	
	__webpack_require__(14);
	
	__webpack_require__(15);
	
	__webpack_require__(44);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var game = _instanceManager2.default.get('game');
	
	game.state.start('play');
	
	(0, _defer2.default)(function () {
		game.canvas.addEventListener('contextmenu', function (e) {
			e.preventDefault();
		});
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var baseDelay = __webpack_require__(2),
	    rest = __webpack_require__(3);
	
	/**
	 * Defers invoking the `func` until the current call stack has cleared. Any
	 * additional arguments are provided to `func` when it's invoked.
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to defer.
	 * @param {...*} [args] The arguments to invoke `func` with.
	 * @returns {number} Returns the timer id.
	 * @example
	 *
	 * _.defer(function(text) {
	 *   console.log(text);
	 * }, 'deferred');
	 * // logs 'deferred' after one or more milliseconds
	 */
	var defer = rest(function(func, args) {
	  return baseDelay(func, 1, args);
	});
	
	module.exports = defer;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * The base implementation of `_.delay` and `_.defer` which accepts an array
	 * of `func` arguments.
	 *
	 * @private
	 * @param {Function} func The function to delay.
	 * @param {number} wait The number of milliseconds to delay invocation.
	 * @param {Object} args The arguments provide to `func`.
	 * @returns {number} Returns the timer id.
	 */
	function baseDelay(func, wait, args) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  return setTimeout(function() { func.apply(undefined, args); }, wait);
	}
	
	module.exports = baseDelay;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(4),
	    toInteger = __webpack_require__(5);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.exports = rest;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} [args] The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args ? args.length : 0;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.exports = apply;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(6);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}
	
	module.exports = toInteger;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(7),
	    isObject = __webpack_require__(8);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `global`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
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
	
	module.exports = toNumber;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isObject = __webpack_require__(8);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
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
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var INSTANCES_KEY = Symbol('instances');
	var RESOURCES_KEY = Symbol('resources');
	
	var InstanceManager = function () {
		function InstanceManager() {
			_classCallCheck(this, InstanceManager);
	
			this[INSTANCES_KEY] = {};
			this[RESOURCES_KEY] = {};
		}
	
		_createClass(InstanceManager, [{
			key: 'get',
			value: function get(resourceName) {
				var resourceInstance = this[INSTANCES_KEY][resourceName];
				var resources = this[RESOURCES_KEY];
	
				if (!resourceInstance) {
					resourceInstance = resources[resourceName].init();
	
					if (resources[resourceName].cache || resources[resourceName].cache === undefined) {
						this[INSTANCES_KEY][resourceName] = resourceInstance;
					}
				}
	
				return resourceInstance;
			}
		}, {
			key: 'reset',
			value: function reset(dependency) {
				this[INSTANCES_KEY][dependency] = this[RESOURCES_KEY][dependency]();
			}
		}, {
			key: 'registerResource',
			value: function registerResource(name, resource) {
				this[RESOURCES_KEY][name] = resource;
			}
		}]);
	
		return InstanceManager;
	}();
	
	exports.default = new InstanceManager();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _config = __webpack_require__(11);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _phaser = __webpack_require__(12);
	
	var _phaser2 = _interopRequireDefault(_phaser);
	
	var _instanceManager = __webpack_require__(9);
	
	var _instanceManager2 = _interopRequireDefault(_instanceManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_instanceManager2.default.registerResource('game', {
		init: function init() {
			return new _phaser2.default.Game(_config2.default.screen.width, _config2.default.screen.height, _phaser2.default.AUTO, 'phaser', undefined, false);
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		controls: {
			panUp: 'W',
			panLeft: 'A',
			panRight: 'D',
			panDown: 'S'
		},
		screen: {
			width: 800,
			height: 600
		},
		stage: {
			width: 1600,
			height: 1200
		}
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = Phaser;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _config = __webpack_require__(11);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _phaser = __webpack_require__(12);
	
	var _phaser2 = _interopRequireDefault(_phaser);
	
	var _instanceManager = __webpack_require__(9);
	
	var _instanceManager2 = _interopRequireDefault(_instanceManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_instanceManager2.default.registerResource('controls', {
		init: function init() {
			var KeyCodes = _phaser2.default.Keyboard;
			var game = _instanceManager2.default.get('game');
			var keyboard = game.input.keyboard;
	
			return {
				panUp: keyboard.addKey(KeyCodes[_config2.default.controls.panUp]),
				panRight: keyboard.addKey(KeyCodes[_config2.default.controls.panRight]),
				panDown: keyboard.addKey(KeyCodes[_config2.default.controls.panDown]),
				panLeft: keyboard.addKey(KeyCodes[_config2.default.controls.panLeft]),
				shiftModifier: keyboard.addKey(KeyCodes[_config2.default.controls.modifier])
			};
		}
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _instanceManager = __webpack_require__(9);
	
	var _instanceManager2 = _interopRequireDefault(_instanceManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_instanceManager2.default.registerResource('group', {
		cache: false,
		init: function init() {
			return _instanceManager2.default.get('game').add.group();
		}
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _instanceManager = __webpack_require__(9);
	
	var _instanceManager2 = _interopRequireDefault(_instanceManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_instanceManager2.default.registerResource('worldEntities', {
		init: function init() {
			//TODO: Remove global debug
			var worldEntities = window.worldEntities = _instanceManager2.default.get('group');
	
			return worldEntities;
		}
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _each = __webpack_require__(17);
	
	var _each2 = _interopRequireDefault(_each);
	
	var _phaser = __webpack_require__(12);
	
	var _phaser2 = _interopRequireDefault(_phaser);
	
	var _instanceManager = __webpack_require__(9);
	
	var _instanceManager2 = _interopRequireDefault(_instanceManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var game = _instanceManager2.default.get('game');
	// const entityManager = instanceManager.get('entity-manager');
	
	exports.default = {
		checkForDoubleClick: false,
		controls: null,
		endPoint: new _phaser2.default.Point(),
		game: _instanceManager2.default.get('game'),
		graphic: null,
		mousePointer: null,
		registerRightClick: false,
		startSelection: false,
		worldEntities: null,
	
		init: function init() {
			this.controls = _instanceManager2.default.get('controls');
			this.mousePointer = game.input.mousePointer;
			this.worldEntities = _instanceManager2.default.get('worldEntities');
	
			this.graphic = this.game.add.graphics(-500, -500);
			this.graphic.alpha = 0.25;
			this.graphic.visible = false;
	
			this.game.input.onUp.add(this.markClick.bind(this));
			this.game.input.onTap.add(this.differentiateClick.bind(this));
			this.game.input.onUp.add(this.dragEnd.bind(this));
			this.game.input.mouse.mouseMoveCallback = this.drag.bind(this);
		},
		update: function update() {
			if (!this.checkForDoubleClick) {
				return;
			}
	
			if (this.mousePointer.msSinceLastClick > game.input.doubleTapRate) {
				this.checkForDoubleClick = false;
				this.leftSingleClick(this.mousePointer.positionUp);
			}
		},
		differentiateClick: function differentiateClick(pointer, isDoubleClick) {
			if (pointer.button === _phaser2.default.Mouse.RIGHT_BUTTON) {
				this.rightClick(game.input.getLocalPosition(this.worldEntities, pointer));
				return;
			}
	
			if (false /* this.uiViewModel.awaitTarget() */) {
					// this.uiViewModel.awaitTarget(false);
					// this.uiViewModel.targetHandler(pointer);
					//
					// //HACK to mark click for general actions
					// this.markClick({
					// 	button: Phaser.Mouse.RIGHT_BUTTON,
					// });
					// this.uiViewModel.targetHandler = null;
				} else if (isDoubleClick) {
					this.checkForDoubleClick = false;
					this.leftDoubleClick(this.mousePointer.positionUp);
				} else {
					this.checkForDoubleClick = true;
				}
		},
		drag: function drag(ev) {
			var dragX;
			var dragY;
			var graphic;
	
			if (game.input.mousePointer.isUp || ev.button !== _phaser2.default.Mouse.LEFT_BUTTON) {
				this.graphic.visible = false;
				return;
			}
	
			graphic = this.graphic;
	
			dragX = this.mousePointer.worldX;
			dragY = this.mousePointer.worldY;
	
			if (!this.startSelection) {
				this.startSelection = true;
				graphic.visible = true;
				graphic.position.set(dragX - 10, dragY - 10);
	
				// TODO: One pass at drawing upon selection start to
				// get correct bounds before the graphics have been rendered
				// DRY up at a later time.
				this.drawDragArea(dragX, dragY);
				return;
			}
	
			this.drawDragArea(dragX, dragY);
	
			// each(entityManager.getEntitiesWithComponent('selectable'), function(entity) {
			// 	var intersects;
			// 	var isSelected = entity.components.selected;
			//
			// 	if(entity.components.team.name === 'player') {
			// 		intersects = graphic.getBounds().intersects(entity.getBounds());
			//
			// 		if(!isSelected && intersects) {
			// 			entity.addComponent('selected');
			// 			selectedEntites.push(entity);
			// 		} else if(isSelected && !intersects) {
			// 			entity.removeComponent('selected');
			// 		}
			// 	}
			// });
	
			graphic.visible = true;
		},
		dragEnd: function dragEnd() {
			this.graphic.visible = false;
			this.startSelection = false;
		},
		drawDragArea: function drawDragArea(dragX, dragY) {
			var graphic = this.graphic;
			graphic.clear();
			graphic.lineStyle(3, 0xFFFF0B);
			graphic.beginFill(0xFFFF0B);
			graphic.drawRect(0, 0, dragX - graphic.position.x, dragY - graphic.position.y);
			graphic.endFill();
		},
		leftDoubleClick: function leftDoubleClick(position) {
			var entities = []; // this.ecs.getEntities('selectable');
			var selectedEntity = this.getTopEntityAt(entities, position);
			var selectedEntityTeam;
			var selectedEntityTeamComponent;
	
			if (!selectedEntity) {
				return;
			}
	
			selectedEntityTeamComponent = selectedEntity.components.team;
			selectedEntityTeam = selectedEntityTeamComponent && selectedEntityTeamComponent.name;
	
			(0, _each2.default)(entities, function (entity) {
				var entityTeamComponent = entity.components.team;
				var team = entityTeamComponent && entityTeamComponent.name;
	
				if (entity.entityType === selectedEntity.entityType && selectedEntityTeam === team && entity.inCamera) {
					entity.addComponent('selected');
				} else {
					entity.removeComponent('selected');
				}
			});
		},
		leftSingleClick: function leftSingleClick(position) {
			var entities = []; //this.ecs.getEntities('selectable');
			var selectedEntity = this.getTopEntityAt(entities, position);
	
			(0, _each2.default)(entities, function (entity) {
				entity.toggleComponent('selected', entity === selectedEntity);
			});
		},
		markClick: function markClick(ev) {
			if (ev.button !== _phaser2.default.Mouse.RIGHT_BUTTON) {
				return;
			}
	
			var marker = this.game.add.sprite(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY, 'waypointMarker');
			var markerAnimationTime = 250;
			var markerTween;
	
			marker.anchor.setTo(0.5, 0.5);
	
			markerTween = this.game.add.tween(marker.scale).to({
				x: 4,
				y: 4
			}, markerAnimationTime);
	
			markerTween.onComplete.add(function () {
				marker.destroy();
			});
	
			this.game.add.tween(marker).to({
				alpha: 0
			}, markerAnimationTime).start();
			markerTween.start();
		},
		rightClick: function rightClick(position) {
			var entities = []; //this.ecs.getEntities('selected');
	
			if (false /* this.uiViewModel.awaitTarget() */) {
					// this.uiViewModel.awaitTarget(false);
	
					(0, _each2.default)(entities, function (entity) {
						entity.removeComponent('selected');
					});
				} else {
				(0, _each2.default)(entities, function (entity) {
					entity.addComponent('issue-order', position);
				});
			}
		},
		getTopEntityAt: function getTopEntityAt(entities, position) {
			var topEntity;
	
			(0, _each2.default)(entities, function (entity) {
				if (entity.components.team.name === 'player' && (!topEntity || topEntity.z < entity.z) && entity.containsPoint(position.x, position.y)) {
					topEntity = entity;
				}
			});
	
			return topEntity;
		}
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(19),
	    baseEach = __webpack_require__(20),
	    isArray = __webpack_require__(36),
	    toFunction = __webpack_require__(41);
	
	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
	 * for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(value) {
	 *   console.log(value);
	 * });
	 * // => logs `1` then `2`
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' then 'b' (iteration order is not guaranteed)
	 */
	function forEach(collection, iteratee) {
	  return (typeof iteratee == 'function' && isArray(collection))
	    ? arrayEach(collection, iteratee)
	    : baseEach(collection, toFunction(iteratee));
	}
	
	module.exports = forEach;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(21),
	    createBaseEach = __webpack_require__(40);
	
	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	module.exports = baseEach;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(22),
	    keys = __webpack_require__(24);
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(23);
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(25),
	    baseKeys = __webpack_require__(26),
	    indexKeys = __webpack_require__(27),
	    isArrayLike = __webpack_require__(31),
	    isIndex = __webpack_require__(38),
	    isPrototype = __webpack_require__(39);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
	}
	
	module.exports = baseHas;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 26 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @type Function
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	module.exports = baseKeys;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(28),
	    isArguments = __webpack_require__(29),
	    isArray = __webpack_require__(36),
	    isLength = __webpack_require__(34),
	    isString = __webpack_require__(37);
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  return (isLength(length) && (isArray(object) || isString(object) || isArguments(object)))
	    ? baseTimes(length, String)
	    : null;
	}
	
	module.exports = indexKeys;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isArrayLikeObject = __webpack_require__(30);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(31),
	    isObjectLike = __webpack_require__(35);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(32),
	    isFunction = __webpack_require__(7),
	    isLength = __webpack_require__(34);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null &&
	    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	}
	
	module.exports = isArrayLike;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(33);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 34 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
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
	
	module.exports = isObjectLike;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var isArray = __webpack_require__(36),
	    isObjectLike = __webpack_require__(35);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.exports = isString;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 38 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.exports = isIndex;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Used for built-in method references. */
	var objectProto = global.Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(31);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(42);
	
	/**
	 * Converts `value` to a function if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Function} Returns the function.
	 */
	function toFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}
	
	module.exports = toFunction;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 43 */,
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _config = __webpack_require__(11);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _instanceManager = __webpack_require__(9);
	
	var _instanceManager2 = _interopRequireDefault(_instanceManager);
	
	var _mouseControls = __webpack_require__(16);
	
	var _mouseControls2 = _interopRequireDefault(_mouseControls);
	
	var _phaser = __webpack_require__(12);
	
	var _phaser2 = _interopRequireDefault(_phaser);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var game = _instanceManager2.default.get('game');
	
	game.state.add('play', {
		preload: function preload(game) {
			game.load.image('battleship', '');
			game.load.image('colony-ship', '');
			game.load.image('fighter', '');
			game.load.image('planet', '');
			game.load.image('probe', '');
	
			game.load.image('selection', '', 50, 50);
			game.load.image('waypointMarker', '', 20, 20);
	
			game.load.image('background1-layer1', '', 512, 512);
			game.load.image('background1-layer2', '', 512, 512);
	
			game.load.audio('move-order', '');
			game.load.audio('lasting-hope', '');
		},
	
		create: function create(game) {
			game.scale.setShowAll();
	
			window.addEventListener('resize', function (e) {
				game.scale.setShowAll();
				game.scale.refresh();
			});
			game.world.setBounds(0, 0, _config2.default.stage.width, _config2.default.stage.height);
			game.scale.refresh();
			// this.ecs = require('ecs/ecs');
	
			// require('components/registry');
			// require('systems/registry');
	
			// this.ecs.runSystemInits();
	
			this.bgm = game.add.audio('lasting-hope');
			this.bgm.loop = true;
			this.bgm.play();
	
			_mouseControls2.default.init();
			this.game.physics.startSystem(_phaser2.default.Physics.ARCADE);
		},
		update: function update() {
			_mouseControls2.default.update();
			// this.ecs.runSystems();
		},
	
		paused: function paused() {}
	});

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map