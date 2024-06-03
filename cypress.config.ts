import { defineConfig } from "cypress";

export default defineConfig({
    component: {
        devServer: {
            framework: "create-react-app",
            bundler: "webpack",
            webpackConfig: {
                mode: "development",
                devtool: false,
                module: {
                    rules: [
                        {
                            test: /\.?js$/,
                            exclude: /node_modules/,
                            use: {
                                loader: "babel-loader",
                                options: {
                                    presets: ["@babel/preset-env", "@babel/preset-react"],
                                    plugins: [
                                        [
                                            "@babel/plugin-transform-modules-commonjs",
                                            { loose: true },
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
            },
        },
        supportFile: "cypress/support/component.tsx",
        viewportHeight: 720,
        viewportWidth: 1280,
    },

    e2e: {
        baseUrl: "http://localhost:3000/",
    },
});
