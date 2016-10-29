import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'
import DateCalc from '../common/utils/date'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    date:  new DateCalc().now(),
    latest: [],
    day: [],
    oneday: {},
    article: {},
    comments: [],
    banners:[]
  },
  actions: {
    FETCH_LATEST ({ commit, state }) {
      return api.fetchLatest()
        .then(data=>{
          commit('SET_LIST', data.stories)
          commit('SET_BANNER_LIST', data.top_stories)
        })
    },
    FETCH_HISTORY ({ commit, state }, dtime) {
      return api.fetchHistory(dtime)
        .then(data=> {
          commit('SET_HISTORY', data)
        })
    },
    FETCH_ONEDAY ({ commit, state }, dtime) {
      return api.fetchHistory(dtime)
        .then(data => {
          commit('SET_ONEDAY', data)
        })
    },
    FETCH_ARTICLE ({ commit, state }, aid) {
      return api.fetchArticle(aid)
        .then(data => {
          commit('SET_ARTICLE', data)
        })
    },
    FETCH_COMMENTS ({ commit, state }, aid) {
      return api.fetchComments(aid)
        .then(data => {
          commit('SET_COMMENTS', data)
        })
    }
  },
  mutations: {
    SET_LIST (state, data) {
      state.latest = data
    },
    SET_HISTORY (state, data) {
      if(data){
        let day = {
          month: new DateCalc().monthEN(data.date) + data.date.substr(4,2),
          date: new DateCalc().CHN(data.date),
          data: data.stories
        }
        state.day.push(day)
      }
    },
    SET_ONEDAY (state, data) {
      if(data){
        state.oneday= {
          month: new DateCalc().monthEN(data.date) + data.date.substr(4,2),
          date: new DateCalc().CHN(data.date),
          data: data
        }
      }
    },
    SET_ARTICLE (state, data) {
      state.article = data
    },
    SET_COMMENTS (state, data) {
      state.comments = data
    },
    SET_BANNER_LIST (state, data) {
      state.banners = data
    },
  }
})

export default store