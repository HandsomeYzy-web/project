// 登录表单类型
export interface loginForm {
  userId: string
  password: string
}

// 登录返回类型
export interface loginResponse {
    code: number,
    msg: string,
    data: string
}

// 用户信息类型
export interface userInfo extends loginResponse{
  data: {
      username: string,
      userId: string,
      role: string,
      email: string,
      phone: string,
      status: number,
      createdAt: string,
      updatedAt: string
  }
}

export interface User {
    userId: string;
    username: string;
    avatar: string;
    email: string;
    phone: string;
    role: string;
    status: number;
    createdAt: string;
    updatedAt: string;
}

export interface UserListResponse {
    code: number;
    msg: string;
    data: {
        total: number;
        records: User[];
    };
}