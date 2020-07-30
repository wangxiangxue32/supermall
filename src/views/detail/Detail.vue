<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scrollEvent="contentScroll">
      <!--<ul>-->
        <!--<li v-for="item in $store.state.cartList">{{ item }}</li>-->
      <!--</ul>-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCartEvent="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <!--<toast :message="message" :is-show="isShow"/>-->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from "common/utils";
  import {backTopMixin} from 'common/mixin'

  import {mapActions} from 'vuex'

  // import Toast from 'components/common/toast/Toast'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodsList,

      // Toast
    },
    mixins: [backTopMixin],
    data(){
      return{
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themesTopY: [],
        getThemeTopY: null,
        currentIndex: 0,

        // message: '',
        // isShow: false
      }
    },
    created(){
      //1. 保存传入的 iid
      this.iid = this.$route.params.iid

      //2.根据 iid 请求详情数据
      getDetail(this.iid).then(res => {
        //1.获取顶部图片轮播数据
        // console.log(res);
        const data = res.result
        this.topImages = res.result.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //6.取出评论信息
        if (data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        // this.$nextTick(() => {
        //   //此时 DOM 渲染完成，但是图片未加载完成，所以 offsetTop 不包含图片的高度
        //   this.themesTopY = []
        //   const topHigh = 44
        //   this.themesTopY.push(0 - topHigh);
        //   this.themesTopY.push(this.$refs.params.$el.offsetTop - topHigh)
        //   this.themesTopY.push(this.$refs.comment.$el.offsetTop - topHigh)
        //   this.themesTopY.push(this.$refs.recommend.$el.offsetTop - topHigh)
        //
        //   console.log(this.themesTopY);
        // })
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      //4.给 getThemeTopY 赋值(对此操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themesTopY = []
        const topHigh = 44
        this.themesTopY.push(0 - topHigh);
        this.themesTopY.push(this.$refs.params.$el.offsetTop - topHigh)
        this.themesTopY.push(this.$refs.comment.$el.offsetTop - topHigh)
        this.themesTopY.push(this.$refs.recommend.$el.offsetTop - topHigh)
        // console.log(this.themesTopY);
      },100)
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('detailItemImageLoad',() => {
        refresh()
      })
    },
    methods: {
      ...mapActions(['addCart']),
      //监听图片是否加载完成
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themesTopY[index],200)
      },
      contentScroll(position){
        //1.获取 y 值
        const positionY = -position.y

        //2.positionY 和主题中值进行对比
        let length = this.themesTopY.length
        // for (let i in this.themesTopY){
        //   // if (positionY > this.themesTopY[parseInt(i)] && positionY < this.themesTopY[i+1]){}
        //   if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themesTopY[i] && positionY < this.themesTopY[i+1]) || (i === length-1 && positionY >= this.themesTopY[i]))){
        //     this.currentIndex = i
        //     console.log(this.currentIndex);
        //     this.$refs.detailNav.currentIndex = this.currentIndex
        //   }
        // }
        for (let i = 0; i < length; i++){
          if (
            this.currentIndex !== i &&
            ((positionY >= this.themesTopY[i] && positionY < this.themesTopY[i+1]) || (positionY >= this.themesTopY[i]))
          ) {
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = i
          }
        }

        //3.是否显示回到顶部
        // this.isShowBackTop = (-position.y) > 1000
        this.listenShowBackTop(position)
      },

      //点击加入购物车
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //2.将商品添加到购物车里
        // this.$store.commit('addCart',product)
        this.addCart(product).then(res => {
          //原始 toast 方法的设计
          // this.isShow = true
          // this.message = res
          // setTimeout(() => {
          //   this.isShow = false
          //   this.message = ''
          // },1500)

          this.$toast.show(res)
        })

        // this.$store.dispatch('addCart',product).then(res => {
        //   //3.添加到购物车成功的提示
        // })
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }
  
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: white;
  }

  .content{
    height: calc(100% - 44px - 49px);
  }
</style>
