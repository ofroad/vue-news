<template>
  <section class="latest-box">
    <div class="latest-title">今日热闻</div>
    <ul class="latest">
      <li class="item-story-box" v-for="item in data">
          <router-link class="item-story" :to="{path: 'top-detail', query:{aid: item.id}}"> 
            <h3 class="title">{{item.title}}</h3>
            <img :src="item.images[0]">
          </router-link>
      </li>
    </ul>
  </section>
</template>


<script>
export default {
  name: 'latest-item',
  props: ['data']
};
</script>

<style lang="stylus" scoped>
  .latest-title{
    height 44px;
    line-height 44px;
    color #4e627a;
    font-size 16px;
    font-weight 600;
    vertical-align top;
  }
  .latest {
    overflow hidden
    clear both
    border-top 1px solid #ccc
    a {
      display block
      overflow hidden
      
    }
    li{
      width 48%
      margin 0 1% 
      float left

      .title {
        display inline-block
        margin 0px 0 2px 0
        padding 5px 6px
        width auto
        width 100%
        font-size 15px
        line-height 1.5
        position absolute
        bottom 10px
        color #fff
        font-size 16px
        background-color #000
        opacity 0.8 
      }
      .item-story{
        display block
        position relative
        padding 8px 0
        overflow hidden
      }
      img {
        display block
        width 100%
        height 100%
      }
    }
  }
</style>