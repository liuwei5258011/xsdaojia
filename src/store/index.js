import { createStore } from 'vuex'

const setLocalCartList = (state) => {
	const { cartList } = state
	const cartListString = JSON.stringify(cartList)
	localStorage.cartList= cartListString
}

const getLocalCartList = () => {
	try {
		return JSON.parse(localStorage.cartList)
	} catch (error) {
		return {}
	}
	
}

export default createStore({
	state: {
		cartList:getLocalCartList()
		// {
			// shopId: {
			// 	shopName: '沃尔玛',
			// 	productList: {
			// 		productId: {
			// 			_id: '1',
			// 			name: '番茄250g/份',
			// 			imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
			// 			sales: 10,
			// 			price: 33.6,
			// 			oldPrice: 39.6,
			// 			count: 2
			// 		}
			// 	},
			
			// }
		// }
	},
	mutations: {
		changeCartItem(state, payload) {
			
			const { shopId, productId, productInfo, num } = payload
			// console.log(shopId, productId, productInfo, num, typeof productId);
			let shopInfo = state.cartList[shopId] || {
				shopName: '',
				productList:{}
			}

			let product = shopInfo.productList[productId]
			if (!product) {
				product = productInfo
				product.count = 0
			}
			product.count += num
			// 短路写法
			// (num > 0) && (product.check = true)
			if (num > 0) { product.check = true }
			if (product.count < 0) { product.count = 0 }
			// 使cartList.shopId.productList有了productId属性
			shopInfo.productList[productId] = product
			// 使cartList有了shopId属性
			state.cartList[shopId] = shopInfo
			// console.log(state.cartList[shopId][productId]);
			// console.log(state.cartList[shopId]);
			// console.log(shopInfo);
			// console.log(state.cartList);
			setLocalCartList(state)
		},
		changeCartItemChecked(state, payload) {
			const { shopId, productId } = payload

			const product = state.cartList[shopId].productList[productId]
			product.check = !product.check
			setLocalCartList(state)
		},
		clearCartProduct(state, payload) {
			const { shopId } = payload
			state.cartList[shopId].productList = {}
			setLocalCartList(state)
		},

		// 购物车全选按钮
		setCartItemsChecked(state, payload) {
			const { shopId } = payload
			const products = state.cartList[shopId].productList
			if (products) {
				for (let key in products) {
					const product = products[key]
					product.check = true
				}
			}
			setLocalCartList(state)
		},

		// 添加购物车商店名字
		changeShopName(state, payload) {
			const { shopId, shopName } = payload;
			const shopInfo = state.cartList[shopId ]|| {
				shopName: '',
				productList:{}
			}
			// 给cartList.shopId添加shopName属性
			shopInfo.shopName = shopName
			state.cartList[shopId] = shopInfo
			setLocalCartList(state)
		},
  
	}
})
