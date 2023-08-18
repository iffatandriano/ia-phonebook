import React from "react";
import Link from "next/link";
import { PlusCircle, Search } from "lucide-react";

import Container from "@/src/components/Container";
import Navbar from "@/src/components/navbar/Navbar";
import { Button } from "@/src/components/ui/button";

import Filter from "./_components/Filter";

import ListPhones from "./ListPhones";

const datas = [
  {
    name: "Iffat",
    phone: "+62 852 1234 1233",
  },
  {
    name: "Iffat Andriano",
    phone: "+62 852 1234 1233",
  },
  {
    name: "Andriano",
    phone: "+62 852 1234 1233",
  },
];

export default function PhonebookPage() {
  return (
    <Container>
      <div className="flex flex-col">
        <div className="min-h-screen flex flex-col gap-3">
          <div className="bg-white rounded-[8px]">
            <div className="flex py-2 px-4 justify-between items-center">
              <h1 className="font-semibold text-md">Phonebook</h1>
              <div className="flex flex-row items-center">
                <Link href="/phonebook/search">
                  <Button variant="ghost">
                    <Search size={22} />
                  </Button>
                </Link>
                <Button variant="ghost">
                  <PlusCircle size={22} color="#16A34A" />
                </Button>
              </div>
            </div>
          </div>
          <Filter />
          <ListPhones datas={datas} />
        </div>
        <Navbar />
      </div>
    </Container>
  );
}
