<template>
  <div class="calendar-date">
    <div
      class="date-text"
      :class="{
        'date-selected': isSelected,
        'date-today': dateItem.isToday,
        'date-curr-month': dateItem.isCurrMonth,
        'date-prev-month': dateItem.isPrevMonth,
        'date-next-month': dateItem.isNextMonth,
      }"
    >
      {{ dateItem.day }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { ICalendarItem } from "calendar";

defineProps<{
  dateItem: ICalendarItem;
  isSelected: boolean;
}>();
</script>

<style scoped>
.calendar-date {
  width: 37px;
  height: 37px;

  .date-text {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    box-sizing: border-box;

    cursor: pointer;

    &:hover {
      background-color: #eeeeee;
    }
  }

  .date-selected {
    background-color: #3370ff !important;
    color: #ffffff !important;
  }

  .date-today {
    border: 1px solid #3370ff;
    color: #3370ff;
  }

  .date-curr-month {
    color: #333333;
  }

  .date-next-month {
    color: #999999;
  }

  .date-prev-month {
    color: #999999;
  }
}
</style>
