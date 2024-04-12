<template>
  <div style="background-color: #f0f0f0; overflow: hidden">
    <div
      style="
        height: 5vh;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px; /* 可选，设置间距 */
      "
    >
      <div
        style="
          height: 100%;
          margin-bottom: 5px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        "
      >
        <img class="logo" :src="Image14" alt="LOGO" @click="goToHomePage" />
        <a-divider direction="vertical" />
        <a-button
          :style="buttonStyle"
          @mouseover="handleMouseOver"
          @mouseleave="handleMouseLeave"
          @click="handleClick"
        >
          <icon-menu-unfold style="margin-right: 10px" size="20" />
          题库
          <a-button
            :style="buttonStyle"
            @mouseover="handleMouseOver"
            @mouseleave="handleMouseLeave"
          >
            <icon-launch style="margin: -18px" size="12" />
          </a-button>
        </a-button>
        <a-drawer
          :width="600"
          :visible="visible"
          @cancel="handleCancel"
          :placement="'left'"
          :footer="false"
          unmountOnClose
          :drawer-style="{ borderRadius: '15px' }"
        >
          <template #title>每日一题</template>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 10px auto 15px;
              border-radius: 10px;
            "
          >
            <a-space direction="vertical">
              <a-list
                style="margin-bottom: 25px"
                :data="dataList"
                :hoverable="true"
                :pagination-props="{
                  bufferSize: 3,
                  showJumper: true,
                  showPageSize: true,
                  showTotal: true,
                  pageSizeOptions: customPageSizeOptions,
                  pageSize: searchParams.pageSize,
                  current: searchParams.current,
                  total
                }"
                @page-change="onPageChange"
                @page-size-change="onPageSizeChange"
              >
                <template #item="{ item }">
                  <a-list-item>
                    <a-list-item-meta>
                      <template #description>
                        <div style="height: 18px; display: flex; align-items: center">
                          <div style="width: 480px; display: flex">
                            <a-link style="color: #262626" @click="onClick(item.id)"
                              >{{ item.title }}
                            </a-link>
                          </div>
                          <div style="width: 30px; display: flex">
                            <span v-if="item.difficulty === 1" style="color: #00af9b"> 简单 </span>
                            <span v-else-if="item.difficulty === 3" style="color: #ff2d55">
                              中等
                            </span>
                            <span v-else-if="item.difficulty === 2" style="color: #ffb800">
                              困难
                            </span>
                          </div>
                        </div>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
            </a-space>
          </div>
        </a-drawer>
        <a-button>
          <icon-left />
        </a-button>
        <a-button>
          <icon-right />
        </a-button>
      </div>
      <div style="height: 100%; display: flex; justify-content: center; align-items: center">
        <button @click="doRun" :class="{ runButton: true }">
          <icon-run size="18" color="#686868" style="margin-right: 7px" />
          <span style="color: #1a1a1a">运行</span>
        </button>
        <button
          @click="doSubmit"
          :class="{
            submitButton: true
          }"
        >
          <icon-submit size="22" color="#02b128" style="margin-right: 7px" />
          <span style="color: #02b128">提交</span>
        </button>
      </div>
      <div
        style="
          height: 100%;
          margin-bottom: 5px;
          margin-right: 35px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        "
      >
        <div
          class="icon-css-small"
          @mouseover="smallColor = 'black'"
          @mouseout="smallColor = '#737373'"
        >
          <icon-small-bell
            size="20"
            :color="smallColor"
            style="stroke: currentColor; stroke-width: 15px"
          />
        </div>
        <div class="icon-css" @mouseover="color = 'black'" @mouseout="color = '#737373'">
          <icon-flame size="20" :color="color" style="stroke: currentColor; stroke-width: 15px" />
          <span style="font-weight: bold; margin-left: 5px; margin-right: 5px; font-size: 16px">{{
            submitNumber
          }}</span>
        </div>
        <div>
          <a-trigger :popup-translate="[-140, 15]" trigger="hover">
            <a-avatar :size="30">
              <img v-if="userAvatar" alt="avatar" :src="userAvatar" />
              <img
                v-else
                alt="avatar"
                src="https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f"
              />
            </a-avatar>
            <template #content>
              <SetCenter />
            </template>
          </a-trigger>
        </div>
      </div>
    </div>
    <div>
      <a-split
        :style="{
          height: '95vh',
          width: '100%'
        }"
        :min="50"
        :max="1869"
        v-model:size="firstSize"
        @move-end="handleMoveEndFirstSize"
      >
        <template #first>
          <div
            :class="{
              'layout-first': true,
              'layout-first-full-screen': layout_first_full_screen,
              'layout-first-box-shadow': firstSwitch
            }"
            @click="pitchOn(1)"
          >
            <div class="layout-first-animation"></div>
            <div
              v-if="firstSize <= 0.028"
              style="
                width: 36px;
                height: 100%;
                background: #fafafa;
                border-radius: 10px 10px 0 0;
                display: flex;
                flex-direction: column;
                cursor: pointer;
              "
            >
              <div
                style="
                  margin-right: auto;
                  transform: rotate(90deg);
                  margin-top: 108px;
                  margin-left: -107px;
                "
              >
                <a-tabs v-model:selectedTab="selectedTab">
                  <a-space :size="-10">
                    <button
                      key="1"
                      :class="{
                        'custom-button': selectedTab === 'description',
                        'active-tab': selectedTab != 'description'
                      }"
                      style="
                        height: 28px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                      "
                      @click="changeTab('description')"
                    >
                      <icon-storage style="color: #007bff; margin-right: 5px" :size="18" />
                      <span style="white-space: nowrap">题目描述</span>
                    </button>
                    <a-divider direction="vertical" />
                    <button
                      key="2"
                      :class="{
                        'custom-button': selectedTab === 'solutions',
                        'active-tab': selectedTab != 'solutions'
                      }"
                      style="
                        height: 28px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: 0;
                        cursor: pointer;
                      "
                      @click="changeTab('solutions')"
                    >
                      <icon-experiment style="color: #007bff; margin-right: 5px" :size="18" />
                      <span style="white-space: nowrap">题解</span>
                    </button>
                    <a-divider direction="vertical" />
                    <button
                      key="3"
                      :class="{
                        'custom-button': selectedTab === 'submissions',
                        'active-tab': selectedTab != 'submissions'
                      }"
                      style="
                        height: 28px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: 0;
                        cursor: pointer;
                      "
                      @click="changeTab('submissions')"
                    >
                      <icon-schedule style="color: #007bff; margin-right: 5px" :size="18" />
                      <span style="white-space: nowrap">提交记录</span>
                    </button>
                  </a-space>
                </a-tabs>
              </div>
              <div style="margin-top: auto; margin-left: -2px; margin-bottom: 2px">
                <a-space :size="1" direction="vertical">
                  <a-tooltip
                    v-if="!layout_first_full_screen"
                    background-color="#FFFFFF"
                    position="br"
                    :content-style="{
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                      borderRadius: '10px'
                    }"
                  >
                    <template #content
                      ><span style="color: black; font-size: 13px">放大</span></template
                    >
                    <button
                      @click="(layout_first_full_screen = true), (firstSize = 0.5)"
                      style="
                        display: flex;
                        justify-content: center;
                        height: 28px;
                        width: 28px;
                        cursor: pointer;
                      "
                      class="custom-button"
                    >
                      <icon-fullscreen :size="24" style="color: #6a6a6a" />
                    </button>
                  </a-tooltip>
                  <a-tooltip
                    v-if="firstSize <= 0.028"
                    background-color="#FFFFFF"
                    position="br"
                    :content-style="{
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                      borderRadius: '10px'
                    }"
                  >
                    <template #content
                      ><span style="color: black; font-size: 13px">展开</span></template
                    >
                    <button
                      @click="firstSize = currentFirstSize"
                      style="
                        margin-right: 5px;
                        display: flex;
                        justify-content: center;
                        height: 28px;
                        width: 28px;
                        cursor: pointer;
                      "
                      class="custom-button"
                    >
                      <icon-right :size="24" style="color: #6a6a6a" />
                    </button>
                  </a-tooltip>
                </a-space>
              </div>
            </div>
            <div v-else>
              <div
                style="
                  height: 36px;
                  background: #fafafa;
                  border-radius: 10px 10px 0 0;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  cursor: pointer;
                "
              >
                <a-tabs v-model:selectedTab="selectedTab" style="margin-top: -16px">
                  <a-space :size="-10">
                    <button
                      key="1"
                      :class="{
                        'custom-button': selectedTab === 'description',
                        'active-tab': selectedTab != 'description'
                      }"
                      style="
                        height: 28px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                      "
                      @click="changeTab('description')"
                    >
                      <icon-storage style="color: #007bff; margin-right: 5px" :size="18" />
                      <span style="white-space: nowrap">题目描述</span>
                    </button>
                    <a-divider direction="vertical" />
                    <button
                      key="2"
                      :class="{
                        'custom-button': selectedTab === 'solutions',
                        'active-tab': selectedTab != 'solutions'
                      }"
                      style="
                        height: 28px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: 0;
                        cursor: pointer;
                      "
                      @click="changeTab('solutions')"
                    >
                      <icon-experiment style="color: #007bff; margin-right: 5px" :size="18" />
                      <span style="white-space: nowrap">题解</span>
                    </button>
                    <a-divider direction="vertical" />
                    <button
                      key="3"
                      :class="{
                        'custom-button': selectedTab === 'submissions',
                        'active-tab': selectedTab != 'submissions'
                      }"
                      style="
                        height: 28px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: 0;
                        cursor: pointer;
                      "
                      @click="changeTab('submissions')"
                    >
                      <icon-schedule style="color: #007bff; margin-right: 5px" :size="18" />
                      <span style="white-space: nowrap">提交记录</span>
                    </button>
                  </a-space>
                </a-tabs>
                <div>
                  <a-space :size="1">
                    <a-tooltip
                      v-if="!layout_first_full_screen"
                      background-color="#FFFFFF"
                      position="br"
                      :content-style="{
                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                        borderRadius: '10px'
                      }"
                    >
                      <template #content
                        ><span style="color: black; font-size: 13px">放大</span></template
                      >
                      <button
                        @click="layout_first_full_screen = true"
                        style="
                          display: flex;
                          justify-content: center;
                          height: 28px;
                          width: 28px;
                          cursor: pointer;
                        "
                        class="custom-button"
                      >
                        <icon-fullscreen :size="24" style="color: #6a6a6a" />
                      </button>
                    </a-tooltip>
                    <a-tooltip
                      v-if="!layout_first_full_screen"
                      background-color="#FFFFFF"
                      position="br"
                      :content-style="{
                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                        borderRadius: '10px'
                      }"
                    >
                      <template #content
                        ><span style="color: black; font-size: 13px">折叠</span></template
                      >
                      <button
                        @click="firstSize = 0.024"
                        style="
                          margin-right: 5px;
                          display: flex;
                          justify-content: center;
                          height: 28px;
                          width: 28px;
                          cursor: pointer;
                        "
                        class="custom-button"
                      >
                        <icon-left :size="24" style="color: #6a6a6a" />
                      </button>
                    </a-tooltip>
                    <a-tooltip
                      v-if="layout_first_full_screen"
                      background-color="#FFFFFF"
                      position="br"
                      :content-style="{
                        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                        borderRadius: '10px'
                      }"
                    >
                      <template #content
                        ><span style="color: black; font-size: 13px">缩小</span></template
                      >
                      <button
                        @click="layout_first_full_screen = false"
                        style="
                          margin-right: 5px;
                          display: flex;
                          justify-content: center;
                          height: 28px;
                          width: 28px;
                          cursor: pointer;
                        "
                        class="custom-button"
                      >
                        <icon-fullscreen-exit :size="24" style="color: #6a6a6a" />
                      </button>
                    </a-tooltip>
                  </a-space>
                </div>
              </div>
              <template v-if="selectedTab === 'solutions'">
                <div style="overflow: auto; height: 86vh">
                  <question-answer :question="question" />
                </div>
              </template>
              <template v-if="selectedTab === 'submissions'">
                <div>
                  <question-note />
                </div>
              </template>
              <template v-if="selectedTab === 'description'">
                <div style="overflow: auto; height: 86vh">
                  <question-descript :question="question" />
                </div>
                <div
                  style="
                    margin-left: 5px;
                    margin-top: 2px;
                    height: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                  "
                >
                  <a-space :size="1">
                    <a-button
                      style="color: #6c6c6c; border-radius: 5px; width: 73px"
                      @click="onLikeChange"
                    >
                      <icon-thumb-up-fill
                        v-if="isLike == 1"
                        :size="18"
                        style="margin-right: 5px"
                        :style="{ color: '#01B328' }"
                      />
                      <icon-thumb-up v-else :size="18" style="margin-right: 5px" />
                      <span style="margin-top: 5px"> {{ question?.thumbNum }}</span>
                    </a-button>
                    <button
                      class="tailored-button"
                      style="height: 32px; color: #6c6c6c; width: 73px"
                    >
                      <icon-message :size="18" style="margin-right: 4px" />
                      <span>{{ question?.favourNum }}</span>
                    </button>
                    <a-divider direction="vertical" />
                    <button
                      class="tailored-button"
                      style="height: 32px; width: 32px; color: #6c6c6c"
                      @click="onStarChange"
                    >
                      <span v-if="isCollect == 1">
                        <IconStarFill
                          :style="{
                            color: '#ffb400'
                          }"
                          :size="20"
                        />
                      </span>
                      <span v-else>
                        <IconStar :size="20" />
                      </span>
                    </button>
                    <button
                      class="tailored-button"
                      style="height: 32px; width: 32px; color: #6c6c6c"
                    >
                      <icon-launch :size="20" />
                    </button>
                    <button
                      class="tailored-button"
                      style="height: 32px; width: 32px; color: #6c6c6c"
                    >
                      <icon-question :size="20" />
                    </button>
                  </a-space>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template #second>
          <div style="overflow: hidden">
            <a-split
              direction="vertical"
              :style="{ height: '94vh' }"
              :min="41"
              :max="858"
              v-model:size="secondSize"
              @move-end="handleMoveEndSecondSize"
            >
              <template #first>
                <div
                  :class="{
                    'layout-second-first': true,
                    'layout-second-first-full-screen': layout_second_first_full_screen,
                    'layout-second-first-box-shadow': secondSwitch
                  }"
                  id="code-editor-container"
                  @click="pitchOn(2)"
                >
                  <div
                    v-if="firstSize >= 0.971 && secondSize <= 0.06"
                    style="
                      width: 36px;
                      height: 36px;
                      background: #fafafa;
                      border-radius: 10px;
                      cursor: pointer;
                      display: flex;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-left: -2px">
                      <a-space :size="1" direction="vertical">
                        <a-tooltip
                          background-color="#FFFFFF"
                          position="br"
                          :content-style="{
                            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                            borderRadius: '10px'
                          }"
                        >
                          <template #content
                            ><span style="color: black; font-size: 13px">展开</span></template
                          >
                          <button
                            @click="secondSize = currentSecondSize"
                            style="
                              margin-right: 5px;
                              margin-top: 5px;
                              display: flex;
                              justify-content: center;
                              height: 28px;
                              width: 28px;
                              cursor: pointer;
                            "
                            class="custom-button"
                          >
                            <icon-down :size="24" style="color: #6a6a6a" />
                          </button>
                        </a-tooltip>
                      </a-space>
                    </div>
                  </div>
                  <div
                    v-else-if="firstSize >= 0.971"
                    style="
                      width: 36px;
                      height: 100%;
                      background: #fafafa;
                      border-radius: 10px;
                      cursor: pointer;
                      display: flex;
                      flex-direction: column;
                    "
                  >
                    <button
                      class="custom-button"
                      style="
                        padding: 2px;
                        height: 28px;
                        width: 60px;
                        cursor: pointer;
                        transform: rotate(90deg);
                        margin-top: 20px;
                        margin-left: -12px;
                      "
                    >
                      <a-space style="display: flex; justify-content: center" :size="2">
                        <icon-code style="color: #02b128; margin-right: 2px" size="22" />
                        <span style="white-space: nowrap; letter-spacing: 2px">代码</span>
                      </a-space>
                    </button>
                    <div style="margin-top: auto; margin-left: -2px">
                      <a-space :size="1" direction="vertical">
                        <a-tooltip
                          v-if="!layout_second_first_full_screen"
                          background-color="#FFFFFF"
                          position="br"
                          :content-style="{
                            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                            borderRadius: '10px'
                          }"
                        >
                          <template #content
                            ><span style="color: black; font-size: 13px">放大</span></template
                          >
                          <button
                            @click="(layout_second_first_full_screen = true), (firstSize = 0.5)"
                            style="
                              display: flex;
                              justify-content: center;
                              height: 28px;
                              width: 28px;
                              cursor: pointer;
                            "
                            class="custom-button"
                          >
                            <icon-fullscreen :size="24" style="color: #6a6a6a" />
                          </button>
                        </a-tooltip>
                        <a-tooltip
                          v-if="!layout_second_first_full_screen && firstSize >= 0.971"
                          background-color="#FFFFFF"
                          position="br"
                          :content-style="{
                            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                            borderRadius: '10px'
                          }"
                        >
                          <template #content
                            ><span style="color: black; font-size: 13px">折叠</span></template
                          >
                          <button
                            @click="secondSize = 0.045"
                            style="
                              margin-bottom: 5px;
                              display: flex;
                              justify-content: center;
                              height: 28px;
                              width: 28px;
                              cursor: pointer;
                            "
                            class="custom-button"
                          >
                            <icon-up :size="24" style="color: #6a6a6a" />
                          </button>
                        </a-tooltip>
                      </a-space>
                    </div>
                  </div>
                  <div v-else>
                    <div
                      style="
                        height: 36px;
                        background: #fafafa;
                        border-radius: 10px 10px 0 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                      "
                    >
                      <button
                        class="custom-button"
                        style="padding: 2px; height: 28px; cursor: pointer"
                      >
                        <a-space style="display: flex; justify-content: center" :size="2">
                          <icon-code style="color: #02b128; margin-right: 2px" size="22" />
                          <span style="white-space: nowrap">代码</span>
                        </a-space>
                      </button>
                      <div>
                        <a-space :size="1">
                          <a-tooltip
                            v-if="!layout_second_first_full_screen"
                            background-color="#FFFFFF"
                            position="br"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px'
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px">放大</span></template
                            >
                            <button
                              @click="layout_second_first_full_screen = true"
                              style="
                                display: flex;
                                justify-content: center;
                                height: 28px;
                                width: 28px;
                                cursor: pointer;
                              "
                              class="custom-button"
                            >
                              <icon-fullscreen :size="24" style="color: #6a6a6a" />
                            </button>
                          </a-tooltip>
                          <a-tooltip
                            v-if="!layout_second_first_full_screen && secondSize > 0.045"
                            background-color="#FFFFFF"
                            position="br"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px'
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px">折叠</span></template
                            >
                            <button
                              @click="secondSize = 0.045"
                              style="
                                margin-right: 5px;
                                display: flex;
                                justify-content: center;
                                height: 28px;
                                width: 28px;
                                cursor: pointer;
                              "
                              class="custom-button"
                            >
                              <icon-down :size="24" style="color: #6a6a6a" />
                            </button>
                          </a-tooltip>
                          <a-tooltip
                            v-if="!layout_second_first_full_screen && secondSize <= 0.045"
                            background-color="#FFFFFF"
                            position="br"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px'
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px">展开</span></template
                            >
                            <button
                              @click="secondSize = currentSecondSize"
                              style="
                                margin-right: 5px;
                                display: flex;
                                justify-content: center;
                                height: 28px;
                                width: 28px;
                                cursor: pointer;
                              "
                              class="custom-button"
                            >
                              <icon-up :size="24" style="color: #6a6a6a" />
                            </button>
                          </a-tooltip>
                          <a-tooltip
                            v-if="layout_second_first_full_screen"
                            background-color="#FFFFFF"
                            position="br"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px'
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px">缩小</span></template
                            >
                            <button
                              @click="layout_second_first_full_screen = false"
                              style="
                                margin-right: 5px;
                                display: flex;
                                justify-content: center;
                                height: 28px;
                                width: 28px;
                                cursor: pointer;
                              "
                              class="custom-button"
                            >
                              <icon-fullscreen-exit :size="24" style="color: #6a6a6a" />
                            </button>
                          </a-tooltip>
                        </a-space>
                      </div>
                    </div>
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: -28px;
                        padding: 4px;
                      "
                    >
                      <a-form :model="form" layout="inline" size="small" style="margin-left: -15px">
                        <a-form-item field="language">
                          <a-trigger trigger="click" :unmount-on-close="false" position="bl">
                            <a-dropdown
                              v-model:visible="dropdownVisible"
                              placement="bottomLeft"
                              @select="handleSelect"
                            >
                              <button
                                class="language"
                                style="color: #0000008c; width: 60px; height: 24px"
                              >
                                {{ form.language }}
                                <icon-down />
                              </button>
                              <template #content>
                                <a-doption>cpp</a-doption>
                                <a-doption>java</a-doption>
                                <a-doption>go</a-doption>
                              </template>
                            </a-dropdown>
                          </a-trigger>
                        </a-form-item>
                      </a-form>
                      <div style="margin-top: -2px; display: flex">
                        <a-space>
                          <a-tooltip
                            background-color="#FFFFFF"
                            position="tr"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px'
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px"
                                >格式化代码</span
                              ></template
                            >
                            <button
                              class="language"
                              style="height: 24px; width: 24px; padding: 2px"
                              @click="formatCode"
                            >
                              <span> <icon-align-left :size="16" style="color: #999999" /></span>
                            </button>
                          </a-tooltip>
                          <a-tooltip
                            background-color="#FFFFFF"
                            position="tr"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px'
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px"
                                >获取备注过的提交信息</span
                              ></template
                            >
                            <button
                              class="language"
                              style="height: 24px; width: 24px; padding: 2px"
                            >
                              <span> <icon-subscribe :size="16" style="color: #999999" /></span>
                            </button>
                          </a-tooltip>
                          <a-tooltip
                            background-color="#FFFFFF"
                            position="tr"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px'
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px"
                                >还原到默认的代码模板</span
                              ></template
                            >
                            <button
                              @click="showInitialise"
                              class="language"
                              style="height: 24px; width: 24px; padding: 2px"
                            >
                              <span> <icon-refresh :size="16" style="color: #999999" /></span>
                            </button>
                          </a-tooltip>
                          <a-modal
                            v-model:visible="isInitialise"
                            @ok="removeFromLocalStorage()"
                            @cancel="handleCancel"
                          >
                            <template #title>
                              <div
                                style="display: flex; align-items: center; justify-content: center"
                              >
                                <icon-info-circle-fill :size="28" style="color: #165dff" />
                                <span style="font-size: 20px; margin-left: 5px">操作确认</span>
                              </div>
                            </template>
                            <div>您将放弃所有更改并初始化代码！</div>
                          </a-modal>
                        </a-space>
                      </div>
                    </div>
                    <a-divider />
                    <CodeEditor
                      :val="question.frontendCode"
                      :language="form.language"
                      :handle-change="changeCode"
                      :line="changeLine"
                      :column="changeColumn"
                      :initialise="initialise"
                      :style="{
                        height: divHeight - 110 + 'px'
                      }"
                      style="margin-top: -10px"
                    />
                    <div
                      style="
                        height: 30px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 12px;
                      "
                    >
                      <span style="color: #00000057; font-size: 12px; white-space: nowrap"
                        >已储存到本地</span
                      >
                      <span style="color: #00000057; font-size: 12px; white-space: nowrap"
                        >行 {{ line }}， 列 {{ column }}</span
                      >
                    </div>
                  </div>
                </div>
              </template>
              <template #second>
                <div
                  :class="{
                    'layout-second-second': true,
                    'layout-second-second-full-screen': layout_second_second_full_screen,
                    'layout-second-second-box-shadow': thirdSwitch,
                    'layout-second-second-animation': true
                  }"
                  @click="pitchOn(3)"
                >
                  <div
                    v-if="firstSize >= 0.971 && secondSize >= 0.95"
                    style="
                      width: 36px;
                      height: 36px;
                      background: #fafafa;
                      border-radius: 10px;
                      cursor: pointer;
                      display: flex;
                      flex-direction: column;
                    "
                  >
                    <div style="margin-left: -2px">
                      <a-space :size="1" direction="vertical">
                        <a-tooltip
                          background-color="#FFFFFF"
                          position="br"
                          :content-style="{
                            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                            borderRadius: '10px'
                          }"
                        >
                          <template #content
                            ><span style="color: black; font-size: 13px">展开</span></template
                          >
                          <button
                            @click="secondSize = currentSecondSize"
                            style="
                              margin-right: 5px;
                              margin-top: 5px;
                              display: flex;
                              justify-content: center;
                              height: 28px;
                              width: 28px;
                              cursor: pointer;
                            "
                            class="custom-button"
                          >
                            <icon-down :size="24" style="color: #6a6a6a" />
                          </button>
                        </a-tooltip>
                      </a-space>
                    </div>
                  </div>
                  <div
                    v-else-if="firstSize >= 0.971"
                    style="
                      width: 36px;
                      height: 100%;
                      background: #fafafa;
                      border-radius: 10px 10px 0 0;
                      display: flex;
                      flex-direction: column;
                      cursor: pointer;
                    "
                  >
                    <div style="display: flex; align-items: center; transform: rotate(90deg)">
                      <button
                        @click="switchDisplay(1)"
                        :class="{
                          'custom-button': showNum === 1,
                          'active-tab': showNum != 1
                        }"
                        style="padding: 2px; height: 28px; margin-right: -8px"
                      >
                        <a-space style="display: flex; justify-content: center" :size="2">
                          <icon-test-case size="15" color="#02b128" style="margin-right: 5px" />
                          <span style="white-space: nowrap; cursor: pointer">测试用例</span>
                        </a-space>
                      </button>
                      <a-divider direction="vertical" />
                      <button
                        @click="switchDisplay(2)"
                        :class="{
                          'custom-button': showNum === 2,
                          'active-tab': showNum != 2
                        }"
                        style="padding: 2px; height: 28px; margin-left: -10px"
                      >
                        <a-space style="display: flex; justify-content: center" :size="2">
                          <icon-refresh v-if="isRotate" :style="{ fontSize: '22px' }" spin />
                          <icon-test-result v-else size="24" color="#02b128" />
                          <span style="white-space: nowrap; cursor: pointer">测试结果</span>
                        </a-space>
                      </button>
                    </div>
                    <div style="margin-top: auto; margin-left: -2px; margin-bottom: 2px">
                      <a-space :size="1" direction="vertical">
                        <a-tooltip
                          v-if="!layout_second_second_full_screen"
                          background-color="#FFFFFF"
                          position="tr"
                          :content-style="{
                            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                            borderRadius: '10px'
                          }"
                        >
                          <template #content
                            ><span style="color: black; font-size: 13px">放大</span></template
                          >
                          <button
                            @click="(layout_second_second_full_screen = true), (firstSize = 0.5)"
                            style="
                              display: flex;
                              justify-content: center;
                              height: 28px;
                              width: 28px;
                              cursor: pointer;
                            "
                            class="custom-button"
                          >
                            <icon-fullscreen :size="24" style="color: #6a6a6a" />
                          </button>
                        </a-tooltip>
                        <a-tooltip
                          v-if="firstSize >= 0.971"
                          background-color="#FFFFFF"
                          position="tr"
                          :content-style="{
                            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                            borderRadius: '10px'
                          }"
                        >
                          <template #content
                            ><span style="color: black; font-size: 13px">折叠</span></template
                          >
                          <button
                            @click="secondSize = 0.955"
                            style="
                              margin-right: 5px;
                              display: flex;
                              justify-content: center;
                              height: 28px;
                              width: 28px;
                              cursor: pointer;
                            "
                            class="custom-button"
                          >
                            <icon-up :size="24" style="color: #6a6a6a" />
                          </button>
                        </a-tooltip>
                      </a-space>
                    </div>
                  </div>
                  <div v-else>
                    <div
                      style="
                        height: 36px;
                        background: #fafafa;
                        border-radius: 10px 10px 0 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                      "
                    >
                      <div style="display: flex; align-items: center">
                        <button
                          @click="switchDisplay(1)"
                          :class="{
                            'custom-button': showNum === 1,
                            'active-tab': showNum != 1
                          }"
                          style="padding: 2px; height: 28px; margin-right: -8px"
                        >
                          <a-space style="display: flex; justify-content: center" :size="2">
                            <icon-test-case size="15" color="#02b128" style="margin-right: 5px" />
                            <span style="white-space: nowrap; cursor: pointer">测试用例</span>
                          </a-space>
                        </button>
                        <a-divider direction="vertical" />
                        <button
                          @click="switchDisplay(2)"
                          :class="{
                            'custom-button': showNum === 2,
                            'active-tab': showNum != 2
                          }"
                          style="padding: 2px; height: 28px; margin-left: -10px"
                        >
                          <a-space style="display: flex; justify-content: center" :size="2">
                            <icon-refresh v-if="isRotate" :style="{ fontSize: '22px' }" spin />
                            <icon-test-result v-else size="24" color="#02b128" />
                            <span style="white-space: nowrap; cursor: pointer">测试结果</span>
                          </a-space>
                        </button>
                      </div>
                      <div>
                        <a-space :size="1">
                          <a-tooltip
                            v-if="!layout_second_second_full_screen"
                            background-color="#FFFFFF"
                            position="br"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px'
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px">放大</span></template
                            >
                            <button
                              @click="layout_second_second_full_screen = true"
                              style="
                                display: flex;
                                justify-content: center;
                                height: 28px;
                                width: 28px;
                                cursor: pointer;
                              "
                              class="custom-button"
                            >
                              <icon-fullscreen :size="24" style="color: #6a6a6a" />
                            </button>
                          </a-tooltip>
                          <a-tooltip
                            v-if="!layout_second_second_full_screen && secondSize < 0.955"
                            background-color="#FFFFFF"
                            position="br"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px'
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px">折叠</span></template
                            >
                            <button
                              @click="secondSize = 0.955"
                              style="
                                margin-right: 5px;
                                display: flex;
                                justify-content: center;
                                height: 28px;
                                width: 28px;
                                cursor: pointer;
                              "
                              class="custom-button"
                            >
                              <icon-down :size="24" style="color: #6a6a6a" />
                            </button>
                          </a-tooltip>
                          <a-tooltip
                            v-if="!layout_second_second_full_screen && secondSize >= 0.955"
                            background-color="#FFFFFF"
                            position="br"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px'
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px">展开</span></template
                            >
                            <button
                              @click="secondSize = currentSecondSize"
                              style="
                                margin-right: 5px;
                                display: flex;
                                justify-content: center;
                                height: 28px;
                                width: 28px;
                                cursor: pointer;
                              "
                              class="custom-button"
                            >
                              <icon-up :size="24" style="color: #6a6a6a" />
                            </button>
                          </a-tooltip>
                          <a-tooltip
                            v-if="layout_second_second_full_screen"
                            background-color="#FFFFFF"
                            position="br"
                            :content-style="{
                              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
                              borderRadius: '10px'
                            }"
                          >
                            <template #content
                              ><span style="color: black; font-size: 13px">缩小</span></template
                            >
                            <button
                              @click="layout_second_second_full_screen = false"
                              style="
                                margin-right: 5px;
                                display: flex;
                                justify-content: center;
                                height: 28px;
                                width: 28px;
                                cursor: pointer;
                              "
                              class="custom-button"
                            >
                              <icon-fullscreen-exit :size="24" style="color: #6a6a6a" />
                            </button>
                          </a-tooltip>
                        </a-space>
                      </div>
                    </div>
                    <div
                      v-if="showNum == 1"
                      style="
                        margin: 16px 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        overflow: auto;
                      "
                    >
                      <div style="display: flex">
                        <a-tag
                          :checked="index === indexNumber"
                          checkable
                          :closable="close"
                          size="large"
                          style="border-radius: 5px; margin-right: 10px"
                          v-for="(item, index) of inputList"
                          :key="index"
                          @check="switchTags(index)"
                          @close="deleteTags(index)"
                        >
                          <span style="font-size: 14px">Case {{ index }}</span>
                        </a-tag>
                      </div>
                      <span
                        style="
                          color: #3c3c4399;
                          font-size: 13px;
                          margin-bottom: 10px;
                          margin-top: 20px;
                        "
                        >{{ inputListName[indexNum][0] }} =</span
                      >
                      <a-input
                        :style="{
                          width: '100%',
                          height: '43px',
                          borderRadius: '10px',
                          backgroundColor: '#F2F3F4'
                        }"
                        v-model="inputList[indexNum][0]"
                        placeholder="请输入测试用例"
                        allow-clear
                      />
                      <span
                        v-if="listNum"
                        style="
                          color: #3c3c4399;
                          font-size: 13px;
                          margin-bottom: 10px;
                          margin-top: 20px;
                        "
                        >{{ inputListName[indexNum][1] }} =</span
                      >
                      <a-input
                        v-if="listNum"
                        :style="{
                          width: '100%',
                          height: '43px',
                          borderRadius: '10px',
                          backgroundColor: '#F2F3F4'
                        }"
                        v-model="inputList[indexNum][1]"
                        placeholder="请输入测试用例"
                        allow-clear
                      />
                    </div>
                  </div>
                  <div style="height: 91%; overflow: auto">
                    <div
                      v-if="showNum == 2 && isRun && runStatus == 0"
                      style="
                        margin: 16px 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                      "
                    >
                      <div style="display: flex; align-items: center">
                        <span
                          v-if="runResults?.judgeInfo.message === 'Accepted'"
                          style="color: #2db55d; font-size: 22px; margin-right: 15px"
                          >通过</span
                        >
                        <span
                          v-if="runResults?.judgeInfo.message === 'Wrong Answer'"
                          style="color: #ef4743; font-size: 22px; margin-right: 15px"
                          >错误解答</span
                        >
                        <span style="color: #3c3c4399; margin-right: 10px"
                          >执行用时：{{ runResults?.judgeInfo.time }}ms</span
                        >
                      </div>
                      <a-divider size="0" :margin="10" />
                      <div style="display: flex">
                        <a-tag
                          :checked="index === indexNumber"
                          checkable
                          :closable="close"
                          size="large"
                          style="border-radius: 5px; margin-right: 10px"
                          v-for="(item, index) of inputList"
                          :key="index"
                          @check="switchTags(index)"
                          @close="deleteTags(index)"
                        >
                          <span style="font-size: 14px">Case {{ index }}</span>
                        </a-tag>
                      </div>
                      <span
                        style="
                          color: #3c3c4399;
                          font-size: 14px;
                          margin-bottom: 10px;
                          margin-top: 20px;
                        "
                        >输入</span
                      >
                      <div
                        style="
                          width: 99%;
                          height: 36px;
                          background-color: #f7f7f8;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                        "
                      >
                        <span style="color: #3c3c4399; font-size: 12px; margin-bottom: 10px"
                          >{{ inputListName[indexNum][0] }} =</span
                        >
                        <span>{{ inputList[indexNum][0] }}</span>
                      </div>
                      <div
                        v-if="inputListName[indexNum][1]"
                        style="
                          width: 99%;
                          height: 36px;
                          background-color: #f7f7f8;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                          margin-top: 10px;
                        "
                      >
                        <span style="color: #3c3c4399; font-size: 12px; margin-bottom: 10px"
                          >{{ inputListName[indexNum][1] }} =</span
                        >
                        <span>{{ inputList[indexNum][1] }}</span>
                      </div>
                      <span
                        style="
                          color: #3c3c4399;
                          font-size: 14px;
                          margin-bottom: 10px;
                          margin-top: 20px;
                        "
                        >预计结果</span
                      >
                      <div
                        style="
                          width: 99%;
                          height: 24px;
                          background-color: #f7f7f8;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                        "
                      >
                        <span>{{ expectedOutput[indexNum] }}</span>
                      </div>
                      <span
                        style="
                          color: #3c3c4399;
                          font-size: 14px;
                          margin-bottom: 10px;
                          margin-top: 20px;
                        "
                        >实际输出</span
                      >
                      <div
                        style="
                          width: 99%;
                          height: 24px;
                          background-color: #f7f7f8;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                        "
                      >
                        <span>{{ actualOutput[indexNum] }}</span>
                      </div>
                    </div>
                    <div
                      v-if="showNum == 2 && isRun && runStatus == 1"
                      style="
                        margin: 16px 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                      "
                    >
                      <div style="display: flex; align-items: center">
                        <span style="color: #ef4743; font-size: 22px; margin-right: 15px"
                          >测试用例非有效值</span
                        >
                      </div>
                      <a-divider size="0" :margin="10" />
                      <div
                        style="
                          width: 98%;
                          height: 30px;
                          background-color: #feefef;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                          border-radius: 10px;
                        "
                      >
                        <span style="color: #f63636; margin-left: 5px">{{
                          runResults?.error_message
                        }}</span>
                      </div>
                    </div>
                    <div
                      v-if="showNum == 2 && isRun && runStatus == 2"
                      style="
                        margin: 16px 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                      "
                    >
                      <div style="display: flex; align-items: center">
                        <span
                          v-if="runResults.judgeInfo.message == 'Compile Error'"
                          style="color: #ef4743; font-size: 22px; margin-right: 15px"
                          >编译错误</span
                        >
                        <span
                          v-if="runResults.judgeInfo.message == 'Execution Error'"
                          style="color: #ef4743; font-size: 22px; margin-right: 15px"
                          >执行错误</span
                        >
                      </div>
                      <a-divider size="0" :margin="10" />
                      <div
                        style="
                          width: 98%;
                          background-color: #feefef;
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          justify-content: center;
                          padding: 10px 10px;
                          border-radius: 10px;
                        "
                      >
                        <pre style="height: 100%; color: #f63636; line-height: 21px">{{
                          runResults?.error_message
                        }}</pre>
                      </div>
                    </div>
                    <div
                      v-if="showNum == 2 && !isRun"
                      style="
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <span style="color: #3c3c434d">请先执行代码</span>
                    </div>
                  </div>
                </div>
              </template>
              <template #resize-trigger>
                <div class="hover-line">
                  <icon-cut-off-rule
                    style="margin-top: -11px; margin-bottom: -11px; transform: rotate(90deg)"
                  />
                </div>
              </template>
            </a-split>
          </div>
        </template>
        <template #resize-trigger>
          <div class="arrow-cursor">
            <icon-cut-off-rule style="margin-right: -12px; margin-left: -12px" />
          </div>
        </template>
      </a-split>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import message from '@arco-design/web-vue/es/message'
