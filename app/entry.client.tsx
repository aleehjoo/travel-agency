import * as Sentry from "@sentry/react-router";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

Sentry.init({
    dsn: "https://58ef3aa796eae7f66f6c6a613508eb01@o4509621816393728.ingest.us.sentry.io/4509621821046784",
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
    integrations: [
        Sentry.reactRouterTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set `tracePropagationTargets` to declare which URL(s) should have trace propagation enabled
    tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],
    // Capture Replay for 10% of all sessions,
    // plus 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});

startTransition(() => {
    hydrateRoot(
        document,
        <StrictMode>
            <HydratedRouter />
        </StrictMode>
    );
});
