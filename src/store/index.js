import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
    loading: false,
    datePointer: {
        value: '',
        format: ''
    },
    days: [],
    themes: []
}

const mutations = {
    START_LOADING(state) {
        state.loading = true
    },
    FINISH_LOADING(state) {
        state.loading = false
    },
    SET_ARTICLES(state, value) {
        state.days.push(value)
    },
    SET_DATE_POINTER(state, value) {
        state.datePointer = value
    },
    SET_THEMES(state, arr) {
        state.themes = arr
    }
}

const getters = {
    getLoading: state => state.loading,
    datePointer: state => state.datePointer,
    days: state => state.days,
    themes: state => state.themes
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    strict: true
})

export default store