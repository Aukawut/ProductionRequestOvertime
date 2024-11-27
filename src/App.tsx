import MainLayout from "./layouts/MainLayout";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/Overview/Overview";
import Request from "./pages/Request/Request";
import MyRequest from "./pages/MyRequest/MyRequest";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Overview /> },
        { path: "/request", element: <Request /> },
        { path: "/request/me", element: <MyRequest /> },
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
