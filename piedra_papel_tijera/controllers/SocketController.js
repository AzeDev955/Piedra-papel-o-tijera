export const socketController = (socket, io) => {
  console.log("Conectau", socket.id);

  socket.on("unirse_partida", (id_partida) => {
    const sala = `partida_${id_partida}`;
    socket.join(sala);
    console.log(`Socket ${socket.id} se unió a la sala: ${sala}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado ID:", socket.id);
  });

  socket.on("cliente:nueva_partida", (data) => {
    io.emit("servidor:nueva_partida", data);
  });
};
