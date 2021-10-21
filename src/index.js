import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import App from "./App";

Sentry.init({
  dsn: "https://175078a56e314a2a8624dc83e3ea199b@o975312.ingest.sentry.io/5931292",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
