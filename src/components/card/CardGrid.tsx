import React from "react";
import { useRouter } from "next/navigation";
import { BookmarkIcon, MoreVertical } from "lucide-react";

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

import Loading from "../Loading";

import { Phone } from "@/src/utils/types";

interface CardGridProps {
  id: number;
  first_name: string;
  last_name: string;
  phones: Array<Phone>;
  isLoading?: boolean;
  favorite?: boolean;
  haveFavorite?: boolean;
  handleFavorite?: () => void;
}

const CardGrid: React.FC<CardGridProps> = ({
  id,
  first_name,
  last_name,
  phones,
  isLoading,
  favorite,
  haveFavorite,
  handleFavorite,
}) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-[8px]">
      <div className="flex justify-between items-center py-2 px-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full border border-gray-200 flex justify-center items-center text-sm">
            {first_name?.charAt(0)}
            {last_name?.charAt(0)}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm">
              {first_name} {last_name}
            </h1>
            <span className="text-[10px] text-zinc-400">
              {phones[0]?.number}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          {favorite && (
            <Button variant="ghost" size="sm" onClick={handleFavorite}>
              {isLoading ? (
                <Loading />
              ) : (
                <BookmarkIcon
                  className="w-4 h-4"
                  color={haveFavorite ? "#16A34A" : "#000"}
                />
              )}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical size={12} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-10 mr-16 bg-white rounded-[8px]">
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
      </div>
    </div>
  );
};

export default CardGrid;
