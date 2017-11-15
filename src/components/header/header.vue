<template>
  <div class="header">
      <div class="top_content">
          <div class="avatar">
            <img width="64" height="64" :src="seller.avatar"/>
          </div>
          <div class="content">
              <div class="title">
                <span class="brand"></span>
                <span class="name">{{seller.name}}</span>
              </div>
            <div class="des">
              {{seller.description}}/{{seller.deliveryTime}}分钟送达
            </div>
            <div v-if="seller.supports" class="supports">
              <span class="icon"></span>
              <span class="text">{{seller.supports[0].description}}</span>
            </div>
          </div>
      </div>
    <div class="buttom_content"></div>
  </div>
</template>

<script>
  export default {
    props:{
      seller:{
        type:Object
      }
    },
    created(){

    }
  }
</script>

<style>
.header {
  color: #fff;
  background: red;
}
.header .top_content{
  padding: 24px 12px 28px 24px;
  font-size: 0px;
  vertical-align: top;
}
.header .top_content .avatar{
    display: inline-block;
}
.header .top_content .content{
  display: inline-block;
  margin-left: 16px;
  font-size: 14px;
  padding-bottom: 2px;
  padding-top: 2px;
}
</style>
