<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select style="width: 250px" v-model="categoryStore.category1Id" @change="handle" :disabled="scene">
          <el-option v-for="(category1,index) in categoryStore.category1List" :key="category1.id" :label="category1.name" :value="category1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select style="width: 250px" v-model="categoryStore.category2Id" @change="handle1" :disabled="scene">
          <el-option v-for="(category2,index) in categoryStore.category2List" :key="category2.id" :label="category2.name" :value="category2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select style="width: 250px" v-model="categoryStore.category3Id" :disabled="scene">
          <el-option v-for="(category3,index) in categoryStore.category3List" :key="category3.id" :label="category3.name" :value="category3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category";
import { onMounted } from "vue";
let categoryStore = useCategoryStore();
onMounted(() => {
  getCategory1();
});
const getCategory1 = () => {
  categoryStore.getCategory1();
};
const handle = () => {
  categoryStore.category2Id = "";
  categoryStore.category3Id = "";
  categoryStore.category3List = [];
  categoryStore.getCategory2();
};
const handle1 = () => {
  categoryStore.category3Id = "";
  categoryStore.getCategory3();
};
defineProps(['scene']);
</script>


<style scoped>

</style>