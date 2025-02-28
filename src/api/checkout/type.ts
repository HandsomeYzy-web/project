// 商品类型
export interface Product {
    id: number; // 商品ID
    name: string; // 商品名称
    price: number; // 商品单价
    stock: number; // 商品库存
    status: number; // 商品状态（1: 上架, 0: 下架）
}

// 结账请求类型
export interface CheckoutRequest {
    memberId: string; // 会员ID
    employeeId: string; // 操作员工ID
    items: {
        productId: number; // 商品ID
        quantity: number; // 商品数量
        price: number; // 商品单价
    }[];
}

// 响应数据类型
export interface ResponseData {
    code: number;
    msg: string;
    data?: any;
}