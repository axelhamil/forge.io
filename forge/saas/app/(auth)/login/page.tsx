import { type ReactElement } from "react";
import { Button, Input, Link } from "@nextui-org/react";
import { cn } from "~/utils/cn";
import { BackgroundBoxesContainer, Container } from "~/components/Container";
import InputPassword from "~/components/input/InputPassword";
import { H1, H2, H3, H5, H6 } from "~/components/Heading";

export default function Page(): ReactElement {
  return (
    <div className="flex">
      <BackgroundBoxesContainer
        className={cn(
          "md:h-screen md:w-1/2 md:flex hidden [&>div]:justify-between",
        )}
      >
        <Link href="/" size="lg" className="relative z-30 hover:cursor-pointer">
          <H5 className="text-white">Forge.io</H5>
        </Link>
        <div className="flex flex-col gap-5 relative w-fit z-20">
          <H1 className="text-white">Sign In to</H1>
          <H3 className="text-white">Forge.io - Your NextJS SaaS Starter</H3>
        </div>
        <H6 className="relative z-20 text-white/50">
          ©2024 Forge.io. All rights reserved. <br /> Powered by Forge.io 🔥
          The ultimate SaaS boilerplate.
        </H6>
      </BackgroundBoxesContainer>

      <Container
        className={cn(
          "md:w-1/2 w-full h-screen gap-10",
          "flex flex-col justify-center items-center",
          "dark:bg-slate-950 light:bg-background",
        )}
      >
        <form className="flex flex-col gap-10 md:w-1/2 w-3/4">
          <H2>Hi, Welcome Back! 🚀️</H2>
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
      </Container>
    </div>
  );
}
