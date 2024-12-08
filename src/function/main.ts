import { CountRequest, MonthMenu, RequestByYear } from "@/pages/MyRequest/MyRequest";
import axios from "axios";
import { allMonth, colorOfMonth } from "@/pages/MyRequest/data";

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

export const GetMonthMenuOption: (token: string) => Promise<any> = async (
  token: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/menu/month`, {
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
  console.log("requestByYear",requestByYear);
  
  if (requestByYear?.length > 0) {
    const newKey = requestByYear?.map((item) => ({
      amount: item.AMOUNT_REQ,
      monthNo: item.MONTH_RQ,
      monthName: FindNameOfMonth(item.MONTH_RQ),
      fill:FindColorOfMonth(item.MONTH_RQ)
    }));

    return newKey;
  }else{
    return []
  }
};



export const ChageKeyChartDonut = (monthMenu: MonthMenu[]) => {
  if (monthMenu?.length > 0) {
    const newKey = monthMenu?.map((item) => ({ 
      monthNo : item.MONTH_RQ,
      monthName : FindNameOfMonth(item.MONTH_RQ),
      color : FindColorDonutOfMonth(item.MONTH_RQ),
    }))
    console.log("monthMenu",monthMenu);
    
    return newKey;
  }else{
    return []
  }
}


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