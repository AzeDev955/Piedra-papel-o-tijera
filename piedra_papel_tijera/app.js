import express from "express";
import db from "./database/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import partidasRoutes from "./routes/partidaRoutes.js";
import "./models/asociaciones.js";
const app = express();

app.use(express.json());

app.use("/usuarios", usuarioRoutes);
app.use("/partidas", partidasRoutes);

try {
  await db.authenticate();
  console.log("Oleole");

  app.listen(8000, () => {
    console.log("escuchamos el 8000");
  });
} catch {
  console.log("no va");
}
