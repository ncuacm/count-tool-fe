<template>
  <div style="height: 100%">
    <div style="height: 11%"></div>
    <div style="height: 15%">
      <el-select v-model="platform" placeholder="请选择比赛平台">
        <el-option
          v-for="item in platforms"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="height: 15%">
      <el-select v-model="session" placeholder="请选择比赛场次">
        <el-option
          v-for="item in sessions"
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
export default {
  name: "function",
  components: {
    Head,
    Foot
  },
  data() {
    var checkRank = (rule, value, callback) => {
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
    return {
      platform: '',
      platforms: [{
        value: '牛客',
        label: '牛客'
      }, {
        value: '杭电',
        label: '杭电'
      }],

      session: '',
      sessions: [{
        value: '第一场',
        label: '第一场',
      },{
        value: '第二场',
        label: '第二场',
      },{
        value: '第三场',
        label: '第三场',
      },{
        value: '第四场',
        label: '第四场',
      },{
        value: '第五场',
        label: '第五场',
      },{
        value: '第六场',
        label: '第六场',
      },{
        value: '第七场',
        label: '第七场',
      },{
        value: '第八场',
        label: '第八场',
      },{
        value: '第九场',
        label: '第九场',
      },{
        value: '第十场',
        label: '第十场',
      }],

      team: '',
      teams: [],

      ruleForm: {
        rank: '',
      },
      rules: {
        rank: [
          {validator: checkRank, trigger: 'blur'}
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
        this.$axios.post('/count-tool/game/add', {
          "platform": this.platform,
          "session": this.session,
          "name": this.team,
          "rank": parseInt(this.ruleForm.rank,10)
        }).then(res => {
          if(res.data.status===200){
            this.confirm(res.data.data.msg, res.data.status)
          }
        }).catch(error => {
            this.errorDeal()
        })
    },
    confirm(result) {
      const confirmMessage =
        '<p>' + '比赛平台: '+result.platform + '</p>' +
        '<p>' + '比赛场次: '+result.session + '</p>' +
        '<p>' + '比赛队伍: '+result.name + '</p>' +
        '<p>' + '队伍排名: '+result.rank + '</p>'
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
    errorDeal() {
      this.$alert("请检查网络或者是否重复提交！", "提交失败",{
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'error',
            message: `提交失败`
          });
        }
      });
    },

    getTeams() {
      this.$axios('/count-tool/game/teams').
        then(res => {
          if(res.data.status===200){
            for(let i = 0; i < res.data.data.msg.length; i++) {
              this.teams.push({label: res.data.data.msg[i].name, value: res.data.data.msg[i].name})
            }
          }
      }).catch(error =>{
        this.$message({
          type: 'error',
          message: `服务端错误`
        });
      })
    }
  },

  mounted: function (){
      this.getTeams()
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
