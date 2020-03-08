<template>
  <li 
    :class="{
      'seg-menuitem': true,
      'is-active': active,
      'is-disabled': disabled
    }"
    :style="[paddingStyle]"
    role="menuitem"
    @click="handleClick"
    :index-path="indexPath"
    :level="indexPath.length"
  >
    <slot></slot>
  </li>
</template>
<script>
import menuMixins from './menu-mixin'
import bus from './bus'

export default {
  name: 'SegMenuitem',
  componentName: 'SegMenuitem',
  mixins: [menuMixins],
  props: {
    index: String,
    disabled: Boolean,
  },
  computed: {
    active() {
      return this.index === this.rootMenu.activeIndex
    },
  },
  methods: {
    handleClick() {
      bus.$emit('item-click', this)
    }
  },
  mounted() {
    this.parentMenu.addItem(this)
    this.rootMenu.addItem(this)
  },
  beforeDestroy() {
    this.parentMenu.removeItem(this)
    this.rootMenu.removeItem(this)
  }
}
</script>