import type { XtxGuessInstance } from "@/types/components"
import { ref } from "vue"

// 封装组合式函数---猜你喜欢组件
export const useGuessList = () => {
  // 获取组件实例
  const guessRef = ref<XtxGuessInstance>()
  // 滚动触底事件
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }
  // 返回ref和事件处理函数
  return { guessRef, onScrolltolower }
}
