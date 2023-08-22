import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FavoriteProps {
  favorites: any;
  setFavorites: (favorites: any) => void;
  removeFavorite: (id: number) => void;
}

const useFavorite = create<FavoriteProps>()(
  persist(
    (set) => ({
      favorites: [],
      setFavorites: (favorites) => {
        set((prev) => ({
          favorites: [...prev.favorites, favorites],
        }));
      },
      removeFavorite: (id) => {
        set((prev) => ({
          favorites: prev.favorites.filter((item: any) => item.id !== id),
        }));
      },
    }),
    {
      name: "favorite-storage",
    }
  )
);

export default useFavorite;
