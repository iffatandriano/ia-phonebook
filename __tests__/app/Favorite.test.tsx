import React from "react";

import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import useFavorite from "@/src/lib/store/useFavorite";
import { act } from "react-dom/test-utils";

describe("Favorite", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  let mockFavorite = {
    id: 1,
    first_name: "IA",
    last_name: "Andri",
  };

  it("should return list favorite data from local storage", () => {
    const { result } = renderHook(() => useFavorite());

    act(() => {
      result.current.setFavorites(mockFavorite);
    });

    expect(result.current.favorites[0]).toBe(mockFavorite);
  });
});
