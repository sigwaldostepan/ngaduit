import { paths } from "@/config/paths";
import { api } from "@/lib/api-client";
import { useStore } from "@/store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

export const AppRoot = () => {
  const navigate = useNavigate();
  const { onLogin, onLogout } = useStore(
    useShallow((state) => ({
      onLogin: state.onLogin,
      onLogout: state.onLogout,
    }))
  );

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await api.get("/auth/check-session", {
          withCredentials: true,
        });

        onLogin(response.data);
      } catch (err) {
        onLogout();
        navigate(paths.auth.login.getUrl());
      }
    };

    checkSession();
  }, [onLogin, onLogout]);

  return <Outlet />;
};
