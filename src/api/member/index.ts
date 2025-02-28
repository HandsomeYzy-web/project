import Request from "@/utils/request";

// 获取用户积分
export const reqUserPoints = (userId: string) =>
Request.get<any, ResponseData<{ points: number }>>(`/users/points?userId=${userId}`);

// 获取用户历史订单
export const reqUserOrders = (userId: string) =>
Request.get<any, ResponseData<Order[]>>(`/users/orders?userId=${userId}`);

// 获取订单详情
export const reqOrderDetails = (orderId: number) =>
Request.get<any, ResponseData<OrderItem[]>>(`/order/details?orderId=${orderId}`);

// 订单类型
export interface Order {
id: number;
totalAmount: number;
createdAt: string;
}

// 订单项类型
export interface OrderItem {
productId: number;
productName: string;
price: number;
quantity: number;
}

// 响应数据类型
export interface ResponseData {
code: number;
msg: string;
data?: any;
}