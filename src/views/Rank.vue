<template>
  <el-container>
    <el-header><Head/></el-header>
    <div style="height: 2%"></div>
    <div style="height: 100%; overflow: auto; display: flex">
      <div style="width: 10%"></div>
      <div style="width: 80%">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="队伍名称">
          </el-table-column>
          <el-table-column
            prop="name"
            label="队伍积分">
          </el-table-column>
          <el-table-column
            prop="rank"
            label="队伍排名">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-footer><Foot/></el-footer>
  </el-container>
</template>

<script>
import Foot from "../components/main/Foot";
import Head from "../components/main/Head";
export default {
  name: "Rank",
  components: {Head, Foot},
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getTeamRank()
  },
  methods: {
    getTeamRank() {
      // 请求后端接口获取队伍排行榜
    }
  }
}
</script>

<style scoped>

</style>
