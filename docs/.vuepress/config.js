module.exports = {
  title: "Sth. I Like",
  description: "Sth. I Like",
  base: "/",
  port: "3000",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  themeConfig: {
    // logo
    logo: "",
    nav: [
      // {
      //   text: 'Curious',
      //   link: '',
      // },
      {
        text: "Learn",
        items: [
          { text: "CSS", link: "/learn/css/" },
          { text: "Enhance", link: "/learn/enhance/" },
          { text: "JS", link: "/learn/js/" },
          { text: "Application", link: "/learn/application/" },
          { text: "Tool", link: "/learn/tool/" },
        ],
      },
    ],
    // 搜索
    search: false,
    // searchMaxSuggestions: 10,
    // 显示所有页面的标题链接
    displayAllHeaders: true,
    // 侧边栏
    // sidebarDepth: 2,
    sidebar: {
      "/learn/css/": [
        ["", "概述"],
        ["less", "Less"],
        ["sass", "Sass"],
      ],
      "/learn/enhance/": [
        ["", "概述"],
        ["design", "设计模式"],
        ["structure", "数据结构"],
        ["es6", "ES6"],
        ["typescript", "TS"],
        ["nginx", "Nginx"],
        ["regular", "正则表达式"],
        ["前端安全", "前端安全"],
        ["算法", "算法"],
        ["网络", "HTTP|HTTPS"],
        ["浏览器", "浏览器"],
      ],
      "/learn/js/": [
        ["", "概述"],
        ["js基础", "JS基础"],
        ["vue2", "Vue2"],
        ["vue3", "Vue3"],
        ["vue差异", "Vue差异"],
        ["axios", "Axios"],
        ["vuerouter3", "VueRouter3.x"],
        ["vuerouter4", "VueRouter4.x"],
        ["vuex3", "Vuex3.x"],
        ["vuex4", "Vuex4.x"],
        ["pinia", "Pinia"],
        ["wx", "小程序"],
      ],
      "/learn/application/": [
        ["", "概述"],
        ["icon", "Icon"],
      ],
      "/learn/tool/": [
        ["", "概述"],
        ["chrometool", "ChromeTool"],
        ["git", "Git"],
        ["gulp", "Gulp"],
        ["webpack", "Webpack"],
        ["vite", "Vite"],
        ["shell", "Shell"],
      ],
    },
    repo: "https://github.com/tspt/blog",
    repoLabel: "GitHub",

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: "https://github.com/tspt/blog",
    // 假如文档不是放在仓库的根目录下：
    docsDir: "docs",
    // 假如文档放在一个特定的分支下：
    docsBranch: "master",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "上次更新",
    prevLinks: true,
    nextLinks: true,
  },
  // 页面滚动
  smoothScroll: true,
  markdown: {
    includeLevel: [2, 3],
    // extractHeaders: [ 'h3', 'h4' ],
    lineNumbers: true,
  },
  plugins: [
    [
      "@vuepress/blog",
      {
        directories: [
          {
            id: "js",
            dirname: "js",
            path: "/",
          },
        ],
      },
    ],
    ["@vuepress/back-to-top"],
  ],
};
