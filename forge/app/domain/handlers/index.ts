import Logger from "@utils/logger";

import AfterUserCreatedHandler from "./events/AfterUserCreated.handler";

(async function registerSubscriptions(): Promise<void> {
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

    Logger.log("[HANDLERS]: initialised 🎉");
  } catch (error) {
    Logger.error("Failed to initialise subscriptions with error: ");
    console.error(error);
    process.exit(1);
  }
})();
