<template>
    <div class="ratings" ref="ratings">
	  	<div class="ratings-content">
	  		<div class="overview">
	  			<div class="overview-left">
	  				<h1 class="score">{{seller.score}}</h1>
	  				<div class="ratings-title">综合评分</div>
	  				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
	  			</div>
	  			<div class="overview-right">
	  				<div class="score-wrapper">
	  					<span class="ratings-title">服务态度</span>
	  					<star :size="36" :score="seller.serviceScore"></star>
	  					<span class="rate-score">{{seller.serviceScore}}</span>
	  				</div>
	  				<div class="score-wrapper">
	  					<span class="ratings-title">商品评分</span>
	  					<star :size="36" :score="seller.foodScore"></star>
	  					<span class="rate-score">{{seller.foodScore}}</span>
	  				</div>
	  				<div class="delivery-wrapper">
	  					<span class="ratings-title">送达时间</span>
	  					<span class="delivery">{{seller.deliveryTime}}分钟</span>
	  				</div>
	  			</div>
	  		</div>
	  		<split></split>
	  		<ratingselect @typeSelect="typeSelect" @contentOnly="contentOnly" :desc="desc" :ratings="ratings"></ratingselect>
	  		<div class="ratings-wrapper">
	  		  <ul>
			  	<li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px">
			  		<div class="ratings-avatar">
			  			<img width="28" height="28" :src="rating.avatar" />
			  		</div>
			  		<div class="content">
			  			<h1 class="name">{{rating.username}}</h1>
			  			<div class="star-wrapper">
			  				<star :size="24" :score="rating.score"></star>
			  				<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>	  				
			  			</div>
			  			<p class="ratings-text">{{rating.text}}</p>
			  			<div class="recommend" v-show="rating.recommend.length"></div>
			  			<span class="icon-thumb_up"></span>
			  			<span class="item" v-for="item in rating.recommend">{{item}}</span>
			  			<div class="time">{{rating.rateTime | formatDate}}</div>
			  		</div>  		
			  	</li>
			  </ul>  
	  		</div>
	  	</div>
	 </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '../star/star';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import {formatDate} from '../../common/js/date';
const ALL = 2;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
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
  created() {
    this.ratings = this.$store.getters.getRatingsData;
    this.$nextTick(()=>{
        if(!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratings,{
            click:true
          });
        }
        else {
          this.scroll.refresh();
        }
    });
  },
  methods: {
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
    } 
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date,'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    star,
    split,
    ratingselect
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.ratings {
	position: absolute;
	top: 174px;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
}
.overview {
	display: flex;
	padding: 18px 0;
}
.overview-left {
	flex: 0 0 137px;
	width: 137px;
	border-right: 1px solid rgba(7,17,27,0.1);
	text-align: center;
	padding: 6px 0;
}
.overview-right {
	flex: 1;
	padding: 6px 0 6px 24px;
}
.score {
	line-height: 28px;
	font-size: 24px;
	color: rgb(255,153,0);
	margin-bottom: 6px;
}
.ratings-title {
	line-height: 12px;
	font-size: 12px;
	color: rgb(7,17,27);
	margin-bottom: 8px;
}
.rank {
	line-height: 10px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.score-wrapper {
	margin-bottom: 8px;
	font-size: 0;
}
.ratings-title {
	display: inline-block;
	vertical-align: top;
	font-size: 12px;
	line-height: 18px;
	color: rgb(7,17,27);
}
.star-box {
	margin-left: 10px;
}
.star {
	display: inline-block;
	vertical-align: top;
	margin: 0;
}
.rate-score {
	display: inline-block;
	vertical-align: top;
	font-size: 12px;
	color: rgb(255,153,0);	
	line-height: 18px;
	margin-left: 10px;
}
.delivery-wrapper {
	font-size: 0;
}
.delivery-wrapper .ratings-title {
  vertical-align: middle;
}
.delivery {
	font-size: 12px;
	color: rgb(147,153,159);
	margin-left: 12px;
}
.ratings-wrapper {
	padding: 0 18px;
}
.rating-item {
	display: flex;
	padding: 18px 0;
	border-1px(rgba(7,17,27,0.1))
}
.ratings-avatar {
	flex: 0 0 28px;
	margin-right: 12px;
}
.ratings-avatar img {
    width: 28px;
	height: 28px;
	border-radius: 50%;
}
.ratings-wrapper .content {
	position: relative;
	flex: 1;
}
.ratings-wrapper .content .name {
	margin-bottom: 4px;
	font-size: 10px;
	line-height: 12px;
	color: rgb(7,17,27);	
}
.star-wrapper {
	margin-bottom: 6px;
	font-size: 0;
}
.star-wrapper .star-box {
  margin-left: 0;
}
.star-wrapper .star {
	display: inline-block;
	margin-right: 6px;
	vertical-align: top;
}
.star-wrapper .delivery {
	display: inline-block;
	vertical-align: top;
}
.ratings-text {
	line-height: 18px;
	color: rgb(7,17,27);	
	font-size: 12px;
	margin-bottom: 8px;
}
.ratings-wrapper .recommend {
	line-height: 16px;
	font-size: 0;
}
.ratings-wrapper .icon-thumb_up,.content .item {
	display: inline-block;
	margin: 0 8px 4px 0;
	font-size: 9px;
}
.ratings-wrapper .icon-thumb_up {
	color: rgb(0,160,220);
}
.content .item {
	padding: 0 6px;
	border: 1px solid rgba(7,17,27,0.1);
	border-radius: 1px;
	color: rgb(147,153,159);
	background: #FFFFFF;
}
.ratings-wrapper .time {
	position: absolute;
	top: 0;
	right: 0;
	font-size: 10px;
	line-height: 12px;
	color: rgb(147,153,159);
}
@media only screen and (max-width:320px) {
  .overview-left {
    flex: 0 0 120px;
    width: 120px;
  }
  .overview-right {
    padding-left: 6px;
  }
  .star-36 .star {
    margin-left: 5px;
  }
}
</style>
