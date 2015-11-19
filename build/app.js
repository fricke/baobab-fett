(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/decorators.js":[function(require,module,exports){
module.exports = require('./dist-modules/decorators.js');

},{"./dist-modules/decorators.js":"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/dist-modules/decorators.js"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/dist-modules/decorators.js":[function(require,module,exports){
/**
 * Baobab-React Decorators
 * ========================
 *
 * ES7 decorators sugar for higher order components.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.root = root;
exports.branch = branch;

var _higherOrderJs = require('./higher-order.js');

function root(tree) {
  return function (Component) {
    return (0, _higherOrderJs.root)(Component, tree);
  };
}

function branch(specs) {
  return function (Component) {
    return (0, _higherOrderJs.branch)(Component, specs);
  };
}
},{"./higher-order.js":"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/dist-modules/higher-order.js"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/dist-modules/higher-order.js":[function(require,module,exports){
/**
 * Baobab-React Higher Order Component
 * ====================================
 *
 * ES6 higher order component to enchance one's component.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.root = root;
exports.branch = branch;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _baobab = require('baobab');

var _baobab2 = _interopRequireDefault(_baobab);

var _utilsHelpersJs = require('./utils/helpers.js');

var _utilsPropTypesJs = require('./utils/prop-types.js');

var _utilsPropTypesJs2 = _interopRequireDefault(_utilsPropTypesJs);

var makeError = _baobab2['default'].helpers.makeError;

/**
 * Root component
 */

function root(Component, tree) {
  if (!(tree instanceof _baobab2['default'])) throw makeError('baobab-react:higher-order.root: given tree is not a Baobab.', { target: tree });

  var componentDisplayName = Component.name || Component.displayName || 'Component';

  var ComposedComponent = (function (_React$Component) {
    _inherits(ComposedComponent, _React$Component);

    function ComposedComponent() {
      _classCallCheck(this, ComposedComponent);

      _get(Object.getPrototypeOf(ComposedComponent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ComposedComponent, [{
      key: 'getChildContext',

      // Handling child context
      value: function getChildContext() {
        return {
          tree: tree
        };
      }

      // Render shim
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(Component, this.props);
      }
    }], [{
      key: 'displayName',
      value: 'Rooted' + componentDisplayName,
      enumerable: true
    }, {
      key: 'childContextTypes',
      value: {
        tree: _utilsPropTypesJs2['default'].baobab
      },
      enumerable: true
    }]);

    return ComposedComponent;
  })(_react2['default'].Component);

  return ComposedComponent;
}

/**
 * Branch component
 */

function branch(Component) {
  var mapping = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var componentDisplayName = Component.name || Component.displayName || 'Component';

  var ComposedComponent = (function (_React$Component2) {
    _inherits(ComposedComponent, _React$Component2);

    _createClass(ComposedComponent, [{
      key: 'getChildContext',

      // Passing the component's cursors through context
      value: function getChildContext() {
        return this.cursors ? {
          cursors: this.cursors
        } : {};
      }

      // Building initial state
    }], [{
      key: 'displayName',
      value: 'Branched' + componentDisplayName,
      enumerable: true
    }, {
      key: 'contextTypes',
      value: {
        tree: _utilsPropTypesJs2['default'].baobab
      },
      enumerable: true
    }, {
      key: 'childContextTypes',
      value: {
        cursors: _utilsPropTypesJs2['default'].cursors
      },
      enumerable: true
    }]);

    function ComposedComponent(props, context) {
      _classCallCheck(this, ComposedComponent);

      _get(Object.getPrototypeOf(ComposedComponent.prototype), 'constructor', this).call(this, props, context);

      if (mapping.cursors) {
        var solvedMapping = (0, _utilsHelpersJs.solveMapping)(mapping.cursors, props, context);

        if (!solvedMapping) throw makeError('baobab-react:higher-order.branch: given cursors mapping is invalid (check the "' + displayName + '" component).', { mapping: solvedMapping });

        // Creating the watcher
        this.watcher = this.context.tree.watch(solvedMapping);
        this.cursors = this.watcher.getCursors();
        this.state = this.watcher.get();
      }
    }

    // On component mount

    _createClass(ComposedComponent, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (!this.watcher) return;

        var handler = (function () {
          if (this.watcher) this.setState(this.watcher.get());
        }).bind(this);

        this.watcher.on('update', handler);
      }

      // Render shim
    }, {
      key: 'render',
      value: function render() {
        var tree = this.context.tree,
            suppl = {};

        // Binding actions if any
        if (mapping.actions) {
          suppl.actions = {};

          Object.keys(mapping.actions).forEach(function (k) {
            suppl.actions[k] = mapping.actions[k].bind(tree, tree);
          });
        }

        return _react2['default'].createElement(Component, _extends({}, this.props, suppl, this.state));
      }

      // On component unmount
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (!this.watcher) return;

        // Releasing watcher
        this.watcher.release();
        this.watcher = null;
      }

      // On new props
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(props) {
        if (!this.watcher || !mapping.cursors) return;

        var solvedMapping = (0, _utilsHelpersJs.solveMapping)(mapping.cursors, props, this.context);

        if (!solvedMapping) throw makeError('baobab-react:higher-order.branch: given mapping is invalid (check the "' + displayName + '" component).', { mapping: solvedMapping });

        // Refreshing the watcher
        this.watcher.refresh(solvedMapping);
        this.cursors = this.watcher.getCursors();
        this.setState(this.watcher.get());
      }
    }]);

    return ComposedComponent;
  })(_react2['default'].Component);

  return ComposedComponent;
}
},{"./utils/helpers.js":"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/dist-modules/utils/helpers.js","./utils/prop-types.js":"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/dist-modules/utils/prop-types.js","baobab":"baobab","react":"react"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/dist-modules/utils/helpers.js":[function(require,module,exports){
/**
 * Baobab-React Helpers
 * =====================
 *
 * Miscellaneous helper functions.
 */
'use strict';

var type = require('baobab').type;

function solveMapping(mapping, props, context) {
  if (typeof mapping === 'function') mapping = mapping(props, context);

  return mapping;
}

module.exports = {
  solveMapping: solveMapping
};
},{"baobab":"baobab"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/dist-modules/utils/prop-types.js":[function(require,module,exports){
/**
 * Baobab-React Custom Prop Types
 * ===============================
 *
 * PropTypes used to propagate context safely.
 */
'use strict';

var Baobab = require('baobab'),
    Cursor = Baobab.Cursor,
    type = Baobab.type;

function errorMessage(propName, what) {
  return 'prop type `' + propName + '` is invalid; it must be ' + what + '.';
}

var PropTypes = {};

PropTypes.baobab = function (props, propName) {
  if (!(propName in props)) return;

  if (!(props[propName] instanceof Baobab)) return new Error(errorMessage(propName, 'a Baobab tree'));
};

PropTypes.cursors = function (props, propName) {
  if (!(propName in props)) return;

  var cursors = props[propName];

  if (!type.object(cursors) || !Object.keys(cursors).every(function (k) {
    return cursors[k] instanceof Cursor;
  })) return new Error(errorMessage(propName, 'a cursors object'));
};

module.exports = PropTypes;
},{"baobab":"baobab"}],"/Users/cfricke/Workspace/baobab-fett/src/app.js":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

},{"./components/App":"/Users/cfricke/Workspace/baobab-fett/src/components/App.js","react":"react","react-dom":"react-dom"}],"/Users/cfricke/Workspace/baobab-fett/src/components/App.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _baobabReactDecorators = require('baobab-react/decorators');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _TreePanel = require('./TreePanel');

