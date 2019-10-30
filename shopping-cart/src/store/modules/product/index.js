import axios from 'axios'

const state = {
  productItems: []
}

const mutations = {
  UPDATE_PRODUCT_ITEMS (state, productItems) {
    state.productItems = productItems
  }
}

const actions = {
  getProductItems ({ commit }) {
    // 发送 Ajax 获取数据
    axios.get('/api/product').then(response => {
      commit('UPDATE_PRODUCT_ITEMS', response.data)
    })
  }
}

const productModule = {
  state,
  mutations,
  actions
}

export default productModule
