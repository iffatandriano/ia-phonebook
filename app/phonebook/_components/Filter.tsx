"use client";

import React, { useState } from "react";

import { Button } from "@/src/components/ui/button";
import { StretchHorizontal, Table } from "lucide-react";
import useViewMenus from "@/src/lib/store/useMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";

interface FilterProps {
  sort?: boolean;
}

const Filter: React.FC<FilterProps> = ({ sort }) => {
  const { setListViewMenu, listViewMenu } = useViewMenus();

  const router = useRouter();
  const pathname = usePathname();

  const [sortBy, setSortBy] = useState("latest");

  const handleSort = (value: string) => {
    setSortBy(value);
    router.push(`${pathname}?sort_by=${value}`);
  };

  return (
    <div className="mx-2 p-1">
      <div
        className={`flex ${
          sort ? "justify-between items-center" : "justify-end items-end"
        } bg-white rounded-[8px]`}
      >
        {sort && (
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="ml-20">
                <DropdownMenuRadioGroup
                  value={sortBy}
                  onValueChange={handleSort}
                >
                  <DropdownMenuRadioItem value="latest">
                    Latest
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="a-z">A-Z</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="z-a">Z-A</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <div className="flex">
          <Button variant="ghost" onClick={() => setListViewMenu("list")}>
            <StretchHorizontal
              size={16}
              color={listViewMenu === "list" ? "#16A34A" : "#000"}
            />
          </Button>
          <Button variant="ghost" onClick={() => setListViewMenu("list-grid")}>
            <Table
              size={16}
              color={listViewMenu === "list-grid" ? "#16A34A" : "#000"}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
