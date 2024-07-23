import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/app/dashboard";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";

import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";

export const router: any = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [{ path: "/", element: <Dashboard /> }]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "/sign-in", element: <SignIn /> },
            { path: "/sign-up", element: <SignUp /> }
        ]
    }
]);