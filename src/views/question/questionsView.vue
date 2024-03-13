<template>
  <div id="questionsView">
    <a-row class="grid-demo">
      <a-col :span="17">
        <div>
          <a-form :model="searchParams" layout="inline">
            <a-space :size="-28" style="display: flex; justify-content: center; margin-left: -8px">
              <a-form-item>
                <a-button
                  style="
                    width: 103px;
                    height: 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-radius: 5px;
                  "
                  @click="rotateIconQuestion"
                  >题单
                  <icon-down :size="16" v-if="!rotatedQuestion" />
                  <icon-down :size="16" v-else :rotate="180" />
                </a-button>
              </a-form-item>
              <a-form-item>
                <a-trigger position="bl" :popup-visible="displayedDifficulty">
                  <a-button
                    style="
                      width: 103px;
                      height: 32px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      border-radius: 5px;
                    "
                    @click="rotateIconDifficulty"
                    >难度
                    <icon-down
                      :size="16"
                      :class="{
                        'rotate-clockwise': rotatedDifficulty,
                        'rotate-counterclockwise': !rotatedDifficulty
                      }"
                    />
                  </a-button>
                  <template #content>
                    <div class="demo-basic">
                      <button class="transparent-btn" @click="doDifficulty(1)">
                        <span style="color: #00af9b">简单</span>
                        <img v-if="tag === 1" :src="Image4" alt="" class="small-image" />
                      </button>
                      <button class="transparent-btn" @click="doDifficulty(2)">
                        <span style="color: #ffb800">中等</span>
                        <img v-if="tag === 2" :src="Image4" alt="" class="small-image" />
                      </button>
                      <button class="transparent-btn" @click="doDifficulty(3)">
                        <span style="color: #ff2d55">困难</span>
                        <img v-if="tag === 3" :src="Image4" alt="" class="small-image" />
                      </button>
                    </div>
                  </template>
                </a-trigger>
              </a-form-item>
              <a-form-item>
                <a-trigger position="bl" :popup-visible="displayedStatus">
                  <a-button
                    style="
                      width: 103px;
                      height: 32px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      border-radius: 5px;
                    "
                    @click="rotateIconState"
                    >状态
                    <icon-down
                      :size="16"
                      :class="{
                        'rotate-clockwise': rotatedState,
                        'rotate-counterclockwise': !rotatedState
                      }"
                    />
                  </a-button>
                  <template #content>
                    <div class="demo-basic">
                      <button class="transparent-btn" @click="doStatus(1)">
                        <div style="display: flex; align-content: center">
                          <img :src="Image2" alt="" style="margin-right: 5px" />
                          <span style="color: #262626">未开始</span>
                        </div>
                        <img v-if="statusTag === 1" :src="Image4" alt="" class="small-image" />
                      </button>
                      <button class="transparent-btn" @click="doStatus(2)">
                        <div style="display: flex; align-content: center">
                          <img :src="Image1" alt="" style="margin-right: 5px" />
                          <span style="color: #262626">已解答</span>
                        </div>
                        <img v-if="statusTag === 2" :src="Image4" alt="" class="small-image" />
                      </button>
                      <button class="transparent-btn" @click="doStatus(3)">
                        <div style="display: flex; align-content: center">
                          <img
                            :src="Image3"
                            alt=""
                            style="margin-right: 5px; width: 16px; height: 16px"
                          />
                          <span style="color: #262626">尝试过</span>
                        </div>
                        <img v-if="statusTag === 3" :src="Image4" alt="" class="small-image" />
                      </button>
                    </div>
                  </template>
                </a-trigger>
              </a-form-item>
              <a-form-item>
                <a-trigger
                  trigger="click"
                  :unmount-on-close="false"
                  position="bl"
                  @hide="closeTags"
                  @show="showTag"
                >
                  <a-button
                    style="
                      width: 103px;
                      height: 32px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      border-radius: 5px;
                    "
                    @click="rotateIconTag"
                    >标签
                    <a-tag
                      v-if="showTags.length != 0"
                      color="#D9DBDE"
                      style="color: #262626bf; border-radius: 100%; transform: scale(0.8)"
                      >{{ showTags.length }}
                    </a-tag>
                    <icon-down
                      :size="16"
                      :class="{
                        'rotate-clockwise': rotatedTag,
                        'rotate-counterclockwise': !rotatedTag
                      }"
                    />
                  </a-button>
                  <template #content>
                    <div
                      style="
                        margin-top: 4px;
                        padding: 10px;
                        width: 300px;
                        height: 472px;
                        background-color: var(--color-bg-popup);
                        border-radius: 4px;
                        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
                        text-align: center;
                      "
                    >
                      <a-input
                        v-model:value="Tag"
                        style="border-radius: 5px; margin-bottom: 10px"
                        :style="{ width: '300px' }"
                        placeholder="筛选标签"
                        allow-clear
                        @input="selectTags"
                        @clear="closeTagsList"
                      >
                        <template #prefix>
                          <icon-search />
                        </template>
                      </a-input>
                      <div style="width: 310px; height: 400px" class="outer-div">
                        <div style="text-align: left; margin-bottom: 10px">
                          <a-tag
                            checkable
                            :checked="true"
                            style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                            v-for="(tag, index) of selectTagsList"
                            :key="index"
                            :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                            @click="doTagCheck(tag)"
                          >
                            {{ tag }}
                          </a-tag>
                        </div>
                        <a-space direction="vertical" style="margin-bottom: 15px">
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">基本</span>
                            <icon-down
                              @click="doBasicIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': basicIcon,
                                'rotate-counterclockwise': !basicIcon
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                              v-for="(tag, index) of basicTags.slice(0, basicTagsNum)"
                              :key="index"
                              :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space direction="vertical" style="margin-bottom: 15px">
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">算法</span>
                            <icon-down
                              @click="doAlgorithmIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': algorithmIcon,
                                'rotate-counterclockwise': !algorithmIcon
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                              v-for="(tag, index) of algorithmTags.slice(0, algorithmTagsNum)"
                              :key="index"
                              :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space direction="vertical" style="margin-bottom: 15px">
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">基础数据结构</span>
                            <icon-down
                              @click="doDate_StructureIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': date_StructureIcon,
                                'rotate-counterclockwise': !date_StructureIcon
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                              v-for="(tag, index) of date_StructureTags.slice(
                                0,
                                date_StructureTagsNum
                              )"
                              :key="index"
                              :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space direction="vertical" style="margin-bottom: 15px">
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">高级数据结构</span>
                            <icon-down
                              @click="doAdvanced_Date_StructureIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': advanced_Date_StructureIcon,
                                'rotate-counterclockwise': !advanced_Date_StructureIcon
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                              v-for="(tag, index) of advanced_Date_StructureTags.slice(
                                0,
                                advanced_Date_StructureTagsNun
                              )"
                              :key="index"
                              :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space direction="vertical" style="margin-bottom: 15px">
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">技巧</span>
                            <icon-down
                              @click="doSkillTagsIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': skillIcon,
                                'rotate-counterclockwise': !skillIcon
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                              v-for="(tag, index) of skillTags.slice(0, skillTagsNun)"
                              :key="index"
                              :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space direction="vertical" style="margin-bottom: 15px">
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">数学</span>
                            <icon-down
                              @click="doArithTagsIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': arithIcon,
                                'rotate-counterclockwise': !arithIcon
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                              v-for="(tag, index) of arithTags.slice(0, arithTagsNun)"
                              :key="index"
                              :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                        <a-space direction="vertical">
                          <div
                            style="
                              display: flex;
                              align-items: center;
                              justify-content: space-between;
                            "
                          >
                            <span style="color: #262626bf">其他</span>
                            <icon-down
                              @click="doOtherTagsIcon"
                              style="color: #636c7b; cursor: pointer"
                              :class="{
                                'rotate-clockwise': otherIcon,
                                'rotate-counterclockwise': !otherIcon
                              }"
                            />
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-wrap: wrap;
                              align-items: center;
                              width: 300px;
                              margin-bottom: 10px;
                            "
                          >
                            <a-tag
                              checkable
                              :checked="true"
                              style="border-radius: 10px; margin-right: 5px; margin-bottom: 5px"
                              v-for="(tag, index) of otherTags.slice(0, otherTagsNun)"
                              :key="index"
                              :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                              @click="doTagCheck(tag)"
                            >
                              {{ tag }}
                            </a-tag>
                          </div>
                        </a-space>
                      </div>
                      <a-divider style="margin-top: 1px; margin-bottom: 10px" />
                      <div
                        style="display: flex; align-items: center; justify-content: space-between"
                      >
                        <span
                          v-if="!isALLShow"
                          style="color: #007aff; cursor: pointer"
                          @click="allShow"
                          >展开全部</span
                        >
                        <span v-else style="color: #007aff; cursor: pointer" @click="allShow"
                          >收起全部</span
                        >
                        <div style="color: #3c3c4399">
                          <icon-loop size="16" style="cursor: pointer" @click="resettingTags" />
                          <span style="cursor: pointer" @click="resettingTags">重置</span>
                        </div>
                      </div>
                    </div>
                  </template>
                </a-trigger>
              </a-form-item>
              <a-form-item>
                <a-input
                  :default-value="formattedSearchText"
                  style="border-radius: 5px"
                  :style="{ width: '250px' }"
                  placeholder="请输入题目、编号或内容！"
                  @input="onSearch"
                >
                  <template #prefix>
                    <icon-search />
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-trigger trigger="click" :unmount-on-close="false" position="br">
                  <a-button style="border-radius: 5px">
                    <icon-settings :size="20" style="margin-left: -5px; margin-right: -5px" />
                  </a-button>
                  <template #content>
                    <div class="demo-basic">
                      <button class="transparent-but">
                        <button v-if="!display" class="transparent-butt" @click="doSelect"></button>
                        <button v-if="display" class="transparent-butto" @click="doSelect">
                          <img :src="Image5" alt="" style="margin-top: -2px; margin-left: -6px" />
                        </button>
                        <span>显示标签</span>
                      </button>
                      <button class="transparent-but">
                        <button class="transparent-butt"></button>
                        <span>显示企业</span>
                      </button>
                    </div>
                  </template>
                </a-trigger>
              </a-form-item>
              <a-form-item>
                <button
                  style="
                    width: 115px;
                    height: 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-radius: 5px;
                    border: none; /* 隐藏边框 */
                    background-color: transparent; /* 设置背景为透明 */
                    cursor: pointer; /* 设置鼠标指针为手型 */
                    margin-left: 5px;
                  "
                >
                  <a-avatar
                    :size="30"
                    :style="{ backgroundColor: '#3370ff' }"
                    style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); margin-left: 5px"
                  >
                    <img
                      alt="avatar"
                      :src="Image7"
                      style="transform: scale(0.8); margin-top: -2px; margin-left: -1px"
                      @click="doRandom"
                    />
                  </a-avatar>
                  <span style="margin-left: 10px; color: #3370ff" @click="doRandom">随机一题</span>
                </button>
              </a-form-item>
            </a-space>
          </a-form>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <div>
              <a-tag
                closable
                v-if="tag === 1"
                style="color: #00af9b; margin-top: 5px; margin-left: 8px; border-radius: 15px"
                @close="closeDifficulty"
                >简单
              </a-tag>
              <a-tag
                closable
                v-if="tag === 2"
                style="color: #ffb800; margin-top: 5px; margin-left: 8px; border-radius: 15px"
                @close="closeDifficulty"
                >中等
              </a-tag>
              <a-tag
                closable
                v-if="tag === 3"
                style="color: #ff2d55; margin-top: 5px; margin-left: 8px; border-radius: 15px"
                @close="closeDifficulty"
                >困难
              </a-tag>
              <a-tag
                closable
                v-if="statusTag === 1"
                style="color: #262626; margin-top: 5px; margin-left: 8px; border-radius: 15px"
                @close="closeStatus"
                ><img :src="Image2" alt="" style="margin-right: 5px" />未开始
              </a-tag>
              <a-tag
                closable
                v-if="statusTag === 2"
                style="color: #262626; margin-top: 5px; margin-left: 8px; border-radius: 15px"
                @close="closeStatus"
                ><img :src="Image1" alt="" style="margin-right: 5px" />已解答
              </a-tag>
              <a-tag
                closable
                v-if="statusTag === 3"
                style="color: #262626; margin-top: 5px; margin-left: 8px; border-radius: 15px"
                @close="closeStatus"
                ><img
                  :src="Image3"
                  alt=""
                  style="margin-right: 5px; width: 16px; height: 16px"
                />尝试过
              </a-tag>
              <a-tag
                closable
                style="margin-top: 5px; margin-left: 8px; border-radius: 15px"
                v-for="(tag, index) of showTags"
                :key="index"
                @close="closeTag(tag)"
              >
                {{ tag }}
              </a-tag>
            </div>
            <span
              v-if="tag != 0 || statusTag != 0 || showTags.length != 0"
              style="color: #3c3c4399; cursor: pointer"
              @click="resettingAll"
              ><icon-loop :size="16" style="margin-right: 2px; cursor: pointer" />重置</span
            >
          </div>
          <div
            style="
              width: 900px;
              background-color: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 10px;
              overflow: hidden; /* 添加这一行以避免斑马纹效果在边缘溢出 */
              margin: -10px auto 15px;
            "
          >
            <a-space direction="vertical">
              <div style="display: flex; align-items: center; height: 44px; margin-top: 10px">
                <div style="width: 84px; display: flex; margin-left: 20px; color: #8a8a8e">
                  状态
                </div>
                <div style="width: 298px; display: flex">
                  <button class="custom-but" @click="doQuestionSorting(numberQuestion)">
                    题目
                    <a-space direction="vertical" :size="-11">
                      <icon-caret-up v-if="upQuestion" :size="12" />
                      <icon-caret-down v-if="downQuestion" :size="12" />
                    </a-space>
                  </button>
                </div>
                <div style="width: 136px; display: flex; color: #8a8a8e">
                  <button class="custom-but">
                    题解
                    <a-space direction="vertical" :size="-11">
                      <icon-caret-up :size="12" />
                      <icon-caret-down :size="12" />
                    </a-space>
                  </button>
                </div>
                <div style="width: 180px; display: flex">
                  <button class="custom-but" @click="sortByPassRate(numberPassRate)">
                    通过率
                    <a-space direction="vertical" :size="-11">
                      <icon-caret-up v-if="upPass_rate" :size="12" />
                      <icon-caret-down v-if="downPass_rate" :size="12" />
                    </a-space>
                  </button>
                </div>
                <div style="width: 148px; display: flex">
                  <button class="custom-but" @click="doDifficultySorting(numberDifficulty)">
                    难度
                    <a-space direction="vertical" :size="-11">
                      <icon-caret-up v-if="upDifficulty" :size="12" />
                      <icon-caret-down v-if="downDifficulty" :size="12" />
                    </a-space>
                  </button>
                </div>
              </div>
              <a-divider style="margin-top: -10px; margin-bottom: -10px" />
              <a-list
                style="margin-top: -17px; margin-bottom: 25px"
                :data="dataList"
                :bordered="false"
                :split="false"
              >
                <template #item="{ item, index }">
                  <a-list-item
                    :style="{
                      background: index % 2 === 1 ? '#F7F8FA' : 'transparent',
                      borderRadius: '10px'
                    }"
                  >
                    <a-list-item-meta>
                      <template #description>
                        <div
                          :style="{ height: dynamicHeight + 'px' }"
                          style="display: flex; align-items: center"
                        >
                          <div style="width: 84px; display: flex">
                            <a-trigger auto-fit-position :unmount-on-close="false"
                              ><img
                                style="width: 19px; height: 19px; cursor: pointer; margin-top: 3px"
                                v-if="item.status == 3"
                                alt="avatar"
                                :src="Image6"
                              />
                              <template #content>
                                <div class="adopt-basic">已解答</div>
                              </template>
                            </a-trigger>
                            <a-trigger auto-fit-position :unmount-on-close="false">
                              <img
                                style="width: 18px; height: 18px; cursor: pointer; margin-top: 3px"
                                v-if="item.status == 2"
                                alt="avatar"
                                :src="Image3"
                              />
                              <template #content>
                                <div class="Attempted-basic">尝试过</div>
                              </template>
                            </a-trigger>
                          </div>
                          <div style="width: 300px; display: flex">
                            <a-space direction="vertical" :size="1">
                              <a-link
                                :href="`/do/question/${item.id}/description`"
                                :hoverable="false"
                                ><span class="hover-effect">
                                  {{ item.title }}
                                </span>
                              </a-link>
                              <a-space v-if="display">
                                <a-tag
                                  v-for="(tag, index) of item.tags"
                                  :key="index"
                                  :color="showTags.includes(tag) ? '#165dff' : 'gray'"
                                  style="border-radius: 20px"
                                >
                                  {{ tag }}
                                </a-tag>
                              </a-space>
                            </a-space>
                          </div>
                          <div style="width: 145px; display: flex">
                            1
                            <icon-player size="18" style="margin-left: 5px; margin-top: 2px" />
                          </div>
                          <div style="width: 180px; display: flex">
                            <a-statistic
                              :value="item.passRate"
                              :precision="2"
                              :value-style="{
                                color: '#262626',
                                fontSize: '14px'
                              }"
                            >
                              <template #suffix>%</template>
                            </a-statistic>
                          </div>
                          <div style="width: 148px; display: flex">
                            <span v-if="item.difficulty === 1" style="color: #00af9b"> 简单 </span>
                            <span v-else-if="item.difficulty === 2" style="color: #ffb800">
                              中等
                            </span>
                            <span v-else-if="item.difficulty === 3" style="color: #ff2d55">
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
        </div>
        <div style="display: flex; justify-content: flex-end">
          <a-pagination
            :total="total"
            show-jumper
            show-page-size
            :base-size="5"
            :buffer-size="2"
            @change="onPageChange"
            @pageSizeChange="onPageSizeChange"
            :pageSize="pageSize"
            :current="current"
            :pageSizeOptions="customPageSizeOptions"
            :page-item-style="{
              borderRadius: '5px',
              backgroundColor: '#F2F3F4'
            }"
            :active-page-item-style="{
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#FFFFFF',
              color: '#1a1a1a',
              borderRadius: '5px'
            }"
          >
            <template #page-item="{ page }"> {{ page }}</template>
            <template #page-item-step="{ type }">
              <icon-right
                :style="type === 'previous' ? { transform: `rotate(180deg)` } : undefined"
              />
            </template>
            <template #page-item-ellipsis>
              <icon-sun-fill />
            </template>
          </a-pagination>
        </div>
      </a-col>
      <a-col :span="7">
        <div class="right">
          <div class="calendar">
            <calendar-collapse>
              <template #header>
                <calendar-header />
              </template>
              <template #content>
                <calendar-week />
                <CalendarTable />
              </template>
            </calendar-collapse>
          </div>
          <!--TODO-->
          <div style="margin-left: 10px">
            <div
              style="
                width: 270px;
                height: 152px;
                border-radius: 10px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.125);
              "
            >
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 16px;
                "
              >
                <span>当前进度</span>
                <div style="display: flex; justify-content: center">
                  <a-space></a-space>
                  <a-button
                    style="
                      width: 108px;
                      height: 24px;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      border-radius: 5px 0 0 5px; /* 左上角和左下角为圆角 */
                      font-size: 12px; /* 调整字体大小 */
                      margin-right: 1px; /* 添加右边距 */
                    "
                    >我的进度
                    <icon-down />
                  </a-button>
                  <a-button
                    style="
                      border-radius: 0 5px 5px 0; /* 左上角和左下角为圆角 */
                      width: 22px;
                      height: 24px;
                    "
                  >
                    <icon-settings :size="20" style="margin-left: -7px; margin-right: -7px" />
                  </a-button>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 20px 0 20px;
                "
              >
                <div
                  class="progress-container"
                  @mouseover="
                    (questionSubmitPassRateNumShow = true), (SubmissionPassRateNumShow = false)
                  "
                  @mouseleave="
                    (questionSubmitPassRateNumShow = false), (SubmissionPassRateNumShow = true)
                  "
                >
                  <a-progress
                    type="circle"
                    :stroke-width="3"
                    :show-text="false"
                    :percent="passRate"
                    :style="{ transform: 'scale(1.18)' }"
                    :size="'large'"
                    :color="{ '0%': '#FFA116', '100%': '#FFA116' }"
                  />
                  <div class="progress-text" v-if="SubmissionPassRateNumShow">
                    <span style="font-size: 12px; color: #3c3c4399">全部</span>
                    <span
                      style="font-size: 24px; color: #1c1c1c; font-weight: bold; margin-top: 3px"
                      >{{ throughNumber }}</span
                    >
                    <a-divider margin="0" />
                    <span style="font-size: 12px; color: #3c3c434d; margin-top: 3px">{{
                      questionNumber
                    }}</span>
                  </div>
                  <div
                    class="progress-text"
                    style="cursor: default"
                    v-if="questionSubmitPassRateNumShow"
                  >
                    <a-statistic
                      :value="questionSubmitPassRateNum * 100"
                      :precision="1"
                      :value-style="{
                        color: '#1c1c1c',
                        fontSize: '19px',
                        fontWeight: 'bold'
                      }"
                    >
                      <template #suffix>%</template>
                    </a-statistic>
                    <span style="font-size: 12px; color: #3c3c4399; white-space: nowrap"
                      >提交通过率</span
                    >
                  </div>
                  <div class="progress-text" v-if="briefnessSubmissionPassRateNumShow">
                    <a-statistic
                      :value="briefnessSubmissionPassRateNum * 100"
                      :precision="1"
                      :value-style="{
                        color: '#00af9b',
                        fontSize: '19px',
                        fontWeight: 'bold'
                      }"
                    >
                      <template #suffix>%</template>
                    </a-statistic>
                    <span style="font-size: 12px; color: #3c3c4399; white-space: nowrap"
                      >提交通过率</span
                    >
                  </div>
                  <div class="progress-text" v-if="mediumSubmissionPassRateNumShow">
                    <a-statistic
                      :value="mediumSubmissionPassRateNum * 100"
                      :precision="1"
                      :value-style="{
                        color: '#ffb800',
                        fontSize: '19px',
                        fontWeight: 'bold'
                      }"
                    >
                      <template #suffix>%</template>
                    </a-statistic>
                    <span style="font-size: 12px; color: #3c3c4399; white-space: nowrap"
                      >提交通过率</span
                    >
                  </div>
                  <div class="progress-text" v-if="difficultySubmissionPassRateNumShow">
                    <a-statistic
                      :value="difficultySubmissionPassRateNum * 100"
                      :precision="1"
                      :value-style="{
                        color: '#ff2d55',
                        fontSize: '19px',
                        fontWeight: 'bold'
                      }"
                    >
                      <template #suffix>%</template>
                    </a-statistic>
                    <span style="font-size: 12px; color: #3c3c4399; white-space: nowrap"
                      >提交通过率</span
                    >
                  </div>
                </div>
                <div style="display: flex; gap: 15px; height: 68px">
                  <div
                    style="width: 24px; cursor: pointer"
                    @mouseover="
                      (briefnessSubmissionPassRateNumShow = true),
                        (SubmissionPassRateNumShow = false)
                    "
                    @mouseleave="
                      (briefnessSubmissionPassRateNumShow = false),
                        (SubmissionPassRateNumShow = true)
                    "
                  >
                    <span style="color: #00af9b; font-size: 12px">简单</span>
                    <div style="margin-top: 10px; font-weight: bold">
                      {{ briefnessPassNum }}
                    </div>
                    <a-divider :margin="4" />
                    <div style="font-size: 12px; color: #3c3c434d">
                      {{ briefnessNum }}
                    </div>
                  </div>
                  <div
                    style="width: 24px; cursor: pointer"
                    @mouseover="
                      (mediumSubmissionPassRateNumShow = true), (SubmissionPassRateNumShow = false)
                    "
                    @mouseleave="
                      (mediumSubmissionPassRateNumShow = false), (SubmissionPassRateNumShow = true)
                    "
                  >
                    <span style="color: #ffb800; font-size: 12px">中等</span>
                    <div style="margin-top: 10px; font-weight: bold">
                      {{ mediumPassNum }}
                    </div>
                    <a-divider :margin="4" />
                    <div style="font-size: 12px; color: #3c3c434d">
                      {{ mediumNum }}
                    </div>
                  </div>
                  <div
                    style="width: 24px; cursor: pointer"
                    @mouseover="
                      (difficultySubmissionPassRateNumShow = true),
                        (SubmissionPassRateNumShow = false)
                    "
                    @mouseleave="
                      (difficultySubmissionPassRateNumShow = false),
                        (SubmissionPassRateNumShow = true)
                    "
                  >
                    <span style="color: #ff2d55; font-size: 12px">困难</span>
                    <div style="margin-top: 10px; font-weight: bold">
                      {{ difficultyPassNum }}
                    </div>
                    <a-divider :margin="4" />
                    <div style="font-size: 12px; color: #3c3c434d">
                      {{ difficultyNum }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import {
  QuestionControllerService,
  type QuestionQueryRequest,
  QuestionSubmitControllerService
} from '../../../generated'
import message from '@arco-design/web-vue/es/message'
import { useRoute, useRouter } from 'vue-router'
import CalendarService from '@/components/calendar/calendar-service'
import Image1 from '@/assets/image/对号.png'
import Image2 from '@/assets/image/横杠.png'
import Image3 from '@/assets/image/尝试过.png'
import Image4 from '@/assets/image/对.png'
import Image5 from '@/assets/image/白对.png'
import Image6 from '@/assets/image/通过.png'
import Image7 from '@/assets/image/随机.png'
CalendarService.initMonthDateList()

const router = useRouter()
const route = useRoute()

const basicIcon = ref(false)

const basicTagsNum = ref(6)

const doBasicIcon = () => {
  basicIcon.value = !basicIcon.value
  if (basicIcon.value) {
    basicTagsNum.value = 10
  } else {
    basicTagsNum.value = 6
  }
}

const algorithmIcon = ref(false)
const algorithmTagsNum = ref(4)
const doAlgorithmIcon = () => {
  algorithmIcon.value = !algorithmIcon.value
  if (algorithmIcon.value) {
    algorithmTagsNum.value = 11
  } else {
    algorithmTagsNum.value = 4
  }
}

const date_StructureIcon = ref(false)
const date_StructureTagsNum = ref(5)
const doDate_StructureIcon = () => {
  date_StructureIcon.value = !date_StructureIcon.value
  if (date_StructureIcon.value) {
    date_StructureTagsNum.value = 19
  } else {
    date_StructureTagsNum.value = 5
  }
}

const advanced_Date_StructureIcon = ref(false)
const advanced_Date_StructureTagsNun = ref(4)
const doAdvanced_Date_StructureIcon = () => {
  advanced_Date_StructureIcon.value = !advanced_Date_StructureIcon.value
  if (advanced_Date_StructureIcon.value) {
    advanced_Date_StructureTagsNun.value = 5
  } else {
    advanced_Date_StructureTagsNun.value = 4
  }
}

const skillIcon = ref(false)
const skillTagsNun = ref(5)
const doSkillTagsIcon = () => {
  skillIcon.value = !skillIcon.value
  if (skillIcon.value) {
    skillTagsNun.value = 9
  } else {
    skillTagsNun.value = 5
  }
}

const arithIcon = ref(false)
const arithTagsNun = ref(5)
const doArithTagsIcon = () => {
  arithIcon.value = !arithIcon.value
  if (arithIcon.value) {
    arithTagsNun.value = 9
  } else {
    arithTagsNun.value = 5
  }
}

const otherIcon = ref(false)
const otherTagsNun = ref(5)
const doOtherTagsIcon = () => {
  otherIcon.value = !otherIcon.value
  if (otherIcon.value) {
    otherTagsNun.value = 8
  } else {
    otherTagsNun.value = 5
  }
}

const isALLShow = ref(false)
// 标签按钮展开全部
const allShow = () => {
  if (!isALLShow.value) {
    otherIcon.value = true
    otherTagsNun.value = 8
    arithIcon.value = true
    arithTagsNun.value = 9
    skillIcon.value = true
    skillTagsNun.value = 9
    advanced_Date_StructureIcon.value = true
    advanced_Date_StructureTagsNun.value = 5
    date_StructureIcon.value = true
    date_StructureTagsNum.value = 19
    algorithmIcon.value = true
    algorithmTagsNum.value = 11
    basicIcon.value = true
    basicTagsNum.value = 10
  } else {
    otherIcon.value = false
    otherTagsNun.value = 5
    arithIcon.value = false
    arithTagsNun.value = 5
    skillIcon.value = false
    skillTagsNun.value = 5
    advanced_Date_StructureIcon.value = false
    advanced_Date_StructureTagsNun.value = 4
    date_StructureIcon.value = false
    date_StructureTagsNum.value = 5
    algorithmIcon.value = false
    algorithmTagsNum.value = 4
    basicIcon.value = false
    basicTagsNum.value = 6
  }
  isALLShow.value = !isALLShow.value
}

const basicTags = [
  '数组',
  '字符串',
  '排序',
  '矩阵',
  '模拟',
  '枚举',
  '字符串匹配',
  '桶排序',
  '计数排序',
  '基数排序'
]
const algorithmTags = [
  '动态规划',
  '贪心',
  '深度优先搜索',
  '二分查找',
  '广度优先搜索',
  '回溯',
  '递归',
  '分治',
  '记忆化搜索',
  '归并排序',
  '快速选择'
]

const date_StructureTags = [
  '哈希表',
  '数',
  '二叉树',
  '栈',
  '堆（优先队列）',
  '图',
  '链表',
  '单调栈',
  '有序集合',
  '二叉搜索树',
  '队列',
  '拓扑排序',
  '最短路',
  '单调队列',
  '双向链表',
  '最小生成树',
  '强连通分量',
  '欧拉回路',
  '双连通分量'
]

const advanced_Date_StructureTags = ['并查集', '字典树', '线段树', '树状数组', '后缀数组']

const skillTags = [
  '双指针',
  '位运算',
  '前缀和',
  '滑动窗口',
  '计数',
  '状态压缩',
  '哈希函数',
  '滚动哈希',
  '扫描线'
]

const arithTags = [
  '数学',
  '数论',
  '几何',
  '组合数学',
  '博弈',
  '随机化',
  '概率与统计',
  '水塘抽样',
  '拒绝采样'
]

const otherTags = ['数据库', '设计', '数据流', '脑筋急转弯', '交互', '迭代器', '多线程', 'Shell']

const current = ref<number>(parseInt(route.query.current as string) || 1)
const pageSize = ref<number>(parseInt(route.query.pageSize as string) || 50)
const sortField = ref(route.query.sortField as string)
const sortOrder = ref(route.query.sortOrder as string)

interface Question {
  status: number | undefined
  id: number
  // 其他题目属性...
}

// 题目数据
const dataList = ref<Question[]>([])
// 题目总数
const total = ref(0)

const dynamicHeight = ref(9)

// 默认查询数据参数
const defaultSearchParams = {
  pageSize: pageSize.value,
  current: current.value,
  sortField: sortField.value || undefined,
  sortOrder: sortOrder.value || undefined
}

const searchParams = ref<QuestionQueryRequest>({
  ...defaultSearchParams
})

const customPageSizeOptions = ref([20, 50, 100])

const tag = ref(0)

const statusTag = ref(0)

const displayedDifficulty = ref(false)

const displayedStatus = ref(false)

const display = ref(false)

const numberQuestion = ref(1)

const numberDifficulty = ref(1)

const numberPassRate = ref(1)

const upQuestion = ref(true)
const downQuestion = ref(true)

const upPass_rate = ref(true)
const downPass_rate = ref(true)

const upDifficulty = ref(true)
const downDifficulty = ref(true)

const doSelect = () => {
  display.value = !display.value
  if (display.value) {
    dynamicHeight.value = 36
  } else {
    dynamicHeight.value = 9
  }
}

const rotatedQuestion = ref(false)
const rotateIconQuestion = () => {
  rotatedQuestion.value = !rotatedQuestion.value
}
const rotatedDifficulty = ref(false)

// 开启困难按钮时，关闭其他按钮
const rotateIconDifficulty = () => {
  rotatedDifficulty.value = !rotatedDifficulty.value
  displayedDifficulty.value = !displayedDifficulty.value
  rotatedState.value = false
  displayedStatus.value = false
}
const rotatedState = ref(false)
// 开启状态按钮时，关闭其他按钮
const rotateIconState = () => {
  rotatedState.value = !rotatedState.value
  displayedStatus.value = !displayedStatus.value
  rotatedDifficulty.value = false
  displayedDifficulty.value = false
}
const rotatedTag = ref(false)
const rotateIconTag = () => {
  rotatedTag.value = !rotatedTag.value
}

// 开启标签按钮时关闭其他按钮
const showTag = () => {
  rotatedState.value = false
  displayedStatus.value = false
  rotatedDifficulty.value = false
  displayedDifficulty.value = false
}

// 关闭时转动标签Icon图标
const closeTags = () => {
  rotatedTag.value = false
}

const Tag = ref('')

// 简单题目数量
const briefnessNum = ref(0)
// 中等题目数量
const mediumNum = ref(0)
// 困难题目数量
const difficultyNum = ref(0)

// 简单题目通过数量
const briefnessPassNum = ref(0)
// 中等题目通过数量
const mediumPassNum = ref(0)
// 困难题目通过数量
const difficultyPassNum = ref(0)

// 整体通过率
const passRate = ref()

const throughNumber = ref(0)

const SubmissionPassRateNumShow = ref(true)
// 简单题目提交通过率
const briefnessSubmissionPassRateNum = ref(0)
// 中等题目提交通过率
const mediumSubmissionPassRateNum = ref(0)
// 困难题目提交通过率
const difficultySubmissionPassRateNum = ref(0)

// 简单题目提交通过率是否显示
const briefnessSubmissionPassRateNumShow = ref(false)
// 中等题目提交通过率是否显示
const mediumSubmissionPassRateNumShow = ref(false)
// 困难题目提交通过率是否显示
const difficultySubmissionPassRateNumShow = ref(false)

// 题目提交通过率
const questionSubmitPassRateNum = ref(0)

// 题目总数
const questionNumber = ref(0)

// 题目提交通过率是否显示
const questionSubmitPassRateNumShow = ref(false)

// 获取题目数据
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(searchParams.value)
  if (res.code === 0) {
    dataList.value = res.data.records
    total.value = res.data.total
  } else {
    message.error('题目页面加载失败：' + res.message)
  }

  // 获取题目状态
  // await StatusData(dataList.value);

  await statusMessages()

  // 获取不同难度的题目数量
  const difficultyRes = await QuestionControllerService.getQuestionDifficultyUsingGet()
  if (difficultyRes.code == 0 && difficultyRes.data) {
    briefnessNum.value = difficultyRes.data.simpleQuestionNum as number
    mediumNum.value = difficultyRes.data.mediumQuestionNum as number
    difficultyNum.value = difficultyRes.data.difficultQuestionNum as number
  }

  const briefnessPassRes =
    await QuestionSubmitControllerService.getQuestionSubmitDifficultyUsingGet(1)
  if (briefnessPassRes.code == 0) {
    briefnessPassNum.value = briefnessPassRes.data as number
  }
  const mediumPassRes = await QuestionSubmitControllerService.getQuestionSubmitDifficultyUsingGet(2)
  if (mediumPassRes.code == 0) {
    mediumPassNum.value = mediumPassRes.data as number
  }
  const difficultyPassRes =
    await QuestionSubmitControllerService.getQuestionSubmitDifficultyUsingGet(3)
  if (difficultyPassRes.code == 0) {
    difficultyPassNum.value = difficultyPassRes.data as number
  }
  const briefnessSubmissionPassRateRes =
    await QuestionSubmitControllerService.getQuestionSubmitDifficultyPassRateUsingGet(1)
  if (briefnessSubmissionPassRateRes.code == 0) {
    briefnessSubmissionPassRateNum.value = briefnessSubmissionPassRateRes.data as number
  }
  const mediumSubmissionPassRateRes =
    await QuestionSubmitControllerService.getQuestionSubmitDifficultyPassRateUsingGet(2)
  if (mediumSubmissionPassRateRes.code == 0) {
    mediumSubmissionPassRateNum.value = mediumSubmissionPassRateRes.data as number
  }
  const difficultySubmissionPassRateRes =
    await QuestionSubmitControllerService.getQuestionSubmitDifficultyPassRateUsingGet(3)
  if (difficultySubmissionPassRateRes.code == 0) {
    difficultySubmissionPassRateNum.value = difficultySubmissionPassRateRes.data as number
  }
  const questionSubmitPassRateRes =
    await QuestionSubmitControllerService.getQuestionSubmitPassRateUsingGet()
  if (questionSubmitPassRateRes.code == 0) {
    questionSubmitPassRateNum.value = questionSubmitPassRateRes.data as number
  }
  const throughSum = computed(() => {
    return (
      Number(briefnessPassNum.value) + Number(mediumPassNum.value) + Number(difficultyPassNum.value)
    )
  })
  throughNumber.value = throughSum.value

  const Sum = computed(() => {
    return Number(briefnessNum.value) + Number(mediumNum.value) + Number(difficultyNum.value)
  })
  questionNumber.value = Sum.value

  const passRateNum = computed(() => {
    const result = throughNumber.value / questionNumber.value
    return result.toFixed(2) // 保留两位小数
  })
  passRate.value = passRateNum.value
}

