"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { createUserDTOSchema } from "../../domain/contracts/users.contract";
import { createUserUseCase } from "../../domain/usecases";

export default async function createUserAction(
  formData: FormData,
): Promise<void> {
  try {
    const dto = createUserDTOSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await createUserUseCase.execute(dto);

    revalidateTag("users");
    redirect("/users/");
  } catch (error) {
    console.error(error);
  }
}