import {
  QuestionControllerService,
  type QuestionQueryRequest,
  type QuestionSubmitAddRequest,
  QuestionSubmitControllerService,
  QuestionThumbControllerService,
  QuestionFavourControllerService
} from '../../../generated'
import { useRoute, useRouter } from 'vue-router'
import useUserStore from '@/stores/user/user'
import { Image14 } from '@/assets/image/imgExport'

const route = useRoute()

const customPageSizeOptions = ref([30, 40, 50])

const divHeight = ref(500)

const showNum = ref(1)

const listNum = ref()

const loginuser = useUserStore()
const userAvatar = ref(loginuser.userAvatar)

// 第一个面板是否全屏
const layout_first_full_screen = ref(false)

// 第二个面板是否全屏
const layout_second_first_full_screen = ref(false)

// 第三个面板是否全屏
const layout_second_second_full_screen = ref(false)

// 第二面板分割大小
const secondSize = ref(0.68)
// 第一面板分割大小
const firstSize = ref(0.5)

// 是否已经运行
const isRun = ref(false)

// 默认标签页
const selectedTab = ref('description')

const color = ref('#737373')
const smallColor = ref('#737373')
const submitNumber = ref(0)

const isShow = ref(true)
const switchDisplay = (num: number) => {
  showNum.value = num
  isShow.value = !isShow.value
}

