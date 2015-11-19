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
},{"baobab":"baobab"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/json-inspector.js":[function(require,module,exports){
var React = require('react');
var D = React.DOM;

var Leaf = require('./lib/leaf');
var leaf = React.createFactory(Leaf);
var SearchBar = require('./lib/search-bar');
var searchBar = React.createFactory(SearchBar);

var filterer = require('./lib/filterer');
var isEmpty = require('./lib/is-empty');
var lens = require('./lib/lens');
var noop = require('./lib/noop');

module.exports = React.createClass({
    propTypes: {
        data: React.PropTypes.oneOfType([
            React.PropTypes.object.isRequired,
            React.PropTypes.array.isRequired
        ]),
        // For now it expects a factory function, not element.
        search: React.PropTypes.oneOfType([
            React.PropTypes.func,
            React.PropTypes.bool
        ]),
        onClick: React.PropTypes.func,
        validateQuery: React.PropTypes.func,
        isExpanded: React.PropTypes.func,
        filterOptions: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            data: null,
            search: searchBar,
            className: '',
            id: 'json-' + Date.now(),
            onClick: noop,
            filterOptions: {},
            validateQuery: function(query) {
                return query.length >= 2;
            },
            /**
             * Decide whether the leaf node at given `keypath` should be
             * expanded initially.
             * @param  {String} keypath
             * @param  {Any} value
             * @return {Boolean}
             */
            isExpanded: function(keypath, value) {
                return false;
            }
        };
    },
    getInitialState: function() {
        return {
            query: ''
        };
    },
    render: function() {
        var p = this.props;
        var s = this.state;

        var data = s.query ? s.filterer(s.query) : p.data;

        var rootNode = leaf({
            data: data,
            onClick: p.onClick,
            id: p.id,
            getOriginal: this.getOriginal,
            query: s.query,
            label: 'root',
            root: true,
            isExpanded: p.isExpanded,
            interactiveLabel: p.interactiveLabel
        });

        var notFound = D.div({ className: 'json-inspector__not-found' }, 'Nothing found');

        return D.div({ className: 'json-inspector ' + p.className },
            this.renderToolbar(),
            isEmpty(data) ? notFound : rootNode);
    },
    renderToolbar: function() {
        var search = this.props.search;

        if (search) {
            return D.div({ className: 'json-inspector__toolbar' },
                search({ onChange: this.search, data: this.props.data }));
        }
    },
    search: function(query) {
        if (query === '' || this.props.validateQuery(query)) {
            this.setState({
                query: query
            });
        }
    },
    componentDidMount: function() {
        this.createFilterer(this.props.data, this.props.filterOptions);
    },
    componentWillReceiveProps: function(p) {
        this.createFilterer(p.data, p.filterOptions);
    },
    shouldComponentUpdate: function (p, s) {
        return s.query !== this.state.query ||
            p.data !== this.props.data ||
            p.onClick !== this.props.onClick;
    },
    createFilterer: function(data, options) {
        this.setState({
            filterer: filterer(data, options)
        });
    },
    getOriginal: function(path) {
        return lens(this.props.data, path);
    }
});

},{"./lib/filterer":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/filterer.js","./lib/is-empty":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/is-empty.js","./lib/leaf":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/leaf.js","./lib/lens":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/lens.js","./lib/noop":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/noop.js","./lib/search-bar":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/search-bar.js","react":"react"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/filterer.js":[function(require,module,exports){
var assign = require('object-assign');
var keys = Object.keys;

var type = require('./type');
var isEmpty = require('./is-empty');

module.exports = function(data, options) {
    options || (options = {});
    var cache = {};

    return function(query) {
        var subquery;

        if (!cache[query]) {
            for (var i = query.length - 1; i > 0; i -= 1) {
                subquery = query.substr(0, i);

                if (cache[subquery]) {
                    cache[query] = find(cache[subquery], query, options);
                    break;
                }
            }
        }

        if (!cache[query]) {
            cache[query] = find(data, query, options);
        }

        return cache[query];
    };
};

function find(data, query, options) {
    return keys(data).reduce(function(acc, key) {
        var value = data[key];
        var matches;

        if (isPrimitive(value)) {
            if (contains(query, key, options) || contains(query, value, options)) {
                acc[key] = value;
            }
        } else {
            if (contains(query, key, options)) {
                acc[key] = value;
            } else {
                matches = find(value, query, options);

                if (!isEmpty(matches)) {
                    assign(acc, pair(key, matches));
                }
            }
        }

        return acc;
    }, {});
}

function contains(query, string, options) {
    if(options.ignoreCase) {
      query = String(query).toLowerCase();
      return string && String(string).toLowerCase().indexOf(query) !== -1;
    } else {
      return string && String(string).indexOf(query) !== -1;
    }
}

function isPrimitive(value) {
    var t = type(value);
    return t !== 'Object' && t !== 'Array';
}

function pair(key, value) {
    var p = {};
    p[key] = value;
    return p;
}

},{"./is-empty":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/is-empty.js","./type":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/type.js","object-assign":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/node_modules/object-assign/index.js"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/highlighter.js":[function(require,module,exports){
var React = require('react');
var span = React.DOM.span;

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            string: '',
            highlight: ''
        };
    },
    shouldComponentUpdate: function(p) {
        return p.highlight !== this.props.highlight;
    },
    render: function() {
        var p = this.props;

        if (!p.highlight || p.string.indexOf(p.highlight) === -1) {
            return span(null, p.string);
        }

        return span(null,
            p.string.split(p.highlight).map(function(part, index) {
                return span({ key: index },
                    index > 0 ?
                        span({ className: 'json-inspector__hl' }, p.highlight) :
                        null,
                    part);
            }));
    }
});

},{"react":"react"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/is-empty.js":[function(require,module,exports){
module.exports = function(object) {
    return Object.keys(object).length === 0;
};

},{}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/leaf.js":[function(require,module,exports){
var React = require('react');
var D = React.DOM;

var md5omatic = require('md5-o-matic');

var uid = require('./uid');
var type = require('./type');

var Highlighter = require('./highlighter');
var highlighter = React.createFactory(Highlighter);

var PATH_PREFIX = '.root.';

