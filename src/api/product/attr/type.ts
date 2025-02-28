export interface ResponseDate {
    code: number;
    msg: string;
}

export interface CategoryObj {
    id: number|string;
    name: string;
    level: number;
    parentId?: number|string;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryResponseData extends ResponseDate {
    data: CategoryObj[];
}

export interface AttrValue {
    id?: number;
    valueName: string;
    attrId?: number;
}

export type AttrValueList = AttrValue[];

export interface Attr {
    id?: number;
    attrName: string;
    categoryId: number|string;
    categoryLevel: number;
    attrValueList: AttrValueList;
}

export type AttrList = Attr[];

export interface AttrResponseData extends ResponseDate {
    data: AttrList;
}