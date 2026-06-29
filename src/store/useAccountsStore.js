import { createJSONStorage, persist } from "zustand/middleware";

const { create } = require("zustand");

const useAccountsStore = create(
  persist(
    (set) => ({
      accounts: [
        {
          id: 1,
          name: "Admin",
          email: "admin@gmail.com",
          password: "asdffdsa",
          address: "Yangon",
          phone: "09123456789",
          wishLists: [],
          carts: [],
        },
      ],
      users: [],
      registerAcc: (newAcc) =>
        set((state) => ({ accounts: [...state.accounts, newAcc] })),
      loginAcc: (oldAcc) => set(() => ({ users: [oldAcc] })),
      logoutAcc: () =>
        set(() => ({
          users: [],
        })),
      changePassword: (accEmail, newPassword) =>
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.email == accEmail
              ? { ...account, password: newPassword }
              : account,
          ),
          users: state.users.map((user) =>
            user.email == accEmail ? { ...user, password: newPassword } : user,
          ),
        })),
      changePhone: (accEmail, newPhone) =>
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.email == accEmail
              ? { ...account, phone: newPhone }
              : account,
          ),
          users: state.users.map((user) =>
            user.email == accEmail ? { ...user, phone: newPhone } : user,
          ),
        })),
      changeAddress: (accEmail, newAddress) =>
        set((state) => ({
          accounts: state.accounts.map((account) =>
            account.email == accEmail
              ? { ...account, address: newAddress }
              : account,
          ),
          users: state.users.map((user) =>
            user.email == accEmail ? { ...user, address: newAddress } : user,
          ),
        })),
    }),
    {
      name: "trend-flow-account",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAccountsStore;
