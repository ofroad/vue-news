<style>
    .about-container {
        text-align: center;
    }
    
    .github-box {
        position: relative;
        display: inline-block;
        background-color: #fff;
        height: 16rem;
        width: 30rem;
        border-top: 2px solid #d26911;
        padding: 2rem;
        box-sizing: border-box;
        text-align: left;
    }
    
    .github-box a {
        text-decoration: blink;
    }
    
    .github-description {
        margin: 1rem 0;
        font-size: 2rem;
    }
    
    .github-star {
        margin: 6rem 0 0 0;
        font-size: 1.5rem;
        text-align: right;
    }
    
    .github-star a {
        color: #000;
        float: right;
        display: inline-block;
        text-align: right;
    }
</style>

<template>
    <div class="about-container">
         <div class="github-box">
            <br>
            <p class="github-description">VUE - 知乎日报</p>
            <p class="github-star"><a href="https://github.com/ChGeometry">BY - GEOMETRY</a></p>
            <br>
         </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                author: 'GEOMETRY'
            }
        }
    }
</script>