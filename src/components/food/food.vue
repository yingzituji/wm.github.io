<template>
     <transition name="slide">
       <div v-show="showFlag" class="food-main" ref="food">
	  	<div class="food-content">
	  		<div class="image-header">
	  			<img :src="food.image" />
	  			<div class="back" @click="hide">
	  				<i class="icon-arrow_lift"></i>
	  			</div>
	  		</div>
	  		<div class="detail-content">
	  			<div class="food-title">{{food.name}}</div>
	  			<div class="food-detail">
	  				<span class="sell-count">月售{{food.sellCount}}份</span>
	  				<span class="rating">好评率{{food.rating}}%</span>
	  			</div>
	  			<div class="food-price">
	  				<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
	  			</div>
	  			<div class="cartcontrol-wrapper">
	  			  <cartcontrol :food="food"></cartcontrol>
	  			</div>
	  		    <transition name="fade">
	  		  	  <div class="buy" @click="addFirst" v-show="!food.count || food.count===0">加入购物车</div>
	  	    	</transition>
	  		</div>
	  		<split v-show="food.info"></split>
	  		<div class="info" v-show="food.info">
		  		<h1 class="title">商品信息</h1>
		  		<p class="text">{{food.info}}</p>
		  	</div>
		  	
		  	<split></split>
		  	<div class="rating">
	  			<h1 class="rating-title">商品评价</h1>
	  			<ratingselect @typeSelect="typeSelect" @contentOnly="contentOnly" :desc="desc" :ratings="food.ratings"></ratingselect>
	  			<div class="rating-wrapper">
	  			  <ul v-show="food.ratings && food.ratings.length">
	  				<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
	  				  <div class="user">
	  				    <span class="name">{{rating.username}}</span>
	  				    <img class="rating-avatar" width="12" height="12" :src="rating.avatar" />
	  				  </div>
	  				  <div class="time">{{rating.rateTime | formatDate}}</div>
	  				  <p class="rating-text">
	  					<span :class="{'icon-thumb_up':rating.rateType===0,	'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
	  				  </p>
	  			    </li>
	  			  </ul>
	  			<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
	  		 </div>
	  	   </div>
		  	
	  	</div>
	  </div>
	 </transition>
</template>

<script>
import BScroll from 'better-scroll';
import Vue from 'vue';
import cartcontrol from '../cartcontrol/cartcontrol';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import {formatDate} from '../../common/js/date';
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    food:{
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(()=>{
        if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.food,{
            click:true
          });
        }
        else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addFirst(event) {
      if(!event._constructed) {
        return;
      }
      this.$emit('cart-add', event.target);
      Vue.set(this.food,'count',1);
    },
    needShow(type,text) {
      if(this.onlyContent && !text) {
        return false;
      }
      if(this.selectType === ALL) {
        return true;
      }
      else {
        return type === this.selectType;
      }
    },
    contentOnly(data) {
      this.onlyContent = data;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    typeSelect(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    } 
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date,'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.food-main {
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	bottom: 48px;
	z-index: 30;
	background: #FFFFFF;		
	transform: translate3d(0,0,0);	
}
.slide-enter-active, 
.slide-leave-active {
    transition: all 0.2s linear;
}
.slide-enter, 
.slide-leave-to {
    transform: translate3d(100%,0,0);
}
.image-header {
	position: relative;
	width: 100%;
	height: 0;
	padding-top: 100%;
}
.image-header img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.back {
	position: absolute;
	top: 10px;
	left: 0;
}
.back .icon-arrow_lift {
	display: block;
	padding: 10px;
	font-size: 20px;
	color: #FFFFFF;
}
.detail-content {
    position: relative;
	padding: 18px;
	
}
.food-title {
	line-height: 14px;
	margin-bottom: 8px;
	font-size: 14px;
	font-weight: bold;
	color: rgb(7,17,27);
}
.food-detail {
	margin-bottom: 18px;
	line-height: 10px;
	height: 10px;
	font-size: 0;
}
.sell-count, .rating {
	font-size: 10px;
	color: rgb(147,153,159);
}
.sell-count {
	margin-right: 12px;
}
.food-price {
  font-weight: bold;
  line-height: 24px;
}
.food-price .now {
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240,20,20);
}
.food-price .old {
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147,153,159);
}
.cartcontrol-wrapper {
	position: absolute;
	right: 12px;
	bottom: 12px;
}
.buy {
	position: absolute;
	right: 12px;
	bottom: 18px;
	z-index: 10;
	height: 24px;
	line-height: 24px;
	padding: 0 12px;
	box-sizing: border-box;
	font-size: 10px;
	border-radius: 12px;
	color: #FFFFFF;
	background: rgb(0,160,220);
	opacity: 1;
}
.buy.fade-enter-active, 
.buy.fade-leave-active {
    transition: all 0.5s;
}
.buy.fade-enter, 
.buy.fade-leave-to {
    opacity: 0;
    background: rgb(0,160,220);
}
.info {
	padding: 18px;
}
.info .title {
	line-height: 14px;
	margin-bottom: 6px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.info .text {
	line-height: 24px;
	font-size: 12px;
	color: rgb(77,85,93);
	padding: 0 8px;
	display: block;
	width: 100%;
}
.info .text:after {
	display: none;
}
.rating {
	padding-top: 18px;
}
.rating-title {
	line-height: 14px;
	margin-bottom: 6px;
	margin-left: 18px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.info {
	padding: 18px;
}
.info .title {
	line-height: 14px;
	margin-left: 18px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.rating-wrapper {
	padding: 0 18px;
}
.rating-item {
	position: relative;
	padding: 16px 0;
	border-1px(rgba(7,17,27,0.1))
}
.user {
	position: absolute;
	right: 0;
	top: 16px;
	line-height: 12px;
	font-size: 0;
}
.user .name {
	display: inline-block;
	vertical-align: top;
	margin-right: 6px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.user .rating-avatar {
	border-radius: 50%;
}
.time {
	margin-bottom: 6px;
	line-height: 12px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.rating-text {
	line-height: 16px;
	font-size: 12px;
	color: rgb(7,17,27);
}
.icon-thumb_up, .icon-thumb_down {
	line-height: 16px;
	margin-right: 4px;
	font-size: 12px;
}
.icon-thumb_up {
	color: rgb(0,160,220);
}	
.icon-thumb_down {
	color: rgb(147,153,159);
}
.no-rating {
	padding: 16px 0;
	font-size: 12px;
	color: rgb(147,153,159);
}
</style>
