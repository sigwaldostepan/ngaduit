import { useStore } from "@/store";

export const Dashboard = () => {
  const user = useStore((state) => state.user);

  return (
    <>
      <h1>DASHBOARD</h1>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
    </>
  );
};
