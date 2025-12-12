export const jugarContraCpu = (req, res) => {
  const { mano } = req.body; // Lo que envía el jugador
  const opciones = ["piedra", "papel", "tijera"];

  const manoCpu = opciones[Math.floor(Math.random() * 3)];

  let resultado = "empate";

  if (mano === manoCpu) {
    resultado = "empate";
  } else if (
    (mano === "piedra" && manoCpu === "tijera") ||
    (mano === "papel" && manoCpu === "piedra") ||
    (mano === "tijera" && manoCpu === "papel")
  ) {
    resultado = "victoria";
  } else {
    resultado = "derrota";
  }

  res.json({
    mensaje: "Turno resuelto",
    manoJugador: mano,
    manoCpu: manoCpu,
    resultado: resultado,
  });
};
