<template>
  <div id="app">
    <input type="button" v-on:click="createPiece" value="+"></input>
    <input type="button" v-on:click="deletePiece" value="x"></input>
		<WorkArea />
		<!--
    <div v-for="(piece, index) in $store.state.pieces" :key="index">
      <Piece :object="piece" :index="index" />
    </div>
		-->
    <Chat active-width="300px" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Chat from './components/Chat.vue'
// import Piece from './components/Piece.vue'
import WorkArea from './components/WorkArea.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld,
    Chat,
		WorkArea,
    // Piece
  },
  mounted() {
    this.$io.emit('ready')
    // TODO destructure data?
    this.$io.on('init client', data => {
      console.log('loading state from server')
      this.$store.dispatch('client/init', { ...data, io: this.$io  })

      // set up server message responses.
      this.$io.on('user connected', users => {
        this.$store.commit('loadUsers', users)
      })
      this.$io.on('user disconnected', users => {
        this.$store.commit('loadUsers', users)
      })
      // TODO: move this to some other place ('Board', 'Workspace'?)
      this.$io.on('create piece', data => {
        this.$store.commit('createPiece', data)
      })
      // TODO: move this to some other place ('Board', 'Workspace'?)
      this.$io.on('delete piece', data => {
        this.$store.commit('deletePiece', data)
        // This fixes a strange rotation bug but there's probably a better way
        // TODO: find the better way
        if (this.$store.state.pieces.length < 1)
          this.$io.emit('send message', { message: '\\resetclient' })
      })
      this.$io.on('select piece', data => {
        console.log('app.vue: ', data)
        this.$store.commit('selectPiece', data)
      })
      this.$io.on('reset client', data => {
        this.$store.dispatch('client/reset', data)
      })
    })
  },
  methods: {
    createPiece() {
      this.$io.emit('create piece')
    },
    deletePiece() {
      let selectedPiece = this.$store.getters['client/selectedPiece']
      console.log(selectedPiece)
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
