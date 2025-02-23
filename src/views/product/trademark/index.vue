<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
      <el-table style="margin: 10px 0px" border :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称" prop="username"></el-table-column>
        <el-table-column label="品牌Logo">
          <template #default="{ row }">
            <img
                :src="row.avatar"
                alt="品牌Logo"
                style="width: 100px; height: 100px; object-fit: cover;"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
            <el-popconfirm :title="`确定删除${row.username}吗?`" width="250px" icon="Delete" @confirm="removeTrademark(row.userId)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
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
    <!-- 对话框 -->
    <el-dialog v-model="dialogFormVisible" :title=title>
      <el-form label-width="80px" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" prop="username">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.username"></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" prop="avatar">
          <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademarkParams.avatar" :src="trademarkParams.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input :disabled="true" v-model="trademarkParams.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
          <el-input :disabled="true" v-model="trademarkParams.role"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input placeholder="请输入邮箱" v-model="trademarkParams.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input placeholder="请输入电话" v-model="trademarkParams.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input :disabled="true" v-model="statusText" ></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input :disabled="true" v-model="trademarkParams.createdAt"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input :disabled="true" v-model="trademarkParams.updatedAt"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive,computed} from 'vue';
import {reqHasTrademark,reqAddTrademark,reqUpdateTrademark,reqDeleteTrademark} from '@/api/product/trademark';
import type {Records, trademark, trademarkResponseData} from "@/api/product/trademark/type";
import {ElMessage, UploadProps} from 'element-plus'

let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let trademarkArr = ref<Records>([]);
let dialogFormVisible = ref<boolean>(false);
let title = ref<string>('添加品牌');
let formRef = ref();
const trademarkParams = reactive<trademark>({
  userId: '自动生成', // 用户 ID 不可编辑
  username: '',
  avatar: '',
  email: '',
  phone: '',
  role: 'supplier',
  status: 1, // 默认状态
  createdAt: '自动生成', // 创建时间不可编辑
  updatedAt: '自动生成', // 更新时间不可编辑
});

const statusText = computed(() => {
  return trademarkParams.status === 1 ? '启用' : '禁用';
});

const getHasTrademark = async () => {
  let result: trademarkResponseData = await reqHasTrademark(pageNo.value, limit.value);
  if (result.code === 1) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};
const handlePageChange = (newPage: number) => {
  pageNo.value = newPage;
  getHasTrademark();
};
const handleSizeChange = (newSize: number) => {
  limit.value = newSize;
  pageNo.value = 1; // 重置为第一页
  getHasTrademark();
};
onMounted(() => {
  getHasTrademark();
});

const addTrademark = () => {
  title.value = '添加品牌';
  trademarkParams.username = '';
  trademarkParams.avatar = '';
  trademarkParams.email = '';
  trademarkParams.phone = '';
  trademarkParams.role = 'supplier';
  trademarkParams.status = 1;
  trademarkParams.createdAt = '自动生成';
  trademarkParams.updatedAt = '自动生成';
  trademarkParams.userId = '自动生成';
  formRef.value?.clearValidate('username');
  formRef.value?.clearValidate('avatar');
  dialogFormVisible.value = true;
};

const updateTrademark = (row: trademark) => {
  title.value = '修改品牌';
  trademarkParams.username = row.username;
  trademarkParams.avatar = row.avatar;
  trademarkParams.email = row.email;
  trademarkParams.phone = row.phone;
  trademarkParams.role = row.role;
  trademarkParams.status = row.status;
  trademarkParams.createdAt = row.createdAt;
  trademarkParams.updatedAt = row.updatedAt;
  trademarkParams.userId = row.userId;
  formRef.value?.clearValidate('username');
  formRef.value?.clearValidate('avatar');
  dialogFormVisible.value = true;
};

const cancel = () => {
  dialogFormVisible.value = false;
};

const confirm = async () => {
  await formRef.value.validate();
  let result:any;
  if (title.value === '添加品牌') {
    result = await reqAddTrademark(trademarkParams);
  } else {
    result = await reqUpdateTrademark(trademarkParams);
  }
  if (result.code === 1) {
    dialogFormVisible.value = false;
    ElMessage.success(title.value+'成功！');
    await getHasTrademark();
  } else {
    ElMessage.error(result.msg);
  }
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type=='image/png'||rawFile.type=='image/jpeg'||rawFile.type=='image/jpg'||rawFile.type=='image/gif') {
    if (rawFile.size<10*1024*1024) {
      ElMessage.success('图片上传成功！');
      return true;
    } else {
      ElMessage.error('图片大小不能超过10M！');
      return false;
    }
  } else {
    ElMessage.error('请上传图片类型！');
    return false;
  }
};

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  trademarkParams.avatar = response.data;
  formRef.value.clearValidate('avatar');
};

const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length>=2) {
    callback();
  } else {
    callback(new Error('品牌名称不能小于2位！'));
  }
};

const validatorAvatar = (rule: any, value: any, callback: any) => {
  if (trademarkParams.avatar) {
    callback();
  } else {
    callback(new Error('请上传品牌图片！'));
  }
};

const rules = {
  username: [
    { required: true, trigger: 'blur', validator: validatorUserName },
  ],
  avatar: [
    { required: true, validator: validatorAvatar},
  ],
 };

const removeTrademark = async (userId: string) => {
  let result = await reqDeleteTrademark(userId);
  if (result.code === 1) {
    ElMessage.success('删除品牌成功！');
    // 删除后检查当前页是否还有数据
    if (trademarkArr.value.length === 1 && pageNo.value > 1) {
      // 如果当前页只有一条数据且不是第一页，则跳转到前一页
      pageNo.value -= 1;
    }
    await getHasTrademark();
  } else {
    ElMessage.error(result.msg);
  }
}
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