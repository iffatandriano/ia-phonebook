import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/src/components/ui/button";

import Container from "@/src/components/Container";
import Navbar from "@/src/components/navbar/Navbar";
import Filter from "../phonebook/_components/Filter";
import ListFavorite from "./ListFavorite";
import Header from "@/src/components/Header";

export default function FavoritePage() {
  const actionHeader = (
    <Link href="/phonebook/search">
      <Button variant="ghost">
        <Search size={22} />
      </Button>
    </Link>
  );

  return (
    <Container>
      <div className="flex flex-col">
        <div className="min-h-screen flex flex-col gap-1 mb-16">
          <Header name="Favorite Phonebook" action={actionHeader} />
          <Filter />
          <ListFavorite />
        </div>
        <Navbar />
      </div>
    </Container>
  );
}
