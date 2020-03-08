<template>
  <li
    :class="{
      'seg-submenu': true,
      'is-active': active,
      'is-opened': opened,
      'is-disabled': disabled
    }"
    role="menuitem"
  >
    <div 
      class="seg-submenu__title"
      :index-path="indexPath"
      :level="indexPath.length"
      @click="handleClick"
      :style="[paddingStyle]"
    >
      <i class="seg-submenu__icon-arrow"></i>
      <slot name="title"></slot>
    </div>
    <el-collapse-transition>
      <ul
        role="menu"
        class="seg-menu"
        v-show="opened"
      >
        <slot></slot>
      </ul>
    </el-collapse-transition>
  </li>
</template>
<script>
import ElCollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import menuMixins from './menu-mixin'
import bus from './bus'

export default {
  name: 'SegSubmenu',
  componentName: 'SegSubmenu',
  mixins: [menuMixins],
  components: {
    ElCollapseTransition
  },
  props: {
    index: {
      default: String,
      required: true,
    },
    disabled: Boolean,
  },
  data() {
    return {
      items: {},
      submenus: {}
    }
  },
  watch: {},
  computed: {
    opened() {
      return this.rootMenu.openedMenus.indexOf(this.index) > -1
    },
    active() {
      // let isActive = false
      // const submenus = this.submenus
      // const items = this.items
      // Object.keys(items).forEach(index => {
      //   if (items[index].active) {
      //     isActive = true
      //   }
      // })
      // Object.keys(submenus).forEach(index => {
      //   if (submenus[index].active) {
      //     isActive = true
      //   }
      // })
      // return isActive
      return this.index === this.rootMenu.activeIndex
    },
  },
  methods: {
    addItem(item) {
      this.$set(this.items, item.index, item)
    },
    removeItem(item) {
      delete this.items[item.index]
    },
    addSubmenu(item) {
      this.$set(this.submenus, item.index, item)
    },
    removeSubmenu(item) {
      delete this.submenus[item.index]
    },
    handleClick() {
      bus.$emit('submenu-click', this)
    }
  },
  mounted() {
    this.parentMenu.addSubmenu(this)
    this.rootMenu.addSubmenu(this)
  },
  beforeDestroy() {
    this.parentMenu.removeSubmenu(this)
    this.rootMenu.removeSubmenu(this)
  }
}
</script>