<template>
  <svg :style="{ width, height }">
    <use :xlink:href="`${prefix}${name}`" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// 定义 props 的类型
interface IconProps {
  prefix?: string;
  name?: string;
  color?: string;
  width?: string;
  height?: string;
}

// 使用 defineProps 并传入类型
const props = withDefaults(defineProps<IconProps>(), {
  prefix: '#icon-',
  name: 'delete',
  color: '#333',
  width: '16px',
  height: '16px',
});
</script>

<style scoped>

</style>