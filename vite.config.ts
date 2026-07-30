import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
    base: mode === "production" ? "/Tic-Tac-Three/" : "/"
}));