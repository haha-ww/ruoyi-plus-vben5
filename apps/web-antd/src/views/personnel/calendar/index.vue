<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue';

import { ExclamationCircleOutlined } from '@antdv-next/icons';
import { Calendar, Select, Tag } from 'antdv-next';
import dayjs, { Dayjs } from 'dayjs';
import { Lunar } from 'lunar-typescript';

import {
  personnelCalendarConfigAdd,
  personnelCalendarConfigList,
  personnelCalendarConfigRemove,
} from '#/api/personnel/personnelCalendarConfig';

dayjs.locale('zh-cn');

type OffDays = string[];

// 2. 初始化值修改
const offDays = ref<OffDays>([]);

const selectedYear = ref<number>(dayjs().year());

// 生成年份选项（当前年前后5年）
const yearOptions = computed(() => {
  const currentYear = dayjs().year();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  console.log('yearOptions:', years);
  return years.map((year) => ({ label: `${year}年`, value: year }));
});

// 获取指定月份的日期
const getMonthDate = (month: number): Dayjs => {
  return dayjs()
    .year(selectedYear.value)
    .month(month - 1)
    .startOf('month');
};

// 自定义日历头部
const headerRender = (month: number) => {
  return h('div', { class: 'custom-header' }, [
    h('div', { class: 'header-content' }, [
      h('span', { class: 'month' }, `${selectedYear.value}年${month}月`),
    ]),
  ]);
};

// 日期单元格自定义渲染
const dateCellRender = (value: Dayjs) => {
  const date = value;
  const lunar = Lunar.fromDate(date.toDate());
  const dateStr = date.format('YYYY-MM-DD');
  const isOff = offDays.value.includes(dateStr);
  const solarDate = date;
  const solarHoliday = (() => {
    const m = solarDate.month() + 1; // 月份从0开始
    const d = solarDate.date();
    if (m === 1 && d === 1) return '元旦';
    if (m === 5 && d === 1) return '劳动节';
    if (m === 10 && d === 1) return '国庆节';
    return null;
  })();
  // 获取节假日信息（优先显示节日）
  const festival = solarHoliday || lunar.getFestivals()[0] || lunar.getJieQi();
  const lunarText = festival || lunar.getDayInChinese();
  return h(
    'div',
    {
      class: ['date-cell', { 'off-day': isOff }],
      onClick: () => toggleOffDay(date),
    },
    [
      h('div', { class: 'solar' }, date.date()),
      h(
        'div',
        {
          class: 'lunar',
        },
        lunarText,
      ),
    ],
  );
};

// 切换休息日状态
const toggleOffDay = async (date: Dayjs) => {
  const key = date.format('YYYY-MM-DD');
  const newArr = [...offDays.value];
  try {
    if (newArr.includes(key)) {
      // 删除存在的日期
      offDays.value = newArr.filter((d) => d !== key);
      await personnelCalendarConfigRemove(key);
      console.log('删除成功:', key);
    } else {
      // 添加新日期
      offDays.value = [...newArr, key];
      await personnelCalendarConfigAdd(key);
      console.log('添加成功:', key);
    }
  } catch (error) {
    console.error('操作失败:', error);
    // 回滚操作
    offDays.value = newArr;
  }
};

// 年份变化处理
const handleYearChange = () => {
  offDays.value = [];
  fetchData();
};
const getMonthStart = (month: number) => {
  return dayjs()
    .year(selectedYear.value)
    .month(month - 1)
    .startOf('month');
};

const getMonthEnd = (month: number) => {
  return dayjs()
    .year(selectedYear.value)
    .month(month - 1)
    .endOf('month');
};
onMounted(() => {
  fetchData();
});
const fetchData = async () => {
  personnelCalendarConfigList({ year: selectedYear.value }).then((res) => {
    offDays.value = res;
  });
};
</script>

<template>
  <div class="container">
    <div class="year-selector">
      <Select
        v-model:value="selectedYear"
        style="width: 120px"
        :options="yearOptions"
        @change="handleYearChange"
      />
      <Tag color="processing">
        <template #icon>
          <ExclamationCircleOutlined />
        </template>
        日历配置中黑色为上班日，红色为休息日, 点击日期可以切换休息日状态
      </Tag>
    </div>

    <div class="calendar-grid">
      <div v-for="month in 12" :key="month">
        <Calendar
          :value="getMonthDate(month)"
          :valid-range="[getMonthStart(month), getMonthEnd(month)]"
          :fullscreen="false"
          mode="month"
          :header-render="() => headerRender(month)"
          :full-cell-render="dateCellRender"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

.year-selector {
  margin-bottom: 24px;
  text-align: center;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.calendar-item {
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}
:deep(.ant-picker-cell:not(.ant-picker-cell-in-view)) {
  display: table-cell;
  visibility: hidden;
  pointer-events: none;
}

:deep(.ant-picker-content) {
  table-layout: fixed;
}

:deep(.ant-picker-cell) {
  width: calc(100% / 7);
  height: 45px;
}
:deep(.custom-header) {
  background: linear-gradient(135deg, #6cb0f3 0%, #e9ecef 100%);
  border-radius: 3px 3px 0 0;
  padding: 2px 0;
}

:deep(.header-content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

:deep(.month) {
  font-size: 20px;
  font-weight: 600;
  color: #495057;
}

:deep(.date-cell) {
  font-weight: 500;
  font-size: 15px;
}

.date-cell:hover {
  background: #f5f5f5;
}

:deep(.date-cell.off-day) {
  color: #ee1c0d;
}

:deep(.date-cell.off-day:hover) {
  background: #ffccc7;
}
:deep(.solar) {
  font-size: 16px;
  font-weight: 500;
}
:deep(.lunar) {
  font-size: 12px;
}
:deep(.ant-picker-calendar) {
  width: 100%;
}

:deep(.ant-picker-panel) {
  border: none;
}

:deep(.ant-picker-cell-inner) {
  min-height: 45px;
}
:deep(.ant-picker-cell:hover) {
  background: #90d4f3;
}
</style>
