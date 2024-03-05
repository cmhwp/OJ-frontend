<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    class="h-4.5 w-4.5 text-lc-yellow-60 dark:text-dark-lc-yellow-60 inline-block shrink-0 fill-none stroke-current"
  >
    <path
      stroke-width="2"
      d="M18 12a6.002 6.002 0 01-5.004 5.918c-.545.09-.996-.366-.996-.918V7c0-.552.451-1.009.996-.918A6.002 6.002 0 0118 12z"
    ></path>
    <path
      stroke-width="2"
      d="M21.6 12a9.6 9.6 0 01-9.6 9.6 9.6 9.6 0 119.6-9.6z"
      clip-rule="evenodd"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface IIconProps {
  size?: string | number;
  color?: string;
}

withDefaults(defineProps<IIconProps>(), {
  size: 16,
  color: "#333333",
});
</script>

<style scoped></style>
