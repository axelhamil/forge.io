"use client";
import { type ReactElement, useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "~/components/icons/EyeSlashFillesIcon";
import { EyeFilledIcon } from "~/components/icons/EyeFilledIcon";

export default function InputPassword(): ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (): void => {
    setIsVisible(!isVisible);
  };

  return (
    <Input
      size="md"
      label="Password"
      placeholder="mysecretpassword1234"
      labelPlacement="outside"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-lg"
    />
  );
}
