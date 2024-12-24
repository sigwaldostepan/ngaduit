import { CreditCard, DollarSign, Home, Tags, Wallet } from "lucide-react";
import { paths } from "./paths";

export const navigations = [
  { name: "Dashboard", to: paths.app.dashboard.getUrl(), icon: Home },
  { name: "Rekening", to: paths.app.account.getUrl(), icon: Wallet },
  { name: "Kategori", to: paths.app.category.getUrl(), icon: Tags },
  { name: "Pemasukkan", to: paths.app.income.getUrl(), icon: DollarSign },
  { name: "Pengeluaran", to: paths.app.expense.getUrl(), icon: CreditCard },
];
