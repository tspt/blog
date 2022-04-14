---
title: Vue2
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,vue
---

# Vue2

## 初始化 vue 实例

```js
// main.js
import App from './App.vue'

export default new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app);
```

## 生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed
- activated
- deactivated
- errorCaptured

## 模板语法

### 动态参数 (2.6+)

`:[attributeName]`  
`@[eventName]`

```js
<div @[method]="doSomething" :[property]="visible">
```

## computed 和 watch

### computed 属性和方法

computed 属性会缓存，内部依赖变化时，才会改变

```js
export default {
  data() {
    num: [];
  },
  computed: {
    doubleNum: (vm) => vm.num * 2,
    currentNum: {
      get() {
        return this.num + 1;
      },
      set() {
        return this.num - 1;
      },
    },
  },
};
```

模板内使用方法时，访问任何响应式数据，会将其作为依赖项进行跟踪，每次调用都会执行函数

```js
<div>{{getTodayTitle(date)}}</div>
```

### watch

```js
export default {
  watch: {
    a: "someMethod",
    b() {},
    c: {
      handler() {},
      deep: true,
    },
    d: {
      handler() {},
      immediate: true,
    },
  },
  methods: {
    someMethod() {},
  },
};
```

## Class 和 Style

### Class

```js
// 对象语法
<div :class="currentClass"></div>
<span :class="selected"></span>
// 数组语法
<div :class="[visible, radius]"></div>
data () {
  return {
    currentClass: {
      active: true,
      show: true
    },
    visible: 'el-visible',
    radius: 'el-radius'
  },
  computed: {
    selected () {
      return {
        visible: true,
        selected: this.isSelected && this.index !== -1
      }
    }
  }
}
// output
<div class="active show"></div>
<div class="el-visible el-radius"></div>
```

### Style

```js
<div :style="currentStyle"></div>
<div :style="[baseStyle, currentStyle]"></div>
data () {
  return {
    baseStyle: {
      width: '14px',
      height: '14px'
    },
    currentStyle: {
      color: '#ffa500',
      background: '#fff'
    }
  }
}
// output
<div style="color: rgb(255, 165, 0); background: rgb(255, 255, 255);"></div>
<div style="width: 14px; height: 14px; color: rgb(255, 165, 0); background: rgb(255, 255, 255);"></div>
```

### 多重值 (2.3+)

```js
// 渲染数组中最后一个被浏览器支持的值
<div :style="visible"></div>
data () {
  return {
    visible: {
      display: ['-webkit-box', '-ms-flexbox', 'flex']
    }
  }
}
// output 不支持前缀时
<div style="display: flex;"></div>
```

## 事件处理

### 多事件

```js
<div @click="getProduct($event), getPrice()"></div>
methods: {
  getProduct () {},
  getPrice () {},
}
```

### 事件修饰符

- .stop
- .prevent
- .capture
- .self
- .once
- .passive

### 按键修饰符

- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right

### 系统修饰符

- .ctrl
- .alt
- .shift
- .meta

exact 修饰符

- .exact 有且仅当满足指定修饰符时才触发

鼠标按键修饰符

- .left
- .right
- .middle

### 程序化的事件侦听器

- `$on(eventName, eventHandler)` 侦听事件
- `$once(eventName, eventHandler)` 一次性侦听事件
- `$off(eventName, eventHandler)` 停止侦听事件

## 表单

### checkbox 复选框

`true-value` 和 `false-value` 指定选中和未选中的值

```js
<input type="checkbox" v-model="checked" :true-value="true" :false-value="false">
```

选中值为数组

```js
<input type="checkbox" v-model="checkedList" value="item1">item1
<input type="checkbox" v-model="checkedList" value="item2">item2
<input type="checkbox" v-model="checkedList" value="item3">item3

data () {
  return {
    checkedList: []
  }
}
```

### 修饰符

- .lazy
- .number
- .trim

## 组件

### 内置组件

- component
- transition
- transition-group
- keep-alive
- slot

### 全局注册

```js
import Button from "./Button";
Vue.component(Button.name, Button);
```

### 动态组件

