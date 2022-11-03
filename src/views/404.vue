<template>
  <div>
    <el-result icon="warning" title="404" sub-title="你的页面跑丢了">
      <template #extra>
        <el-button type="primary" @click="$router.replace('/')"
          >返回首页</el-button
        >
      </template>
    </el-result>
  </div>
</template>

<script lang="ts" setup>
onMounted(() => {
  console.log("111");
});
</script>

<style lang="scss" scoped></style>
