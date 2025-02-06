/// <reference types="vite/client" />
/// <reference types="vite-plugin-svg-icons/client" />

declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>;
    export default component;
}