第一次渲染后，会被缓存

```js
<keep-alive>
  <div :is="fruit"></div>
</keep-alive>

import apple from '../Apple'
import banana from './Bananas'
import pear from './Pear'
export default {
  data () {
    return {
      fruit: 'apple'
    }
  }
}
```

### 异步组件

```js
// 全局注册
Vue.component("button", () => import("./Button"));

// 局部注册
{
  components: {
    'button': () => import("./Button")
  }
}

// vue2.3 处理加载状态
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import("./Button"),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000,
});
```

在路由中使用异步组件

```js
// vue-router
function lazyLoadView(asyncComponent) {
  const handler = () => ({
    component: asyncComponent,
    // A component to use while the component is loading.
    loading: require("./Loading").default,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require("./Error").default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 400,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 10000,
  });

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(handler, data, children);
    },
  });
}
const router = new VueRouter({
  routes: [
    {
      path: "/button",
      component: () => lazyLoadView(import("./Button")),
    },
  ],
});
```

## prop

在 html 中使用，必须 kebab-case 方式

```js
<dialog current-title="first"></dialog>
```

### 类型

```js
// string类型
props: ['title', 'content']

// 指定类型
props: {
  title: String,
  list: Array
}

// 带默认值
props: {
  title: {
    type: String,
    default: 'first'
  }
}
```

传递进来的 props 属性，可以赋值给 data 作为组件变量，或者作为 computed 属性值

### 类型检查

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

### 非 prop 属性

引用子组件时，子组件上的 class 和 style 属性会被合并到组件内部，其他属性会替换同名属性

子组件设置`inheritAttrs`值

- 为 true 时，子组件会渲染出父组件传递的属性值
- 为 true 时，子组件不会渲染出父组件传递的属性值

```js
// 子组件
export default {
  data() {
    return {};
  },
  inheritAttrs: false, // true
};
```

## 依赖注入

`provide / inject`用于父孙属性传递

```js
// 祖先组件
export default {
  data () {
    return {
      title: 'apple'
    }
  }
  provide: {
    title: this.title
  }
}

// 子孙组件
export default {
  inject: ['title']
}}
```

## 自定义事件

### v-model

写法一：

```js
// 父组件
<Children v-model="myTitle"></Children>
export default {
  name: 'parent',
  data () {
    return {
      myTitle: '',
    }
  },
  watch: {
    myTitle(newVal) {
      console.log(newVal);
  },
}

// 子组件
<button @click="test">{{ xx }}</button>
export default {
  name: 'children',
  model: {
    prop:  'xx', // 自定义的，与props定义的属性名保持一致，默认是value
    event: 'xxxxx',  // 自定义的，与$emit方法第一个参数名保持一致，默认是input
  },
  props: {
    xx: String
  },
  methods: {
    test() {
      this.$emit('xxxxx', Math.random() + '');
    },
  },
}
```

写法二：
写法一简写

```js
// 父组件
// 自定义的，与props定义的属性名保持一致，默认是value
// 自定义的，与$emit方法第一个参数名保持一致，默认是input
<Children :xx="myTitle" @xxxxx="myTitle = $event"></Children>
export default {
  name: 'parent',
  data () {
    return {
      myTitle: '',
    }
  },
  watch: {
    myTitle(newVal) {
      console.log(newVal);
  },
}

// 子组件
<button @click="test">{{ xx }}</button>
export default {
  name: 'children',
  props: {
    xx: String
  },
  methods: {
    test() {
      this.$emit('xxxxx', Math.random() + '');
    },
  },
}
```

写法三：

```js
// 父组件
<Children :xx="myTitle" @update:xx="myTitle = $event"></Children>
// 简写
<Children :xx.sync="myTitle"></Children>
export default {
  name: 'parent',
  data () {
    return {
      myTitle: '',
    }
  },
  watch: {
    myTitle(newVal) {
      console.log(newVal);
  },
}

// 子组件
<button @click="test">{{ xx }}</button>
export default {
  name: 'children',
  props: {
    xx: String
  },
  methods: {
    test() {
      this.$emit('update:xx', Math.random() + '');
    },
  },
}
```

