
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, MessageCircle, Settings, UserCheck, Trophy, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";

const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const links = [
    { href: "/", label: "Overview", icon: LayoutDashboard },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/configuration", label: "Configuration", icon: Settings },
    { href: "/verification", label: "Verification", icon: UserCheck },
    { href: "/leaderboards", label: "Leaderboards", icon: Trophy },
    { href: "/donations", label: "Donations", icon: Heart },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  location.pathname === href
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
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
                  Sign Out
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
