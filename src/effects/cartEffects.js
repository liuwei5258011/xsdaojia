import {computed} from 'vue'
import { useStore } from "vuex";
export const useCommonCartEffect = (shopId) => {
	const store = useStore();
	const cartList = store.state.cartList
  const changeCartItem = (shopId, productId, productInfo, num) => {
    // console.log(shopId, productId, productInfo);
    store.commit("changeCartItem", { shopId, productId, productInfo, num });
	};
	const productList = computed(() => {
		const productList = cartList[shopId]?.productList || {};
		const notEmptyProduct = {}
		for (let i in productList) {
			const product = productList[i]
			if (product.count > 0) {
				notEmptyProduct[i]=product
			}
		}
		// console.log(productList);
    return notEmptyProduct;
	});
	// shopName具有响应式，而不是直接获取
	const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || '';
    return shopName;
	});
	
	const calculations = computed(() => {
    const productList = cartList[shopId]?.productList;
    const result = { total: 0, price: 0, allChecked: true };
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        result.total += product.count;
        if (product.check == true) {
          result.price += product.count * product.price;
        }
        if (!product.check) {
          result.allChecked = false;
        }
      }
    }
    result.price = result.price.toFixed(2);
    return result;
  });
	return { changeCartItem, cartList, productList ,shopName,calculations};


};

