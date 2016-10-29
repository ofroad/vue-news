# vue简单实现知乎日报

> Vue.js 的简单实现
> 知乎日报 Web 版本，基于 Vue 2.0 + Vue-Resource + Vue-Router + Vuex 开发。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 知乎日报的API
	
### 1、最新消息
* URL `http://news-at.zhihu.com/api/4/news/latest`


### 2、历史消息
* URL `http://news.at.zhihu.com/api/4/news/before/20150101`
* 请求 20150101 返回 2014年12月31日 的内容
* 请求日期大于今日 返回今日的内容

### 3、文章详情内容
* URL `http://news-at.zhihu.com/api/4/news/4620055`
* 参数： 最新消息和历史消息返回的字段: id
* 返回信息：
	* body： HTML格式的详情文章
	* title：文只标题
	* image：文章顶部的大图
	* image-source：图片的版权信息
* 特殊情况：
	* `http://news-at.zhihu.com/api/4/story/3942319`
	* 来自之乎日报站外的内容
	* 返回的字段 没有body、img、image-source等字段
	* share_url 字段会跳转到站外文章

#### 3.1、文章详情的点赞数、长评论、短评论数量
* URL `http://news-at.zhihu.com/api/4/story-extra/7033320`
* 返回信息：
	* long_comments： 长评论
	* popularity：点赞数
	* short_comments：短评论数
	* comments：总评论数

### 4、文章长评论
* URL `http://news-at.zhihu.com/api/4/story/4628696/long-comments` 
* story后面即为文章的id

### 5、文章短评论
* URL `http://news-at.zhihu.com/api/4/story/4628696/short-comments` 

### 6、主题日报的列表
* URL `http://news-at.zhihu.com/api/4/themes`

### 7、主题日报内容
* URL `http://news-at.zhihu.com/api/4/theme/2`

## 其他 

### 知乎接口跨域问题
> 服务器用nginx反向代理实现跨域 本地可以用vue里config/index.js 里面的 proxyTable可以代理转发api
### 知乎的图片防盗链
> 主要用到的是Images.weserv.nl这个网站，可以缓存图片，而且可以修改图片的尺寸大小
