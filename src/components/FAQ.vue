<template>
    <el-dialog :visible.sync="show" @close="this.closeDialog" width="600px" top="10px" style="margin-bottom: 0">
      <div>
        <div>
          <h2>更新日志</h2>
          <p>2021.07.06 1.0版本发布</p>
          <p>2021.11.20 2.0版本发布</p>
          <p>2022.02.05 3.0版本发布</p>
          <p>2022.05.20 4.0版本发布</p>
        </div>
        <div>
          <h2>最新特性</h2>
          <div style="text-align: left;margin-left: 150px">
            <p>提供了后台管理界面，提升系统的拓展性.</p>
            <p>填报比赛界面加密码限制，填报更安全.</p>
            <p>提供了队伍积分排行榜，队伍水平更直观.</p>
            <p>提供了后台数据导出功能，数据更安全.</p>
          </div>
        </div>
        <div>
          <h2>相关人员</h2>
          <div style="text-align: left; margin-left: 150px;">
            <p>后台管理员：樊能，Peterliang</p>
            <p>系统管理员：Peterliang</p>
          </div>
        </div>
        <div>
          <h2>Q&&A</h2>
          <div style="text-align: left; margin-left: 100px; margin-right: 50px">
            <p>Q: 如何生成自己的队伍?</p>
            <p>A: 后台管理员创建生成，同时告诉对应队伍的提交密码.</p>
            <p>Q: 可以修改队伍名或者队伍填报密码吗？</p>
            <p>A: 后台提供了修改队伍名和队伍填报密码的功能，注意队伍名不能和已有的重复了.</p>
            <p>Q: 填报成绩错误怎么办？</p>
            <p>A: 目前需要向管理员报告，由系统管理员进行修改。还没有提供自行修改已填报成绩的功能，后续可能会支持.</p>
            <p>Q: 填报不了，出现系统错误等报错信息怎么办？</p>
            <p>A: 请及时邮件联系系统管理员(ncuyanping666@126.com).</p>
            <p>Q: 已经打完的比赛为什么没有对应的选项入口？</p>
            <p>A: 新的比赛需要后台管理员后台添加，可以提醒后台管理员及时添加.</p>
          </div>
        </div>
        <div>
          <h2>积分说明</h2>
          <el-table
              :data="rankData"
              border
              style="width: 100%">
            <el-table-column
                prop="range"
                label="排名区间"
                width="240">
            </el-table-column>
            <el-table-column
                prop="score"
                label="获得积分"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
</template>

<script>
export default {
  name: "FAQ",
  data() {
    return {
      rankData: [{
        range: '[0,100)',
        score: '100',
      }, {
        range: '[100,300)',
        score: '80',
      }, {
        range: '[300,500)',
        score: '60',
      }, {
        range: '[500,800)',
        score: '40',
      },{
        range: '[800,1000)',
        score: '20',
      },{
        range: '大于等于1000',
        score: '10',
      }],
      show: false,
    }
  },
  methods: {
      closeDialog() {
        this.$emit("closeDialogStatus")
      }
  },
  props: {
    enableShow: Boolean
  },
  watch: {
    enableShow(newValue, oldValue) {
      this.show=newValue
    }
  }
}
</script>

<style scoped>
  h2{
    color: #409EFF;
  }
</style>
