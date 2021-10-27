<template>
    <el-container>
      <el-header><Head/></el-header>
      <Index/>
      <el-footer><Foot/></el-footer>
    </el-container>
</template>

<script>
import Index from '../components/Index'
import Head from "../components/main/Head";
import Foot from "../components/main/Foot";
export default {
  name: 'Home',
  components: {
    Foot,
    Head,
    Index
  }
}
</script>

<style scoped>
</style>
