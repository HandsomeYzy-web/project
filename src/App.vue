<template>
  <div>
    111111
    <el-button type="primary" :icon="Plus">666</el-button>
    <el-pagination :total="100" ></el-pagination>
    <svg>
      <use xlink:href="#icon-delete"></use> <!-- 引用 home.svg 图标 -->
    </svg>
    <Hello></Hello>
  </div>
</template>

<script setup lang="ts">
import {Plus} from "@element-plus/icons-vue";
import Hello from "@/components/Hello.vue";
</script>

<style scoped>

</style>
