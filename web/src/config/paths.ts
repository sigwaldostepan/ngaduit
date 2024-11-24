export const paths = {
  auth: {
    register: {
      path: "register",
      getUrl: () => "/auth/register",
    },
    login: {
      path: "login",
      getUrl: () => "/auth/login",
    },
  },

  app: {
    root: {
      path: "/",
      getUrl: () => "/",
    },
    dashboard: {
      path: "/dashboard",
      getUrl: () => "/dashboard",
    },
    income: {
      path: "/pemasukkan",
      getUrl: () => "/pemsaukkan",
    },
    expense: {
      path: "/pengeluaran",
      getUrl: () => "/pengeluaran",
    },
    account: {
      path: "/akun-rekening",
      getUrl: () => "/akun-rekening",
    },
  },
};