// 获取当前用户通过的题目id 和 未通过题目id
const questionPassIds = ref([])
const questionNotPassIds = ref([])
const statusMessages = async () => {
  const res = await QuestionSubmitControllerService.getQuestionSubmitStatusByUserUsingGet()
  if (res.code == 0) {
    questionPassIds.value = res.data?.questionPassIds as any
    questionNotPassIds.value = res.data?.questionNotPassIds as any
  }
}

/**
 * 监听 searchParams 变量，改变是触发页面的更新加载
 */
watchEffect(() => {
  searchParams.value = {
    ...searchParams.value,
    searchText: route.query.search
  } as never
  loadData()
})

/**
 * 页面加载时，请求数据
 */
// onMounted(() => {
//   loadData();
// });

// 改变页码
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
  current.value = page
  router.push({
    query: searchParams.value as any
  })
  window.scrollTo({
    top: 10,
    behavior: 'smooth'
  })
}

// 改变页数
const onPageSizeChange = (size: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: size
  }
  pageSize.value = size
  router.push({
    query: searchParams.value as any
  })
}

// 改变难度
const doDifficulty = (number: number) => {
  if (tag.value != number) {
    searchParams.value = {
      ...searchParams.value,
      difficulty: number
    }
    tag.value = number
    rotatedDifficulty.value = !rotatedDifficulty.value
    displayedDifficulty.value = !displayedDifficulty.value
  } else {
    searchParams.value = {
      ...searchParams.value,
      difficulty: undefined
    }
    tag.value = 0
    rotatedDifficulty.value = !rotatedDifficulty.value
    displayedDifficulty.value = !displayedDifficulty.value
  }
}

