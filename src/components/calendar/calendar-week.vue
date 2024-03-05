<template>
  <div id="calendar-week">
    <div class="week-item" v-for="(week, index) in WeekList" :key="index">
      {{ week }}
    </div>
  </div>
</template>

<script setup lang="ts">
const WeekList = ["Sun", "Mon", "Tue", "Wed", "Tue", "Fri", "Sat"];
</script>
<style scoped>
#calendar-week {
  width: 100%;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #999999;

  .week-item {
    font-size: 14px;
    width: 60px;
    text-align: center;
  }
}
</style>
