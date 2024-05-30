import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack"
    },
    viewportHeight: 720,
    viewportWidth: 1280,
  },
});
