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
    <div class="list-container">
        <cov-card :data="card" v-for="card in themes"></cov-card>   
    </div>
</template>

<script>
    import covCard from './card.vue'
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        components: {
            covCard
        },
        created() {
            this.fetchList()
        },
        computed: {
            ...mapGetters([
                'themes'
            ])
        },
        methods: {
            ...mapActions([
                'setThemes', 'fetchThemes'
            ]),
            fetchList() {
                this.fetchThemes().then(data => {
                    let arr = []
                    for (let theme of data.others) {
                        arr.push({
                            description: theme.description,
                            name: theme.name,
                            img: theme.thumbnail,
                            id: theme.id,
                            color: theme.color
                        })
                    }
                    this.setThemes(arr)
                })

            }
        }
    }
</script>