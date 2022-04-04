<template>
  <div style="height: 100%">
    <div style="height: 11%"></div>
    <div style="height: 15%">
      <el-select v-model="platform" placeholder="请选择比赛名称">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="height: 15%">
      <el-select v-model="team" placeholder="请选择参赛队伍">
        <el-option
          v-for="item in teams"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="height: 15%; width: 250px; margin: auto">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="password">
          <el-input v-model.number="ruleForm.password"
                    placeholder="请输入您选择的队伍的提交密码" show-password>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div style="height: 15%; width: 200px; margin: auto">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="rank">
          <el-input v-model.number="ruleForm.rank"
                    placeholder="请输入队伍排名">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-row>
        <el-button type="primary" @click="submitInfo('ruleForm')">提交</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import Head from './main/Head'
import Foot from './main/Foot'
import Global from "./Global";
export default {
  name: "function",
  components: {
    Head,
    Foot
  },
  data() {
    const checkRank = (rule, value, callback) => {
      if(!value) {
        return callback(new Error("排名不能为空"))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }else if (value <0){
          callback(new Error('排名需要是一个正整数'));
        }else{
          callback();
        }
      }, 1000);
    };
    const checkPassword = (rule, value, callback) => {
      if(!value) {
        return callback(new Error("密码不能为空,输入队伍密码才能提交"))
      }
      setTimeout(() => {
        callback()
      }, 1000);
    };
    return {
      team: '',
      teams: [],

      platform: '',
      platforms: [],

      ruleForm: {
        password: '',
        rank: '',
      },
      rules: {
        rank: [
          {validator: checkRank, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    submitInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送数据到后端进行存储
          this.PostInfo();
        } else {
          return false;
        }
      });
    },
    PostInfo() {
        this.$axios.post('/count_tool/match/add', {
          "name": this.platform,
          "team_name": this.team,
          "team_password": this.ruleForm.password,
          "team_rank": parseInt(this.ruleForm.rank,10)
        }).then(res => {
          if(res.data.status===200){
            this.confirm(res.data.data.match)
          }
        }).catch(error => {
            Global.methods.fileOpen(error.response.data.detail)
        })
    },
    confirm(result) {
      const confirmMessage =
        '<p>' + '比赛平台: '+result.name + '</p>' +
        '<p>' + '比赛队伍: '+result.team_name + '</p>' +
        '<p>' + '队伍排名: '+result.team_rank + '</p>'
      this.$alert(confirmMessage, '提交成功', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        callback: action => {
          this.$message({
            type: 'success',
            message: `提交成功`
          });
        }
      });
    },
    getTeams() {
      this.$axios('/count_tool/contest/team/name/all').
      then(res => {
        if(res.data.status===200){
          if(res.data.data.msg) {
            for(let i = 0; i < res.data.data.msg.length; i++) {
              this.teams.push({label: res.data.data.msg[i], value: res.data.data.msg[i]})
            }
          }
        }
      }).catch(error =>{
        Global.methods.fileOpen(error.response.data.data.detail)
      })
    },
    getPlatforms() {
      this.$axios('/count_tool/contest/platform/name/all').
      then(res => {
        if(res.data.status===200){
          if(res.data.data.msg) {
            for(let i = 0; i < res.data.data.msg.length; i++) {
              this.platforms.push({label: res.data.data.msg[i], value: res.data.data.msg[i]})
            }
          }
        }
      }).catch(error =>{
        Global.methods.fileOpen(error.response.data.data.detail)
      })
    }
  },

  mounted: function (){
      this.getTeams()
      this.getPlatforms()
  }
}
</script>

<style>
@media screen and (max-width: 750px) {
  .el-message-box {
    width: 60% !important;
  }
}
</style>
