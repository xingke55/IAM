<template>
  <div>
    <div class="header">
      <div class="left-content">
        <img style="height: 25px; float: left" src="@/assets/newLogo.png" alt="" />
        <div class="title">河钢统一认证系统</div>
      </div>
      <div class="right-content">
        <LoginOut />
      </div>
    </div>
    <div :class="classObj" class="app-wrapper">
      <div
        v-if="device === 'mobile' && sidebar.opened"
        class="drawer-bg"
        @click="handleClickOutside"
      />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{ 'fixed-header': fixedHeader }">
          <navbar />
        </div>
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import LoginOut from './components/LoginOut.vue'

import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    LoginOut
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  position: fixed;
  z-index: 999;
  padding: 0 16px;
  background-color: #fff;
  box-shadow: 0 1px 10px #0003;
  top: 0;
  left: 0;
  .left-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .right-content {
  }
  .title {
    letter-spacing: 2px;
    font-size: 25px;
    font-weight: bolder;
    width: 600px;
    margin-left: 10px;
  }
}
.app-wrapper {
  @include clearfix;
  position: relative;
  margin-top: 60px;
  height: calc(100vh - 60px);
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
