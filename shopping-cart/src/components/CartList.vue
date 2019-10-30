<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">购物车信息</h4>
    </div>
    <div class="panel-body">
      <p v-if="!cartItems.length" class="text-center text-warning">暂无商品，请添加商品</p>
      <!-- 购物车商品列表开始 -->
      <CartListItem v-for="cartItem in cartItems" :key="cartItem.id" :cartItem="cartItem" />
      <!-- 购物车商品列表结束 -->
      <button type="button" class="btn btn-danger btn-block" @click="clearCartItems">清空购物车（总数量：{{cartQuantity}}）</button>
      <button type="button" class="btn btn-info btn-block">结算（￥{{cartTotal}}）</button>
    </div>
  </div>
</template>
<script>
import CartListItem from './CartListItem.vue'

export default {
  name: 'CartList',
  computed: {
    cartItems () {
      // 拆分 store.js 之前获取数据的方式
      // return this.$store.state.cartItems
      // 拆分 store.js 之后获取数据的方式
      return this.$store.state.cartModule.cartItems
    },
    cartTotal () {
      return this.$store.getters.cartTotal
    },
    cartQuantity () {
      return this.$store.getters.cartQuantity
    }
  },
  methods: {
    clearCartItems () {
      this.$store.dispatch('clearCartItems')
    }
  },
  components: {
    CartListItem
  }
}
</script>
