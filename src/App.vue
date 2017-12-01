<template>
  <div id="app">
    <v_header :seller="seller"></v_header>
    <div class="tab">
      <div class="tab_item">
        <router-link to="/">商品</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/sell">商家</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/zytzbs">中医</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>

  </div>
</template>

<script>
  import header from './components/header/header.vue';

  const RESULT_OK = 0;
  export default {
    name: 'app',
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then(response => {
        response = response.body;
        if (response.errno == RESULT_OK) {
          this.seller = response.data
        }
      }, response => {
      });
    },
    components: {
      v_header: header,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tab
    display: flex;
    height: 40px;
    line-height: 40px;
    border-bottom :1px solid rgba(7,17,27,0.1)
    .tab_item
      flex: 1;
      text-align: center;
      .router-link-exact-active
        color: red;


</style>
