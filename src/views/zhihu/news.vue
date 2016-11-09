<style src="../../assets/zhi.css"></style>
<style>
    .news-content {
        width: 80rem;
        margin-left: auto;
        margin-right: auto;
        box-shadow: 0 0 .625rem .08rem rgba(0, 0, 0, .05);
    }
    
    .news-content p>img {
        width: 100%;
    }
    
    .news-cover {
        height: 25rem;
        background-size: cover;
        position: relative;
    }
    
    .news-title {
        font-size: 3rem;
        color: #fff;
        position: absolute;
        bottom: 4rem;
        width: 75rem;
        left: 2.5rem;
    }
    
    .news-cover-source {
        color: #E2E2E2;
        bottom: .5rem;
        right: 2.5rem;
        position: absolute;
        font-size: 1.5rem;
    }
    
    p {
        font-size: 1.6rem;
        line-height: 2;
    }
    
    .main-wrap {
        max-width: 80rem;
    }
    
    @media all and (max-width: 768px) {
        .news-content {
            width: 100%;
        }
        .news-title {
            width: 100%;
            left: 0;
            padding: 1rem;
            box-sizing: border-box;
        }
    }
</style>
<template>
    <article class="news-item">
        <div class="news-content">
            <div v-if="hasCoverImage" class="news-cover" :style="{'background-image': 'url('+ coverImage +')'}">
                <p class="news-title">{{news.title}}</p>
                <span class="news-cover-source">{{news.image_source}}</span>
            </div>
            <div class="contentBody" v-html="news.body"></div>
</div>
</article>
</template>

<script>
    import {
        WAIT_IMG
    } from '../../common/index'
    import {
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                hasCoverImage: false,
                coverImage: WAIT_IMG,
                news: {}
            }
        },
        created() {
            this.fetchNews(this.$route.params.id)
        },
        methods: {
            ...mapActions([
                'fetchArticle'
            ]),
            fetchNews(id) {
                this.fetchArticle(id)
                    .then(data => {
                        this.news = data
                        if (this.news.images && this.news.images.length) {
                            coverImage = this.news.images[0]
                            this.hasCoverImage = true
                        }
                    })
                    .catch(console.log)
            }
        }
    }
</script>