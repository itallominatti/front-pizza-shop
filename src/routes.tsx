import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/dashboard";
import { SignIn } from "./pages/auth/sign-in";

import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [{ path: "/", element: <Dashboard /> }]
    },

    {
        path: "/sign-in",
        element: <AuthLayout />,
        children: [{ path: "/", element: <SignIn /> }]
    }
])