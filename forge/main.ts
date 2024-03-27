import "reflect-metadata";
import "@app/domain/handlers";
import "@config/hooks";

import startServer from "@config/http";

(async (): Promise<void> => {
  await startServer();
})();
