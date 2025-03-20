import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-gray-100 p-6 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <path d="M10.43 10.43L18 18M5 3V2m7 0v1m7 0v1M3 5h1m16 0h1m-1 7h1m-7 7v1m-7-1v1m-5-8h18v2a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8V9Z" />
            <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been removed or doesn't exist.
        </p>
        <Button asChild size="lg">
          <Link to="/">Back to Dashboard</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
