<template>
  <div class="detail">
    <Articles :article="article"></Articles>
    <a class="viewComments" @click="getComments">
      <!--<i class="icon comments"></i>-->
      <span v-if="comments.length==0">点击查看评论</span>
      <span v-else>最新评论</span>
    </a>
    <i v-show="showLoading" class="loading"></i>
    <Comments :comments="comments"></Comments>
    <router-link class="back" :to="{path: '/'}">返回首页</router-link>
  </div>
</template>

<script>
import Vue from 'vue';
import Articles from '../components/Articles.vue'
import Comments from '../components/Comments.vue'

const fetchArticle = store => {
  return store.dispatch('FETCH_ARTICLE', store.state.route.query.aid)
}

const fetchComments = store => {
  return store.dispatch('FETCH_COMMENTS', store.state.route.query.aid)
}


export default {
  name: 'detail',
  data() {
    return {
      showLoading: false
    }
  },
  components: {
    Articles,
    Comments
  },
  computed: {
    article () {
      return this.$store.state.article
    },
    comments () {
      let cmts = [];
      // 长评在前
      this.$store.state.comments.sort((a,b) => {
        return a.type < b.type
      })
      for(let item of this.$store.state.comments){
        cmts.push(...item.comments);
      }
      this.showLoading = false;
      document.body.scrollTop = document.body.scrollTop+100
      return cmts
    }
  },
  preFetch: fetchArticle,
  beforeMount () {
    fetchArticle(this.$store)
  },
  mounted(){
    scrollTo(0, 0)
  },
  beforeRouteLeave (to, from, next) {
    // TODO use cache to store articles
    this.$store.state.comments.length = 0;
    next()
  },
  methods: {
    getComments(){
      if(this.comments.length == 0){
        let _self = this;
        this.showLoading = true;
        console.log(this.$store.state.route)
        if(this.$store.state.route.name == 'top-detail'){
          fetchComments(_self.$store);
        }else {
          fetchComments(_self.$store);
        }

      }
    }
  }
};
</script>

<style scoped lang="stylus">
  .detail{
    a.viewComments {
      margin-bottom 15px
      text-decoration none
      border 0
      line-height 20px 
      cursor pointer
      i {
        margin-right 5px
      }
      span {
        text-decoration none
      }
    }
    .back{
      display inner-block
      float right
      margin-right 5px
    }
  }
</style>
