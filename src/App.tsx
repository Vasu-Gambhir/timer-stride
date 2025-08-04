import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimersList from "./pages/TimersList";
import CreateTimer from "./pages/CreateTimer";
import TaskDetails from "./pages/TaskDetails";
import NotFound from "./pages/NotFound";
import LocalStorageSync from "./components/LocalStorageSync";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LocalStorageSync />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TimersList />} />
            <Route path="/create" element={<CreateTimer />} />
            <Route path="/timer/:id" element={<TaskDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