### .sync

只能跟属性，不能是计算表达式或对象

```js
// 父组件
<el-text :tip="tip" @update:tip="tip"></el-text>
<el-text :text.sync="text"></el-text>
<el-text :title.sync="book.title"></el-text>

// 子组件
export default {
  data () {
    newTip: '',
    newText: '',
    newTitle: '',
  },
  props: {
    tip: String,
    text: String,
    title: String,
  },
  methods: {
    changeVal () {
      this.$emit('update:tip', newTip);
      this.$emit('update:text', newText);
      this.$emit('update:title', newTitle);
    }
  },
  watch: {
    tip (newVal, oldVal) {
      this.newTip = newVal;
    },
    text (newVal, oldVal) {
      this.newText = newVal;
    },
    title (newVal, oldVal) {
      this.newTitle = newVal;
    }
  },
  mounted () {
    this.newTip: = tip;
    this.newText: = text;
    this.newTitle: = title;
  }
}

```

## 插槽

### 编译作用域

- 父级模板里的所有内容都是在父级作用域中编译的；
- 子模板里的所有内容都是在子作用域中编译的。

### 插槽默认值

```js
<button>
  <slot>Save</slot>
</button>
```

### 具名插槽

```js
// 组件
<div class="el-item">
  <slot></slot>
  <div class="el-item-foot">
    <slot name="foot"></slot>
  </div>
</div>
// 使用组件时
<el-item>
  <p>This is the content.</p>
  <template v-slot:foot>
    <p>This is a paragraph.</p>
  </template>
</el-item>
// output
<div class="el-item">
  <p>This is the content.</p>
  <div class="el-item-foot">
    <p>This is a paragraph.</p>
  </div>
</div>
```

### 作用域插槽

```js
// 组件
<div class="el-item">
  <slot :skin="skin">
    {{ skin.background }}
  </slot>
  <slot name="foot" :skin="skin">
    {{ skin.height }}
  </slot>
  </div>
</div>
// 使用组件时
<el-item>
  <template v-slot:default="someProp">
    {{ someProp.skin.color }}
  </template>
  <template v-slot:foot="someProp">
    {{ someProp.size.width }}
  </template>
</el-item>

data () {
  return {
    skin: {
      color: '#ffa500',
      background: '#fff',
    },
    size: {
      width: 77,
      height: 77
    }
  }
}
```

### 独占默认插槽的缩写语法

只有默认插槽时，可以将属性写在组件上

```js
// 组件
<div class="el-item">
  <slot :skin="skin">
    {{ skin.background }}
  </slot>
</div>
// 使用组件时
<el-item v-slot="someProp">
  {{ someProp.skin.color }}
</el-item>
```

### 动态插槽名

```js
<el-item>
  <template v-slot:[dynamicSlotName]>
    <p>This is a paragraph.</p>
  </template>
</el-item>

data () {
  return {
    dynamicSlotName: 'dynamicSlotName'
  }
}
```

### 语法简写

v-slot 等价于 #

```js
// 使用时
<el-item>
  <p>This is the content.</p>
  <template #foot>
    <p>This is a paragraph.</p>
  </template>
</el-item>

// 使用时
<el-item>
  <template #default="someProp">
    {{ someProp.skin.color }}
  </template>
  <template #foot="someProp">
    {{ someProp.size.width }}
  </template>
</el-item>
```

## mixins

### 选项合并

```js
import mixin from "./mixin.js";
export default {
  data() {
    return {};
  },
  mixins: [mixin],
};
```

只在生命周期内访问对象，便于清理代码

```js
export default {
  methods: {
    initTimePicker(name) {
      var picker = new TimerPicker({
        ele: this.$refs[name],
        format: "YYYY-MM-DD",
      });

      this.$once("hook:beforeDestroy", function () {
        picker.destroy();
      });
    },
  },
  mounted() {
    this.initTimePicker("startTime");
    this.initTimePicker("endTime");
  },
};
```

### 循环引用

- 递归组件：确保递归调用是条件性的
- 组件间的循环调用：全局注册组件 或 本地注册用 import 异步引入

