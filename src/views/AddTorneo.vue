<template>
  <div class="p-4">
    <div>
      <div>
        <p class="text-xl text-center leading-7 text-black-300">
          Define la partida <br />
        </p>

        <div class="mt-6 sm:mt-5">
          <label
            for="location"
            class="mt-3 block text-sm leading-5 font-medium text-gray-700"
            >Equipo</label
          >
          <input
            v-model="torneo.equipo"
            class="form-input block w-full sm:text-sm sm:leading-5"
            placeholder="nombre del equipo"
            type="text"
          />

          <label
            for="location"
            class="mt-6 block text-sm leading-5 font-medium text-gray-700"
            >Fecha</label
          >
          <input
            v-model="torneo.fecha"
            class="form-input block w-full sm:text-sm sm:leading-5"
            placeholder="fecha"
            type="date"
          />

          <label
            for="location"
            class="mt-3 block text-sm leading-5 font-medium text-gray-700"
            >Hora</label
          >
          <input
            v-model="torneo.hora"
            class="form-input block w-full sm:text-sm sm:leading-5"
            placeholder="hora"
            type="time"
          />

          <label
            for="location"
            class="mt-3 block text-sm leading-5 font-medium text-gray-700"
            >Campo (teclea una parte del nombre)</label
          >
          <input
            v-model="torneo.textoBuscar"
            class="form-input block w-full sm:text-sm sm:leading-5"
            placeholder="nombre"
          />
          <label
            for="location"
            class="mt-3 block text-sm leading-5 font-medium text-gray-700"
            >... y busca en esta lista</label
          >
          <select
            v-if="torneo.textoBuscar"
            @change="onChangeCampo()"
            v-model="torneo.campo"
            id="location"
            class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          >
            <option :value="null">Seleccione un campo de la lista</option>
            <option
              v-for="campo in campos.filter(
                (i) => i.nombre.indexOf(torneo.textoBuscar.toUpperCase()) >= 0
              )"
              :key="campo.index"
              v-bind:value="campo"
            >
              {{ campo.nombre }}
            </option>
          </select>
        </div>
        <div class="mt-6 sm:mt-5" v-if="torneo.campo">
          <label
            for="location"
            class="block text-sm leading-5 font-medium text-gray-700"
            >Recorrido</label
          >
          <select
            @change="onChangeRecorrido()"
            v-model="torneo.recorrido"
            id="location"
            class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          >
            <option :value="null">Seleccione un recorrido</option>
            <option
              v-bind:value="recorrido"
              v-for="recorrido in agrupar(
                recorridos.filter((i) => i.campo == torneo.campo.url),
                'recorrido'
              )"
              :key="recorrido"
            >
              {{ recorrido }}
            </option>
          </select>
        </div>
        <div class="mt-4 flex flex-col" v-if="torneo.campo && torneo.recorrido">
          <button
            @click="
              torneo.modoAdd = true;
              torneo.nuevo.edit = false;
            "
            v-if="torneo.modoAdd == false"
            class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Añadir
          </button>
          <div v-if="torneo.modoAdd">
            <p class="text-xl text-center leading-7 text-black-300">
              Datos del jugador
            </p>
            <label
              for="location"
              class="mt-4 block text-sm leading-5 font-medium text-gray-700"
              >Nombre Jugador</label
            >
            <input
              v-model="torneo.nuevo.nombre"
              class="form-input block w-full sm:text-sm sm:leading-5"
              placeholder="nombre"
            />
            <label
              for="location"
              class="mt-4 block text-sm leading-5 font-medium text-gray-700"
              >Handicap exacto</label
            >
            <input
              v-model="torneo.nuevo.hcp"
              class="form-input block w-full sm:text-sm sm:leading-5"
              placeholder="nombre"
              type="number"
              step="0.1"
              @change="onChangeBarras(torneo.nuevo)"
            />
            <label
              for="location"
              class="mt-4 block text-sm leading-5 font-medium text-gray-700"
              >Barras</label
            >
            <select
              @change="onChangeBarras(torneo.nuevo)"
              v-model="torneo.nuevo.barras"
              id="location"
              class="mt-4 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            >
              <option :value="null">Seleccione</option>
              <option
                v-bind:value="barra"
                v-for="barra in recorridos.filter(
                  (i) =>
                    i.campo == torneo.campo.url &&
                    i.recorrido == torneo.recorrido
                )"
                :key="barra.index"
              >
                {{ barra.sexo.substring(0, 1) }}:{{ barra.barras }}
              </option>
            </select>
            <button
              @click="addLista()"
              class="mt-4 bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Aceptar
            </button>
          </div>
          <div
            class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"
            v-if="torneo.modoAdd == false"
          >
            <div
              class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              <div
                class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
              >
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        class="pt-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Jugador
                      </th>
                      <th
                        class="pt-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        hcp
                      </th>

                      <th
                        class="pt-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        juego
                      </th>
                      <th
                        class="pt-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Barra
                      </th>

                      <th class="bg-gray-50"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="bg-white"
                      v-for="jugador in torneo.jugadores"
                      :key="jugador.nombre"
                    >
                      <td
                        class="w-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                      >
                        <div class="flex">
                          <a
                            @click="borrar(jugador)"
                            class="text-indigo-600 hover:text-indigo-900 text-xl"
                            ><span
                              class="iconify"
                              data-icon="mdi:delete"
                              data-inline="false"
                            ></span
                          ></a>
                          {{ jugador.nombre }}
                        </div>
                      </td>

                      <td
                        class="w-1/3 px1-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                      >
                        <div>
                          {{ jugador.hcp }}
                        </div>
                      </td>
                      <td
                        class="w-1/3 px1-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                      >
                        <div>
                          {{ jugador.juego }}
                        </div>
                      </td>

                      <td
                        class="px1-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                      >
                        {{
                          (jugador.barras &&
                            jugador.barras.sexo.substring(0, 1) +
                              ":" +
                              jugador.barras.barras) ||
                          "sin barras"
                        }}
                      </td>
                      <td
                        class="px-6 py-4 w-1 whitespace-no-wrap text-right text-sm leading-5 font-medium"
                      >
                        <div class="flex">
                          <a
                            @click="edit(jugador)"
                            class="text-indigo-600 hover:text-indigo-900 text-xl"
                            ><span
                              class="iconify"
                              data-icon="mdi:book-edit-outline"
                              data-inline="false"
                            ></span
                          ></a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <router-link
                  :to="'/jugar/' + torneo.id"
                  v-if="torneo.campo && torneo.recorrido"
                >
                  <button
                    @click="save(torneo)"
                    v-if="ifJugar"
                    class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    JUGAR
                  </button>

                  <div
                    v-if="!ifJugar"
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong class="font-bold">Faltan datos</strong>
                    <span class="block sm:inline"
                      >Revise que todos los jugadores tiene hcp y barras
                      asociadas</span
                    >
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                      <svg
                        class="fill-current h-6 w-6 text-red-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <title>Close</title>
                        <path
                          d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                        />
                      </svg>
                    </span>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { useState } from "../store";
