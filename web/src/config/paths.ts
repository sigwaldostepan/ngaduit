export const paths = {
  auth: {
    register: {
      path: 'register',
      getUrl: () => '/auth/register',
    },
    login: {
      path: 'login',
      getUrl: () => '/auth/login',
    },
  },

  app: {
    root: {
      path: '/',
      getUrl: () => '/',
    },
    dashboard: {
      path: '/dashboard',
      getUrl: () => '/dashboard',
    },
    transaction: {
      path: '/transaksi',
      getUrl: () => '/transaksi',
    },
    account: {
      path: '/akun-rekening',
      getUrl: () => '/akun-rekening',
    },
    category: {
      path: '/kategori',
      getUrl: () => '/kategori',
    },
  },
};
