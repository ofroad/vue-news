import Vue from 'vue';
import { zhihuimg } from '../common/index'

export const API = {
    startPic: '/zhihuapi/api/4/start-image/720*1184',
    latest: '/zhihuapi/api/4/news/latest',
    article: '/zhihuapi/api/4/news/',
    history: '/zhihuapi/api/4/news/before/',
    themes: '/zhihuapi/api/4/themes',
    theme: '/zhihuapi/api/4/theme/',
    cmtCount: '/zhihuapi/api/4/story-extra/',
    cmtLong: '/zhihuapi/api/4/story/',
    cmtShort: '/zhihuapi/api/4/story/'
}

export const DouBanAPI = {
    inTheaters: '/doubanapi/v2/movie/in_theaters',
    detail: '/doubanapi/v2/movie/subject/',
    comming: '/doubanapi/v2/movie/coming_soon',
    weekly: '/doubanapi/v2/movie/weekly',
    usbox: '/doubanapi/v2/movie/us_box',
    top250: '/doubanapi/v2/movie/top250'
}