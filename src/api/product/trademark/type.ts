export interface ResponseData{
    code: number;
    msg: string;
    data: boolean;
}
export interface trademark{
    userId:string;
    username:string;
    role:string;
    email:string;
    phone:string;
    status:number;
    createdAt:string;
    updatedAt:string;
    avatar:string;
}
export type Records = trademark[];
export interface trademarkResponseData extends ResponseData{
    data:{
        records:Records;
        total:number;
        size:number;
        current:number;
        searchCount:boolean;
        pages:number;
    }
}