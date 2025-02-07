// 封装本体存储和读取方法
export const SET_TOKEN = (token: string) => {
    localStorage.setItem('TOKEN', token);
}
export const GET_TOKEN = () => {
    return localStorage.getItem('TOKEN');
}