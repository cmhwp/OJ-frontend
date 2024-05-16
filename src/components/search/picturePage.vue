<template>
  <div class="login">
    <div class="item" v-for="(item, index) in props.pictureList" :key="index">
      <a-card :size="'medium'" class="card-demo" hoverable :bordered="false">
        <a-image
          footerPosition="outer"
          width="100%"
          height="100%"
          :src="item.url"
          style="border-radius: 5px; cursor: pointer"
        >
          <!--        <template #extra>
                    <div
                      style="
                        width: 180px;
                        text-align: left;
                        color: #262626;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        -webkit-line-clamp: 2;
                      "
                    >
                      <span style="font-size: 12px">{{ item.title }}</span>
                    </div>
                  </template>-->
          <template #error>
            <div></div>
          </template>
        </a-image>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

interface Props {
  pictureList: any[]
}

const props = withDefaults(defineProps<Props>(), {
  pictureList: () => []
})

// const dataList = ref([]);
// const total = ref(0);

// const visible = ref(false);
//
// const onDownload = (item: { title: string; url: string }) => {
//   fetch(item.url)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = item.title;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     })
//     .catch((error) => {
//       console.error("下载图片失败:", error);
//     });
// };

// const searchParams = ref<PictureQueryRequest>({
//   searchText: "蔡徐坤",
//   pageSize: 100, // 设置pageSize的初始值
//   current: 1,
// });
//
// const loadData = async () => {
//   const res = await PictureControllerService.listPictureByPageUsingPost(
//     searchParams.value
//   );
//   if (res.code === 0) {
//     dataList.value = res.data.records;
//     total.value = res.data.total;
//   } else {
//     message.error("加载失败：" + res.message);
//   }
// };

/**
 * 监听 searchParams 变量，改变是触发页面的更新加载
 */
// watchEffect(() => {
//   searchParams.value = {
//     ...searchParams.value,
//     searchText: route.query.searchText,
//   } as any;
//   loadData();
// });

/**
 * 页面加载时，请求数据
 */
// onMounted(() => {
//   loadData();
// });
</script>

<style scoped>
.login {
  margin: 10px;
  column-count: 7;
  column-gap: 10px;
}

.item {
  margin-bottom: 10px;
}

.card-demo:hover {
  transform: translateY(-4px);
}
</style>
