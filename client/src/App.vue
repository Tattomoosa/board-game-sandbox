<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="piece" v-for="(obj, index) in $store.state.objects" :key="index">
      <Piece :object="obj" />
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
    // console.log(this.$store.state)
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
