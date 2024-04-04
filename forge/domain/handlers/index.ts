import AfterUserCreatedHandler from "./AfterUserCreated.handler";

(function registerSubscriptions(): void {
  try {
    new AfterUserCreatedHandler({
      execute: async () =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            console.log("Child useCase executed! 🚀");
            resolve();
          }, 1000);
        }),
    });

    console.log("[HANDLERS]: initialised 🎉");
  } catch (error) {
    console.error("Failed to initialise subscriptions with error: ");
    console.error(error);
    process.exit(1);
  }
})();
