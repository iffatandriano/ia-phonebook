import React from "react";

import Container from "@/src/components/Container";
import Navbar from "@/src/components/navbar/Navbar";

import Filter from "./_components/Filter";
import { Input } from "@/src/components/ui/input";

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
          <div className="mx-2">
            <div className="flex py-2 px-4 justify-between items-center bg-white rounded-[8px]">
              <h1 className="font-semibold text-md">Phonebook</h1>
              <div>
                <Input
                  type="text"
                  placeholder="Search by phone, name"
                  className="rounded-[8px]"
                />
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
