<template>
  <div style="height: 100%">
    <div style="height: 11%"></div>
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
    <div style="height: 20%">
      <el-row>
        <el-button type="primary" @click="QueryTeam">查询</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import Head from './main/Head'
import Foot from './main/Foot'
import Global from "./Global";
export default {
  name: "QueryInfoByTeam",
  components: {
    Head,
    Foot
  },
  data() {
    return {
      team: '',
      teams: [],
    }
  },
  methods: {
    QueryTeam() {
      this.$axios.get('/count-tool/match/team/infos?name=' + this.team).
        then(res => {
          if(res.data.status===200){
            this.$store.commit('clear')
            for(let i = 0; i < res.data.data.msg.length; i++) {
              this.$store.commit('show', res.data.data.msg[i])
            }
            this.ToInformation();
          }
      }).catch(error => {
        Global.methods.fileOpen(error)
      })
    },
    ToInformation() {
      this.$router.push('/information')
    },
    getTeams() {
      this.$axios.get('/count-tool/match/team/name/all').
      then(res => {
        if(res.data.status===200){
          if(res.data.data.msg) {
            for (let i = 0; i < res.data.data.msg.length; i++) {
              this.teams.push({label: res.data.data.msg[i], value: res.data.data.msg[i]})
            }
          }
        }
      }).catch(error =>{
        Global.methods.fileOpen(error)
      })
    },
  },
  mounted: function () {
    this.getTeams()
  }
}
</script>

<style scoped>
</style>
