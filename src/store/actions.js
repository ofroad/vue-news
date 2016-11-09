import vue from 'vue'
import { zhihuimg, pad } from '../common/index'
import { API } from './api'


const fetchGet = ({ url }, commit) => {
    if (commit) commit('START_LOADING')
    return vue.http.get(url)
        .then((res) => {
            if (commit) commit('FINISH_LOADING')
            if (res.status >= 200 && res.status < 300) {
                return res.data
            }
            return Promise.reject(new Error(res.status))
        })
        .catch((error) => {
            if (commit) commit('FINISH_LOADING')
            return error
        })
}

export const fetchLatest = ({ commit }) => {
    var url = API.latest
    return fetchGet({ url }, commit).then((response) => {
            response.stories.forEach((item) => item.images = item.images.map((img) => zhihuimg(img)))
            response.top_stories.forEach((item) => item.image = zhihuimg(item.image))
            return response
        })
        .catch((error) => {
            return error
        })
}

export const fetchHistory = ({ commit }, dtime) => {
    var url = API.history + dtime
    return fetchGet({ url }, commit).then((response) => {
            response.stories.forEach((item) => item.images = item.images.map((img) => zhihuimg(img)))
            return response
        })
        .catch((error) => {
            return error
        })
}

export const fetchArticle = ({ commit }, aid) => {
    var url = API.article + aid;
    return fetchGet({ url }, commit).then((item) => {
            item.body = item.body.replace(/src="http/g, 'src"' + zhihuimg('http'))
            item.image = zhihuimg(item.image);
            item.images = item.images ? item.images.map((img) => zhihuimg(img)) : "";
            return item
        })
        .catch((error) => {
            return error
        })
}

export const fetchComments = ({ commit }, aid) => {
    var url = API.cmtLong + aid + "/long-comments";
    var url1 = API.cmtShort + aid + "/short-comments";
    var commentsData = [];
    return fetchGet({ url }, commit).then((response) => {
            response.comments.forEach((comment) => comment.avatar = zhihuimg(comment.avatar))
            commentsData.push(response)
            return fetchGet(url1).then((response1) => {
                response1.comments.forEach((comment1) => comment1.avatar = zhihuimg(comment1.avatar))
                commentsData.push(response1)
                return commentsData;
            })
        })
        .catch((error) => {
            return error
        })
}

export const fetchThemes = ({ commit }) => {
    var url = API.themes
    return fetchGet({ url }, commit).then((response) => {
            response.others.forEach((item) => item.thumbnail = zhihuimg(item.thumbnail))
            return response
        })
        .catch((error) => {
            return error
        })
}

export const fetchTheme = ({ commit }, id) => {
    var url = API.theme + id
    return fetchGet({ url }, commit).then((response) => {
            response.stories.forEach((item) => item.images = (item.images ? item.images.map((img) => zhihuimg(img)) : ""))
            return response
        })
        .catch((error) => {
            return error
        })
}

export const douBanInTheaters = ({ commit }) => {
    var url = DouBanAPI.inTheaters
    return fetchGet({ url }, commit).then((response) => {
            return response
        })
        .catch((error) => {
            return error
        })
}

export const setAticles = ({ commit }, arr) => {
    commit('SET_ARTICLES', arr)
}
export const setThemes = ({ commit }, arr) => {
    commit('SET_THEMES', arr)
}
export const setDatePointer = ({ commit }, date) => {
    var value = {
        value: date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate()),
        format: date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate())
    }
    commit('SET_DATE_POINTER', value)
}