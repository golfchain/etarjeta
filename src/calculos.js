import "firebase/database";
import firebase from "firebase/app";


let config = {
  apiKey: "=",
  authDomain: "=",
  databaseURL: "=",
};


firebase.initializeApp(config);

export const database = firebase.database();

// metodo JL
export const calcularPuntos = (jugador) => {
  jugador.resultados.puntos  = jugador.resultados.golpes.map((i, index) =>
    i == 0 ? 0 : Math.max(0, (jugador.barras.par[index] + 2 + jugador.resultados.golpesAdd[index] * Math.sign(jugador.juego) - i))
  );
}

export const puntos = (jugador, hoyo) => {
  if (jugador.resultados.golpes[hoyo] <= 0) {
    jugador.resultados.puntos[hoyo] = 0
    return jugador.resultados.puntos[hoyo]
  }

  jugador.resultados.puntos[hoyo] = Math.max(0, (jugador.barras.par[hoyo] + 2 + jugador.resultados.golpesAdd[hoyo] - jugador.resultados.golpes[hoyo]))

  return jugador.resultados.puntos[hoyo];
}


export const readTorneo = (torneo, id, campos, recorridos) => {

  firebase.database().ref('/etarjeta/' + id).once('value').then(function (snapshot) {

    //const tmp =  JSON.parse(localStorage.getItem(id))
    const tmp = JSON.parse(snapshot.val())
    torneo.id = tmp.id
    torneo.equipo = tmp.equipo
    torneo.fecha = tmp.fecha
    torneo.textoBuscar = tmp.textoBuscar
    torneo.hora = tmp.hora
    torneo.campo = campos.find(i => i.url == tmp.campo.url)
    torneo.recorrido = recorridos.find(i => i.campo == tmp.campo.url && tmp.recorrido == i.recorrido)
    torneo.recorrido = tmp.recorrido
    torneo.jugadores = tmp.jugadores.map(i => {
      i.barras = recorridos.find(r => r.campo == i.barras.campo && r.recorrido == i.barras.recorrido
        && r.sexo == i.barras.sexo && r.barras == i.barras.barras)
      return i
    });
  })
}


export const save = (torneo) => {
  torneo.jugadores.forEach((element) => {
    calcularPuntos(element);
  });
  localStorage.setItem(torneo.id, JSON.stringify(torneo));
  firebase.database().ref(`etarjeta/${torneo.id}`).set(JSON.stringify(torneo));
}

export const create = (torneo) => {
  localStorage.setItem(torneo.id, JSON.stringify(torneo));
  firebase.database().ref(`etarjeta/${torneo.id}`).set(JSON.stringify(torneo));
}

export const adicionales = function (jugador, hoyo) {
  // si el hcp es negativo aparecen - si positivo *
  return (jugador.juego < 0 ? "-" : "*").repeat(Math.abs(jugador.resultados.golpesAdd[hoyo]))
}

export const sumarGolpes = function (arr, desde, hasta) {
  return arr
    .filter((v, index) => index >= desde && index <= hasta)
    .reduce((acc, i) => acc + (i < 0 ? 0 : i), 0);
}

export const sumarArray = function (arr, desde, hasta) {
  return arr
    .filter((v, index) => index >= desde && index <= hasta)
    .reduce((acc, i) => acc + i, 0);
}

export const getIdTorneo = () => "gch_" + new Date().toISOString().replaceAll('-', '').replaceAll(':', '').replace('.', '')

export const initTorneo = (torneo) => {
  torneo.id = getIdTorneo()
  torneo.jugadores = [];
  torneo.fecha = null;
  torneo.equipo = ''
  torneo.hora = null;
  torneo.campo = null;
  torneo.recorrido = null;
  torneo.textoBuscar = "";
  torneo.modoAdd = false;
  torneo.nuevo.nombre = ""
  torneo.nuevo.edit = false
  torneo.nuevo.juego = 0
  torneo.nuevo.hcp = 0
  torneo.nuevo.barras = null
  torneo.nuevo.resultados = {
    golpesAdd: new Array(18).fill(0),
    golpes: new Array(18).fill(0),
    puntos: new Array(18).fill(0)
  };
};
