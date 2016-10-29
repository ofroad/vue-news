<template>
  <div class="swiper-container">
    <slot name="parallax-bg"></slot>
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <slot name="pagination"></slot>
    <slot name="button-prev"></slot>
    <slot name="button-next"></slot>
    <slot name="scrollbar"></slot>
  </div>
</template>
<!--
<swiper :options="swiperOption">
  幻灯内容
  <swiper-slide>I'm Slide 1</swiper-slide>
   ... 
  以下配置均为可选（使用具名slot来确定并应用一些操作控件元素
  <div class="swiper-pagination"  slot="pagination"></div>
  <div class="swiper-button-prev" slot="button-prev"></div>
  <div class="swiper-button-next" slot="button-next"></div>
  <div class="swiper-scrollbar"   slot="scrollbar"></div>
</swiper>
-->
<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  // require('swiper/dist/css/swiper.css')
  export default {
    name: 'swiper',
    props: {
      options: {
        type: Object,
        default: function() {
          return {
            autoplay: 3500
          }
        }
      },
    },
    ready: function() {
      if (!this.swiper) this.swiper = new Swiper(this.$el, this.options)
    },
    mounted: function() {
      if (!this.swiper) this.swiper = new Swiper(this.$el, this.options)
    },
    updated: function(){
      this.swiper.update();
    },
    beforeDestroy: function() {
      if (!!this.swiper) {
        this.swiper = null
        delete this.swiper
      }
    }
  }
</script>
