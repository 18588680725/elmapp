<template>
  <div class="cart-control">
    <div class="cart-decreace"  @click="decreaceCart" >
      <transition name="move">
        <span class="inner icon-remove_circle_outline" v-show="food.count>0"></span>
      </transition>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addcart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props:{
      food:{
        type:Object
      }
    },
    created(){
    },
    methods:{
      addcart(event){
        if (!this.food.count)
        {
          Vue.set(this.food,'count',1)
        }else{
          this.food.count++;
        }
        this.$emit('addcarts',event.target);
      },
      decreaceCart(){
        if (this.food.count>=1)
        {
          this.food.count--;

        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart-control
    font-size 0
    .cart-decreace
      display :inline-block
      padding :3px
      .move-enter-active, .move-leave-active
        transition :all 0.4s linear
       .inner
         display :inline-block
         font-size :24px
         line-height :24px
         color :rgb(0,160,220)
         transform :rotate(180deg)
      .move-enter, .move-leave-to
        opacity :0
        transform :translate3D(24px,0,0)
    .cart-count
      display :inline-block
      font-size :10px;
      width :12px
      line-height :24px
      text-align center
      vertical-align :top
      padding-top: 3px
      color :rgb(147,153,159)
    .cart-add
      display :inline-block
      font-size :24px
      padding :3px
      line-height :24px
      color :rgb(0,160,220)





</style>
