import { create } from "zustand";

interface ViewMenusProps {
  listViewMenu: string;
  setListViewMenu: (menu: string) => void;
}

const useViewMenus = create<ViewMenusProps>((set) => ({
  listViewMenu: "list",
  setListViewMenu: (menu: string) =>
    set({
      listViewMenu: menu,
    }),
}));

export default useViewMenus;
