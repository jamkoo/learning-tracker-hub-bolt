import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Employees from "./pages/Employees";
import EmployeeDetail from "./pages/EmployeeDetail";
import NotFound from "./pages/NotFound";
import DirectAccess from "./pages/DirectAccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout>
                <Dashboard />
              </Layout>
            } 
          />
          <Route 
            path="/courses" 
            element={
              <Layout>
                <Courses />
              </Layout>
            } 
          />
          <Route 
            path="/courses/:id" 
            element={
              <Layout>
                <CourseDetail />
              </Layout>
            } 
          />
          <Route 
            path="/employees" 
            element={
              <Layout>
                <Employees />
              </Layout>
            } 
          />
          <Route 
            path="/employees/:id" 
            element={
              <Layout>
                <EmployeeDetail />
              </Layout>
            } 
          />
          <Route path="/access/:token" element={<DirectAccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
