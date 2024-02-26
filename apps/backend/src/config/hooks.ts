import { DomainEvents, ID } from "@repo/core-domain";
import HooksManager from "@utils/hooksManager";
import Logger from "@utils/logger";

(async function createHooksForAggregateRoots(): Promise<void> {
  // USER
  HooksManager.addHook("afterUserCreated", async (id: ID<string | number>) =>
    DomainEvents.dispatch(id),
  );

  // OTHER

  Logger.log("[HOOKS]: DB hooks initialised 🎉");
})();
