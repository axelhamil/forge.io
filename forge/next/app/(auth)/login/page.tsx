import { type ReactElement } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { cn } from "~/utils/cn";
import { BackgroundBoxesContainer } from "~/app/_components/BackgroundBoxesContainer";
import InputPassword from "~/app/_components/input/InputPassword";

export default function Page(): ReactElement {
  return (
    <div className="flex">
      <BackgroundBoxesContainer
        className={cn(
          "md:h-screen md:w-1/2 md:flex hidden",
          "[&>div]:justify-between [&>div]:pl-20 [&>div]:py-10",
        )}
      >
        <Link href="/" size="lg" className="relative z-20 hover:cursor-pointer">
          <h5 className="text-lg font-light text-white">Forge.io</h5>
        </Link>
        <div className="flex flex-col gap-5 relative w-fit z-20">
          <h1 className="text-4xl font-bold text-white">Sign In to</h1>
          <h3 className="text-2xl font-medium text-white">
            Forge.io - Your NextJS SaaS Starter
          </h3>
        </div>
        <h6 className="text-xs font-extralight relative z-20 text-white/50">
          ©2024 Forge.io. All rights reserved. <br /> Powered by Forge.io 🔥
          The ultimate SaaS boilerplate.
        </h6>
      </BackgroundBoxesContainer>

      <div
        className={cn(
          "flex flex-col md:w-1/2 w-full h-screen gap-8",
          "flex flex-col justify-center items-center",
          "dark:bg-slate-950 light:bg-background",
        )}
      >
        <form className="flex flex-col gap-8 md:w-1/2 w-3/4">
          <h1 className="text-3xl font-semibold">Hi, Welcome Back! 🚀️</h1>
          <Input
            size="md"
            type="email"
            label="Email"
            placeholder="john@doe.com"
            labelPlacement="outside"
            radius="sm"
          />
          <InputPassword />
          <Link
            color="primary"
            underline="none"
            href="#"
            size="sm"
            className={cn("font-light self-end")}
          >
            Forgot password?
          </Link>

          <Button
            type="submit"
            color="success"
            variant="ghost"
            size="lg"
            radius="sm"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
