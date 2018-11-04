<template>
  <div id="app">
		<input type="button" v-on:click="createPiece" value="+"></input>
		<input type="button" v-on:click="deletePiece" value="x"></input>
    <div class="piece" v-for="(piece, index) in $store.state.pieces" :key="index">
      <!-- <Piece :object="obj" /> -->
      <Piece :object="piece" :index="index" />
    </div>
    <Chat />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Chat from './components/Chat.vue'
import Piece from './components/Piece.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld,
    Chat,
    Piece
  },
  mounted() {
		this.$io.emit('ready')
		this.$io.on('init client', data => {
			console.log('loading state from server')
			this.$store.commit('loadPieces', data.pieces)
			this.$store.commit('loadMessages', data.messages)
			this.$store.commit('updateUsers', data.users)
			// this.$store.commit('setLocalUser', data.clientId)
			// this.$store.commit('setID', data.clientId)
      this.$store.dispatch('client/setID', data.clientId)

			// set up server message responses.
			this.$io.on('user connected', users => {
				this.$store.commit('updateUsers', users)
			})
			this.$io.on('user disconnected', users => {
				this.$store.commit('updateUsers', users)
			})
			// TODO: move these to some other place ('Board', 'Workspace'?)
			this.$io.on('create piece', data => {
				this.$store.commit('createPiece', data)
			})
			this.$io.on('delete piece', data => {
				this.$store.commit('deletePiece', data)
        // This fixes a strange rotation bug but there's probably a better way
        // TODO: find the better way
        if (this.$store.state.pieces.length < 1)
          this.$io.emit('send message', {message: '\\resetclient'})
			})
			this.$io.on('select piece', data => {
				this.$store.commit('selectPiece', data)
			})
			this.$io.on('reset client', data => {
				this.$store.commit('loadPieces', data.pieces)
				this.$store.commit('loadMessages', data.messages)
				this.$store.commit('updateUsers', data.users)
			})
		})
  },
	methods: {
		createPiece() {
			this.$io.emit('create piece')
		},
		deletePiece() {
			let selectedPiece = this.$store.getters.localSelectedPiece
			// this.$store.commit('deletePiece', selectedPiece)
			this.$io.emit('delete piece', selectedPiece)
		}
	}
}
</script>

<style lang="scss">
@import './node_modules/css-reset-and-normalize/scss/reset-and-normalize';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  // box-sizing: border-box;
}
</style>
