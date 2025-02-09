
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, MenuIcon, MessageCircle, Settings, UserCheck, Trophy, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const links = [
    { href: "/", label: "Overview", icon: LayoutDashboard },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/verification", label: "Verification", icon: UserCheck },
    { href: "/leaderboards", label: "Leaderboards", icon: Trophy },
    { href: "/donations", label: "Donations", icon: Heart },
  ];

  const NavLinks = () => (
    <>
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          to={href}
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
            location.pathname === href
              ? "bg-white/10 text-white"
              : "text-white/70 hover:text-white hover:bg-white/5"
          )}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/70 hover:text-white">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-background/95 backdrop-blur-xl border-r border-white/10">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-4">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4">
            {location.pathname === "/chat" && (
              <Link
                to="/configuration"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
            )}
            {user ? (
              <>
                <span className="text-sm text-white/70">@{user.username}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-white/70 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

