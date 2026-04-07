import {
  LayoutDashboard,
  ArrowRightLeft,
  PiggyBank,
  ChartSpline,
  Laugh,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { link: "/", icon: LayoutDashboard, title: "Dashboard" },
    { link: "/transactions", icon: ArrowRightLeft, title: "Transactions" },
    { link: "/budgets", icon: PiggyBank, title: "Budgets" },
    { link: "/analytics", icon: ChartSpline, title: "Analytics" },
  ];
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="lg:flex">
      <div className="lg:flex lg:flex-col lg:w-64 py-4 lg:border-r-2 lg:min-h-screen border-gray-300">
        <div className="lg:flex border-b-2 pb-2 border-gray-300 gap-2 pl-5 pt-2 items-center">
          <div className="flex justify-between items-center">
            <div>
              <span className="flex gap-2 items-center font-bold text-lg text-gray-700">
                <Laugh className="text-yellow-400 rounded-sm rounded-sm p-1 w-10 h-10" />
                Happy Money
              </span>
            </div>
            <button
              onClick={toggleMenu}
              className="lg:hidden mx-5 hover:cursor-pointer hover:bg-gray-200 p-1 rounded-lg"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {/* desktop version */}
        <nav className="hidden lg:flex flex-col my-5 gap-3 text-gray-500 p-5">
          {navItems.map((item) => (
            <NavLink
              key={item.link}
              to={item.link}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 rounded-md py-2"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-md py-2"
                }`
              }
            >
              <item.icon className="w-[16px] h-[16px]" />
              {item.title}
            </NavLink>
          ))}
        </nav>
        {/* mobile version of navlink */}
        {menuOpen && (
          <nav className="lg:hidden md:flex flex-col cursor-pointer text-gray-500 border-b-2 shadow-md rounded-md">
            {navItems.map((item) => (
              <NavLink
                key={item.link}
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 ${
                    isActive
                      ? "bg-blue-100 text-blue-600 rounded-md m-2"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-md m-2"
                  }`
                }
              >
                <item.icon className="w-[16px] h-[16px]" />
                {item.title}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
      {/* page content */}
      {/* flex-1 adjusts width as needed */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
