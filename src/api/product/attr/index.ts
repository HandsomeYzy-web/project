import Request from "@/utils/request";
import type { CategoryResponseData,AttrResponseData } from "./type";
enum API{
    CATEGORY1_URL = '/categories/getCategory1',
    CATEGORY2_URL = '/categories/getCategory2',
    CATEGORY3_URL = '/categories/getCategory3',
    ATTR_URL = '/attributes/list',
    ATTR_ADD_URL = '/attributes/save',
    ATTR_DELETE_URL = '/attributes/delete'
}
export const reqCategory1 = () => Request.get<any, CategoryResponseData>(API.CATEGORY1_URL);
export const reqCategory2 = (category1Id: number) => Request.get<any, CategoryResponseData>(API.CATEGORY2_URL+`?category1Id=${category1Id}`);
export const reqCategory3 = (category2Id: number) => Request.get<any, CategoryResponseData>(API.CATEGORY3_URL+`?category2Id=${category2Id}`);
export const reqAttr = (categoryId: number) => Request.get<any, AttrResponseData>(API.ATTR_URL+`?categoryId=${categoryId}`);
export const reqAddAttr = (data: Attr) => Request.post<any, any>(API.ATTR_ADD_URL, data);
export const reqDeleteAttr = (attrId: number) => Request.delete<any, any>(API.ATTR_DELETE_URL+`?attrId=${attrId}`);