// 改变状态
const doStatus = (number: number) => {
  if (statusTag.value != number) {
    if (number === 1) {
      searchParams.value = {
        ...searchParams.value,
        notContainIds: questionPassIds.value.concat(questionNotPassIds.value)
      }
    }
    if (number === 2) {
      searchParams.value = {
        ...searchParams.value,
        containIds: questionPassIds as any
      }
    }
    if (number === 3) {
      searchParams.value = {
        ...searchParams.value,
        containIds: questionNotPassIds as any
      }
    }
    statusTag.value = number
    rotatedState.value = !rotatedState.value
    displayedStatus.value = !displayedStatus.value
  } else {
    statusTag.value = 0
    searchParams.value = {
      ...searchParams.value,
      containIds: undefined,
      notContainIds: undefined
    }
    rotatedState.value = !rotatedState.value
    displayedStatus.value = !displayedStatus.value
  }
}

// 关闭难度标签
const closeDifficulty = () => {
  searchParams.value = {
    ...searchParams.value,
    difficulty: undefined
  }
  tag.value = 0
}

// 关闭状态标签
const closeStatus = () => {
  statusTag.value = 0
  searchParams.value = {
    ...searchParams.value,
    containIds: undefined,
    notContainIds: undefined
  }
}
// 关闭标签
const closeTag = (tag: string) => {
  searchParams.value = {
    ...searchParams.value
  }
  if (searchParams.value) {
    if (!searchParams.value.tags) {
      searchParams.value.tags = []
    }
    showTags.value = showTags.value.filter((t) => t !== tag)
    searchParams.value.tags = searchParams.value.tags.filter((t) => t !== tag)
  }
}

