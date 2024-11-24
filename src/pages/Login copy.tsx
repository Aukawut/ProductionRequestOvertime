import { TrendingUp } from "lucide-react";
import React from "react";

const Login: React.FC = () => {
  return (
    <div className="bg-[#A9C1FF] w-full h-screen flex justify-center items-center overflow-hidden">
      <div className="w-[900px] h-[600px] rounded-[24px] bg-[white] relative overflow-hidden">
        <div className="bg-[#3B47B0] -rotate-[100deg] w-[270px] h-[380px] absolute -top-[300px] right-[150px] z-10 rounded-[32px]"></div>
        <div className="bg-[#5566FF] rotate-[3.5deg] w-[625px] h-[690px] absolute -top-[5px] -right-[200px]"></div>
        <div className="absolute bg-[#5F6FFF] w-[270px] h-[170px] -top-[50px] -right-[50px] rounded-[24px] rotate-[5deg]"></div>
        <div className="bg-[#5599FF] w-[600px] h-[400px] -rotate-[43deg] absolute z-0 rounded-[32px] -right-[165px] -bottom-[100px]"></div>
        <div className="bg-white rounded-[18px] border-[2px] border-[#3C4EFF] absolute top-[120px] w-[140px] h-[180px] right-[230px] p-2">
          <p className="text-[#FF8F3F] text-[13px]">Users</p>
          <p className="text-[#0E0C32] text-[17px] font-semibold">1,200</p>
          <div className="p-2 ">
            <div className="bg-[#6F6464] border-[2px] rounded-full w-[31px] h-[31px]"></div>
            <div className="w-full flex justify-center">
              <TrendingUp color="#FF9244" size={60} strokeWidth={1}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
