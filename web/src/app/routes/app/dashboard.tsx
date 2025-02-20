import { Head } from '@/components/seo/head';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAccounts } from '@/features/accounts/api/get-accounts';
import { useGetTotalBalance } from '@/features/accounts/api/get-total-balance';
import { useGetRecentTransactions } from '@/features/transactions/api/get-recent-transactions';
import { toRupiah } from '@/utils/toRupiah';
import { Banknote, Wallet } from 'lucide-react';

export const Dashboard = () => {
  const { data: totalBalance, isPending: isFetchingTotalBalance } =
    useGetTotalBalance();
  const { data: accounts, isPending: isFetchingAccounts } = useGetAccounts({});
  const { data: recentTransactions, isPending: isFetchingRecentTransactions } =
    useGetRecentTransactions();

  return (
    <>
      <Head title="Dashboard" />

      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pb-24">
        <div className="w-full md:w-1/2 h-1/4 border rounded-lg px-4 py-5 flex flex-col gap-4">
          <h2 className="flex items-center font-bold md:text-xl">
            <Wallet className="size-6 mr-4" />
            <span>Akun Rekening</span>
          </h2>
          <Separator />
          <Card className="w-full h-full bg-background">
            <CardHeader>
              <CardDescription>Total saldo di rekening lu</CardDescription>
              <CardTitle>
                {isFetchingTotalBalance ? (
                  <Skeleton className="h-6 w-36" />
                ) : (
                  toRupiah(totalBalance?.balance!)
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold">Rekening lu</p>

              <div className="flex flex-col w-full overflow-y-auto">
                {isFetchingAccounts
                  ? Array.from({ length: 3 }).map((_, i) => {
                      return (
                        <div
                          key={i}
                          className="w-full flex items-center justify-between px-2 py-3"
                        >
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      );
                    })
                  : accounts?.map((account) => {
                      const formattedBalance = toRupiah(account.balance);

                      return (
                        <div
                          key={account.id}
                          className="w-full flex items-center justify-between px-2 py-3"
                        >
                          <span className="flex items-center gap-4">
                            <div className="bg-secondary border rounded-lg p-2">
                              <Wallet className="size-4" />
                            </div>
                            <p className="text-sm font-semibold">
                              {account.name}
                            </p>
                          </span>
                          <p className="text-sm font-semibold">
                            {formattedBalance}
                          </p>
                        </div>
                      );
                    })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/2 h-1/4 border rounded-lg px-4 py-5 flex flex-col gap-4">
          <h2 className="flex items-center font-bold md:text-xl">
            <Banknote className="size-6 mr-4" />
            <span>Transaksi Terakhir</span>
          </h2>
          <Separator />
          <Card className="w-full h-full bg-background">
            <CardHeader>
              <div className="flex items-center justify-start">
                <CardTitle className="text-base mr-2">
                  Transaksi terakhir
                </CardTitle>
                <CardDescription className="text-base">
                  ({recentTransactions?.count || 0} transaksi)
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col w-full overflow-y-auto gap-2">
                {isFetchingRecentTransactions
                  ? Array.from({ length: 5 }).map((_, i) => {
                      return (
                        <div
                          key={i}
                          className="flex w-full items-center justify-between"
                        >
                          <div className="flex items-center justify-start gap-4">
                            <div className="bg-muted p-2 rounded-lg">
                              <Banknote className="size-4" />
                            </div>

                            <div className="flex flex-col items-start text-start gap-1">
                              <Skeleton className="w-16 h-2" />
                              <Skeleton className="w-12 h-2" />
                            </div>
                          </div>
                          <Skeleton className="w-24 h-6" />
                        </div>
                      );
                    })
                  : recentTransactions?.transactions.map(
                      (recentTransaction) => {
                        const formattedAmount = toRupiah(
                          recentTransaction.amount
                        );
                        const transactionDateObj = new Date(
                          recentTransaction.date
                        );
                        const formattedDate =
                          transactionDateObj.toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          });

                        return (
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center justify-start gap-4">
                              <div className="bg-secondary p-2 rounded-lg">
                                <Banknote className="size-4" />
                              </div>

                              <div className="flex flex-col items-start text-start gap-1">
                                <p className="text-sm font-semibold">
                                  {recentTransaction.description}
                                </p>
                                <p className="text-xs">{formattedDate}</p>
                              </div>
                            </div>

                            <p className="font-bold">{formattedAmount}</p>
                          </div>
                        );
                      }
                    )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
