import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/header/header.vue'
import goods from '@/components/goods/goods.vue'
import sell from '@/components/sell/sell.vue'
import ratings from '@/components/ratings/ratings.vue'
import zytzbs from '@/components/zhongyi/zytzbs.vue'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path:'/',
      name:'goods',
      component:goods
    },
    {
      path:'/header',
      name:'header',
      component:header,
    },
    {
      path:'/sell',
      name:'sell',
      component:sell
    },
    {
      path:'/ratings',
      name:'ratings',
      component:ratings
    },
    {
      path:'/zytzbs',
      name:'zytzbs',
      component:zytzbs
    }

  ]
})
