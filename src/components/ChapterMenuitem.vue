<template>
  <seg-menuitem :index="String(chapter.id)" :disabled="disabledMenuItem(chapter)">
    {{chapter.name}}
  </seg-menuitem>
</template>
<script>
import SegMenuitem from './SegMenuitem'

export default {
  name: 'ChapterMenuItem',
  components: {
    SegMenuitem
  },
  inject: ['disabledMenuItem'],
  props: {
    chapter: Object
  },
}
</script>