import {
  calcularPuntos,
  save,
  initTorneo,
  getIdTorneo,
} from "../calculos.js";
import { computed } from "vue";
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default {
  setup(props) {
    const campos = useState().campos;
    const recorridos = useState().recorridos;
    const torneo = useState().torneo;
    const edit = function (jugador) {
      torneo.nuevo = jugador;
      torneo.modoAdd = true;
      torneo.nuevo.edit = true;
    };
    const ifJugar = computed(() =>
      torneo.jugadores.reduce((acc, i) => acc && i.barras, true)
    );
    const addLista = function () {
      if (!torneo.nuevo.edit)
        torneo.jugadores.push(JSON.parse(JSON.stringify(torneo.nuevo)));
      torneo.modoAdd = false;

      if (!torneo.id) {
        torneo.id = getIdTorneo();
      }
      save(torneo);
    };
    const onChangeCampo = function () {
      torneo.recorrido = null;
      torneo.jugadores.forEach((element) => {
        element.barras = null;
      });
      torneo.modoAdd = false;
    };
    const onChangeRecorrido = function () {
      torneo.jugadores.forEach((element) => {
        element.barras = null;
      });
      torneo.modoAdd = false;
    };
    const onChangeBarras = function (jugador, porcentaje) {
      if (jugador.barras && jugador.hcp) {
        porcentaje = 1;
        const suma = jugador.barras.par.reduce((a, i) => a + i, 0);
        console.log('par', 'sumapar', suma, 'exacto', jugador.hcp, 'vs:', jugador.barras.par_total_vs , 'vc:', jugador.barras.par_total_vc, 'par:', suma,
        'sin redondear', (jugador.hcp * jugador.barras.par_total_vs) / 113 +
              jugador.barras.par_total_vc -
              suma)
        jugador.juego = Math.round(
          porcentaje *
            ((jugador.hcp * jugador.barras.par_total_vs) / 113 +
              jugador.barras.par_total_vc -
              suma)
        );
        repartoGolpes(jugador);
        calcularPuntos(jugador);
      }
    };
    const repartoGolpes = function (jugador) {
      const ordenado = jugador.barras.handicap
        .map((v, index) => ({ v, index }))
        .sort((a, b) => (a.v - b.v) * Math.sign(jugador.juego));

      let golpes = new Array(18).fill(0);
      console.log(jugador.juego);
      for (var i = 0; i < Math.abs(jugador.juego); i++) {
        golpes[ordenado[i % 18].index] += 1;
      }
      jugador.resultados.golpesAdd = golpes;
    };

    const agrupar = function (lista, key) {
      return lista.map((x) => x[key]).filter(onlyUnique);
    };
    const borrar = function (jugador) {
      const indice = torneo.jugadores.findIndex(
        (i) => i.nombre == jugador.nombre
      );
      if (indice != -1) {
        torneo.jugadores.splice(indice, 1);
      }
    };
    return { save,campos,recorridos,torneo,edit,ifJugar,addLista,onChangeCampo,onChangeRecorrido,onChangeBarras,repartoGolpes,agrupar,borrar };
  },
};
</script>