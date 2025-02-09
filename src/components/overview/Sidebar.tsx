
import { LayoutDashboard, Settings, FileText, Info } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-[calc(100vh-3.5rem)] border-r border-white/10 p-4 hidden lg:block">
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
    </div>
  );
};

export default Sidebar;
