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
            prop="password"
            style="text-align: center"
            label="队伍密码">
          </el-table-column>
          <el-table-column
            prop="name"
            style="text-align: center"
            label="相关操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleRename(scope.$index, scope.row)">修改队名</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleRenewPassword(scope.$index, scope.row)">修改密码</el-button>
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
import Foot from "../../components/main/Foot";
import Head from "../../components/main/Head";
import Global from "../../components/Global";
export default {
  name: "Team",
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
    this.getTeamsList()
  },
  methods: {
    // 在管理员界面修改队伍的名字
    handleRename(index, row) {
      this.$prompt('请输入新的队伍名，同时通知相应的队伍', '提示', {
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
    // 在管理员界面修改队伍的密码
    handleRenewPassword(index, row) {
      this.$prompt('请输入该队伍的新的密码,同时通知相应的队伍', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // 将数据传输到后端进行持久化
        this.updatePassword(row.name, row.password, value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    // 在管理员界面执行删除队伍的操作
    handleDelete(index, row) {
      console.log(row.name);
      this.$confirm('此操作将永久删除该队伍的所有信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用后端接口进行删除操作
        this.$axios.delete('/count_tool/contest/admin/team/name?name='+ row.name)
          .then(res=>{
            if(res.status===200){
              // 更新这个表格的数据
              this.tableData=res.data.data.teams;
              Global.methods.successOpen("删除成功")
            }else{
              Global.methods.failOpen(res.data.detail)
            }
          }).catch(error =>{
            Global.methods.errorOpen()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 根据删除操作的方法更新对应的队伍的名字
    updateName: function (newName,oldName) {
      // 在后端部分更新对应的队伍的名字
      this.$axios.put('/count_tool/contest/admin/team/name?newname='+newName+"&oldname="+oldName)
      .then(res=>{
        if(res.status===200){
          // 更新这个表格的数据
          this.tableData=res.data.data.teams;
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
        }else{
          Global.methods.failOpen(res.data.detail)
        }
      }).catch(error=>{
        Global.methods.failOpen()
      })
    },
    // 调用后端接口更新队伍的密码
    updatePassword: function (name,oldPassword, newPassword) {
      // 在后端部分更新对应的队伍的名字
      this.$axios.put('/count_tool/contest/admin/team/password/new', {
        name: name,
        password: newPassword
      }).then(res=>{
          if(res.status===200){
            // 更新这个表格的数据
            this.tableData=res.data.data.teams;
            this.$message({
              type: 'success',
              message: '更新成功!'
            });
          }else{
            Global.methods.failOpen(res.data.detail)
          }
        }).catch(error=>{
          Global.methods.failOpen()
      })
    },
    // 调用后端接口获取当前所有的队伍的信息（队伍名和密码）
    getTeamsList() {
      this.$axios.get('/count_tool/contest/admin/team/all')
      .then(res=>{
        if(res.status===200){
          this.tableData=res.data.data.teams;
        }else{
          Global.methods.failOpen(res.data.detail)
        }
      }).catch(error=>{
        Global.methods.failOpen()
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
      this.$axios.post('/count_tool/contest/admin/team/new?name='+name).
      then(res=>{
        if(res.status===200){
          // 现在就是要重新进行一个渲染当前的界面了
          this.tableData=res.data.data.teams;
          this.$message({
            type: 'success',
            message: `添加成功`,
          })
        }else{
          Global.methods.failOpen(res.data.detail)
        }
      }).catch(error=>{
        Global.methods.failOpen()
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
