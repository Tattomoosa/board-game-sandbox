<template>
	<div v-if="obj != null">
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
    :selectOn="'mousedown'"
    :selected="locallySelected"
    @onSelect="localSelect(obj.id, $event)"
    @update="localUpdate(obj.id, $event)"
		>
    <div class="element"
    :style="{width: obj.width + 'px', height: obj.height + 'px', background: obj.color}">
        <img
        v-if="obj.image"
        :src="obj.image"
        :style="{backgroundSize: obj.backgroundSize}">
        </img>
        <div class="debug">
          {{ obj.id }} <br/>
          {{ selectedBy(obj.id) }}
        </div>
			</div>
		</FreeTransform>
	</div>
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
	computed: {
		obj() {
      let obj = {...this.$store.state.pieces[this.$props.index]}
      obj.x = parseInt(obj.x)
      obj.y = parseInt(obj.y)
      obj.scaleX = parseFloat(obj.scaleX)
      obj.scaleY = parseFloat(obj.scaleY)
      obj.width = parseInt(obj.width)
      obj.height = parseFloat(obj.height)
      obj.angle = parseFloat(obj.angle)
      obj.offsetX = parseInt(obj.offsetX)
      obj.offsetY = parseInt(obj.offsetY)
      return obj;
		},
    locallySelected() {
      return this.$store.state.client.selected[0] == this.obj.id
    }
	},
  props: {
		index: Number,
    object: Object,
  },
  methods: {
    update(e) {
      // this.obj = { ...this.obj, ...e }
			this.$store.commit('setPiece', { ...this.obj, ...e })
    },
    localUpdate(id, e) {
      this.update(e)
      this.$io.emit('edited', {id: this.obj.id, ...e})
    },
    serverUpdate(e) {
      // console.log({1: e.id, 2: this.obj.id})
      if (e.id === this.obj.id)
        this.update(e)
    },
		localSelect(id, e) {
			this.$store.commit('client/selectPiece', {id: this.obj.id, ...e})
			this.$store.commit('selectPiece', {
				clientId: this.$store.state.client.id,
				pieceId: this.obj.id
			})
			this.$io.emit('select piece', {
				clientId: this.$store.state.client.id,
				pieceId: this.obj.id
			})
		},
		selectedBy() {
			let id = this.$store.getters.pieceIsSelectedBy( this.obj.id )
			if (this.$store.state.users[id])
				return this.$store.state.users[id].name
			return false
		}
  }
}
</script>
<style lang="scss">

$size : 12px;
$padding : $size/2;

img {
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  position: absolute;
}

.debug {
  position: absolute;
  background: rgba(black,0.6);
  color: white;
}

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
        background: rgba(255, 255, 255, 0.8);
        width: $size;
        height: $size;
        border-radius: 50%;
        position: absolute;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        // border: 1px solid rgba(255, 255, 255, 0.4);
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
		.tr-transform__controls {
			cursor: move;
		}
</style>
