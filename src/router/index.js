import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import header from '@/components/header/header.vue'
import goods from '@/components/goods/goods.vue'
import sell from '@/components/sell/sell.vue'
import comment from '@/components/comment/comment.vue'
Vue.use(Router)

export default new Router({
  routes: [

    {
      path:'/goods',
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
      path:'/comment',
      name:'commnet',
      component:comment
    }

  ]
})
