<template>
  <div id="app">
    <v_header :seller="seller"></v_header>
    <div class="tab">
      <div class="tab_item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/comment">评论</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/sell">商家</router-link>
      </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
  import header from './components/header/header.vue'

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
          console.log(this.seller)
        }
      }, response => {
      });
    },
    components: {
      v_header: header,
    }
  }
</script>

<style>
  .tab {
    display: flex;
    height: 40px;
    line-height: 40px;
  }

  .tab .tab_item {
    flex: 1;
    text-align: center;
  }
</style>
