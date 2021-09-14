<template>
  <template v-if="torneo.jugadores.length">
    <div class="px-3 py-2 text-3xl text-center flex justify-between">
      <template v-if="h() > 1">
        <router-link :to="anterior()">
          <span
            class="iconify"
            data-icon="mdi:minus"
            data-inline="false"
          ></span>
        </router-link>
      </template>

      <span class="px-3">Hoyo {{ h() }} </span>
      <template v-if="h() != 18">
        <router-link :to="siguiente()">
          <span class="iconify" data-icon="mdi:plus" data-inline="false"></span>
        </router-link>
      </template>
      <div
        class="p-2 text-right bg-gray-50 flex-1  text-sm leading-4  text-gray-900 uppercase tracking-wider"
      >
        metros: {{ primero().barras.metros[h() - 1] }} <br>
        par: {{ primero().barras.par[h() - 1] }} <br>
        handicap: {{ primero().barras.handicap[h() - 1] }}
      </div>
    </div>

    <div class="p-1 grid grid-cols-2 gap-2 my-2">
      <div class="" v-for="jugador in torneo.jugadores" :key="jugador.nombre">
        <MeterGolpes :jugador="jugador" :hoyo="$route.params.id"></MeterGolpes>
      </div>
    </div>

    <router-link :to="'/jugar/' + torneo.id">
      <button
        @click="save(torneo)"
        class="py-3 bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
      >
        VOLVER
      </button>
    </router-link>
  </template>
</template>
<script>
import { useState } from "../store";
import MeterGolpes from "../components/MeterGolpes.vue";
import { save, readTorneo } from "../calculos.js";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    MeterGolpes,
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const h = function () {
      return parseInt(route.params.id);
    };
    const siguiente = function () {
      return `/hoyo/${torneo.id}/${h() + 1}`;
    };
    const anterior = function () {
      return `/hoyo/${torneo.id}/${h() - 1}`;
    };
    const primero = function () {
      return torneo.jugadores[0];
    };

    const campos = useState().campos;
    const recorridos = useState().recorridos;
    const torneo = useState().torneo;
    if (torneo.id != route.params.idTorneo) {
      readTorneo(torneo, route.params.idTorneo, campos, recorridos);
    }

    return {
      save,
      campos,
      recorridos,
      torneo,
      h,
      siguiente,
      anterior,
      primero,
    };
  },
};
</script>
