export const crearHeader = (metodo, token, datos = null) => {
  const opciones = {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  if (datos) {
    opciones.body = JSON.stringify(datos);
  }

  return opciones;
};

export const construirApi = (endpoint) => {
  const urlBase = "http://localhost:8000";

  return urlBase + endpoint;
};
