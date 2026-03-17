<script setup lang="ts">
import type { Attachment, Conversation } from 'ant-design-x-vue';

import { computed, h, ref, watch } from 'vue';

import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  CloseOutlined,
  CloudUploadOutlined,
  CommentOutlined,
  PaperClipOutlined,
  PlusOutlined,
  ScheduleOutlined,
} from '@antdv-next/icons';
import {
  Attachments,
  Bubble,
  Conversations,
  Prompts,
  Sender,
  Suggestion,
  theme,
  useXAgent,
  useXChat,
  Welcome,
} from 'ant-design-x-vue';
import { Button, message, Popover, Space } from 'antdv-next';

defineOptions({ name: 'PlaygroundCopilotSetup' });

type BubbleDataType = {
  content: string;
  role: string;
};

const MOCK_SESSION_LIST = [
  {
    key: '5',
    label: 'New session',
    group: 'Today',
  },
  {
    key: '4',
    label: 'What has Ant Design X upgraded?',
    group: 'Today',
  },
  {
    key: '3',
    label: 'New AGI Hybrid Interface',
    group: 'Today',
  },
  {
    key: '2',
    label: 'How to quickly install and import components?',
    group: 'Yesterday',
  },
  {
    key: '1',
    label: 'What is Ant Design X?',
    group: 'Yesterday',
  },
];
const MOCK_SUGGESTIONS = [
  { label: 'Write a report', value: 'report' },
  { label: 'Draw a picture', value: 'draw' },
  {
    label: 'Check some knowledge',
    value: 'knowledge',
    children: [
      { label: 'About React', value: 'react' },
      { label: 'About Ant Design', value: 'antd' },
    ],
  },
];
const MOCK_QUESTIONS = [
  'What has Ant Design X upgraded?',
  'What components are in Ant Design X?',
  'How to quickly install and import components?',
];
const AGENT_PLACEHOLDER = 'Generating content, please wait...';

const attachmentsRef = ref<InstanceType<typeof Attachments>>(null);
const abortController = ref<AbortController>(null);

// ==================== State ====================

const messageHistory = ref<Record<string, any>>({});

const sessionList = ref<Conversation[]>(MOCK_SESSION_LIST);
const curSession = ref(sessionList.value[0].key);

const attachmentsOpen = ref(false);
const files = ref<Attachment[]>([]);

const inputValue = ref('');

// ==================== Runtime ====================

/**
 * 🔔 Please replace the BASE_URL, PATH, MODEL, API_KEY with your own values.
 */
const [agent] = useXAgent<BubbleDataType>({
  baseURL: 'https://api.x.ant.design/api/model-url-path',
  model: 'model-name',
  dangerouslyApiKey: 'Bearer sk-xxxxxxxxxxxxxxxxxxxx',
});

const loading = agent.value.isRequesting();

const { messages, onRequest, setMessages } = useXChat({
  agent: agent.value,
  requestFallback: (_, { error }) => {
    if (error.name === 'AbortError') {
      return {
        content: 'Request is aborted',
        role: 'assistant',
      };
    }
    return {
      content: '请求失败，请重试!',
      role: 'assistant',
    };
  },
  transformMessage: (info) => {
    const { originMessage, currentMessage } = info || {};
    let currentContent = '';
    let currentThink = '';
    try {
      if (currentMessage?.data && !currentMessage?.data.includes('DONE')) {
        const message = JSON.parse(currentMessage?.data);
        currentThink = message?.choices?.[0]?.delta?.reasoning_content || '';
        currentContent = message?.choices?.[0]?.delta?.content || '';
      }
    } catch (error) {
      console.error(error);
    }

    let content = '';

    if (!originMessage?.content && currentThink) {
      content = `<think>${currentThink}`;
    } else if (
      originMessage?.content?.includes('<think>') &&
      !originMessage?.content.includes('</think>') &&
      currentContent
    ) {
      content = `${originMessage?.content}</think>${currentContent}`;
    } else {
      content = `${originMessage?.content || ''}${currentThink}${currentContent}`;
    }

    return {
      content,
      role: 'assistant',
    };
  },
  resolveAbortController: (controller) => {
    abortController.value = controller;
  },
});
watch(
  curSession,
  () => {
    if (curSession.value === undefined) {
      setMessages([]);
    } else {
      setMessages(messageHistory.value?.[curSession.value] || []);
    }
  },
  { immediate: true },
);

watch(
  () => messages.value,
  () => {
    // history mock
    if (messages.value?.length) {
      messageHistory.value = {
        ...messageHistory.value,
        [curSession.value]: messages.value,
      };
    }
  },
);