var Leaf = React.createClass({
    getInitialState: function() {
        return {
            expanded: this._isInitiallyExpanded(this.props)
        };
    },
    getDefaultProps: function() {
        return {
            root: false,
            prefix: ''
        };
    },
    render: function() {
        var id = 'id_' + uid();
        var p = this.props;

        var d = {
            path: this.keypath(),
            key: p.label.toString(),
            value: p.data
        };

        var onLabelClick = this._onClick.bind(this, d);

        return D.div({ className: this.getClassName(), id: 'leaf-' + this._rootPath() },
            D.input({ className: 'json-inspector__radio', type: 'radio', name: p.id, id: id, tabIndex: -1 }),
            D.label({ className: 'json-inspector__line', htmlFor: id, onClick: onLabelClick },
                D.div({ className: 'json-inspector__flatpath' },
                    d.path),
                D.span({ className: 'json-inspector__key' },
                    this.format(d.key),
                    ':',
                    this.renderInteractiveLabel(d.key, true)),
                this.renderTitle(),
                this.renderShowOriginalButton()),
            this.renderChildren());
    },
    renderTitle: function() {
        var data = this.data();
        var t = type(data);

        switch (t) {
            case 'Array':
                return D.span({ className: 'json-inspector__value json-inspector__value_helper' },
                    '[] ' + items(data.length));
            case 'Object':
                return D.span({ className: 'json-inspector__value json-inspector__value_helper' },
                    '{} ' + items(Object.keys(data).length));
            default:
                return D.span({ className: 'json-inspector__value json-inspector__value_' + t.toLowerCase() },
                    this.format(String(data)),
                    this.renderInteractiveLabel(data, false));
        }
    },
    renderChildren: function() {
        var p = this.props;
        var childPrefix = this._rootPath();
        var data = this.data();

        if (this.state.expanded && !isPrimitive(data)) {
            return Object.keys(data).map(function(key) {
                var value = data[key];

                return leaf({
                    data: value,
                    label: key,
                    prefix: childPrefix,
                    onClick: p.onClick,
                    id: p.id,
                    query: p.query,
                    getOriginal: this.state.original ? null : p.getOriginal,
                    key: getLeafKey(key, value),
                    isExpanded: p.isExpanded,
                    interactiveLabel: p.interactiveLabel
                });
            }, this);
        }

        return null;
    },
    renderShowOriginalButton: function() {
        var p = this.props;

        if (isPrimitive(p.data) || this.state.original || !p.getOriginal || !p.query || contains(this.keypath(), p.query)) {
            return null;
        }

        return D.span({
            className: 'json-inspector__show-original',
            onClick: this._onShowOriginalClick
        });
    },
    renderInteractiveLabel: function(originalValue, isKey) {
        if (typeof this.props.interactiveLabel === 'function') {
            return this.props.interactiveLabel({
                // The distinction between `value` and `originalValue` is
                // provided to have backwards compatibility.
                value: String(originalValue),
                originalValue: originalValue,
                isKey: isKey,
                keypath: this.keypath()
            });
        }

        return null;
    },
    componentWillReceiveProps: function(p) {
        if (p.query) {
            this.setState({
                expanded: !contains(p.label, p.query)
            });
        }

        // Restore original expansion state when switching from search mode
        // to full browse mode.
        if (this.props.query && !p.query) {
            this.setState({
                expanded: this._isInitiallyExpanded(p)
            });
        }
    },
    _rootPath: function() {
        return this.props.prefix + '.' + this.props.label;
    },
    keypath: function() {
        return this._rootPath().substr(PATH_PREFIX.length);
    },
    data: function() {
        return this.state.original || this.props.data;
    },
    format: function(string) {
        return highlighter({
            string: string,
            highlight: this.props.query
        });
    },
    getClassName: function() {
        var cn = 'json-inspector__leaf';

        if (this.props.root) {
            cn += ' json-inspector__leaf_root';
        }

        if (this.state.expanded) {
            cn += ' json-inspector__leaf_expanded';
        }

        if (!isPrimitive(this.props.data)) {
            cn += ' json-inspector__leaf_composite';
        }

        return cn;
    },
    toggle: function() {
        this.setState({
            expanded: !this.state.expanded
        });
    },
    _onClick: function(data, e) {
        this.toggle();
        this.props.onClick(data);

        e.stopPropagation();
    },
    _onShowOriginalClick: function(e) {
        this.setState({
            original: this.props.getOriginal(this.keypath())
        });

        e.stopPropagation();
    },
    _isInitiallyExpanded: function(p) {
        var keypath = this.keypath();

        if (p.root) {
            return true;
        }

        if (p.query === '') {
            return p.isExpanded(keypath, p.data);
        } else {
            // When a search query is specified, first check if the keypath
            // contains the search query: if it does, then the current leaf
            // is itself a search result and there is no need to expand further.
            //
            // Having a `getOriginal` function passed signalizes that current
            // leaf only displays a subset of data, thus should be rendered
            // expanded to reveal the children that is being searched for.
            return !contains(keypath, p.query) && (typeof p.getOriginal === 'function');
        }
    }
});

// FIXME: There should be a better way to call a component factory from inside
// component definition.
var leaf = React.createFactory(Leaf);

function items(count) {
    return count + (count === 1 ? ' item' : ' items');
}

function getLeafKey(key, value) {
    if (isPrimitive(value)) {
        // TODO: Sanitize `value` better.
        var hash = md5omatic(String(value));
        return key + ':' + hash;
    } else {
        return key + '[' + type(value) + ']';
    }
}

function contains(string, substring) {
    return string.indexOf(substring) !== -1;
}

function isPrimitive(value) {
    var t = type(value);
    return t !== 'Object' && t !== 'Array';
}

module.exports = Leaf;

},{"./highlighter":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/highlighter.js","./type":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/type.js","./uid":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/uid.js","md5-o-matic":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/node_modules/md5-o-matic/lib/md5omatic.js","react":"react"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/lens.js":[function(require,module,exports){
var type = require('./type');

var PATH_DELIMITER = '.';

function lens(data, path) {
    var p = path.split(PATH_DELIMITER);
    var segment = p.shift();

    if (!segment) {
        return data;
    }

    var t = type(data);

    if (t === 'Array' && data[integer(segment)]) {
        return lens(data[integer(segment)], p.join(PATH_DELIMITER));
    } else if (t === 'Object' && data[segment]) {
        return lens(data[segment], p.join(PATH_DELIMITER));
    }
}

function integer(string) {
    return parseInt(string, 10);
}

module.exports = lens;

},{"./type":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/type.js"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/noop.js":[function(require,module,exports){
module.exports = function() {};

},{}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/search-bar.js":[function(require,module,exports){
var debounce = require('debounce');
var React = require('react');
var input = React.DOM.input;

var noop = require('./noop');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            timeout: 100,
            onChange: noop
        };
    },
    render: function() {
        return input({
            className: 'json-inspector__search',
            type: 'search',
            placeholder: 'Search',
            ref: 'query',
            onChange: debounce(this.update, this.props.timeout)
        });
    },
    update: function() {
        this.props.onChange(this.refs.query.getDOMNode().value);
    }
});

},{"./noop":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/noop.js","debounce":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/node_modules/debounce/index.js","react":"react"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/type.js":[function(require,module,exports){
module.exports = function(value) {
    return Object.prototype.toString.call(value).slice(8, -1);
};

},{}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/lib/uid.js":[function(require,module,exports){
var id = Math.ceil(Math.random() * 10);

module.exports = function() {
    return ++id;
};

},{}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/node_modules/debounce/index.js":[function(require,module,exports){

/**
 * Module dependencies.
 */

var now = require('date-now');

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function debounced() {
    context = this;
    args = arguments;
    timestamp = now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

},{"date-now":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/node_modules/debounce/node_modules/date-now/index.js"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/node_modules/debounce/node_modules/date-now/index.js":[function(require,module,exports){
module.exports = Date.now || now

function now() {
    return new Date().getTime()
}

},{}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/node_modules/md5-o-matic/lib/md5omatic.js":[function(require,module,exports){
"use strict";

/**
 * Expose `md5omatic(str)`.
 */
 
module.exports = md5omatic;

/**
 * Hash any string using message digest.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */
 
function md5omatic(str) {
    var x = str2blks_MD5(str);
    var a =  1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d =  271733878;

    for(var i=0; i<x.length; i += 16)
    {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
        d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
        c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
        b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
        d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
        c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
        b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
        a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
        d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
        c = ff(c, d, a, b, x[i+10], 17, -42063);
        b = ff(b, c, d, a, x[i+11], 22, -1990404162);
        a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
        d = ff(d, a, b, c, x[i+13], 12, -40341101);
        c = ff(c, d, a, b, x[i+14], 17, -1502002290);
        b = ff(b, c, d, a, x[i+15], 22,  1236535329);
        a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
        d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
        c = gg(c, d, a, b, x[i+11], 14,  643717713);
        b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
        a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
        d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
        c = gg(c, d, a, b, x[i+15], 14, -660478335);
        b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
        a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
        d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
        c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
        b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
        a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
        d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
        c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
        b = gg(b, c, d, a, x[i+12], 20, -1926607734);
        a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
        d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
        c = hh(c, d, a, b, x[i+11], 16,  1839030562);
        b = hh(b, c, d, a, x[i+14], 23, -35309556);
        a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
        d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
        c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
        b = hh(b, c, d, a, x[i+10], 23, -1094730640);
        a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
        d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
        c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
        b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
        a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
        d = hh(d, a, b, c, x[i+12], 11, -421815835);
        c = hh(c, d, a, b, x[i+15], 16,  530742520);
        b = hh(b, c, d, a, x[i+ 2], 23, -995338651);
        a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
        d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
        c = ii(c, d, a, b, x[i+14], 15, -1416354905);
        b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
        a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
        d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i+10], 15, -1051523);
        b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
        d = ii(d, a, b, c, x[i+15], 10, -30611744);
        c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
        b = ii(b, c, d, a, x[i+13], 21,  1309151649);
        a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
        d = ii(d, a, b, c, x[i+11], 10, -1120210379);
        c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
        b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

        a = addme(a, olda);
        b = addme(b, oldb);
        c = addme(c, oldc);
        d = addme(d, oldd);
    }

    return rhex(a) + rhex(b) + rhex(c) + rhex(d);
};

var hex_chr = "0123456789abcdef";

