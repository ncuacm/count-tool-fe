<template>
    <div style="height: 100%; font-size: xx-large">
      <div style="height: 10%"></div>
      <div style="height: 18%"><el-row>
        <el-button type="success" plain icon="el-icon-edit" @click="ToPostInfo">
          <span>提交队伍比赛成绩</span>
        </el-button>
      </el-row></div>
      <div style="height: 18%"><el-row>
        <el-button type="success" plain icon="el-icon-search" @click="ToQueryInfoBySession">
          <span>查询具体比赛的队伍成绩</span>
        </el-button>
      </el-row></div>
      <div style="height: 18%"><el-row>
        <el-button type="success" plain icon="el-icon-document-checked" @click="ToQueryInfoByTeam">
          <span>查询队伍的所有比赛成绩</span>
        </el-button>
      </el-row></div>
      <div style="height: 18%"><el-row>
        <el-button type="success" plain icon="el-icon-view" @click="ToRank">
          <span>查看队伍成绩积分排行榜</span>
        </el-button>
      </el-row></div>
      <div style="height: 15%"><el-row>
          <el-button type="success" plain icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">
            <span>平台管理(仅限管理员操作)</span>
          </el-button>
          <el-dialog title="后台管理登录" :visible.sync="dialogFormVisible" width="400px">
            <el-form>
              <el-form-item>
                <el-input placeholder="请输入后台登录密码" v-model="password" autocomplete="off" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-radio v-model="choice" :label="1">队伍管理</el-radio>
                <el-radio v-model="choice" :label="2">比赛管理</el-radio>
                <el-radio v-model="choice" :label="3">导出数据</el-radio>
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
import Global from "./Global";
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
      choice: 2,
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
    ToRank() {
      this.$router.push('team/rank')
    },
    ToAdminTeam() {
      this.$router.push('/admin/team')
    },
    ToAdminPlatform() {
      this.$router.push('/admin/platform')
    },
    ToAdminData() {
      this.$router.push('/admin/data')
    },
    CheckPassword() {
      // 先对密码进行验证，如果密码正确那么就发起获取所有的队伍的信息的请求
      this.$axios.post('/count-tool/match/check', {
        password: this.password,
      }).then(res=>{
        if(res.data.status===200) {
          // 密码校验成功，可以进行跳转
          Global.methods.successOpen("欢迎你，管理员")
          // 将token放进浏览器缓存里面
          localStorage.setItem("token", res.data.data.token)
          switch (this.choice){
            case 1:
              this.ToAdminTeam()
              break
            case 2:
              this.ToAdminPlatform()
              break
            case 3:
              this.ToAdminData()
              break
          }
        }
      }).catch(error =>{
        Global.methods.fileOpen(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
