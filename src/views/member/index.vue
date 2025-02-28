<template>
  <div>
    <el-card class="box-card">
      <!-- 积分显示 -->
      <div style="margin-bottom: 20px;">
        <span style="font-size: 18px;">当前积分: {{ points }}</span>
      </div>

      <!-- 历史订单列表 -->
      <el-table :data="orders" border style="margin: 10px 0;">
        <el-table-column label="订单号" prop="id" align="center"></el-table-column>
        <el-table-column label="总金额" prop="totalAmount" align="center">
          <template #default="{ row }">
            {{ row.totalAmount.toFixed(2) }} 元
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createdAt" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="viewOrderDetails(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 订单详情对话框 -->
    <el-dialog v-model="orderDetailsVisible" title="订单详情">
      <el-table :data="orderDetails" border>
        <el-table-column label="商品ID" prop="productId" align="center"></el-table-column>
        <el-table-column label="商品名称" prop="productName" align="center"></el-table-column>
        <el-table-column label="商品图片" align="center">
          <template #default="{ row }">
            <img
                :src="row.image"
                alt="商品图片"
                style="width: 50px; height: 50px; object-fit: cover;"
            />
          </template>
        </el-table-column>
        <el-table-column label="单价" prop="price" align="center">
          <template #default="{ row }">
            {{ row.price.toFixed(2) }} 元
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="quantity" align="center"></el-table-column>
        <el-table-column label="小计" align="center">
          <template #default="{ row }">
            {{ (row.price * row.quantity).toFixed(2) }} 元
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button @click="orderDetailsVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqUserPoints, reqUserOrders, reqOrderDetails } from "@/api/member";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";

const points = ref<number>(0); // 用户积分
const orders = ref<any[]>([]); // 历史订单列表
const orderDetails = ref<any[]>([]); // 订单详情
const orderDetailsVisible = ref<boolean>(false); // 订单详情对话框是否显示
const userStore = useUserStore(); // 用户信息

// 加载用户积分
const loadUserPoints = async () => {
  const result = await reqUserPoints(userStore.userId);
  if (result.code === 1) {
    points.value = result.data.points;
  } else {
    ElMessage.error(result.msg);
  }
};

// 加载历史订单
const loadUserOrders = async () => {
  const result = await reqUserOrders(userStore.userId);
  if (result.code === 1) {
    orders.value = result.data;
  } else {
    ElMessage.error(result.msg);
  }
};

// 查看订单详情
const viewOrderDetails = async (order: any) => {
  const result = await reqOrderDetails(order.id);
  if (result.code === 1) {
    orderDetails.value = result.data;
    orderDetailsVisible.value = true;
  } else {
    ElMessage.error(result.msg);
  }
};

// 初始化加载数据
onMounted(async () => {
  await loadUserPoints();
  await loadUserOrders();
});
</script>

<style scoped>
</style>