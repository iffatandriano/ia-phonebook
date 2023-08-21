import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import Container from "@/src/components/Container";
import Navbar from "@/src/components/navbar/Navbar";
import { Button } from "@/src/components/ui/button";

import Filter from "./_components/Filter";
import AddPhoneDialog from "./_components/AddPhoneDialog";

import ListPhones from "./ListPhones";

import { getClient } from "@/src/graphql/client";
import { GetContactListDocument } from "@/src/graphql/contact/contacts.generated";
import _ from "lodash";
import { Order_By } from "@/src/graphql/types.generated";

export const dynamic = "force-dynamic";

interface PhonebookPageProps {
  searchParams: any;
}

export default async function PhonebookPage({
  searchParams,
}: PhonebookPageProps) {
  const { data } = await getClient().query({
    query: GetContactListDocument,
    variables: {
      limit: 10,
      offset:
        _.isNaN(searchParams?.page) || _.isUndefined(searchParams?.page)
          ? 0
          : Number(searchParams?.page),
      order_by:
        searchParams?.sort_by === "a-z" || searchParams?.sort_by === "z-a"
          ? {
              first_name:
                searchParams?.sort_by === "a-z"
                  ? Order_By.AscNullsFirst
                  : Order_By.DescNullsFirst,
            }
          : {
              id: Order_By.DescNullsFirst,
              created_at: Order_By.Desc,
            },
    },
  });

  return (
    <Container>
      <div className="flex flex-col">
        <div className="min-h-screen flex flex-col gap-1 mb-16">
          <div className="bg-white rounded-[8px]">
            <div className="flex py-2 px-4 justify-between items-center">
              <h1 className="font-semibold text-md">Phonebook</h1>
              <div className="flex flex-row items-center">
                <Link href="/phonebook/search">
                  <Button variant="ghost">
                    <Search size={22} />
                  </Button>
                </Link>
                <AddPhoneDialog />
              </div>
            </div>
          </div>
          <Filter />
          <ListPhones
            datas={data?.contact}
            page={Number(searchParams?.page) | 0}
          />
        </div>
        <Navbar />
      </div>
    </Container>
  );
}
