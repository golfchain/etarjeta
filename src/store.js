import { reactive, provide, inject } from 'vue';

export const stateSymbol = Symbol('state');
import campos from "./assets/campos.json";
import recorridos from "./assets/recorridos.json";


export const createState = () => {
     var torneo = {
            id:null,
            campo: null,
            recorrido: null,
            textoBuscar: "",
            modoAdd: false,
            equipo:null,
            fecha:null,
            hora:null,
            nuevo:{
                nombre:""    ,
                edit:false,
                juego:0,
                hcp:0,
                barras:null,
                resultados: { "golpesAdd": new Array(18).fill(0), "golpes": new Array(18).fill(0), "puntos": new Array(18).fill(0) } 
            },
            jugadores: [
            ],
        }
    return reactive({
        campos: campos.filter(i => recorridos.filter(r => r.campo == i.url).length > 0),
        recorridos: recorridos,
        torneo: torneo
    })
};

export const useState = () => inject(stateSymbol);
export const provideState = () => provide(
    stateSymbol,
    createState()
);
