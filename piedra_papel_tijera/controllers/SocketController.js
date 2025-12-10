export const socketController = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ Cliente conectado ID:", socket.id);

    // EVENTO: Unirse a una sala de partida
    // El cliente (frontend) emitirá: socket.emit("unirse_partida", 4);
    socket.on("unirse_partida", (id_partida) => {
      const sala = `partida_${id_partida}`;
      socket.join(sala);
      console.log(`Socket ${socket.id} se unió a la sala: ${sala}`);

      io.to(sala).emit("usuario_unido", { mensaje: "Alguien ha entrado" });
    });

    // EVENTO: Desconexión
    socket.on("disconnect", () => {
      console.log("Adiossss", socket.id);
    });
  });
};
