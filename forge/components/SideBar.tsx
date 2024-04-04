"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

function SideBar(): ReactElement {
  const pathname = usePathname();
  return (
    <aside className={"flex justify-end gap-3"}>
      <Navbar
        shouldHideOnScroll
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
      >
        <NavbarBrand>
          <p className="font-bold text-inherit">Forge.io</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={pathname === "/"}>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === "/sign-up"}>
            <Link href="/sign-up" color="foreground" aria-current="page">
              Sign up
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === "/users"}>
            <Link color="foreground" href="users">
              Users List
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </aside>
  );
}

export default SideBar;
