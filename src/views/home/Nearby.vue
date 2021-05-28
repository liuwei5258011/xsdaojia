<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      v-for="(item, index) in nearbyList"
      :to="`/shop/${item._id}`"
      :key="item._id"
    >
      <ShopInfo :item="item" />
    </router-link>

    <!-- <div
      v-for="(item, index) in nearbyList"
      :key="item._id"
      class="nearby__item"
    >
      <img class="nearby__item__img" :src="item.imgUrl" alt="" />
      <div class="nearby__content">
        <div class="nearby__content__title">{{ item.name }}</div>
        <div class="nearby__content__tags">
          <span class="nearby__content__tag">月售：{{ item.sales }}</span>
          <span class="nearby__content__tag"
            >起送：{{ item.expressLimit }}</span
          >
          <span class="nearby__content__tag"
            >基础运费：{{ item.expressPrice }}</span
          >
        </div>
        <p class="nearby__content__highlight">{{ item.slogan }}</p>
      </div>
    </div> -->
  </div>
</template>
<script>
import { ref } from "vue";
import { get } from "../../utils/request";
//export default，import不使用{}，import后的是别名，和组件的name属性无关；
//使用{}时，export时指定了名字，必须使用相同的名字
import ShopInfo from "../../components/ShopInfo";

const useNearbyListEffect = () => {
  const nearbyList = ref([]);
  const getNearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data;
    }
  };
  return { getNearbyList, nearbyList };
};
export default {
  name: "Nearby",
  components: {
    ShopInfo,
  },
  setup() {
    const { getNearbyList, nearbyList } = useNearbyListEffect();
    getNearbyList();
    return { nearbyList };
  },
};
</script>


<style lang="scss" scoped>
@import "../../style/mixins.scss";
@import "../../style/viriables.scss";
.nearby {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    font-size: 0.16rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  a {
    text-decoration: none;
  }
}
</style>




