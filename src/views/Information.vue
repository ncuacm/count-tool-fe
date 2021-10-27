<template>
  <el-container>
    <el-header><Head/></el-header>
    <div style="height: 2%"></div>
    <div style="height: 100%; overflow: auto; display: flex">
        <div style="width: 20%"></div>
        <div style="width: 60%">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="比赛平台"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="比赛场次"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="比赛队伍">
            </el-table-column>
            <el-table-column
              prop="address"
              label="队伍排名">
            </el-table-column>
          </el-table>
        </div>
      </div>
    <el-footer><Foot/></el-footer>
  </el-container>
</template>

<script>
import Head from "../components/main/Head";
import Foot from "../components/main/Foot";
export default {
  name: "Information",
  components: {Foot, Head},
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },]
    }
  }
}
</script>

<style scoped>

</style>
