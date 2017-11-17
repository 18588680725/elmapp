<template>
  <div class="header">
    <div class="top_content">
      <div class="avatar">
        <img :src="seller.avatar"/>
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
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supports_count">
        <div class="count">{{seller.supports.length}}个</div>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="buttom_content"></div>
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created(){
      this.classMap=['decrease','discount','special','invoice','guarantee']
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    color: #fff
    background: #ccc
    .top_content
      position :relative
      padding: 24px 12px 28px 24px
      font-size: 0px
      .avatar
        display: inline-block
      img
        border-radius 2px
        width: 64px
        height: 64px
      .content
        vertical-align: top
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0px 8px 0px
          .brand
            display: inline-block
            vertical-align top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left:6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .des
          margin-bottom: 10px
          font-size 12px
          line-height: 12px
        .supports
          .icon
            vertical-align:top
            width:12px
            height :12px
            display :inline-block
            margin-right 4px
            background-size 12px 12px
            background-repeat:no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            font-size :10px
            line-height 10px;
      .supports_count
        position :absolute
        right:12px
        bottom :18px
        line-height :24px
        padding: 0 8px
        height: 24px
        border-radius :14px
        background:rgba(0 ,0 ,0 ,0.2)
        text-align :center
        .count
          font-size :10px
        .icon-keyboard_arrow_right
          font-size :10px


</style>
