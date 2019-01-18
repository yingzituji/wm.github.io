<template>
  <div>
    <div class="shopcart"> 
      <div class="content" @click="toggleList">	    
	    <div class="content-left">
		  <div class="logo-wrapper">
			<div class="logo" :class="{'highlight':totalCount>0}">
			  <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
			</div>
			<div class="num" v-show="totalCount>0">{{totalCount}}</div>
		  </div>
		  <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}元</div>
		  <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
	    </div>
		<div class="content-right" @click.stop.prevent="pay">
		  <div class="pay" :class="payClass">
		  {{payDesc}}
		  </div>
		</div>		
	  </div>
	  
	  <!--<div class="ball-container">  
	    <transition-group name="drop">	
	      <div class="ball" v-for="(ball, index) in balls" v-show="ball.show" v-bind:key="index">
	        <div class="inner inner-hook"></div>
	      </div>
	    </transition-group>  
	  </div>-->

	  <div class="ball-container">
	    <div v-for="ball in balls" :key="ball.id">
	      <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
	        <div v-show="ball.show" class="ball">
	          <div class="inner inner-hook">
	          </div>
	        </div>
	      </transition>
	    </div> 
	  </div>
	  
	  <transition name="fold">
		  <div class="shopcart-list" v-show="listShow">
		  	<div class="list-header">
		  		<h1 class="title">购物车</h1>
		  		<span class="empty" @click="empty">清空</span>
		  	</div>
		  	<div class="list-content" ref="listContent">
		  		<ul>
		  			<li class="food" v-for="food in selectFoods">
		  				<span class="name">{{food.name}}</span>
		  				<div class="price">
		  					<span>￥{{food.price*food.count}}</span>
		  				</div>
		  				<div class="cartcontrol-wrapper">
		  					<cartcontrol :food="food"></cartcontrol>
		  				</div>
		  			</li>
		  		</ul>
		  	</div>
		  </div>
	  </transition>
	</div>
	
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList">
      </div>
    </transition>
    
  </div>
    
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice:{ // 最低起送价 从json seller 对象数据中获取
      type: Number
    }
  },
  data () {
    return {
      balls:[
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls:[],
      fold: true
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        //return '￥'+this.minprice+'元起送';
        return `￥${this.minPrice}元起送`;
      }
      else {
        if(this.totalPrice<this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        }
        else {
          return '去结算';
        }
      }
    },
    payClass() {
      if(this.totalPrice<this.minPrice) {
        return 'not-enough';
      }else{
        return 'enough';
      }
    },
    listShow() {
      if(!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if(show){
        this.$nextTick(()=>{
          if(!this.scroll){
            this.scroll = new BScroll(this.$refs.listContent,{
            click:true});
          }
          else{
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    /*drop(el) {
      //console.log(el);
      for(let i=0;i<this.balls.length;i++) {
        let ball=this.balls[i];
        if(!ball.show) {
          ball.show=true;
          ball.el=el;
          this.dropBalls.push(ball);
          return;
        }
      }
    }
  },
  transitions: {
    /*drop: {
      beforeEnter(el) {
        let count = this.balls.length;
        while(count--) {
          let ball = this.balls[count];
          if(ball.show){
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left-32;
            let y = -(window.innerHeight-rect.top-22);
            el.style.display = '';
            el.style.webkitTransform = 'translate3d(0,${y}px,0)';
            el.style.transform = 'translate3d(0,${y}px,0)';
            let inner= el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(${x}px,0,0)';
            inner.style.transform = 'translate3d(${x}px,0,0)';
          }
        }
      },
      enter(el){
        let rf = el.offsetHeight;
        this.$nextTick(() => {//异步执行
          el.style.webkitTransform = 'translate3d(0,0,0)';    //重置回来
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el){
        let ball = this.dropBalls.shift();  //取到做完动画的球，再置为false，即重置，它还可以接着被利用
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }*/
    
      drop(el) { 
        //触发一次事件就会将所有小球进行遍历
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { //将false的小球放到dropBalls
            ball.show = true;
            ball.el = el; //设置小球的el属性为一个dom对象
            this.dropBalls.push(ball); 
            return;
          }
        }
      },

      beforeEnter(el){ //这个方法的执行是因为这是一个vue的监听事件
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
            el.style.display = ''; //清空display
            el.style.webkitTransform = `translate3d(0,${y}px,0)`; 
            el.style.transform = `translate3d(0,${y}px,0)`;
            //处理内层动画
            let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },

      enter(el, done) { //这个方法的执行是因为这是一个vue的监听事件
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight; //触发重绘html
        this.$nextTick(() => { //让动画效果异步执行,提高性能
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          //处理内层动画
          let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
        });
      },

      afterEnter(el) { //这个方法的执行是因为这是一个vue的监听事件
        let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
        if (ball) {
          ball.show = false;
          el.style.display = 'none'; //隐藏小球
        }
      },
      
      toggleList() {
        if(!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      
      hideList() {
        this.fold = true;
      },
      
      pay() {
        if(this.totalPrice<this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);        
      }
  },
  components:{
    cartcontrol
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.shopcart {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 50;
	width: 100%;
	height: 40px;
}
.shopcart .content {
	display: flex;
	background: #141d27;
	font-size: 0;
	margin-left: 0;
	color: rgb(255,255,255,0.4);
}
.content-left {
	flex: 1;		
}
.logo-wrapper {
	display: inline-block;
	position: relative;
	top: -10px;
	margin: 0 12px;
	padding: 6px;
	width: 56px;
	height: 56px;
	box-sizing: border-box;
	vertical-align: top;
	border-radius: 50%;
	background: #141d27;
}
.logo-wrapper .num {
	position: absolute;
	top: 0;
	right: 0;
	width: 24px;
	height: 16px;
	line-height: 16px;
	text-align: center;
	border-radius: 16px;
	font-size: 10px;
	font-weight: bold;
	color: #FFFFFF;
	background: rgb(240,20,20);
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
}
.shopcart .logo {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background: #2b343c;
	text-align: center;
}
.logo.highlight {
	background: rgb(0,160,220);
}
.logo .icon-shopping_cart {
	line-height: 44px;
	font-size: 24px;
	color: #80858a;
}
.icon-shopping_cart.highlight, .price.highlight {
	color: #fff;
}
.shopcart .price {
	display: inline-block;
	vertical-align: top;
	line-height: 24px;
	margin-top: 12px;
	box-sizing: border-box;
	padding-right: 12px;
	border-right: 1px solid rgba(255,255,255,0.1);
	font-size: 16px;
	font-weight: bold;
}
.shopcart .desc {
	display: inline-block;
	vertical-align: top;
	line-height: 24px;
	margin: 12px 0 0 12px;
	font-size: 12px;
}
.content-right {
	flex: 0 0 105px;
	width: 105px;
}
.content-right .pay {
	height: 48px;
	line-height: 48px;
	text-align: center;
	font-size: 12px;
	font-weight: bold;
	background: #2b333b;
}
.pay.not-enough {
	background: #2b333b;
}
.pay.enough {
	background: #00b43c;
	color: #FFFFFF;
}
.ball-container .ball {
	position: fixed;
	left: 32px;
	bottom: 22px;
	z-index: 200;
	transition: all 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
}
.ball-container .inner {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: rgb(0,160,220);
	transition: all 0.4s linear;	
}
.shopcart-list {
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
	width: 100%;	
	transform: translate3d(0,-100%,0);
}
.fold-enter-active, 
.fold-leave-active {
    transition: all 0.5s linear;
}
.fold-enter, 
.fold-leave-to {
    transform: translate3d(0,0,0);
}
.list-header {
	height: 40px;
	line-height: 40px;
	padding: 0 18px;
	background: #F3F5F7;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.list-header .title {
	float: left;
	font-size: 14px;
	color: rgb(7,17,27);
}
.list-header .empty {
	float: right;
	font-size: 12px;
	color: rgb(0,160,220);
}
.list-content {
	padding: 0 18px;
	max-height: 217px;
	background: #FFFFFF;
	overflow: hidden;
}
.list-content .food {
	position: relative;
	padding: 12px 0;
	box-sizing: border-box;
	border-1px(rgba(7,17,27,0.1))
}
.food .name {
	line-height: 24px;
	font-size: 14px;
	color: rgb(7,17,27);
}
.food .price {
	position: absolute;
	right: 80px;
	bottom: 12px;
	line-height: 23px;
	font-weight: bold;
	font-size: 14px;
	color: rgb(240,20,20);
	padding-right: 0;
}
.cartcontrol-wrapper {
	position: absolute;
	right: 0;
	bottom: 6px;
}
.list-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 40;
	opacity: 1;
	background: rgba(7,17,27,0.6);
	backdrop-filter: blur(10px);
}
.list-mask.fade-enter-active, 
.list-mask.fade-leave-active {
    transition: all 0.5s;
}
.list-mask.fade-enter, 
.list-mask.fade-leave-to {
    opacity: 0;
    background: rgba(7,17,27,0);
}
</style>
