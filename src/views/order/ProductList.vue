<template>
  <div class="product">
    <div class="product__title">{{ shopName }}</div>
    <div class="product__wrapper">
      <div class="product__list">
        <div class="product__item" v-for="item in productList" :key="item._id">
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>

            <p class="product__item__price">
              <span>
                <span class="product__item__yen">&yen; </span>
                {{ item.price }} x {{ item.count }}
              </span>
              <span class="product__item__total">
                <span class="product__item__yen">&yen; </span>
                {{ (item.price * item.count).toFixed(2) }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCommonCartEffect } from "../../effects/cartEffects";
import { useRoute } from "vue-router";
export default {
  name: "ProductList",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { productList, shopName } = useCommonCartEffect(shopId);
    return { productList, shopName };
  },
};
</script>

<style lang='scss' scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.product {
  margin: 0.16rem 0.18rem 0.1rem 0.18rem;
  background: #fff;
  &__title {
    padding: 0.16rem;
    font-size: 0.16rem;
    color: $content-fontcolor;
  }
  &__wrapper {
    overflow-y: scroll;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.6rem;
    top: 2.6rem;
    margin: 0 0.18rem;
  }
  &__list {
    background: #fff;
  }

  &__item {
    position: relative;
    display: flex;
    padding: 0 0.16rem 0.16rem;
    &__detail {
      flex: 1;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__price {
      display: flex;
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: #000;
    }
    &__yen {
      font-size: 0.12rem;
    }
  }
}
</style>