<template>
  <div style="height: 100%">
    <div style="height: 11%;"></div>
    <div style="height: 15%">
      <el-select v-model="platform" placeholder="请选择比赛名称">
        <el-option
          v-for="item in platforms"
          :key="item.name"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </div>
    <div style="height: 20%">
      <el-row>
        <el-button type="primary" @click="GetContestInfo">查询</el-button>
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
    GetContestInfo() {
      this.$axios.get('/count_tool/contest/platform/info?platform=' + this.platform).
        then(res => {
            if(res.status===200){
              // 进行状态的持久化，将我们这次查询到的信息放到store里面
              // 方便在下一个界面然后进行使用
              this.$store.commit('clear')
              for(let i = 0; i < res.data.data.contests.length; i++) {
                this.$store.commit('show', res.data.data.contests[i])
              }
              this.ToInformation();
            }else{
              Global.methods.failOpen(res.data.detail)
            }
      }).catch(error =>{
        console.log(error)
        Global.methods.errorOpen()
      })
    },
    ToInformation() {
      this.$router.push('/information')
    },
    getPlatforms() {
      this.$axios('/count_tool/contest/platform/name/all').
      then(res => {
        if(res.status===200){
          this.platforms=[];
          if(res.data.data.names) {
            for(var i=0;i<res.data.data.names.length;i++){
              this.platforms.push({name: res.data.data.names[i] });
            }
          }
        }else{
          Global.methods.failOpen(res.data.detail)
        }
      }).catch(error=>{
        Global.methods.errorOpen()
      })
    }
  },
  created() {
    this.getPlatforms()
  }
}
</script>

<style scoped>
</style>
