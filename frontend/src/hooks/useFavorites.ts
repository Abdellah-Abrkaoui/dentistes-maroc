import { useState, useEffect } from "react";

const FAVORITES_KEY = "dentist-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (id: string) => {
    setFavorites((prev) => [...prev, id]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  const toggleFavorite = (id: string) => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
};
