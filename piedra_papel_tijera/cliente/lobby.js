import { crearHeader, construirApi } from "./helper/helper";
const btnLogout = document.getElementById("btnLogout");
const btnCrearPartida = document.getElementById("btnCrearPartida");
const listaPartidas = document.getElementById("listaPartidas");
const token = localStorage.getItem("token");

btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
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
    }
  } catch (error) {
    console.error(error);
  }
});
