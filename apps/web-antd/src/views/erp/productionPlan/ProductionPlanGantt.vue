<script setup lang="ts">
import type { ProductionPlanVO } from '#/api/erp/productionPlan/model';

import { onMounted, onUnmounted, ref, watch } from 'vue';

import {
  RadioButton,
  RadioGroup
} from 'antdv-next';

import { productionPlanUpdateTime } from '#/api/erp/productionPlan';

import { priorityColorMap, priorityOptions, sourceTypeOptions, statusColorMap, statusOptions } from './data';

// dhtmlx-gantt 类型声明
declare const gantt: any;

const props = defineProps<{
  data: ProductionPlanVO[];
}>();

const emit = defineEmits<{
  edit: [id: number | string];
  refresh: [];
}>();

const ganttContainer = ref<HTMLElement>();
let ganttInited = false;

// 时间刻度模式
type ScaleMode = 'day' | 'month' | 'week';
const scaleMode = ref<ScaleMode>('week');

function setScale(mode: ScaleMode) {
  scaleMode.value = mode;
  if (!ganttInited) return;
  applyScale(mode);
  gantt.resetLayout();
}

function applyScale(mode: ScaleMode) {
  if (mode === 'day') {
    gantt.config.scales = [
      { unit: 'month', step: 1, format: '%Y年%m月' },
      { unit: 'day', step: 1, format: '%d日' },
    ];
    gantt.config.min_column_width = 40;
  } else if (mode === 'week') {
    gantt.config.scales = [
      { unit: 'month', step: 1, format: '%Y年%m月' },
      { unit: 'week', step: 1, format: '第%W周' },
    ];
    gantt.config.min_column_width = 80;
  } else {
    gantt.config.scales = [
      { unit: 'year', step: 1, format: '%Y年' },
      { unit: 'month', step: 1, format: '%m月' },
    ];
    gantt.config.min_column_width = 60;
  }
}

function buildGanttData(list: ProductionPlanVO[]) {
  return {
    data: list.map((item) => ({
      id: item.id,
      text: item.materialName || `计划-${item.id}`,
      start_date: item.planStartTime ? item.planStartTime.slice(0, 10) : '',
      end_date: item.planEndTime ? item.planEndTime.slice(0, 10) : '',
      duration: 0,
      progress: item.planQty > 0 ? Math.min((item.actualQty || 0) / item.planQty, 1) : 0,
      // 自定义字段
      planCode: item.planCode,
      materialCode: item.materialCode,
      planQty: item.planQty,
      actualQty: item.actualQty || 0,
      priority: item.priority,
      status: item.status,
      sourceType: item.sourceType,
    })),
    links: [],
  };
}

function getTaskColor(task: any): string {
  // 优先按状态着色
  if (task.status !== undefined && statusColorMap[task.status]) {
    return statusColorMap[task.status];
  }
  if (task.priority && priorityColorMap[task.priority]) {
    return priorityColorMap[task.priority];
  }
  return '#1677ff';
}

