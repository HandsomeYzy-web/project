<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="layoutSettingStore.fold?'Expand':'Fold'" />
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index">
      <el-icon style="margin: 0px 2px;">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0px 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting";
import { useRoute } from "vue-router";

let layoutSettingStore = useLayOutSettingStore();
let $route = useRoute();
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold;
}
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>

<style scoped>

</style>