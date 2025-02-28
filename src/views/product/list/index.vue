<template>
  <div>
    <el-card>
      <el-select v-model="categoryFilter" placeholder="按分类筛选" style="margin-left: 10px;" @change="handleCategoryFilterChange">
        <el-option label="全部" value="all"></el-option>
        <el-option label="食品" value="food"></el-option>
        <el-option label="饮料" value="drink"></el-option>
        <el-option label="日用品" value="daily"></el-option>
        <el-option label="其他" value="other"></el-option>
      </el-select>
    </el-card>
    <el-card class="box-card" style="margin: 10px 0px">
      <el-button type="primary" size="default" icon="Plus" @click="addProduct">添加商品</el-button>
      <el-table style="margin: 10px 0px" border :data="productArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="商品分类" prop="category"></el-table-column>
        <el-table-column label="库存数量" prop="stock"></el-table-column>
        <el-table-column label="单价" prop="price"></el-table-column>
        <el-table-column label="供应商" prop="supplierId"></el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-switch
                v-model="row.status"
                :active-value="1"
                :inactive-value="0"
                active-text="上架"
                inactive-text="下架"
                @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="Edit" @click="updateProduct(row)"></el-button>
            <el-popconfirm :title="`确定删除${row.name}吗?`" width="250px" icon="Delete" @confirm="removeProduct(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
            <el-button type="primary" size="small" icon="Plus" @click="addReplenishment(row)"></el-button>
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
    <!-- 添加/编辑商品对话框 -->
    <el-dialog v-model="dialogFormVisible" :title="title">
      <el-form label-width="80px" :model="productParams" :rules="rules" ref="formRef">
        <el-form-item label="商品名称" prop="name">
          <el-input placeholder="请输入商品名称" v-model="productParams.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category">
          <el-select v-model="productParams.category" placeholder="请选择分类">
            <el-option label="食品" value="food"></el-option>
            <el-option label="饮料" value="drink"></el-option>
            <el-option label="日用品" value="daily"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存数量" prop="stock">
          <el-input placeholder="请输入库存数量" v-model="productParams.stock"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input placeholder="请输入单价" v-model="productParams.price"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierId">
          <el-select v-model="productParams.supplierId" placeholder="请选择供应商">
            <el-option
                v-for="supplier in supplierList"
                :key="supplier.userId"
                :label="supplier.username"
                :value="supplier.userId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input type="textarea" placeholder="请输入商品描述" v-model="productParams.description"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/upload"
              :show-file-list="false"
              :on-success="handleImageSuccess"
              :before-upload="beforeImageUpload"
          >
            <img v-if="productParams.image" :src="productParams.image" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
              v-model="productParams.status"
              :active-value="1"
              :inactive-value="0"
              active-text="上架"
              inactive-text="下架"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="replenishmentDialogVisible" title="申请补货" width="30%">
      <el-form label-width="80px" :model="replenishmentParams">
        <el-form-item label="补货数量" prop="name">
          <el-input placeholder="请输入补货数量" v-model="replenishmentParams.quantity"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleCancelReplenishment">取 消</el-button>
        <el-button type="primary" @click="confirmRepl">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { reqHasProduct, reqAddProduct, reqUpdateProduct, reqDeleteProduct, reqUpdateProductStatus } from '@/api/product/list';
import { reqHasTrademark } from '@/api/product/trademark';
import type { Product, ProductResponseData, trademarkResponseData } from '@/api/product/list/type';
import { reqAddReplenishment } from "@/api/product/replenishment";
import type { replenishment } from '@/api/product/replenishment/type';
import { ElMessage, UploadProps } from 'element-plus';
import useUserStore from "@/store/modules/user";

let userStore = useUserStore();

// 分页和筛选相关
let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let categoryFilter = ref<string>('all');

// 商品列表
let productArr = ref<Product[]>([]);

// 对话框相关
let dialogFormVisible = ref<boolean>(false);
let title = ref<string>('添加商品');
let formRef = ref();

// 补货对话框
let replenishmentDialogVisible = ref<boolean>(false);

// 补货表单数据
let replenishmentParams = reactive<replenishment>({
  id: 0,
  productId: 0,
  quantity: 0,
  requesterId: '',
  approverId: '',
  supplierId: '',
  status: '',
  createdAt: '',
  updatedAt: '',
});

// 供应商列表
let supplierList = ref<any[]>([]);

// 商品表单数据
let productParams = reactive<Product>({
  id: 0,
  name: '',
  category: '',
  stock: 0,
  price: 0,
  supplierId: null, // 初始化为 null
  description: '',
  image: '',
  status: 1,
  createdAt: '',
  updatedAt: '',
});

