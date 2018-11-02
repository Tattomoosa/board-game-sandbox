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
		selected: false
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
				localSelectedPiece: state => {
					// let selectedPiece;
					for (let i = 0; i < state.pieces.length; i++) {
						if (state.pieces[i].selected == true) {
							return state.pieces[i]
						}
					}
				},
				pieceWithId: state => id => {
					for (let i = 0; i < state.pieces.length; i++) {
						if (state.pieces[i].id == id) {
							return state.pieces[i]
						}
					}
				}
			},
			mutations: {
				loadState (state, newPieces) {
					state.pieces = newPieces
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
						if (p.id == piece.id)
							state.pieces.splice(i, 1)
					}
				},
				selectPiece (state, piece) {
					for (let i = 0; i < state.pieces.length; i++) {
						let p = state.pieces[i]
						if (p !== null)
							if (p.id == piece.id)
								p.selected = true
							else
								p.selected = false
					}
				}
			},
		})
	}
}
