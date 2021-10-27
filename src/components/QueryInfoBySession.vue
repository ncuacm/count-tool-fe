<template>
  <div style="height: 100%">
    <div style="height: 11%;"></div>
    <div><el-row>
      <el-button type="success" plain icon="el-icon-search" @click="ToQueryInfoBySession">
        <span>查询具体场次的比赛信息</span>
      </el-button>
    </el-row></div>
  </div>
</template>

<script>
import Head from './main/Head'
import Foot from './main/Foot'
export default {
  name: "QueryInfoBySession",
  components: {
    Head,
    Foot
  }
}
</script>

<style scoped>
</style>
