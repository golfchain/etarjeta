<template>
  <div class="bg-white-900">
    <div class="mx-auto py-12 px-4 max-w-screen-xl sm:px-6 lg:px-8 lg:py-24">
      <div class="space-y-12">
        <div
          class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none"
        >
          <h2
            class="text-3xl text-center leading-9 font-extrabold text-black tracking-tight sm:text-4xl"
          >
            Juega en cualquier campo
          </h2>
          <p class="text-xl text-center leading-7 text-black-300">
            Tu tarjeta de golf virtual
          </p>
        </div>
        <ul
          class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
        >
          <li
            class="py-10 px-6 bg-gray-200 text-center rounded-lg xl:px-10 xl:text-left"
            v-for="i in [
              {
                nombre: 'Crear ',
                descripcion: 'Permite crear una partida',
                link: '/addTorneo',
              },
            ]"
            :key="i"
          >
            <router-link :to="i.link">
              <div @click="initTorneo(torneo)" class="space-y-6 xl:space-y-10">
                <div
                  class="space-y-2 xl:flex xl:items-center xl:justify-between"
                >
                  <div class="font-medium text-lg leading-6 space-y-1">
                    <h4 class="text-black">
                      {{ i.nombre }}
                    </h4>
                    <p class="text-indigo-800">{{ i.descripcion }}</p>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
         <template v-if="torneos.length">
          <li
            class="py-10 px-6 bg-gray-200 text-center rounded-lg xl:px-10 xl:text-left"
            v-for="i in torneos"
            :key="i"
          >
            <router-link :to="'/jugar/'+i.id">
              <div class="space-y-6 xl:space-y-10">
                <div
                  class="space-y-2 xl:flex xl:items-center xl:justify-between"
                >
                  <div class="font-medium text-lg leading-6 space-y-1">
                    <h4 class="text-black">
                      {{i.equipo}} <br> {{i.campo.nombre}} <br> {{i.fecha}} {{i.hora}} 
                    </h4>
                    <p class="text-indigo-800"> Jugar </p>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
         </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, reactive, ref } from "vue";
import { useState } from "../store";
import { create , initTorneo} from "../calculos.js";
export default {
  setup() {
    
    const torneo = useState().torneo
    const torneos =  Object.keys(localStorage).filter(i => i.startsWith('gch_')).map(i=> JSON.parse(localStorage.getItem(i)))
    const localState = reactive({
      
    });
    return { localState, torneo, torneos, initTorneo };
  }
};
</script>