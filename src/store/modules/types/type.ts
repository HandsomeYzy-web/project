import type { RouteRecordRaw } from "vue-router";
import type { CategoryObj } from "@/api/product/attr/type";

export interface UserState {
  token: string|null;
  menuRoutes:RouteRecordRaw[];
  username:string;
  avatar:string;
}

export interface CategoryState {
  category1List: CategoryObj[];
  category2List: CategoryObj[];
  category3List: CategoryObj[];
  category1Id: number|string;
  category2Id: number|string;
  category3Id: number|string;
}