import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/src/components/ui/button";

import Container from "@/src/components/Container";
import Navbar from "@/src/components/navbar/Navbar";
import Filter from "../phonebook/_components/Filter";
import ListFavorite from "./ListFavorite";

export default function FavoritePage() {
  return (
    <Container>
      <div className="flex flex-col">
        <div className="min-h-screen flex flex-col gap-1 mb-16">
          <div className="bg-white rounded-[8px]">
            <div className="flex py-2 px-4 justify-between items-center">
              <h1 className="font-semibold text-md">Favorite Phonebook</h1>
              <div className="flex flex-row items-center">
                <Link href="/phonebook/search">
                  <Button variant="ghost">
                    <Search size={22} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <Filter />
          <ListFavorite />
        </div>
        <Navbar />
      </div>
    </Container>
  );
}
