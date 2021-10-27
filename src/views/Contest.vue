<template>
  <el-container>
    <el-header><Head/></el-header>
    <QueryInfoBySession/>
    <el-footer><Foot/></el-footer>
  </el-container>
</template>

<script>
import QueryInfoBySession from "../components/QueryInfoBySession"
import Head from '../components/main/Head'
import Foot from '../components/main/Foot'
export default {
  name: "Contest",
  components: {
    Foot,
    Head,
    QueryInfoBySession
  }
}
</script>

<style scoped>

</style>
