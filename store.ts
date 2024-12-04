import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Permission {
  EMPLOYEE_CODE: string;
  NAME_ROLE: string;
  FACTORY_NAME: string;
  DEPT_RNAME: string;
  FULLNAME: string;
  MAIL: string;
  REAL_DEPT: string;
  ID_FACTORY : number;
  ID_GROUP_DEPT: number;
}
export interface UserInfo {
    EmployeeCode: string ;
    Department: string ;
    Fullname: string ;
    Email: string ;
    Role :Permission[]
}

interface OTManagementSystemStore {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  info: UserInfo;
  setInfo: (info: UserInfo) => void;
  token: string;
  setToken: (token: string) => void;

}

export const useOTManagementSystemStore = create<OTManagementSystemStore>()(
  devtools(
    persist(
      (set) => ({
        isLogin: false,
        token: "",
       
        info: {
            EmployeeCode:"",
            Department: "",
            Fullname : "",
            Email :"",
            Role : []
        },
       
        login: () => set((state) => ({ isLogin: (state.isLogin = true) })),
        logout: () =>
          set((state) => ({
            isLogin: (state.isLogin = false),

            info: (state.info = {
                EmployeeCode:"",
                Department: "",
                Fullname : "",
                Email :"",
                Role : []
            }),
            
            token: (state.token = ""),
          
          })),
        setInfo: (info: any) =>
          set((state) => ({ info: (state.info = info) })),
        setToken: (token: string) =>
          set((state) => ({ token: (state.token = token) })),
       
      }),

      { name: "OTManagementSystem_Store" }
    )
  )
);
