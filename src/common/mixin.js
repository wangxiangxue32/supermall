import {debounce} from "./utils";
import BackTop from 'components/content/backTop/BackTop'


/**
 * 在不同的组件中有相同的重复代码时
 *  可以使用混入 mixin 统一导入使用
 *
 *  import {方法名} from '路径'
 *  mixin: [方法名]
 * @type {{mounted(): void}}
 */
export const itemListenerMixin = {
  mounted(){
    let refresh = debounce(this.$refs.scroll.refresh, 100)
    this.homeItemImageLoad = () => {
      refresh()
    }
    this.$bus.$on('homeItemImageLoad',this.homeItemImageLoad)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick(){
      //取到 Scroll 组件中的 scroll，调用 scrollTo 方法返回顶部
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0,0)
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