const indexNumber = ref(0)
const indexNum = ref(0)

const close = ref(true)

const switchTags = (index: any) => {
  indexNumber.value = index
  indexNum.value = index
}

const inputDate = ref([])

// 给当前面板添加阴影
const firstSwitch = ref(false)
const secondSwitch = ref(false)
const thirdSwitch = ref(false)
const pitchOn = (number: number) => {
  if (number === 1) {
    firstSwitch.value = true
    secondSwitch.value = false
    thirdSwitch.value = false
  }
  if (number === 2) {
    firstSwitch.value = false
    secondSwitch.value = true
    thirdSwitch.value = false
  }
  if (number === 3) {
    firstSwitch.value = false
    secondSwitch.value = false
    thirdSwitch.value = true
  }
}

// 拖动分割条后触发
const currentFirstSize = ref(0.5)
const handleMoveEndFirstSize = () => {
  currentFirstSize.value = firstSize.value
}

// 拖动分割条后触发
const currentSecondSize = ref(0.68)
const handleMoveEndSecondSize = () => {
  currentSecondSize.value = secondSize.value
}

const deleteTags = (index: any) => {
  if (inputDate.value.length === 1) {
    close.value = !close.value
  }
  inputDate.value.splice(index, 1)
}

window.onload = () => {
  // 获取 code editor 容器元素
  const codeEditorContainer = document.getElementById('code-editor-container')
  if (codeEditorContainer != null) {
    // 创建一个 ResizeObserver 实例
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        divHeight.value = entry.contentRect.height
      }
    })

    // 开始监听指定 code editor 容器元素的大小变化
    observer.observe(codeEditorContainer)
  }
}
const changeCode = (value: string) => {
  form.value.code = value
}

