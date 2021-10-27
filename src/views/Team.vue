<template>
  <el-container>
    <el-header><Head/></el-header>
    <QueryInfoByTeam/>
    <el-footer><Foot/></el-footer>
  </el-container>
</template>

<script>
import QueryInfoByTeam from "../components/QueryInfoByTeam";
import Head from '../components/main/Head'
import Foot from '../components/main/Foot'
export default {
  name: "Team",
  components: {
    Foot,
    Head,
    QueryInfoByTeam
  }
}
</script>

<style scoped>

</style>
