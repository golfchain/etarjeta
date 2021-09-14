<template>
  <div class="text-center bg-gray-200 p-1">
    <div
      class="py-1 bg-gray-50 text-center text-sm leading-4 text-gray-500 uppercase tracking-wider"
    >
      {{ jugador.nombre }} hcp: {{ jugador.hcp }} /{{ jugador.juego }} <br>
      {{ adicionales(jugador, hoyo - 1) }}
    </div>
    <div class="flex text-6xl justify-center">
      <div @click="sub(jugador, hoyo - 1)" class="px-2">-</div>
      <div class="px-3">{{ resultado(jugador, hoyo - 1) }}</div>
      <div @click="add(jugador, hoyo - 1)" class="px-2">+</div>
    </div>
    <p class="text-center text-2xl text-black">
      Puntos {{ jugador.resultados.puntos[hoyo - 1] }}
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import { puntos, adicionales } from "../calculos.js";
export default {
  props: ["jugador", "hoyo"],
  computed: {},
  methods: {},
  setup(props) {
    var movimiento = 0;

    const resultado = function (jugador, hoyo) {
      const r = jugador.resultados.golpes[hoyo];
      if (r < 0) {
        jugador.resultados.golpes[hoyo] = -1;
        puntos(jugador, hoyo);
        return "-";
      } else if (r == 1 && movimiento == 1) {
        jugador.resultados.golpes[hoyo] = jugador.barras.par[hoyo];
        puntos(jugador, hoyo);
        return jugador.resultados.golpes[hoyo];
      } else {
        puntos(jugador, hoyo);
        return r;
      }
    };
    const add = function (jugador, hoyo) {
      movimiento = 1;
      jugador.resultados.golpes[hoyo]++;
    };
    const sub = function (jugador, hoyo) {
      jugador.resultados.golpes[hoyo]--;
      movimiento = -1;
    };
    return { adicionales, add, sub, resultado };
  },
};
</script>
