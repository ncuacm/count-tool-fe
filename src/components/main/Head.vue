<template>
  <div style="height: 100%">
    <el-header v-model="message">
      <div style="height: 60%">
        {{message}}
      </div>
      <div style="height: 5%">
        <el-divider></el-divider>
      </div>
      <div style="height: 100%">
        <el-button id="back" type="primary" plain icon="el-icon-arrow-left" @click="Back"></el-button>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "Head",
  data() {
    return {
      message: 'NCUACM暑期集训成绩在线管理平台'
    }
  },
  methods: {
    setMessage(newMessage) {
      this.message = newMessage;
    },
    Back() {
      if (window.history.length <= 1) {
        this.$router.push({path:'/'})
        return false
      } else {
        this.$router.go(-1)
      }
      //上面都没执行就说明卡在当前页不是最后一条， histroy记录数量大于1，又没有回退记录，只能返回首页，
      //如果上面都执行了 页面都跳走了，这个也就不用管了
      // setTimeout(() => {
      //   this.$router.push({path:'/'})
      // },500)
    },
  }
}
</script>

<style scoped>

</style>