function bitOR(a, b)
{
    var lsb = (a & 0x1) | (b & 0x1);
    var msb31 = (a >>> 1) | (b >>> 1);

    return (msb31 << 1) | lsb;
}

function bitXOR(a, b)
{
    var lsb = (a & 0x1) ^ (b & 0x1);
    var msb31 = (a >>> 1) ^ (b >>> 1);

    return (msb31 << 1) | lsb;
}

function bitAND(a, b)
{
    var lsb = (a & 0x1) & (b & 0x1);
    var msb31 = (a >>> 1) & (b >>> 1);

    return (msb31 << 1) | lsb;
}

function addme(x, y)
{
    var lsw = (x & 0xFFFF)+(y & 0xFFFF);
    var msw = (x >> 16)+(y >> 16)+(lsw >> 16);

    return (msw << 16) | (lsw & 0xFFFF);
}

function rhex(num)
{
    var str = "";
    var j;

    for(j=0; j<=3; j++)
        str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((num >> (j * 8)) & 0x0F);

    return str;
}

function str2blks_MD5(str)
{
    var nblk = ((str.length + 8) >> 6) + 1;
    var blks = new Array(nblk * 16);
    var i;

    for(i=0; i<nblk * 16; i++)
        blks[i] = 0;

    for(i=0; i<str.length; i++)
        blks[i >> 2] |= str.charCodeAt(i) << (((str.length * 8 + i) % 4) * 8);

    blks[i >> 2] |= 0x80 << (((str.length * 8 + i) % 4) * 8);

    var l = str.length * 8;
    blks[nblk * 16 - 2] = (l & 0xFF);
    blks[nblk * 16 - 2] |= ((l >>> 8) & 0xFF) << 8;
    blks[nblk * 16 - 2] |= ((l >>> 16) & 0xFF) << 16;
    blks[nblk * 16 - 2] |= ((l >>> 24) & 0xFF) << 24;

    return blks;
}

function rol(num, cnt)
{
    return (num << cnt) | (num >>> (32 - cnt));
}

function cmn(q, a, b, x, s, t)
{
    return addme(rol((addme(addme(a, q), addme(x, t))), s), b);
}

