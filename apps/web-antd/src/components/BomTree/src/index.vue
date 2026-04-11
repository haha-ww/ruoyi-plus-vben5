<script setup name="BomTree" lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue';

// 导入LogicFlow相关库
import LogicFlow from '@logicflow/core';
import { Menu } from '@logicflow/extension';
import { Dagre } from '@logicflow/layout';
import {Drawer} from 'antdv-next'

import { getMaterialBomTree } from '#/api/erp/materialBom';

import '@logicflow/core/lib/style/index.css';
import '@logicflow/extension/lib/style/index.css';
// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  bomId: {
    type: [String, Number],
    default: ''
  },
  // 是否使用模拟数据，默认为false
  useMockData: {
    type: Boolean,
    default: false
  }
});
// Emits
const emit = defineEmits(['update:visible']);
// 注册插件
LogicFlow.use(Menu);
const logicFlowContainer = ref<HTMLElement | null>(null);
const dialogVisible = ref(props.visible);
let lf: any = null;

// 监听props.visible变化，同步到本地ref
watch(
  () => props.visible,
  async (newVal) => {
    dialogVisible.value = newVal;
    if (newVal) {
      // 使用nextTick确保DOM已渲染
      await nextTick();
      initLogicFlow();
    } else {
      // 销毁实例
      if (lf) {
        lf.destroy();
        lf = null;
      }
    }
  }
);

// 监听本地dialogVisible变化，通知父组件
watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal);
});

// 监听bomId变化，重新渲染BOM树
// watch(
//   () => props.bomId,
//   async (newVal) => {
//     if (newVal && props.visible) {
//       await nextTick();
//       initLogicFlow();
//     }
//   }
// );

// 生成BOM树数据
const nodes: any[] = [];
const edges: any[] = [];
// 获取BOM详情，包括子项
// 处理根节点

// 递归处理BOM节点和子节点
const processBomNode = (bomNode: any, parentId: string, level: number, position: number, totalSiblings: number) => {
  const nodeId = bomNode.parentId + bomNode.bomId;
  const isBomNode = bomNode.isBomNode;
  // 添加节点
  const nodeText = isBomNode
    ? `📦${bomNode.materialName} \n${bomNode.materialCode}\n版本: ${bomNode.bomVersion || ''}\n数量: ${bomNode.planQuantity || 0} ${bomNode.unitName || ''}`
    : `🧩${bomNode.materialName}\n${bomNode.materialCode}\n物料属性：${bomNode.supplyModeName || ''}\n数量: ${bomNode.planQuantity || 0} ${bomNode.unitName || ''}`;

  nodes.push({
    id: nodeId,
    type: 'rect',
    x: 100 * level + 50, // 根据层级设置x坐标
    y: 100 * position + 50, // 根据位置设置y坐标
    text: {
      value: `${nodeText}`,
      x: 100 * level + 50,
      y: 100 * position + 50,
      fontSize: 12,
      lineHeight: 1.4
    },
    // LogicFlow 2.x使用style属性设置样式
    properties: {
      'style': {
        fill: isBomNode ? '#e6f7ff' : '#f6ffed',
        stroke: isBomNode ? '#1890ff' : '#52c41a'
      },
      width: 200,
      height: 70
    }
  });

  // 添加与父节点的连接（如果不是根节点）
  if (parentId) {
    // 使用锚点连接，确保从父节点底部到子节点顶部
    edges.push({
      id: `edge-${parentId}-${nodeId}`,
      sourceNodeId: parentId,
      targetNodeId: nodeId,
      // 指定使用自定义锚点
      type: 'polyline'
    });
  }

  // 递归处理子节点
  if (bomNode.children && bomNode.children.length > 0) {
    bomNode.children.forEach((subItem: any, index: number) => {
      processBomNode(subItem, nodeId, level + 1, index, bomNode.children.length);
    });
  }
};
/** 初始化LogicFlow */
const initLogicFlow = async () => {
  // 清除之前的实例
  if (lf) {
    lf.destroy();
  }
  nodes.length = 0;
  edges.length = 0;
  // 使用 ref 获取容器DOM元素
  const containerElement = logicFlowContainer.value;
  if (!containerElement) {
    console.error('LogicFlow container not found');
    return;
  }

  // 创建新的LogicFlow实例
  lf = new LogicFlow({
    container: containerElement,
    width: containerElement.offsetWidth || 800,
    height: 600,
    plugins: [Menu, Dagre],
    // 配置连线样式和路由
    edgeType: 'polyline'
  });
  const bomDetail = await getMaterialBomTree({ bomId: props.bomId, quantity: 1 });
  console.log('bomDetail', bomDetail);
  processBomNode(bomDetail[0], '', 0, 0, 1);
  // 设置数据并渲染
  lf.render({
    nodes,
    edges
  });
  aaa();
};

const aaa = async () => {
  // 在数据渲染后应用dagre布局
  if (lf && lf.extension && lf.extension.dagre) {
    await nextTick();
    lf.extension.dagre.layout({
      rankdir: 'TB', // 从上到下布局
      align: 'DL',
      isDefaultAnchor: true,
      ranksep: 50, // 层级间距
      nodesep: 30 // 同层节点间距
    });
    lf.fitView();
  }
};
onUnmounted(() => {
  // 销毁LogicFlow实例
  if (lf) {
    lf.destroy();
  }
});
</script>

<template>
  <Drawer title="查看BOM树" v-model:open="dialogVisible" size="70%" :append-to-body="true" :closable="{ placement: 'end' }">
    <div class="bom-tree-container">
      <!-- 图例说明 -->
      <div class="legend">
        <div class="legend-title">图例说明</div>
        <div class="legend-items">
          <div class="legend-item">
            <div class="legend-node bom-node"></div>
            <span>BOM节点</span>
          </div>
          <div class="legend-item">
            <div class="legend-node material-node"></div>
            <span>物料节点</span>
          </div>
        </div>
      </div>
      <!-- LogicFlow容器 -->
      <div id="logicFlowContainer" ref="logicFlowContainer" class="logicflow-container"></div>
    </div>
  </Drawer>
</template>

<style scoped>
.bom-tree-container {
  width: 100%;
  height: 600px;
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
  position: relative;
}

/* 图例样式 */
.legend {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 200px;
}

.legend-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
}

.legend-node {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.legend-node.bom-node {
  background: #e6f7ff;
  border-color: #1890ff;
}

.legend-node.material-node {
  background: #f6ffed;
  border-color: #52c41a;
}

.logicflow-container {
  width: 100%;
  height: 100%;
  padding: 20px;
}

/* 自定义对话框样式 */
:deep(.el-dialog__body) {
  padding: 20px;
  background: #fff;
}

:deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
</style>
