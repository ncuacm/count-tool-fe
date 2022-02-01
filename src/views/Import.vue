<template>
  <el-container>
    <el-header><Head/></el-header>
    <div style="height: 10%; width: 100%">
      <div style="float: right;">
        <el-button type="primary" @click="addTeam"><span>添加队伍</span></el-button>
      </div>
    </div>
    <div style="height: 2%"></div>
    <div style="height: 100%; overflow: auto; display: flex">
      <div style="width: 10%"></div>
      <div style="width: 80%">
        <el-table
          :data="tableData"
          border
          header-row-class-name="center">
          <el-table-column
            prop="name"
            style="text-align: center"
            label="现有队伍">
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
  name: "Import",
  components: {
    Foot,
    Head
  },
  data() {
    return {
      tableData: this.getTeams()
    }
  },
  methods: {
    getTeams: function() {
      return this.$store.getters.getTeamsName
    },
    addTeam: function() {
      this.$prompt('请输入队伍名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
          // 将数据传输到后端进行持久化
          this.CreateName(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    CreateName: function (name) {
      this.$axios.post('/count-tool/game/team/new?name='+name).
      then(res=>{
        if(res.data.status===200){
          // 现在就是要重新进行一个渲染当前的界面了
          let obj = {}
          obj.name=name
          this.tableData.push(obj)
          this.$message({
            type: 'success',
            message: `添加成功`,
          })
        }
      }).catch(error=>{
        this.$message({
          type: 'error',
          message: `添加失败`,
        });
      })
    }
  }
}
</script>

<style>
.center th .cell{
  text-align: center !important;
}
.el-table td, .el-table th{
  text-align: center !important;
}
</style>
