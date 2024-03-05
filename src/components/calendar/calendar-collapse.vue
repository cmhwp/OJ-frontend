<template>
  <div class="calendar-collapse">
    <div class="collapse-header" @click="toggleCollapse">
      <icon-collapse-on v-if="!isCollapsed" color="#646464" />
      <icon-collapse-off v-else color="#646464" />
      <slot name="header" />
    </div>
    <div class="collapse-content" v-if="!isCollapsed">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCollapseOn from "@/views/calendar/icon/icon-collapse-on.vue";
import IconCollapseOff from "@/views/calendar/icon/icon-collapse-off.vue";
import { defineProps, withDefaults, defineEmits, ref } from "vue";

interface ICollapseProps {
  collapsed: boolean;
}

const props = withDefaults(defineProps<ICollapseProps>(), {
  collapsed: false,
});

const emitEvent = defineEmits<{
  (event: "collapse", isCollapsed: boolean): void;
}>();

const isCollapsed = ref(props.collapsed);

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;
  emitEvent("collapse", isCollapsed.value);
}
</script>
<style scoped>
.calendar-collapse {
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .collapse-header {
    height: 34px;
    padding-left: 4px;
    padding-right: 8px;
    display: flex;
    align-items: center;
    border-radius: 10px;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  .collapse-content {
    margin-top: 4px;
  }
}
</style>
