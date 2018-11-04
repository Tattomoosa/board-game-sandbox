import Vue from 'vue'

// UNUSED

export default {
  namespaced: true,
  state: [],
}

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
		remoteSelected: false,
	}
}
