export default {
  inject: ['rootMenu', 'paddingLeft'],
  computed: {
    indexPath() {
      const path = [this.index]
      let parent = this.$parent
      while (parent.$options.componentName !== 'SegMenu') {
        if (parent.index) {
          path.unshift(parent.index)
        }
        parent = parent.$parent
      }
      return path
    },
    parentMenu() {
      let parent = this.$parent
      while (parent && ['SegMenu', 'SegSubmenu'].indexOf(parent.$options.componentName) === -1) {
        parent = parent.$parent
      }
      return parent
    },
    paddingStyle() {
      let padding = this.paddingLeft
      let parent = this.$parent
      while (parent && parent.$options.componentName !== 'SegMenu') {
        if (parent.$options.componentName === 'SegSubmenu') {
          padding += this.paddingLeft
        }
        parent = parent.$parent
      }
      return {
        paddingLeft: padding + 'px',
        paddingRight: this.paddingLeft + 'px'
      }
    }
  }
}