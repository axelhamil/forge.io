import { DomainEvents, HooksManager, type ID, Logger } from "@repo/core-domain";

(function createHooksForAggregateRoots(): void {
  // USER
  HooksManager.addHook("afterUserCreated", async (id: ID<string | number>) =>
    DomainEvents.dispatch(id),
  );

  // OTHER

  Logger.info("[HOOKS]: DB hooks initialised 🎉");
})();
