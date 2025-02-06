// 登录表单类型
export interface loginForm {
  userId: string
  password: string
}

interface userInfo {
    id: number
    userId: string
    username: string
    password: string
    role: string
    email: string
    phone: string
    status: number
    createdAt: string
    updatedAt: string
}

// 登录返回类型
export interface loginResponse {
    code: number,
    msg: string,
    data: userInfo
}