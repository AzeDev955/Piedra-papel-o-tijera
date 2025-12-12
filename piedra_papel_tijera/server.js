//No se exactamente donde meter este archivo
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import db from "./database/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import partidaRoutes from "./routes/partidaRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { socketController } from "./controllers/SocketController.js";

import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
class MiServer {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;

    this.paths = {
      auth: "/",
      usuarios: "/usuarios",
      partidas: "/partidas",
    };

    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.dbConnection();

    this.middlewares();

    this.routes();

    this.sockets();
  }

  async dbConnection() {
    try {
      await db.sync({ alter: true });
      console.log("Base de datos online y sincronizada");
    } catch (error) {
      console.log("Error al conectar con la BD:", error);
    }
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    this.app.use(express.static(path.join(__dirname, "cliente")));

    this.app.use((req, res, next) => {
      req.io = this.io;
      next();
    });
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.usuarios, usuarioRoutes);
    this.app.use(this.paths.partidas, partidaRoutes);
  }

  sockets() {
    this.io.on("connection", (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

export default MiServer;
