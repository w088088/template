<template>
  <el-button>Default</el-button>
  <el-button type="primary" @click="login">登录</el-button>
  <el-button type="success" @click="getUser">获取数据</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
  {{ data }}
</template>
<script lang="ts" setup>
import { loginApi, QuerySysUsersApi } from "../http/server";
const login = () => {
  loginApi({
    username: "admin",
    password: "202cb962ac59075b964b07152d234b70",
  }).then((res) => {
    console.log(res);
  });
};
const getUser = () => {
  QuerySysUsersApi({ page: "1", limit: "10" }).then((res: any) => {
    console.log(res);
    data.value = res.data;
  });
};
const data = ref([]);
</script>
<style lang="scss" scoped></style>
