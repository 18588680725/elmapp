<template>
  <div class="goods">
    <div class="menu_wrapper"></div>
    <div class="foods_wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  const RESULT_OK = 0;

  export default {
      data(){
        return{
          goods:{}
        }
      },
      created(){
        this.$http.get('/api/goods').then(response=>{
          response = response.body;
          if (response.errno == RESULT_OK) {
            this.goods = response.data
            console.log(this.goods)
          }
        });
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goods
    position :absolute
    top: 184px
    bottom 46px
    display :flex
    overflow :hidden
    width :100%
    .menu_wrapper
      flex:0 0 80px
      width :80px
      background :#f3f5f7
    .foods_wrapper
      flex: 1
      background :#ffffff
</style>