// 将搜索框上的内容同步到url上
const searchText = ref(route.query.search)
const formattedSearchText: string = typeof searchText.value === 'string' ? searchText.value : ''

// 查询
const onSearch = (value: string) => {
  if (value) {
    router.push({
      query: {
        ...(searchParams.value as any),
        search: value
      }
    })
  } else {
    router.push({
      query: {
        pageSize: searchParams.value.pageSize,
        current: searchParams.value.current
      }
    })
  }
}

// 随机一题
const doRandom = async () => {
  const totalQuestions = dataList.value.length // 获取当前题目总数

  if (totalQuestions === 0) {
    return // 题目列表为空，直接返回
  }

  const randomIndex = Math.floor(Math.random() * totalQuestions) // 生成随机题目索引

  if (randomIndex >= totalQuestions) {
    return // 随机索引超出范围，直接返回
  }

  const randomQuestionId = dataList.value[randomIndex].id // 获取随机题目的 ID

  // 这里可以根据获取到的随机题目 ID 执行相关操作，比如跳转到对应题目页面等
  await router.push({
    path: `/do/question/${randomQuestionId}/description`
  })
}

// 获取状态 (旧)
// const getStatus = async (id: number) => {
//   const res =
//     await QuestionSubmitControllerService.getQuestionSubmitStatusUsingGet(id);
//   if (res.code === 0) {
//     const index = dataList.value.findIndex((item) => item.id === id);
//     if (index !== -1) {
//       const status = ref(res.data);
//       dataList.value[index].status = status.value;
//     }
//   }
// };

