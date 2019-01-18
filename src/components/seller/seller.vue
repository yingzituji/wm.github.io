<template>
  <div class="seller" ref="seller">
	  <div class="seller-content">
	    <div class="seller-message seller-info-style">
	      <div class="message">
	        <h2 v-text="seller.name"></h2>
	        <star :score='seller.score' :size='36' /> 
	        <span class="message-span">({{seller.ratingCount}})</span>
	        <span class="message-span">月售{{seller.sellCount}}单</span>
	      </div>
	      
	      <!--<div class="mind">
	        <div class="mind-icon">♥</div>
	        <div class="mind-descript">已收藏</div>
	      </div>-->
	      
	      <div class="favorite" @click="toggleFavorite">
   			<span class="icon-favorite" :class="{'active':favoriteText==='已收藏'}"></span>
   			<span class="icon-text">{{favoriteText}}</span>
  	 	  </div>
	      
	    </div>
	    <div class="seller-info-style">
	      <div class="score-box">
	        <div class="score-item">
	          <span class="data-title">起送价</span>
	          <div class="seller-data">{{seller.minPrice}}<span class="small-word">元</span></div>
	        </div>
	        <div class="score-item score-border">
	          <span class="data-title">商家配送</span>
	          <div class="seller-data">{{seller.deliveryPrice}}<span class="small-word">元</span></div>
	        </div>
	        <div class="score-item">
	          <span class="data-title">平均配送时间</span>
	          <div class="seller-data">{{seller.deliveryTime}}<span class="small-word">分钟</span></div>
	        </div>
	      </div>
	     </div>
	
	    <div class="seller-deils seller-info-style">
	      <h2>公告与活动</h2>
	      <p v-text="seller.bulletin"></p>
	      <div class="seller-deils-item" v-for="(item,index) in seller.supports">
	        <i class="type" :class='"type"+item.type'></i>
	        <span v-text="item.description"></span>
	      </div>
	    </div>
	
	    <div class="live-action seller-info-style">
	      <h2>商家实景</h2>
	      <div class="live-imgs">
	        <div class="live-action-item" v-for="(item,index) in seller.pics">
	          <img :src="item" />
	        </div>
	      </div>
	    </div>
	
	    <div class="seller-info seller-info-style">
	      <h2>商家信息</h2>
	      <div class="info-item" v-for="(item,index) in seller.infos" v-text="item"></div>
	    </div>
    </div>
  </div>
</template>

<script>
import {urlParse} from '../../common/js/util';
import {saveToLocal,loadFromLocal} from '../../common/js/store';
import BScroll from 'better-scroll';
import split from '../split/split';
import star from "../star/star";
export default {
  props: {
    seller: {
      type: Object,
      default() {
        return [
          {
            id: (() => {
	          let queryParam = urlParse();
	          //console.log(queryParam);
	          return queryParam.id;
	        })()
          }
        ];
      }
    }
  },
  data() {
    return {
      /*seller: {
        id: (() => {
          let queryParam = urlParse();
          console.log(queryParam);
          return queryParam.id;
        })()
      },*/
      scrollY: 0,
      /*favorite: false*/
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  computed: {
    favoriteText() {
      return this.favorite?'已收藏':'未收藏';
    }
  },
  components: {
    star
  },
  created() {
    this.seller=this.$store.getters.getSellerData;
    this.$nextTick(()=>{
        if(!this.scroll) {
          //初始化scroll区域
          this.scroll = new BScroll(this.$refs.seller,{
            click:true
          });
        }
        else {
          this.scroll.refresh();
        }
    });
  },
  methods: {
    toggleFavorite(event) {
      if(!event._constructed){
        return;
      }
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
      //localStorage.favorite = this.favorite;
    }
  }
};
</script>

<style>
.seller{
  background-color: #F3F5F7;
  top: 175px;
  bottom: 47px;
  position: absolute;
  width: 100%;
  /*overflow-y: auto;*/
  overflow: hidden;
}
.seller h2{
  font-size: 14px;
  color: rgb(7,17,27);
  margin-bottom: 8px;
  font-weight: 800;
}
.seller-info-style{
  padding: 18px 18px 0 18px;
  background-color: #fff;
}
.message .message-span{
  font-size: 10px;
  color:rgb(77,85,93);
  margin-left: 8px
}
.mind{
  text-align: center;
}
.mind-icon{
  font-size: 24px;
  color: rgb(240,20,20);
}
.mind-descript{
  margin-top: 4px;
  font-size: 10px;
  color: rgb(77,85,93);
}
.seller-message {
  display: flex;
  margin-top: 1px;
}
.message {
  flex: .9;
}
.mind {
  flex: .1;
}
.score-box {
  flex: 1;
}
.score-box{
  border-top: 1px solid rgba(7,17,27,.1);
  margin: 18px 18px 0 18px;
  padding: 18px 0;
  border-width: 80%;
  display: flex;
}
.score-item{
  flex: .35;
  text-align: center;
}
.data-title{
  font-size: 10px;
  color:rgb(147,153,159);
}
.seller-data{
  font-size: 24px;
  margin-top: 6px;
  font-weight: 200;
}
.small-word{
  font-size: 10px;
}
.score-border{
  border-left: 1px solid rgba(7,17,27,.1);
  border-right: 1px solid rgba(7,17,27,.1);
}
.seller-deils{
  margin-top: 20px;
  padding-bottom: 16px;
}
.seller-deils>p{
  font-size: 12px;
  font-weight: 200;
  color: #595757;
  line-height: 24px;
}
.type{
  background-size: 100% 100%;
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: top;
  background-position: center;
  background-repeat: no-repeat;
}
.type0{
  background-image: url("./decrease_3@2x.png");
}
.type1{
  background-image: url("./discount_3@2x.png");
}
.type2{
  background-image: url("./special_3@2x.png");
}
.type3{
  background-image: url("./invoice_3@2x.png");
}
.type4{
  background-image: url("./guarantee_3@2x.png");
}
.seller-deils-item{
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(7,17,27,.1);
  font-size: 12px;
  font-weight: 200;
  color:rgb(7,17,27);
  line-height: 16px;
}
.live-action {
 overflow: hidden; 
 margin-top: 20px;
 padding-bottom: 16px;
}
.live-imgs{
  overflow-y: hidden;
  overflow-x: auto;
  max-height: 200px;
  width: auto;
  white-space:nowrap;
}
.live-action-item:nth-child(1){
  margin-left: 0px;
}
.live-action-item{
  display: inline;
  margin-left: 6px;
  white-space: nowrap;
}
.seller-info{
  margin-top: 20px;
}
.info-item{
  padding:16px 12px;
  border-top: 1px solid rgba(7,17,27,.1) ;
}

.favorite{
	position: absolute;
	right: 18px;
	top: 18px;
	text-align: center;
}
.icon-favorite{
	display: block;
	color: #d4d6d9;
	font-size: 24px;
	line-height: 24px;
}
.favorite .active{
	color: rgb(240,20,20);
}
.icon-text{
	line-height: 10px;
	font-size: 10px;
	color: rgb(77,25,93);
}
.star-box{
    margin-left: 0;
}
</style>
