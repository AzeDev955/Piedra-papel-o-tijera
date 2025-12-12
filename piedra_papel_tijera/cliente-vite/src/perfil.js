import { crearHeader, construirApi } from "./helper/helper.js";

const token = sessionStorage.getItem("token");

if (!token) {
  window.location.href = "/login.html";
}

const cargarDatos = async () => {
  try {
    const response = await fetch(
      construirApi("/usuarios/perfil"),
      crearHeader("GET", token)
    );

    if (response.ok) {
      const usuario = await response.json();

      document.getElementById("p_nick").innerText = usuario.nickname;
      document.getElementById("p_email").innerText = usuario.email;
      document.getElementById("p_password").innerText = usuario.password;
    } else {
      alert("Error cargando perfil");
    }
  } catch (error) {
    console.error(error);
  }
};

cargarDatos();
