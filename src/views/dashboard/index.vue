<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dashBoard } from '@/api/dashboard.js'
export default {
  name: 'Dashboard',
  data() {
    return {
      res: ''
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    dashBoard().then((res) => {

    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
