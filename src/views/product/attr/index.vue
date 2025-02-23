<template>
  <div>
    <Category></Category>
    <el-card style="margin: 10px 0px">
      <el-button type="primary" size="default" icon="Plus">添加属性</el-button>
      <el-table border style="margin: 10px 0px">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="属性名称" width="200px"></el-table-column>
        <el-table-column label="属性值"></el-table-column>
        <el-table-column label="操作" width="200px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>