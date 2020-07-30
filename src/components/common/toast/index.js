import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  //1.创建组建构造器
  const toastContrustor = Vue.extend(Toast)

  //2.new 的方式，根据组建构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  //3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  //4.toast.$el 对应的就是 div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