// 当前代码行数
const line = ref()
const changeLine = (value: string) => {
  line.value = value
}

// 当前代码列数
const column = ref()
const changeColumn = (value: string) => {
  column.value = value
}

const questionId = ref()

// 切换页面
const changeTab = (tab: string) => {
  selectedTab.value = tab
  router.push({
    path: `/do/question/${questionId.value}/${tab}`
  })
}

const router = useRouter()
const goToHomePage = () => {
  window.location.href = '/questions' // 跳转到另一个页面
}

const buttonStyle = ref({ backgroundColor: '#f0f0f0' })

const handleMouseOver = () => {
  buttonStyle.value.backgroundColor = '#E2E2E2'
}

const handleMouseLeave = () => {
  buttonStyle.value.backgroundColor = '#f0f0f0'
}

const visible = ref(false)

const handleClick = () => {
  visible.value = true
}
const handleCancel = () => {
  visible.value = false
}

const searchParams = ref<QuestionQueryRequest>({
  pageSize: 50,
  current: 1
})

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
}
const onPageSizeChange = (pageSize: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: pageSize
  }
}
const question = ref()

const dataList = ref([])
const total = ref(0)

const inputList = ref([0])
const inputListName = ref([''])
// 数据
const loadData = async () => {
  //抽屉数据
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(searchParams.value)
  if (res.code === 0) {
    dataList.value = res.data.records
    total.value = res.data.total
  } else {
    message.error('加载失败：' + res.message)
  }
  // 题目数据
  const questionRes = await QuestionControllerService.getQuestionVoByIdUsingGet(question.value.id)
  console.log(questionRes)
  if (questionRes.code === 0) {
    question.value = questionRes.data
    inputList.value = question.value.input
    inputListName.value = question.value.inputListName
    listNum.value = question.value.inputListName[0][1]
  } else {
    message.error('加载失败，' + questionRes.message)
  }
  // 初始点赞状态
  const likeRes = await QuestionThumbControllerService.getQuestionThumbStatusUsingGet(
    question.value.id
  )
  if (likeRes.code === 0) {
    isLike.value = likeRes.data
  } else {
    message.error('点赞状态失败：' + likeRes.message)
  }
  // 初始收藏状态
  const collectRes = await QuestionFavourControllerService.getQuestionFavourStatusUsingGet(
    question.value.id
  )
  if (collectRes.code === 0) {
    isCollect.value = collectRes.data
  } else {
    message.error('收藏状态失败：' + collectRes.message)
  }
}

