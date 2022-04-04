<template>
  <div style="height: 100%">
    <div style="height: 11%"></div>
    <div style="height: 15%">
      <el-select v-model="team" placeholder="请选择参赛队伍">
        <el-option
          v-for="item in teams"
          :key="item.name"
          :label="item.name"
          :value="item.name">
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
      this.$axios.get('/count_tool/contest/team/info?team=' + this.team).
        then(res => {
          if(res.status===200){
            this.$store.commit('clear')
            for(let i = 0; i < res.data.data.contests.length; i++) {
              this.$store.commit('show', res.data.data.contests[i])
            }
            this.ToInformation();
          }
      }).catch(error => {
        Global.methods.failOpen(error)
      })
    },
    ToInformation() {
      this.$router.push('/information')
    },
    getTeams() {
      this.$axios('/count_tool/contest/team/name/all').
      then(res => {
        if(res.status===200){
          this.teams=[];
          if(res.data.data.names) {
            for(var i=0;i<res.data.data.names.length;i++){
              this.teams.push({name: res.data.data.names[i] });
            }
          }
        }else{
          Global.methods.failOpen(res.data.detail)
        }
      }).catch(error=>{
        Global.methods.errorOpen()
      })
    },
  },
  created: function () {
    this.getTeams()
  }
}
</script>

<style scoped>
</style>
