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
            label="队伍池">
          </el-table-column>
          <el-table-column
            prop="name"
            style="text-align: center"
            label="相关操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
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
      tableData: []
    }
  },
  created() {
    this.getNamesList()
  },
  methods: {
    // 在import界面执行删除操作的方法
    handleEdit(index, row) {
      console.log(index, row);
      this.$prompt('请输入新的队伍名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // 将数据传输到后端进行持久化
        this.updateName(value, row.name)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    // 根据删除操作的方法更新对应的队伍的名字
    updateName: function (newName,oldName) {
      // 在后端部分更新对应的队伍的名字
      this.$axios.put('/count-tool/game/team/name?newname='+newName+"&oldname="+oldName)
      .then(res=>{
        if(res.data.status===200){
          // 更新这个表格的数据
          this.tableData=res.data.data.msg;
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
        }
      }).catch(error=>{
        this.$message({
          type: 'error',
          message: '更新失败!'
        });
      })
    },
    // 执行删除队伍的操作
    handleDelete(index, row) {
      console.log(row.name);
      this.$confirm('此操作将永久删除该队伍的所有信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用后端接口进行删除操作
        this.$axios.delete('/count-tool/game/team/name?name='+ row.name)
        .then(res=>{
          if(res.data.status===200){
            // 更新这个表格的数据
            this.tableData=res.data.data.msg;
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }).catch(error =>{
          this.$message({
            type: 'error',
            message: '删除失败!'
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 调用后端接口获取当前所有的队伍的名字
    getNamesList() {
      this.$axios.get('/count-tool/game/team/name/all')
      .then(res=>{
        if(res.data.status===200){
          this.tableData=res.data.data.msg;
        }
      }).catch(error =>{
        this.$message({
          type: 'error',
          message: `加载队伍池队伍失败`,
        })
      })
    },
    // 获取所有的队伍的名字
    // getTeams: function() {
    //   return this.$store.getters.getTeamsName
    // },
    // 添加单个队伍
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
    // 调用后端接口添加创建单个队伍
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
