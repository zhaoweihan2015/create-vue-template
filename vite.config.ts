import path from 'node:path';
import Vue from '@vitejs/plugin-vue';

import Unocss from 'unocss/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import VueRouter from 'unplugin-vue-router/vite';
import AutoImport from 'unplugin-auto-import/vite';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },

  plugins: [
    Vue(),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue', '.md'],
      exclude: ['**/components/**'],
      dts: 'src/typed-router.d.ts',
    }),

    Components({
      dirs: ['src/components', 'src/pages'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    AutoImport({
      imports: [
        'vue', // 自动导入 Vue Composition API
        'vue-router', // 自动导入 useRouter / useRoute
        'pinia', // 自动导入 defineStore / storeToRefs
      ],
      dirs: ['src/composables'], // 可选：自动导入你自己写的组合函数
      vueTemplate: true, // 在模板中也可直接使用
      dts: 'src/auto-imports.d.ts', // 生成类型声明文件
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),
  ],

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ['element-plus'],
  },
});
