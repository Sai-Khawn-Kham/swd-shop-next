const { create } = require("zustand");

const usePaymentsStore = create(() => ({
  payments: [
    {
      id: 1,
      name: "cash",
      label: "Cash on delivery",
    },
    {
      id: 2,
      name: "kpay",
      label: "KBZ Pay",
    },
    {
      id: 3,
      name: "wave",
      label: "Wave Pay",
    },
  ],
}));

export default usePaymentsStore;