// ==================== Event ====================
const handleUserSubmit = (val: string) => {
  onRequest({
    stream: true,
    message: { content: val, role: 'user' },
  });

  // session title mock
  if (
    sessionList.value.find((i) => i.key === curSession.value)?.label ===
    'New session'
  ) {
    const tempList = sessionList.value.map((i) =>
      i.key === curSession.value ? { ...i, label: val?.slice(0, 20) } : i,
    );
    sessionList.value = tempList;
  }
};

const onPasteFile = (_: File, files: FileList) => {
  for (const file of files) {
    attachmentsRef.value?.upload(file);
  }
  attachmentsOpen.value = true;
};

const createNewSession = () => {
  if (agent.value.isRequesting()) {
    message.error(
      'Message is Requesting, you can create a new conversation after request done or abort it right now...',
    );
    return;
  }

  if (messages.value?.length) {
    const timeNow = Date.now().toString();
    try {
      abortController.value?.abort();
    } catch (error) {
      console.error(error);
    }
    // The abort execution will trigger an asynchronous requestFallback, which may lead to timing issues.
    // In future versions, the sessionId capability will be added to resolve this problem.
    setTimeout(() => {
      sessionList.value = [
        { key: timeNow, label: 'New session', group: 'Today' },
        ...sessionList.value,
      ];
      curSession.value = timeNow;
    }, 100);
  } else {
    message.error('It is now a new conversation.');
  }
};

const changeConversation = async (val: string) => {
  try {
    abortController.value?.abort();
  } catch (error) {
    console.error(error);
  }
  // The abort execution will trigger an asynchronous requestFallback, which may lead to timing issues.
  // In future versions, the sessionId capability will be added to resolve this problem.
  setTimeout(() => {
    curSession.value = val;
  }, 100);
};

const setCopilotOpen = (val: boolean) => (copilotOpen.value = val);

