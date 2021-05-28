<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <OrderComfirm />
  </div>
</template>

<script>
import TopArea from "./TopArea";
import ProductList from "./ProductList";
import OrderComfirm from "./OrderComfirm";
export default {
  name: "Order",
  components: { TopArea, ProductList, OrderComfirm },
};
</script>

<style lang='scss' scoped>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #eee;
  overflow-y: scroll;
}
</style>