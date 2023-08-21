"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import _ from "lodash";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

import { Contact } from "@/src/utils/types";
import CardList from "@/src/components/card/CardList";

interface SearchContactProps {
  contact: any;
}

const SearchContact: React.FC<SearchContactProps> = ({ contact }) => {
  const [search, setSearch] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const query = params.get("query");

  useEffect(() => {
    if (!_.isNull(query)) {
      setSearch(query);
    }
  }, [query]);

  const onChange = useCallback(
    (e: any) => {
      let searchTerm = e.target.value;

      setSearch(searchTerm);

      if (searchTerm === "") return router.push("/phonebook/search");

      router.push(`/phonebook/search?query=${searchTerm}`);
    },
    [router]
  );

  return (
    <div className="min-h-screen flex flex-col gap-3">
      <div className="bg-white rounded-[8px]">
        <div className="py-2 px-4 flex items-center gap-2">
          <Link href="/phonebook">
            <Button variant="ghost">
              <ChevronLeft size={24} />
            </Button>
          </Link>
          <div className="w-full">
            <Input
              type="text"
              placeholder="Search by phone, name"
              className="rounded-[8px]"
              autoFocus
              value={search}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>
      </div>
      {_.isEmpty(search) ? null : _.isEmpty(contact) && !_.isEmpty(search) ? (
        <span className="text-sm font-semibold text-red-500 flex justify-center items-center">
          No data found.
        </span>
      ) : (
        <div className="mx-2 p-1 bg-white rounded-[8px]">
          <div className="py-2 px-4 flex flex-col gap-4">
            {contact?.map((contact: Contact) => (
              <CardList
                key={contact.id}
                id={contact.id}
                first_name={contact.first_name}
                last_name={contact.last_name}
                phones={contact.phones}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchContact;