// 获取状态信息 并行执行和结果缓存
// const StatusCache: {
//   [key: string]: {
//     status: number;
//   };
// } = {};
// const StatusData = async (dataList: any[]) => {
//   const ids = dataList.map((item) => item.id);
//
//   // 并行执行所有请求
//   const requests = ids.map((id) =>
//     QuestionSubmitControllerService.getQuestionSubmitStatusUsingGet(id)
//   );
//   const responses = await Promise.all(requests);
//
//   for (let i = 0; i < dataList.length; i++) {
//     const item = dataList[i];
//     const res = responses[i];
//
//     if (res.code === 0 && res.data) {
//       const status = res.data;
//       item.status = status;
//
//       // 将结果缓存起来
//       StatusCache[item.questionId] = { status };
//     } else {
//       console.error(`获取 id 为 ${item.id} 的用户信息失败`);
//     }
//   }
// };

// 题目排序
const doQuestionSorting = (number: number) => {
  if (number === 1) {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: 'descend',
      sortField: 'id'
    }
    upQuestion.value = !upQuestion.value
    numberQuestion.value = 2
    upDifficulty.value = true
    downDifficulty.value = true
    numberDifficulty.value = 1
    upPass_rate.value = true
    downPass_rate.value = true
    numberPassRate.value = 1
  } else if (number === 2) {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: 'ascend',
      sortField: 'id'
    }
    upQuestion.value = !upQuestion.value
    downQuestion.value = !downQuestion.value
    numberQuestion.value = 3
    upDifficulty.value = true
    downDifficulty.value = true
    numberDifficulty.value = 1
    upPass_rate.value = true
    downPass_rate.value = true
    numberPassRate.value = 1
  } else if (number === 3) {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: undefined,
      sortField: undefined
    }
    downQuestion.value = !downQuestion.value
    numberQuestion.value = 1
    upDifficulty.value = true
    downDifficulty.value = true
    numberDifficulty.value = 1
    upPass_rate.value = true
    downPass_rate.value = true
    numberPassRate.value = 1
  }
}

