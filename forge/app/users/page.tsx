import { type ReactElement, Suspense, cache } from "react";
import { type UserDTO } from "../../domain/contracts/users.contract";
import UserMap from "../../domain/mappers/user.map";
import { findAllUsersUseCase } from "../../domain/usecases";

const getAllUsers = cache(async (): Promise<UserDTO[]> => {
  const result = await findAllUsersUseCase.execute();

  return result.map(UserMap.toDTO);
});

async function Page(): Promise<ReactElement> {
  const users = await getAllUsers();

  return (
    <div>
      <h1>Users</h1>
      <Suspense fallback={<div>Loading...</div>}>
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
