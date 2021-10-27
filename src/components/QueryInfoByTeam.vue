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
export default {
  name: "QueryInfoByTeam",
  components: {
    Head,
    Foot
  },
  data() {
    return {
      team: '',
      teams: [{
        value: 'int mian',
        label: 'int mian'
      },{
        value: 'fakesupernova',
        label: 'fakesupernova'
      }],
    }
  },
  methods: {
    QueryTeam() {
      this.$axios.get('/count-tool/game/team/infos?name=' + this.team).
        then(res => {
          if(res.data.status===200){
            console.log(res.data.data);
            this.ToInformation();
          }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: `查询失败,请重试!`
        });
      })
    },
    ToInformation() {
      this.$router.push('/information')
    }
  }
}
</script>

<style scoped>
</style>
