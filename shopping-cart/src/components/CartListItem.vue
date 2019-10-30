<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <div class="media">
        <div class="media-body">
          <h4 class="media-heading">{{cartItem.title}}
            <span class="pull-right">
              <a href="" class="btn btn-default btn-xs" @click.prevent="removeCartItem(cartItem.id)">
                <span class="glyphicon glyphicon-minus"></span>
              </a>
              <a href="" class="btn btn-default btn-xs" @click.prevent="addToCart(cartItem)">
                <span class="glyphicon glyphicon-plus"></span>
              </a>
            </span>
          </h4>
          <p><span class="text-danger">单价：{{cartItem.price}}</span><span class="text-info pull-right">数量：{{cartItem.quantity}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CartListItem',
  props: ['cartItem'],
  methods: {
    addToCart (cartItem) {
      this.$store.dispatch('addToCart', cartItem)
    },
    removeCartItem (cartItemId) {
      this.$store.dispatch('removeCartItem', cartItemId)
    }
  }
}
</script>
