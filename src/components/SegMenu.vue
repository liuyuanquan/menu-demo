<template>
  <ul
    role="menubar"
    class="seg-menu"
  >
    <slot></slot>
  </ul>
</template>
<script>
import bus from './bus'

export default {
  name: 'SegMenu',
  componentName: 'SegMenu',
  provide() {
    return {
      rootMenu: this,
      paddingLeft: this.paddingLeft
    }
  },
  props: {
    defaultActive: {
      type: String,
      default: ''
    },
    defaultOpeneds: {
      type: Array,
      default() {
        return []
      }
    },
    uniqueOpened: {
      type: Boolean,
      default: true
    },
    paddingLeft: {
      type: Number,
      default: 24
    }
  },
  data() {
    return {
      activeIndex: this.defaultActive,
      openedMenus: this.defaultOpeneds,
      items: {},
      submenus: {}
    }
  },
  watch: {
    defaultActive(value) {
      if (!this.items[value]) {
        this.activeIndex = null
      }
      this.updateActiveIndex(value)
    },
    defaultOpeneds(value) {
      this.openedMenus = value
    },
  },
  methods: {
    updateActiveIndex(val) {
      const item = this.items[val] || this.items[this.activeIndex] || this.items[this.defaultActive]
      if (item) {
        this.activeIndex = item.index
        this.initOpenedMenu()
      } else {
        this.activeIndex = null
      }
    },
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
    // 打开菜单
    openMenu(index, indexPath) {
      let openedMenus = this.openedMenus
      // 已经打开
      if (openedMenus.indexOf(index) !== -1) return
      // 关闭其他路径上已经打开的菜单
      if (this.uniqueOpened) {
        this.openedMenus = openedMenus.filter(index => {
          return indexPath.indexOf(index) !== -1
        })
      }
      this.openedMenus.push(index)
    },
    // 关闭菜单
    closeMenu(index) {
      const i = this.openedMenus.indexOf(index)
      if (i !== -1) {
        this.openedMenus.splice(i, 1)
      }
    },
    handleSubmenuClick(submenu) {
      const { index, indexPath } = submenu
      this.activeIndex = index
      let isOpened = this.openedMenus.indexOf(index) !== -1
      if (isOpened) {
        this.closeMenu(index)
        this.$emit('close', index, indexPath, submenu)
      } else {
        this.openMenu(index, indexPath)
        this.$emit('open', index, indexPath, submenu)
      }
    },
    handleItemClick(item) {
      const { index, indexPath } = item
      this.activeIndex = index
      this.$emit('select', index, indexPath, item)
    },
    initOpenedMenu() {
      const index = this.activeIndex
      const activeItem = this.items[index]
      if (!activeItem) return

      let indexPath = activeItem.indexPath
      indexPath.forEach(index => {
        let submenu = this.submenus[index]
        submenu && this.openMenu(index, submenu.indexPath)
      })
    },
    open(index) {
      const submenu = this.submenus[String(index)]
      if (submenu) {
        submenu.indexPath.forEach(i => this.openMenu(i, indexPath))
      }
    },
    close(index) {
      this.closeMenu(index)
    }
  },
  mounted() {
    this.initOpenedMenu()
    bus.$on('item-click', this.handleItemClick)
    bus.$on('submenu-click', this.handleSubmenuClick)
    this.$watch('items', this.updateActiveIndex)
  }
}
</script>
<style>
ul.seg-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}
.seg-menuitem {
  font-size: 16px;
  font-weight: 400;
  height: 44px;
  display: flex;
  align-items: center;
  color: rgba(20, 33, 51, 1);
}
.seg-submenu__title {
  font-size: 16px;
  font-weight: 400;
  height: 44px;
  display: flex;
  align-items: center;
  color: rgba(20, 33, 51, 1);
}
.is-active > .seg-submenu__title,
.is-active.seg-menuitem {
  background-color: rgba(84,175,240,0.30);
}
.seg-submenu__icon-arrow {
  display: block;
  flex: none;
  width: 24px;
  height: 24px;
  background-image: url('./arrow-down.svg');
  background-size: 100%;
  transform-origin: 50% 50%;
  transition: transform .5s linear;
  transform: rotate(-90deg);
  content: '';
}
.is-opened > .seg-submenu__title > .seg-submenu__icon-arrow {
  transform: rotate(0deg);
}
</style>