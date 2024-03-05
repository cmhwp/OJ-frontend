<template>
  <div id="calendar-table">
    <div class="calendar-content">
      <CalendarDate
        v-for="(date, idx) in dateList"
        :key="idx"
        :date-item="date"
        :is-selected="isDateSelected(date)"
        @click="calendarService.toCertainDate(date.date)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import calendarService from "@/views/calendar/calendar-service";
import { ICalendarItem } from "calendar";
import { isEqualDate } from "@/views/calendar/getMonthDateList";
import CalendarDate from "@/views/calendar/calendar-date.vue";

const dateList = calendarService.monthDateList;

function isDateSelected(dateItem: ICalendarItem) {
  // console.log(
  //   "日期:",
  //   isEqualDate(dateItem.date, calendarService.selectedDate.value)
  // );
  return isEqualDate(dateItem.date, calendarService.selectedDate.value);
}
</script>

<style scoped>
#calendar-table {
  width: 100%;
  height: 225px;

  justify-content: center;

  .calendar-content {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
