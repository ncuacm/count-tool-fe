<template>
  <el-container>
    <el-header><Head/></el-header>
    <div style="height: 100%">
      <div style="height: 10%"></div>
      <div style="height: 22%"><el-row>
      </el-row></div>
      <div style="height: 21%"><el-row>
        <el-button type="success" plain icon="el-icon-document-copy" @click="ExportDataCSV">
          <span>导出所有数据的SQL脚本(数据无价，请谨慎操作)</span>
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
import Global from "../../components/Global";
import axios from "axios";
import fileDownload from 'js-file-download';
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
        this.$axios.get('/count_tool/contest/admin/download/csv', {
          responseType: 'blob'
        }).then(res=>{
          const a = document.createElement('a');
          let blob = new Blob([res.data],{
            type: 'application/vnd.ms-sql',
          });
          let objectUrl = URL.createObjectURL(blob);
          a.setAttribute('href', objectUrl);
          a.setAttribute('download', 'data.sql');
          a.click();
        }).catch(err=>{
          this.methods.failOpen(err)
        })
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
        this.$axios.get('/count_tool/contest/admin/download/excel', {
          responseType: 'blob'
        }).then(res=>{
          const a = document.createElement('a');
          let blob = new Blob([res.data],{
            type: 'application/vnd.ms-excel',
          });
          let objectUrl = URL.createObjectURL(blob);
          a.setAttribute('href', objectUrl);
          a.setAttribute('download', 'data.xlsx');
          a.click();
        }).catch(err=>{
          this.methods.failOpen(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下载'
        });
      });
    },
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
