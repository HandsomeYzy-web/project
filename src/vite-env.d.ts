/// <reference types="vite/client" />
/// <reference types="vite-plugin-svg-icons/client" />

declare module '*.vue' {
    import { defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent>
    export default component
}

/*// 添加 vite-plugin-svg-icons 插件的声明
declare module 'vite-plugin-svg-icons' {
    import { Plugin } from 'vite';

    interface ViteSvgIconsPluginOptions {
        iconDirs: string[];
        symbolId?: string;
        svgoOptions?: any;
    }

    const ViteSvgIconsPlugin: (options: ViteSvgIconsPluginOptions) => Plugin;
    export default ViteSvgIconsPlugin;
}*/
