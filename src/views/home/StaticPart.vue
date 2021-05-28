<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe64f;</span>
    北京理工大学北京理工大学北京理工大学北京理工大学
    <span class="iconfont position__notice">&#xe606;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe600;</span>
    <input type="text" value="山姆会员" />
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt=""
    />
  </div>
  <div class="icons">
    <div v-for="(item, index) in iconsList" class="icons__item">
      <img class="icons__item__img" :src="item.iconsSrc" />
      <p class="icons__item__desc">{{ item.iconsDesc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: "StaticPart",
  setup() {
    let iconsList = [
      {
        iconsSrc: "http://www.dell-lee.com/imgs/vue3/超市.png",
        iconsDesc: "超市便利",
      },
      {
        iconsSrc: "http://www.dell-lee.com/imgs/vue3/菜市场.png",
        iconsDesc: "菜市场",
      },
      {
        iconsSrc: "http://www.dell-lee.com/imgs/vue3/水果店.png",
        iconsDesc: "水果店",
      },
      {
        iconsSrc: "http://www.dell-lee.com/imgs/vue3/鲜花.png",
        iconsDesc: "鲜花绿植",
      },
      {
        iconsSrc: "http://www.dell-lee.com/imgs/vue3/医药健康.png",
        iconsDesc: "医药健康",
      },
      {
        iconsSrc: "http://www.dell-lee.com/imgs/vue3/家居.png",
        iconsDesc: "家居时尚",
      },
      {
        iconsSrc: "http://www.dell-lee.com/imgs/vue3/蛋糕.png",
        iconsDesc: "烘焙蛋糕",
      },
      {
        iconsSrc: "http://www.dell-lee.com/imgs/vue3/签到.png",
        iconsDesc: "签到",
      },
      {
        iconsSrc: "http://www.dell-lee.com/imgs/vue3/大牌免运.png",
        iconsDesc: "大牌免费",
      },
      {
        iconsSrc: "http://www.dell-lee.com/imgs/vue3/红包.png",
        iconsDesc: "红包套餐",
      },
    ];
    return {
      iconsList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixins.scss";
@import "../../style/viriables.scss";
.position {
  @include ellipsis;
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  line-height: 0.22rem;
  font-size: 0.16rem;
  .position__icon {
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position__notice {
    position: absolute;
    right: 0;
    top: 0.17rem;
    font-size: 0.2rem;
  }
}
.search {
  display: flex;
  margin-bottom: 0.12rem;
  line-height: 0.32rem;
  background-color: $search-bgColor;
  color: #b7b7b7;
  border-radius: 0.16rem;
  font-size: 0.14rem;
  .iconfont {
    position: relative;
    display: inline-block;
    top: 0.04rem;
    padding: 0 0.12rem 0 0.16rem;
    font-size: 0.2rem;
  }
  input {
    flex: 1;
    width: 100%;
    // line-height: 0.32rem;
    outline: none;
    background: none;
    border: none;
  }
}
.banner {
  // 防止图片抖动，先站位区域
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  margin-top: 0.16rem;
  flex-wrap: wrap;
  &__item {
    //flex布局的每个子元素占总宽的20%
    width: 20%;
    &__img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: 0.06rem 0 0.16rem 0;
      text-align: center;
    }
  }
}
.gap {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: $content-bgColor;
}
</style>