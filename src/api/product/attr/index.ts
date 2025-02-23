import Request from "@/utils/request";
enum API{
    CATEGORY1_URL = '/getCategory1',
    CATEGORY2_URL = '/getCategory2',
    CATEGORY3_URL = '/getCategory3',
}
export const reqCategory1 = () => Request.get<any, any>(API.CATEGORY1_URL);
export const reqCategory2 = (category1Id: number) => Request.get<any, any>(API.CATEGORY2_URL+`?category1Id=${category1Id}`);
export const reqCategory3 = (category2Id: number) => Request.get<any, any>(API.CATEGORY3_URL+`?category2Id=${category2Id}`);