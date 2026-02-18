import { defineConfig } from "cypress";

export default defineConfig({
    allowCypressEnv: false,

    projectId: "r4wabc",

    viewportHeight: 1000,
    viewportWidth: 1440,

    e2e: {
        setupNodeEvents(on, config) {
        // implement node event listeners here
        },
    },
});
