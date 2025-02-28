<template>
  <div>
    <el-card class="box-card">
      <el-table style="margin: 10px 0px" border :data="replenishmentArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="产品id" prop="productId"></el-table-column>
        <el-table-column label="申请id" prop="requesterId"></el-table-column>
        <el-table-column label="供应商id" prop="supplierId"></el-table-column>
        <el-table-column label="创建时间" prop="createdAt"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="View" @click="show(row)"></el-button>
            <el-button type="primary" size="small" icon="Check" @click="updateReplenishment(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
      />
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="补货申请">
      <el-form label-width="80px">
        <el-form-item label="产品名称">
          <el-input disabled v-model="product.name"></el-input>
        </el-form-item>
        <el-form-item label="补货数量">
          <el-input disabled v-model="replenishment.quantity"></el-input>
        </el-form-item>
        <el-form-item label="供货商">
          <el-input disabled v-model="supplier.username"></el-input>
        </el-form-item>
        <el-form-item label="请求人">
          <el-input disabled v-model="requester.username"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input disabled v-model="replenishment.createdAt"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="cancel">关 闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { reqReplenishment,reqUpdateReplenishment } from "@/api/product/replenishment"
import type { replenishment } from "@/api/product/replenishment/type"
import { reqUserInfoById } from "@/api/user"
import type { userInfo } from "@/api/user/type"
import { Product } from "@/api/product/list"
import { reqProductById } from "@/api/product/list"
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";

let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);

let userStore = useUserStore();

let dialogFormVisible = ref<boolean>(false);

let replenishmentArr = ref<replenishment[]>([]);
let supplier = ref<userInfo>();
let requester = ref<userInfo>();
let product = ref<Product>();
let replenishment = reactive<replenishment>({
  productName: '',
  quantity: 0,
  createdAt: ''
});

const getHasReplenishment = async () => {
  let result: replenishmentResponseData = await reqReplenishment(pageNo.value, limit.value, 'approved', userStore.userId);
  if (result.code === 1) {
    replenishmentArr.value = result.data.records;
    total.value = result.data.total;
  } else {
    ElMessage.error(result.msg);
  }
}

const updateReplenishment = async (row) => {
  let result: any = await reqUpdateReplenishment(row.id, 'replenishing', null);
  if (result.code === 1) {
    ElMessage.success('通过成功');
    getHasReplenishment();
  } else {
    ElMessage.error(result.msg);
  }
}

const show = async (row) => {
  let result: any = await reqUserInfoById(row.requesterId);
  if (result.code === 1) {
    requester.value = result.data;
  } else {
    ElMessage.error(result.msg);
  }
  result = await reqUserInfoById(row.supplierId);
  if (result.code === 1) {
    supplier.value = result.data;
  } else {
    ElMessage.error(result.msg);
  }
  result = await reqProductById(row.productId);
  if (result.code === 1) {
    product.value = result.data;
  } else {
    ElMessage.error(result.msg);
  }
  replenishment.productName = row.productName || '';
  replenishment.quantity = row.quantity || 0;
  replenishment.createdAt = row.createdAt || '';

  dialogFormVisible.value = true;
}

const cancel = () => {
  dialogFormVisible.value = false;
};

// 分页切换
const handlePageChange = (newPage: number) => {
  pageNo.value = newPage;
  getHasReplenishment();
};

// 每页条数切换
const handleSizeChange = (newSize: number) => {
  limit.value = newSize;
  pageNo.value = 1;
  getHasReplenishment();
};

onMounted(async () => {
  await getHasReplenishment();
})
</script>

<style scoped>

</style>