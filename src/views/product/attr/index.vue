<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene==0">
        <el-button @click="addAttr" type="primary" size="default" icon="Plus" :disabled="!categoryStore.category3Id">
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0px" :data="attArr">
          <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
          <el-table-column label="属性名称" width="200px" prop="attrName"></el-table-column>
          <el-table-column label="属性值">
            <template #default="{row, $index}">
              <el-tag v-for="(item,index) in row.attrValueList" :key="item.id" style="margin: 5px">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template #="{row,$index}">
              <el-button @click="updateAttr(row)" type="primary" size="small" icon="Edit"></el-button>
              <el-popconfirm :title="`确定删除${row.attrName}吗?`" @confirm="deleteAttr(row.id)" width="200px">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene==1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button :disabled="!attrParams.attrName" @click="addAttrValue" icon="Plus" type="primary" size="default">添加属性值</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{row, $index}">
              <el-input placeholder="请输入属性值名称" v-model="row.valueName" v-if="row.flag" @blur="toLook(row,$index)" :ref="(vc:any)=>inputArr[$index] = vc"></el-input>
              <div v-else @click="toEdit(row,$index)">{{row.valueName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{row,$index}">
              <el-button type="danger" size="small" @click="attrParams.attrValueList.splice($index,1)" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length<=0">保存</el-button>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {watch, ref, reactive, nextTick,onBeforeUnmount} from "vue";
import {reqAttr,reqAddAttr,reqDeleteAttr} from "@/api/product/attr";
import useCategoryStore from "@/store/modules/category";
import {AttrResponseData, Attr} from "@/api/product/attr/type";
import {ElMessage} from "element-plus";

let categoryStore = useCategoryStore();
let attArr = ref<Attr[]>([]);
let scene = ref<number>(0); // 0代表table, 1代表添加与修改
let attrParams = reactive<Attr>({
  attrName: "",
  categoryId:'',
  categoryLevel: 3,
  attrValueList: []
})
let inputArr = ref<any>([]);
watch(() => categoryStore.category3Id, () => {
  attArr.value = [];
  if (!categoryStore.category3Id) {
    return;
  }
  getAttr();
})
const getAttr = async () => {
  const {category3Id} = categoryStore;
  let result: AttrResponseData = await reqAttr(category3Id);
  if (result.code === 1) {
    attArr.value = result.data;
  }
}
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: "",
    categoryId:'',
    categoryLevel: 3,
    attrValueList: []
  })
  scene.value = 1;
  attrParams.categoryId = categoryStore.category3Id;
}
const updateAttr = (row:Attr) => {
  scene.value = 1;
  // 实现深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
}
const cancel = () => {
  scene.value = 0;
}
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: "",
    flag:true
  });
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length-1].focus();
  });
}
const save = async () => {
  attrParams.categoryId = categoryStore.category3Id;
  attrParams.categoryLevel = 3;
  let result = await reqAddAttr(attrParams);
  if (result.code === 1) {
    cancel();
    ElMessage.success("添加成功");
    await getAttr();
  } else {
    ElMessage.error(result.msg);
  }
  attrParams.id = undefined;
}
const toLook = (row,$index) => {
  if (row.valueName.trim()=='') {
    attrParams.attrValueList.splice($index,1);
    ElMessage.error("属性值不能为空");
    return;
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName == row.valueName;
    }
  });
  if (repeat) {
    attrParams.attrValueList.splice($index,1);
    ElMessage.error("属性值不能重复");
    return;
  }
  row.flag = false;
}
const toEdit = (row,$index) => {
  row.flag = true;
  nextTick(() => {
    inputArr.value[$index].focus();
  })
}
const deleteAttr = async (id:number) => {
  let result = await reqDeleteAttr(id);
  if (result.code === 1) {
    ElMessage.success("删除成功");
    await getAttr();
  } else {
    ElMessage.error(result.msg);
  }
}
onBeforeUnmount(() => {
  categoryStore.$reset();
})
</script>

<style scoped>

</style>
