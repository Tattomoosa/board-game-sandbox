import Vuex from 'vuex'

let defaultObject = (id) => {
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
  }
}
export default {
  // Don't want this to run until it's called because Vuex expects Vue.use(Vuex) before initializing the state
  Vuex: Vuex,
  createStore() {
    return new Vuex.Store({
      state: {
        objects: [
          defaultObject(1),
          // defaultObject(2),
        ]
      }
    })
  },
}
