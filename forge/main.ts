import "reflect-metadata";
import "@app/domain/handlers";
import "@app/infra/repositories/hooks";

import startServer from "@config/http";

(async (): Promise<void> => {
  await startServer();
})();
