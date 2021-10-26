<template>
  <el-container>
      <el-header><Head/></el-header>
      <el-main><div>This is main page</div></el-main>
    <el-footer><Foot/></el-footer>
  </el-container>
</template>

<script>
import Head from './main/Head'
import Foot from './main/Foot'
export default {
  name: "function",
  components: {
    Head,
    Foot
  }
}
</script>

<style scoped>

</style>
