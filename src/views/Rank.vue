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
          style="width: 100%"
          :row-class-name="tableRowClassName">
          <el-table-column
            prop="name"
            label="队伍名称">
          </el-table-column>
          <el-table-column
            prop="score"
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
      tableData: [{
        name: "字节跳动",
        score: 123,
        rank: 1,
      },{
        name: "阿里巴巴",
        score: 100,
        rank: 2,
      },{
        name: "腾讯",
        score: 90,
        rank: 3,
      },{
        name: "微软",
        score: 80,
        rank: 4,
      },{
        name: "今日头条",
        score: 79,
        rank: 5,
      }]
    }
  },
  created() {
    this.getTeamRank()
  },
  methods: {
    getTeamRank() {
      // 请求后端接口获取队伍排行榜
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex < 3) {
        return 'success-row';
      } else {
        return 'waring-row';
      }
    }
  }
}
</script>

<style>
.el-table .waring-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table .second-row {
  background: #409EFF;
}

.el-table .third-row {
  background: #E6A23C;
}
</style>
