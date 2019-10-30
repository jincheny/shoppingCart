<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">商品列表</h4>
    </div>
    <div class="panel-body">
      <div class="row">
        <!-- 单个产品信息开始 -->
        <ProductListItem v-for="productItem in productItems" :key="productItem.id" :productItem="productItem" />
        <!-- 单个产品信息结束 -->
      </div>
    </div>
    <div class="panel-footer text-right">
      总数量：{{productItems.length}}
    </div>
  </div>
</template>

<script>
import ProductListItem from './ProductListItem.vue'
export default {
  name: 'ProductList',
  computed: {
    productItems () {
      // 拆分 store.js 之前获取数据的方式
      // return this.$store.state.productItems
      // 拆分 store.js 之后获取数据的方式
      return this.$store.state.productModule.productItems
    }
  },
  components: {
    ProductListItem
  }
}
</script>
