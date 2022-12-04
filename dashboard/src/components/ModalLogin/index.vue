<template>
  <div class="flex justify-between" id="modal-login">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>

    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          id="email-field"
          v-model="state.email.value"
          type="email"
          :class="{
            'border-brand-danger': !!state.email.errorMessage,
          }"
          class="
            block
            w-full
            px-4
            py-3
            mt-1
            text-lg
            bg-gray-100
            border-2 border-transparent
            rounded
          "
          placeholder="jane.dae@gmail.com"
        />
        <span
          id="email-error"
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          id="password-field"
          v-model="state.password.value"
          type="password"
          :class="{
            'border-brand-danger': !!state.password.errorMessage,
          }"
          class="
            block
            w-full
            px-4
            py-3
            mt-1
            text-lg
            bg-gray-100
            border-2 border-transparent
            rounded
          "
          placeholder="jane.dae@gmail.com"
        />
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        id="submit-button"
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading,
        }"
        class="
          px-8
          py-3
          mt-10
          text-3
          font-bold
          text-white
          rounded-full
          bg-brand-main
          focus:outline
          transition-all
          duration-150
        "
      >

        <svg
          v-if="state.isLoading"
          name="loading"
          class="animate-spin"
          width="22"
          height="22"
          viewBox="0 0 22 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 6.81818V10.9091L16.5 5.45455L11 0V4.09091C4.9225 4.09091 0 8.97273 0 15C0 17.1409 0.6325 19.1318 1.705 20.8091L3.7125 18.8182C3.09375 17.6864 2.75 16.3773 2.75 15C2.75 10.4864 6.44875 6.81818 11 6.81818ZM20.295 9.19091L18.2875 11.1818C18.8925 12.3273 19.25 13.6227 19.25 15C19.25 19.5136 15.5512 23.1818 11 23.1818V19.0909L5.5 24.5455L11 30V25.9091C17.0775 25.9091 22 21.0273 22 15C22 12.8591 21.3675 10.8682 20.295 9.19091Z"
            fill="white"
          />
        </svg>
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";
import useModal from "../../hooks/useModal";
import Icon from "../Icon/index.vue";

import {
  validateEmptyAndLength3,
  validateEmptyAndEmail,
} from "../../utils/validators";
import services from "../../services";

export default {
  components: { Icon },

  setup() {
    const router = useRouter();
    const modal = useModal();
    const toast = useToast();

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      "email",
      validateEmptyAndEmail
    );

    const { value: passwordValue, errorMessage: passwordErrorMessage } =
      useField("password", validateEmptyAndLength3);

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    });

    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value,
        });

        if (!errors) {

          window.localStorage.setItem('token', data.token);
          router.push({ name: "Feedbacks" })
          state.isLoading = false;
          modal.close();
          return
        }

        if (errors.status === 404) {
          toast.error("E-mail não encontrado");
        }
        if (errors.status === 401) {
          toast.error("E-mail/senha inválidos");
        }
        if (errors.status === 400) {
          toast.error("Ocorreu um erro ao fazer o login");
        }

        state.isLoading = false;
      } catch (error) {
        state.isLoading = false;
        state.hasErrors = !!error;
        toast.error("Ocorreu um erro ao fazer o login");
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    };
  },
};
</script>
