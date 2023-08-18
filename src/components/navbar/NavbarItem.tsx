import React from "react";
import Link from "next/link";

import { Button } from "../ui/button";
import Icon from "../Icon";
// types
import { NavbarItemProps } from "@/src/utils/types";

const NavbarItem: React.FC<NavbarItemProps> = ({
  name,
  pathname,
  icon,
  color,
  selectedNav,
}) => {
  return (
    <Link href={pathname}>
      <Button variant="ghost" className="flex flex-col items-center h-auto">
        <Icon name={icon} size={28} color={color} />
        <span className={`text-sm ${selectedNav}`}>{name}</span>
      </Button>
    </Link>
  );
};

export default NavbarItem;
