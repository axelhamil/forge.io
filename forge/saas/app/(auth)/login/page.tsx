import { type ReactElement } from "react";
import { Button, Input } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { cn } from "~/utils/cn";
import { BackgroundBoxesContainer, Container } from "~/components/Container";
import InputPassword from "~/components/input/InputPassword";

export default function Page(): ReactElement {
  return (
    <div className="flex">
      <BackgroundBoxesContainer className="md:h-screen md:w-1/2 md:flex hidden">
        <div className="relative z-20">
          <h3 className={cn("text-xl font-medium text-white")}>Forge.io</h3>
        </div>
        <div className="flex flex-col gap-5 relative w-fit z-20">
          <h1 className={cn("text-5xl font-semibold text-white")}>
            Sign In to
          </h1>
          <h2 className={cn("text-3xl font-light text-white")}>
            Forge.io, the only NextJS SaaS Starter
          </h2>
        </div>
        <div className="relative z-20">
          <h6 className={cn("text-xs font-light text-white/50")}>
            ©2024 Forge.io All rights reserved. <br />
          </h6>
        </div>
      </BackgroundBoxesContainer>
      <Container
        className={cn(
          "h-screen md:w-1/2 w-full flex flex-col",
          "justify-center items-center px-0 bg-slate-950",
        )}
      >
        <div className="flex flex-col gap-16 w-7/12">
          <h2 className={cn("text-4xl font-medium text-foreground")}>
            Hi, Welcome Back! 👋
          </h2>
          <form className="flex flex-col gap-5">
            <Input
              size="md"
              type="email"
              label="Email"
              placeholder="john@doe.com"
              labelPlacement="outside"
            />
            <InputPassword />
            <Link
              color="primary"
              underline="none"
              href="#"
              className={cn("text-sm font-light self-end")}
            >
              Forgot password?
            </Link>

            <Button
              type="submit"
              color="primary"
              size="lg"
              className="uppercase text-lg medium"
            >
              Sign in
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
