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
            label="比赛名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="team_name"
            label="比赛队伍">
          </el-table-column>
          <el-table-column
            prop="team_rank"
            label="队伍排名">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-footer><Foot/></el-footer>
  </el-container>
</template>

<script>
import Head from "../components/main/Head";
import Foot from "../components/main/Foot";

export default {
  name: "Show",
  components: {Foot, Head},
  data() {
    return {
      tableData: this.getInfos()
    }
  },
  methods: {
    getInfos: function() {
      return this.$store.getters.getRankInfo
    }
  }
}
</script>

<style scoped>

</style>
