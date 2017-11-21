<template>
  <div class="goods">
    <div class="menu_wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods_wrapper">
      <ul>
        <li v-for="item in goods" class="foods-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon"><img width="57px" height="57px" :src="food.icon"/></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>¥{{food.price}}</span>
                  <span v-show="food.oldPrice">原价¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const RESULT_OK = 0;

  export default {
      data(){
        return{
          goods:{},
          foods:{}
        }
      },
      created(){
        this.classMap=['decrease','discount','special','invoice','guarantee']

        this.$http.get('/api/goods').then(response=>{
          response = response.body;
          if (response.errno == RESULT_OK) {
            this.goods = response.data
            this.foods=this.goods.foods
//            console.log(this.goods)
          }
        });
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

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
      vertical-align middle
      .menu-item
        display :table
        height :54px
        width:56px
        line-height :14px
        padding :0 12px
        .icon
          vertical-align:top
          width:12px
          height :12px
          display :inline-block
          margin-right 2px
          background-size 12px 12px
          background-repeat:no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display :table-cell
          font-size :12px
          width :56px
          line-height 12px;
          vertical-align :middle
          border-1px(rgba(7,17,27,0.1))
    .foods_wrapper
      flex: 1
      .title
        height :26px;
        line-height :26px
        padding-left :14px
        border-left :2px solid #d9dde1
        font-size :12px
        color:rgb(147,153,159)
        background :#f3f5f7
      .food-item
        display :flex
        margin: 18px
        padding-bottom :18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom :0
        .icon
          flex:0 0 57px
          margin-right :10px
        .content
          flex :1
          .name
            margin 2px 0px 8px 0px
            font-size: 14px
            height :14px
            line-height :14px
            color: rgb(7,17,27)
          /*.desc*/


</style>
