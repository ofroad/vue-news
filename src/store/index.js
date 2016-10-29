import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'
import DateCalc from '../common/utils/date'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    // 知乎
    date:  new DateCalc().now(),
    latest: [],
    day: [],
    oneday: {},
    article: {},
    comments: [],
    banners:[],

    // 豆瓣
    db_inTheaters: '',
    db_inTheatersList: [],
    db_detail: {},
    db_comming: '',
    db_commingList: [],
    db_top: '',
    db_topList: []
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
    },

    // 豆瓣
    FETCH_DB_InTheaters ({ commit, state }) {
      return api.douBanInTheaters()
        .then(data => {
          commit('SET_Db_InTheaters', data)
        })
    },
    FETCH_DB_UpdateInTheaters ({ commit, state }) {
      return api.douBanInTheaters()
        .then(data => {
          commit('SET_Db_UpdateInTheaters', data)
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
          data: data.stories
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

    // 豆瓣
    SET_Db_InTheaters (state, data) {
      state.db_inTheaters = data
      state.db_inTheatersList = data.subjects
    },
    SET_Db_UpdateInTheaters (state, data) {
      state.db_inTheaters = data
      state.db_inTheatersList = state.db_inTheatersList.concat(data.subjects)
    }
  },
  getters:{
   db_inTheaters(state){ 
     return state.db_inTheaters
    },
    db_inTheatersList(state){ 
      return state.db_inTheatersList
    }
  }
})

export default store