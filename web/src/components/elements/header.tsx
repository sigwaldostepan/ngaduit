import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useStore } from "@/store";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LogOut } from "lucide-react";
import { useLogout } from "@/lib/auth";
import { useShallow } from "zustand/shallow";
import { toast } from "sonner";

export const Header = () => {
  const [user, onLogout] = useStore(
    useShallow((state) => [state.user, state.onLogout])
  );
  const navigate = useNavigate();
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      onLogout();

      toast.success("Logout berhasil", {
        description: "Iterasai...",
      });

      navigate("/auth/login");
    },
  });

  return (
    <header className="sticky top-0 w-full bg-background border-b">
      <div className="p-4 flex items-center justify-between">
        <Link to="/dashboard">
          <h1 className="text-2xl font-black">
            Nga<span className="text-primary">duit</span>
          </h1>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>{user?.name!.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-transparent">
                <p className="font-semibold text-xl">{user?.name}</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-transparent">
                <p className="text-base text-muted-foreground">{user?.email}</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start px-2 py-0 text-destructive text-base"
                onClick={() => logout()}
              >
                <LogOut className="mr-2" size="sm" /> Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
