
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Navigation from "./components/Navigation";
import Overview from "./pages/Overview";
import Index from "./pages/Index";
import Configuration from "./pages/Configuration";
import HumanVerification from "./pages/HumanVerification";
import Leaderboards from "./pages/Leaderboards";
import Donations from "./pages/Donations";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <div className="pt-14">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/chat" element={<Index />} />
              <Route path="/configuration" element={<Configuration />} />
              <Route path="/verification" element={<HumanVerification />} />
              <Route path="/leaderboards" element={<Leaderboards />} />
              <Route path="/donations" element={<Donations />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
