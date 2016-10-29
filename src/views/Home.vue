<template>
<div class="home">

  <div class="banner">
    <Swiper :options="swiperOption">
      <template v-for="item in latest.top">
        <SwiperSlide>
          <router-link :to="{path: 'top-detail', query:{aid: item.id}}"> 
            <img :src="item.image" width="100%" height="auto">
          </router-link>
        </SwiperSlide>
      </template>
      <div class="swiper-pagination" slot="pagination"></div>
    </Swiper>
  </div>

  <Latest :data="latest.latest"></Latest>

  <template v-for="item in histories">
    <History :day="item"></History>
  </template>
  
  <i class="loading"><span>Previous Day</span></i>
</div>
</template>

<script>
import Vue from 'vue';
import Swiper from '../components/swiper/swiper.vue'
import SwiperSlide from '../components/swiper/swiper-slide.vue'
import Latest from '../components/Latest.vue'
import History from '../components/History.vue'
import DateCalc from '../common/utils/date';

const fetchLatest = store => {
  return store.dispatch('FETCH_LATEST')
}
const fetchHistory = (store, dtime) => {
  return store.dispatch('FETCH_HISTORY', dtime)
}
const throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

export default {
  name: 'home',
  data() {
    return {
      loading: false,
      histories: [],
      h: [],
      swiperOption: {
          pagination: '.swiper-pagination',
          autoplay: 3000,
          paginationClickable: true
        }
    };
  },
  components: {
    Latest,
    History,
    Swiper,
    SwiperSlide
  },
  preFetch: fetchLatest,
  computed: {
    latest(){
      let data = {
        top: [],
        latest:[]
      }
      let comments = []
      let d = this.$store.state.latest
      let topd = this.$store.state.banners

      for(let i=0,len=d.length;i<len;i++){
        if(d[i].title) {
          data.latest.push(d[i])
        }else {
          comments.push(d[i])
        }
      }
      for(let i=0,len=topd.length;i<len;i++){
        data.top.push(topd[i])
      }
      for(let i=0,len=comments.length;i<len;i++){
        for(let j=0,length=data.latest.length;j<length;j++){
          if(comments[i].id == data.latest[j].id){
            data.latest[j].comments = comments[i].comments
            data.latest[j].popularity = comments[i].popularity
          }
        }
      }
      return data;
    },
    histories() {
      return this.$store.state.day
    }
  },
  created(){
    this.scrollEvent = throttle(e => {
      if (window.innerHeight + document.body.scrollTop + 150 >= document.body.offsetHeight) {
        this.previousDay()
      }
    }, 2000)
  },
  beforeMount () {
    if(this.$store.state.latest.length == 0){
      fetchLatest(this.$store);
    }
  },
  mounted(){
    scrollTo(0, sessionStorage.getItem('scrollTop'))
    window.addEventListener('scroll',  this.scrollEvent)
  },
  beforeRouteLeave (to, from, next) {
    if(to.name == 'detail'){
      // TODO use cache to store articles
      this.$store.state.article = {}
    }
    window.removeEventListener('scroll', this.scrollEvent)
    sessionStorage.setItem('scrollTop', document.body.scrollTop)
    next()
  },
  methods: {
    previousDay: function(){
      this.$store.state.date = new DateCalc(this.$store.state.date).before();
      fetchHistory(this.$store, this.$store.state.date);
    }
  }
};
</script>

<style lang="stylus">

@keyframes MoreLoadingAnimation{
  0%{
    transform rotate(0deg)
  }
  to{
    transform rotate(360deg)
  }
}

@media (max-width: 500px) {
  .home{
    li .title {
      font-size 13px
    }
    button {
    margin 10px auto
    height 50px
    width 50px
    span {
      display none
    }
    &::before,
    &::after {
      height 50px
      width 50px
      border-width 2px
    }
    &::after {
      border-width 2px
    }
  }
    
  }
}
</style>
