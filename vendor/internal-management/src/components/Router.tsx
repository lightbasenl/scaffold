import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";
import { FeatureFlags } from "../pages/FeatureFlags";
import { Login } from "../pages/Login";
import { TokenAuth } from "../pages/TokenAuth";

export function Router() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <FeatureFlags />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "/auth/:token",
        element: <TokenAuth />,
        errorElement: <ErrorBoundary />,
      },
    ],
    { basename: "/_lightbase" },
  );

  return <RouterProvider router={router} />;
}

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}
