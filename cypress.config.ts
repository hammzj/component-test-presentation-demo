import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
    supportFile: 'cypress/support/component.tsx',
    viewportHeight: 720,
    viewportWidth: 1280,
  },
});
