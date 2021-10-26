<template>
  <el-container>
    <el-header><Head/></el-header>
    <el-main>
      <div><el-row>
        <el-button type="success" plain icon="el-icon-search" @click="ToQueryInfoBySession">
          <span>查询具体场次的比赛信息</span>
        </el-button>
      </el-row></div>
    </el-main>
    <el-footer><Foot/></el-footer>
  </el-container>
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
.span{
  background-color: white;
  font-weight: bolder;
}


.el-main {
  height: 70%;
  color: #333;
  text-align: center;
  line-height: 160px;
  font-size: 12em;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container {
  height: 95%;
  width: 100%;
}
</style>
