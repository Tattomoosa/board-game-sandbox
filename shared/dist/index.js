'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultObject = function defaultObject(id) {
  return {
    id: id,
    color: 'blue',
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    width: 100,
    height: 100,
    angle: 0,
    offsetX: 0,
    offsetY: 0
  };
};
exports.default = {
  // Don't want this to run until it's called because Vuex expects Vue.use(Vuex) before initializing the state
  Vuex: _vuex2.default,
  createStore: function createStore() {
    return new _vuex2.default.Store({
      state: {
        objects: [defaultObject(1)]
      }
    });
  }
};