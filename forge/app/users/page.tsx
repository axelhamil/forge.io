import { ReactElement, Suspense } from "react";

import { UserDTO } from "../../domain/contracts/users.contract";
import UserMap from "../../domain/mappers/user.map";
import { findAllUsersUseCase } from "../../domain/usecases";

async function getAllUsers(): Promise<UserDTO[]> {
  const result = await findAllUsersUseCase.execute();
  return result.map(UserMap.toDTO);
}

async function Page(): Promise<ReactElement> {
  const users = await getAllUsers();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <h1>Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
}

export default Page;
