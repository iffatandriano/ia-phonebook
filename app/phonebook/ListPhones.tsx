"use client";
import React from "react";

import CardGrid from "@/src/components/card/CardGrid";
import CardList from "@/src/components/card/CardList";

import useViewMenus from "@/src/lib/store/useMenu";

interface ListPhonesProps {
  datas: any;
}

const ListPhones: React.FC<ListPhonesProps> = ({ datas }) => {
  const { listViewMenu } = useViewMenus();
  return listViewMenu === "list-grid" ? (
    <div className="grid grid-cols-2 gap-4 mx-2 p-1">
      {datas?.map((item: any, itemIndex: number) => (
        <CardGrid
          key={itemIndex}
          first_name={item.first_name}
          last_name={item.last_name}
          phones={item.phones}
          onClick={() => {}}
        />
      ))}
    </div>
  ) : (
    <div className="mx-2 p-1 bg-white rounded-[8px]">
      <div className="py-2 px-4 flex flex-col gap-4">
        {datas?.map((item: any, itemIndex: number) => (
          <CardList
            key={itemIndex}
            first_name={item.first_name}
            last_name={item.last_name}
            phones={item.phones}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default ListPhones;
