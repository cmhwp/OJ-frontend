<template>
  <div id="questionSubmitView">
    <a-trigger
      v-if="selectedKeys.length != 0"
      :trigger="['click', 'hover']"
      clickToClose
      position="top"
      v-model:popupVisible="popupVisible2"
    >
      <div
        style="background-color: #165dff"
        :class="`button-trigger ${popupVisible2 ? 'button-trigger-active' : ''}`"
      >
        <IconClose v-if="popupVisible2" />
        <icon-up v-else />
      </div>
      <template #content>
        <a-menu
          :style="{ marginBottom: '-4px' }"
          mode="popButton"
          :tooltipProps="{ position: 'left' }"
          showCollapseButton
        >
          <a-menu-item key="1" @click="handleUpdate">
            <template #icon>
              <icon-save />
            </template>
            保存所选行
          </a-menu-item>
          <a-menu-item key="2" @click="handleDelete">
            <template #icon>
              <icon-delete />
            </template>
            删除所选行
          </a-menu-item>
        </a-menu>
      </template>
    </a-trigger>
    <div style="height: 50px">
      <a-space :size="20">
        <a-trigger position="bl" :popup-visible="displayedLanguage">
          <a-button
            style="
              width: 120px;
              height: 32px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-radius: 5px;
              box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            "
            @click="rotateIconLanguage"
            >编程语言
            <icon-down
              :size="16"
              :class="{
                'rotate-clockwise': rotatedLanguage,
                'rotate-counterclockwise': !rotatedLanguage
              }"
            />
          </a-button>
          <template #content>
            <div class="demo-basic">
              <button class="transparent-btn" @click="doLanguage('java')">
                <span style="color: #14c9c9">Java</span>
                <img v-if="Language === 'java'" :src="Image4" alt="" class="small-image" />
              </button>
              <button class="transparent-btn" @click="doLanguage('cpp')">
                <span style="color: #9fdb1d">C ++</span>
                <img v-if="Language === 'cpp'" :src="Image4" alt="" class="small-image" />
              </button>
              <button class="transparent-btn" @click="doLanguage('Python')">
                <span style="color: #f7ba1e">Python</span>
                <img v-if="Language === 'Python'" :src="Image4" alt="" class="small-image" />
              </button>
            </div>
          </template>
        </a-trigger>
        <a-trigger position="bl" :popup-visible="displayedSubmit_State">
          <a-button
            style="
              width: 120px;
              height: 32px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-radius: 5px;
              box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            "
            @click="rotateIconSubmit_State"
            >提交状态
            <icon-down
              :size="16"
              :class="{
                'rotate-clockwise': rotatedSubmit_State,
                'rotate-counterclockwise': !rotatedSubmit_State
              }"
            />
          </a-button>
          <template #content>
            <div class="demo-basic">
              <button class="transparent-btn" @click="doSubmit_State('Accepted')">
                <span style="color: #00af9b">执行通过</span>
                <img v-if="Submit_State === 'Accepted'" :src="Image4" alt="" class="small-image" />
              </button>
              <button class="transparent-btn" @click="doSubmit_State('Wrong Answer')">
                <span style="color: #ff2d55">错误解答</span>
                <img
                  v-if="Submit_State === 'Wrong Answer'"
                  :src="Image4"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn" @click="doSubmit_State('Memory Limit Exceeded')">
                <span style="color: #ff2d55">超出内存限制</span>
                <img
                  v-if="Submit_State === 'Memory Limit Exceeded'"
                  :src="Image4"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn" @click="doSubmit_State('Time Limit Exceeded')">
                <span style="color: #ff2d55">超出时间限制</span>
                <img
                  v-if="Submit_State === 'Time Limit Exceeded'"
                  :src="Image4"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn" @click="doSubmit_State('Output Limit Exceeded')">
                <span style="color: #ff2d55">超出输出限制</span>
                <img
                  v-if="Submit_State === 'Output Limit Exceeded'"
                  :src="Image4"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn" @click="doSubmit_State('Compile Error')">
                <span style="color: #ff2d55">编译错误</span>
                <img
                  v-if="Submit_State === 'Compile Error'"
                  :src="Image4"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn" @click="doSubmit_State('Execution Error')">
                <span style="color: #ff2d55">执行错误</span>
                <img
                  v-if="Submit_State === 'Execution Error'"
                  :src="Image4"
                  alt=""
                  class="small-image"
                />
              </button>
              <button class="transparent-btn" @click="doSubmit_State('Runtime Error')">
                <span style="color: #ff2d55">内部错误</span>
                <img
                  v-if="Submit_State === 'Runtime Error'"
                  :src="Image4"
                  alt=""
                  class="small-image"
                />
              </button>
            </div>
          </template>
        </a-trigger>
        <a-trigger position="bl" :popup-visible="displayedRespond_State">
          <a-button
            style="
              width: 120px;
              height: 32px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-radius: 5px;
              box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            "
            @click="rotateIconRespond_State"
            >判题状态
            <icon-down
              :size="16"
              :class="{
                'rotate-clockwise': rotatedRespond_State,
                'rotate-counterclockwise': !rotatedRespond_State
              }"
            />
          </a-button>
          <template #content>
            <div class="demo-basic">
              <button class="transparent-btn" @click="doRespond_State(2)">
                <span style="color: #00af9b">成功</span>
                <img v-if="Respond_State === 2" :src="Image4" alt="" class="small-image" />
              </button>
              <button class="transparent-btn" @click="doRespond_State(1)">
                <span style="color: #ffb800">判题中</span>
                <img v-if="Respond_State === 1" :src="Image4" alt="" class="small-image" />
              </button>
              <button class="transparent-btn" @click="doRespond_State(3)">
                <span style="color: #ff2d55">失败</span>
                <img v-if="Respond_State === 3" :src="Image4" alt="" class="small-image" />
              </button>
            </div>
          </template>
        </a-trigger>
        <a-input
          allow-clear
          :default-value="formattedSearchText"
          style="border-radius: 5px; box-shadow: 0 0 4px rgba(0, 0, 0, 0.2)"
          :style="{ width: '300px' }"
          placeholder="请输入ID、提交题目ID或用户ID！"
          @input="onSearch"
          @clear="onClear"
        >
          <template #prefix>
            <icon-search />
          </template>
        </a-input>
      </a-space>
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: -10px;
        height: 30px;
        margin-bottom: 15px;
      "
    >
      <div>
        <a-tag
          closable
          v-if="Language === 'java'"
          style="
            color: #14c9c9;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeLanguage"
          >Java
        </a-tag>
        <a-tag
          closable
          v-if="Language === 'cpp'"
          style="
            color: #9fdb1d;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeLanguage"
          >C ++
        </a-tag>
        <a-tag
          closable
          v-if="Language === 'Python'"
          style="
            color: #f7ba1e;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeLanguage"
          >Python
        </a-tag>
        <a-tag
          closable
          v-if="Submit_State === 'Accepted'"
          style="
            color: #00af9b;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeSubmit_State"
          >执行通过
        </a-tag>
        <a-tag
          closable
          v-if="Submit_State === 'Wrong Answer'"
          style="
            color: #ff2d55;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeSubmit_State"
          >错误解答
        </a-tag>
        <a-tag
          closable
          v-if="Submit_State === 'Memory Limit Exceeded'"
          style="
            color: #ff2d55;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeSubmit_State"
          >超出内存限制
        </a-tag>
        <a-tag
          closable
          v-if="Submit_State === 'Time Limit Exceeded'"
          style="
            color: #ff2d55;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeSubmit_State"
          >超出时间限制
        </a-tag>
        <a-tag
          closable
          v-if="Submit_State === 'Output Limit Exceeded'"
          style="
            color: #ff2d55;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeSubmit_State"
          >超出输出限制
        </a-tag>
        <a-tag
          closable
          v-if="Submit_State === 'Compile Error'"
          style="
            color: #ff2d55;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeSubmit_State"
          >编译错误
        </a-tag>
        <a-tag
          closable
          v-if="Submit_State === 'Execution Error'"
          style="
            color: #ff2d55;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeSubmit_State"
          >执行错误
        </a-tag>
        <a-tag
          closable
          v-if="Submit_State === 'Runtime Error'"
          style="
            color: #ff2d55;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeSubmit_State"
          >内部错误
        </a-tag>
        <a-tag
          closable
          v-if="Respond_State === 2"
          style="
            color: #00af9b;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeRespond_State"
          >成功
        </a-tag>
        <a-tag
          closable
          v-if="Respond_State === 1"
          style="
            color: #ffb800;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeRespond_State"
          >判题中
        </a-tag>
        <a-tag
          closable
          v-if="Respond_State === 3"
          style="
            color: #ff2d55;
            margin-top: 5px;
            margin-left: 8px;
            border-radius: 15px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          "
          @close="closeRespond_State"
          >失败
        </a-tag>
      </div>
      <a-tag
        v-if="Language != null || Submit_State != null || Respond_State != 0"
        style="border-radius: 15px; box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); cursor: pointer"
        @click="resettingAll"
      >
        <span style="color: #3c3c4399"
          ><icon-loop :size="16" style="margin-right: 2px" />重置</span
        ></a-tag
      >
    </div>
    <div style="box-shadow: 0 0 4px rgba(0, 0, 0, 0.2)">
      <a-table
        :columns="columns as any"
        :data="dataList"
        :pagination="false"
        :bordered="false"
        :hoverable="true"
        @sorter-change="handleSortChange"
        :row-selection="rowSelection as any"
        row-key="id"
        v-model:selectedKeys="selectedKeys"
      >
        <template #message="{ record }">
          <a-trigger :popup-translate="[90, -160]" auto-fit-position :unmount-on-close="false">
            <div style="width: 100px">
              <a-space wrap style="margin-top: 10px; cursor: pointer">
                <span
                  v-if="record.judgeInfo.message === 'Accepted'"
                  style="font-size: 14px; color: #2db55d"
                  >通过</span
                >
                <span
                  v-if="record.judgeInfo.message === 'Wrong Answer'"
                  style="font-size: 14px; color: #ef4743"
                  >错误解答</span
                >

                <span
                  v-if="record.judgeInfo.message === 'Memory Limit Exceeded'"
                  style="font-size: 14px; color: #ef4743"
                  >超出内存限制</span
                >
                <span
                  v-if="record.judgeInfo.message === 'Time Limit Exceeded'"
                  style="font-size: 14px; color: #ef4743"
                  >超出时间限制</span
                ><span
                  v-if="record.judgeInfo.message === 'Output Limit Exceeded'"
                  style="font-size: 14px; color: #ef4743"
                  >超出输出限制</span
                >
                <span
                  v-if="record.judgeInfo.message === 'Compile Error'"
                  style="font-size: 14px; color: #ef4743"
                  >编译错误</span
                >
                <span
                  v-if="record.judgeInfo.message === 'Execution Error'"
                  style="font-size: 14px; color: #ef4743"
                  >执行错误</span
                >
                <span
                  v-if="record.judgeInfo.message === 'Runtime Error'"
                  style="font-size: 14px; color: #ef4743"
                  >内部错误</span
                ></a-space
              >
            </div>
            <template #content>
              <div class="status-basic">
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.judgeInfo.message = 'Accepted'
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #00af9b">执行通过</span>
                  <img
                    v-if="record.judgeInfo.message === 'Accepted'"
                    :src="Image4"
                    alt=""
                    class="small-image"
                  />
                </button>
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.judgeInfo.message = 'Wrong Answer'
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #ff2d55">错误解答</span>
                  <img
                    v-if="record.judgeInfo.message === 'Wrong Answer'"
                    :src="Image4"
                    alt=""
                    class="small-image"
                  />
                </button>

                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.judgeInfo.message = 'Memory Limit Exceeded'
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #ff2d55">超出内存限制</span>
                  <img
                    v-if="record.judgeInfo.message === 'Memory Limit Exceeded'"
                    :src="Image4"
                    alt=""
                    class="small-image"
                  />
                </button>
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.judgeInfo.message = 'Time Limit Exceeded'
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #ff2d55">超出时间限制</span>
                  <img
                    v-if="record.judgeInfo.message === 'Time Limit Exceeded'"
                    :src="Image4"
                    alt=""
                    class="small-image"
                  />
                </button>
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.judgeInfo.message = 'Output Limit Exceeded'
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #ff2d55">超出输出限制</span>
                  <img
                    v-if="record.judgeInfo.message === 'Output Limit Exceeded'"
                    :src="Image4"
                    alt=""
                    class="small-image"
                  />
                </button>
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.judgeInfo.message = 'Compile Error'
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #ff2d55">编译错误</span>
                  <img
                    v-if="record.judgeInfo.message === 'Compile Error'"
                    :src="Image4"
                    alt=""
                    class="small-image"
                  />
                </button>
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.judgeInfo.message = 'Execution Error'
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #ff2d55">执行错误</span>
                  <img
                    v-if="record.judgeInfo.message === 'Execution Error'"
                    :src="Image4"
                    alt=""
                    class="small-image"
                  />
                </button>
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.judgeInfo.message = 'Runtime Error'
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #ff2d55">内部错误</span>
                  <img
                    v-if="record.judgeInfo.message === 'Runtime Error'"
                    :src="Image4"
                    alt=""
                    class="small-image"
                  />
                </button>
              </div>
            </template>
          </a-trigger>
        </template>
        <template #time="{ record }">
          <a-tag style="border: 1px solid #ccc; border-radius: 10px; width: 80px">
            <template #icon>
              <icon-execute-time size="16" style="margin-top: 6px" />
            </template>
            {{ record.judgeInfo.time }}
            <span>ms</span>
          </a-tag>
        </template>
        <template #memory="{ record }">
          <a-tag style="border: 1px solid #ccc; border-radius: 10px; width: 80px">
            <template #icon>
              <icon-cpu size="16" style="margin-top: 6px" />
            </template>
            {{ record.judgeInfo.memory }}
            <span>MB</span>
          </a-tag>
        </template>
        <template #createTime="{ record }">
          {{ moment(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #updateTime="{ record }">
          {{ moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #code="{ record }">
          <a-trigger position="right">
            <div style="margin-top: 10px">
              <icon-content size="20" style="cursor: pointer" />
            </div>
            <template #content>
              <div class="content-basic">
                <monaco-editor
                  :value="record.code"
                  style="width: 750px; height: 400px; overflow: auto"
                />
              </div>
            </template>
          </a-trigger>
        </template>
        <template #error_message="{ record }">
          <a-trigger position="right">
            <div v-if="record.error_message != null" style="margin-top: 10px">
              <icon-content size="20" style="cursor: pointer" />
            </div>
            <template #content>
              <div class="content-basic">
                <pre style="height: 100%; color: #ef4743; line-height: 21px">{{
                  record.error_message
                }}</pre>
              </div>
            </template>
          </a-trigger>
        </template>
        <template #outPut="{ record }">
          <a-trigger position="right">
            <div v-if="record.outPut != '[]'" style="margin-top: 10px">
              <icon-content size="20" style="cursor: pointer" />
            </div>
            <template #content>
              <div class="content-basic" style="display: flex">
                <div
                  style="
                    margin-right: 10px;
                    border: 1px solid #e5e6eb;
                    padding: 0 15px;
                    border-radius: 5px;
                  "
                >
                  <p
                    v-for="(item, index) of record.judgeCase ? JSON.parse(record.judgeCase) : []"
                    :key="index"
                  >
                    预计输出{{ index }}：{{ item.output }}
                  </p>
                </div>
                <div style="border: 1px solid #e5e6eb; padding: 0 15px; border-radius: 5px">
                  <p
                    style="white-space: pre-line"
                    v-for="(item, index) of record.outPut ? JSON.parse(record.outPut) : []"
                    :key="index"
                  >
                    实际输出{{ index }}：{{ item }}
                  </p>
                </div>
              </div>
            </template>
          </a-trigger>
        </template>
        <template #userId="{ record }">
          <a-tooltip
            background-color="#FFFFFF"
            position="left"
            :content-style="{
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
              borderRadius: '10px'
            }"
          >
            <template #content
              ><span style="color: black; font-size: 13px"
                >用户ID: {{ record.userVO.id }}</span
              ></template
            >
            <div style="cursor: pointer; display: flex; align-items: center">
              <a-avatar :size="24" :image-url="record.userVO?.userAvatar"
                ><img
                  class="round-avatar"
                  alt="avatar"
                  src="https://himg.bdimg.com/sys/portraitn/item/03cde88aa5e69cabe59682e58fa3e59abce7b396df8f"
              /></a-avatar>
              <span v-if="record.userVO?.userName" style="margin-left: 5px">{{
                record.userVO?.userName
              }}</span>
              <span v-else style="margin-left: 5px"> 未命名用户 </span>
            </div>
          </a-tooltip>
        </template>
        <template #questionId="{ record }">
          <a-tooltip
            background-color="#FFFFFF"
            position="right"
            :content-style="{
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.4)',
              borderRadius: '10px'
            }"
          >
            <template #content
              ><span style="color: black; font-size: 13px">ID: {{ record.id }}</span
              ><br />
              <span style="color: black; font-size: 13px"
                >用户提交题目ID: {{ record.questionId }}</span
              ></template
            >
            <span>{{ record.questionVO.title }}</span>
          </a-tooltip>
        </template>
        <template #status="{ record }">
          <a-trigger :popup-translate="[100, -80]" auto-fit-position :unmount-on-close="false">
            <a-space wrap style="margin-top: 10px; cursor: pointer">
              <span v-if="record.status === 2" style="color: #00af9b"> 成功 </span>
              <span v-else-if="record.status === 1" style="color: #ffb800"> 判题中 </span>
              <span v-else-if="record.status === 3" style="color: #ff2d55"> 失败 </span>
            </a-space>
            <template #content>
              <div class="status-basic">
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.status = 1
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #ffb800">判题中</span>
                  <img v-if="record.status === 1" :src="Image4" alt="" class="small-image" />
                </button>
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.status = 2
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #00af9b">成功</span>
                  <img v-if="record.status === 2" :src="Image4" alt="" class="small-image" />
                </button>
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.status = 3
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #ff2d55">失败</span>
                  <img v-if="record.status === 3" :src="Image4" alt="" class="small-image" />
                </button>
              </div>
            </template>
          </a-trigger>
        </template>
        <template #language="{ record }">
          <a-trigger :popup-translate="[100, -80]" auto-fit-position :unmount-on-close="false">
            <a-space wrap style="margin-top: 10px; cursor: pointer">
              <span v-if="record.language === 'java'" style="font-weight: bold; color: #14c9c9"
                >Java
              </span>
              <span v-else-if="record.language === 'cpp'" style="font-weight: bold; color: #9fdb1d">
                C ++
              </span>
              <span
                v-else-if="record.language === 'Python'"
                style="font-weight: bold; color: #f7ba1e"
              >
                Python
              </span>
            </a-space>
            <template #content>
              <div class="status-basic">
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.language = 'java'
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #14c9c9; font-weight: bold">Java</span>
                  <img v-if="record.language === 'java'" :src="Image4" alt="" class="small-image" />
                </button>
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.language = 'cpp'
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #9fdb1d; font-weight: bold">C ++</span>
                  <img v-if="record.language === 'cpp'" :src="Image4" alt="" class="small-image" />
                </button>
                <button
                  class="transparent-btn"
                  @click="
                    () => {
                      record.language = 'Python'
                      addSelectedKeys(record.id)
                    }
                  "
                >
                  <span style="color: #f7ba1e; font-weight: bold">Python</span>
                  <img
                    v-if="record.language === 'Python'"
                    :src="Image4"
                    alt=""
                    class="small-image"
                  />
                </button>
              </div>
            </template>
          </a-trigger>
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button
              style="border-radius: 20px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2)"
              type="outline"
              status="success"
              @click="doUpdate(record)"
            >
              保存
            </a-button>
            <a-popconfirm content="确定要删除此条数据！" @ok="doDelete(record)" position="top">
              <a-button
                style="border-radius: 20px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2)"
                type="outline"
                status="warning"
              >
                删除
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </div>
    <div style="display: flex; justify-content: flex-end; margin-top: 25px">
      <a-pagination
        :total="total"
        show-total
        show-jumper
        show-page-size
        @change="onPageChange"
        @pageSizeChange="onPageSizeChange"
        :pageSizeOptions="customPageSizeOptions"
        :current="current"
        :page-size="pageSize"
        :page-item-style="{ borderRadius: '5px', backgroundColor: '#F2F3F4' }"
        :active-page-item-style="{
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#FFFFFF',
          color: '#1a1a1a',
          borderRadius: '5px'
        }"
      >
        <template #page-item="{ page }"> {{ page }}</template>
        <template #page-item-step="{ type }">
          <icon-right :style="type === 'previous' ? { transform: `rotate(180deg)` } : undefined" />
        </template>
        <template #page-item-ellipsis>
          <icon-sun-fill />
        </template>
      </a-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import {
  QuestionSubmitControllerService,
  QuestionSubmitQueryRequest,
  QuestionSubmitUpdateRequest,
  QuestionSubmitVO,
  UserControllerService
} from '../../../generated'
import message from '@arco-design/web-vue/es/message'
import moment from 'moment'
import { useRoute, useRouter } from 'vue-router'
import { Image4 } from '@/assets/image/imgExport'

const router = useRouter()
const route = useRoute()

// 行选择
const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false
})
//  选中的行
const selectedKeys = ref([])

