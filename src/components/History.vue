<template>
    <section class="history-box">
      <div class="date" v-if="day.month">
        <span><i class="m">{{ day.month.substr(0,3) }}</i><i class='d'>{{ day.month.substr(3,2) }}</i></span>
        <small>{{ day.date }}</small>
      </div>
      <ul class="history">
        <li class="item-story-box" v-for="item in day.data">
         <router-link class="item-story" :to="{path: 'detail', query:{aid: item.id}}"> 
            <h3 class="title">{{item.title}}</h3>
            <img v-if="item.images && item.images.length>0" :src="item.images[0]">
          </router-link>
        </li>
      </ul>
  </section>
</template>


<script>
export default {
  name: 'history-item',
  props: ['day']
};
</script>


<style lang="stylus">
.history-box {
  a {
    text-decoration none !important
  }
  .date {
    padding 12px 0
    margin 10px 0
    margin-left -59px
    font-size 0
    span {
      display inline-block
      padding 2px 0
      margin-right 25px
      width 34px
      height 40px
      background #948CF1
      color #fff
      text-align center
    }
    i {
      position relative
      font-style normal
      display block
      &.m {
        top 2px
        font-size 12px
        text-transform uppercase
        letter-spacing 1px
      }
      &.d {
        margin-top 4px
        font-size 16px
      }
    }
    small {
      display inline-block
      height 44px
      line-height 44px
      color #4e627a
      text-align center
      font-size 16px
      font-weight 600
      vertical-align: top;
    }
  }
  .history {
    overflow hidden
    clear both
    border-top 1px solid #ccc

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
}
</style>