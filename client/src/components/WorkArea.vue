<template>
		<div class="workarea">
				<div class="scrollarea"
				 v-on:click="dragscroll()"
				 style="{ left : scroll.x, top : scroll.y }"
		 >
		 <Piece v-for="(piece, index) in $store.state.pieces" :key="index" :object="piece" :index="index" />
				</div>
		</div>
</template>

<script>
import Piece from './Piece.vue'
export default {
		name: 'WorkArea',
		data() {
				return {
						scroll: {
								x: 50,
								y: 50
						}
				}
		},
		components: {
				Piece
		},
		mounted() {
				/*
				this.$io.on('edited', data => {
						// this.serverUpdate(data)
						this.$store.commit('setPiece', data)
				})
				*/
		},
		methods: {
				dragscroll() {
						console.log('TODO: Make scrolling work!')
				}
		}
}
</script>

<style>
.workarea {
		position: absolute;
		width: calc(100% - 300px);
		height: 500px;
		background: #237;
		overflow: scroll;
}

.scrollarea {
		width: 200%;
		height: 200vh;
		position: absolute;
}
</style>