// 点赞
const isLike = ref()
const onLikeChange = async () => {
  const res = await QuestionThumbControllerService.doQuestionThumbUsingPost({
    questionId: question.value.id
  })
  if (res.code === 0) {
    question.value.thumbNum += res.data === 1 ? 1 : -1
    isLike.value = res.data === 1 ? 1 : -1
  } else {
    message.error('点赞失败：' + res.message)
  }
}

/**
 * 收藏
 * @param postId
 */

const isCollect = ref()
const onStarChange = async () => {
  const res = await QuestionFavourControllerService.doQuestionFavourUsingPost({
    questionId: question.value.id
  })
  if (res.code === 0) {
    isCollect.value = res.data === 1 ? 1 : -1
  } else {
    message.error('收藏失败：' + res.message)
  }
}

const form = ref<QuestionSubmitAddRequest>({
  language: 'java'
})
const handleSelect = (v: any) => {
  form.value.language = v
}
// 还原到默认的代码模板

const isInitialise = ref(false)

const showInitialise = () => {
  isInitialise.value = !isInitialise.value
}
// 删除本地存储
const initialise = ref(false)

const removeFromLocalStorage = () => {
  const id = route.params.id as string
  localStorage.removeItem(id)
  initialise.value = true
}

// 格式化代码
const formatting = ref(false)

