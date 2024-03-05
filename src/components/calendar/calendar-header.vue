<template>
  <div id="calendar-header">
    <div class="month-text">
      {{ monthText }}
    </div>
    <div class="month-switcher">
      <icon-arrows-left @click.stop="calendarService.toPrevMonth()" />
      <icon-arrows-right @click.stop="calendarService.toNextMonth()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import calendarService from "@/views/calendar/calendar-service";
import IconArrowsLeft from "@/views/calendar/icon/icon-arrows-left.vue";
import IconArrowsRight from "@/views/calendar/icon/icon-arrows-right.vue";

const monthText = computed(() => {
  const selectedDate = calendarService.selectedDate.value;

  const year = selectedDate.getFullYear();
  const month = `${selectedDate.getMonth() + 1}`.padStart(2, "0");

  return `${year}年${month}月`;
});
</script>

<style scoped>
#calendar-header {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .month-text {
    margin-left: 8px;
  }

  .month-switcher {
    display: flex;
    align-items: center;

    .icon {
      margin-left: 12px;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background-color: #d0d3d3;
      }

      &:active {
        background-color: #b0b3b3;
      }
    }
  }
}
</style>
