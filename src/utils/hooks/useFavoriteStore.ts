import { useEffect, useState } from "react";

const useFavoriteStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [favorites, setFavorites] = useState<F>();

  useEffect(() => {
    setFavorites(result);
  }, [result]);

  return favorites;
};

export default useFavoriteStore;
