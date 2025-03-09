---
title: Vite
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: tool,vite
---

## 安装项目

```bash
npm create vite@latest
```

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
import AutoImport from 'unplugin-auto-import/vite'; // 按需引入ElementPlus
import Components from 'unplugin-vue-components/vite'; // 按需引入ElementPlus
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'; // 按需引入ElementPlus
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'; // 按需引入ElementPlus的样式
import compression from 'vite-plugin-compression'; // 打包压缩
import { createHtmlPlugin } from 'vite-plugin-html'; // 注：指定entry后，不需要在index.html添加script标签，若添加了建议删除
import postcssPresetEnv from 'postcss-preset-env'; // postcss 配置
// 用 normalizePath 解决 window 下的路径问题
// const variablePath = normalizePath(path.resolve('./src/assets/v1/css/base/variable.scss'));

const HTMLDATA = {
  NODE_ENV: process.env.NODE_ENV,
  js: [
    { url: `${APP_CDN}libs/vue.global.prod.js`, mode: 'defer' },
    { url: `${APP_CDN}libs/vue-router.global.prod.js`, mode: 'defer' },
    { url: `${APP_CDN}libs/vue-i18n.global.prod.js`, mode: 'defer' },
    { url: `${APP_CDN}libs/vuex.global.prod.js`, mode: 'defer' },
    { url: `${APP_CDN}libs/vuex-persistedstate.umd.js`, mode: 'defer' },
    { url: `${APP_CDN}libs/index.iife.min.js`, mode: 'defer' },
    { url: `${APP_CDN}libs/axios.min.js`, mode: 'defer' },
    { url: `${APP_CDN}libs/gwm.js`, mode: 'defer' },
    { url: `${APP_CDN}libs/Vibrant.min.js`, mode: 'defer' }
  ],
  title: '工单管理',
  exclude: ['vue', 'vuex', 'vuex-persistedstate', 'vue-i18n', 'vue-router', 'axios', 'gwm', 'xss', 'crypto', 'fs', 'vue-demi']
};

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
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`;
          }
        }
      ]
    }),
    // 其他插件...
    compression({
      algorithm: 'gzip', // 指定压缩算法为gzip,[ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz', // 指定压缩后的文件扩展名为.gz
      threshold: 51200, // 仅对文件大小大于threshold的文件进行压缩，默认为10KB
      deleteOriginFile: false, // 是否删除原始文件，默认为false
      // filter: /\.(js|css|json|html|ico|svg)(\?.*)?$/i, // 匹配要压缩的文件的正则表达式，默认为匹配.js、.css、.json、.html、.ico和.svg文件
      // compressionOptions: { level: 9 }, // 指定gzip压缩级别，默认为9（最高级别）
      verbose: true, //是否在控制台输出压缩结果
      disable: false //是否禁用插件
    }),
    // 一个针对 index.html，提供压缩和基于 ejs 模板功能的 vite 插件
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          HTMLDATA
        }
      },
      // 注：指定entry后，不需要在index.html添加script标签，若添加了建议删除
      entry: './src/main.js',
      template: './index.html'
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
  },
  css: {
    transformer: 'postcss', //该选项用于选择用于 CSS 处理的引擎
    devSourcemap: true, // 在开发过程中是否启用 sourcemap。
    preprocessorOptions: {
      sass: {
        // additionalData: `@import "${variablePath}";`
        additionalData: `@import './src/assets/v1/css/base/variable.scss';`
      }
    },
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 3
        })
      ]
    },
    preprocessorMaxWorkers: 4 // 限制最大并发进程数为 4
  },
  server: {
    cors: true,
    open: true,
    host: '172.18.20.189',
    port: 8080,
    strictPort: true,
    https: false,
    proxy: {
      '/work-order/': {
        target: 'http://kabwos.dev.live800.com/work-order/',
        changeOrigin: true,
        rewrite: (path1) => path1.replace(/^\/work-order/, '')
      }
    },
    hmr: {
      overlay: true
    }
  }
});
```

## 配置项 index.html

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title><%= HTMLDATA.title %></title>
    <% if(HTMLDATA && HTMLDATA.NODE_ENV==="production" ) {%> <% for (var i in HTMLDATA.css) { %>
    <link href="<%= HTMLDATA.css[i] %>" rel="preload" />
    <% } %> <% for (var j in HTMLDATA.js) { %>
    <script defer src="<%= HTMLDATA.js[j].url %>"></script>
    <% } %> <% } else {%>
    <script src="<%= VITE_APP_CDN %>libs/Vibrant.min.js"></script>
    <% } %>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= HTMLDATA.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app" class="app-main"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```
