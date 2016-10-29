<template>
  <div class="stars-wrap rd-row-flex">
    <i
      v-for="star in stars"
      :class="{'ion-ios-star': star === 2, 'ion-ios-star-half': star === 1, 'ion-ios-star-outline': star === 0}"
      class="star-icon"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'stars',
  data () {
    return {
    }
  },
  props: {
    score: {
      type: Number,
      required: true
    }
  },
  computed: {
    stars () {
      let stars = [0, 0, 0, 0, 0]
      let temp = 0
      let score = this.score
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

<!--<style scoped>
@import '../assets/css/ionicicon';
.stars-wrap {
  margin-right: 5px;
  .star-icon {
    font-size: 16px;
    color: #ff7300;
  }
}
</style>-->
