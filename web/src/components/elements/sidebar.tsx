import { navigations } from "@/config/navigations";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-1/5 border-r h-[calc(100vh-73px)]">
      <ul className="flex flex-col items-center justify-center">
        {navigations.map((navigation) => (
          <li key={navigation.name} className="w-full">
            <NavLink
              to={navigation.to}
              className={({ isActive }) =>
                cn(
                  "w-full p-4 flex items-center justify-start gap-2 duration-300 transition-colors hover:bg-accent",
                  isActive ? "bg-accent" : ""
                )
              }
            >
              <navigation.icon size={20} className="mr-2" />
              <span className="text-base font-semibold">{navigation.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
