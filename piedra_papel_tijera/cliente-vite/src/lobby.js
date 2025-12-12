import { io } from "socket.io-client";
import { crearHeader, construirApi } from "./helper/helper";
const btnCpu = document.getElementById("btnJugarCpu");
const btnLogout = document.getElementById("btnLogout");
const btnCrearPartida = document.getElementById("btnCrearPartida");
const listaPartidas = document.getElementById("listaPartidas");
const token = sessionStorage.getItem("token");
const user_info = JSON.parse(sessionStorage.getItem("usuario"));
const spanUsuario = document.getElementById("nombreUsuario");

const socket = io("http://localhost:8000");

if (!token) {
  alert("Identificate!");
  window.location.href = "./login.html";
} else {
  spanUsuario.innerHTML = user_info.nickname;
}

btnCpu.addEventListener("click", () => {
  window.location.href = "/juegoCPU.html";
});

btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  sessionStorage.clear();
  window.location.href = "./login.html";
});

btnCrearPartida.addEventListener("click", async () => {
  const endpoint = "/partidas/crear";
  try {
    const response = await fetch(
      construirApi(endpoint),
      crearHeader("POST", token)
    );
    if (!response.ok) {
      console.log("Ayuda");
    } else {
      const nuevaPartida = await response.json();
      socket.emit("cliente:nueva_partida", nuevaPartida);
      sessionStorage.setItem("partida_id", nuevaPartida.id);
      window.location.href = "/juego.html";
    }
  } catch (error) {
    console.error(error);
  }
});

socket.on("servidor:nueva_partida", (partida) => {
  console.log("Nueva partida recibida por socket:", partida);
  pintarPartida(partida);
});

const pintarPartida = (partida) => {
  const div = document.createElement("div");
  div.className = "game-card";

  let estadoHtml = "";
  let botonHtml = "";

  if (partida.estado === 0) {
    estadoHtml = '<div class="status status-waiting">🟢 Esperando Rival</div>';
    botonHtml = `<button class="btn-join" id="btn-join-${partida.id}">Unirse</button>`;
  } else {
    estadoHtml = '<div class="status status-playing">🔴 Jugando</div>';
    botonHtml = '<button class="btn-full" disabled>Completa</button>';
  }

  div.innerHTML = `
      <div class="card-header">
          <span>Partida #${partida.id}</span>
      </div>
      ${estadoHtml}
      ${botonHtml}
  `;

  listaPartidas.appendChild(div);

  const btnJoin = document.getElementById(`btn-join-${partida.id}`);
  if (btnJoin) {
    btnJoin.addEventListener("click", async () => {
      console.log("Unirse a partida:", partida.id);
      try {
        const response = await fetch(
          construirApi(`/partidas/unirse/${partida.id}`),
          crearHeader("PUT", token)
        );
        if (response.ok) {
          sessionStorage.setItem("partida_id", partida.id);
          window.location.href = "/juego.html";
        } else {
          console.error("Error al unirse");
        }
        window.location.href = "/juego.html";
      } catch (error) {
        console.error(error);
      }
    });
  }
};

const cargarPartidasExistentes = async () => {
  try {
    const endpoint = "/partidas";
    const response = await fetch(
      construirApi(endpoint),
      crearHeader("GET", token)
    );

    if (response.ok) {
      const partidas = await response.json();
      listaPartidas.innerHTML = "";
      const disponibles = partidas.filter((partida) => partida.estado === 0);
      disponibles.forEach((p) => pintarPartida(p));
    }
  } catch (error) {
    console.error("Error cargando partidas:", error);
  }
};

cargarPartidasExistentes();
setInterval(cargarPartidasExistentes, 10000);