// 通过率排序
const sortByPassRate = (number: number) => {
  if (number === 1) {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: 'descend',
      sortField: 'passRate'
    }
    upPass_rate.value = !upPass_rate.value
    numberPassRate.value = 2
    upQuestion.value = true
    downQuestion.value = true
    numberQuestion.value = 1
    upDifficulty.value = true
    downDifficulty.value = true
    numberDifficulty.value = 1
  } else if (number === 2) {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: 'ascend',
      sortField: 'passRate'
    }
    upPass_rate.value = !upPass_rate.value
    downPass_rate.value = !downPass_rate.value
    numberPassRate.value = 3
    upQuestion.value = true
    downQuestion.value = true
    numberQuestion.value = 1
    upDifficulty.value = true
    downDifficulty.value = true
    numberDifficulty.value = 1
  } else if (number === 3) {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: undefined,
      sortField: undefined
    }
    downPass_rate.value = !downPass_rate.value
    numberPassRate.value = 1
    upQuestion.value = true
    downQuestion.value = true
    numberQuestion.value = 1
    upDifficulty.value = true
    downDifficulty.value = true
    numberDifficulty.value = 1
  }
}

// 难度排序
const doDifficultySorting = (number: number) => {
  if (number === 1) {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: 'descend',
      sortField: 'difficulty'
    }
    upDifficulty.value = !upDifficulty.value
    numberDifficulty.value = 2
    upQuestion.value = true
    downQuestion.value = true
    numberQuestion.value = 1
    upPass_rate.value = true
    downPass_rate.value = true
    numberPassRate.value = 1
  } else if (number === 2) {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: 'ascend',
      sortField: 'difficulty'
    }
    upDifficulty.value = !upDifficulty.value
    downDifficulty.value = !downDifficulty.value
    numberDifficulty.value = 3
    upQuestion.value = true
    downQuestion.value = true
    numberQuestion.value = 1
    upPass_rate.value = true
    downPass_rate.value = true
    numberPassRate.value = 1
  } else if (number === 3) {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: undefined,
      sortField: undefined
    }
    downDifficulty.value = !downDifficulty.value
    numberDifficulty.value = 1
    upQuestion.value = true
    downQuestion.value = true
    numberQuestion.value = 1
    upPass_rate.value = true
    downPass_rate.value = true
    numberPassRate.value = 1
  }
}