function initGantt() {
  if (!ganttContainer.value || ganttInited) return;

  // 基础配置
  gantt.config.date_format = '%Y-%m-%d';
  gantt.config.xml_date = '%Y-%m-%d';
  gantt.config.work_time = false;
  gantt.config.drag_links = false;
  gantt.config.drag_progress = false;
  gantt.config.drag_move = true;
  gantt.config.drag_resize = true;
  gantt.config.readonly = false;
  gantt.config.show_progress = true;
  gantt.config.fit_tasks = true;
  gantt.config.auto_scheduling = false;

  // 左侧列配置
  gantt.config.columns = [
    { name: 'text', label: '产品名称', tree: true, width: 160, resize: true },
    { name: 'planCode', label: '计划单号', width: 130, resize: true },
    { name: 'planQty', label: '计划量', width: 70, align: 'center', resize: true },
    { name: 'actualQty', label: '实际量', width: 70, align: 'center', resize: true },
    {
      name: 'status',
      label: '状态',
      width: 80,
      align: 'center',
      resize: true,
      template: (task: any) => {
        const opt = statusOptions.find((o) => o.value === task.status);
        const color = statusColorMap[task.status] || '#8c8c8c';
        return opt
          ? `<span style="color:${color};font-size:12px">${opt.label}</span>`
          : (task.status ?? '');
      },
    },
  ];

  // 任务条颜色
  gantt.templates.task_class = (_start: Date, _end: Date, task: any) => {
    return `gantt-task-priority-${task.priority || '3'}`;
  };

  gantt.templates.task_text = (_start: Date, _end: Date, task: any) => {
    const pct = Math.round(task.progress * 100);
    return `${task.text} (${pct}%)`;
  };

  // tooltip
  gantt.templates.tooltip_text = (_start: Date, _end: Date, task: any) => {
    const srcOpt = sourceTypeOptions.find((o) => o.value === task.sourceType);
    const priOpt = priorityOptions.find((o) => o.value === task.priority);
    const staOpt = statusOptions.find((o) => o.value === task.status);
    return `
      <b>${task.text}</b><br/>
      计划单号：${task.planCode || '-'}<br/>
      产品编码：${task.materialCode || '-'}<br/>
      计划数量：${task.planQty || 0}<br/>
      实际数量：${task.actualQty || 0}<br/>
      完成率：${Math.round(task.progress * 100)}%<br/>
      来源：${srcOpt?.label || '-'}<br/>
      优先级：${priOpt?.label || '-'}<br/>
      状态：${staOpt?.label || '-'}
    `;
  };

  // 今日高亮（时间轴列 + 今日竖线标记）
  gantt.templates.timeline_cell_class = (_task: any, date: Date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'gantt-today-cell';
    }
    return '';
  };

  // 今日高亮
  gantt.templates.scale_cell_class = (date: Date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'gantt-today-cell';
    }
    return '';
  };

  applyScale(scaleMode.value);

  // 拖拽结束后更新时间
  gantt.attachEvent('onAfterTaskDrag', async (id: any, mode: string) => {
    if (mode === 'move' || mode === 'resize') {
      const task = gantt.getTask(id);
      const fmt = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day} 00:00:00`;
      };
      try {
        await productionPlanUpdateTime({
          id,
          planStartTime: fmt(task.start_date),
          planEndTime: fmt(task.end_date),
        });
        emit('refresh');
      } catch {
        // 失败时回滚
        gantt.undo();
      }
    }
  });

  // 双击打开编辑
  gantt.attachEvent('onTaskDblClick', (id: any) => {
    emit('edit', id);
    return false; // 阻止默认弹窗
  });

  gantt.init(ganttContainer.value);
  ganttInited = true;

  loadData(props.data);
}

function loadData(list: ProductionPlanVO[]) {
  if (!ganttInited) return;
  gantt.clearAll();
  gantt.parse(buildGanttData(list));
}

watch(
  () => props.data,
  (list) => loadData(list),
  { deep: true },
);

onMounted(async () => {
  // dhtmlx-gantt ES module，导出 named export `gantt`
  if (!(window as any).gantt) {
    const { gantt: g } = await import('dhtmlx-gantt');
    (window as any).gantt = g;
  }
  initGantt();
});

onUnmounted(() => {
  if (ganttInited) {
    gantt.clearAll();
    ganttInited = false;
  }
});
</script>

<template>
  <div class="production-gantt">
    <!-- 工具栏 -->
    <div class="gantt-toolbar">
      <span class="gantt-toolbar-label">时间刻度：</span>
      <RadioGroup :value="scaleMode" button-style="solid" option-type="button" size="small" @change="(e: any) => setScale(e.target.value)">
        <RadioButton value="day">日</RadioButton>
        <RadioButton value="week">周</RadioButton>
        <RadioButton value="month">月</RadioButton>
      </RadioGroup>
      <a-divider type="vertical" />
      <span class="gantt-legend">
        <span v-for="opt in statusOptions" :key="opt.value" class="legend-item">
          <span class="legend-dot" :style="{ background: statusColorMap[opt.value] }"></span>
          {{ opt.label }}
        </span>
      </span>
    </div>
    <!-- 甘特图容器 -->
    <div ref="ganttContainer" class="gantt-container"></div>
  </div>
</template>

<style scoped>
.production-gantt {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.gantt-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.gantt-toolbar-label {
  font-size: 13px;
  color: #666;
}

.gantt-legend {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #666;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.legend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.gantt-container {
  flex: 1;
  min-height: 0;
}
</style>

<style>
/* dhtmlx-gantt 全局样式覆盖 */
@import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

.gantt-today-cell {
  background: #e6f4ff !important;
}

.gantt_task_line {
  border-radius: 4px;
}

.gantt_task_progress {
  border-radius: 4px 0 0 4px;
  opacity: 0.85;
}

/* 优先级颜色 */
.gantt-task-priority-1 .gantt_task_line {
  background: #ff4d4f;
  border-color: #cf1322;
}
.gantt-task-priority-1 .gantt_task_progress {
  background: #cf1322;
}

.gantt-task-priority-2 .gantt_task_line {
  background: #fa8c16;
  border-color: #d46b08;
}
.gantt-task-priority-2 .gantt_task_progress {
  background: #d46b08;
}

.gantt-task-priority-3 .gantt_task_line {
  background: #1677ff;
  border-color: #0958d9;
}
.gantt-task-priority-3 .gantt_task_progress {
  background: #0958d9;
}

.gantt-task-priority-4 .gantt_task_line {
  background: #52c41a;
  border-color: #389e0d;
}
.gantt-task-priority-4 .gantt_task_progress {
  background: #389e0d;
}

.gantt_tooltip {
  font-size: 12px;
  line-height: 1.8;
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
