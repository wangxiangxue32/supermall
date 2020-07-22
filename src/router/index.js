import Vue from 'vue'
import VueRouter from 'vue-router'

//路由懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const ShoppingCart = () => import('../views/shoppingCart/ShoppingCart')
const Mine = () => import('../views/mine/Mine')

//1.安装插件
Vue.use(VueRouter)

//2.创建 router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shoppingCart',
    component: ShoppingCart
  },
  {
    path: '/mine',
    component: Mine
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
