module.exports = {
  title: 'Sth. I Like',
  description: 'Sth. I Like',
  base: '/',
  port: '3000',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    nav: [
      // {C
      //   text: 'Curious',
      //   link: '',
      // },
      {
        text: 'Learn',
        items: [
          {text: 'JS', link: '/learn/js/'},
          {text: 'CSS', link: '/learn/css/'},
          {text: 'Tool', link: '/learn/tool/'},
        ]
      }
    ],
    // 搜索
    search: false,
    // searchMaxSuggestions: 10,
    // logo
    logo: '',
    // 侧边栏
    // sidebarDepth: 2,
    sidebar: {
      '/learn/css/': [
        ['', '概述'],
        ['less', 'Less'],
        ['sass', 'Sass']
      ],
      '/learn/js/': [
        ['', '概述'],
        ['design', '设计模式'],
        ['es6', 'ES6'],
        ['typescript', 'TS'],
        ['vue', 'Vue'],
        ['wx', '小程序'],
      ],
      '/learn/tool/': [
        ['', '概述'],
        ['chrometool', 'ChromeTool'],
        ['git', 'Git'],
        ['gulp', 'Gulp'],
        ['webpack', 'Webpack']
      ],
    },
    lastUpdated: 'Last Updated',
    prevLinks: true,
    nextLinks: true
  },
  // 页面滚动
  smoothScroll: true,
  markdown: {
    includeLevel: [2, 3],
    // extractHeaders: [ 'h3', 'h4' ],
    lineNumbers: true
  },
  plugins: [
    [
      '@vuepress/blog',
      {
        directories: [
          {
            id: 'js',
            dirname: 'js',
            path: '/'
          }
        ]
      }
    ],
    ['@vuepress/back-to-top']
  ]
}
