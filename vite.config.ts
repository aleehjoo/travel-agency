import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";

const sentryConfig: SentryReactRouterBuildOptions = {
    org: "js-mastery-6g",
    project: "travel-agency",
    authToken: "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"
};

export default defineConfig(config => {
    return {
        plugins: [
            tailwindcss(),
            tsconfigPaths(),
            reactRouter(),
            sentryReactRouter(sentryConfig, config)
        ],
        sentryConfig,
        ssr: {
            noExternal: [/@syncfusion/]
        },
        build: {
            rollupOptions: {
                external: ["@google/generative-ai"] // 👈 tell Vite not to bundle this
            }
        }
    };
});
