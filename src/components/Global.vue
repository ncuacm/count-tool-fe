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
    fileOpen(error) {
      Message.error(error)
    }
  }
}
</script>

<style scoped>

</style>
