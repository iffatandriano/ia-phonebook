"use client";
import React, { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
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

  const previousPage = useCallback(
    (page: number) => {
      const backPage = page - 1;
      if (backPage === 0) {
        return router.push(`${pathname}`);
      }
      router.push(`${pathname}?page=${page - 1}`);
    },
    [pathname, router]
  );

  const nextPage = useCallback(
    (page: number) => {
      router.push(`${pathname}?page=${page + 1}`);
    },
    [pathname, router]
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
