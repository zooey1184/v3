<template>
  <page>
    <div>
      <div class="top_page">
        <v-step></v-step>
      </div>
    </div>
  </page>
</template>

<script>
import vStep from '@/components/step/v-step.vue'

export default {
  components: {
    vStep
  }
}
</script>

<style lang="less">
.top_page {
  position: relative;
  width: 100%;
  height: 200px;
  background: rgb(172, 56, 56);
}
</style>

