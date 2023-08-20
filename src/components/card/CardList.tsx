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
import { Phone } from "@/src/utils/types";
import { useRouter } from "next/navigation";

interface CardListProps {
  id: number;
  first_name: string;
  last_name: string;
  phones: Array<Phone>;
}

const CardList: React.FC<CardListProps> = ({
  id,
  first_name,
  last_name,
  phones,
}) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-14 h-14 rounded-full border border-gray-200 flex justify-center items-center">
          {first_name?.charAt(0)}
          {last_name?.charAt(0)}
        </div>
        <div className="flex flex-col">
          <h1 className="text-md">
            {first_name} {last_name}
          </h1>
          <span className="text-[10px] text-zinc-400">{phones[0]?.number}</span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-10 mr-12 bg-white rounded-[8px]">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push(`/phonebook/contact/${id}`)}
            >
              View details
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CardList;
