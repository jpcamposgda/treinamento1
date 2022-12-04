<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>

    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col  w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg  text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>

      <div class="flex py-3 pl-5 pr-20 mt-2 rounded justify-between items-center bg-brand-gray w-1/2">
        <span> {{ store.User.currentUser.apiKey }} </span>
        <div class="flex ml-20 mr-5">
          <svg
            class="cursor-pointer"
            width="24"
            height="24"
            viewBox="0 0 19 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 0H2C0.9 0 0 0.9 0 2V16H2V2H14V0ZM13 4L19 10V20C19 21.1 18.1 22 17 22H5.99C4.89 22 4 21.1 4 20L4.01 6C4.01 4.9 4.9 4 6 4H13ZM12 11H17.5L12 5.5V11Z"
              :fill="brandColors.graydark"
            />
          </svg>

          <svg
            class="cursor-pointer ml-3"
            width="24"
            height="24"
            viewBox="0 0 22 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 6.81818V10.9091L16.5 5.45455L11 0V4.09091C4.9225 4.09091 0 8.97273 0 15C0 17.1409 0.6325 19.1318 1.705 20.8091L3.7125 18.8182C3.09375 17.6864 2.75 16.3773 2.75 15C2.75 10.4864 6.44875 6.81818 11 6.81818ZM20.295 9.19091L18.2875 11.1818C18.8925 12.3273 19.25 13.6227 19.25 15C19.25 19.5136 15.5512 23.1818 11 23.1818V19.0909L5.5 24.5455L11 30V25.9091C17.0775 25.9091 22 21.0273 22 15C22 12.8591 21.3675 10.8682 20.295 9.19091Z"
              :fill="brandColors.graydark"
            />
          </svg>
        </div>
      </div>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>
      <div class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-2/3 overflow-x-scroll">
        <pre class="">
        &lt;script src="https://jpcamposgda-feedbacker-widget.netlify.app "
      </pre
        >
      </div>
    </div>
  </div>
</template>
<script>
import useStore from "@/hooks/useStore";
import HeaderLogged from "../../components/HeaderLogged/";
import palette from "../../../palette";
export default {
  components: { HeaderLogged },

  setup() {
    const store = useStore();

    return {
      store,
      brandColors: palette.brand,
    };
  },
};
</script>



<style>
</style>
