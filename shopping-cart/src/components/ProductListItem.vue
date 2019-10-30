<template>
  <div class="col-xs-12 col-sm-6 col-md-4">
    <div class="thumbnail">
      <div class="caption">
        <h4>{{productItem.title}}</h4>
        <p>{{productItem.description}}</p>
        <p>单价：{{productItem.price}}<a href="#" class="btn btn-link btn-xs pull-right" role="button" @click.prevent="addToCart(productItem)">加入购物车</a></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductListItem',
  props: ['productItem'],
  methods: {
    addToCart (productItem) {
      this.$store.dispatch('addToCart', productItem)
    }
  }
}
</script>
