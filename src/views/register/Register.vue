<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
      />
      <!-- autocomplete="new-password" 写入上面解决密码自动填充-->
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="确认密码"
        type="password"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">
      已有账号登录
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

// 注册相关逻辑
const useRegisterEffect = (showToast) => {
  const router = useRouter();
  let data = reactive({
    username: "",
    password: "",
    ensurement: "",
  });
  const handleRegister = async () => {
    try {
      const result = await post("/api/user/register", {
        username: data.username,
        password: data.password,
      });
      if (result?.errno === 0) {
        router.push({ name: "Login" });
      } else {
        showToast("注册失败");
      }
      // console.log(a); 有此行会进入catch
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password, ensurement } = toRefs(data);
  return { username, password, handleRegister, ensurement };
};
// 已有账号登录
const useLoginEffect = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push({ name: "Login" });
    // 为什么$router不行
    // this.$router.push('/')
  };
  return { handleLoginClick };
};

export default {
  name: "Register",
  components: {
    Toast,
  },
  setup() {
    const { showToast, show, toastMessage } = useToastEffect();
    const {
      username,
      password,
      handleRegister,
      ensurement,
    } = useRegisterEffect(showToast);
    const { handleLoginClick } = useLoginEffect();

    return {
      handleLoginClick,
      username,
      password,
      handleRegister,
      ensurement,
      show,
      toastMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    border-radius: 6px;
    &__content {
      border: none;
      outline: none;
      line-height: 0.45rem;
      width: 100%;
      background: none;
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.16rem;
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  &__register-button {
    margin: 0.32rem 0.4rem 0.16rem;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color: $bgColor;
    font-size: 0.16rem;
    text-align: center;
  }
  &__register-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
  }
}
</style>