// 将搜索框上的内容同步到url上

const searchText = ref(route.query.searchText)

const formattedSearchText: string = typeof searchText.value === 'string' ? searchText.value : ''

// 查询
const onSearch = (value: string) => {
  value = value.trim() // 过滤掉空格
  if (value) {
    router.push({
      query: {
        ...searchParams.value,
        searchText: value,
        current: 1
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

// 搜索栏一键删除
const onClear = () => {
  router.push({
    query: {
      ...searchParams.value,
      searchText: undefined,
      current: 1
    }
  })
}

// 添加选中行，并且防止重复添加
const addSelectedKeys = (id: never) => {
  const keys = selectedKeys.value
  if (!keys.includes(id)) {
    keys.push(id)
    selectedKeys.value = keys
  }
}

const customPageSizeOptions = ref([20, 50, 100])

const current = ref<number>(parseInt(route.query.current as string) || 1)
const pageSize = ref<number>(parseInt(route.query.pageSize as string) || 50)
const sortField = ref(route.query.sortField as string)
const sortOrder = ref(route.query.sortOrder as string)

const dataList = ref([])
const total = ref(0)
const searchParams = ref<QuestionSubmitQueryRequest>({
  pageSize: pageSize.value,
  current: current.value,
  sortField: sortField.value || 'createTime',
  sortOrder: sortOrder.value || 'descend'
})

const popupVisible2 = ref(false)

//  选择参数
const Respond_State = ref(0)
const Submit_State = ref()
const Language = ref()

// 显示参数
const displayedRespond_State = ref(false)
const displayedSubmit_State = ref(false)
const displayedLanguage = ref(false)

// 旋转参数
const rotatedRespond_State = ref(false)
const rotatedSubmit_State = ref(false)
const rotatedLanguage = ref(false)

// 开启按钮时，关闭其他按钮
const rotateIconRespond_State = () => {
  rotatedRespond_State.value = !rotatedRespond_State.value
  displayedRespond_State.value = !displayedRespond_State.value
  rotatedSubmit_State.value = false
  displayedSubmit_State.value = false
  rotatedLanguage.value = false
  displayedLanguage.value = false
}

const rotateIconSubmit_State = () => {
  rotatedSubmit_State.value = !rotatedSubmit_State.value
  displayedSubmit_State.value = !displayedSubmit_State.value
  rotatedRespond_State.value = false
  displayedRespond_State.value = false
  rotatedLanguage.value = false
  displayedLanguage.value = false
}

const rotateIconLanguage = () => {
  rotatedLanguage.value = !rotatedLanguage.value
  displayedLanguage.value = !displayedLanguage.value
  rotatedRespond_State.value = false
  displayedRespond_State.value = false
  rotatedSubmit_State.value = false
  displayedSubmit_State.value = false
}

//  开启状态按钮时，改变搜索参数根据判题状态查询
const doRespond_State = (number: number) => {
  // 第一次点击
  if (Respond_State.value != number) {
    searchParams.value = {
      ...searchParams.value,
      status: number
    }

    Respond_State.value = number
    rotatedRespond_State.value = !rotatedRespond_State.value
    displayedRespond_State.value = !displayedRespond_State.value
  } else {
    // 二次点击
    searchParams.value = {
      ...searchParams.value,
      status: undefined
    }
    Respond_State.value = 0
    rotatedRespond_State.value = !rotatedRespond_State.value
    displayedRespond_State.value = !displayedRespond_State.value
  }
}

//  开启状态按钮时，改变搜索参数根据判题状态查询
const doSubmit_State = (state: string) => {
  // 第一次点击
  if (Submit_State.value != state) {
    searchParams.value = {
      ...searchParams.value,
      message: state
    }

    Submit_State.value = state
    rotatedSubmit_State.value = !rotatedSubmit_State.value
    displayedSubmit_State.value = !displayedSubmit_State.value
  } else {
    // 二次点击
    searchParams.value = {
      ...searchParams.value,
      message: undefined
    }
    Submit_State.value = null
    rotatedSubmit_State.value = !rotatedSubmit_State.value
    displayedSubmit_State.value = !displayedSubmit_State.value
  }
}

//  开启状态按钮时，改变搜索参数根据判题状态查询
const doLanguage = (language: string) => {
  // 第一次点击
  if (Language.value != language) {
    searchParams.value = {
      ...searchParams.value,
      language: language
    }

    Language.value = language
    rotatedLanguage.value = !rotatedLanguage.value
    displayedLanguage.value = !displayedLanguage.value
  } else {
    // 二次点击
    searchParams.value = {
      ...searchParams.value,
      language: undefined
    }
    Language.value = null
    rotatedLanguage.value = !rotatedLanguage.value
    displayedLanguage.value = !displayedLanguage.value
  }
}

// 关闭语言标签
const closeLanguage = () => {
  searchParams.value = {
    ...searchParams.value,
    language: undefined
  }
  Language.value = null
}

// 关闭提交状态标签
const closeSubmit_State = () => {
  searchParams.value = {
    ...searchParams.value,
    message: undefined
  }
  Submit_State.value = null
}

// 关闭判题状态标签
const closeRespond_State = () => {
  searchParams.value = {
    ...searchParams.value,
    status: undefined
  }
  Respond_State.value = 0
}

// 删除所有搜索条件
const resettingAll = () => {
  searchParams.value = {
    ...searchParams.value,
    status: undefined,
    message: undefined,
    language: undefined
  }
  Submit_State.value = null
  Language.value = null
  Respond_State.value = 0
}

// 切换每页显示条数
const onPageSizeChange = (Size: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: Size
  }
  pageSize.value = Size
  router.push({
    query: searchParams.value
  })
}

const loadData = async () => {
  const res = await QuestionSubmitControllerService.listQuestionSubmitVoByPageUsingPost({
    ...searchParams.value
  })
  if (res.code === 0) {
    dataList.value = res.data.records
    total.value = res.data.total
  } else {
    message.error('加载失败，' + res.message)
  }
  // await UserData(dataList.value);
  // await QuestionData(dataList.value);
}

// 多行删除
const handleDelete = async () => {
  const promises = selectedKeys.value.map(async (id) => {
    const res = await QuestionSubmitControllerService.deleteQuestionSubmitUsingPost({
      id
    })
    if (res.code === 0) {
      return { id, success: true }
    } else {
      return { id, success: false, message: res.message }
    }
  })

  const results = await Promise.all(promises)

  results.forEach((result) => {
    if (result.success) {
      message.success(`提交题目ID:${result.id} 删除成功！`)
    } else {
      message.error(`提交题目ID:${result.id} 删除失败：${result.message}`)
    }
  })

  await loadData()
  selectedKeys.value = []
}

// 多行更新 （旧）
/*const handleUpdate = async () => {
  for (let i = 0; i < selectedKeys.value.length; i++) {
    const id = selectedKeys.value[i];
    const index = dataList.value.findIndex((item) => item.id === id);
    if (index !== -1) {
      const res = await QuestionControllerService.updateQuestionSubmitUsingPost(
        dataList.value[index]
      );
      if (res.code === 0) {
        message.success(`提交题目保存成功！`);
      } else {
        message.error("保存失败，" + res.message);
      }
    }
  }
  await loadData();
  selectedKeys.value = [];
};*/

// 多行更新 (新）
const handleUpdate = async () => {
  const promises = selectedKeys.value.map(async (id) => {
    const index = dataList.value.findIndex((item) => item.id === id)
    if (index !== -1) {
      const res = await QuestionSubmitControllerService.updateQuestionSubmitUsingPost(
        dataList.value[index]
      )
      if (res.code === 0) {
        return { id, success: true }
      } else {
        return { id, success: false, message: res.message }
      }
    }
  })

  const results = await Promise.all(promises)

  results.forEach((result) => {
    if (result?.success) {
      message.success(`提交题目ID:${result.id} 保存成功！`)
    } else {
      message.error(`提交题目ID:${result?.id} 保存失败：${result?.message}`)
    }
  })

  await loadData()
  selectedKeys.value = []
}

// 获取用户信息 并行执行和结果缓存
const userCache: {
  [key: string]: {
    userName: string
    userAvatar: string
  }
} = {}
const UserData = async (dataList: any[]) => {
  const userIds = dataList.map((item) => item.userId)
  // 并行执行所有请求
  const requests = userIds.map((userId) => UserControllerService.getUserByIdUsingGet(userId))
  const responses = await Promise.all(requests)

  for (let i = 0; i < dataList.length; i++) {
    const item = dataList[i]
    const res = responses[i]

    if (res.code === 0 && res.data && res.data.userName && res.data.userAvatar) {
      const { userName, userAvatar } = res.data
      item.userName = userName
      item.userAvatar = userAvatar

      // 将结果缓存起来
      userCache[item.userId] = { userName, userAvatar }
    } else {
      console.error(`获取 id 为 ${item.id} 的用户信息失败`)
    }
  }
}

// 获取用户信息 并行执行和结果缓存
// const QuestionCache: {
//   [key: string]: {
//     title: string;
//     judgeCase: string;
//   };
// } = {};
// const QuestionData = async (dataList: any[]) => {
//   const questionIds = dataList.map((item) => item.questionId);
//
//   // 并行执行所有请求
//   const requests = questionIds.map((questionId) =>
//     QuestionControllerService.getQuestionByIdUsingGet(questionId)
//   );
//   const responses = await Promise.all(requests);
//
//   for (let i = 0; i < dataList.length; i++) {
//     const item = dataList[i];
//     const res = responses[i];
//
//     if (res.code === 0 && res.data && res.data.title && res.data.judgeCase) {
//       const { title } = res.data;
//       const { judgeCase } = res.data;
//       item.title = title;
//       item.judgeCase = judgeCase;
//
//       // 将结果缓存起来
//       QuestionCache[item.questionId] = { title, judgeCase };
//     } else {
//       console.error(`获取 id 为 ${item.id} 的用户信息失败`);
//     }
//   }
// };

/**
 * 排序
 * @param dataIndex 排序字段
 * @param direction 排序顺序
 */
const handleSortChange = (dataIndex: string, direction: string) => {
  if (!direction) {
    searchParams.value = {
      ...searchParams.value,
      sortField: 'createTime',
      sortOrder: 'descend'
    }
  } else {
    searchParams.value = {
      ...searchParams.value,
      sortOrder: direction,
      sortField: dataIndex
    }
  }
}

const doDelete = async (questionSubmitVO: QuestionSubmitVO) => {
  const res = await QuestionSubmitControllerService.deleteQuestionSubmitUsingPost({
    id: questionSubmitVO.id
  })
  if (res.code === 0) {
    message.success('删除成功！')
    await loadData()
  } else {
    message.error('删除失败：' + res.message)
  }
}

const doUpdate = async (questionSubmitUpdateRequest: QuestionSubmitUpdateRequest) => {
  const keys = selectedKeys.value
  const index = keys.indexOf(questionSubmitUpdateRequest.id as never)
  if (index >= 0) {
    keys.splice(index, 1) // 删除指定位置的一个元素
    selectedKeys.value = keys
  }
  const res = await QuestionSubmitControllerService.updateQuestionSubmitUsingPost(
    questionSubmitUpdateRequest
  )
  if (res.code === 0) {
    message.success('保存成功！')
    await loadData()
  } else {
    message.error('保存失败：' + res.message)
  }
}
/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  searchParams.value = {
    ...searchParams.value,
    searchText: route.query.searchText
  } as never
  loadData()
})

/**
 * 页面加载时，请求数据
 */
// onMounted(() => {
//   loadData();
// });

const columns = [
  {
    title: '提交题目',
    dataIndex: 'questionId',
    slotName: 'questionId',
    width: 250,
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },
  {
    title: '编程语言',
    slotName: 'language',
    dataIndex: 'language',
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },
  {
    title: '提交代码',
    slotName: 'code',
    align: 'center'
  },
  {
    title: '实际输出',
    slotName: 'outPut',
    align: 'center'
  },
  {
    title: '错误信息',
    slotName: 'error_message',
    align: 'center'
  },
  {
    title: '提交状态',
    slotName: 'message',
    dataIndex: 'judgeInfo',
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },
  {
    title: '消耗时间',
    slotName: 'time'
  },
  {
    title: '消耗内存',
    slotName: 'memory'
  },
  {
    title: '判题状态',
    slotName: 'status',
    dataIndex: 'status',
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },

  {
    title: '提交用户',
    dataIndex: 'userId',
    slotName: 'userId',
    width: 200,
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },
  {
    title: '提交时间',
    slotName: 'createTime',
    dataIndex: 'createTime',
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },
  {
    title: '修改时间',
    slotName: 'updateTime',
    dataIndex: 'updateTime',
    sortable: {
      sortDirections: ['ascend', 'descend'],
      sorter: true
    }
  },
  {
    title: '操作',
    slotName: 'optional',
    align: 'center',
    width: 150
  }
]

// 切换当前页码
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page
  }
  current.value = page
  router.push({
    query: searchParams.value
  })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
#questionSubmitView {
  margin-top: 90px;
  margin-left: 10px;
}

.content-basic {
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 10px;
}

.status-basic {
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 10px;
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

.small-image {
  width: 18px; /* 设置图像的宽度 */
  height: auto; /* 保持高度自适应 */
}

.button-trigger {
  position: fixed;
  bottom: 100px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-white);
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
  z-index: 1;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

/* button left */
.button-trigger:nth-child(1) {
  right: 185px;
  background-color: var(--color-neutral-5);
}

.button-trigger:nth-child(1).button-trigger-active {
  background-color: var(--color-neutral-4);
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
</style>
