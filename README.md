## 0.前提

1.node 环境和 npm

## 1. 创建项目

```javascript
npm init vite
```

项目名称

vue-ts

cd 项目名称

npm install

## 2. 配置 vite.config.ts

```javascript
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
      {
        find: "components",
        replacement: resolve(__dirname, "src/components"),
      },
    ],
  },
  base: "./",
  server: {
    port: 9000, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
  },
});
```

vite 中 path 报错 安装这个

npm install @types/node --save-dev

## 3. 配置 ts.config.json

```javascript
//ts.config.json

{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "components": ["src/components/*"],
      "_pinia/*": ["src/pinia/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}


//tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

## 4. 配置使用 Sass/Less

```javascript
npm i sass -D
npm i less -D
```

## 5. 配置使用 vue-router

```javascript
npm i vue-router
```

创建文件 src/router/index.ts

```javascript
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "@/components/HelloWorld.vue"),
  },
  { path: "/", redirect: { name: "Home" } },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
```

使用：在 `src/main.ts`中导入并注册

```javascript
import router from "./router/index";
const app = createApp(App);
app.use(router);
```

## 6. 配置使用 Vuex

```javascript
npm i vuex
```

创建文件 src/store/index.ts

```javascript
import { createStore } from "vuex";
const defaultState = {
  count: 0,
};
export default createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count += 1;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count;
    },
  },
});
```

使用：在 src/main.ts 中导入并注册

```javascript
import store from "./store/index";
app.use(store);
```

## 7. 配置使用 elementPlus

```javascript
npm i element-plus --save
```

使用按需引入，自动引入
首先安装两个插件

```javascript
npm i -D unplugin-vue-components unplugin-auto-import
```

```javascript
// vite.config.ts
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

注意：
在`.ts`文件和`<script></script>`中使用需要手动引入，如第 7 点中的使用
为了避免出现样式错误的情况，在`src/main.ts`中进行全局样式导入

```javascript
import "element-plus/theme-chalk/index.css";
```

## 8.页面 views

创建文件 src/views/login.vue

```html
<template>
  <el-button>Default</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>
```

在 src/router/index 添加路由

```javascript
{ path: "/login", component: () => import("../views/login.vue") },
```

在 app.vue 中

```html
<script setup lang="ts"></script>
<template>
  <router-view></router-view>
</template>

<style scoped></style>
```

## 9.匹配 404 页面

创建文件 src/views/404.vue

在 src/router/index 添加路由

```javascript
import NotFound from "../views/404.vue";
{ path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
```

## 10.二次封装 axios

安装 axios

```javascript
npm i axios
```

新建文件 src/http/index.ts 和 src/http/server.ts

```javascript
//index.ts

import axios from "axios";
var instance = axios.create({
  //路径
  baseURL: "/api",
  timeout: 1000,
  //请求头
  //   headers: { "X-Custom-Header": "foobar" },
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export const httpsServer = ({
  method = "get",
  url = "",
  data = {},
  params = {},
}) => {
  return new Promise((resolve, reject) => {
    instance({
      method,
      url,
      data,
      params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
```

```javascript
//server.ts

import { httpsServer } from "./index";
//登录接口
export const loginApi = (data: object) =>
  httpsServer({ method: "post", url: "user/login", data });
//用户列表
export const QuerySysUsersApi = (params: object) =>
  httpsServer({ url: "Sys/QuerySysUsers", params });
//写各个接口
```

使用

```javascript
//用到接口的文件中引用
import { loginApi, QuerySysUsersApi } from "../http/server";
//登录
const login = () => {
  loginApi({
    username: "admin",
    password: "202cb962ac59075b964b07152d234b70",
  }).then((res) => {
    console.log(res);
  });
};
//用户列表
const getUser = () => {
  QuerySysUsersApi({ page: "1", limit: "10" }).then((res) => {
    console.log(res);
  });
};
```

## 11.配置代理服务器

```javascript
//vite.config.ts

//server字段中添加
  proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
```

## 12.vue 自动引入 import {\*}

在 vite.config.ts 中

```javascript
 AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue"],
      dts: "src/auto-import.d.ts",
    }),
```

注意：重启项目 npm run dev
