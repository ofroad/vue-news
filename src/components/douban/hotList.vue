<template>
  <div class="hot-container">
    <h2 class="hot-title-text">
      影城热映</h2>
    <ul class="hot-movie-list">
        <li class="hot-movie-item"
          v-for="(value, key) in inTheatersList">
          <hot-item :value="value"></hot-item>
        </li>
    </ul>
  </div>
</template>

<script>
import hotItem from './hotItem.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      start: 0,
      count: 20,
      showWarn: false
    }
  },
  computed: {
    ...mapGetters({
      inTheaters: "db_inTheaters",
      inTheatersList: "db_inTheatersList"
    })
  },
  components: {
    'hot-item': hotItem
  },
  methods: {
    ...mapActions(['FETCH_DB_InTheaters', 'FETCH_DB_UpdateInTheaters']),
    evtLoadNext () {
      /*const $app = $('#app')
      $app.off('scroll')
      $app.on('scroll', () => {
        let scrollHeight = $app.scrollTop() + $(window).height()
        let contentHeight = $('.home-container').outerHeight()
        if (scrollHeight + 1 >= contentHeight) {
          if (this.inTheatersList.length <= this.inTheaters.total) {
            this.start++
            this.FETCH_DB_UpdateInTheaters({
              start: this.start,
              count: this.count
            })
          } else {
            this.showWarn = true
          }
        }
      })*/
    }
  },
  created () {
    this.$nextTick(() => {
      this.evtLoadNext()
    })
    alert(this.inTheaters)
    if (!this.inTheaters) {
      this.FETCH_DB_InTheaters({
        start: this.start,
        count: this.count
      })
    }
  }
}
</script>

<style scoped>
.hot-container {
  overflow: auto;
}

.hot-title-text {
  font-size: 15px;
  color: #8e8e8e;
  letter-spacing: 3px;
}

.hot-movie-list {

}
</style>