### 模板定义

内联模板：在子组件上加 inline-template 属性

```js
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

X-Template：script 标签，类型是 text/x-template

```js
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>;
Vue.component("hello-world", {
  template: "#hello-world-template",
});
```

## 混入

### 选项合并

```js
import mixin from "./mixin.js";
export default {
  data() {
    return {};
  },
  mixins: [mixin],
};
```

### 全局混入

`Vue.mixins` 会影响之后每一个创建的 Vue 实例，包括第三方组件

## 渲染函数 & JSX

### 虚拟 DOM

建立虚拟 DOM 来追踪改变真实 DOM
createElement 返回一个 createNodeDescription，它所包含的信息告诉 Vue 页面需要渲染什么节点，包含及其子节点的信息，称为虚拟节点（VNode）
虚拟 DOM 是对由 Vue 组件树建立起来的整个 VNode 树的称呼

## 响应式原理

### 数据变化

```js
export default {
  data() {
    return {
      arr: [1, 2, 3, 4, 5, 6, 7],
      obj: {
        color: "#999",
        background: "#fff",
      },
    };
  },
  mounted() {
    this.$set(this.arr, 6, 0);
    this.arr.splice(6, 1, 0);
    this.$set(this.obj, "color", "#777");
  },
};
```

## 异步更新队列

内部调用顺序

- Promise.then
- MutationObserver
- setImmediate
- setTimeout(fn, 0)

## 全局配置

挂载应用之前，可以修改 vue 实例的 config 对象

### silent

```js
// 取消 Vue 所有的日志与警告。
Vue.config.silent = true;
```

### errorHandler

错误处理

```js
Vue.config.errorHandler = function (err, vm, info) {
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  console.log(`组件${vm.$vnode.tag}发生错误：${err.message},${info}`);
};
```

### warnHandler

警告处理

```js
Vue.config.warnHandler = function (err, vm, info) {
  // `trace` 是组件的继承关系追踪
};
```

## 杂项

### name

允许组件递归调用自身，有语义，便于调试

```js
// Parent.vue
<template>
  <div class="parent">
    <Children :data="treeList"></Children>
  </div>
</template>

// Children.vue
<template>
  <div class="children">
    <div v-for="(item, i) in data" :key="i">
      <span>{{item.name}}</span>
      <tree-node v-if="item.children" :data="item.children"></tree-node>
    </div>
  </div>
</template>

<script>
export default {
  name: "treeNode",
  props: {
    data: Array
  }
};
</script>
```

### inheritAttrs

使用组件时，上面定义的非 props 属性，默认会被传递到子组件根元素上

```js
// Parent.vue
<template>
  <div class="parent">
    <Children :type="type" id="currentInput" class="el-input"></Children>
  </div>
</template>


// Children.vue
<template>
  <div class="children">
    <input :type="type" :="$attrs" />
  </div>
</template>

<script>
export default {
  name: "Children",
   // 设置为false，可以取消这种行为，将属性应用到子组件其他元素
  inheritAttrs: false,
  props: {
    type: String
  }
};
</script>

// output
<div class="children">
  <input type="text" id="currentInput" class="el-input" />
</div>
```

## 指令

### v-pre

使元素及子元素跳过编译过程，即是保持标签内容输出

```js
<div v-pre>{{ This is a paragraph.}}</div>

// output
<div>{{ This is a paragraph.}}</div>
```

### v-cloak

这个指令保持在元素上直到关联实例结束编译

### v-once

只渲染元素和组件一次，随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过，这可以用于优化更新性能。  
渲染大量静态内容时，使用该方式。

## 特殊 Attribute

### key

不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。  
而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

#### v-if/v-else-if/v-else

建议在条件中使用 key

```js
<div v-if="condition" key="yes">Yes</div>
<div v-else key="no">No</div>
```

#### 结合 template、v-for

template 标签不能使用 key

```js
<template v-for="item in list">
  <div :key="'heading-' + item.id">...</div>
  <span :key="'content-' + item.id">...</span>
</template>
```
