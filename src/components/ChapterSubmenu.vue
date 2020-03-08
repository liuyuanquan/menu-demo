<template>
  <seg-submenu :index="String(chapter.id)" :disabled="disabledMenuItem(chapter)">
    <template #title>
      {{chapter.name}}
    </template>
    <div v-for="sub in chapter.subList" :key="sub.id">
      <template v-if="sub.metaLeaf">
        <chapter-menuitem :chapter="sub"/>
      </template>
      <template v-else>
        <chapter-submenu :chapter="sub"/>
      </template>
    </div>
  </seg-submenu>
</template>
<script>
import SegSubmenu from './SegSubmenu'
import ChapterMenuitem from './ChapterMenuitem'

export default {
  name: 'ChapterSubmenu',
  props: {
    chapter: Object,
  },
  inject: ['disabledMenuItem'],
  components: {
    ChapterMenuitem,
    SegSubmenu
  }
}
</script>