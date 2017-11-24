<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'hightline':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'hightline':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'hightline':totalPrice>0}">¥ {{totalPrice}}</div>
        <div class="desc" >
          另需配送费{{delivertPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{'to-pay':totalPrice>=minPrice}">
          {{payDesc}}
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls" class="ball">
            <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter"  v-on:after-enter="afterEnter">
              <div class="inner inner-hook" v-show="ball.show"></div>
            </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      selectFoods:{
        type:Array,
        default(){
          return [];
        }
      },
      delivertPrice:{
        type:Number,
        default:0
      },
      minPrice:{
        type:Number,
        default:0
      },

    },
    data(){
      return{
        balls:[
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          },
          {
            show:false
          }
        ],
        dropBalls:[]
      };
    },
    computed:{
      totalPrice(){
        let total=0;
        this.selectFoods.forEach((food)=>{
          total+=food.price*food.count;
        })
        return total;
      },
      totalCount(){
        let count=0;
        this.selectFoods.forEach((food)=>{
          count+=food.count;
        })
        return count;
      },
      payDesc(){
        if (this.totalPrice===0){
          return `¥${this.minPrice}元起送`;
        }else if(this.totalPrice<this.minPrice){
          let diff=this.minPrice-this.totalPrice;
          return `还差¥${diff}元起送`;
        }else {
          return `去结算`;
        }
      }
    },
    methods:{
      drop(el){
        for(let i=0;i<this.balls.length;i++){
          let ball=this.balls[i];
          if (!ball.show){
            ball.show=true;
            ball.el=el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el){
           console.log(el);
        let count =this.balls.length;
        while (count--){
          let ball=this.balls[count];
          if (ball.show){
            let rect=ball.el.getBoundingClientRect();
            let x=rect.left-24;
            let y=-(window.innerHeight-rect.top-40);
            el.style.display='';
            el.style.webkitTransform=`translate3d(${x}px,${y}px,0)`;
            el.style.transform=`translate3d(${x}px,${y}px,0)`;

          }
        }
      },
      enter(el, done) {
        console.log(1111)
        /*eslint-disable no-unused-vars*/
       let rf= el.offsetHeight;
       this.$nextTick(()=>{
         el.style.webkitTransform='translate3d(0,0,0)';
         el.style.transform=='translate3d(0,0,0)';
         el.style.opacity=0
       })
//        done();
      },
      afterEnter(el) {
        console.log(222)
        let ball=this.dropBalls.shift();
        if (ball){
          ball.show=false;
          el.style.display='none';
        }
      },
    },

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position :fixed
    left:0
    bottom :0
    z-index:50
    width:100%
    height:48px
    color: rgba(255,255,255,0.4)
    .content
      display :flex
      background :#141d27
      .content-left
        flex 1
        .logo-wrapper
          display :inline-block
          position :relative
          top: -10px
          margin :0 12px
          padding: 6px
          width :56px
          height :56px
          box-sizing :border-box
          border-radius :50%
          vertical-align :top
          background :#141d27
          .num
            position :absolute
            top: 0
            right: 0
            width :24px
            height :16px
            line-height :16px
            text-align :center
            border-radius :16px
            font-size :12px
            font-weight :700
            color: #fff
            background :rgb(240,20,20)
            box-shadow :0 4px 8px 0 rgba(0, 0 ,0 ,0.4)
          .logo
            width :100%
            height :100%
            border-radius :50%
            background :#2b343c
            text-align :center
            &.hightline
              background:rgb(0,160,220)
            .icon-shopping_cart
              font-size :24px
              color :#80858a
              line-height :44px
              &.hightline
                color :#fff
        .price
          display :inline-block
          vertical-align :top
          font-size :16px
          line-height :24px
          font-weight :700
          margin-top :12px
          box-sizing :border-box
          padding-right :12px
          color :rgba(255,255,255,0.4)
          border-right:1px solid rgba(255,255,255,0.1)
          &.hightline
            color :#fff
        .desc
          display :inline-block
          vertical-align :top
          line-height :24px
          margin 12px 0 0 12px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height :48px
          line-height :48px
          font-weight :700
          text-align :center
          font-size :12px
          background :#2b333b
          &.to-pay
            background :seagreen
            color :#fff

      .ball-container
        .ball
          position :fixed
          left: 32px
          bottom :22px
          z-index :200
          .inner
            width :16px
            height :16px
            border-radius :50%
            background :rgb(0,160,220)
            transition:all 3s


</style>