var _TreePanel2 = _interopRequireDefault(_TreePanel);

var App = (function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, _App);

        _get(Object.getPrototypeOf(_App.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(_TreePanel2['default'], null);
        }
    }]);

    var _App = App;
    App = (0, _baobabReactDecorators.root)(_store2['default'])(App) || App;
    return App;
})(_react2['default'].Component);

exports['default'] = App;
module.exports = exports['default'];

},{"../store":"/Users/cfricke/Workspace/baobab-fett/src/store.js","./TreePanel":"/Users/cfricke/Workspace/baobab-fett/src/components/TreePanel.js","baobab-react/decorators":"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/decorators.js","react":"react"}],"/Users/cfricke/Workspace/baobab-fett/src/components/Button.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Button = (function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button() {
        _classCallCheck(this, Button);

        _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Button, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement('button', { onClick: this.props.onClick });
        }
    }]);

    return Button;
})(_react2['default'].Component);

exports['default'] = Button;
module.exports = exports['default'];

},{"react":"react"}],"/Users/cfricke/Workspace/baobab-fett/src/components/TreePanel.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _baobabReactDecorators = require('baobab-react/decorators');

var TreePanel = (function (_React$Component) {
    _inherits(TreePanel, _React$Component);

    function TreePanel() {
        _classCallCheck(this, _TreePanel);

        _get(Object.getPrototypeOf(_TreePanel.prototype), 'constructor', this).apply(this, arguments);
        this.state = {
            showNewButton: false
        };
    }

    _createClass(TreePanel, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'button',
                    null,
                    'ok then'
                ),
                _react2['default'].createElement(
                    _Button2['default'],
                    { onClick: this.tick },
                    'Show me the money!'
                ),
                _react2['default'].createElement(
                    'button',
                    { id: 'executescript' },
                    'Execute script in inspected page'
                ),
                _react2['default'].createElement(
                    'button',
                    { id: 'insertscript' },
                    'Insert script into inspected page'
                ),
                _react2['default'].createElement(
                    'button',
                    { id: 'insertmessagebutton' },
                    'Insert button to send a message from page to devtools'
                )
            );
        }
    }]);

    var _TreePanel = TreePanel;
    TreePanel = (0, _baobabReactDecorators.branch)({
        cursors: {
            source: ['source']
        }
    })(TreePanel) || TreePanel;
    return TreePanel;
})(_react2['default'].Component);

exports['default'] = TreePanel;
module.exports = exports['default'];

},{"./Button":"/Users/cfricke/Workspace/baobab-fett/src/components/Button.js","baobab-react/decorators":"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/decorators.js","react":"react"}],"/Users/cfricke/Workspace/baobab-fett/src/store.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _baobab = require('baobab');

var _baobab2 = _interopRequireDefault(_baobab);

var store = new _baobab2['default']({
    source: {},
    listeners: {}
});

exports['default'] = store;
module.exports = exports['default'];

},{"baobab":"baobab"}]},{},["/Users/cfricke/Workspace/baobab-fett/src/app.js"])


//# sourceMappingURL=app.js.map
