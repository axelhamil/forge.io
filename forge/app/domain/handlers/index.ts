import Logger from "@utils/logger";

import AfterUserCreated from "./afterUserCreated";

(async function registerSubscriptions(): Promise<void> {
  try {
    new AfterUserCreated({
      execute: async () =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            console.log("Child useCase executed! 🚀");
            resolve();
          }, 1000);
        }),
    });

    Logger.log("[HANDLERS]: initialised 🎉");
  } catch (error) {
    Logger.error("Failed to initialise subscriptions with error: ");
    console.error(error);
    process.exit(1);
  }
})();
