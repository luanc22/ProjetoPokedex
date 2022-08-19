import { resolve } from "path";
import { defineConfig } from "vite";
import { ghPages } from "vite-plugin-gh-pages";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  base: "/ProjetoPokedex/",
  plugins: [ghPages()],
  root: root,
  build: {
    outDir: outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
      }
    }
  },
  publicDir: "../public",
});