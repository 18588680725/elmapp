<template>
  <div id="app">
   <v_header></v_header>
    <div class="tab">
      <div class="tab_item"><router-link to="/goods">商品</router-link></div>
      <div class="tab_item"><router-link to="/comment">评论</router-link></div>
      <div class="tab_item"><router-link to="/sell">商家</router-link></div>
    </div>
    <router-view ></router-view>

  </div>
</template>

<script>
  import header from './components/header/header.vue'

export default {
  name: 'app',
  components:{
    v_header:header,
  }
}
</script>

<style>
  .tab{
    display: flex;
    height: 40px;
    line-height: 40px;
  }
  .tab .tab_item{
    flex:1;
    text-align: center;
  }
</style>
