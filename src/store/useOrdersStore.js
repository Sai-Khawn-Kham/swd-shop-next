import { createJSONStorage, persist } from "zustand/middleware";

const { create } = require("zustand");

const tempDate = new Date("2024-10-27T06:30:00");

const useOrdersStore = create(
  persist(
    (set) => ({
      orders: [
        {
          id: 1,
          orderId: "00001",
          carts: [
            {
              id: 1,
              path: "new-dawn",
              quantity: 3,
              size: "L",
              category: "sweatshirts",
              color: "black",
              price: { original: 30000, discount: false },
              img: "/assets/products/newDawn.png",
              total: 90000,
            },
            {
              id: 2,
              path: "the-ritual",
              quantity: 2,
              size: "XL",
              category: "shirts",
              color: "white",
              price: { original: 35000, discount: 20000 },
              img: "/assets/products/theRitual.png",
              total: 40000,
            },
          ],
          subTotal: 130000,
          shipping: 7800,
          tax: 6500,
          netTotal: 144300,
          customer: {
            name: "admin",
            email: "admin@gmail.com",
            phone: "09691568932",
            address: "123 Main St, Apt 4B, San Francisco, CA 94107, USA",
            payment: "wave",
            additional: "Great Website",
          },
          date: tempDate,
        },
        {
          id: 2,
          orderId: "00002",
          carts: [
            {
              id: 1,
              path: "new-dawn",
              quantity: 3,
              size: "L",
              category: "sweatshirts",
              color: "black",
              price: { original: 30000, discount: false },
              img: "/assets/products/newDawn.png",
              total: 90000,
            },
          ],
          subTotal: 90000,
          shipping: 5400,
          tax: 4500,
          netTotal: 99900,
          customer: {
            name: "admin",
            email: "admin@gmail.com",
            phone: "09691568932",
            address: "123 Main St, Apt 4B, San Francisco, CA 94107, USA",
            payment: "wave",
            additional: "Great Website",
          },
          date: tempDate,
        },
      ],
      addOrder: (newOrder) =>
        set((state) => ({ orders: [...state.orders, newOrder] })),
    }),
    {
      name: "trend-flow-order",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useOrdersStore;
