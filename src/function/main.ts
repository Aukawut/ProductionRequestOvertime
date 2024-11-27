import axios from "axios";

export const GetShiftActive: (token: string) => Promise<any> = async (
  token: string
) => {
  const { VITE_BASE_URL } = import.meta.env;

  try {
    const response = await axios.get(`${VITE_BASE_URL}/shift/Y`, {
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