function ff(a, b, c, d, x, s, t)
{
    return cmn(bitOR(bitAND(b, c), bitAND((~b), d)), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t)
{
    return cmn(bitOR(bitAND(b, d), bitAND(c, (~d))), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t)
{
    return cmn(bitXOR(bitXOR(b, c), d), a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t)
{
    return cmn(bitXOR(c, bitOR(b, (~d))), a, b, x, s, t);
}
},{}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/node_modules/object-assign/index.js":[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/build/Resizable.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDraggable = require('react-draggable');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _cloneElement = require('./cloneElement');

var _cloneElement2 = _interopRequireDefault(_cloneElement);

var Resizable = (function (_React$Component) {
  _inherits(Resizable, _React$Component);

  function Resizable() {
    _classCallCheck(this, Resizable);

    _get(Object.getPrototypeOf(Resizable.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      bounds: this.constraintsToBounds(),
      width: this.props.width,
      height: this.props.height
    };
  }

  _createClass(Resizable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (!this.state.resizing) {
        this.setState({
          width: props.width,
          height: props.height,
          bounds: this.constraintsToBounds()
        });
      }
    }
  }, {
    key: 'constraintsToBounds',
    value: function constraintsToBounds() {
      var p = this.props;
      var mins = p.minConstraints || p.handleSize;
      var maxes = p.maxConstraints || [Infinity, Infinity];
      return {
        left: mins[0] - p.width,
        top: mins[1] - p.height,
        right: maxes[0] - p.width,
        bottom: maxes[1] - p.height
      };
    }

    /**
     * Wrapper around drag events to provide more useful data.
     *
     * @param  {String} handlerName Handler name to wrap.
     * @return {Function}           Handler function.
     */
  }, {
    key: 'resizeHandler',
    value: function resizeHandler(handlerName) {
      var _this = this;

      return function (e, _ref) {
        var node = _ref.node;
        var position = _ref.position;

        var width = _this.state.width + position.deltaX,
            height = _this.state.height + position.deltaY;
        _this.props[handlerName] && _this.props[handlerName](e, { node: node, size: { width: width, height: height } });

        if (handlerName === 'onResizeStart') {
          _this.setState({ resizing: true });
        } else if (handlerName === 'onResizeStop') {
          _this.setState({ resizing: false });
        } else {
          _this.setState({ width: width, height: height });
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var p = this.props;

      // What we're doing here is getting the child of this element, and cloning it with this element's props.
      // We are then defining its children as:
      // Its original children (resizable's child's children), and
      // A draggable handle.
      return (0, _cloneElement2['default'])(p.children, (0, _objectAssign2['default'])({}, p, {
        children: [p.children.props.children, _react2['default'].createElement(
          _reactDraggable.DraggableCore,
          _extends({}, p.draggableOpts, {
            ref: 'draggable',
            onStop: this.resizeHandler('onResizeStop'),
            onStart: this.resizeHandler('onResizeStart'),
            onDrag: this.resizeHandler('onResize'),
            bounds: this.state.bounds
          }),
          _react2['default'].createElement('span', { className: 'react-resizable-handle' })
        )]
      }));
    }
  }], [{
    key: 'propTypes',
    value: {
      //
      // Required Props
      //

      // Require that one and only one child be present.
      children: _react.PropTypes.element.isRequired,

      // Initial w/h
      width: _react.PropTypes.number.isRequired,
      height: _react.PropTypes.number.isRequired,

      //
      // Optional props
      //

      // If you change this, be sure to update your css
      handleSize: _react.PropTypes.array,

      // Min/max size
      minConstraints: _react.PropTypes.arrayOf(_react.PropTypes.number),
      maxConstraints: _react.PropTypes.arrayOf(_react.PropTypes.number),

      // Callbacks
      onResizeStop: _react.PropTypes.func,
      onResizeStart: _react.PropTypes.func,
      onResize: _react.PropTypes.func,

      // These will be passed wholesale to react-draggable's DraggableCore
      draggableOpts: _react.PropTypes.object
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      handleSize: [20, 20]
    },
    enumerable: true
  }]);

  return Resizable;
})(_react2['default'].Component);

exports['default'] = Resizable;
module.exports = exports['default'];
},{"./cloneElement":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/build/cloneElement.js","object-assign":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/node_modules/object-assign/index.js","react":"react","react-draggable":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/node_modules/react-draggable/dist/react-draggable.js"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/build/ResizableBox.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Resizable = require('./Resizable');

var _Resizable2 = _interopRequireDefault(_Resizable);

// An example use of Resizable.

var ResizableBox = (function (_React$Component) {
  _inherits(ResizableBox, _React$Component);

  function ResizableBox() {
    var _this = this;

    _classCallCheck(this, ResizableBox);

    _get(Object.getPrototypeOf(ResizableBox.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      width: this.props.width,
      height: this.props.height,
      aspectRatio: this.props.width / this.props.height
    };

    this.onResize = function (event, data) {
      var element = data.element;
      var size = data.size;
      var width = size.width;
      var height = size.height;

      var widthChanged = width !== _this.state.width,
          heightChanged = height !== _this.state.height;
      if (!widthChanged && !heightChanged) return;

      var _runConstraints = _this.runConstraints(width, height);

      var _runConstraints2 = _slicedToArray(_runConstraints, 2);

      width = _runConstraints2[0];
      height = _runConstraints2[1];

      _this.setState({ width: width, height: height }, function () {
        if (_this.props.onResize) {
          _this.props.onResize(event, { element: element, size: { width: width, height: height } });
        }
      });
    };
  }

  _createClass(ResizableBox, [{
    key: 'runConstraints',

    // If you do this, be careful of constraints
    value: function runConstraints(width, height) {
      var min = this.props.minConstraints;
      var max = this.props.maxConstraints;

      if (this.props.lockAspectRatio) {
        height = width / this.state.aspectRatio;
        width = height * this.state.aspectRatio;
      }

      if (min) {
        width = Math.max(min[0], width);
        height = Math.max(min[1], height);
      }
      if (max) {
        width = Math.min(max[0], width);
        height = Math.min(max[1], height);
      }
      return [width, height];
    }
  }, {
    key: 'render',
    value: function render() {
      // Basic wrapper around a Resizable instance.
      // If you use Resizable directly, you are responsible for updating the component
      // with a new width and height.
      var _props = this.props;
      var handleSize = _props.handleSize;
      var minConstraints = _props.minConstraints;
      var maxConstraints = _props.maxConstraints;

      var props = _objectWithoutProperties(_props, ['handleSize', 'minConstraints', 'maxConstraints']);

      return _react2['default'].createElement(
        _Resizable2['default'],
        {
          minConstraints: minConstraints,
          maxConstraints: maxConstraints,
          handleSize: handleSize,
          width: this.state.width,
          height: this.state.height,
          onResizeStart: this.props.onResizeStart,
          onResize: this.onResize,
          onResizeStop: this.props.onResizeStop,
          draggableOpts: this.props.draggableOpts
        },
        _react2['default'].createElement(
          'div',
          _extends({ style: { width: this.state.width + 'px', height: this.state.height + 'px' } }, props),
          this.props.children
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      lockAspectRatio: _react.PropTypes.bool,
      minConstraints: _react.PropTypes.arrayOf(_react.PropTypes.number),
      maxConstraints: _react.PropTypes.arrayOf(_react.PropTypes.number),
      height: _react.PropTypes.number,
      width: _react.PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      lockAspectRatio: false,
      handleSize: [20, 20]
    },
    enumerable: true
  }]);

  return ResizableBox;
})(_react2['default'].Component);

exports['default'] = ResizableBox;
module.exports = exports['default'];

// TODO data is ResizeData type, but that doesn't work in babel-typecheck pre-babel6
},{"./Resizable":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/build/Resizable.js","react":"react"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/build/cloneElement.js":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// React.addons.cloneWithProps look-alike that merges style & className.
module.exports = function cloneElement(element, props) {
  if (props.style && element.props.style) {
    props.style = (0, _objectAssign2['default'])({}, element.props.style, props.style);
  }
  if (props.className && element.props.className) {
    props.className = element.props.className + ' ' + props.className;
  }
  return _react2['default'].cloneElement(element, props);
};
},{"object-assign":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/node_modules/object-assign/index.js","react":"react"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/index.js":[function(require,module,exports){
'use strict';
module.exports = function() {
  throw new Error("Don't instantiate Resizable directly! Use require('react-resizable').Resizable");
};

module.exports.Resizable = require('./build/Resizable');
module.exports.ResizableBox = require('./build/ResizableBox');

},{"./build/Resizable":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/build/Resizable.js","./build/ResizableBox":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/build/ResizableBox.js"}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/node_modules/object-assign/index.js":[function(require,module,exports){
/* eslint-disable no-unused-vars */
'use strict';
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/node_modules/react-draggable/dist/react-draggable.js":[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactDraggable"] = factory(require("react"), require("react-dom"));
	else
		root["ReactDraggable"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
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
	
	module.exports = __webpack_require__(1);
	module.exports.DraggableCore = __webpack_require__(10);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _objectAssign = __webpack_require__(5);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _utilsDomFns = __webpack_require__(6);
	
	var _utilsPositionFns = __webpack_require__(9);
	
	var _utilsShims = __webpack_require__(7);
	
	var _DraggableCore2 = __webpack_require__(10);
	
	var _DraggableCore3 = _interopRequireDefault(_DraggableCore2);
	
	var _utilsLog = __webpack_require__(11);
	
	var _utilsLog2 = _interopRequireDefault(_utilsLog);
	
	//
	// Define <Draggable>
	//
	
	var Draggable = (function (_DraggableCore) {
	  _inherits(Draggable, _DraggableCore);
	
	  function Draggable() {
	    var _this = this;
	
	    _classCallCheck(this, Draggable);
	
	    _get(Object.getPrototypeOf(Draggable.prototype), 'constructor', this).apply(this, arguments);
	
	    this.state = {
	      // Whether or not we are currently dragging.
	      dragging: false,
	
	      // Current transform x and y.
	      clientX: this.props.start.x, clientY: this.props.start.y,
	
	      // Can only determine if SVG after mounting
	      isElementSVG: false
	    };
	
	    this.onDragStart = function (e, coreEvent) {
	      (0, _utilsLog2['default'])('Draggable: onDragStart: %j', coreEvent.position);
	
	      // Short-circuit if user's callback killed it.
	      var shouldStart = _this.props.onStart(e, (0, _utilsDomFns.createUIEvent)(_this, coreEvent));
	      // Kills start event on core as well, so move handlers are never bound.
	      if (shouldStart === false) return false;
	
	      _this.setState({
	        dragging: true
	      });
	    };
	
	    this.onDrag = function (e, coreEvent) {
	      if (!_this.state.dragging) return false;
	      (0, _utilsLog2['default'])('Draggable: onDrag: %j', coreEvent.position);
	
	      // Short-circuit if user's callback killed it.
	      var shouldUpdate = _this.props.onDrag(e, (0, _utilsDomFns.createUIEvent)(_this, coreEvent));
	      if (shouldUpdate === false) return false;
	
	      var newState = {
	        clientX: _this.state.clientX + coreEvent.position.deltaX,
	        clientY: _this.state.clientY + coreEvent.position.deltaY
	      };
	
	      // Keep within bounds.
	      if (_this.props.bounds) {
	        var _getBoundPosition = (0, _utilsPositionFns.getBoundPosition)(_this, newState.clientX, newState.clientY);
	
	        var _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2);
	
	        newState.clientX = _getBoundPosition2[0];
	        newState.clientY = _getBoundPosition2[1];
	      }
	
	      _this.setState(newState);
	    };
	
	    this.onDragStop = function (e, coreEvent) {
	      if (!_this.state.dragging) return false;
	
	      // Short-circuit if user's callback killed it.
	      var shouldStop = _this.props.onStop(e, (0, _utilsDomFns.createUIEvent)(_this, coreEvent));
	      if (shouldStop === false) return false;
	
	      (0, _utilsLog2['default'])('Draggable: onDragStop: %j', coreEvent.position);
	
	      _this.setState({
	        dragging: false
	      });
	    };
	  }
	
	  _createClass(Draggable, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Check to see if the element passed is an instanceof SVGElement
	      if (_reactDom2['default'].findDOMNode(this) instanceof SVGElement) {
	        this.setState({ isElementSVG: true });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var style = undefined,
	          svgTransform = null;
	      // Add a CSS transform to move the element around. This allows us to move the element around
	      // without worrying about whether or not it is relatively or absolutely positioned.
	      // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
	      // has a clean slate.
	      style = (0, _utilsDomFns.createTransform)({
	        // Set left if horizontal drag is enabled
	        x: (0, _utilsPositionFns.canDragX)(this) ? this.state.clientX : this.props.start.x,
	
	        // Set top if vertical drag is enabled
	        y: (0, _utilsPositionFns.canDragY)(this) ? this.state.clientY : this.props.start.y
	      }, this.state.isElementSVG);
	
	      // If this element was SVG, we use the `transform` attribute.
	      if (this.state.isElementSVG) {
	        svgTransform = style;
	        style = {};
	      }
	
	      // zIndex option
	      if (this.state.dragging && !isNaN(this.props.zIndex)) {
	        style.zIndex = this.props.zIndex;
	      }
	
	      // Mark with class while dragging
	      var className = (0, _classnames2['default'])(this.props.children.props.className || '', 'react-draggable', {
	        'react-draggable-dragging': this.state.dragging,
	        'react-draggable-dragged': this.state.dragged
	      });
	
	      // Reuse the child provided
	      // This makes it flexible to use whatever element is wanted (div, ul, etc)
	      return _react2['default'].createElement(
	        _DraggableCore3['default'],
	        _extends({}, this.props, { onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop }),
	        _react2['default'].cloneElement(_react2['default'].Children.only(this.props.children), {
	          className: className,
	          style: (0, _objectAssign2['default'])({}, this.props.children.props.style, style),
	          transform: svgTransform
	        })
	      );
	    }
	  }], [{
	    key: 'displayName',
	    value: 'Draggable',
	    enumerable: true
	  }, {
	    key: 'propTypes',
	    value: (0, _objectAssign2['default'])({}, _DraggableCore3['default'].propTypes, {
	      /**
	       * `axis` determines which axis the draggable can move.
	       *
	       * 'both' allows movement horizontally and vertically.
	       * 'x' limits movement to horizontal axis.
	       * 'y' limits movement to vertical axis.
	       *
	       * Defaults to 'both'.
	       */
	      axis: _react.PropTypes.oneOf(['both', 'x', 'y']),
	
	      /**
	       * `bounds` determines the range of movement available to the element.
	       * Available values are:
	       *
	       * 'parent' restricts movement within the Draggable's parent node.
	       *
	       * Alternatively, pass an object with the following properties, all of which are optional:
	       *
	       * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
	       *
	       * All values are in px.
	       *
	       * Example:
	       *
	       * ```jsx
	       *   let App = React.createClass({
	       *       render: function () {
	       *         return (
	       *            <Draggable bounds={{right: 300, bottom: 300}}>
	       *              <div>Content</div>
	       *           </Draggable>
	       *         );
	       *       }
	       *   });
	       * ```
	       */
	      bounds: _react.PropTypes.oneOfType([_react.PropTypes.shape({
	        left: _react.PropTypes.Number,
	        right: _react.PropTypes.Number,
	        top: _react.PropTypes.Number,
	        bottom: _react.PropTypes.Number
	      }), _react.PropTypes.oneOf(['parent', false])]),
	
	      /**
	       * `start` specifies the x and y that the dragged item should start at
	       *
	       * Example:
	       *
	       * ```jsx
	       *      let App = React.createClass({
	       *          render: function () {
	       *              return (
	       *                  <Draggable start={{x: 25, y: 25}}>
	       *                      <div>I start with transformX: 25px and transformY: 25px;</div>
	       *                  </Draggable>
	       *              );
	       *          }
	       *      });
	       * ```
	       */
	      start: _react.PropTypes.shape({
	        x: _react.PropTypes.number,
	        y: _react.PropTypes.number
	      }),
	
	      /**
	       * `zIndex` specifies the zIndex to use while dragging.
	       *
	       * Example:
	       *
	       * ```jsx
	       *   let App = React.createClass({
	       *       render: function () {
	       *           return (
	       *               <Draggable zIndex={100}>
	       *                   <div>I have a zIndex</div>
	       *               </Draggable>
	       *           );
	       *       }
	       *   });
	       * ```
	       */
	      zIndex: _react.PropTypes.number,
	
	      /**
	       * These properties should be defined on the child, not here.
	       */
	      className: _utilsShims.dontSetMe,
	      style: _utilsShims.dontSetMe,
	      transform: _utilsShims.dontSetMe
	    }),
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: (0, _objectAssign2['default'])({}, _DraggableCore3['default'].defaultProps, {
	      axis: 'both',
	      bounds: false,
	      start: { x: 0, y: 0 },
	      zIndex: NaN
	    }),
	    enumerable: true
	  }]);
	
	  return Draggable;
	})(_DraggableCore3['default']);
	
	exports['default'] = Draggable;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.matchesSelector = matchesSelector;
	exports.addEvent = addEvent;
	exports.removeEvent = removeEvent;
	exports.outerHeight = outerHeight;
	exports.outerWidth = outerWidth;
	exports.innerHeight = innerHeight;
	exports.innerWidth = innerWidth;
	exports.createTransform = createTransform;
	exports.createCSSTransform = createCSSTransform;
	exports.createSVGTransform = createSVGTransform;
	exports.addUserSelectStyles = addUserSelectStyles;
	exports.removeUserSelectStyles = removeUserSelectStyles;
	exports.styleHacks = styleHacks;
	exports.createCoreEvent = createCoreEvent;
	exports.createUIEvent = createUIEvent;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _shims = __webpack_require__(7);
	
	var _getPrefix = __webpack_require__(8);
	
	var _getPrefix2 = _interopRequireDefault(_getPrefix);
	
	var _objectAssign = __webpack_require__(5);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var matchesSelectorFunc = '';
	
	function matchesSelector(el, selector) {
	  if (!matchesSelectorFunc) {
	    matchesSelectorFunc = (0, _shims.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
	      return (0, _shims.isFunction)(el[method]);
	    });
	  }
	
	  return el[matchesSelectorFunc].call(el, selector);
	}
	
	function addEvent(el, event, handler) {
	  if (!el) {
	    return;
	  }
	  if (el.attachEvent) {
	    el.attachEvent('on' + event, handler);
	  } else if (el.addEventListener) {
	    el.addEventListener(event, handler, true);
	  } else {
	    el['on' + event] = handler;
	  }
	}
	
	function removeEvent(el, event, handler) {
	  if (!el) {
	    return;
	  }
	  if (el.detachEvent) {
	    el.detachEvent('on' + event, handler);
	  } else if (el.removeEventListener) {
	    el.removeEventListener(event, handler, true);
	  } else {
	    el['on' + event] = null;
	  }
	}
	
	function outerHeight(node) {
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetTop which is including margin. See getBoundPosition
	  var height = node.clientHeight;
	  var computedStyle = window.getComputedStyle(node);
	  height += (0, _shims.int)(computedStyle.borderTopWidth);
	  height += (0, _shims.int)(computedStyle.borderBottomWidth);
	  return height;
	}
	
	function outerWidth(node) {
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetLeft which is including margin. See getBoundPosition
	  var width = node.clientWidth;
	  var computedStyle = window.getComputedStyle(node);
	  width += (0, _shims.int)(computedStyle.borderLeftWidth);
	  width += (0, _shims.int)(computedStyle.borderRightWidth);
	  return width;
	}
	
	function innerHeight(node) {
	  var height = node.clientHeight;
	  var computedStyle = window.getComputedStyle(node);
	  height -= (0, _shims.int)(computedStyle.paddingTop);
	  height -= (0, _shims.int)(computedStyle.paddingBottom);
	  return height;
	}
	
	function innerWidth(node) {
	  var width = node.clientWidth;
	  var computedStyle = window.getComputedStyle(node);
	  width -= (0, _shims.int)(computedStyle.paddingLeft);
	  width -= (0, _shims.int)(computedStyle.paddingRight);
	  return width;
	}
	
	function createTransform(position, isSVG) {
	  if (isSVG) return createSVGTransform(position);
	  return createCSSTransform(position);
	}
	
	function createCSSTransform(_ref) {
	  var x = _ref.x;
	  var y = _ref.y;
	  return (function () {
	    // Replace unitless items with px
	    var out = { transform: 'translate(' + x + 'px,' + y + 'px)' };
	    // Add single prefixed property as well
	    if (_getPrefix2['default']) {
	      out[_getPrefix2['default'] + 'Transform'] = out.transform;
	    }
	    return out;
	  })();
	}
	
	function createSVGTransform(_ref2) {
	  var x = _ref2.x;
	  var y = _ref2.y;
	  return (function () {
	    return 'translate(' + x + ',' + y + ')';
	  })();
	}
	
	// User-select Hacks:
	//
	// Useful for preventing blue highlights all over everything when dragging.
	var userSelectStyle = ';user-select: none;';
	if (_getPrefix2['default']) {
	  userSelectStyle += '-' + _getPrefix2['default'].toLowerCase() + '-user-select: none;';
	}
	
	function addUserSelectStyles() {
	  var style = document.body.getAttribute('style') || '';
	  document.body.setAttribute('style', style + userSelectStyle);
	}
	
	function removeUserSelectStyles() {
	  var style = document.body.getAttribute('style') || '';
	  document.body.setAttribute('style', style.replace(userSelectStyle, ''));
	}
	
	function styleHacks() {
	  var childStyle = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  // Workaround IE pointer events; see #51
	  // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
	  var touchHacks = {
	    touchAction: 'none'
	  };
	
	  return (0, _objectAssign2['default'])(touchHacks, childStyle);
	}
	
	// Create an event exposed by <DraggableCore>
	
	function createCoreEvent(draggable, clientX, clientY) {
	  // State changes are often (but not always!) async. We want the latest value.
	  var state = draggable._pendingState || draggable.state;
	  var isStart = !(0, _shims.isNum)(state.lastX);
	
	  return {
	    node: _reactDom2['default'].findDOMNode(draggable),
	    position: isStart ?
	    // If this is our first move, use the clientX and clientY as last coords.
	    {
	      deltaX: 0, deltaY: 0,
	      lastX: clientX, lastY: clientY,
	      clientX: clientX, clientY: clientY
	    } :
	    // Otherwise calculate proper values.
	    {
	      deltaX: clientX - state.lastX, deltaY: clientY - state.lastY,
	      lastX: state.lastX, lastY: state.lastY,
	      clientX: clientX, clientY: clientY
	    }
	  };
	}
	
	// Create an event exposed by <Draggable>
	
	function createUIEvent(draggable, coreEvent) {
	  return {
	    node: _reactDom2['default'].findDOMNode(draggable),
	    position: {
	      top: coreEvent.position.clientY,
	      left: coreEvent.position.clientX
	    },
	    deltaX: coreEvent.position.deltaX,
	    deltaY: coreEvent.position.deltaY
	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.findInArray = findInArray;
	exports.isFunction = isFunction;
	exports.isNum = isNum;
	exports.int = int;
	exports.dontSetMe = dontSetMe;
	
	function findInArray(array, callback) {
	  for (var i = 0, _length = array.length; i < _length; i++) {
	    if (callback.apply(callback, [array[i], i, array])) return array[i];
	  }
	}
	
	function isFunction(func) {
	  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
	}
	
	function isNum(num) {
	  return typeof num === 'number' && !isNaN(num);
	}
	
	function int(a) {
	  return parseInt(a, 10);
	}
	
	function dontSetMe(props, propName, componentName) {
	  if (props[propName]) {
	    throw new Error('Invalid prop ' + propName + ' passed to ' + componentName + ' - do not set this, set it on the child.');
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	exports['default'] = (function () {
	  if (typeof window === 'undefined') return '';
	  // Thanks David Walsh
	  var styles = window.getComputedStyle(document.documentElement, ''),
	      pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];
	  // 'ms' is not titlecased
	  if (pre === undefined || pre === null) return '';
	  if (pre === 'ms') return pre;
	  if (pre === undefined || pre === null) return '';
	  return pre.slice(0, 1).toUpperCase() + pre.slice(1);
	})();
	
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getBoundPosition = getBoundPosition;
	exports.snapToGrid = snapToGrid;
	exports.canDragX = canDragX;
	exports.canDragY = canDragY;
	exports.getControlPosition = getControlPosition;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _shims = __webpack_require__(7);
	
	var _reactDom = __webpack_require__(3);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _domFns = __webpack_require__(6);
	
	function getBoundPosition(draggable, clientX, clientY) {
	  // If no bounds, short-circuit and move on
	  if (!draggable.props.bounds) return [clientX, clientY];
	
	  var bounds = JSON.parse(JSON.stringify(draggable.props.bounds));
	  var node = _reactDom2['default'].findDOMNode(draggable);
	  var parent = node.parentNode;
	
	  if (bounds === 'parent') {
	    var nodeStyle = window.getComputedStyle(node);
	    var parentStyle = window.getComputedStyle(parent);
	    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
	    bounds = {
	      left: -node.offsetLeft + (0, _shims.int)(parentStyle.paddingLeft) + (0, _shims.int)(nodeStyle.borderLeftWidth) + (0, _shims.int)(nodeStyle.marginLeft),
	      top: -node.offsetTop + (0, _shims.int)(parentStyle.paddingTop) + (0, _shims.int)(nodeStyle.borderTopWidth) + (0, _shims.int)(nodeStyle.marginTop),
	      right: (0, _domFns.innerWidth)(parent) - (0, _domFns.outerWidth)(node) - node.offsetLeft,
	      bottom: (0, _domFns.innerHeight)(parent) - (0, _domFns.outerHeight)(node) - node.offsetTop
	    };
	  }
	
	  // Keep x and y below right and bottom limits...
	  if ((0, _shims.isNum)(bounds.right)) clientX = Math.min(clientX, bounds.right);
	  if ((0, _shims.isNum)(bounds.bottom)) clientY = Math.min(clientY, bounds.bottom);
	
	  // But above left and top limits.
	  if ((0, _shims.isNum)(bounds.left)) clientX = Math.max(clientX, bounds.left);
	  if ((0, _shims.isNum)(bounds.top)) clientY = Math.max(clientY, bounds.top);
	
	  return [clientX, clientY];
	}
	
	function snapToGrid(grid, pendingX, pendingY) {
	  var x = Math.round(pendingX / grid[0]) * grid[0];
	  var y = Math.round(pendingY / grid[1]) * grid[1];
	  return [x, y];
	}
	
	function canDragX(draggable) {
	  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
	}
	
	function canDragY(draggable) {
	  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
	}
	
	// Get {clientX, clientY} positions from event.
	
	function getControlPosition(e) {
	  var position = e.targetTouches && e.targetTouches[0] || e;
	  return {
	    clientX: position.clientX,
	    clientY: position.clientY
	  };
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsDomFns = __webpack_require__(6);
	
	var _utilsPositionFns = __webpack_require__(9);
	
	var _utilsShims = __webpack_require__(7);
	
	var _utilsLog = __webpack_require__(11);
	
	var _utilsLog2 = _interopRequireDefault(_utilsLog);
	
	// Simple abstraction for dragging events names.
	var eventsFor = {
	  touch: {
	    start: 'touchstart',
	    move: 'touchmove',
	    stop: 'touchend'
	  },
	  mouse: {
	    start: 'mousedown',
	    move: 'mousemove',
	    stop: 'mouseup'
	  }
	};
	
	// Default to mouse events.
	var dragEventFor = eventsFor.mouse;
	
	//
	// Define <DraggableCore>.
	//
	// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
	// work well with libraries that require more control over the element.
	//
	
	var DraggableCore = (function (_React$Component) {
	  _inherits(DraggableCore, _React$Component);
	
	  function DraggableCore() {
	    var _this = this;
	
	    _classCallCheck(this, DraggableCore);
	
	    _get(Object.getPrototypeOf(DraggableCore.prototype), 'constructor', this).apply(this, arguments);
	
	    this.state = {
	      dragging: false,
	      // Used while dragging to determine deltas.
	      lastX: null, lastY: null
	    };
	
	    this.handleDragStart = function (e) {
	      // Make it possible to attach event handlers on top of this one.
	      _this.props.onMouseDown(e);
	
	      // Only accept left-clicks.
	      if (!_this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;
	
	      // Short circuit if handle or cancel prop was provided and selector doesn't match.
	      if (_this.props.disabled || _this.props.handle && !(0, _utilsDomFns.matchesSelector)(e.target, _this.props.handle) || _this.props.cancel && (0, _utilsDomFns.matchesSelector)(e.target, _this.props.cancel)) {
	        return;
	      }
	
	      // Set touch identifier in component state if this is a touch event. This allows us to
	      // distinguish between individual touches on multitouch screens by identifying which
	      // touchpoint was set to this element.
	      if (e.targetTouches) {
	        _this.setState({ touchIdentifier: e.targetTouches[0].identifier });
	      }
	
	      // Add a style to the body to disable user-select. This prevents text from
	      // being selected all over the page.
	      if (_this.props.enableUserSelectHack) (0, _utilsDomFns.addUserSelectStyles)();
	
	      // Get the current drag point from the event. This is used as the offset.
	
	      var _getControlPosition = (0, _utilsPositionFns.getControlPosition)(e);
	
	      var clientX = _getControlPosition.clientX;
	      var clientY = _getControlPosition.clientY;
	
	      // Create an event object with all the data parents need to make a decision here.
	      var coreEvent = (0, _utilsDomFns.createCoreEvent)(_this, clientX, clientY);
	
	      (0, _utilsLog2['default'])('DraggableCore: handleDragStart: %j', coreEvent.position);
	
	      // Call event handler. If it returns explicit false, cancel.
	      (0, _utilsLog2['default'])('calling', _this.props.onStart);
	      var shouldUpdate = _this.props.onStart(e, coreEvent);
	      if (shouldUpdate === false) return;
	
	      // Initiate dragging. Set the current x and y as offsets
	      // so we know how much we've moved during the drag. This allows us
	      // to drag elements around even if they have been moved, without issue.
	      _this.setState({
	        dragging: true,
	
	        lastX: clientX,
	        lastY: clientY,
	        // Stored so we can adjust our offset if scrolled.
	        scrollX: document.body.scrollLeft,
	        scrollY: document.body.scrollTop
	      });
	
	      // Translate el on page scroll.
	      (0, _utilsDomFns.addEvent)(document, 'scroll', _this.handleScroll);
	      // Add events to the document directly so we catch when the user's mouse/touch moves outside of
	      // this element. We use different events depending on whether or not we have detected that this
	      // is a touch-capable device.
	      (0, _utilsDomFns.addEvent)(document, dragEventFor.move, _this.handleDrag);
	      (0, _utilsDomFns.addEvent)(document, dragEventFor.stop, _this.handleDragStop);
	    };
	
	    this.handleDrag = function (e) {
	      // Return if this is a touch event, but not the correct one for this element
	      if (e.targetTouches && e.targetTouches[0].identifier !== _this.state.touchIdentifier) return;
	
	      var _getControlPosition2 = (0, _utilsPositionFns.getControlPosition)(e);
	
	      var clientX = _getControlPosition2.clientX;
	      var clientY = _getControlPosition2.clientY;
	
	      // Snap to grid if prop has been provided
	      if (Array.isArray(_this.props.grid)) {
	        var deltaX = clientX - _this.state.lastX,
	            deltaY = clientY - _this.state.lastY;
	
	        var _snapToGrid = (0, _utilsPositionFns.snapToGrid)(_this.props.grid, deltaX, deltaY);
	
	        var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);
	
	        deltaX = _snapToGrid2[0];
	        deltaY = _snapToGrid2[1];
	
	        if (!deltaX && !deltaY) return; // skip useless drag
	        clientX = _this.state.lastX + deltaX, clientY = _this.state.lastY + deltaY;
	      }
	
	      var coreEvent = (0, _utilsDomFns.createCoreEvent)(_this, clientX, clientY);
	
	      (0, _utilsLog2['default'])('DraggableCore: handleDrag: %j', coreEvent.position);
	
	      // Call event handler. If it returns explicit false, trigger end.
	      var shouldUpdate = _this.props.onDrag(e, coreEvent);
	      if (shouldUpdate === false) {
	        _this.handleDragStop({});
	        return;
	      }
	
	      _this.setState({
	        lastX: clientX,
	        lastY: clientY
	      });
	    };
	
	    this.handleDragStop = function (e) {
	      if (!_this.state.dragging) return;
	
	      // Short circuit if this is not the correct touch event. `changedTouches` contains all
	      // touch points that have been removed from the surface.
	      if (e.changedTouches && e.changedTouches[0].identifier !== _this.state.touchIdentifier) return;
	
	      // Remove user-select hack
	      if (_this.props.enableUserSelectHack) (0, _utilsDomFns.removeUserSelectStyles)();
	
	      var _getControlPosition3 = (0, _utilsPositionFns.getControlPosition)(e);
	
	      var clientX = _getControlPosition3.clientX;
	      var clientY = _getControlPosition3.clientY;
	
	      var coreEvent = (0, _utilsDomFns.createCoreEvent)(_this, clientX, clientY);
	
	      (0, _utilsLog2['default'])('DraggableCore: handleDragStop: %j', coreEvent.position);
	
	      // Reset the el.
	      _this.setState({
	        dragging: false,
	        lastX: null,
	        lastY: null
	      });
	
	      // Call event handler
	      _this.props.onStop(e, coreEvent);
	
	      // Remove event handlers
	      (0, _utilsLog2['default'])('DraggableCore: Removing handlers');
	      (0, _utilsDomFns.removeEvent)(document, 'scroll', _this.handleScroll);
	      (0, _utilsDomFns.removeEvent)(document, dragEventFor.move, _this.handleDrag);
	      (0, _utilsDomFns.removeEvent)(document, dragEventFor.stop, _this.handleDragStop);
	    };
	
	    this.handleScroll = function (e) {
	      var s = _this.state,
	          x = document.body.scrollLeft,
	          y = document.body.scrollTop;
	
	      // Create the usual event, but make the scroll offset our deltas.
	      var coreEvent = (0, _utilsDomFns.createCoreEvent)(_this);
	      coreEvent.position.deltaX = x - s.scrollX;
	      coreEvent.position.deltaY = y - s.scrollY;
	
	      _this.setState({
	        lastX: s.lastX + coreEvent.position.deltaX,
	        lastY: s.lastY + coreEvent.position.deltaY
	      });
	
	      _this.props.onDrag(e, coreEvent);
	    };
	
	    this.onMouseDown = function (e) {
	      // HACK: Prevent 'ghost click' which happens 300ms after touchstart if the event isn't cancelled.
	      // We don't cancel the event on touchstart because of #37; we might want to make a scrollable item draggable.
	      // More on ghost clicks: http://ariatemplates.com/blog/2014/05/ghost-clicks-in-mobile-browsers/
	      if (dragEventFor === eventsFor.touch) {
	        return e.preventDefault();
	      }
	
	      return _this.handleDragStart(e);
	    };
	
	    this.onTouchStart = function (e) {
	      // We're on a touch device now, so change the event handlers
	      dragEventFor = eventsFor.touch;
	
	      return _this.handleDragStart(e);
	    };
	  }
	
	  _createClass(DraggableCore, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      // Remove any leftover event handlers. Remove both touch and mouse handlers in case
	      // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
	      (0, _utilsDomFns.removeEvent)(document, eventsFor.mouse.move, this.handleDrag);
	      (0, _utilsDomFns.removeEvent)(document, eventsFor.touch.move, this.handleDrag);
	      (0, _utilsDomFns.removeEvent)(document, eventsFor.mouse.stop, this.handleDragStop);
	      (0, _utilsDomFns.removeEvent)(document, eventsFor.touch.stop, this.handleDragStop);
	      (0, _utilsDomFns.removeEvent)(document, 'scroll', this.handleScroll);
	      if (this.props.enableUserSelectHack) (0, _utilsDomFns.removeUserSelectStyles)();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // Reuse the child provided
	      // This makes it flexible to use whatever element is wanted (div, ul, etc)
	      return _react2['default'].cloneElement(_react2['default'].Children.only(this.props.children), {
	        style: (0, _utilsDomFns.styleHacks)(this.props.children.props.style),
	
	        // Note: mouseMove handler is attached to document so it will still function
	        // when the user drags quickly and leaves the bounds of the element.
	        onMouseDown: this.onMouseDown,
	        onTouchStart: this.onTouchStart,
	        onMouseUp: this.handleDragStop,
	        onTouchEnd: this.handleDragStop
	      });
	    }
	  }], [{
	    key: 'displayName',
	    value: 'DraggableCore',
	    enumerable: true
	  }, {
	    key: 'propTypes',
	    value: {
	      /**
	       * `allowAnyClick` allows dragging using any mouse button.
	       * By default, we only accept the left button.
	       *
	       * Defaults to `false`.
	       */
	      allowAnyClick: _react.PropTypes.bool,
	
	      /**
	       * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
	       * with the exception of `onMouseDown`, will not fire.
	       *
	       * Example:
	       *
	       * ```jsx
	       *   let App = React.createClass({
	       *       render: function () {
	       *           return (
	       *               <Draggable disabled={true}>
	       *                   <div>I can't be dragged</div>
	       *               </Draggable>
	       *           );
	       *       }
	       *   });
	       * ```
	       */
	      disabled: _react.PropTypes.bool,
	
	      /**
	       * By default, we add 'user-select:none' attributes to the document body
	       * to prevent ugly text selection during drag. If this is causing problems
	       * for your app, set this to `false`.
	       */
	      enableUserSelectHack: _react.PropTypes.bool,
	
	      /**
	       * `grid` specifies the x and y that dragging should snap to.
	       *
	       * Example:
	       *
	       * ```jsx
	       *   let App = React.createClass({
	       *       render: function () {
	       *           return (
	       *               <Draggable grid={[25, 25]}>
	       *                   <div>I snap to a 25 x 25 grid</div>
	       *               </Draggable>
	       *           );
	       *       }
	       *   });
	       * ```
	       */
	      grid: _react.PropTypes.arrayOf(_react.PropTypes.number),
	
	      /**
	       * `handle` specifies a selector to be used as the handle that initiates drag.
	       *
	       * Example:
	       *
	       * ```jsx
	       *   let App = React.createClass({
	       *       render: function () {
	       *         return (
	       *            <Draggable handle=".handle">
	       *              <div>
	       *                  <div className="handle">Click me to drag</div>
	       *                  <div>This is some other content</div>
	       *              </div>
	       *           </Draggable>
	       *         );
	       *       }
	       *   });
	       * ```
	       */
	      handle: _react.PropTypes.string,
	
	      /**
	       * `cancel` specifies a selector to be used to prevent drag initialization.
	       *
	       * Example:
	       *
	       * ```jsx
	       *   let App = React.createClass({
	       *       render: function () {
	       *           return(
	       *               <Draggable cancel=".cancel">
	       *                   <div>
	       *                     <div className="cancel">You can't drag from here</div>
	       *            <div>Dragging here works fine</div>
	       *                   </div>
	       *               </Draggable>
	       *           );
	       *       }
	       *   });
	       * ```
	       */
	      cancel: _react.PropTypes.string,
	
	      /**
	       * Called when dragging starts.
	       * If this function returns the boolean false, dragging will be canceled.
	       *
	       * Example:
	       *
	       * ```js
	       *  function (event, ui) {}
	       * ```
	       *
	       * `event` is the Event that was triggered.
	       * `ui` is an object:
	       *
	       * ```js
	       *  {
	       *    position: {top: 0, left: 0}
	       *  }
	       * ```
	       */
	      onStart: _react.PropTypes.func,
	
	      /**
	       * Called while dragging.
	       * If this function returns the boolean false, dragging will be canceled.
	       *
	       * Example:
	       *
	       * ```js
	       *  function (event, ui) {}
	       * ```
	       *
	       * `event` is the Event that was triggered.
	       * `ui` is an object:
	       *
	       * ```js
	       *  {
	       *    position: {top: 0, left: 0}
	       *  }
	       * ```
	       */
	      onDrag: _react.PropTypes.func,
	
	      /**
	       * Called when dragging stops.
	       *
	       * Example:
	       *
	       * ```js
	       *  function (event, ui) {}
	       * ```
	       *
	       * `event` is the Event that was triggered.
	       * `ui` is an object:
	       *
	       * ```js
	       *  {
	       *    position: {top: 0, left: 0}
	       *  }
	       * ```
	       */
	      onStop: _react.PropTypes.func,
	
	      /**
	       * A workaround option which can be passed if onMouseDown needs to be accessed,
	       * since it'll always be blocked (due to that there's internal use of onMouseDown)
	       */
	      onMouseDown: _react.PropTypes.func,
	
	      /**
	       * These properties should be defined on the child, not here.
	       */
	      className: _utilsShims.dontSetMe,
	      style: _utilsShims.dontSetMe,
	      transform: _utilsShims.dontSetMe
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      allowAnyClick: false, // by default only accept left click
	      cancel: null,
	      disabled: false,
	      enableUserSelectHack: true,
	      handle: null,
	      grid: null,
	      transform: null,
	      onStart: function onStart() {},
	      onDrag: function onDrag() {},
	      onStop: function onStop() {},
	      onMouseDown: function onMouseDown() {}
	    },
	    enumerable: true
	  }]);
	
	  return DraggableCore;
	})(_react2['default'].Component);
	
	exports['default'] = DraggableCore;
	module.exports = exports['default'];

	// When the user scrolls, adjust internal state so the draggable moves along the page properly.
	// This only fires when a drag is active.

	// On mousedown, consider the drag started.

	// Same as onMouseDown (start drag), but now consider this a touch device.

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = log;
	
	function log() {
	  if ((undefined)) console.log.apply(console, arguments);
	}
	
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;

},{"react":"react","react-dom":"react-dom"}],"/Users/cfricke/Workspace/baobab-fett/src/actions/SourceActions.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var setSource = function setSource(tree, store) {
    tree.set('source', store);
};
exports.setSource = setSource;

},{}],"/Users/cfricke/Workspace/baobab-fett/src/app.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsBaobabFett = require('./components/BaobabFett');

