<template>
  <el-container>
    <el-header><Head/></el-header>
    <div style="height: 10%; width: 100%">
      <div style="float: right;">
        <el-button type="primary" @click="addPlatform"><span>添加比赛平台</span></el-button>
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
            label="比赛平台">
          </el-table-column>
          <el-table-column
            prop="name"
            style="text-align: center"
            label="相关操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleRename(scope.$index, scope.row)">修改比赛平台</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleChangePlatformStatus(scope.$index, scope.row)" v-if="scope.row.status">下线</el-button>
              <el-button
                v-else
                size="mini"
                type="success"
                @click="handleChangePlatformStatus(scope.$index, scope.row)">上线</el-button>
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
  name: "Platform",
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
    this.getPlatforms()
  },
  methods: {
    // 在管理员界面修改队伍的名字
    handleRename(index, row) {
      this.$prompt('请输入更新后的比赛平台的名字', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // 将数据传输到后端进行持久化
        this.updatePlatformName(value, row.name)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    // 更新这个比赛平台的状态
    handleChangePlatformStatus(index, row) {
      var message,title;
      if (row.status) {
        // 目前上线，现在需要下线
        message =
          '<p>' + '下线之后队伍将不能提交和查看与此相关的信息。' + '</p>' +
          '<p>' + '是否确定下线?' + '</p>'
        title = "下线提示"
      }else{
        //  目前下线，现在需要上线
        message =
          '<p>上线之后队伍将可以提交和查看与此相关的信息。</p>' +
          '<p>是否确定上线?</p>'
        title = "上线提示"
      }
      this.$confirm(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true,
      }).then(()=>{
        // 执行更新操作
        this.$axios.put('/count_tool/contest/admin/platform/status/new', {
          "name": row.name,
          "status": row.status===1?0:1,
        }).then(res=>{
          if(res.status===200){
            this.tableData=res.data.data.platforms;
            Global.methods.successOpen("更新成功")
          } else{
            Global.methods.failOpen(res.data.detail)
          }
        }).catch(error=>{
          Global.methods.errorOpen()
        })
      })
    },
    // 添加单个比赛平台
    addPlatform: function() {
      this.$prompt('请输入比赛平台名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        // 将数据传输到后端进行持久化
        this.createPlatform(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    // 更新这个比赛平台的信息 比赛平台状态或者是比赛平台名字
    createPlatform(platform) {
      this.$axios.post('/count_tool/contest/admin/platform/new?platform=' + platform)
      .then(res=>{
        if(res.status===200){
          this.tableData=res.data.data.platforms;
          Global.methods.successOpen("添加成功")
        } else{
          Global.methods.failOpen(res.data.detail)
        }
      }).catch(error=>{
        Global.methods.errorOpen()
      })
    },
    // 调用后端接口得到当前的所有的比赛平台的信息
    getPlatforms() {
      this.$axios.get('/count_tool/contest/admin/platform/all')
      .then(res=>{
        if(res.status===200){
          this.tableData=res.data.data.platforms;
        }else{
          Global.methods.failOpen(res.data.detail)
        }
      }).catch(error=>{
        Global.methods.errorOpen()
      })
    },
    updatePlatformName(newName,oldName) {
      this.$axios.put('/count_tool/contest/admin/platform/name/new?old_name='+ oldName+'&new_name=' + newName)
      .then(res=>{
        if(res.status===200){
          this.tableData=res.data.data.platforms;
          Global.methods.successOpen("更新成功")
        }else{
          Global.methods.failOpen(res.data.detail)
        }
      }).catch(error=>{
        Global.methods.errorOpen()
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
