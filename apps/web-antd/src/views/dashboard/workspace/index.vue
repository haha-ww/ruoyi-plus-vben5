<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import {
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from '@antdv-next/icons';

defineOptions({ name: 'Workspace' });

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

// 当前时间
const currentTime = ref(new Date());
let timer: null | ReturnType<typeof setInterval> = null;

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

// 问候语
const greeting = computed(() => {
  const hour = currentTime.value.getHours();
  if (hour < 6) return '凌晨好';
  if (hour < 9) return '早上好';
  if (hour < 12) return '上午好';
  if (hour < 14) return '中午好';
  if (hour < 17) return '下午好';
  if (hour < 19) return '傍晚好';
  return '晚上好';
});

// 格式化日期
const formattedDate = computed(() => {
  const d = currentTime.value;
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const weekDay = weekDays[d.getDay()!];
  return `${y}年${m}月${day}日 星期${weekDay}`;
});

const formattedTime = computed(() => {
  const d = currentTime.value;
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  return `${h}:${min}:${s}`;
});

// 快捷入口
const shortcuts = [
  {
    title: '客户管理',
    description: '管理客户信息、跟进记录与合同',
    icon: TeamOutlined,
    color: '#1677ff',
    bgColor: '#e6f4ff',
    path: '/crm/crmCustomer',
  },
  {
    title: '销售订单',
    description: '查看和管理销售订单',
    icon: ShoppingCartOutlined,
    color: '#52c41a',
    bgColor: '#f6ffed',
    path: '/erp/salesOrder',
  },
  {
    title: '生产计划',
    description: '排产计划与甘特图管理',
    icon: CalendarOutlined,
    color: '#fa8c16',
    bgColor: '#fff7e6',
    path: '/erp/productionPlan',
  },
  {
    title: '物料管理',
    description: '物料信息、BOM与库存管理',
    icon: FileTextOutlined,
    color: '#722ed1',
    bgColor: '#f9f0ff',
    path: '/erp/materialInfo',
  },
  {
    title: '系统管理',
    description: '用户、角色、菜单与字典配置',
    icon: SettingOutlined,
    color: '#eb2f96',
    bgColor: '#fff0f6',
    path: '/system/user',
  },
  {
    title: '工作流',
    description: '流程定义、部署与任务管理',
    icon: ClockCircleOutlined,
    color: '#13c2c2',
    bgColor: '#e6fffb',
    path: '/workflow/processDefinition',
  },
];
</script>

<template>
  <Page>
    <div class="workspace-container flex flex-col gap-6">
      <!-- 欢迎横幅 -->
      <div
        class="welcome-banner relative overflow-hidden rounded-xl p-8"
        style="
          background: linear-gradient(
            135deg,
            #1677ff 0%,
            #4096ff 50%,
            #69b1ff 100%
          );
        "
      >
        <div class="relative z-10 flex items-center justify-between">
          <div class="text-white">
            <div class="mb-2 flex items-center gap-3">
              <span class="text-3xl font-bold">
                {{ greeting }}，{{ userInfo?.realName || '用户' }}
              </span>
            </div>
            <p class="text-lg text-white/80">欢迎使用中台管理系统，祝您工作顺利！</p>
          </div>
          <div class="hidden text-right text-white/90 md:block">
            <div class="text-4xl font-light tracking-wider">
              {{ formattedTime }}
            </div>
            <div class="mt-1 text-sm text-white/70">{{ formattedDate }}</div>
          </div>
        </div>
        <!-- 装饰圆 -->
        <div
          class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
        ></div>
        <div
          class="absolute -bottom-8 right-20 h-24 w-24 rounded-full bg-white/5"
        ></div>
      </div>

      <!-- 快捷入口 -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">快捷入口</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink
            v-for="item in shortcuts"
            :key="item.path"
            :to="item.path"
            class="shortcut-card group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
              :style="{ backgroundColor: item.bgColor }"
            >
              <component
                :is="item.icon"
                class="text-xl"
                :style="{ color: item.color }"
              />
            </div>
            <div class="min-w-0">
              <div class="text-base font-medium">{{ item.title }}</div>
              <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ item.description }}
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- 底部提示 -->
      <div
        class="rounded-xl border border-gray-100 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-900"
      >
        <p class="text-sm text-gray-400">
          {{ new Date().getFullYear() }} © 企业中台管理系统
        </p>
      </div>
    </div>
  </Page>
</template>

<style scoped>
.welcome-banner {
  min-height: 140px;
}

.shortcut-card {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.shortcut-card:hover {
  border-color: transparent;
}
</style>
