"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = _interopRequireDefault(require("vuex"));

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Spread operator isn't working TODO check if this is fixed now
var defaultPiece = function defaultPiece(o) {
  return {
    id: o.id,
    color: o.color || 'grey',
    x: o.x || 0,
    y: o.y || 0,
    scaleX: o.scaleX || 1,
    scaleY: o.scaleY || 1,
    width: o.width || 100,
    height: o.height || 100,
    angle: o.angle || 0,
    offsetX: o.offsetX || 0,
    offsetY: o.offsetY || 0,
    selected: false
  };
};

var _default = {
  // Don't want this to run until it's called because Vuex expects Vue.use(Vuex) before initializing the state
  Vuex: _vuex.default,
  Vue: _vue.default,
  createStore: function createStore() {
    return new _vuex.default.Store({
      state: {
        pieces: [],
        activeUsers: {
          /*
           * [socket id] : {
           *		id:
           *		name:
           *		etc...
           * }
           *
          */
        }
      },
      getters: {
        localSelectedPiece: function localSelectedPiece(state) {
          // let selectedPiece;
          for (var i = 0; i < state.pieces.length; i++) {
            if (state.pieces[i].selected == true) {
              return state.pieces[i];
            }
          }
        },
        pieceWithId: function pieceWithId(state) {
          return function (id) {
            for (var i = 0; i < state.pieces.length; i++) {
              if (state.pieces[i].id == id) {
                return state.pieces[i];
              }
            }
          };
        }
      },
      mutations: {
        loadState: function loadState(state, newPieces) {
          state.pieces = newPieces;
        },
        setPiece: function setPiece(state, newPiece) {
          _vue.default.set(state.pieces, newPiece.id, newPiece);
        },
        createPiece: function createPiece(state, piece) {
          console.log('creating piece');
          state.pieces.push(defaultPiece({
            id: state.pieces.length
          }));
        },
        deletePiece: function deletePiece(state, piece) {
          for (var i = 0; i < state.pieces.length; i++) {
            var p = state.pieces[i];
            if (p.id == piece.id) state.pieces.splice(i, 1);
          }
        },
        selectPiece: function selectPiece(state, piece) {
          for (var i = 0; i < state.pieces.length; i++) {
            var p = state.pieces[i];
            if (p !== null) if (p.id == piece.id) p.selected = true;else p.selected = false;
          }
        }
      }
    });
  }
};
exports.default = _default;