var _componentsBaobabFett2 = _interopRequireDefault(_componentsBaobabFett);

exports['default'] = _componentsBaobabFett2['default'];
module.exports = exports['default'];

},{"./components/BaobabFett":"/Users/cfricke/Workspace/baobab-fett/src/components/BaobabFett.js","react":"react"}],"/Users/cfricke/Workspace/baobab-fett/src/components/BaobabFett.js":[function(require,module,exports){
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

var _reactResizable = require('react-resizable');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _TreePanel = require('./TreePanel');

var _TreePanel2 = _interopRequireDefault(_TreePanel);

var _WatchPanel = require('./WatchPanel');

var _WatchPanel2 = _interopRequireDefault(_WatchPanel);

var _actionsSourceActions = require('../actions/SourceActions');

var BaobabFett = (function (_React$Component) {
    _inherits(BaobabFett, _React$Component);

    function BaobabFett(props, context) {
        _classCallCheck(this, _BaobabFett);

        _get(Object.getPrototypeOf(_BaobabFett.prototype), 'constructor', this).call(this, props, context);
        (0, _actionsSourceActions.setSource)(_store2['default'], this.props.store);
    }

    _createClass(BaobabFett, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'section',
                { ref: 'app', style: styles.body },
                _react2['default'].createElement(
                    _reactResizable.ResizableBox,
                    { className: 'resizable--large', width: 500, height: 300, minConstraints: [200, 300], maxContstrains: [800, 300] },
                    _react2['default'].createElement(_TreePanel2['default'], { ref: 'treePanel', style: styles.treePanel })
                ),
                _react2['default'].createElement(
                    _reactResizable.ResizableBox,
                    { className: 'resiable--small', width: 500, height: 300, minConstraints: [200, 300], maxContstrains: [800, 300] },
                    _react2['default'].createElement(_WatchPanel2['default'], { ref: 'watchPanel' })
                )
            );
        }
    }]);

    var _BaobabFett = BaobabFett;
    BaobabFett = (0, _baobabReactDecorators.root)(_store2['default'])(BaobabFett) || BaobabFett;
    return BaobabFett;
})(_react2['default'].Component);

