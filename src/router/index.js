/*import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})*/

import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '../components/goods/goods';
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller';
import product from "../components/product/index";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [{
            path: '/',
            component: goods
        },
        {
            path: '/goods',
            name: 'goods',
            component: goods
        },
        {
            path: '/ratings',
            name: 'ratings',
            component: ratings
        },
        {
            path: '/seller',
            name: 'seller',
            component: seller
        },
        {
            path: '/product',
            name: 'product',
            component: product
        }
    ],
    linkActiveClass: 'active'
});