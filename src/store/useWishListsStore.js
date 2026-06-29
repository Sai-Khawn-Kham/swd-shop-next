import { createJSONStorage, persist } from "zustand/middleware";

const { create } = require("zustand");

const useWishListsStore = create(
  persist(
    (set) => ({
      wishLists: [],
      addToWishList: (newWishList) =>
        set((state) => ({ wishLists: [...state.wishLists, newWishList] })),
      removeFromWishList: (wishListId) =>
        set((state) => ({
          wishLists: state.wishLists.filter((el) => el.id !== wishListId),
        })),
      emptyWishlists: () => set(() => ({ wishLists: [] })),
    }),
    {
      name: "trend-flow-wishlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useWishListsStore;
