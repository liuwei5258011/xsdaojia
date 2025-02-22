<template>
  <div
    class="mask"
    v-show="showCart && calculations.total > 0"
    @click="handleCartShowChange"
  />
  <div class="cart">
    <div class="product" v-show="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all" @click="setCartItemsChecked(shopId)">
          <span
            class="product__header__icon iconfont"
            v-html="calculations.allChecked ? '&#xe652;' : '&#xe667;'"
          ></span>
          全选
        </div>
        <div class="product__header__clear">
          <span @click="clearCartProduct(shopId)">清空购物车</span>
        </div>
      </div>

      <!-- template占位符防止渲染空白div -->

      <div v-for="item in productList" :key="item._id" class="product__item">
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe652;' : '&#xe667;'"
          @click="changeCartItemChecked(shopId, item._id)"
        ></div>
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="changeCartItem(shopId, item._id, item, -1)"
            >&#xeb41;</span
          >
          {{ item.count || 0 }}
          <span
            class="product__number__plus iconfont"
            @click="changeCartItem(shopId, item._id, item, 1)"
            >&#xe65b;</span
          >
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price"
          >&yen; {{ calculations.price }}</span
        >
      </div>
      <div class="check__btn" v-if="calculations.total">
        <router-link :to="{ path: `/order/${shopId}` }"> 去结算 </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/cartEffects";
// import { useCommonCartEffect } from "../../effects/cartEffects";

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const store = useStore();

  // 改变购物车内容
  const { changeCartItem, productList, calculations } = useCommonCartEffect(
    shopId
  );

  // 获取购物车商品列表，移到commonCartEffect里

  // 改变购物车勾选状态
  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", {
      shopId,
      productId,
    });
  };

  // 清空购物车，只改变当前shop的购物车，所以传shopId
  const clearCartProduct = (shopId) => {
    store.commit("clearCartProduct", {
      shopId,
    });
  };

  // 购物车全选按钮
  const setCartItemsChecked = () => {
    store.commit("setCartItemsChecked", {
      shopId,
    });
  };

  return {
    productList,
    changeCartItem,
    changeCartItemChecked,
    clearCartProduct,

    setCartItemsChecked,
    calculations,
  };
};

// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false);
  const handleCartShowChange = () => {
    // console.log(showCart);
    showCart.value = !showCart.value;
  };
  return { showCart, handleCartShowChange };
};

export default {
  name: "Cart",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    // console.log(store.state.cartList);

    // 购物车逻辑
    const {
      calculations,
      clearCartProduct,
      setCartItemsChecked,

      productList,
      changeCartItem,
      changeCartItemChecked,
    } = useCartEffect(shopId);

    //展示隐藏购物车逻辑
    const { showCart, handleCartShowChange } = toggleCartEffect();
    return {
      shopId,

      productList,
      changeCartItem,
      changeCartItemChecked,
      clearCartProduct,

      setCartItemsChecked,
      handleCartShowChange,
      showCart,
      calculations,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: $bgColor;
}
.product {
  overflow-y: scroll;
  flex: 1;
  background: $bgColor;
  &__header {
    display: flex;
    line-height: 0.52rem;
    border-bottom: 0.01rem solid $content-bgColor;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &__all {
      width: 0.64rem;
      margin-left: 0.16rem;
    }
    &__icon {
      display: inline-block;
      margin-right: 0.1rem;
      vertical-align: top;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &__clear {
      flex: 1;
      margin-right: 0.16rem;
      text-align: right;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__checked {
      line-height: 0.5rem;
      margin-right: 0.2rem;
      color: $btn-bgColor;
      font-size: 0.2rem;
    }
    &__detail {
      overflow: hidden;
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
      margin: 0.06rem 0 0 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.26rem;
      &__minus {
        position: relative;
        top: 0.02rem;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
      &__plus {
        position: relative;
        top: 0.02rem;
        color: $btn-bgColor;
        margin-left: 0.06rem;
      }
    }
  }
}
.check {
  display: flex;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  line-height: 0.49rem;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      left: 0.46rem;
      top: 0.04rem;
      padding: 0 0.04rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background-color: $hightlight-fontColor;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      color: #fff;
      transform: scale(0.5);
      // 以左侧中心店缩放
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: 0.12rem;
    &__price {
      line-height: 0.49rem;
      color: $hightlight-fontColor;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: $btn-bgColor;
    text-align: center;
    font-size: 0.14rem;
    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>