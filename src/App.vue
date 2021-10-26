<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

html,body,#app{
  margin: 0;
  padding: 0;
  width: 100%;
  height:100%;
  text-align: center;
  position: absolute;
  background: white;
}


.span{
  background-color: white;
  font-weight: bolder;
}


.el-main {
  height: 70%;
  color: #333;
  text-align: center;
  line-height: 160px;
  font-size: 12em;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container {
  height: 95%;
  width: 100%;
}
.el-header {
  height: 15%;
  background-color: white;
  color: deepskyblue;
  text-align: center;
  line-height: 90px;
  font-size: larger;
  font-weight: bolder;
}

.el-footer {
  height: 15%;
  background-color: white;
  font-size: larger;
  color: black;
  text-align: center;
  line-height: 50px;
}

</style>
