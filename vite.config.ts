import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  // root: "src", // index.html の読み込み場所を指定する。指定なしか、src/client などのどちらかの指定になるかな
  // ↓devserverのルートフォルダ、プログラム内での import.meta.env.BASE_URL の値になる。
  base: loadEnv("", process.cwd()).VITE_BASE_PATH || "/",
  plugins: [tailwindcss(), react()],
  build: {
    //outDir: "./../dist/"
  },
  test: {
    //globals: true, // .test.ts の中で直接itやexceptを使う時はコメントを解除する
    includeSource: ['src/**/*.{js,ts}'], // In-Source テストを行う時はコメントを解除する
  },

});