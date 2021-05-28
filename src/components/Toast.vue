<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'

	export default {
		name:'',
		// props: ['message']
		props: {message : {}}	
	}

	export const useToastEffect = () => {
	const toastData = reactive({
		show: false,
		toastMessage: ''
	})
	const showToast = message => {
			toastData.show = true;
			toastData.toastMessage = message;
			setTimeout(() => {
				toastData.show = false;
				toastData.toastMessage = ''
			}, 2000)
		}
	const { show, toastMessage } = toRefs(toastData)	
	return { showToast, show, toastMessage }
}

</script>

<style lang='scss' scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.35);
  padding: 0.1rem;
  border-radius: 0.05rem;
  color: #fff;
}
</style>