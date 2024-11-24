import { CreditCard, DollarSign, Home, Wallet } from "lucide-react";
import { paths } from "./paths";

export const navigations = [
  { name: "Dashboard", to: paths.app.dashboard.getUrl(), icon: Home },
  { name: "Pemasukkan", to: paths.app.income.getUrl(), icon: DollarSign },
  { name: "Pengeluaran", to: paths.app.expense.getUrl(), icon: CreditCard },
  { name: "Rekening", to: paths.app.account.getUrl(), icon: Wallet },
];