// 根据标签搜索
const showTags = ref<string[]>([])

const doTagCheck = (tag: string) => {
  searchParams.value = {
    ...searchParams.value
  }
  if (!showTags.value.includes(tag)) {
    if (searchParams.value) {
      if (!searchParams.value.tags) {
        searchParams.value.tags = []
      }

      showTags.value.push(tag)
      searchParams.value.tags.push(tag)
    }
  } else {
    if (searchParams.value) {
      if (!searchParams.value.tags) {
        searchParams.value.tags = []
      }
      showTags.value = showTags.value.filter((t) => t !== tag)
      searchParams.value.tags = searchParams.value.tags.filter((t) => t !== tag)
    }
  }
}

// 删除所有的标签搜索
const resettingTags = () => {
  searchParams.value = {
    ...searchParams.value
  }
  showTags.value = []
  searchParams.value.tags = []
}

// 删除所有搜索条件
const resettingAll = () => {
  searchParams.value = {
    ...searchParams.value,
    difficulty: undefined
  }
  showTags.value = []
  searchParams.value.tags = []
  statusTag.value = 0
  tag.value = 0
}

// 查询标签链表
const selectTagsList = ref<string[]>([])
const selectTags = (value: string) => {
  if (value) {
    console.log('tag数据:', value)
    const searchTerm = value
    const filteredBasicTags = basicTags.filter((basicTag) => basicTag.includes(searchTerm))
    const filteredAlgorithmTags = algorithmTags.filter((algorithmTag) =>
      algorithmTag.includes(searchTerm)
    )
    const filteredDate_StructureTags = date_StructureTags.filter((date_StructureTag) =>
      date_StructureTag.includes(searchTerm)
    )
    const filteredAdvanced_Date_StructureTags = advanced_Date_StructureTags.filter(
      (advanced_Date_StructureTag) => advanced_Date_StructureTag.includes(searchTerm)
    )
    const filteredSkillTags = skillTags.filter((skillTag) => skillTag.includes(searchTerm))
    const filteredArithTags = arithTags.filter((arithTag) => arithTag.includes(searchTerm))
    const filteredOtherTags = otherTags.filter((otherTag) => otherTag.includes(searchTerm))

    // 将筛选出的标签数据放入 selectTagsList 数组中
    selectTagsList.value = [
      ...filteredBasicTags,
      ...filteredAlgorithmTags,
      ...filteredDate_StructureTags,
      ...filteredAdvanced_Date_StructureTags,
      ...filteredSkillTags,
      ...filteredArithTags,
      ...filteredOtherTags
    ]
  } else {
    selectTagsList.value = []
  }
}

