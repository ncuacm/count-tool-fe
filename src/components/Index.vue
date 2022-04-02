<template>
    <div style="height: 100%">
      <div style="height: 10%"></div>
      <div style="height: 22%"><el-row>
        <el-button type="success" plain icon="el-icon-edit" @click="ToPostInfo">
          <span>提交队伍比赛成绩</span>
        </el-button>
      </el-row></div>
      <div style="height: 21%"><el-row>
        <el-button type="success" plain icon="el-icon-search" @click="ToQueryInfoBySession">
          <span>查询具体比赛的队伍成绩</span>
        </el-button>
      </el-row></div>
      <div style="height: 21%"><el-row>
        <el-button type="success" plain icon="el-icon-document-checked" @click="ToQueryInfoByTeam">
          <span>查询队伍的所有比赛成绩</span>
        </el-button>
      </el-row></div>
      <div style="height: 15%"><el-row>
          <el-button type="success" plain icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">
            <span>导入队伍(仅限管理员操作)</span>
          </el-button>
          <el-dialog title="后台管理登录" :visible.sync="dialogFormVisible" width="400px">
            <el-form>
              <el-form-item>
                <el-input placeholder="请输入密码" v-model="password" autocomplete="off" show-password></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="CheckPassword">确 定</el-button>
            </div>
          </el-dialog>
      </el-row></div>
    </div>
</template>

<script>
import Head from './main/Head'
import Foot from './main/Foot'
export default {
  name: "Index",
  components: {
    Head,
    Foot
  },
  data() {
    return {
      dialogTableVisible: true,
      dialogFormVisible: false,
      password: '',
    }
  },
  methods: {
    ToPostInfo() {
      this.$router.push('/contest/submission')
    },
    ToQueryInfoBySession() {
      this.$router.push('/contest/info')
    },
    ToQueryInfoByTeam() {
      this.$router.push('/team/info')
    },
    ToImportNames() {
      this.$router.push('/admin')
    },
    CheckPassword() {
      // 先对密码进行验证，如果密码正确那么就发起获取所有的队伍的信息的请求
      this.$axios.post('/count-tool/match/check', {
        password: this.password,
      }).then(res=>{
        if(res.data.status===200) {
          this.$message({
            type: 'success',
            message: '密码正确'
          });
          // // 先查询到目前已经知道的队伍的信息，然后进行路由跳转
          // this.$axios.get('/count-tool/game/team/name/all')
          // .then(res=> {
          //   if(res.data.status===200){
          //     this.$store.commit('clear')
          //     for(let i=0;i<res.data.data.msg.length; i++) {
          //       this.$store.commit('showImportTeam', res.data.data.msg[i])
          //     }
          //   }
          // 将token放进浏览器缓存里面
          localStorage.setItem("token", res.data.data.token)
          this.ToImportNames()
          //})
        }
      }).catch(error =>{
        this.$message({
          type: 'error',
          message: `密码错误`
        });
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
