<template>
  <div style="height: 100%">
    <div style="height: 11%;"></div>
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
import Global from "./Global";

export default {
  name: "QueryInfoBySession",
  components: {
    Head,
    Foot
  },
  data() {
    return {
      platform: '',
      platforms: [],
    }
  },
  methods: {
    QuerySession() {
      this.$axios.get('/count-tool/match/session/infos?platform=' + this.platform).
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
        Global.methods.fileOpen(error.response.data.msg.detail)
      })
    },
    ToInformation() {
      this.$router.push('/information')
    },
    getTeams() {
      this.$axios('/count-tool/match/team/name/all').
      then(res => {
        if(res.data.status===200){
          if(res.data.data.msg) {
            for(let i = 0; i < res.data.data.msg.length; i++) {
              this.teams.push({label: res.data.data.msg[i], value: res.data.data.msg[i]})
            }
          }
        }
      }).catch(error =>{
        Global.methods.fileOpen(error.response.data.msg.detail)
      })
    },
    getPlatforms() {
      this.$axios('/count-tool/match/name/all').
      then(res => {
        if(res.data.status===200){
          if(res.data.data.msg) {
            for(let i = 0; i < res.data.data.msg.length; i++) {
              this.platforms.push({label: res.data.data.msg[i], value: res.data.data.msg[i]})
            }
          }
        }
      }).catch(error =>{
        Global.methods.fileOpen(error.response.data.msg.detail)
      })
    }
  },
  mounted() {
    this.getPlatforms()
  }
}
</script>

<style scoped>
</style>
