<template>
  <div class="header">
    <div class="top_content">
      <div class="avatar">
        <img :src="seller.avatar" @click="goZhongYI"/>
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
      <div v-if="seller.supports" class="supports_count" @click="showDetail">
        <div class="count">{{seller.supports.length}}个</div>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="notice_content" @click="showDetail">
      <span class="notice_icon"></span>
      <span class="notice_text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
        <img :src="seller.avatar"/>
    </div>
    <div class="detail" v-show="detailShow">
        <div class="detail_wrapper clearfix">
            <div class="detail_main">
              <h1 class="name">{{seller.name}}</h1>
              <div class="star_wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="seller.supports" class="supports">
                <li class="supports_item" v-for="item in seller.supports">
                  <span class="icon" :class="classMap[item.type]"></span>
                  <span class="text">{{item.description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="gonggao">
                <span>{{seller.bulletin}}</span>

              </div>
            </div>
        </div>
        <div class="choose_wrapper" @click="hiddeDetail">
          <i class="icon-close"></i>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return{
        detailShow:false
      };
    },
    methods:{
      showDetail(){
        this.detailShow=true;
      },
      hiddeDetail(){
        this.detailShow=false;
      },
      goZhongYI(){
          this.$router.push({
            path:"/zytzbs"
          })
      }
    },
    created(){
      this.classMap=['decrease','discount','special','invoice','guarantee']
    },
    components:{
      star
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position :relative
    color: #fff
    background-color :rgba(7,17,27,0.5)
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
        display flex
        .count
          vertical-align top
          font-size :10px
        .icon-keyboard_arrow_right
          font-size :10px
          margin-left 2px;
          line-height 24px


    .notice_content
      position :relative
      height: 28px
      line-height :28px
      padding :0 22px 0 12px
      white-space :nowrap
      overflow:hidden
      text-overflow :ellipsis
      background-color :rgba(7,17,27,0.2)
      .notice_icon
        display :inline-block
        vertical-align: middle
        width :22px
        height :12px
        bg-image('bulletin')
        background-size: 22px 12px
      .notice_text
        font-size :10px
        margin: 0 4px
      .icon-keyboard_arrow_right
        position:  absolute
        font-size :10px
        right :12px
        margin-top :8px
    .background
      position :absolute
      z-index :-1
      top :0px
      left :0px
      width :100%
      height:100%
      filter :blur(10px)
      img
        width :100%
        height:100%


    .detail
      width: 100%
      height :100%
      position :fixed
      top:0
      left :0
      z-index :100
      background :rgba(7,17,27,0.8)
      overflow :auto
      .detail_wrapper
        min-height :100%
        width :100%
        .detail_main
          margin-top :64px
          padding-bottom :64px
          .name
            line-height :16px
            text-align :center
            font-size :16px
            font-weight :700
          .star_wrapper
            margin-top: 18px
            padding :2px 0px
            text-align :center
      .choose_wrapper
        position relative
        width :32px
        height :32px
        margin :-64px auto 0 auto
        clear :both
        font-size :32px
      .title
        width 80%
        display: flex
        margin 28px auto 24px auto
        .line
          flex :1px
          position :relative
          top :-6px
          border-bottom 1px solid rgba(255,255,255,0.2)
        .text
          padding 0 12px
          font-size :14px
          font-weight :700


      .supports
        width :80%
        margin :0 auto
        .supports_item
          padding :0 12px
          margin-bottom :12px
          font-size :0px
          &:last-child
            margin-bottom :0px
          .icon
            display :inline-block
            width :16px
            height :16px
            vertical-align :top
            margin-right :6px
            background-size 16px 16px
            background-repeat:no-repeat
            &.decrease
              bg-image('decrease_2')
            &.discount
              bg-image('discount_2')
            &.guarantee
              bg-image('guarantee_2')
            &.invoice
              bg-image('invoice_2')
            &.special
              bg-image('special_2')
          .text
            font-size :14px
      .gonggao
        width :80%
        margin :0 auto
        margin-top :24px
        span
          line-height :24px
          font-weight :200
          font-size :14px

</style>
