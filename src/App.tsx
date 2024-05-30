import * as React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Index from "./pages";
import CheckoutPage from "./pages/checkout";
import SignUpPage from "./pages/sign-up";
import SignInPage from "./pages/sign-in";
import AboutPage from "./pages/about";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Index/>,
    },
    {
        path: "/checkout",
        element: <CheckoutPage/>,
    },
    {
        path: "/sign-up",
        element: <SignUpPage/>,
    },
    {
        path: "/sign-in",
        element: <SignInPage/>,
    },
    {
        path: "/about",
        element: <AboutPage/>,
    },
]);

export default function App() {
    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}
