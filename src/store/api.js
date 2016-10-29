import Vue from 'vue';
import { zhihuimg } from '../filters/index'

var API = {
    'startPic'  : '/zhihuapi/api/4/start-image/720*1184',
    'latest'    : '/zhihuapi/api/4/news/latest',
    'article'   : '/zhihuapi/api/4/news/',
    'history'   : '/zhihuapi/api/4/news/before/',
    'cmtCount'  : '/zhihuapi/api/4/story-extra/',
    'cmtLong'   : '/zhihuapi/api/4/story/',
    'cmtShort'  : '/zhihuapi/api/4/story/'
}

/*全都是get方法，统一写函数*/
function fetchGet(url) {
	return new Promise((resolve, reject) => {
		Vue.http.get(url).then((response) => {
			resolve(response.body)
		}, reject)
	})
}

export const fetchLatest = () => {
  var url = API.latest
  return fetchGet(url).then((response) => {
		response.stories.forEach((item) => item.images = item.images.map((img) => zhihuimg(img)))
		response.top_stories.forEach((item) => item.image = zhihuimg(item.image))
		return response
	})
}

export const fetchHistory = dtime => {
  var url = API.history+dtime
  return fetchGet(url).then((response) => {
		response.stories.forEach((item) => item.images = item.images.map((img) => zhihuimg(img)))
		return response
	})
}

export const fetchArticle = aid => {
  var url = API.article + aid;
  return fetchGet(url).then((item) => {
		item.body = item.body.replace(/src="http/g, 'src"' + zhihuimg('http'))
		item.image = zhihuimg(item.image);
		item.images = item.images.map((img) => zhihuimg(img));
		return item
	})
}

export const fetchComments = aid => {
  var url = API.cmtLong + aid + "/long-comments";
  var url1 = API.cmtShort + aid + "/short-comments";
  var commentsData = [];
  return fetchGet(url).then((response) => {
		response.comments.forEach((comment) => comment.avatar = zhihuimg(comment.avatar))
		commentsData.push(response)
		return fetchGet(url1).then((response1) => {
			response1.comments.forEach((comment1) => comment1.avatar = zhihuimg(comment1.avatar))
			commentsData.push(response1)
			return commentsData;
		})
	})
}