// 标签搜索清楚按钮
const closeTagsList = () => {
  selectTagsList.value = []
}
</script>

<style scoped>
#questionsView {
  margin: 90px 10px 20px 100px;
}

.right {
  margin-left: 10px;
}

.calendar {
  display: flex;
  flex-direction: column;
  width: 260px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.125);
  margin-left: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 5px;
}

.demo-basic {
  margin-top: 4px;
  width: 120px;
  background-color: var(--color-bg-popup);
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.transparent-btn {
  width: 124px;
  height: 32px;
  background-color: transparent;
  border: none; /* 移除边框 */
  border-radius: 5px; /* 添加圆角 */
  transition: background-color 0.3s;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: space-between; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
}

.transparent-btn:hover {
  background-color: #f7f7f8; /* 在悬停时更改背景颜色为 #f0f0f0 */
}

.transparent-but {
  width: 124px;
  height: 32px;
  background-color: transparent;
  border: none; /* 移除边框 */
  border-radius: 5px; /* 添加圆角 */
  transition: background-color 0.3s;
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
  color: #262626bf;
}

.transparent-but:hover {
  background-color: #f7f7f8; /* 在悬停时更改背景颜色为 #f0f0f0 */
  color: #4e2626;
}

.transparent-butt {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: none;
  border-radius: 3px;
}

.transparent-butt:hover {
  background-color: #dedfe2;
}

.transparent-butto {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: none;
  border-radius: 3px;
  background-color: #007aff;
}

.small-image {
  width: 18px; /* 设置图像的宽度 */
  height: auto; /* 保持高度自适应 */
}

.custom-but {
  height: 43px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none; /* 移除边框 */
  background-color: transparent; /* 设置背景为透明 */
  color: #8a8a8e;
  cursor: pointer; /* 设置鼠标指针样式为手型 */
}

.custom-but:hover {
  color: #595959;
}

.adopt-basic {
  padding: 5px;
  width: 45px;
  height: 15px;
  background-color: var(--color-bg-popup);
  border-radius: 15px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  color: #2b2b2d;
  cursor: pointer;
}

.Attempted-basic {
  padding: 5px;
  width: 50px;
  height: 15px;
  background-color: var(--color-bg-popup);
  border-radius: 15px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  text-align: center;
  color: #2b2b2d;
  cursor: pointer;
}

.icon-down {
  transition: transform 0.2s ease;
}

.rotate-clockwise {
  animation: rotateClockwise 0.2s linear forwards;
}

.rotate-counterclockwise {
  animation: rotateCounterclockwise 0.2s linear forwards;
}

@keyframes rotateClockwise {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(180deg);
  }
}

@keyframes rotateCounterclockwise {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(0);
  }
}

.outer-div {
  overflow: auto;
}

.outer-div::-webkit-scrollbar {
  width: 0.5em;
  background-color: transparent;
}

.outer-div::-webkit-scrollbar-thumb {
  background-color: transparent;
}

.progress-container {
  position: relative;
}

.progress-container a-progress,
.progress-container .progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.progress-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hover-effect {
  margin-top: 6px;
  color: #262626;
  display: inline-block;
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hover-effect:hover {
  color: #3370ff;
  cursor: pointer;
}
</style>