const formatCode = () => {
  formatting.value = true
}

const onClick = (id: any) => {
  router.push({
    path: `/do/question/${id}/description`
  })
  visible.value = false
}

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return
  }
  const res = await QuestionSubmitControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id
  })
  if (res.code === 0) {
    const questionSubmitId = res.data
    await router.push({
      params: {
        id: questionId.value,
        category: 'submissions',
        questionSubmitId: questionSubmitId
      }
    })
    message.success('提交成功')
  } else {
    message.error('提交失败,' + res.message)
  }
}

/**
 * 运行代码
 */
const runResults = ref()
// 预计输出
const actualOutput = ref([])
// 实际输出
const expectedOutput = ref([])

const dropdownVisible = ref(false)
// 运作状态
const runStatus = ref(0)

const isRotate = ref(false)
const doRun = async () => {
  if (!question.value?.id) {
    return
  }
  isRotate.value = true
  console.log(inputList.value)
  const res = await QuestionSubmitControllerService.doQuestionRunUsingPost({
    ...form.value,
    inputList: inputList.value as any,
    questionId: question.value.id
  })
  if (res.code === 0) {
    runResults.value = res.data
    actualOutput.value = res.data.actualOutput
    expectedOutput.value = res.data.expectedOutput
    runStatus.value = res.data.status
    showNum.value = 2
    isRun.value = true
    if (secondSize.value >= 0.96) {
      secondSize.value = 0.5
    }
    isRotate.value = false
    message.success('运行成功')
  } else {
    message.error('提交失败,' + res.message)
  }
}

