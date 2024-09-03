<template>
  <div>
    <el-tree
      ref="tree"
      class="file_tree unselect"
      :node-key="nodeKey"
      :empty-text="emptText"
      :data="curTreeData"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :indent="18"
      :highlight-current="isHighlightCurrent"
      :default-expanded-keys="curExpandedArray"
      :default-checked-keys="defaultCheckedKeys"
      :show-checkbox="isShowCheckbox"
      :current-node-key="currentKey"
      v-bind="$attrs"
      @node-expand="nodeExpand"
      @node-collapse="nodeCollapse"
      v-on="$listeners"
    >
      <span
        slot-scope="{ node, data }"
        class="custom-tree-node father"
        @mouseenter="handleMouseenter(data)"
      >
        <el-input
          v-if="node.editing"
          :ref="'input' + data.id"
          :key="data.id"
          v-model="data[defaultProps.label]"
          class="text_limit_wrap full_width"
          size="mini"
          maxlength="20"
          @keyup.enter.native="$event.target.blur()"
          @blur="handleBlur(node, data)"
          @click.native.stop
        />
        <template v-else>
          <span class="text_limit_wrap">
            <!-- 图标 -->
            <i :class="iconName(data.nodeType, node, data)" />
            <!-- 文字 -->
            <span class="text_limit" :title="node.label">{{ node.label }}</span>
            <!-- 下拉菜单 -->
            <span class="child" @click.stop>
              <el-dropdown
                class="tree_dropdown"
                size="mini"
                trigger="click"
                @command="handleCommand"
              >
                <span class="el-dropdown-link">
                  <i class="el-icon-more" style="transform: rotate(90deg)" />
                </span>
                <el-dropdown-menu slot="dropdown" class="tree_dropdown_menu">
                  <el-dropdown-item
                    v-for="(optItem, index) in getCommandDropDataList(data)"
                    :key="optItem.option + index"
                    :command="{
                      event: optItem.event,
                      option: optItem.option,
                      node,
                      data,
                    }"
                    :icon="optItem.icon"
                  >
                    {{ optItem.name }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        </template>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'FileTree',
  props: {
    // 是否点击高亮
    isHighlightCurrent: {
      type: Boolean,
      default: true
    },
    isDraggable: {
      type: Boolean,
      default: false
    },
    // 树组件 数据
    treeData: {
      type: Array,
      default: () => []
    },
    // 树组件 props
    defaultProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 默认展开的节点的 key 的数组
    expandedTreeKeys: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 最大层级 0 -- 不限制
    maxLevel: {
      type: Number,
      default: 0
    },
    // 空白数据的回显值
    emptText: {
      type: String,
      default: ''
    },
    currentKey: {
      type: [String, Number],
      default: () => {
        return ''
      }
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    isShowCheckbox: {
      type: Boolean,
      default: false
    },
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    // 右侧下拉菜单
    commandDropData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      curTreeData: [],
      curExpandedArray: []
    }
  },
  computed: {
    iconName() {
      return (nodeType, node, data) => {
        const ternary = node.expanded
          ? 'el-icon-folder-opened'
          : 'el-icon-folder'
        const type = {
          folder: node.isLeaf ? 'el-icon-folder' : ternary,
          report: 'iconfont el-icon-document'
        }
        return type[nodeType]
      }
    }
  },
  watch: {
    treeData: {
      handler(value) {
        this.curTreeData = value
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    nodeExpand(data) {
      if (data.id) {
        this.curExpandedArray.push(data.id)
      }
    },
    nodeCollapse(data) {
      if (data.id) {
        this.curExpandedArray.splice(this.curExpandedArray.indexOf(data.id), 1)
      }
    },
    // 处理节点过滤
    filterNode(value, data) {
      if (!value) return true
      return data[this.defaultProps.label].indexOf(value) !== -1
    },
    // 监听下拉选项点击操作
    handleCommand(command) {
      this.$emit('clickDropCommand', command)
    },
    getCommandDropDataList(data) {
      return this.commandDropData[data.nodeType]
    },
    handleMouseenter(data) {
      this.$emit('customSetsMouseenter', data)
    }
  }
}
</script>
<style lang='scss' scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 1px;

  .el-input {
    box-shadow: 0px 0px 10px 0px #eeeeee;
    border-radius: 4px;

    :deep(.el-input__inner) {
      height: 32px;
      line-height: 32px;
      color: #000000;
      font-size: 14px;
      font-weight: 400;
      font-family: inherit;
      letter-spacing: 1px;

      &:focus {
        border-color: #d0e0f5;
      }
    }
  }

  .text_limit_wrap {
    display: flex;
    align-items: center;
    flex: 1 1 0%;
    width: 0;
    .text_limit {
      margin-left: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    img {
      width: 12px;
      height: 12px;
    }
  }
  .full_width {
    position: absolute;
    left: 0;
    width: 100%;
    font-size: 14px;
  }

  &.father {
    .child {
      margin-right: 5px;
      opacity: 0;
      transition: 0.25s ease-in-out;
    }
    &:hover {
      .child {
        opacity: 1;
      }
    }
  }
}
.file_tree {
  color: #000000;

  :deep(.el-tree__empty-text) {
    font-size: 14px;
    color: #bfbfbf;
  }

  &.el-tree--highlight-current {
    :deep(.el-tree-node.is-current > .el-tree-node__content) {
      background-color: #2c86ff1a;
      color: #1f6df1;
    }
  }
  :deep(.el-tree-node__content) {
    border-radius: 4px;
    height: 32px;
    display: flex;
    transition: 0.25s ease-in-out;
    line-height: 32px;
    margin-bottom: 8px;
    &:hover {
      background-color: #f6f7f9;
    }
  }
}
</style>
