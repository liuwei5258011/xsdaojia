<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{
        docker__item: true,
        'docker__item--active': index === currentIndex,
      }"
      :key="item.icon"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
  <!-- <div>{{ typeof currentIndex }}</div> -->
</template>

<script>
export default {
  name: "Docker",
  props: ["currentIndex"],
  setup() {
    let dockerList = [
      { icon: "&#xe602;", text: "首页", to: { name: "Home" } },
      { icon: "&#xe6bc;", text: "购物车", to: { name: "CartList" } },
      { icon: "&#xe70d;", text: "订单", to: { name: "OrderList" } },
      { icon: "&#xe60b;", text: "我的", to: { name: "Home" } },
    ];
    return { dockerList };
  },
};
</script>

<style lang='scss'>
@import "../style/mixins.scss";
@import "../style/viriables.scss";
.docker {
  box-sizing: border-box;
  padding: 0 0.18rem;
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 1px solid $content-bgColor;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 20px;
      margin: 0.07rem 0 0.02rem 0;
    }
    a {
      color: $content-fontcolor;
      text-decoration: none;
    }
  }
  &__item--active {
    a {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>