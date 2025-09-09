import path from 'node:path';
import Vue from '@vitejs/plugin-vue';

import Unocss from 'unocss/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import VueRouter from 'unplugin-vue-router/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Inspector from 'vite-plugin-vue-inspector';
import Inspect from 'vite-plugin-inspect';
import { compression } from 'vite-plugin-compression2';

import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const enableCompression = env.VITE_ENABLE_COMPRESSION === 'true';
  const isProduction = mode === 'production';

  const routerExclude = isProduction
    ? ['**/components/**', '**/_devs_/**'] // 生产环境排除开发用工具组件
    : ['**/components/**'];

  return {
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
        exclude: routerExclude,
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
          {
            'vue-request': ['useRequest'], // 自动导入 useRequest
          },
        ],
        dirs: ['src/composables'], // 可选：自动导入你自己写的组合函数
        vueTemplate: true, // 在模板中也可直接使用
        dts: 'src/auto-imports.d.ts', // 生成类型声明文件
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      Unocss(),

      // A vite plugin which provides the ability that to jump to the local IDE when you click the element of browser automatically. It supports Vue2 & 3 & SSR.
      Inspector({
        enabled: true,
        toggleButtonVisibility: 'always',
        launchEditor: 'cursor', // 改成正在使用的编辑器
      }),
      Inspect(),
      // 压缩
      enableCompression
        ? compression({
            deleteOriginalAssets: true, // 删除原始文件
            skipIfLargerOrEqual: true, // 如果压缩后文件大于原始文件，则不压缩
          })
        : null,
    ],
    // 服务器端渲染
    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ['element-plus'],
    },
    // 代理
    server: {
      host: '0.0.0.0',
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5001',
          changeOrigin: true,
        },
      },
    },
  };
});
