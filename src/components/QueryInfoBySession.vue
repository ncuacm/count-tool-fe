<template>
  <div style="height: 100%">
    <div style="height: 11%;"></div>
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
    <div style="height: 20%">
      <el-row>
        <el-button type="primary" @click="QuerySession">查询</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import Head from './main/Head'
import Foot from './main/Foot'

export default {
  name: "QueryInfoBySession",
  components: {
    Head,
    Foot
  },
  data() {
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
      }]
    }
  },
  methods: {
    QuerySession() {
      this.$axios.get('/count-tool/match/session/infos?platform=' + this.platform + "&session=" + this.session).
        then(res => {
            if(res.data.status===200){
              // 进行状态的持久化，将我们这次查询到的信息放到store里面
              // 方便在下一个界面然后进行使用
              this.$store.commit('clear')
              for(let i = 0; i < res.data.data.msg.length; i++) {
                this.$store.commit('show', res.data.data.msg[i])
              }
              this.ToInformation();
            }
      }).catch(error =>{
        console.log(error)
        this.$message({
          type: 'error',
          message: `查询失败,请重试!`
        });
      })
    },
    ToInformation() {
      this.$router.push('/information')
    }
  },
}
</script>

<style scoped>
</style>
