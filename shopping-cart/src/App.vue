<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-4">
        <!-- 购物车开始 -->
        <CartList />
        <!-- 购物车结束 -->
      </div>
      <div class="col-xs-12 col-sm-8">
        <!-- 商品列表开始 -->
        <ProductList />
        <!-- 商品列表结束 -->
      </div>
    </div>

  </div>
</template>

<script>
import CartList from './components/CartList.vue'
import ProductList from './components/ProductList.vue'
export default {
  name: 'app',
  created () {
    // 获取购物车中的数据
    this.$store.dispatch('getCartItems')
    // 获取商品列表数据
    this.$store.dispatch('getProductItems')
  },
  components: {
    CartList,
    ProductList
  }
}
</script>
