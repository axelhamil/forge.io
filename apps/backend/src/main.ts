import "reflect-metadata";
import "@config/subscriptions";
import "@config/hooks";

import startServer from "@config/http";

(async (): Promise<void> => {
  await startServer();
})();