// ==================== Style ====================
const { token } = theme.useToken();
const styles = computed(() => {
  return {
    copilotChat: {
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
      background: token.value.colorBgContainer,
      color: token.value.colorText,
    },
    // chatHeader 样式
    chatHeader: {
      height: '52px',
      boxSizing: 'border-box',
      borderBottom: `1px solid ${token.value.colorBorder}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 10px 0 16px',
    },
    headerTitle: {
      'font-weight': 600,
      'font-size': '15px',
    },
    headerButton: {
      width: '32px',
      height: '32px',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'font-size': '18px',
    },
    conversations: {
      width: '300px',
      '& .ant-conversations-list': {
        paddingInlineStart: 0,
      },
    },
    // chatList 样式
    chatList: {
      overflow: 'auto',
      'padding-block': '16px',
      flex: 1,
    },
    chatWelcome: {
      'margin-inline': '16px',
      padding: '12px 16px',
      'border-radius': '2px 12px 12px 12px',
      background: token.value.colorBgTextHover,
      'margin-bottom': '16px',
    },
    loadingMessage: {
      'background-image':
        'linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%)',
      'background-size': '100% 2px',
      'background-repeat': 'no-repeat',
      'background-position': 'bottom',
    },
    // chatSend 样式
    chatSend: {
      padding: '12px',
    },
    sendAction: {
      display: 'flex',
      'align-items': 'center',
      'margin-bottom': '12px',
      gap: '8px',
    },
    speechButton: {
      'font-size': '18px',
      color: `${token.value.colorText} !important`,
    },
  } as const;
});
const workareaStyles = computed(() => {
  return {
    copilotWrapper: {
      height: '90vh',
      width: '100vh',
      display: 'flex',
    },
  } as const;
});

// ==================== State =================
const copilotOpen = ref<boolean>(true);

const roles: (typeof Bubble.List)['roles'] = {
  assistant: {},
  user: { placement: 'end' },
};
</script>

<template>
  <div :style="workareaStyles.copilotWrapper">
    <div
      :style="{ ...styles.copilotChat, display: copilotOpen ? 'flex' : 'none' }"
    >
      <!-- 对话区 - header -->
      <!-- {chatHeader} -->
      <div :style="styles.chatHeader">
        <div :style="styles.headerTitle">✨ ai小助手</div>
        <Space :size="0">
          <Button
            type="text"
            :icon="h(PlusOutlined)"
            :style="styles.headerButton"
            @click="createNewSession"
          />
          <Popover
            placement="bottom"
            :overlay-style="{ padding: 0, maxHeight: 600 }"
          >
            <template #content>
              <Conversations
                :items="
                  sessionList?.map((i) =>
                    i.key === curSession
                      ? { ...i, label: `[current] ${i.label}` }
                      : i,
                  )
                "
                :active-key="curSession"
                groupable
                :styles="{
                  ...styles.conversations,
                  item: { padding: '0 8px' },
                }"
                @active-change="changeConversation"
              />
            </template>
            <Button
              type="text"
              :icon="h(CommentOutlined)"
              :style="styles.headerButton"
            />
          </Popover>
          <Button
            type="text"
            :icon="h(CloseOutlined)"
            :style="styles.headerButton"
            @click="setCopilotOpen(false)"
          />
        </Space>
      </div>
      <!-- 对话区 - 消息列表 -->
      <div :style="styles.chatList">
        <Bubble.List
          v-if="messages?.length"
          :style="{ height: '100%', paddingInline: '16px' }"
          :items="
            messages?.map((i) => ({
              ...i.message,
              styles: {
                content: i.status === 'loading' ? styles.loadingMessage : {},
              },
              loading: i.status === 'loading',
              typing:
                i.status === 'loading'
                  ? { step: 5, interval: 20, suffix: h('span', '💗') }
                  : false,
            }))
          "
          :roles="roles"
        />
        <template v-else>
          <Welcome
            variant="borderless"
            title="👋 你好，我是ai小助手"
            description="你可以开始问问题了~"
            :style="styles.chatWelcome"
          />
          <Prompts
            vertical
            title="I can help："
            :items="MOCK_QUESTIONS.map((i) => ({ key: i, description: i }))"
            :style="{
              'margin-inline': '16px',
            }"
            :styles="{
              title: { fontSize: 14 },
            }"
            @item-click="
              (info) => handleUserSubmit(info?.data?.description as string)
            "
          />
        </template>
      </div>

      <!-- 对话区 - 输入框 -->
      <!-- {chatSender} -->
      <div :style="styles.chatSend">
        <div :style="styles.sendAction">
          <Button
            :icon="h(ScheduleOutlined)"
            @click="handleUserSubmit('What has Ant Design X upgraded?')"
          >
            Upgrades
          </Button>
          <Button
            :icon="h(AppstoreOutlined)"
            @click="
              handleUserSubmit(
                'What component assets are available in Ant Design X?',
              )
            "
          >
            Components
          </Button>
          <Button :icon="h(AppstoreAddOutlined)"> More </Button>
        </div>
        <!-- 输入框 -->

        <Suggestion
          :items="MOCK_SUGGESTIONS"
          @select="(itemVal) => (inputValue = `[${itemVal}]:`)"
        >
          <template #default="{ onTrigger, onKeyDown }">
            <Sender
              :loading="loading"
              :value="inputValue"
              allow-speech
              placeholder="Ask or input / use skills"
              @change="
                (v) => {
                  onTrigger(v === '/');
                  inputValue = v;
                }
              "
              @submit="
                () => {
                  handleUserSubmit(inputValue);
                  inputValue = '';
                }
              "
              @cancel="
                () => {
                  try {
                    abortController?.abort();
                  } catch (error) {
                    console.error(error);
                  }
                }
              "
              @key-down="onKeyDown"
              @paste-file="onPasteFile"
            >
              <template #header>
                <Sender.Header
                  title="Upload File"
                  :styles="{ content: { padding: 0 } }"
                  :open="attachmentsOpen"
                  force-render
                  @open-change="(val) => (attachmentsOpen = val)"
                >
                  <Attachments
                    ref="attachmentsRef"
                    :before-upload="() => false"
                    :items="files"
                    :placeholder="
                      (type) =>
                        type === 'drop'
                          ? { title: 'Drop file here' }
                          : {
                              icon: h(CloudUploadOutlined),
                              title: 'Upload files',
                              description:
                                'Click or drag files to this area to upload',
                            }
                    "
                    @change="({ fileList }) => (files = fileList)"
                  />
                </Sender.Header>
              </template>
              <template #prefix>
                <Button
                  type="text"
                  :icon="h(PaperClipOutlined, { style: { fontSize: '18px' } })"
                  @click="attachmentsOpen = !attachmentsOpen"
                />
              </template>
              <template
                #actions="{
                  info: {
                    components: { SendButton, LoadingButton, SpeechButton },
                  },
                }"
              >
                <div :style="{ display: 'flex', alignItems: 'center', gap: 4 }">
                  <component :is="SpeechButton" :style="styles.speechButton" />
                  <component
                    :is="LoadingButton"
                    v-if="loading"
                    type="default"
                  />
                  <component :is="SendButton" v-else type="primary" />
                </div>
              </template>
            </Sender>
          </template>
        </Suggestion>
      </div>
    </div>
  </div>
</template>
