<template>
  <svg
    t="1702908407023"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="4455"
    :width="size"
    :height="size"
    :fill="color"
  >
    <path d="M486.4 102.4l51.2 0 0 819.2-51.2 0 0-819.2Z" p-id="4456"></path>
  </svg>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface IIconProps {
  size?: string | number;
  color?: string;
}

withDefaults(defineProps<IIconProps>(), {
  size: 30,
  color: "#DDDDDD",
});
</script>

<style scoped></style>
