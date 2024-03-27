import { DomainEvents, IHandle, UseCase } from "@repo/core-domain";

import UserCreated from "../../entities/user/events/userCreated.event";

class AfterUserCreatedHandler implements IHandle {
  private useCase: any;

  constructor(useCase: UseCase<any, any>) {
    this.setupSubscriptions();
    this.useCase = useCase;
  }

  public setupSubscriptions(): void {
    DomainEvents.subscribe(this.onUserCreated.bind(this), UserCreated.name);
  }

  private async onUserCreated(event: UserCreated): Promise<void> {
    const { user } = event;

    try {
      await this.useCase.execute(user);
      console.log(`[AfterUserCreated]: --UseCaseName-- executed successfully`);
    } catch (error) {
      console.log(
        `[AfterUserCreated]: --UseCaseName-- failed to execute: ${(error as Error).message}`,
      );
      throw error;
    }
  }
}

export default AfterUserCreatedHandler;