/**
 * 监听 searchParams 变量，改变是触发页面的更新加载
 */
watchEffect(() => {
  questionId.value = route.params.id
  selectedTab.value = route.params.category as any
  const newId = route.params.id
  question.value = {
    id: newId
  } as never
  loadData()
})

// 监听 secondSize 的变化，并将其存储在缓存中
watch(secondSize, (newValue) => {
  localStorage.setItem('secondSize', newValue.toString())
})

// 监听 secondSize 的变化，并将其存储在缓存中
watch(firstSize, (newValue) => {
  localStorage.setItem('firstSize', newValue.toString())
})

const cachedSecondSizeSize = ref()
const cachedFirstSizeSizeSize = ref()
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  // 第二面板的分割大小从本地获取
  cachedSecondSizeSize.value = localStorage.getItem('secondSize')
  if (cachedSecondSizeSize.value) {
    secondSize.value = parseFloat(cachedSecondSizeSize.value)
    currentSecondSize.value = secondSize.value
  }
  // 第一面板的分割大小从本地获取
  cachedFirstSizeSizeSize.value = localStorage.getItem('firstSize')
  if (cachedFirstSizeSizeSize.value) {
    firstSize.value = parseFloat(cachedFirstSizeSizeSize.value)
    currentFirstSize.value = firstSize.value
  }
  loadData()
})
</script>

