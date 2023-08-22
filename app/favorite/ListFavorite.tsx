"use client";
import React, { useCallback, useState } from "react";
import _ from "lodash";

import { useToast } from "@/src/components/ui/use-toast";

import CardGrid from "@/src/components/card/CardGrid";
import CardList from "@/src/components/card/CardList";

import useFavoriteStore from "@/src/utils/hooks/useFavoriteStore";

import useFavorite from "@/src/lib/store/useFavorite";
import useViewMenus from "@/src/lib/store/useMenu";

import { Contact } from "@/src/utils/types";

const ListFavorite = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { listViewMenu } = useViewMenus();
  const { removeFavorite } = useFavorite();
  const favorites = useFavoriteStore(useFavorite, (state) => state.favorites);

  const { toast } = useToast();

  const handleFavorite = useCallback(
    async (id: number) => {
      setIsLoading(true);

      await removeFavorite(id);

      toast({
        description: (
          <span className="mt-2 rounded-md p-2 text-green-600 text-sm font-semibold">
            Favorite has been deleted.
          </span>
        ),
      });

      setIsLoading(false);
    },
    [removeFavorite, setIsLoading, toast]
  );

  return listViewMenu === "list-grid" ? (
    <React.Fragment>
      <div
        className={`grid ${
          !_.isEmpty(favorites) ? "grid-cols-2 mx-2 p-1" : ""
        } gap-4`}
      >
        {_.isUndefined(favorites) || _.isEmpty(favorites) ? (
          <div className="max-w-[500px] mx-2 p-1 bg-white rounded-[8px]">
            <div className="py-2 px-4 flex flex-col gap-4">
              <span className="flex justify-center items-center text-sm text-red-500 font-medium">
                You dont have any favorite yet.
              </span>
            </div>
          </div>
        ) : (
          favorites?.map((favorite: Contact) => (
            <CardGrid
              key={favorite.id}
              id={favorite.id}
              first_name={favorite.first_name}
              last_name={favorite.last_name}
              phones={favorite.phones}
              isLoading={isLoading}
              handleFavorite={() => handleFavorite(favorite.id)}
              favorite
              haveFavorite
            />
          ))
        )}
      </div>
    </React.Fragment>
  ) : (
    <div className="mx-2 p-1 bg-white rounded-[8px]">
      <div className="py-2 px-4 flex flex-col gap-4">
        {_.isUndefined(favorites) || _.isEmpty(favorites) ? (
          <span className="flex justify-center items-center text-sm text-red-500 font-medium">
            You dont have any favorite yet.
          </span>
        ) : (
          favorites?.map((favorite: Contact) => (
            <CardList
              key={favorite.id}
              id={favorite.id}
              first_name={favorite.first_name}
              last_name={favorite.last_name}
              phones={favorite.phones}
              isLoading={isLoading}
              handleFavorite={() => handleFavorite(favorite.id)}
              favorite
              haveFavorite
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ListFavorite;
