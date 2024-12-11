import MainLayout from "./layouts/MainLayout";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/Overview/Overview";
import Request from "./pages/Request/Request";
import MyRequest from "./pages/MyRequest/MyRequest";
import NotFoundAnimate from "./components/loading/notfound-loading";
import ApproverManagement from "./pages/ApproverManagement/ApproverManagement";
import Approve from "./pages/Approve/Approve";
import MainPlan from "./pages/MainPlan/MainPlan";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Overview /> },
        { path: "/request", element: <Request /> },
        { path: "/request/me", element: <MyRequest /> },
        { path: "/approve", element: <Approve /> },
        { path: "/setting/approver", element: <ApproverManagement /> },
        { path: "/main/plan", element: <MainPlan /> },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFoundAnimate />,
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
