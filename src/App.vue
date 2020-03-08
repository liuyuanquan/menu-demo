<template>
  <div id="app">
    <seg-menu 
      :defaultActive="defaultActive"
      @select="selectChapter" 
      @open="selectChapter" 
      @close="selectChapter" 
      ref="segMenu" 
      uniqueOpened
      v-if="chapterList.length"
    >
      <div v-for="chapter in chapterList" :key="chapter.id">
        <template v-if="chapter.metaLeaf">
          <chapter-menuitem :chapter="chapter" />
        </template>
        <template v-else>
          <chapter-submenu :chapter="chapter" />
        </template>
      </div>
    </seg-menu>
  </div>
</template>

<script>
import result from './data.json'
import SegMenu from './components/SegMenu'
import ChapterMenuitem from './components/ChapterMenuitem'
import ChapterSubmenu from './components/ChapterSubmenu'

export default {
  name: 'App',
  provide() {
    return {
      disabledMenuItem: this.disabledMenuItem,
    }
  },
  components: {
    SegMenu,
    ChapterMenuitem,
    ChapterSubmenu
  },
  data() {
    return {
      defaultActive: '',
      chapterList: []
    }
  },
  methods: {
    disabledMenuItem(chapter) {
      if (this.currentTab === 1 || this.currentTab === "") {
        if (!chapter.teachingMaterialFlag) {
          return true
        } else {
          return false
        }
      } else if (this.currentTab === 2) {
        if (!chapter.existElectronicMaterialFlag) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    selectChapter() {

    }
  },
  mounted() {
    if (result.success) {
      const {data} = result
      this.chapterList = data.chapterList
    }
  }
}
</script>
<style>
#app {
  width: 500px;
}
.is-disabled {
  color: rgba(20, 33, 51, .5);
}
.seg-menuitem[level="1"], 
.seg-submenu__title[level="1"] {
  height: 60px;
  font-size: 18px;
  font-weight: 600;
}
.is-disabled > .seg-submenu__title[level="1"],
.seg-menuitem.is-disabled[level="1"] {
  color: rgba(20, 33, 51, 1);
}
</style>
