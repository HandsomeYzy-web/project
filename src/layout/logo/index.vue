<template>
  <div class="logo" v-if="!setting.logoHidden">
    <div class="logo-img">
      <img :src="setting.logo" alt="logo">
    </div>
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from "@/setting";
</script>

<script lang="ts">
export default {
  name: 'Logo'
}
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  .logo-img {
    border-radius: 50%;
    overflow: hidden;
    width: 30px;
    height: 30px;
    min-width: 30px;
  }
  img {
    width: 30px;
    height: 30px;
  }
  p {
    margin-left: 10px;
    font-size: $base-logo-title-fontSize;
    text-wrap: nowrap;
  }
}
</style>