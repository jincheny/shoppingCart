import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartItems: [],
    productItems: []
  },
  mutations: {
    UPDATE_PRODUCT_ITEMS (state, productItems) {
      state.productItems = productItems
    },
    UPDATE_CART_ITEMS (state, cartItems) {
      state.cartItems = cartItems
    }
  },
  actions: {
    getCartItems ({ commit }) {
      // 发送 Ajax 获取数据
      axios.get('/api/cart').then(response => {
        commit('UPDATE_CART_ITEMS', response.data)
      })
    },
    addToCart ({ commit }, productItem) {
      axios.post('/api/cart', productItem).then(response => {
        commit('UPDATE_CART_ITEMS', response.data)
        console.log(productItem)
        console.log(response.data)
      })
    },
    removeCartItem ({ commit }, cartItemId) {
      axios.delete('/api/cart/delete', { params: { id: cartItemId } }).then(response => {
        commit('UPDATE_CART_ITEMS', response.data)
      })
    },
    clearCartItems ({ commit }) {
      axios.delete('/api/cart/delete/all').then(response => {
        commit('UPDATE_CART_ITEMS', response.data)
      })
    },
    getProductItems ({ commit }) {
      // 发送 Ajax 获取数据
      axios.get('/api/product').then(response => {
        commit('UPDATE_PRODUCT_ITEMS', response.data)
      })
    }
  },
  getters: {
    cartQuantity: (state) => {
      return state.cartItems.reduce((totalQuantity, cartItem) => {
        return totalQuantity + cartItem.quantity
      }, 0)
    },
    cartTotal: (state) => {
      return state.cartItems.reduce((total, cartItem) => {
        return total + cartItem.quantity * cartItem.price
      }, 0).toFixed(2)

      // 等价于：
      // let total = 0;
      // state.cartItems.forEach(cartItem => {
      //   total += cartItem.quantity * cartItem.price
      // })
      // return total.toFixed(2);
    }
  }
})