var styles = {
    body: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 300,
        width: '100%'
    },
    treePanel: {
        borderRight: '1px solid #ccc',
        borderTop: '1px solid #ccc',
        height: '100%',
        paddingLeft: '1em',
        paddingTop: '.5em'
    }
};

exports['default'] = BaobabFett;
module.exports = exports['default'];

},{"../actions/SourceActions":"/Users/cfricke/Workspace/baobab-fett/src/actions/SourceActions.js","../store":"/Users/cfricke/Workspace/baobab-fett/src/store.js","./TreePanel":"/Users/cfricke/Workspace/baobab-fett/src/components/TreePanel.js","./WatchPanel":"/Users/cfricke/Workspace/baobab-fett/src/components/WatchPanel.js","baobab-react/decorators":"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/decorators.js","react":"react","react-resizable":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-resizable/index.js"}],"/Users/cfricke/Workspace/baobab-fett/src/components/Button.js":[function(require,module,exports){
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

var _reactJsonInspector = require('react-json-inspector');

var _reactJsonInspector2 = _interopRequireDefault(_reactJsonInspector);

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
            var _props = this.props;
            var source = _props.source;
            var style = _props.style;

            return _react2['default'].createElement(
                'div',
                { style: style },
                _react2['default'].createElement(_reactJsonInspector2['default'], { data: source })
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

},{"./Button":"/Users/cfricke/Workspace/baobab-fett/src/components/Button.js","baobab-react/decorators":"/Users/cfricke/Workspace/baobab-fett/node_modules/baobab-react/decorators.js","react":"react","react-json-inspector":"/Users/cfricke/Workspace/baobab-fett/node_modules/react-json-inspector/json-inspector.js"}],"/Users/cfricke/Workspace/baobab-fett/src/components/WatchPanel.js":[function(require,module,exports){
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

var WatchPanel = (function (_React$Component) {
    _inherits(WatchPanel, _React$Component);

    function WatchPanel() {
        _classCallCheck(this, WatchPanel);

        _get(Object.getPrototypeOf(WatchPanel.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(WatchPanel, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                'Watch Panel'
            );
        }
    }]);

    return WatchPanel;
})(_react2['default'].Component);

exports['default'] = WatchPanel;
module.exports = exports['default'];

},{"react":"react"}],"/Users/cfricke/Workspace/baobab-fett/src/store.js":[function(require,module,exports){
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


//# sourceMappingURL=devtools.js.map
