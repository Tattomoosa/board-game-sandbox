<template>
  <FreeTransform
    :id="obj.id"
    :x="obj.x"
    :y="obj.y"
    :scale-x="obj.scaleX"
    :scale-y="obj.scaleY"
    :width="obj.width"
    :height="obj.height"
    :angle="obj.angle"
    :offset-x="obj.offsetX"
    :offset-y="obj.offsetY"
    @update="localUpdate(obj.id, $event)"
  >
    <div class="element" :style="{width: `100px`, height: `100px`, background: `red`}">
      {{ obj.id }}
    </div>
  </FreeTransform>
</template>
<script>
import FreeTransform from 'vue-free-transform'
export default {
  name: 'piece',
  components: {
    FreeTransform
  },
  mounted() {
    this.$io.on('edited', data => {
      this.serverUpdate(data)
    })
  },
  data() {
    // this gon have to change.
    // probably have store pass an object right in
    // from up above
    return {
      obj: {
        id: 1,
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
  },
  props: {
    object: Object
  },
  methods: {
    update(e) {
      this.obj = { ...this.obj, ...e }
    },
    localUpdate(id, e) {
      this.update(e)
      // ok so it got unhappy about me sending this.obj.id
      // but apparently ...this.obj.id works just fine.
      // didn't even know you could use spread syntax like that.
      this.$io.emit('edited', {id: this.obj.id, ...e})
    },
    serverUpdate(e) {
      console.log({1: e.id, 2: this.obj.id})
      if (e.id === this.obj.id)
      {
        // console.log('dragging ' + e.id)
        this.update(e)
      }
    }
  }
}
</script>
<style lang="scss">

$size : 12px;
$padding : $size/2;

    .tr-transform--active{
        position: absolute;
        z-index: 5;
    }
    .tr-transform__content{
        user-select: none;
    }
    .tr-transform__rotator {
        top: -45px;
        left: calc(50% - 7px);
    }

    .tr-transform__rotator,
    .tr-transform__scale-point {
        background: #fff;
        width: $size;
        height: $size;
        border-radius: 50%;
        position: absolute;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(0, 0, 0, 0.2);
        cursor: pointer;
    }

    .tr-transform__rotator:hover,
    .tr-transform__scale-point:hover {
        background: #ccc;
    }

    .tr-transform__rotator:active,
    .tr-transform__scale-point:active {
        background: #ccc;
    }

    .tr-transform__scale-point {

    }

    .tr-transform__scale-point--tl {
        top: -7px;
        left: -7px;
    }

    .tr-transform__scale-point--ml {
        top: calc(50% - 7px);
        left: -7px;
    }

    .tr-transform__scale-point--tr {
        left: calc(100% - 7px);
        top: -7px;
    }

    .tr-transform__scale-point--tm {
        left: calc(50% - 7px);
        top: -7px;
    }

    .tr-transform__scale-point--mr {
        left: calc(100% - 7px);
        top: calc(50% - 7px);
    }

    .tr-transform__scale-point--bl {
        left: -7px;
        top: calc(100% - 7px);
    }

    .tr-transform__scale-point--bm {
        left: calc(50% - 7px);
        top: calc(100% - 7px);
    }

    .tr-transform__scale-point--br {
        left: calc(100% - 7px);
        top: calc(100% - 7px);
    }
</style>
