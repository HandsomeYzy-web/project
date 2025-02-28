export interface ResponseData{
    code: number;
    msg: string;
    data: boolean;
}
export interface replenishment {
    id: number;
    productId: number;
    quantity: number;
    requesterId: string;
    approverId: string;
    supplierId:string;
    status:string;
    createdAt: string;
    updatedAt: string;
}
export type Records = replenishment[];
export interface replenishmentResponseData extends ResponseData{
    data:{
        records:Records;
        total:number;
        size:number;
        current:number;
        searchCount:boolean;
        pages:number;
    }
}