import Vuex from 'vuex'
import Vue from 'vue'

// Spread operator isn't working TODO check if this is fixed now
let defaultPiece = (o) => {
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
		remoteSelected: false,
	}
}

let defaultUser = (o) => {
	return {
		name: o.name || 'guest' + Math.floor(Math.random() * 1000),
		id: o.id
	}
}

export default {
	// Don't want this to run until it's called because Vuex expects Vue.use(Vuex) before initializing the state
	Vuex: Vuex,
	Vue: Vue,
	createStore() {
		return new Vuex.Store({
			state: {
				pieces: [
				],
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
				localSelectedPiece: state => {
					for (let i = 0; i < state.pieces.length; i++)
						if (state.pieces[i].selected == true)
							return state.pieces[i]
				},
				pieceWithId: state => id => {
					for (let i = 0; i < state.pieces.length; i++)
						if (state.pieces[i])
							if (state.pieces[i].id == id)
								return state.pieces[i]
				},
				currentUser: state => {
					return state.users[localUser]
				}
			},
			mutations: {
				loadPieces (state, newPieces) {
					state.pieces = newPieces
				},
				loadMessages (state, messages) {
					state.messages = []
					Vue.set(state, 'messages', messages)
				},
				setLocalUser (state, clientId) {
					Vue.set(state, 'localUser', clientId)
				},
				updateUsers (state, users) {
					Vue.set(state,'users', users)
				},
				addUser (state, userSocketId) {
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
					let user = defaultUser({
						id: userSocketId,
					})
					console.log('user ' + userSocketId + ' added to list of users')
					Vue.set(state.users, userSocketId, user)
				},
				changeUsername (state, { name, clientId } ) {
					console.log(clientId)
					let user = state.users[clientId]
					if (user) {
						let previousName = user.name || '[ no previous name ]'
						// state.users[clientId].name = name
						// Vue.set(state.users[clientId], 'name', name)
						Vue.set(user, 'name', name)
						console.log(previousName + ' is now known as ' + user.name)
					} else {
						console.log('user with id ' + clientId + ' does not exist')
					}
				},
				removeUser (state, userSocketId) {
					Vue.delete(state, userSocketId)
				},
				setPiece (state, newPiece) {
					Vue.set(state.pieces, newPiece.id, newPiece)
				},
				createPiece (state, piece) {
					console.log('creating piece')
					state.pieces.push(defaultPiece(
						{ id: state.pieces.length }
					))
				},
				deletePiece (state, piece) {
					for (let i = 0; i < state.pieces.length; i++) {
						let p = state.pieces[i]
						if (p != null)
							if (p.id == piece.id)
								state.pieces.splice(i, 1)
					}
				},
				selectPiece (state, piece) {
					for (let i = 0; i < state.pieces.length; i++) {
						let p = state.pieces[i]
						if (p != null)
							if (p.id == piece.id)
								p.selected = true
							else
								p.selected = false
					}
				},
				addMessage (state, message) {
					state.messages.push(message)
				},
			},
		})
	}
}
