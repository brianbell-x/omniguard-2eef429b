
import { LayoutDashboard, Settings, FileText, Info, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close sidebar when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const NavContent = () => (
    <nav className="space-y-2">
      <a href="#overview" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/5 transition-colors">
        <LayoutDashboard className="w-4 h-4" />
        Overview
      </a>
      <a href="#configuration" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/5 transition-colors">
        <Settings className="w-4 h-4" />
        Configuration
      </a>
      <a href="#dataset" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/5 transition-colors">
        <FileText className="w-4 h-4" />
        Dataset
      </a>
      <a href="#info" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/5 transition-colors">
        <Info className="w-4 h-4" />
        Project Info
      </a>
    </nav>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-background/80 backdrop-blur-sm border border-white/10"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="w-64 h-[calc(100vh-3.5rem)] border-r border-white/10 p-4">
          <NavContent />
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-40 animate-fade-in">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleSidebar} />
          <div className="absolute left-0 top-0 h-full w-64 bg-background border-r border-white/10 p-4 pt-16 animate-slide-in">
            <NavContent />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
