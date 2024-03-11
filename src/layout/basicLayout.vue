<template>
  <div id="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <global-header></global-header>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <copy-right class="copy"></copy-right>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basic-layout {
}

#basic-layout .header {
  box-shadow: #eee 1px 1px 5px;
  z-index: 999;
}

#basic-layout .content {
}

#basic-layout .footer {
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
#basic-layout .copy {
  position: relative;
  bottom: 0px;
}
</style>

<script setup lang="ts">
import GlobalHeader from '@/components/globalHeader.vue'
</script>
