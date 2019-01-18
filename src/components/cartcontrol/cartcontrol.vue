<template>
    <div class="cartcontrol">
	  <transition name="move">	
	    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart">
	      <span class="inner icon-remove_circle_outline"></span>
	    </div>
	  </transition>
	  <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
	  <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
	</div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
  props: {
    food: {
      type: Object 
    }
  },
  created() {
    //console.log(this.food);
  },
  methods: {
    addCart(event) {
      if(!event._constructed) {
        return;
      }
      if(!this.food.count) {
        Vue.set(this.food,'count',1);
        //this.food.count = 1;
      }
      else {
       this.food.count++;
      }
      this.$emit('cart-add', event.target);  
    },
    decreaseCart(event) {
      if(!event._constructed) {
        return;
      }
      if(this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style>
.cartcontrol {
	font-size: 0;
}
.cartcontrol .cart-add {
	font-size: 22px;
	line-height: 22px;
	color: rgb(0,160,220);
}
.cartcontrol .cart-count {
	display: inline-block;
	vertical-align: top;
	width: 13px;
	padding-left: 0;
	padding-right: 0;
	padding-top: 5px;
	line-height: 22px;
	text-align: center;
	font-size: 12px;
	color: rgb(147,153,159);
}
.cartcontrol .cart-add {
	width: 22px;
	padding: 5px;
	padding-right: 0;
	float: right;
}
.cartcontrol .cart-decrease {
    display: inline-block;
	padding: 5px;
	opacity: 1;
	transform: translate3d(0,0,0);
}
.cart-decrease.move-enter-active, 
.cart-decrease.move-leave-active {
    transition: all 0.4s linear;
}
.cart-decrease.move-enter, 
.cart-decrease.move-leave-to {
    transform: translate3d(24px,0,0);
    opacity: 0;
}
.cart-decrease .inner {
    display: inline-block;
	font-size: 22px;
	line-height: 22px;
	color: rgb(0,160,220);
	transition: all 0.4s linear;
	transform: rotate(0);
}
.cart-decrease.move-enter .inner, 
.cart-decrease.move-leave-to .inner{
    transform: rotate(180deg);
}

</style>
