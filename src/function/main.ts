import {
  CountRequest,
  MonthMenu,
  RequestByYear,
} from "@/pages/MyRequest/MyRequest";
import axios from "axios";
import { allMonth, colorOfMonth } from "@/pages/MyRequest/data";
import { CountApprove } from "@/pages/Approve/Approve";
import moment from "moment";

export const GetGroupDepartmentActive: (token: string) => Promise<any> = async (
  token: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/group/Y`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetAllOvertimeList: (token: string) => Promise<any> = async (
  token: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/overtime`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetApproverByGroupId: (
  token: string,
  groupId: number,
  factory: number
) => Promise<any> = async (token: string, groupId: number, factory: number) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/approver/group/${groupId}/${factory}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetAllFactoryByGroup: (
  token: string,
  group: number
) => Promise<any> = async (token: string, group: number) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/factory/${group}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const CountRequestByEmpCode: (
  token: string,
  empCode: string
) => Promise<CountRequest[]> = async (token: string, empCode: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/count/request/${empCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetWorkcellGroup: (token: string) => Promise<any> = async (
  token: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/workgroup`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetWorkcellByFactory: (
  token: string,
  factory: number
) => Promise<any> = async (token: string, factory: number) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/workcell/factory/${factory}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetWorkcellByGroup: (
  token: string,
  groupId: number
) => Promise<any> = async (token: string, groupId: number) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/workcell/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const CancelRequestByNo: (
  token: string,
  requestNo: string
) => Promise<any> = async (token: string, requestNo: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/request/${requestNo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err) {
    console.log(err);

    return err;
  }
};

export const GetYearMenuOption: (token: string) => Promise<any> = async (
  token: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/menu/year`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetMonthMenuOption: (
  token: string,
  year: number
) => Promise<any> = async (token: string, year: number) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/menu/month/${year}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const CountRequestByYear: (
  token: string,
  year: number
) => Promise<any> = async (token: string, year: number) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/count/requests/${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetRequestNoAndStatusByUser: (
  token: string,
  empCode: string
) => Promise<any> = async (token: string, empCode: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/user/requests/${empCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const FindNameOfMonth = (monthNo: number) => {
  return allMonth?.find((x) => x.no == monthNo)?.name;
};

export const FindColorOfMonth = (monthNo: number) => {
  return colorOfMonth?.find((x) => x.month == monthNo)?.fill;
};

export const FindColorDonutOfMonth = (monthNo: number) => {
  return colorOfMonth?.find((x) => x.month == monthNo)?.donutColor;
};

export const ChangeKeyMonthNoToName = (requestByYear: RequestByYear[]) => {
  console.log("requestByYear", requestByYear);

  if (requestByYear?.length > 0) {
    const newKey = requestByYear?.map((item) => ({
      amount: item.AMOUNT_REQ,
      monthNo: item.MONTH_RQ,
      monthName: FindNameOfMonth(item.MONTH_RQ),
      fill: FindColorOfMonth(item.MONTH_RQ),
    }));

    return newKey;
  } else {
    return [];
  }
};

export const ChageKeyChartDonut = (monthMenu: MonthMenu[]) => {
  if (monthMenu?.length > 0) {
    const newKey = monthMenu?.map((item) => ({
      monthNo: item.MONTH_RQ,
      monthName: FindNameOfMonth(item.MONTH_RQ),
      color: FindColorDonutOfMonth(item.MONTH_RQ),
    }));
    console.log("monthMenu", monthMenu);

    return newKey;
  } else {
    return [];
  }
};

export const GetCountApproveByCode: (
  token: string,
  empCode: string
) => Promise<any> = async (token: string, empCode: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/approve/count/${empCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const findCountApproverStatus = (
  alias: string,
  countApprove: CountApprove[]
) => {
  const obj = countApprove?.find((x) => x.NAME_STATUS == alias);
  if (obj) {
    // alert(obj?.AMOUNT)
    return Number(obj?.AMOUNT);
  } else {
    return 0;
  }
};

export const GetDetailCountApproveByCode: (
  token: string,
  empCode: string,
  status: number
) => Promise<any> = async (token: string, empCode: string, status: number) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/approve/reqList/${empCode}/${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetActualCompareWorkgroup: (
  token: string,
  start: string,
  end: string
) => Promise<any> = async ( token: string,
  start: string,
  end: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/all/workgroup/${start}/${end}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetSummaryActualCompareWorkCell: (
  token: string,
  start: string,
  end: string
) => Promise<any> = async ( token: string,
  start: string,
  end: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/group/workcell/${start}/${end}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetSummaryActualCompareWorkGroup: (
  token: string,
  start: string,
  end: string
) => Promise<any> = async ( token: string,
  start: string,
  end: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/group/workgroup/${start}/${end}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const convertMinutesToHoursMinutes = (minutes: number) => {
  const hours = (minutes / 60).toFixed(2);
  return hours;
};

export const GetRequestDetailByRequest = async (
  token: string,
  requestNo: string,
  rev:number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/summary/request/${requestNo}/${rev}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response.data", response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data?.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetUserByRequestAndRev = async (
  token: string,
  requestNo: string,
  rev: number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/requests/users/${requestNo}/${rev}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data?.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetCommentApproverByRequestNo = async (
  token: string,
  requestNo: string,
  rev: number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/comment/request/${requestNo}/${rev}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      return response.data?.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

interface PayloadMainPlan {
  workcell: number;
  month: number;
  year: number;
  hours: number;
  action: string;
  userGroup: number;
}
export const InsertMainPlan = async (
  token: string,
  payload: PayloadMainPlan
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.post(`${VITE_BASE_URL}/plan/main`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);

    return [];
  }
};

interface PayloadPlanOB {
  factory: number;
  month: number;
  year: number;
  hours: number;
  action: string;
  userGroup: number;
}

export const InsertPlanOB = async (token: string, payload: PayloadPlanOB) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.post(`${VITE_BASE_URL}/ob/plan`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetMainPlan = async (token: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/plan/main`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data.err) {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetMainPlanOB = async (token: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/ob/plan`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data.err) {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const ConvertNumberToMonth = (no: number) => {
  const obj = allMonth?.find((x) => x.no == no);
  if (obj) {
    return obj?.name;
  } else {
    return "";
  }
};

export const GetMenuyear = () => {
  let menu = [];

  const currentYear = new Date().getFullYear();

  // สร้าง Menu Year ปัจจุบัน + 3 สำหรับ Select
  for (let i = currentYear; i < currentYear + 3; i++) {
    menu.push(i);
  }

  return menu;
};

export const GetMenuyearOverview = () => {
  let menu = [];

  const currentYear = new Date().getFullYear() - 5;

  for (let i = currentYear; i < new Date().getFullYear() + 3; i++) {
    menu.push(i);
  }

  return menu;
};

export const GetAllFactory = async (token: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/factory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data.err) {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const UpdateMainPlan = async (
  token: string,
  payload: PayloadMainPlan,
  id: number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.put(
      `${VITE_BASE_URL}/plan/main/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const UpdatePlanOB = async (
  token: string,
  payload: PayloadPlanOB,
  id: number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.put(
      `${VITE_BASE_URL}/ob/plan/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetPlanByFactory: (
  token: string,
  idFactory: number,
  year: number,
  month: number
) => Promise<any> = async (
  token: string,
  idFactory: number,
  year: number,
  month: number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/plan/factory/${year}/${month}/${idFactory}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetPlanByWorkcell: (
  token: string,
  idWorkcell: number,
  year: number,
  month: number
) => Promise<any> = async (
  token: string,
  idWorkcell: number,
  year: number,
  month: number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/plan/workcell/${year}/${month}/${idWorkcell}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetAllWorkcell: (token: string) => Promise<any> = async (
  token: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/workcell`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetUserGroup: (token: string) => Promise<any> = async (
  token: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/users/ugroup`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};
export const GetUserType: (token: string) => Promise<any> = async (
  token: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/users/type`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const DeletePlan: (token: string, id: number) => Promise<any> = async (
  token: string,
  id: number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.delete(`${VITE_BASE_URL}/plan/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      return { err: false, msg: response.data.msg };
    } else {
      return { err: true, msg: response.data.msg };
    }
  } catch (err) {
    return { err: true, msg: err };
  }
};

export const DeletePlanOB: (token: string, id: number) => Promise<any> = async (
  token: string,
  id: number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.delete(`${VITE_BASE_URL}/ob/plan/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      return { err: false, msg: response.data.msg };
    } else {
      return { err: true, msg: response.data.msg };
    }
  } catch (err) {
    return { err: true, msg: err };
  }
};

export const ConvertDateFormat = (date: Date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};
export const ConvertTimeFormat = (date: Date) => {
  return moment(date).format("HH:mm");
};

export const GetActualOvertime: (token: string) => Promise<any> = async (
  token: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/actual/overtime`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};


export const CountRequestByEmployee: (token: string,code:string,status:number) => Promise<any> = async (
  token: string,code:string,status:number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/request/count/${status}/${code}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const CountRequestApproverByEmployee: (token: string,code:string,status:number) => Promise<any> = async (
  token: string,code:string,status:number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/request/approve/count/${status}/${code}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetActualOvertimeByDateDuration: (token: string,start:string,end:string) => Promise<any> = async (
  token: string,
  start:string,
  end:string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/actual/overtime/${start}/${end}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetSummaryActualComparePlan: (
  token: string,
  year: number
) => Promise<any> = async (token: string, year: number) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/summary/compare/plan/${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};



export const GetSummaryActualByFactory: (
  token: string,
  start: string,
  end: string,
  ugroup: number
) => Promise<any> = async (
  token: string,
  start: string,
  end: string,
  ugroup: number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/summary/factory/plan/${start}/${end}/${ugroup}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetCountActualByUserGroup: (
  token: string,
  start: string,
  end: string,
  ugroup: number
) => Promise<any> = async (
  token: string,
  start: string,
  end: string,
  ugroup: number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/count/${start}/${end}/${ugroup}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetSummaryActualByDate: (
  token: string,
  start: string,
  end: string,
  ugroup: number
) => Promise<any> = async (
  token: string,
  start: string,
  end: string,
  ugroup: number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/summary/date/${start}/${end}/${ugroup}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.err && response.data.status == "Ok") {
      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetAllEmployee: (token: string) => Promise<any> = async (
  token: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/employee`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export interface EmployeesByCode {
  Prefix: string;
  EmployeeCode: string;
  FnameTH: string;
  LnameTH: string;
  FnameEN: string;
  LnameEN: string;
}

export const GetAllEmployeeByCode: (
  token: string,
  code: string
) => Promise<any> = async (token: string, code: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/employee/${code}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export interface BodyInsertEmployee {
  code: string;
  factory: number;
  group: number;
  prefix: string;
  fnameTH: string;
  lnameTH: string;
  fnameEN: string;
  lnameEN: string;
  role: number;
  ugroup: number;
  type: number;
  actionBy: string;
}

export const InsertEmployee: (
  token: string,
  payload: BodyInsertEmployee
) => Promise<any> = async (token: string, payload: BodyInsertEmployee) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.post(`${VITE_BASE_URL}/employee`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return { err: false, msg: response.data.msg, status: "Ok" };
    } else {
      return { err: true, msg: response.data.msg };
    }
  } catch (err) {
    console.log(err);

    return { err: true, msg: err };
  }
};

export const DeleteEmployee: (
  token: string,
  code: string
) => Promise<any> = async (token: string, code: string) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.delete(`${VITE_BASE_URL}/employee/${code}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return { err: false, msg: response.data.msg, status: "Ok" };
    } else {
      return { err: true, msg: response.data.msg };
    }
  } catch (err) {
    console.log(err);

    return { err: true, msg: err };
  }
};

export const GetActualOvertimeByDate: (
  token: string,
  start: string,
  end: string,
  ugroup: string,
  factory: string
) => Promise<any> = async (
  token: string,
  start: string,
  end: string,
  ugroup: string,
  factory: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/ot/${start}/${end}/${ugroup}/${factory}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetSummaryOvertimeByFactory: (
  token: string,
  start: string,
  end: string,
  ugroup: string,
  factory: string
) => Promise<any> = async (
  token: string,
  start: string,
  end: string,
  ugroup: string,
  factory: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/factory/${start}/${end}/${ugroup}/${factory}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetSummaryOvertimeByType: (
  token: string,
  start: string,
  end: string,
  ugroup: string,
  factory: string
) => Promise<any> = async (
  token: string,
  start: string,
  end: string,
  ugroup: string,
  factory: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/type/${start}/${end}/${ugroup}/${factory}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const GetSummaryOvertimeGroupByDate: (
  token: string,
  start: string,
  end: string,
  ugroup: string,
  factory: string
) => Promise<any> = async (
  token: string,
  start: string,
  end: string,
  ugroup: string,
  factory: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/bydate/${start}/${end}/${ugroup}/${factory}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    if (!response.data.err && response.data.status == "Ok") {
      console.log(response.data);

      return response.data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);

    return [];
  }
};

export interface PayLoadApprove {
  status: number;
  actionBy: string;
  remark: string;
  special:string;
}
export const ApproveRequest: (
  token: string,

  requestNo: string,
  rev: number,
  payload:PayLoadApprove
) => Promise<any> = async (
  token: string,
  requestNo: string,

  rev: number,
  payload:PayLoadApprove
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.put(
      `${VITE_BASE_URL}/request/update/${requestNo}/${rev}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    console.log(err);

    return {err:true,msg:err};
  }
};



export const CalActualyFac: (
  token: string,
  year: number,
  month: number,
  fac:number
) => Promise<any> = async (
  token: string,
  year: number,
  month: number,
  fac:number
) => {
  const { VITE_BASE_URL } = import.meta.env;
  if(fac !== undefined){
  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/cal/${year}/${month}/${fac}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(!response.data.err && response.data.status == "Ok") {

      return response.data.results;
    }else{
      return []
    }
  } catch (err) {
    console.log(err);

    return []
  }
}
};

export const CalActualyWorkcell: (
  token: string,
  year: number,
  month: number,
  requestNo:string,
  rev:number
) => Promise<any> = async (
  token: string,
  year: number,
  month: number,
  requestNo:string,
  rev:number
) => {
  const { VITE_BASE_URL } = import.meta.env;
  if(requestNo !== undefined && rev !== undefined){
  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/actual/workcell/${requestNo}/${rev}/${year}/${month}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(!response.data.err && response.data.status == "Ok") {

      return response.data.results;
    }else{
      return []
    }
  } catch (err) {
    console.log(err);

    return []
  }
}
};


export const GetRequestListByCodeAndStatus: (
  token: string,
  status: number,
  code: string,

) => Promise<any> = async (
  token: string,
  status: number,
  code: string,
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const pendingEndpoint = `${VITE_BASE_URL}/lasted/request/${status}/${code}`
    const anyStatusEndpoint = `${VITE_BASE_URL}/details/request/${status}/${code}`

    const response = await axios.get(
      Number(status) == 1 ? pendingEndpoint : anyStatusEndpoint,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(!response.data.err && response.data.status == "Ok") {

      return response.data.results;
    }else{
      return []
    }
  } catch (err) {
    console.log(err);

    return []
  }
};

export const GetRequestListByUserCodeAndStatus: (
  token: string,
  status: number,
  code: string,

) => Promise<any> = async (
  token: string,
  status: number,
  code: string,
) => {
  const { VITE_BASE_URL } = import.meta.env;
  alert(status)
  try {
    const response = await axios.get(
      `${VITE_BASE_URL}/details/user/request/${status}/${code}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(!response.data.err && response.data.status == "Ok") {

      return response.data.results;
    }else{
      return []
    }
  } catch (err) {
    console.log(err);

    return []
  }
};


export const IsHavePermission =  (allowed:string[],userPermission:string[]) => {
  const isSubset = userPermission.some(role => allowed.includes(role));
  return isSubset


}

export const DeleteActualById: (
  token: string,
  id: number,

) => Promise<any> = async (
  token: string,
  id: number,
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.delete(
      `${VITE_BASE_URL}/actual/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(!response.data.err && response.data.status == "Ok") {

      return response.data;
    }else{
      return response.data
    }
  } catch (err) {
    console.log(err);

    return {err:true,msg:err}
  }
};