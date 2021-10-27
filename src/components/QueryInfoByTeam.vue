<template>
  <div style="height: 100%">
    <div style="height: 11%"></div>
    <div><el-row>
      <el-button type="success" plain icon="el-icon-document-checked" @click="ToQueryInfoByTeam">
        <span>查询队伍的所有比赛信息</span>
      </el-button>
    </el-row></div>
  </div>
</template>

<script>
import Head from './main/Head'
import Foot from './main/Foot'
export default {
  name: "QueryInfoByTeam",
  components: {
    Head,
    Foot
  }
}
</script>

<style scoped>
</style>
