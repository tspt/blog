---
title: Vite
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: tool,vite
---

## vite preview

预览本地构建，开启一个静态 Web 服务器

## 路径

`process.cwd()`是指当前 node 命令执行时所在的文件夹目录
比如在 D:/aaa/bb 目录下执行 yarn build 那么 cwd 就是 D:/aaa/bb

`__dirname`是指被执行 js 文件所在的文件夹目录
比如 D:/aa/scripts

## ES 模块

### <script type=module>

支持内联脚本和加载脚本，默认是 defer，可以设置为 async

- async 脚本每个都会在下载完成后立即执行，无关 script 标签出现的顺序
- defer 脚本会根据 script 标签顺序先后执行

```html
<script src="./app.js" type="module"></script>
```

### CORS 跨域限制

浏览器会禁止加载资源

```html
<!-- http://localhost:5501/type-module.html -->
<html>
  <head>
    <script type="module" src="http://localhost:8082/app.js"></script>
  </head>
  <body>
    count: <span id="count">0</span>
  </body>
</html>
```

### babel-minify

实验性项目，利用 Babel 工具链进行代码压缩，处理 ECMAScript 标准，保留最新特性的同时，减小体积，无需转译为 ES5

## 配置项 vite.config.js

```js
import { defineConfig, normalizePath } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'; // 用于生成 svg 雪碧图
import viteImagemin from 'vite-plugin-imagemin'; // 图片压缩
import AutoImport from 'unplugin-auto-import/vite'; // ElementPlus 打包时会自动引入
import Components from 'unplugin-vue-components/vite'; // ElementPlus 打包时会自动引入
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'; // ElementPlus 打包时会自动引入

export default defineConfig({
  baseUrl: './",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'], // 导入时想要省略的扩展名列表
    conditions: ['browser', 'import'], // 这个配置告诉 Vite 在解析第三方库时优先考虑满足 'browser' 条件的入口点。主要看第三方库 package.json 中的 exports 配置指定了哪些入口点。
    mainFields: ['browser', 'module', 'main'] // 这个配置与conditions类似，主要看第三方库 package.json 中 "type": "module" 时的入口点。
  },
  html: {
    cspNonce: "nonce-123456",
    /*
    内容安全策略
    为<script>和<style>以及<link>追加nonce属性( nonce="nonce-123456" )
    Vite 会注入一个 meta 标签 (<meta property="csp-nonce" nonce="nonce-123456" />)。
  */
  },
  plugins: {
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
  },
  build: {
    outDir: 'dist/static',
    assetsInlineLimit: 4 * 1024, // 单位KiB，4KB svg 不受此配置影响
    chunkSizeWarningLimit: 512, // 单位KB，1MB 规定触发警告的 chunk 大小
    rollupOptions: {
      // 告诉打包工具 在external配置的 都是外部依赖项  不需要打包
      external: ['vue', 'vuex', 'vuex-persistedstate', 'vue-i18n', 'vue-router', 'axios'],
      plugins: [],
      output: {
        entryFileNames: `assets/js/main.[hash].${APP_VERSION}.js`, // 修改JS文件名
        chunkFileNames: `assets/js/[name].[hash].${APP_VERSION}.js`, // 修改JS chunk文件名
        // 自定义静态资源名称
        assetFileNames: (assetInfo) => {
          let dir = '';
          switch (assetInfo.name.substring(assetInfo.name.lastIndexOf('.') + 1)) {
            case 'css':
              dir = 'css';
              break;
            case 'mp4':
            case 'mp3':
              dir = 'media';
              break;
            case 'ttf':
            case 'woff':
            case 'woff2':
              dir = 'fonts';
              break;
            case 'svg':
              dir = 'icons';
              break;
            default:
              dir = 'images';
              break;
          }
          return `assets/${dir}/[name].[hash].${APP_VERSION}[extname]`;
        },
        // 静态资源拆分打包（针对依赖的包）
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const name = id.toString().split('node_modules/')[1].split('/')[0].toString();
            if (id.includes('node_modules/tinymce')) {
              // 尝试基于 tinymce 的内部路径进一步细分
              const paths = id.split('/');
              const idx = paths.findIndex((p) => p === 'tinymce');
              if (paths[idx + 1] === 'plugins') {
                return `tinymce-${paths[idx + 1]}`;
              } else if (paths[idx + 1] === 'themes') {
                return `tinymce-themes-${paths[idx + 2]}`;
              }
              return 'tinymce-core';
            } else if (['element-plus', 'vant', 'swiper', 'lodash', 'lodash-es', 'vuedraggable', 'xlsx', 'xlsx-style-vite', 'vconsole'].includes(name)) {
              return name;
            } else if (['vue-router', 'vue-i18n', 'vuex', 'vuex-persistedstate'].includes(name)) {
              return 'vue-router-i18n-x';
            } else {
              return 'vendor';
            }
          }
        }
      }
    }
  }
});
```
