import React from "react";
import { MoreVertical } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface CardListProps {
  name: string;
  phone: any;
  onClick: () => void;
}

const CardList: React.FC<CardListProps> = ({ name, phone, onClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-14 h-14 rounded-full border border-gray-200 flex justify-center items-center">
          IA
        </div>
        <div className="flex flex-col">
          <h1 className="text-md">{name}</h1>
          <span className="text-[10px] text-zinc-400">{phone}</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-10 mr-12 bg-white rounded-[8px]">
          <DropdownMenuLabel>Setting Phones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CardList;
