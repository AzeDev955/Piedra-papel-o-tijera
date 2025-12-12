import { crearHeader, construirApi } from "./helper/helper";
const btnLogout = document.getElementById("btnLogout");
const btnCrearPartida = document.getElementById("btnCrearPartida");
const listaPartidas = document.getElementById("listaPartidas");
const token = localStorage.getItem("token");
const user_info = localStorage.getItem("usuario");
const spanUsuario = document.getElementById("nombreUsuario");

if (!token) {
  alert("Identificate!");
  window.location.href("./login.html");
} else {
  spanUsuario.innerHTML = user_info.nickname;
}

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
