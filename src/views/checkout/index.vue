<template>
  <div>
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-input v-model="searchQuery" placeholder="请输入商品ID" style="width: 200px; margin-right: 10px;"></el-input>
      <el-button type="primary" @click="searchProduct">搜索</el-button>

      <!-- 总金额和结账按钮 -->
      <div style="margin: 20px 0;">
        <span style="font-size: 18px; margin-right: 20px;">总金额: {{ totalAmount.toFixed(2) }} 元</span>
        <el-button type="success" @click="checkout">结账</el-button>
      </div>

      <!-- 临时购物车表格 -->
      <el-table :data="cartItems" border style="margin: 10px 0;">
        <el-table-column label="商品ID" prop="id" align="center"></el-table-column>
        <el-table-column label="商品名称" prop="name" align="center"></el-table-column>
        <el-table-column label="商品图片" align="center">
          <template #default="{ row }">
            <img
                :src="row.image"
                alt="商品图片"
                style="width: 50px; height: 50px; object-fit: cover;"
            />
          </template>
        </el-table-column>
        <el-table-column label="单价" prop="price" align="center"></el-table-column>
        <el-table-column label="数量" align="center">
          <template #default="{ row }">
            <el-input-number
                v-model="row.quantity"
                :min="1"
                :max="row.stock"
                @change="updateCart(row)"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="小计" align="center">
          <template #default="{ row }">
            {{ (row.price * row.quantity).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button type="danger" size="small" @click="removeFromCart(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 结账对话框 -->
    <el-dialog v-model="checkoutDialogVisible" title="结账">
      <el-form label-width="80px">
        <el-form-item label="会员号">
          <el-input v-model="memberId" placeholder="请输入会员号"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="checkoutDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmCheckout">确认结账</el-button>
      </template>
    </el-dialog>

    <!-- 商品详情对话框 -->
    <el-dialog v-model="productDialogVisible" title="商品信息">
      <el-form label-width="80px">
        <el-form-item label="商品ID">
          <el-input :value="dialogProduct?.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input :value="dialogProduct?.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input :value="dialogProduct?.price" readonly></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input :value="dialogProduct?.stock" readonly></el-input>
        </el-form-item>
        <el-form-item label="购买数量">
          <el-input-number
              v-model="dialogQuantity"
              :min="1"
              :max="dialogProduct?.stock"
              style="width: 100%;"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="productDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addToCart">加入购物车</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { reqProductById, reqCheckout } from "@/api/checkout";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";

const searchQuery = ref<string>(""); // 搜索框输入的商品ID
const cartItems = ref<any[]>([]); // 临时购物车商品列表
const checkoutDialogVisible = ref<boolean>(false); // 结账对话框是否显示
const memberId = ref<string>(""); // 会员号
const userStore = useUserStore(); // 用户信息
const productDialogVisible = ref<boolean>(false); // 商品信息对话框是否显示
const dialogProduct = ref<any | null>(null); // 当前查询的商品信息
const dialogQuantity = ref<number>(1); // 商品数量

// 计算总金额
const totalAmount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

// 搜索商品
const searchProduct = async () => {
  if (!searchQuery.value) {
    ElMessage.warning("请输入商品ID");
    return;
  }
  const result = await reqProductById(parseInt(searchQuery.value));
  if (result.code === 1) {
    const product = result.data;
    // 检查商品是否上架
    if (product.status !== 1) {
      ElMessage.warning("该商品未上架");
      return;
    }
    // 检查库存数量
    if (product.stock <= 0) {
      ElMessage.warning("该商品库存不足");
      return;
    }
    // 显示商品信息到对话框
    dialogProduct.value = product;
    dialogQuantity.value = 1; // 默认数量为1
    productDialogVisible.value = true; // 打开商品信息对话框
  } else {
    ElMessage.error(result.msg);
  }
};

// 更新购物车商品数量
const updateCart = (row: any) => {
  const index = cartItems.value.findIndex((item) => item.id === row.id);
  if (index !== -1) {
    cartItems.value[index] = row;
  }
};

// 删除商品
const removeFromCart = (row: any) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== row.id);
};

// 结账
const checkout = () => {
  if (cartItems.value.length === 0) {
    ElMessage.warning("购物车为空");
    return;
  }
  checkoutDialogVisible.value = true;
};

// 确认结账
const confirmCheckout = async () => {
  const order = {
    memberId: memberId.value,
    employeeId: userStore.userId,
    items: cartItems.value.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    })),
  };
  const result = await reqCheckout(order);
  if (result.code === 1) {
    ElMessage.success("结账成功");
    cartItems.value = []; // 清空购物车
    checkoutDialogVisible.value = false; // 关闭对话框
  } else {
    ElMessage.error(result.msg);
  }
};

// 将商品加入购物车
const addToCart = () => {
  if (!dialogProduct.value) return;

  const item = {
    ...dialogProduct.value,
    quantity: dialogQuantity.value,
  };

  // 检查是否已存在该商品
  const existingItem = cartItems.value.find((item) => item.id === dialogProduct.value.id);
  if (existingItem) {
    existingItem.quantity += dialogQuantity.value; // 增加数量
  } else {
    cartItems.value.push(item); // 添加到购物车
  }

  ElMessage.success("商品已加入购物车");
  productDialogVisible.value = false; // 关闭对话框
};
</script>


<style scoped>

</style>