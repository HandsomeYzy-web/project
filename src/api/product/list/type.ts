export interface Product {
    id: number;
    name: string;
    category: string;
    stock: number;
    price: number;
    supplierId: string;
    description: string;
    image: string;
    status: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProductResponseData {
    code: number;
    msg: string;
    data: {
        records: Product[];
        total: number;
        size: number;
        current: number;
        searchCount: boolean;
        pages: number;
    };
}