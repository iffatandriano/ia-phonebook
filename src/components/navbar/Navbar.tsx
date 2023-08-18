"use client";

import React from "react";
import { usePathname } from "next/navigation";
import styled from "@emotion/styled";

import NavbarItem from "./NavbarItem";

import NavbarItems from "@/src/utils/data/DatasNavbar";
import { NavbarItem as NavItem } from "@/src/utils/types";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <NavbarContainer className="w-full h-auto bottom-0 flex flex-wrap justify-around items-center z-10 bg-white fixed">
      {NavbarItems?.map((navItem: NavItem, navIndex: number) => (
        <NavbarItem
          key={navIndex}
          name={navItem.name}
          pathname={navItem.pathname}
          icon={navItem.icon}
          color={
            pathname?.replace("/", "") === navItem.pathname
              ? "#16A34A"
              : "#D4D4D8"
          }
          selectedNav={
            pathname?.replace("/", "") === navItem.pathname
              ? "text-green-600"
              : "text-zinc-400"
          }
        />
      ))}
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  max-width: 500px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.138389);
`;

export default Navbar;
