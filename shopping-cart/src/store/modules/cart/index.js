import axios from 'axios'

const state = {
  cartItems: []
}

const mutations = {
  UPDATE_CART_ITEMS (state, cartItems) {
    state.cartItems = cartItems
  }
}

const actions = {
  getCartItems ({ commit }) {
    // 发送 Ajax 获取数据
    axios.get('/api/cart').then(response => {
      commit('UPDATE_CART_ITEMS', response.data)
    })
  },
  addToCart ({ commit }, productItem) {
    axios.post('/api/cart', productItem).then(response => {
      commit('UPDATE_CART_ITEMS', response.data)
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
  }
}

const getters = {
  cartQuantity: (state) => {
    return state.cartItems.reduce((totalQuantity, cartItem) => {
      return totalQuantity + cartItem.quantity
    }, 0)
  },
  cartTotal: (state) => {
    return state.cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price
    }, 0).toFixed(2)
  }
}

const cartModule = {
  state,
  mutations,
  actions,
  getters
}

export default cartModule
