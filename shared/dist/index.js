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
    selected: false,
    image: null,
    // for later
    remoteSelected: false
  };
};

var defaultUser = function defaultUser(o) {
  return {
    name: o.name || 'guest' + Math.floor(Math.random() * 1000),
    id: o.id
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
        users: {
          /*
           * [socket id] : {
           *		id:
           *		name:
           * }
           *
          */
        },
        messages: [
          /*
           * {
           *		socketID: user's socket id
           *		message: message contents
           * }
           *
          */
        ],
        // only used locally, maybe belongs in module
        // TODO change at least to localID or clientID
        localUser: null // socketID

      },
      getters: {
        localSelectedPiece: function localSelectedPiece(state) {
          for (var i = 0; i < state.pieces.length; i++) {
            if (state.pieces[i].selected == true) return state.pieces[i];
          }
        },
        pieceWithId: function pieceWithId(state) {
          return function (id) {
            for (var i = 0; i < state.pieces.length; i++) {
              if (state.pieces[i]) if (state.pieces[i].id == id) return state.pieces[i];
            }
          };
        },
        currentUser: function currentUser(state) {
          return state.users[localUser];
        }
      },
      mutations: {
        loadPieces: function loadPieces(state, newPieces) {
          state.pieces = newPieces;
        },
        loadMessages: function loadMessages(state, messages) {
          state.messages = [];

          _vue.default.set(state, 'messages', messages);
        },
        setLocalUser: function setLocalUser(state, clientId) {
          _vue.default.set(state, 'localUser', clientId);
        },
        updateUsers: function updateUsers(state, users) {
          _vue.default.set(state, 'users', users);
        },
        addUser: function addUser(state, userSocketId) {
          /*
          state.users[userSocketId] = {
          name: 'guest',
          id: userSocketId
          }
          */

          /*
          Vue.set(state.users, userSocketId, {
          	name: 'guest',
          	id: userSocketId
          })
          */
          var user = defaultUser({
            id: userSocketId
          });
          console.log('user ' + userSocketId + ' added to list of users');

          _vue.default.set(state.users, userSocketId, user);
        },
        changeUsername: function changeUsername(state, _ref) {
          var name = _ref.name,
              clientId = _ref.clientId;
          console.log(clientId);
          var user = state.users[clientId];

          if (user) {
            var previousName = user.name || '[ no previous name ]'; // state.users[clientId].name = name
            // Vue.set(state.users[clientId], 'name', name)

            _vue.default.set(user, 'name', name);

            console.log(previousName + ' is now known as ' + user.name);
          } else {
            console.log('user with id ' + clientId + ' does not exist');
          }
        },
        removeUser: function removeUser(state, userSocketId) {
          _vue.default.delete(state, userSocketId);
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
            if (p != null) if (p.id == piece.id) state.pieces.splice(i, 1);
          }
        },
        selectPiece: function selectPiece(state, piece) {
          for (var i = 0; i < state.pieces.length; i++) {
            var p = state.pieces[i];
            if (p != null) if (p.id == piece.id) p.selected = true;else p.selected = false;
          }
        },
        addMessage: function addMessage(state, message) {
          state.messages.push(message);
        }
      }
    });
  }
};
exports.default = _default;