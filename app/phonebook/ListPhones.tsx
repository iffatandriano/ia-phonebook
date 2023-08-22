"use client";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import _ from "lodash";

import CardGrid from "@/src/components/card/CardGrid";
import CardList from "@/src/components/card/CardList";

import useViewMenus from "@/src/lib/store/useMenu";
import { Contact } from "@/src/utils/types";
import Pagination from "@/src/components/Pagination";
import useContact from "@/src/lib/store/useContact";
import useFavorite from "@/src/lib/store/useFavorite";
import useFavoriteStore from "@/src/utils/hooks/useFavoriteStore";
import { useToast } from "@/src/components/ui/use-toast";
import CardListSkeleton from "@/src/components/skeletons/card/CardListSkeleton";

interface ListPhonesProps {
  datas: any;
  page: number;
}

const ListPhones: React.FC<ListPhonesProps> = ({ datas, page }) => {
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { listViewMenu } = useViewMenus();
  const { contacts, setContacts, removeContacts } = useContact();
  const { setFavorites } = useFavorite();
  const favorites = useFavoriteStore(useFavorite, (state) => state.favorites);

  const { toast } = useToast();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoadingData(true);
    if (datas) {
      setContacts(datas);
      setTimeout(() => {
        setIsLoadingData(false);
      }, 3000);
    }
  }, [datas, setContacts]);

  const previousPage = useCallback(
    (page: number) => {
      const backPage = page - 1;
      const currentParams = new URLSearchParams(
        Array.from(searchParams.entries())
      );
      if (backPage === 0) {
        currentParams.delete("page");
        router.push(`${pathname}?${currentParams.toString()}`);
      } else {
        currentParams.set("page", `${page - 1}`);
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

  const handleFavorite = useCallback(
    async (favorite: any) => {
      setIsLoading(true);

      await setFavorites(favorite);
      await removeContacts(favorite.id);

      toast({
        description: (
          <span className="mt-2 rounded-md p-2 text-green-600 text-sm font-semibold">
            Your contact has been saved to favorite.
          </span>
        ),
      });

      setIsLoading(false);
    },
    [setFavorites, setIsLoading, removeContacts, toast]
  );

  if (isLoadingData) {
    return <CardListSkeleton />;
  }

  return listViewMenu === "list-grid" ? (
    <React.Fragment>
      <div className="grid grid-cols-2 gap-4 mx-2 p-1">
        {contacts?.map((contact: Contact) => (
          <CardGrid
            key={contact.id}
            id={contact.id}
            first_name={contact.first_name}
            last_name={contact.last_name}
            phones={contact.phones}
            isLoading={isLoading}
            handleFavorite={() => handleFavorite(contact)}
            favorite
          />
        ))}
      </div>
      {!_.isEmpty(contacts) && (
        <Pagination
          datas={contacts}
          page={page}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
    </React.Fragment>
  ) : (
    <div className="mx-2 p-1 bg-white rounded-[8px]">
      <div className="py-2 px-4 flex flex-col gap-4">
        {contacts
          ?.filter(
            (item) =>
              !_.some(favorites, (favorite: any) => favorite.id === item.id) &&
              item
          )
          .map((contact: Contact) => (
            <CardList
              key={contact.id}
              id={contact.id}
              first_name={contact.first_name}
              last_name={contact.last_name}
              phones={contact.phones}
              isLoading={isLoading}
              handleFavorite={() => handleFavorite(contact)}
              favorite
            />
          ))}
      </div>
      {!_.isEmpty(contacts) && (
        <Pagination
          datas={contacts}
          page={page}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
};

export default ListPhones;
