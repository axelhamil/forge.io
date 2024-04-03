import { DomainEvents, HooksManager, ID } from "@repo/core-domain";

(async function createHooksForAggregateRoots(): Promise<void> {
  // USER
  HooksManager.addHook("afterUserCreated", async (id: ID<string | number>) =>
    DomainEvents.dispatch(id),
  );

  // OTHER

  console.log("[HOOKS]: DB hooks initialised 🎉");
})();
