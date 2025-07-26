"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, UserCircle, X } from "lucide-react";
import { logout } from "@/utils/auth";
import { getNavItemsByRole } from "@/utils/commonFunctions";

type NavBarProps = {
  userData?: {
    name: string;
    email: string;
    role: string;
  };
};

export default function NavBar({ userData }: NavBarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = getNavItemsByRole(userData?.role);
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="/">
          <span className="text-2xl font-bold text-blue-600">
            AdminDashboard
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive(href) ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {label}
            </a>
          ))}
          {/* Mock auth */}
          <div className="ml-4 flex items-center gap-2">
            {userData ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <UserCircle className="text-blue-600" size={20} />
                  <span className="text-sm font-medium text-gray-700">
                    {userData.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm cursor-pointer font-medium text-red-600 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/auth"
                className="text-sm font-semibold text-gray-700 hover:text-blue-600"
              >
                Login/Signup
              </a>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-4">
            {navItems.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive(href) ? "text-blue-600" : "text-gray-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="pt-2 border-t">
              {userData ? (
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex items-center gap-2">
                    <UserCircle className="text-blue-600" size={20} />
                    <span className="text-sm font-medium text-gray-700">
                      {userData.name}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-red-600 hover:underline text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <a
                  href="/auth"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-600"
                >
                  Login/Signup
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