// 表单验证规则
const rules = reactive({
  name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
  ],
  category: [
    { required: true, message: '请选择商品分类', trigger: 'change' },
  ],
  stock: [
    { required: true, message: '请输入库存数量', trigger: 'blur' },
  ],
  price: [
    { required: true, message: '请输入单价', trigger: 'blur' },
  ],
  supplierId: [
    { required: true, message: '请选择供应商', trigger: 'change' },
  ],
  description: [
    { required: true, message: '请输入商品描述', trigger: 'blur' },
  ],
});

// 获取商品列表
const getHasProduct = async () => {
  let result: ProductResponseData = await reqHasProduct(pageNo.value, limit.value, categoryFilter.value);
  if (result.code === 1) {
    productArr.value = result.data.records;
    total.value = result.data.total;
  } else {
    ElMessage.error(result.msg);
  }
};

// 获取供应商列表
const getSuppliers = async () => {
  let result: trademarkResponseData = await reqHasTrademark(1, 100); // 假设每页100条数据
  if (result.code === 1) {
    supplierList.value = result.data.records;
    console.log('供应商列表:', supplierList.value); // 打印供应商列表
  } else {
    ElMessage.error(result.msg);
  }
};

// 分页切换
const handlePageChange = (newPage: number) => {
  pageNo.value = newPage;
  getHasProduct();
};

// 每页条数切换
const handleSizeChange = (newSize: number) => {
  limit.value = newSize;
  pageNo.value = 1;
  getHasProduct();
};

// 分类筛选
const handleCategoryFilterChange = () => {
  pageNo.value = 1;
  getHasProduct();
};

// 添加商品
const addProduct = () => {
  title.value = '添加商品';
  Object.assign(productParams, {
    id: 0,
    name: '',
    category: '',
    stock: 0,
    price: 0,
    supplierId: null, // 初始化为 null
    description: '',
    image: '',
    status: 1,
  });
  dialogFormVisible.value = true;
};

const addReplenishment = (row: Product) => {
  replenishmentParams.requesterId = userStore.userId;
  replenishmentParams.productId = row.id;
  replenishmentParams.supplierId = row.supplierId;
  replenishmentParams.approverId = '';
  replenishmentParams.status = 'pending';
  replenishmentParams.quantity = 0;
  replenishmentDialogVisible.value = true;
};

const handleCancelReplenishment = () => {
  replenishmentDialogVisible.value = false;
};

const confirmRepl = async () => {
  let result = await reqAddReplenishment(replenishmentParams);
  if (result.code === 1) {
    ElMessage.success('申请成功！');
    replenishmentDialogVisible.value = false;
  } else {
    ElMessage.error(result.msg);
  }
}

// 修改商品
const updateProduct = (row: Product) => {
  title.value = '修改商品';
  Object.assign(productParams, row);
  dialogFormVisible.value = true;
};

// 删除商品
const removeProduct = async (id: number) => {
  let result = await reqDeleteProduct(id);
  if (result.code === 1) {
    ElMessage.success('删除成功！');
    getHasProduct();
  } else {
    ElMessage.error(result.msg);
  }
};

// 切换商品状态
const handleStatusChange = async (row: Product) => {
  let result = await reqUpdateProductStatus(row.id, row.status);
  if (result.code === 1) {
    ElMessage.success('状态更新成功！');
  } else {
    ElMessage.error(result.msg);
  }
};

// 提交表单
const confirm = async () => {
  // 验证表单
  await formRef.value.validate((valid: boolean) => {
    if (!valid) {
      ElMessage.error('请填写完整信息');
      return;
    }
  });

  // 转换 supplierId 为数字
  const params = {
    ...productParams,
    supplierId: Number(productParams.supplierId),
  };

  if (productParams.id === 0) {
    // 添加商品
    let result = await reqAddProduct(params);
    if (result.code === 1) {
      ElMessage.success('添加成功！');
      dialogFormVisible.value = false;
      getHasProduct();
    } else {
      ElMessage.error(result.msg);
    }
  } else {
    // 修改商品
    let result = await reqUpdateProduct(params);
    if (result.code === 1) {
      ElMessage.success('修改成功！');
      dialogFormVisible.value = false;
      getHasProduct();
    } else {
      ElMessage.error(result.msg);
    }
  }
};

// 取消
const cancel = () => {
  dialogFormVisible.value = false;
};

// 图片上传成功
const handleImageSuccess: UploadProps['onSuccess'] = (response) => {
  productParams.image = response.data;
};

// 图片上传前校验
const beforeImageUpload: UploadProps['beforeUpload'] = (file) => {
  const isImage = file.type.startsWith('image/');
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isImage) {
    ElMessage.error('请上传图片文件！');
  }
  if (!isLt10M) {
    ElMessage.error('图片大小不能超过10MB！');
  }
  return isImage && isLt10M;
};

// 初始化加载
onMounted(async () => {
  await getHasProduct();
  await getSuppliers(); // 获取供应商列表
});
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>