import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "login.html"),
        login: resolve(__dirname, "login.html"),
        registro: resolve(__dirname, "registro.html"),
        lobby: resolve(__dirname, "lobby.html"),
      },
    },
  },
});
