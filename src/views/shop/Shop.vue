<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe62e;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe600;</span>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>

    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />

    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo";
import Content from "./Content";
import Cart from "./Cart";

const useShopInfoEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };

  return { data, getItemData };
};
export default {
  name: "Shop",
  components: {
    ShopInfo,
    Content,
    Cart,
  },
  setup() {
    const router = useRouter();
    const { data, getItemData } = useShopInfoEffect();
    getItemData();
    const handleBackClick = () => {
      router.back();
    };
    const { item } = toRefs(data);
    return { item, handleBackClick };
  },
};
</script>

<style lang='scss' scoped>
@import "../../style/viriables.scss";
.wrapper {
  padding: 0 0.18rem;
}
.search {
  display: flex;
  margin: 0.14rem 0 0.04rem 0;
  line-height: 0.32rem;
  &__back {
    width: 0.3rem;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    // 占满剩余宽度
    flex: 1;
    background: $search-bgColor;
    border-radius: 0.16rem;
    &__icon {
      width: 0.44rem;
      text-align: center;
      color: $search-fontColor;
    }
    &__input {
      display: block;
      width: 100%;
      padding-right: 0.2rem;
      // 去掉边框
      border: none;
      //取消单机文本框时的高亮
      outline: none;
      // 去掉input的背景色
      background: none;
      height: 0.32rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>