import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import CodeViewPage from "./pages/CodeViewPage";
import DashboardPage from "./pages/DashboardPage";
import PullRequestPage from "./pages/PullRequestPage";
import RepositoryHomePage from "./pages/RepositoryHomePage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<DashboardPage />} />
          <Route path="/code-view" element={<CodeViewPage />} />
          <Route path="/pull-request" element={<PullRequestPage />} />
          <Route path="/repository-home" element={<RepositoryHomePage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
