import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/home", element: <Home /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ],
  {
    future: {
      v7_startTransition: true, // Opt-in to React Router's future flag
    } as any
  }
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
export default App;
