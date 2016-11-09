<template>
    <div class="container">
        <cHeader></cHeader>
        <router-view></router-view>
        <cLoading :showTxt="'加载中'" :show="this.isloading"></cLoading>
    </div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import cLoading from './components/loading'
    import cHeader from './components/header'
    export default {
        components: {
            cLoading: cLoading,
            cHeader: cHeader
        },
        computed: {
            ...mapGetters({
                isloading: 'getLoading'
            })
        },
        mounted() {},
        methods: {}
    }
</script>

<style>
    html {
        font-size: 62.5%;
        font-family: Hiragino Sans GB, Helvetica, Arial, STHeiti, WenQuanYi Micro Hei, sans-serif;
    }
    
    * {
        padding: 0;
        margin: 0;
    }
    
    body {
        background-color: #F5F5F5;
    }
    
    .container {
        max-width: 80rem;
        margin-left: auto;
        margin-right: auto;
        padding-top: 7rem;
    }
</style>