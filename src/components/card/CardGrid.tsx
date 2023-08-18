import React from "react";
import { MoreVertical } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface CardGridProps {
  name: string;
  phone: any;
  onClick: () => void;
}

const CardGrid: React.FC<CardGridProps> = ({ name, phone, onClick }) => {
  return (
    <div className="bg-white rounded-[8px]">
      <div className="flex justify-between items-center py-2 px-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border border-gray-200 flex justify-center items-center text-sm">
            IA
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm">{name}</h1>
            <span className="text-[10px] text-zinc-400">{phone}</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm">
              <MoreVertical size={12} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-10 mr-16 bg-white rounded-[8px]">
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
    </div>
  );
};

export default CardGrid;