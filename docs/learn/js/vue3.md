---
title: Vue3
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,vue
---

## 安装

`npm create vue@latest`

## 初始化实例

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";

createApp(APP).use(store).use(router).mount("#app");
```

## 生命周期

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- activated
- deactivated
- beforeUnmount
- unmounted
- errorCaptured
- renderTracked
- renderTriggered

## 组件注册

### 全局注册

```js
import Button from "./Button";
const app = createApp(APP);
app.component(Button.name, Button);
```

### 异步组件

```js
import { defineAsyncComponent } from "vue";
import Error from "./components/Error";
import Loading from "./components/Loading";

// 不带选项的异步组件
const asyncModal = defineAsyncComponent(() => import("./Button"));

// 带选项的异步组件
const asyncModalWithOptions = defineAsyncComponent({
  loader: () => import("./Button"),
  errorComponent: Error,
  loadingComponent: Loading,
  delay: 200,
  timeout: 3000,
});

// 全局注册
app.component("button", asyncModal);

// 局部注册
{
  components: {
    button: asyncModal;
  }
}
```

## 模板语法

### 同名简写

v3.4 及其以上

```vue
<!-- :id="id"  -->
<div :id></div>
```

### 动态绑定多个值

```vue
<div v-bind="objectOfAttrs"></div>

<script>
const objectOfAttrs = {
  id: "container",
  class: "wrapper",
  style: "background-color:green",
};
</script>
```

## 列表渲染

### 改变原数组

```js
push();
pop();
shift();
unshift();
splice();
sort();
reverse();
```

## prop

### 非 prop 属性

多个根节点上的 Attribute 继承：与单个根节点不同，不会默认传递到子组件中，需要手动绑定$attrs，不然会报出警告

```js
// Children.vue
<template>
  <div class="children">
    <input :type="type" />
  </div>
  <div class="children">
    <input :type="type" />
  </div>
  <div class="children">
    <input :type="type" :="$attrs" />
  </div>
</template>


export default {
  name: "Children",
  props: {
    type: String
  }
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

对比 vue2.md 中写法三可以直观看出差异

```js
// 父组件
<Children v-model="dialogVisible"></Children>
<Children :modelValue="dialogVisible" @update:modelValue="dialogVisible = $evnet"></Children>


<Children v-model:xx="dialogVisible"></Children>
<Children :xx="dialogVisible" @update:xx="dialogVisible = $evnet"></Children>

// 子组件
<button @click="test">{{ xx }}</button>
export default {
  name: 'children',
  props: {
    xx: String  // 默认为modelValue
  },
  methods: {
    test() {
      this.$emit('update:xx', Math.random() + '');
    },
  },
}
```

### emits

```js
export default {
  // 对象写法
  emits: {
    // 无校验函数
    cancel: null
    // 带校验函数
    submit(val) {
      if (val) {
        return true;  // 触发emit
      } else {
        return false;  // 不触发emit
      }
    }
  },
  // 数组写法
  emits: ['submit'],
  setup(props, { emit }) {
    const submitForm = (val) => {
      emit('submit', val);
    }

    const cancelForm = (val) => {
      emit('cancel', val);
    }

    return {
      submitForm,
      cancelForm
    }
  }
};
```

### 多个 v-model 使用

和单个 v-model 一样使用方式

### 自定义修饰符

已经去掉了.sync 修饰符

```js
<el-input v-model.capitalize="currentCompany"></el-input>
<el-input v-model.job.capitalize="currentJob"></el-input>
data () {
  return {
    currentCompany: '',
    currentJob: '',
  }
}

<input type="text" :value="modelValue || job" @input="judge">
export default {
  props: {
    // 不带参数的自定义修饰符 (modelModifiers)
    modelValue: String,
    modelModifiers:  {
      default: () => ({})
    },
    // 带有参数的自定义修饰符 (args+Modifiers)
    job: String,
    jobModifiers: {},
  },
  methods: {
    judge (e) {
      let value = e.target.value;
      if (this.modelModifiers.capitalize || this.jobModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      this.$emit('update:modelValue', value);
      this.$emit('update:job', value);
    }
  },
  created () {
    console.log(this.modelModifiers) // { capitalize: true }
    console.log(this.strModifiers) // { capitalize: true }
  }
}
```

## 组合式 API

### setup

创建组件时，prop 解析之后立即调用，在 beforeCreate 之前调用

```js
import { ref, toRefs, onMounted, watch } from "vue";
export default {
  props: {
    name: "777",
  },
  // props 属性
  // context 是上下文
  setup(props, context) {
    const counter = ref(0);
    const lists = ref([]);
    console.log(counter); // {value: 0}
    console.log(counter); // {value: []}

    const { name } = toRefs(props);

    const getLists = () => {};

    // 只读响应式
    // 计算属性的 getter 的第一个参数来获取计算属性返回的上一个值
    const doubleCounter = computed((previous) => {
      if (counter.value > 2) {
        return counter.value * 2;
      }
      return previous;
    });

    console.log(doubleCounter.value); // 2

    // 监听 counter
    watch(counter, (newVal, oldVal) => {
      console.log(newVal, oldVal);
    });

    watch(name, (newVal, oldVal) => {
      console.log(newVal, oldVal);
    });

    // 在 `mounted` 时调用 `getLists`
    onMounted(getLists);

    return {
      counter,
      lists,
    };
  },
};
```

## 响应式

ref 方法返回一个响应式对象，只包含一个 value 属性  
ref 解包只发生在被响应式 Object 嵌套，从 Array 或原生集合类型 Map 访问 ref 时，不进行解包

```js
import { ref, toRefs, onMounted, watch } from "vue";
export default {
  props: {
    name: "777",
  },
  setup(props, context) {
    const counter = ref(0);
    const lists = ref([]);

    return {
      counter,
      lists,
    };
  },
};
```

## 应用配置

挂载应用之前，可以修改 vue 实例的 config 对象

### errorHandler

错误处理

```js
app.config.errorHandler = function (err, vm, info) {
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  console.log(`组件${vm.$vnode.tag}发生错误：${err.message},${info}`);
};
```

### warnHandler

警告处理

```js
app.config.warnHandler = function (err, vm, info) {
  // `trace` 是组件的继承关系追踪
};
```

### globalProperties

任何组件实例中可以访问的 property

```js
app.config.globalProperties.$http = () => {};
```

## 全局 API

### nextTick

```js
import { nextTick } from "vue"
export default {
  setup() {
    const getList = async () {
      await nextTick();

      nextTick(() => {});
    }
  }
}
```

## 特殊 Attribute

### key

不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。  
而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

#### v-if/v-else-if/v-else

```js
<div v-if="condition">Yes</div>
<div v-else>No</div>
```

#### 结合 template、v-for

```js
<template v-for="item in list">
  <div :key="'heading-' + item.id">...</div>
  <span :key="'content-' + item.id">...</span>
</template>
```

## 选择器

### :deep

深度选择器：针对子组件的样式

```css
<style scoped>
:deep(.inner-item) {
  color: #000;
}
</style>
```

### :slotted

插槽选择器：针对组件中插槽内容的样式

```css
<style scoped>
:slotted(.content) {
  background: #fff;
}
</style>
```

### :global

全局选择器：把样式应用到全局，不需要新写一个<style>标签

```css
<style scoped>
:global(.title) {
  color: #000;
}
</style>
```
