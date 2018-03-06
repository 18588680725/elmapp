<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="foods-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon"><img width="57px" height="57px" :src="food.icon"/></div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">原价¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol v-on:addcarts="getAddCartEl" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivert-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'

  const RESULT_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      this.$http.get('/api/goods').then(response => {
        response = response.body;
        if (response.errno == RESULT_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calcuateHeight();
          })
        }
      });
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];

          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let foods=[];
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if (food.count){
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      selectMenu(index, event) {
        let foodsList = document.querySelector(".foods-wrapper").getElementsByClassName("food-list-hook");
        let el = foodsList[index];
        this.foodsSroll.scrollToElement(el, 300)
      },
      _initScroll() {
        this.meunSroll = new BScroll(document.querySelector(".menu-wrapper"), {
          click: true
        })

        this.foodsSroll = new BScroll(document.querySelector(".foods-wrapper"), {
          probeType: 3,
          click: true
        });
        console.log(this.foodsSroll)
        this.foodsSroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calcuateHeight() {
        let foodsList = document.querySelector(".foods-wrapper").getElementsByClassName("food-list-hook");

        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodsList.length; i++) {
          let item = foodsList[i];
          height += item.clientHeight;
          this.listHeight.push(height)
        }
      },
      _drop(traget){
        this.$refs.shopcart.drop(traget);
      },
      //获取点击加入购物车el（从子组件中传来）
      getAddCartEl(target){
        this._drop(target);
        console.log(90909)
      }
    },
    components: {
      shopcart,
      cartcontrol
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    position: absolute
    top: 184px
    bottom 46px
    display: flex
    overflow: hidden
    width: 100%
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      vertical-align middle
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        &.current
          position: relative
          font-weight: 700
          margin-top: -1px
          z-index: 10
          background: #fff
          .text
            border-none();

        .icon
          vertical-align: top
          width: 12px
          height: 12px
          display: inline-block
          margin-right 2px
          background-size 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image(
'invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          font-size: 12px
          width: 56px
          line-height 12px;
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex: 1
      .title
        height: 26px;
        line-height: 26px
        padding-left: 14px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin 2px 0px 8px 0px
            font-size: 14px
            height: 14px
            line-height: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position :absolute
            right :0
            bottom :12px

</style>
