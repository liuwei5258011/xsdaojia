<template>
  <div class="order">
    <div class="order__price">
      实付金额 <b>&yen;{{ calculations.price }}</b>
    </div>
    <div class="order__btn" @click="handleSubmit(true)">提交订单</div>
  </div>
  <div class="mask" v-show="showConfirm" @click="handleSubmit(false)">
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div
          class="mask__content__btn mask__content__btn--first"
          @click="handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div
          class="mask__content__btn mask__content__btn--last"
          @click="handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCommonCartEffect } from "../../effects/cartEffects";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { post } from "../../utils/request";

export default {
  name: "OrderComfirm",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const showConfirm = ref(false);
    // console.log(route);
    const shopId = parseInt(route.params.id, 10);
    const { calculations, shopName, productList } = useCommonCartEffect(shopId);

    const handleSubmit = (status) => {
      showConfirm.value = status;
    };
    const handleConfirmOrder = async (isCanceled) => {
      const products = [];
      // console.log(productList);
      // computed算出的是ref类型
      for (let i in productList.value) {
        const product = productList.value[i];
        products.push({ id: parseInt(product._id, 10), num: product.count });
      }
      try {
        // 此接口是死数据
        const result = await post("/api/order", {
          addressId: 1,
          shopId,
          // computed算出的是ref类型
          shopName: shopName.value,
          // ES5写法，isCanceled: isCanceled,
          isCanceled,
          products,
        });
        // console.log(result);
        if (result?.errno === 0) {
          store.commit("clearCartProduct", { shopId });
          router.push({ name: "OrderList" });
        }
        // console.log(a); 有此行会进入catch
      } catch (e) {}
    };
    return {
      showConfirm,
      calculations,
      handleConfirmOrder,
      showConfirm,
      handleSubmit,
    };
  },
};
</script>

<style lang='scss' scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.order {
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  position: absolute;
  bottom: 0;
  //块级元素添加绝对或者固定定位，如果不给宽度或者高度，默认大小是内容的大小，左右位置0撑开宽度
  left: 0;
  right: 0;
  &__price {
    flex: 1;
    text-indent: 0.24rem;
    background: $bgColor;
    font-size: 0.14rem;
    color: content-fontcolor;
  }
  &__btn {
    width: 0.98rem;
    color: $content-fontcolor;
    text-align: center;
    font-size: 0.14rem;
    background: #4fb0f9;
  }
}
.mask {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.57rem;
    background-color: #fff;
    border-radius: 0.04rem;
    text-align: center;
    &__title {
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
      font-size: 0.18rem;
      color: #333;
    }
    &__desc {
      margin: 0.08rem 0 0 0;
      font-size: 0.14rem;
      color: #666;
    }
    &__btns {
      display: flex;
      justify-content: space-between;
      margin: 0.24rem 0.58rem;
    }
    &__btn {
      font: 1px;
      width: 0.8rem;
      line-height: 0.32rem;
      // box-sizing: border-box;
      border-radius: 0.16rem;
      &--first {
        border: 0.01rem solid #4fb0f9;
      }
      &--last {
        border: 0.01rem solid transparent;
        background: #4fb0f9;
        color: #fff;
      }
    }
  }
}
</style>