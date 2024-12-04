import { CountRequest } from "@/pages/MyRequest/MyRequest";
import axios from "axios";



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



export const GetApproverByGroupId: (token: string,groupId:number,factory:number) => Promise<any> = async (
  token: string,groupId:number,factory:number
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/approver/group/${groupId}/${factory}`, {
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

export const GetAllFactoryByGroup: (token: string,group:number) => Promise<any> = async (
  token: string,group:number
) => {
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

export const CountRequestByEmpCode: (token: string,empCode:string) => Promise<CountRequest[]> = async (
  token: string,empCode:string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/count/request/${empCode}`, {
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


export const GetWorkcellByGroup: (token: string,groupId:number) => Promise<any> = async (
  token: string,
  groupId:number 
) => {
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