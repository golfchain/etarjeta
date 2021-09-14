
<template>
  <div class="flex flex-col relative" v-if="torneo.jugadores.length">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="p-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <div class="mb-2 text-center">
            <a @click="save(torneo)" href="javascript:getlink();"
              >Copiar URL {{ torneo.id }}</a
            >
          </div>
          <div class="mb-2 flex items-stretch">
            <router-link to="/addTorneo">
              <button
                type="button"
                class="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              >
                Cambiar datos
              </button>
            </router-link>
            <button
              @click="cambiar()"
              type="button"
              class="-ml-px px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
            >
              Visualizacion
            </button>
          </div>

          <table v-if="modo == 1" class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  class="pt-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  hoyo
                </th>
                <th
                  class="pt-3 bg-gray-50 text-center text-xs leading-4 font-bold text-gray-900 uppercase tracking-wider"
                  v-for="jugador in torneo.jugadores"
                  :key="jugador.nombre"
                >
                  {{ jugador.nombre }} {{ jugador.hcp }}:{{ jugador.juego }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white"
                v-for="(hoyo, index) in torneo.jugadores[0].resultados.golpes"
                :key="hoyo"
              >
                <td
                  class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                >
                  <router-link
                    :to="'/hoyo/' + torneo.id + '/' + (index + 1)"
                    v-if="torneo.campo && torneo.recorrido"
                  >
                    <button
                      class="bg-blue-700 w-full hover:bg-blue-700 text-2xl text-white font-bold rounded py-1"
                    >
                      {{ index + 1 }}
                      <div class="text-sm text-center">
                        {{ primero().barras.metros[index] }}/{{
                          primero().barras.par[index]
                        }}/{{ primero().barras.handicap[index] }}
                      </div>
                    </button>
                  </router-link>
                </td>
                <td
                  v-for="jugador in torneo.jugadores"
                  :key="jugador.nombre"
                  class="p-2 border whitespace-no-wrap text-lg leading-5 font-medium text-gray-900"
                >
                  <div class="grid grid-cols-2 gap-3 text-center py-1">
                    <div class="">{{ presentar(jugador, index) }}</div>
                    <div class="">{{ jugador.resultados.puntos[index] }}</div>
                    <div>{{ adicionales(jugador, index) }} &nbsp;</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="modo == 2">
            <div
              v-for="jugador in torneo.jugadores"
              :key="jugador.nombre"
              class="pt-3 bg-gray-50 text-center text-2xl leading-4 font-bold text-gray-900 uppercase tracking-wider"
            >
              {{ jugador.nombre }} {{ jugador.hcp }} {{ jugador.juego }}
              <table
                class="min-w-full divide-y divide-gray-200 text-sm font-normal"
              >
                <tr>
                  <td colspan="4"></td>
                  <td v-for="n in 18">
                    <router-link :to="'/hoyo/' + torneo.id + '/' + n">
                      {{ n }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="4"
                    class="border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    HOYO
                  </td>
                  <td
                    v-for="n in 18"
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {{ jugador.barras.handicap[n - 1] }}
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="4"
                    class="border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    Par
                  </td>
                  <td
                    v-for="n in 18"
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {{ jugador.barras.par[n - 1] }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  ></td>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    1 V
                  </td>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    2 V
                  </td>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    Total
                  </td>
                  <td
                    v-for="n in 18"
                    class="border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {{ adicionales(jugador, n - 1) }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    Golpes
                  </td>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {{ sumarGolpes(jugador.resultados.golpes, 0, 8) }}
                  </td>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {{ sumarGolpes(jugador.resultados.golpes, 9, 17) }}
                  </td>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {{ sumarGolpes(jugador.resultados.golpes, 0, 17) }}
                  </td>
                  <td
                    v-for="n in 18"
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {{ presentar(jugador, n - 1) }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    Puntos
                  </td>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {{ sumarArray(jugador.resultados.puntos, 0, 8) }}
                  </td>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {{ sumarArray(jugador.resultados.puntos, 9, 17) }}
                  </td>
                  <td
                    class="p-2 border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {{ sumarArray(jugador.resultados.puntos, 0, 17) }}
                  </td>
                  <td
                    v-for="n in 18"
                    class="border whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                  >
                    {{ jugador.resultados.puntos[n - 1] }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div v-if="modo == 3">
            <table
              class="min-w-full divide-y divide-gray-200 text-sm font-normal"
            >
              <tr>
                <th class="p-2 text-left">Jugador</th>
                <th class="text-right">Ida</th>
                <th class="text-right">Vuelta</th>
                <th class="text-right">Total</th>
                <th class="text-right">Hcp/Juego</th>
              </tr>

              <tr v-for="jugador in torneo.jugadores" :key="jugador.nombre">
                <td class="text-left text-lg leading-5 text-gray-900">
                  {{ jugador.nombre }}
                </td>
                <td class="text-right text-lg leading-5 text-gray-900">
                  {{ sumarGolpes(jugador.resultados.golpes, 0, 8) }} /

                  {{ sumarArray(jugador.resultados.puntos, 0, 8) }}
                </td>
                <td class="p-2 text-right text-lg leading-5 text-gray-900">
                  {{ sumarGolpes(jugador.resultados.golpes, 9, 17) }} /
                  {{ sumarArray(jugador.resultados.puntos, 9, 17) }}
                </td>
                <td class="p-2 text-right text-lg leading-5 text-gray-900">
                  {{ sumarGolpes(jugador.resultados.golpes, 0, 17) }} /
                  {{ sumarArray(jugador.resultados.puntos, 0, 17) }}
                </td>
                <td class="p-2 text-right text-lg leading-5 text-gray-900">
                  {{ jugador.hcp }} / {{ jugador.juego }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//  "index": "1570", "campo": "517", "recorrido": "CLUB GOLF AIGUESVERDES", "sexo": "Femenino", "numero_tabla": "0", "barras": "AZULES", "metros_ida": "2443", "metros_vuelta": "2708", "metros_total": "5151", "metros": "310,316,403,116,460,104,360,116,258,426,333,158,247,471,273,289,183,328", "par": "4,4,5,3,5,3,4,3,4,5,4,3,4,5,4,4,3,4", "par_ida_vc": "35.3", "par_ida_vs": "123", "par_vuelta_vc": "36.9", "par_vuelta_vs": "134", "par_total_vc": "72.3", "par_total_vs": "128", "par_total_total": "71", "handicap": "5,9,11,7,1,15,3,13,17,18,6,16,12,8,14,10,4,2" }

import { useState } from "../store";
import {
  sumarGolpes,
  sumarArray,
  readTorneo,
  save,
  adicionales,
} from "../calculos.js";
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup(props, context) {
    var torneo = useState().torneo;
    var campos = useState().campos;
    var recorridos = useState().recorridos;
    const router = useRouter();
    const route = useRoute();
    if (torneo.id != route.params.id)
      readTorneo(torneo, route.params.id, campos, recorridos);
    
    var modo = ref(1);
    var modos = ref(3);

    const aumentar = function () {
      return "15px";
    };
    const cambiar = function () {
      console.log('cambiar')
      modo.value = modo.value + 1
      if (modo.value > modos.value) modo.value = 1;
    };
    const primero = function () {
      return torneo.jugadores[0];
    };
    const presentar = function (jugador, hoyo) {
      if (jugador.resultados.golpes[hoyo] < 0) {
        return "-";
      } else {
        return jugador.resultados.golpes[hoyo];
      }
    };

    return {
      sumarGolpes,
      sumarArray,
      torneo,
      modo,
      modos,
      save,
      adicionales,
      presentar,
      primero,
      cambiar,
      aumentar,
    };
  },
};
</script>