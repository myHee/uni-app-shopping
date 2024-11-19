<script setup lang="ts">
import CartMain from './components/Cart.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <CartMain :safeBottom="safeAreaInsets?.bottom" />
</template>

<style lang="scss">
page {
  height: 100%;
}
</style>
