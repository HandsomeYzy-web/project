<template>
  <div>
    <el-card>
      <el-select v-model="roleFilter" placeholder="按角色筛选" style="margin-left: 10px;" @change="handleRoleFilterChange">
        <el-option label="全部" value="all"></el-option>
        <el-option label="管理员" value="admin"></el-option>
        <el-option label="经理" value="manager"></el-option>
        <el-option label="员工" value="staff"></el-option>
        <el-option label="会员" value="member"></el-option>
        <el-option label="供应商" value="supplier"></el-option>
      </el-select>
    </el-card>
    <el-card class="box-card" style="margin: 10px 0px">
      <el-button type="primary" size="default" icon="Plus" @click="addUser">添加用户</el-button>
      <el-table style="margin: 10px 0px" border :data="userArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="头像">
          <template #default="{ row }">
            <img
                :src="row.avatar"
                alt="用户头像"
                style="width: 100px; height: 100px; object-fit: cover;"
            />
          </template>
        </el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-switch
                v-model="row.status"
                :active-value="1"
                :inactive-value="0"
                active-text="启用"
                inactive-text="禁用"
                :disabled="true"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)"></el-button>
            <el-popconfirm :title="`确定删除${row.username}吗?`" width="250px" icon="Delete" @confirm="removeUser(row.userId)">
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
    <el-dialog v-model="dialogFormVisible" :title="title">
      <el-form label-width="80px" :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="userParams.avatar" :src="userParams.avatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input :disabled="true" v-model="userParams.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户角色" prop="role">
          <el-select v-model="userParams.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="经理" value="manager"></el-option>
            <el-option label="员工" value="staff"></el-option>
            <el-option label="会员" value="member"></el-option>
            <el-option label="供应商" value="supplier"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input placeholder="请输入邮箱" v-model="userParams.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input placeholder="请输入电话" v-model="userParams.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
              v-model="userParams.status"
              :active-value="1"
              :inactive-value="0"
              active-text="启用"
              inactive-text="禁用"
          />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input :disabled="true" v-model="userParams.createdAt"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input :disabled="true" v-model="userParams.updatedAt"></el-input>
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
import { ref, onMounted, reactive, computed } from 'vue';
import { reqHasUser, reqAddUser, reqUpdateUser, reqDeleteUser } from '@/api/user';
import type { User, UserListResponse } from '@/api/user/type';
import { ElMessage, UploadProps } from 'element-plus';

let pageNo = ref<number>(1);
let limit = ref<number>(3);
let total = ref<number>(0);
let userArr = ref<User[]>([]);
let dialogFormVisible = ref<boolean>(false);
let title = ref<string>('添加用户');
let formRef = ref();
let roleFilter = ref<string>(''); // 角色筛选条件

const userParams = reactive<User>({
  userId: '自动生成',
  username: '',
  avatar: '',
  email: '',
  phone: '',
  role: '',
  status: 1,
  createdAt: '自动生成',
  updatedAt: '自动生成',
});

const statusText = computed(() => {
  return userParams.status === 1 ? '启用' : '禁用';
});

// 获取用户列表
const getHasUser = async () => {
  let result: UserListResponse = await reqHasUser(pageNo.value, limit.value, roleFilter.value);
  if (result.code === 1) {
    total.value = result.data.total;
    userArr.value = result.data.records;
  }
};

// 分页切换
const handlePageChange = (newPage: number) => {
  pageNo.value = newPage;
  getHasUser();
};

// 每页条数切换
const handleSizeChange = (newSize: number) => {
  limit.value = newSize;
  pageNo.value = 1; // 重置为第一页
  getHasUser();
};

// 角色筛选条件变化
const handleRoleFilterChange = () => {
  pageNo.value = 1; // 重置为第一页
  getHasUser();
};

onMounted(() => {
  getHasUser();
});

// 添加用户
const addUser = () => {
  title.value = '添加用户';
  userParams.username = '';
  userParams.avatar = '';
  userParams.email = '';
  userParams.phone = '';
  userParams.role = '';
  userParams.status = 1;
  userParams.createdAt = '自动生成';
  userParams.updatedAt = '自动生成';
  userParams.userId = '自动生成';
  formRef.value?.clearValidate('username');
  formRef.value?.clearValidate('avatar');
  dialogFormVisible.value = true;
};

// 修改用户
const updateUser = (row: User) => {
  title.value = '修改用户';
  Object.assign(userParams, row); // 将行数据赋值给表单
  formRef.value?.clearValidate('username');
  formRef.value?.clearValidate('avatar');
  dialogFormVisible.value = true;
};

// 取消
const cancel = () => {
  dialogFormVisible.value = false;
};

// 确认
const confirm = async () => {
  await formRef.value.validate();
  let result: any;
  if (title.value === '添加用户') {
    result = await reqAddUser(userParams);
  } else {
    result = await reqUpdateUser(userParams);
  }
  if (result.code === 1) {
    dialogFormVisible.value = false;
    ElMessage.success(title.value + '成功！');
    await getHasUser();
  } else {
    ElMessage.error(result.msg);
  }
};

// 删除用户
const removeUser = async (userId: string) => {
  let result = await reqDeleteUser(userId);
  if (result.code === 1) {
    ElMessage.success('删除用户成功！');
    // 删除后检查当前页是否还有数据
    if (userArr.value.length === 1 && pageNo.value > 1) {
      pageNo.value -= 1; // 如果当前页只有一条数据且不是第一页，则跳转到前一页
    }
    await getHasUser();
  } else {
    ElMessage.error(result.msg);
  }
};

// 头像上传前的校验
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type === 'image/png' || rawFile.type === 'image/jpeg' || rawFile.type === 'image/jpg' || rawFile.type === 'image/gif') {
    if (rawFile.size < 10 * 1024 * 1024) {
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

// 头像上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  userParams.avatar = response.data;
  formRef.value.clearValidate('avatar');
};

// 用户名校验
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 2) {
    callback();
  } else {
    callback(new Error('用户名不能小于2位！'));
  }
};

// 头像校验
const validatorAvatar = (rule: any, value: any, callback: any) => {
  if (userParams.avatar) {
    callback();
  } else {
    callback(new Error('请上传头像！'));
  }
};

// 角色校验
const validatorRole = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error('请选择角色！'));
  }
};

const rules = {
  username: [
    { required: true, trigger: 'blur', validator: validatorUserName },
  ],
  avatar: [
    { required: true, validator: validatorAvatar },
  ],
  role: [
    { required: true, trigger: 'change', validator: validatorRole },
  ],
};
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