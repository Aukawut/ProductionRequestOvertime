import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockKeyhole, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import bgMobile from "@/assets/images/hands-hold-mobile.jpg";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import axios  from "axios";
import {useOTManagementSystemStore} from "../../store"

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const inputUsername = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const baseURL = import.meta.env.VITE_BASE_URL ;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = useOTManagementSystemStore((state) => state.login);
  const setInfo = useOTManagementSystemStore((state) => state.setInfo);
  const setToken = useOTManagementSystemStore((state) => state.setToken);


  const navigate = useNavigate()

  // Handle Submit Form
  const handleLogin = async () => {
    try {
      if (username == "" || password == "") {
        toast.error(
          <div>
            <p className="text-[14px] text-gray-800">
              Username and Password is required!
            </p>
          </div>
        );
      } else {
        
        // Send Username and Password to Server
        const response = await axios.post(`${baseURL}/login`,{
          username,password
        });


        if(!response.data.err && response.data.status == "Ok") {
          
          login() // setState Login = true ;
          setInfo(response.data.results)
          setToken(response.data.token)
       
          
          toast.success(
            <div>
              <p className="text-[14px] text-gray-800">Login success!</p>
              <p className="text-[12px] text-gray-600">เข้าสู่ระบบสำเร็จ!</p>
            </div>
          )

          setTimeout(() => {
            navigate("/")
          },1500)

        }else{
          toast.error(
            <div>
              <p className="text-[14px] text-gray-800">{response.data.msg}</p>
              <p className="text-[12px] text-gray-600">กรุณาตรวจสอบชื่อผู้ใช้ และรหัสผ่านของคุณ</p>
            </div>
          );
        }



        
      }
    } catch (err) {
      console.log(err);
    }
  };





  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <motion.div
        className="w-[840px] bg-white  h-[460px] shadow-smooth rounded-[24px] flex items-cente overflow-hidden"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
      >
        <div className="w-full p-[4rem]">
          <div className="flex mb-[1rem] gap-x-4">
            <div className="w-[8px] bg-[#AECCF6] rounded-[2px]"></div>
            <div className="flex flex-col">
              <h4 className="font-bold tracking-tight lg:text-xl text-gray-600">
                OT Management System
              </h4>
              <h4 className="scroll-m-20 text-sm tracking-tight lg:text-md text-gray-400">
                ระบบบริหารจัดการทำงานล่วงเวลา (โอที)
              </h4>
            </div>
          </div>

          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 1500,
              style: {
               paddingRight:20,
               paddingLeft:20,
              },
            }}
          
          />

          <div className="flex flex-col gap-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                type="text"
                placeholder="Username"
                className="pl-10 py-6 text-lg"
                ref={inputUsername}
                autoFocus
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    if (username !== "") {
                      inputPassword?.current?.focus();
                    }
                  }
                }}
              />
            </div>
            <div className="relative">
              <LockKeyhole
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={18}
              />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 py-6 text-lg"
                value={password}
                ref={inputPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key == "Enter") {
                    handleLogin();
                  }
                }}
              />
            </div>
          </div>
          <div className="my-[1rem]">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <div>
                <Link to="/" className="text-sm underline">
                  Forgot password
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button className="w-full py-[1.5rem]" onClick={handleLogin}>
              Sign in
            </Button>
          </div>
        </div>
        <div className="w-full h-full">
          <img
            src={bgMobile}
            alt={bgMobile}
            className="w-auto h-full object-cover rounded-l-[3rem]"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
