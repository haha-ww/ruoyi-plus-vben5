import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const {
  version,
  // vite inject-metadata 插件注入的全局变量
} = __VBEN_ADMIN_METADATA__ || {};

const routes: RouteRecordRaw[] = [
  {
    meta: {
      order: -1,
      title: $t('page.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/',
    redirect: '/analytics',
    children: [
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          title: $t('page.dashboard.workspace'),
        },
      },
    ],
  },
];

export default routes;
