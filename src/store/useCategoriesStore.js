const { create } = require("zustand");

const useCategoriesStore = create((set) => ({
  categories: [
    {
      id: 1,
      path: "shirts",
      img: "/assets/categories/shirts.png",
    },
    {
      id: 2,
      path: "sweatshirts",
      img: "/assets/categories/sweatshirts.png",
    },
    {
      id: 3,
      path: "hoodies",
      img: "/assets/categories/hoodies.png",
    },
    {
      id: 4,
      path: "jackets",
      img: "/assets/categories/jackets.png",
    },
    {
      id: 5,
      path: "bags",
      img: "/assets/categories/bags.png",
    },
    {
      id: 6,
      path: "caps",
      img: "/assets/categories/caps.png",
    },
  ],
}));

export default useCategoriesStore;
