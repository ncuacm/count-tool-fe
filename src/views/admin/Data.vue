<template>
  <el-container>
    <el-header><Head/></el-header>
    <div style="height: 100%">
      <div style="height: 10%"></div>
      <div style="height: 22%"><el-row>
      </el-row></div>
      <div style="height: 21%"><el-row>
        <el-button type="success" plain icon="el-icon-document-copy" @click="ExportDataCSV">
          <span>导出所有数据的CSV格式(数据无价，请谨慎操作)</span>
        </el-button>
      </el-row></div>
      <div style="height: 21%"><el-row>
        <el-button type="success" plain icon="el-icon-document" @click="ExportDataExcel">
          <span>导出数据经过分析处理的Excel格式</span>
        </el-button>
      </el-row></div>
    </div>
    <el-footer><Foot/></el-footer>
  </el-container>
</template>

<script>
import Foot from "../../components/main/Foot";
import Head from "../../components/main/Head";
export default {
  name: "Data",
  components: {
    Foot,
    Head
  },
  methods: {
    ExportDataCSV() {
      this.$confirm('此操作将导出所有的数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    ExportDataExcel() {
      this.$confirm('此操作将导出Excel文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style>
.center th .cell{
  text-align: center !important;
}
.el-table td, .el-table th{
  text-align: center !important;
}
</style>
