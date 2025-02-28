import { defineStore } from "pinia";
import { reqCategory1,reqCategory2,reqCategory3 } from "@/api/product/attr";
import type { CategoryState } from "@/store/modules/types/type";

let useCategoryStore = defineStore('category', {
    state: (): CategoryState => {
        return {
            category1List: [],
            category2List: [],
            category3List: [],
            category1Id: '',
            category2Id: '',
            category3Id: ''
        }
    },
    actions: {
        async getCategory1() {
            let result = await reqCategory1();
            if (result.code == 1) {
                this.category1List = result.data;
            }
        },
        async getCategory2() {
            let result = await reqCategory2(this.category1Id);
            if (result.code == 1) {
                this.category2List = result.data;
            }
        },
        async getCategory3() {
            let result = await reqCategory3(this.category2Id);
            if (result.code == 1) {
                this.category3List = result.data;
            }
        }
    }
})
export default useCategoryStore