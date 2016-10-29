<template>
  <div class="hot-item">
    <router-link :to="{name: 'subject', params: {id: value.id}}" class="hot-movie-link rd-row-flex">
      <img :src="value.images.medium" alt="" class="item-image"/>
      <div class="item-content rd-col-flex">
        <h3 class="item-title-line">{{value.title}}</h3>
        <div class="item-score rd-row-flex">
          <stars :score="this.value.rating ? +this.value.rating.stars : 0"></stars>
          <span class="item-score-text">{{value.rating.average}}</span></div>
        <span class="item-director">导演：{{value.directors | mergeName}}</span>
        <span class="item-actor">主演：{{value.casts | mergeName}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import stars from './stars.vue'
export default {
  name: 'hot-movie-item',
  data () {
    return {
    }
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  components: {
    'stars': stars
  },
  computed: {
    stars () {
      let stars = [0, 0, 0, 0, 0]
      let temp = 0
      let score = this.value.rating ? +this.value.rating.stars : 0
      stars = stars.map((item) => {
        if (temp + 10 <= score) {
          item = 2
          temp = temp + 10
        } else if (temp + 5 <= score) {
          item = 1
          temp = temp + 5
        } else {
          item = 0
        }
        return item
      })
      return stars
    }
  }
}
</script>

<style scoped>
/*@import '../assets/css/ionicicon';*/
.hot-item {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  background: #fff;
  .hot-movie-link {
    color: #333;
  }
  .item-image {
    width: 60px;
    height: 80px;
  }
  .item-content {
    margin-left: 10px;
    font-size: 13px;
    max-width: 290px;
    overflow: hidden;
    .item-title-line {
      margin: 0;
    }
    .item-score {
      .item-score-text {
        line-height: 16px;
        margin-left: 5px;
      }
    }
    .item-director, .item-actor {
      max-width: 290px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
