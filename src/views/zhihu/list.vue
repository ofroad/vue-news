<style>
    .list-container {}
    
    .more-btn {
        font-size: 1.5rem;
        padding: 1rem 0;
        width: 100%;
        border: 0;
        color: #fff;
        background-color: #33a9d8;
        border: none;
        margin: 10px 0;
        border-radius: .5rem;
        outline: none;
        cursor: pointer;
    }
    
    .more-btn:hover {
        background-color: #455569;
    }
</style>

<template>
    <div class="list-panel">
        <div class="list-container">
            <cov-articles :articles="value.articles" :date="value.date" v-for="value of days"></cov-articles>
        </div>
        <button class="more-btn" @click="dataPointerCalc(true)">更多</button>
    </div>
</template>

<script>
    import covArticles from './articles.vue'
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        components: {
            covArticles
        },
        data() {
            return {
                scroll: true
            }
        },
        created() {
            this.dataPointerCalc()
        },
        computed: {
            ...mapGetters([
                'datePointer', 'days'
            ])
        },
        methods: {
            ...mapActions([
                'fetchHistory', 'setAticles', 'setDatePointer'
            ]),
            dataPointerCalc(plus) {
                if (!this.datePointer.value) {
                    this.setDatePointer(new Date())
                    this.fetchList()
                } else {
                    if (plus) {
                        let nextDay = new Date(this.datePointer.format)
                        this.setDatePointer(new Date(nextDay - 86400000))
                        this.fetchList()
                    }
                }
            },
            fetchList() {
                this.fetchHistory(this.datePointer.value).then(data => {
                    let arr = []
                    for (let article of data.stories) {
                        arr.push({
                            type: 'news',
                            title: article.title,
                            img: article.images[0],
                            id: article.id
                        })
                    }

                    this.setAticles({
                        date: this.datePointer.format,
                        articles: arr
                    })
                })
            }
        }
    }
</script>