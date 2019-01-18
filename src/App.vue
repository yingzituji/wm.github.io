<template>
  <div id="app">
    <!--<img src="./assets/logo.png">    
    <router-view/>-->
    <myheader v-bind:seller="seller" id='header'></myheader>
    <div class="tab border-1px">
    	<div class="tab-item">
    		<router-link to="/goods">商品</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to="/ratings">评价</router-link>
    	</div>
    	<div class="tab-item">
    		<router-link to="/seller">商家</router-link>
    	</div>
    </div>
    
  	<router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue';

const ERR_OK = 0;

export default {
    data() {
    	return {
    		seller: {}
    	};
    },
    /*created() {
    	this.$http.get('/api/seller').then((response) => {
    		response = response.body;
    		if (response.errno === ERR_OK) {
    			this.seller = response.data;
    			console.log(this.seller);
    		}
    	});
    },*/
    
    /*cyt 1129*/
    /*created(){
      this.$http.get('api/seller').then((response) => {
        console.log(response)
        this.seller = response.body.data
      })
    },
    data(){
      return{
        seller:[]
      }
    },*/

	components:{
		'myheader':header
	},
	
	created() {
      this.seller = this.$store.getters.getSellerData;
    }
	
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl"

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1
  font-weight: 200
}
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  /*border-bottom: 1px solid rgba(7,17,27,0.1);*/
  border-1px(rgba(7,17,27,0.1))

}
.tab-item{
  flex: 1;
  text-align: center;
}
.tab-item a{
  display: block;
  font-size: 14px;
  color: rgb(77,85,93);
}
.tab-item .router-link-active{
  color: rgb(240,20,20);
}

.tab::before {
    position: absolute;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    left: 0;
    top: 0;
    height: 1px;
    width: 100%;
    content: ' ';
}
.tab .tab-item > .active {
    color: rgb(240, 20, 20);
}

</style>
