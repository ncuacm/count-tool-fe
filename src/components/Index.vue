<template>
    <div style="height: 100%">
      <div style="height: 10%"></div>
      <div style="height: 25%"><el-row>
        <el-button type="success" plain icon="el-icon-edit" @click="ToPostInfo">
          <span>提交队伍比赛信息</span>
        </el-button>
      </el-row></div>
      <div style="height: 25%"><el-row>
        <el-button type="success" plain icon="el-icon-search" @click="ToQueryInfoBySession">
          <span>查询具体场次的比赛信息</span>
        </el-button>
      </el-row></div>
      <div style="height: 25%"><el-row>
        <el-button type="success" plain icon="el-icon-document-checked" @click="ToQueryInfoByTeam">
          <span>查询队伍的所有比赛信息</span>
        </el-button>
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
  methods: {
    ToPostInfo() {
      this.$router.push('/contest/submission')
    },
    ToQueryInfoBySession() {
      this.$router.push('/contest/info')
    },
    ToQueryInfoByTeam() {
      this.$router.push('/team/info')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
