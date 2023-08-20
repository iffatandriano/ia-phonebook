"use client";

import React from "react";

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

const Filter = () => {
  const { setListViewMenu, listViewMenu } = useViewMenus();
  return (
    <div className="mx-2 p-1">
      <div className="flex justify-between items-center bg-white rounded-[8px]">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Filter By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="created_at">
                <DropdownMenuRadioItem value="first_name">
                  First name
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="last_name">
                  Last name
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="sm">
            Sort
          </Button>
        </div>
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