<style>
.logo {
  height: 36px;
  cursor: pointer;
  margin-left: 15px;
}

.demo-basic {
  padding: 6px 10px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.custom-button {
  border-radius: 5px; /* 设置圆角大小 */
  background-color: #fafafa;
  border: none;
  outline: none;
  margin-left: 5px;
}

.custom-button:hover {
  background-color: #f0f0f0;
}

.active-tab {
  border-radius: 5px; /* 设置圆角大小 */
  background-color: #fafafa;
  border: none;
  outline: none;
  color: #0000008c;
  margin-left: 5px;
}

.active-tab:hover {
  background-color: #f0f0f0;
}

.tailored-button {
  border-radius: 5px; /* 设置圆角大小 */
  background-color: #ffffff;
  border: none;
  outline: none;
  margin-left: 5px;
}

.tailored-button:hover {
  background-color: #f0f0f0;
}

.submitButton {
  border-radius: 0 5px 5px 0; /* 设置圆角大小 */
  background-color: #e7e7e7;
  border: none;
  outline: none;
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.submitButton:hover {
  background-color: #e2e2e2;
}

.runButton {
  background-color: #e7e7e7;
  border-radius: 5px 0 0 5px; /* 设置圆角大小 */
  border: none;
  outline: none;
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid #f0f0f0;
}

.runButton:hover {
  background-color: #e2e2e2;
}

.round-avatar {
  border-radius: 50%; /* 将图片设为圆形 */
  width: 60px; /* 图片宽度 */
  height: 60px; /* 图片高度 */
  margin-right: 15px; /* 图片右侧留出一些间距 */
}

.username {
  font-weight: bold; /* 设置字体加粗 */
  font-size: 18px; /* 设置字体大小为16像素 */
  margin-bottom: 10px;
}

.avatar-wrapper {
  display: flex; /* 使用 Flex 布局 */
  align-items: center; /* 垂直居中 */
  margin: 15px; /* 设置 div 的边距为2px */
}

.full-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 200px;
  height: 30px;
  border-radius: 4px;
}

.full-button:hover {
  background-color: #f5f5f5;
}

.arrow-cursor {
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ew-resize;
  position: relative;
}

.arrow-cursor::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background-color: #007aff;
  opacity: 0;
  transition: opacity 0.3s;
}

.arrow-cursor:hover::after {
  opacity: 1;
}

.hover-line {
  display: flex;
  width: calc(100% - 10px);
  justify-content: center;
  align-items: center;
  cursor: ns-resize;
  position: relative;
  background-clip: padding-box;
}

.hover-line::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  height: 2px;
  background-color: #007aff;
  opacity: 0;
  transition: opacity 0.3s;
}

.hover-line:hover::after {
  opacity: 1;
}

.language {
  background-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 3px 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.language:hover {
  background-color: #f5f5f5;
}

.layout-first {
  position: relative;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 1px;
  border-radius: 10px;
  background: #ffffff;
  height: calc(94vh - 1px);
  margin-top: 1px;
}

.layout-first-box-shadow {
  box-shadow: 0 0 1px rgba(0, 0, 0, 1);
}

.layout-first-full-screen {
  z-index: 1;
  position: absolute;
  top: 5vh;
  left: 0;
  right: 10px;
  height: 94vh;
}

.arrow-class {
  display: none;
}

.layout-second-first {
  overflow: hidden;
  border-radius: 10px;
  background: #ffffff;
  height: calc(100% - 2px);
  margin: 1px 10px 1px 2px;
}

.layout-second-first-box-shadow {
  box-shadow: 0 0 1px rgba(0, 0, 0, 1);
}

.layout-second-first-full-screen {
  z-index: 1;
  position: absolute;
  top: 5vh;
  left: 10px;
  right: 0;
  height: 94vh;
}

.layout-second-second {
  border-radius: 10px;
  background: #ffffff;
  overflow: hidden;
  height: calc(100% - 2px);
  margin: 1px 10px 1px 2px;
}

.layout-second-second-box-shadow {
  box-shadow: 0 0 1px rgba(0, 0, 0, 1);
}

.layout-second-second-full-screen {
  z-index: 1;
  position: absolute;
  top: 5vh;
  left: 10px;
  right: 0;
  height: 94vh;
}

.icon-css {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 32px;
  border-radius: 5px;
  color: #0000008c;
  margin-right: 5px;
}

.icon-css:hover {
  background-color: #e7e7e7;
  color: black;
}

.icon-css-small {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 5px;
  color: #0000008c;
}

.icon-css-small:hover {
  background-color: #e7e7e7;
  color: black;
}
</style>
