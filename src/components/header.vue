<template>
    <nav class="cov-nav">
        <div class="nav-tab" @click="navRoute($event, 'index')">首页</div>
        <div class="nav-tab" @click="navRoute($event, 'themes')">主题日报</div>
        <div class="nav-tab" @click="navRoute($event, 'about')">关于</div>
        <div class="nav-rail">
            <span class="nav-moving" :style="covNav.moving"></span>
        </div>
    </nav>
</template>
<script>
    export default {
        data() {
            return {
                covNav: {
                    navMap: {},
                    currentX: 0,
                    moving: {
                        width: '8px',
                        transform: 'translateX(0px)'
                    }
                }
            }
        },
        mounted() {
            this.initNav()
        },
        methods: {
            navRoute(e, name) {
                this.touchNav(e, () => {
                    this.$router.push({
                        name: name
                    })
                })
            },
            initNav() {
                let x = document.getElementsByClassName('nav-tab')[0].clientWidth * 0.5
                this.covNav.moving = {
                    width: '8px',
                    transform: `translateX(${x}px)`
                }
            },
            moving(w, x) {
                this.covNav.currentX = x
                this.covNav.moving = {
                    width: w + 'px',
                    transform: `translateX(${x - w}px)`
                }
            },
            touchNav(e, after) {
                let parent = e.target.parentNode || e.path[1]
                let count = 1
                for (let node of parent.getElementsByClassName('nav-tab')) {
                    if (node === e.target) {
                        break
                    }
                    count++
                }
                let x = e.target.clientWidth * (count - 0.5)
                this.moving(e.target.clientWidth * 0.8 + x * 0.05, x + e.target.clientWidth * 0.5 + x * 0.05)
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.covNav.moving = {
                            width: '8px',
                            transform: `translateX(${x}px)`
                        }
                        after()
                    }, 100)
                })
            }
        }
    }
</script>
<style>
    .cov-nav {
        position: fixed;
        height: 6rem;
        width: 100%;
        background-color: #33a9d8;
        top: 0;
        left: 0;
        z-index: 2;
        font-size: 1.5rem;
        color: #fff;
    }
    
    .nav-tab {
        display: inline-block;
        height: 6rem;
        line-height: 6rem;
        text-align: center;
        min-width: 8rem;
        cursor: pointer;
    }
    
    .nav-rail {
        position: absolute;
        height: 4px;
        width: 100%;
        bottom: 1rem;
        background-color: #66a9d8;
    }
    
    .nav-moving {
        position: absolute;
        background-color: #4CFFFE;
        height: 8px;
        width: 1rem;
        border-radius: 4px;
        transition-property: transform, width;
        transition-duration: .3s;
        transition-timing-function: ease-out;
        margin-top: -1px;
    }
</style>