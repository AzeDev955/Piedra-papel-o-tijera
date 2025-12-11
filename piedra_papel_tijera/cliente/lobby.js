const btnLogout = document.getElementById("btnLogout");
const btnCrearPartida = document.getElementById("btnCrearPartida");
const listaPartidas = document.getElementById("listaPartidas");
const token = localStorage.getItem("token");

btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "./login.html";
});
