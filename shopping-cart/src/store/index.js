import Vue from 'vue'
import Vuex from 'vuex'

// 自动导入 './modules/cart' 目录下的 index.js 文件，因此此处可以省略 index.js
import cartModule from './modules/cart'
import productModule from './modules/product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cartModule,
    productModule
  }
})
