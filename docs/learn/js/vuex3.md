---
title: Vuex
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,vuex
---

## 安装

```text
npm install vuex -S
```

通过 `Vue.use(Vuex)` 将状态从根组件注入到每个子组件中，在子组件通过 `this.$store` 访问

## 初始化实例

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    product,
    order
  }
})
export default store


// main.js
import Vue from 'vue'
import App from './App.vue'

export default new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app);
```

## 样例

```js
// .vue文件
<template>
  <input type="text" v-mode="productNum" />
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      price: 0,
    };
  },
  computed: {
    productNum: {
      get () {
        return this.$store.state.num;
      },
      set (value) {
        this.$store.commit('setNum', value);
      }
    }
    /** state **/
    productTotalPrice() {
      return this.$store.state.product.totalPrice;
    },
    orderTotalPrice() {
      return this.$store.state.order.totalPrice;
    },
    //**** 携带命名空间
    // 同名
    ...mapState("order", ["totalPrice"]),
    // 别名
    ...mapState("product", {
      totalPriceAlias: (state) => state.totalPrice,
    }),

    /** getters **/
    // 同名
    ...mapGetters("order", ["salePrice"]),
    // 别名
    ...mapGetters("product", {
      salePriceAlias: "salePrice",
    })
  },
  methods: {
    /** mutations **/
    // 同名
    ...mapMutations("order", ["setTotalPrice"]),
    // 别名
    ...mapMutations("product", {
      setTotalPriceAlias: "setTotalPrice",
    }),

    /** actions **/
    // 同名
    ...mapActions("order", ["postOrder"]),
    // 别名
    ...mapActions("product", {
      postProductAlias: "postProduct",
    }),

    submit() {
      /** commit **/
      this.$store.commit("product/setTotalPrice", { price: this.price });
      // 对象风格提交方式
      this.$store.commit({
        type: "product/setTotalPrice",
        price: this.price,
      });
      this.setTotalPrice({ price: this.price });
      this.setTotalPriceAlias({ price: this.price });


      /** dispatch **/
      this.$store.dispatch("product/postProduct", { price: this.price });
      // 对象风格提交方式
      this.$store.dispatch({
        type: "product/postProduct",
        price: this.price,
      });
      this.postOrder({ price: this.price });
      this.postProductAlias({ price: this.price });
    }
  }
};
</script>
```

```js
// product.js
var state = {
  num: 10,
  totalPrice: 0,
};

var getters = {
  salePrice(state, getters, rootState, rootGetters) {
    return state.totalPrice * 0.3;
  },
};

var mutations = {
  setTotalPrice(state, data) {
    state.totalPrice = data.price * state.num;
  },
  setNum(state, data) {
    state.num = data;
  },
};

var actions = {
  postProduct({ state, getters, commit, dispatch, rootState, rootGetters }, data) {
    commit("setTotalPrice", data); // foo/setTotalPrice
  },
  postProductSame(cxt, data) {
    // cxt.state
    // cxt.getters
    // cxt.commit
    // cxt.dispatch
    // cxt.rootState
    // cxt.rootGetters
    cxt.commit("setTotalPrice", data); // foo/setTotalPrice

    cxt.commit("setTotalPrice", data, { root: true }); // 调用全局的 setTotalPrice
  },
  specialAsync: {
    root: true, // 设置root=true
    handler(ctx, data) {
      cxt.commit("setTotalPrice", data); // 调用全局的 setTotalPrice
    },
  },
};

export default {
  namespaced: true, // 命名空间
  state,
  getters,
  mutations,
  actions,
};
```

```js
// order.js
var state = {
  num: 1,
  totalPrice: 0,
};

var getters = {
  salePrice(state, getters, rootState, rootGetters) {
    return state.totalPrice * 0.1;
  },
};

var mutations = {
  setTotalPrice(state, data) {
    state.totalPrice = data.price * state.num;
  },
};

var actions = {
  postOrder({ state, getters, commit, dispatch, rootState, rootGetters }, data) {
    commit("setTotalPrice", data); // order/setTotalPrice
  },
  postOrderSame(cxt, data) {
    // cxt.state
    // cxt.getters
    // cxt.commit
    // cxt.dispatch
    // cxt.rootState
    // cxt.rootGetters
    cxt.commit("setTotalPrice", data); // order/setTotalPrice

    cxt.commit("setTotalPrice", data, { root: true }); // 设置root=true，调用全局的 setTotalPrice
  },
  specialAsync: {
    root: true, // 设置root=true
    handler(ctx, data) {
      cxt.commit("setTotalPrice", data); // 调用全局的 setTotalPrice
    },
  },
};

export default {
  namespaced: true, // 命名空间
  state,
  getters,
  mutations,
  actions,
};
```

## state

`mapState(path,? [object | array])`

```js
computed: {
  /** state **/
  productTotalPrice() {
    return this.$store.state.product.totalPrice;
  },
  orderTotalPrice() {
    return this.$store.state.order.totalPrice;
  },
  // 同名
  ...mapState("order", ["totalPrice"]),
  // 别名
  ...mapState("product", {
    totalPriceAlias: (state) => state.totalPrice,
  })
}
```

## getters

`mapGetters(path,? [object | array])`

```js
computed: {
  // 同名
  ...mapGetters("order", ["salePrice"]),
  // 别名
  ...mapGetters("product", {
    salePriceAlias: "salePrice",
  })
}
```

## mutations

`mapMutations(path,? [object | array])`

```js
methods: {
  // 同名
  ...mapMutations("order", ["setTotalPrice"]),
  // 别名
  ...mapMutations("product", {
    setTotalPriceAlias: "setTotalPrice",
  })
},
mounted () {
  /** commit **/
  this.$store.commit("product/setTotalPrice", { price: this.price });
  // 对象风格提交方式
  this.$store.commit({
    type: "product/setTotalPrice",
    price: this.price,
  });
  this.setTotalPrice({ price: this.price });
  this.setTotalPriceAlias({ price: this.price });
}
```

## actions

`mapActions(path,? [object | array])`

```js
methods: {
  // 同名
  ...mapActions("order", ["postOrder"]),
  // 别名
  ...mapActions("product", {
    postProductAlias: "postProduct",
  })
},
mounted () {
  /** dispatch **/
  this.$store.dispatch("product/postProduct", { price: this.price });
  // 对象风格提交方式
  this.$store.dispatch({
    type: "product/postProduct",
    price: this.price,
  });
  this.postOrder({ price: this.price });
  this.postProductAlias({ price: this.price });
}
```
