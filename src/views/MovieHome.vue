<template>
  <div class="home-container">
    <hot-list></hot-list>
  </div>
</template>

<script>
import hotList from '../components/douban/hotList'
export default {
  name: 'moviehome',
  components: {
    'hot-list': hotList
  }
}
</script>