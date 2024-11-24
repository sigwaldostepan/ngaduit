import { navigations } from "@/config/navigations";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export const MobileNav = () => {
  return (
    <nav className="w-full border-t p-3 fixed bottom-0 lg:hidden">
      <ul className="flex items-center justify-center">
        {navigations.map((navigation) => (
          <li key={navigation.name} className="flex-1">
            <NavLink
              to={navigation.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-2",
                  isActive ? "text-primary" : "text-foreground/60"
                )
              }
            >
              <navigation.icon size={20} />
              <span className="text-sm">{navigation.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
