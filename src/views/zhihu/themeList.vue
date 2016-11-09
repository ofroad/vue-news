<style>
    .card-list {
        position: relative;
        padding: 0;
        padding-top: 5rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #ECECEC;
    }
    
    @media all and (max-width: 768px) {
        .card-list {
            padding-top: 0rem;
        }
    }
</style>

<template>
    <section class="card-list">
        <cov-card :data="data" v-for="data in list"></cov-card>  
    </section>
</template>

<script>
    import covCard from './themeCard.vue'
    import {
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                list: []
            }
        },
        components: {
            covCard
        },
        created() {
            this.fetchList(this.$route.params.id)
        },
        methods: {
            ...mapActions([
                'fetchTheme'
            ]),
            fetchList(id) {
                this.fetchTheme(id)
                    .then(data => {
                        let list = []
                        for (let story of data.stories) {
                            list.push({
                                name: story.title,
                                img: story.images ? story.images[0] : '',
                                id: story.id
                            })
                        }
                        this.list = list
                    })
                    .catch(console.log)
            }
        }
    }
</script>