"use client";
import React, { useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import _ from "lodash";

import CardGrid from "@/src/components/card/CardGrid";
import CardList from "@/src/components/card/CardList";
import { Button } from "@/src/components/ui/button";

import useViewMenus from "@/src/lib/store/useMenu";
import { Contact } from "@/src/utils/types";

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
      <div className="mt-8 px-4 mb-2 flex items-end justify-end">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              className="w-8 h-8 p-0"
              disabled={page === 0}
              onClick={() => previousPage(page)}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <div className="p-0 flex items-center text-md font-medium">
              {page + 1}
            </div>
            <Button
              variant="ghost"
              className="w-8 h-8 p-0"
              disabled={_.isEmpty(datas)}
              onClick={() => nextPage(page)}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
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
      <div className="mt-8 px-4 mb-2 flex items-end justify-end">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              className="w-8 h-8 p-0"
              disabled={page === 0}
              onClick={() => previousPage(page)}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <div className="p-0 flex items-center text-md font-medium">
              {page + 1}
            </div>
            <Button
              variant="ghost"
              className="w-8 h-8 p-0"
              disabled={_.isEmpty(datas)}
              onClick={() => nextPage(page)}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListPhones;
