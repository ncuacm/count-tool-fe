<template>

</template>

<script>
import {Message} from "element-ui";
export default {
  name: "Global",
  methods: {
    successOpen(msg) {
      Message ({
        message: msg,
        type: 'success',
      });
    },
    failOpen(error) {
      Message.error(error)
    },
    errorOpen() {
      Message.error("系统出错，请联系管理员")
    }
  }
}
</script>

<style scoped>

</style>
