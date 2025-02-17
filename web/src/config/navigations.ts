import { DollarSign, Home, Tags, Wallet } from 'lucide-react';
import { paths } from './paths';

export const navigations = [
  { name: 'Dashboard', to: paths.app.dashboard.getUrl(), icon: Home },
  { name: 'Rekening', to: paths.app.account.getUrl(), icon: Wallet },
  { name: 'Transaksi', to: paths.app.transaction.getUrl(), icon: DollarSign },
  { name: 'Kategori', to: paths.app.category.getUrl(), icon: Tags },
];
