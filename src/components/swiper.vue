<template>
	<div class="swiper">
		<link rel="stylesheet" type="text/css" href="http://cdn.bootcss.com/Swiper/3.4.2/css/swiper.min.css" />
		<h3>swiper及基于swiper的刷新加载</h3>
		<link-component></link-component>
		<p><input type="button" value="动态改变slide++" @click="lists++" /></p>
		<p><input type="button" value="动态改变slide--" @click="lists--" /></p>
		<div class="swiper-w" style="float: left;">
			<swiper :options="swiperOption" ref="mySwiper">
				<!-- slides -->
				<swiper-slide v-for="n in lists">I'm Slide {{n}}</swiper-slide>
				<!-- Optional controls -->
				<div class="swiper-pagination" slot="pagination"></div>
				<div class="swiper-button-prev" slot="button-prev"></div>
				<div class="swiper-button-next" slot="button-next"></div>
				<!-- Add Scroll Bar -->
				<!--<div class="swiper-scrollbar" slot="scrollbar"></div>-->
			</swiper>
		</div>
		<div class="swiper-w" style="float: right;">
			<div class="refresh" v-if="refresh">释放刷新</div>
			<div class="load" v-if="load">释放加载更多</div>
			<div class="inrefresh" v-if="inrefresh">刷新中</div>
			<div class="inload" v-if="inload">加载中</div>
			<swiper :options="swiperScroll" ref="mySwiperScroll">
				<!-- slides -->
				<swiper-slide :style="{height: lists*100+'px'}">(上拉加载下拉刷新原型版)<br />height: {{lists*100}}px</swiper-slide>
				<!-- Add Scroll Bar -->
				<div class="swiper-scrollbar" slot="scrollbar"></div>
			</swiper>
		</div>
	</div>
</template>
<script>
	/*main.js引入swiper*/
	import Vue from 'vue';
	import VueAwesomeSwiper from 'vue-awesome-swiper';
	Vue.use(VueAwesomeSwiper);
	/* */
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'carrousel',
		data() {
			var v_this = this;
			return {
				lists: 5,
				isEnd: true,
				refresh: false,
				inrefresh: false,
				load: false,
				inload: false,
				swiperOption: {
					notNextTick: true,
					pagination: '.swiper-pagination',
					paginationClickable: true,
					prevButton: '.swiper-button-prev',
					nextButton: '.swiper-button-next',
					//direction: 'vertical',
					//scrollbar: '.swiper-scrollbar',
					mousewheelControl: true,
					observeParents: true,
				},
				swiperScroll: {
					notNextTick: true,
					direction: 'vertical',
					scrollbar: '.swiper-scrollbar',
					slidesPerView: 'auto',
					mousewheelControl: true,
					freeMode: true,
					//freeModeMomentumRatio: 2,
					//freeModeMomentumVelocityRatio: 3,
					onTouchMove: function(swiper) {
						if(swiper.height >= swiper.virtualSize + swiper.translate + 30 && v_this.isEnd) {
							//console.log(swiper)
							console.log('到底部以下了');
							v_this.load = true;

							v_this.isEnd = false;
						} else if(swiper.translate >= 30 && v_this.isEnd) {
							console.log('到顶部以上了');
							v_this.refresh = true;

							v_this.isEnd = false;
						}
					},
					onTouchEnd: function(swiper) {
						v_this.isEnd = true;
						v_this.load = false;
						v_this.refresh = false;
						if(swiper.height >= swiper.virtualSize + swiper.translate + 30) {
							//console.log(swiper)
							console.log('底部以下释放');
							v_this.inload = true;
							setTimeout(() => {
								v_this.inload = false;
							}, 1000)
						} else if(swiper.translate >= 30) {
							console.log('顶部以上释放');
							v_this.inrefresh = true;
							setTimeout(() => {
								v_this.inrefresh = false;
							}, 1000)
						}
					}
				},
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		computed: { // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
			//swiper() {
			//	return this.$refs.mySwiper.swiper
			//}
		},
		mounted() {
			console.log(this.swiperOption)
			//然后你就可以使用当前上下文内的swiper对象去做你想做的事了
			//console.log('this is current swiper instance object', this.swiper)
			//this.swiper.slideTo(3, 1000, false)
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.swiper-w {
		width: 45%;
		position: relative;
	}
	
	.refresh {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
	}
	
	.inrefresh {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 9;
	}
	
	.load {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 9;
	}
	
	.inload {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 9;
	}
	
	.swiper-slide {
		border: 1px #CCCCCC dashed;
	}
	
	.swiper-container {
		height: 300px;
		border: 1px #000 dashed;
	}
	
	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;
		/* Center slide text vertically */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.swiper-wrapper {
		height: 100px;
	}
</style>