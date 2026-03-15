import { LayoutDashboard, ArrowRightLeft, PiggyBank, ChartSpline} from "lucide-react";
import {NavLink } from 'react-router-dom';
export default function Sidebar({children}: {children: React.ReactNode}) {
    const navItems = [
        { link: "/", icon: LayoutDashboard, title: "Dashboard" },
        { link: "/transactions", icon: ArrowRightLeft, title: "Transactions" },
        { link: "/budgets", icon: PiggyBank, title: "Budgets" },
        { link: "/analytics", icon: ChartSpline, title: "Analytics" }
    ];
    return (
            <div className="flex">
        <aside className="hidden md:flex flex-col w-64 py-4 border-r border-gray-300 bg-white/50 backdrop-blur-sm min-h-screen">
    <span className="font-bold text-lg text-gray-700 p-2 border-b-2 border-gray-300">BudgetFlow</span>
                <nav className="flex flex-col my-5 gap-3 text-gray-500 p-5">
                    {navItems.map((item) => (
                        <NavLink to={item.link}
                            className={({ isActive }) => `flex items-center gap-2 px-4 ${isActive ? "bg-blue-100 text-blue-600 rounded-md py-2"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-md py-2"}`}
                    >
                        <item.icon className="w-[16px] h-[16px]"/>
                        {item.title}
                        </NavLink> 
                ))}
    </nav>
            </aside>
            {/* page content */}
            {/* flex-1 adjusts width as needed */}
            <main className="flex-1">
                {children}
</main>
    </div>
    )
}