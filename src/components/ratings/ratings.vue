<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :select-type="selectType" :only-content="onlyContent"
                    :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar"/>
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import  star from '../star/star.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import split from '../split/split.vue';
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/date';

  const ALL=2;
  const ERR_OK=0;
  export default {
    props:{
      seller:{
        type:Object
      }
    },
    components:{
      star,
      ratingselect,
      split
    },
    data(){
      return{
        ratings:[],
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
      }

    },
    created(){
      this.$http.get('/api/ratings').then(res=>{
        res=res.body;
        console.log(res)
        if (res.errno==ERR_OK){
          this.ratings=res.data;
          this.$nextTick(()=>{
            this._initScroll();
          })
        }
      })
    },
    methods:{
      _initScroll(){
        this.meunSroll = new BScroll(this.$refs.ratings, {
          click: true
        })
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position :absolute
    top: 184px
    bottom :0px
    left: 0
    width :100%
    overflow :hidden
    .overview
      display :flex
      padding :18px 0
      .overview-left
        flex: 0 0 137px
        border-right :1px solid rgba(7,17,27,0.1)
        text-align :center
        @media only screen and (max-width :320px)
          flex: 0 0 120px
          width: 120px
        .score
          font-size :24px
          color :rgb(255,153,0)
          line-height :28px
         .title
          font-size :12px
          color :rgb(7,17,27)
          line-height :12px
          margin 8px 0 6px 0
         .rank
           font-size :12px
           color :rgb(147,153,159)
          line-height :12px

      .overview-right
        padding-left :24px
        flex: 1
        @media only screen and (max-width :320px)
          padding-left :10px
        .score-wrapper
          margin-bottom :8px
          font-size :0
          .title
            display :inline-block
            vertical-align :top
            line-height :18px
            font-size :12px
            color :rgb(7,17,27)
          .star
            display :inline-block
            vertical-align :top
            margin :0 12px
           .score
            display :inline-block
            vertical-align :top
            font-size :12px
            color :rgb(253,153,0)
            line-height :18px
        .delivery-wrapper
          font-size :0px
          .title
            display :inline-block
            vertical-align :top
            line-height :18px
            font-size :12px
            color :rgb(7,17,27)
          .delivery
            font-size :12px
            color :rgb(147,153,159)
            margin-left :12px
            line-height :18px
            vertical-align :top


    .rating-wrapper
      padding :0 18px
      .rating-item
        display :flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          flex: 1
          position :relative
          .name
            font-size :q0px
            color: rgb(7,17,27)
            line-height :18px;
            margin-bottom :4px
          .star-wrapper
            margin-bottom :6px
            .star
              margin-right :6px
              vertical-align :top
              display :inline-block
            .delivery
              vertical-align :top
              display :inline-block
              font-size :10px
              color :rgb(147,153,159)
              font-weight :200
          .text
            font-size :12px
            color:rgb(7,17,27)
            line-height :18px
            margin-bottom :8px
          .recommend
            .icon-thumb_up
              display :inline-block
              font-size :12px
              line-height :32px
              color :rgb(0,160,220)
              margin: 0 8px 4px 0
             .item
              padding :0 6px
              margin: 0 8px 4px 0
              font-size :9px
              line-height :32px
              color :rgb(147,153,159)
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius :2px
              background-color :rgb(255,255,255)

          .time
            position :absolute
            top :0
            right :0
            font-size :10px
            font-weight :200
            line-height :12px
            color: rgb(147,153,159)
</style>
