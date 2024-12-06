import { Account } from "@/types/api";
import { AccountDetails } from "./account-details";

type AccountDetailsListProps = {
  accounts?: Account[];
};

export const AccountDetailsList = ({ accounts }: AccountDetailsListProps) => {
  if (!accounts?.length) {
    return <p className="font-bold text-xl lg:text-2xl text-center">Akun rekeningmu ga ada 🤔</p>;
  }

  return (
    <div className="w-full flex flex-col items-start justify-center">
      {accounts?.map((accounts) => (
        <AccountDetails
          key={accounts.id}
          accountId={accounts.id}
          name={accounts.name}
          balance={accounts.balance}
        />
      ))}
    </div>
  );
};
