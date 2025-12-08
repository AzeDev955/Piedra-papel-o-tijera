import "dotenv/config";
import cors from "cors";
import express from "express";
import db from "./database/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import partidasRoutes from "./routes/partidaRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import "./models/asociaciones.js";
const app = express();

app.use(express.json());

app.use(cors());
app.use("/usuarios", usuarioRoutes);
app.use("/partidas", partidasRoutes);
app.use("/", authRoutes);

try {
  await db.authenticate();
  console.log("Oleole"); //ya que estoy dejo los mensajes, que me hacen gracia

  app.listen(8000, () => {
    console.log("escuchamos el 8000");
  });
} catch {
  console.log("no va");
}
