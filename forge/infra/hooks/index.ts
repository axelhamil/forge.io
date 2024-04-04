import { DomainEvents, HooksManager, type ID } from "@repo/core-domain";

(function createHooksForAggregateRoots(): void {
  // USER
  HooksManager.addHook("afterUserCreated", async (id: ID<string | number>) =>
    DomainEvents.dispatch(id),
  );

  // OTHER

  console.log("[HOOKS]: DB hooks initialised 🎉");
})();
