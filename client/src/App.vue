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
		this.$io.on('init client', newState => {
			console.log('loading state from server')
			this.$store.commit('loadState', newState)
			this.$io.on('create piece', data => {
				this.$store.commit('createPiece', data)
			})
			this.$io.on('delete piece', data => {
				this.$store.commit('deletePiece', data)
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
