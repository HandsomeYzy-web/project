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