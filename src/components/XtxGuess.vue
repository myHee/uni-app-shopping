<script setup lang="ts">
import { getHomeGoodsGuessLikeAPI } from '@/services/home'
import type { PageParams } from '@/types/global'
import type { GuessItem } from '@/types/home'
import { onMounted, ref } from 'vue'

// 获取 猜你喜欢 列表数据
// Required<PageParams> 将可选参数转为必传
const pageParams: Required<PageParams> = {
  page: import.meta.env.DEV ? 32 : 1,
  pageSize: 10,
}
// 已结束标识：标识数据是否已全部加载
const finish = ref(false)
const guessList = ref<GuessItem[]>([])
const getHomeGoodsGuessLikeData = async () => {
  // 退出判断
  if (finish.value) return uni.showToast({ icon: 'none', title: '没有更多数据了' })

  const res = await getHomeGoodsGuessLikeAPI(pageParams)
  guessList.value.push(...res.result.items)

  // 分页条件
  if (pageParams.page < res.result.pages) pageParams.page++
  else finish.value = true
}

const resetData = () => {
  // 重置页码、数据列表、结束标识
  pageParams.page = 1
  guessList.value = []
  finish.value = false
}

// 组件挂载完毕
onMounted(() => {
  getHomeGoodsGuessLikeData()
})

// 暴露方法
defineExpose({
  resetData,
  getMore: getHomeGoodsGuessLikeData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/goods?id=4007498`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name"> {{ item.name }} </view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text">{{ finish ? '没有更多数据了' : ' 正在加载...' }} </view>
</template>

<style lang="scss">
@import '@/components/styles/XtxGuess.scss';
</style>
