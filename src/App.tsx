import MainLayout from "./layouts/MainLayout";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/Overview/Overview";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Overview /> },
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
