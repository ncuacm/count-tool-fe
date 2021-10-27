<template>
  <el-container>
    <el-header><Head/></el-header>
    <PostInfo/>
    <el-footer><Foot/></el-footer>
  </el-container>
</template>

<script>
import PostInfo from '../components/PostInfo'
import Head from '../components/main/Head'
import Foot from '../components/main/Foot'
export default {
  name: "Submission",
  components: {
    Foot,
    Head,
    PostInfo
  }
}
</script>

<style scoped>

</style>
