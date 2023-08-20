"use client";
import React, { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import _ from "lodash";

import CardGrid from "@/src/components/card/CardGrid";
import CardList from "@/src/components/card/CardList";

import useViewMenus from "@/src/lib/store/useMenu";
import { Contact } from "@/src/utils/types";
import Pagination from "@/src/components/Pagination";

interface ListPhonesProps {
  datas: any;
  page: number;
}

const ListPhones: React.FC<ListPhonesProps> = ({ datas, page }) => {
  const { listViewMenu } = useViewMenus();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const previousPage = useCallback(
    (page: number) => {
      const backPage = page - 1;
      const currentParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      if (backPage === 0) {
        currentParams.delete("page", undefined);
        router.push(`${pathname}?${currentParams.toString()}`);
      } else {
        currentParams.set("page", `backPage`);
        router.push(`${pathname}?${currentParams.toString()}`);
      }
    },
    [pathname, router, searchParams]
  );

  const nextPage = useCallback(
    (page: number) => {
      const currentParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      currentParams.set("page", `${page + 1}`);
      router.push(`${pathname}?${currentParams.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return listViewMenu === "list-grid" ? (
    <React.Fragment>
      <div className="grid grid-cols-2 gap-4 mx-2 p-1">
        {datas?.map((contact: Contact) => (
          <CardGrid
            key={contact.id}
            first_name={contact.first_name}
            last_name={contact.last_name}
            phones={contact.phones}
            onClick={() => {}}
          />
        ))}
      </div>
      <Pagination
        datas={datas}
        page={page}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </React.Fragment>
  ) : (
    <div className="mx-2 p-1 bg-white rounded-[8px]">
      <div className="py-2 px-4 flex flex-col gap-4">
        {datas?.map((contact: Contact) => (
          <CardList
            key={contact.id}
            first_name={contact.first_name}
            last_name={contact.last_name}
            phones={contact.phones}
            onClick={() => {}}
          />
        ))}
      </div>
      <Pagination
        datas={datas}
        page={page}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
};

export default ListPhones;
