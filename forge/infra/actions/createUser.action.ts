"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createUserUseCase } from "../../domain/usecases";
import { createUserDTOSchema } from "../../domain/contracts/users.contract";

export default async function createUserAction(
  formData: FormData,
): Promise<void> {
  try {
    const dto = createUserDTOSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await createUserUseCase.execute(dto);
  } catch (error) {
    console.error(error);
  }
  revalidateTag("users");
  redirect("/users/");
}
