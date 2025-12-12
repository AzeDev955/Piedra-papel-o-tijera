import { io } from "socket.io-client";
import { crearHeader, construirApi } from "./helper/helper.js";

const socket = io("http://localhost:8000");
const token = sessionStorage.getItem("token");
const usuario = JSON.parse(sessionStorage.getItem("usuario"));

//const params = new URLSearchParams(window.location.search); de la IA, yo voy a hacerlo de otra manera
//const idPartida = params.get("id");
const partida_id = sessionStorage.getItem("partida_id"); //Asi
if (!token) {
  window.location.href = "/login.html";
}

const labelJ1 = document.getElementById("labelJ1");
const labelJ2 = document.getElementById("labelJ2");
const titulo = document.getElementById("idPartida");
const estadoDiv = document.getElementById("estadoJuego");
const btnVolver = document.getElementById("btnVolver");
const puntosJ1 = document.getElementById("puntosJ1");
const puntosJ2 = document.getElementById("puntosJ2");
const cartas = document.querySelectorAll(".carta");

titulo.innerText = partida_id;

socket.on("connect", () => {
  console.log("Conectado al servidor. Uniéndose a sala:", partida_id);
  socket.emit("unirse_partida", partida_id);
  identificarJugadores();
});

socket.on("jugada_realizada", (data) => {
  console.log("Evento recibido: jugada_realizada", data);

  if (data.jugador_que_movio != usuario.id) {
    estadoDiv.innerText = "Tu rival ha elegido";
    estadoDiv.style.background = "#e67e22";
  } else {
    estadoDiv.innerText = "Has elegido. Esperando al rival...";
  }
});

socket.on("turno_resuelto", (data) => {
  console.log("Evento recibido: turno_resuelto", data);

  const { resultado, marcador, manos, partidaTerminada, ganadorPartida } = data;

  puntosJ1.innerText = marcador.j1;
  puntosJ2.innerText = marcador.j2;

  let mensajeFinal = `Resultado: ${resultado}. `;
  mensajeFinal += `(J1: ${manos.j1} vs J2: ${manos.j2})`;

  estadoDiv.innerText = mensajeFinal;
  estadoDiv.style.background = "#27ae60";

  if (partidaTerminada) {
    estadoDiv.innerText += `\n🏆 ¡PARTIDA TERMINADA! Ganador: ${ganadorPartida}`;
    estadoDiv.style.background = "#8e44ad";

    cartas.forEach((c) => {
      c.style.pointerEvents = "none";
      c.style.opacity = "0.5";
    });
    return;
  } else {
    setTimeout(() => {
      estadoDiv.innerText = "Nueva ronda";
      estadoDiv.style.background = "#34495e";
    }, 5000);
  }
});

cartas.forEach((carta) => {
  carta.addEventListener("click", async () => {
    const mano = carta.dataset.mano;

    estadoDiv.innerText = `Enviando ${mano}...`;

    try {
      const response = await fetch(
        construirApi(`/partidas/${partida_id}/jugar`),
        crearHeader("POST", token, { mano: mano })
      );

      const datos = await response.json();

      if (response.ok) {
        console.log("Jugada enviada:", datos);
        if (datos.message === "Turno resuelto") {
          console.log("Esperando datos por socket...");
        } else {
          estadoDiv.innerText = datos.message || "Esperando al rival...";
        }
      } else {
        estadoDiv.innerText = datos.error || "Error al jugar";
        estadoDiv.style.background = "#c0392b";
      }
    } catch (error) {
      console.error(error);
    }
  });
});

btnVolver.addEventListener(
  "click",
  () => (window.location.href = "lobby.html")
);

const identificarJugadores = async () => {
  try {
    const endpoint = `/partidas/${partida_id}`;
    const response = await fetch(
      construirApi(endpoint),
      crearHeader("GET", token)
    );

    if (response.ok) {
      const partida = await response.json();
      if (partida.id_jugador1 == usuario.id) {
        labelJ1.innerText = `${usuario.nickname}`;
        labelJ1.style.color = "#f1c40f";
        labelJ2.innerHTML = `${partida.jugador2.nickname}`;
      } else if (partida.id_jugador2 == usuario.id) {
        labelJ2.innerText = `${usuario.nickname}`;
        labelJ2.style.color = "#f1c40f";
        labelJ1.innerHTML = `${partida.jugador1.nickname}`;
      }

      puntosJ1.innerText = partida.puntuacion_j1 || 0;
      puntosJ2.innerText = partida.puntuacion_j2 || 0;
    }
  } catch (error) {
    console.error("Error identificando jugadores:", error);
  }
};
