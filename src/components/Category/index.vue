<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select style="width: 250px" v-model="category1Id">
          <el-option v-for="(category1,index) in category1Arr" :key="category1.id" :label="category1.name" :value="category1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select style="width: 250px">
          <el-option label="全部"></el-option>
          <el-option label="手机"></el-option>
          <el-option label="电脑"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select style="width: 250px">
          <el-option label="全部"></el-option>
          <el-option label="手机"></el-option>
          <el-option label="电脑"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reqCategory1 } from "@/api/product/attr";
import { onMounted ,ref } from "vue";
let category1Arr = ref<any>([]);
let category1Id = ref<number>("");
onMounted(() => {
  getCategory1();
});
const getCategory1 = async () => {
  let result: any = await reqCategory1();
  if (result.code === 1) {
    category1Arr.value = result.data;
  }
};
</script>


<style scoped>

</style>