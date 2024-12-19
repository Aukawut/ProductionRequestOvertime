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
import OvertimeActual from "./pages/OvertimeActual/OvertimeActual";
import PlanOB from "./pages/PlanOB/PlanOB";
import EmployeeManagement from "./pages/EmployeeManagement/EmployeeManagement";
import OvertimeActualReport from "./pages/OvertimeActualReport/OvertimeActualReport";

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
        { path: "/setting/employee", element: <EmployeeManagement /> },
        { path: "/main/plan", element: <MainPlan /> },
        { path: "/plan/ob", element: <PlanOB /> },
        { path: "/overtime/actual", element: <OvertimeActual /> },
        { path: "/report/actual/overtime", element: <OvertimeActualReport /> },
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
