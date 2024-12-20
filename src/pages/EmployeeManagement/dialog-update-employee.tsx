import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Formik } from "formik";

import { CheckCircle, Info, Search, User } from "lucide-react";

import {
  BodyInsertEmployee,
  EmployeesByCode,
  GetAllEmployeeByCode,
  InsertEmployee,
} from "@/function/main";
import { useOTManagementSystemStore } from "../../../store";
import { toast } from "sonner";
import { Factory, GroupDept, UGroup, UType } from "./EmployeeManagement";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingCircle from "@/components/custom/loading-circle";

interface DialogAddPlan {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: (load: boolean) => Promise<void>;
  factory: Factory[];
  allDeptGroup: GroupDept[];
  getFactoryByGroupId: (group: number) => Promise<void>;
  ugroup: UGroup[];
  uType: UType[];
}

const DialogAddEmployee: React.FC<DialogAddPlan> = ({
  isOpen,
  setIsOpen,
  fetchData,
  factory,
  allDeptGroup,
  getFactoryByGroupId,
  ugroup,
  uType,
}) => {

  const token = useOTManagementSystemStore((state) => state.token);
  const code = useOTManagementSystemStore((state) => state.info?.EmployeeCode);
  const [employeeInfo, setEmployeeInfo] = useState<EmployeesByCode[]>([]);
  const [loadingUser, setLoadingUser] = useState(false);

  const [initialPayload, setInitialPayload] = useState<BodyInsertEmployee>({
    code: "",
    factory: 1,
    group: 1,
    prefix: "",
    fnameTH: "",
    lnameTH: "",
    fnameEN: "",
    lnameEN: "",
    role: 8,
    ugroup: 1,
    type: 2,
    actionBy: "P240062",
  });

  const setDefaultStateValues = (prevent: boolean) => {
    setInitialPayload((prev) => ({
      ...prev,
      group: prevent ? prev.group : allDeptGroup[0].ID_GROUP_DEPT,
      actionBy:code
    }));
    setTimeout(() => {
      setInitialPayload((prev) => ({
        ...prev,
        factory: factory[0].ID_FACTORY,
      }));
    }, 500);
  };

  useEffect(() => {
    if (isOpen) {
      setDefaultStateValues(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] lg:w-[50%] max-w-none h-[98vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[14.5px] text-gray-700 font-medium">
            Add Employee | เพิ่มข้อมูลพนักงาน
          </DialogTitle>
          <DialogDescription className="text-[13px] flex items-center gap-x-2">
            <Info size={15} color={"red"} /> กรุณาตรวจสอบข้อมูลก่อนบันทึกข้อมูล
          </DialogDescription>
        </DialogHeader>
        <div className="h-[80vh] overflow-auto">
          <div>
            <Formik
              initialValues={{ ...initialPayload }}
              onSubmit={async (values, { resetForm }) => {
                const insert = await InsertEmployee(token, values);
                if (!insert.err) {
                  resetForm()
                  setEmployeeInfo([]);
                  fetchData(false)
                  setIsOpen(false)

                  toast.success(
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={20} />
                      <div>
                        <p className="text-[14px] text-gray-800">
                          {insert.msg}
                        </p>
                      </div>
                    </div>
                  );
             
                }else{
                  toast.error(insert.msg)
                }
                console.log("insert", insert);
              }}
              enableReinitialize
            >
              {({
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit} className="px-4">
                  <div className="grid grid-cols-12 gap-x-2">
                    <div className="col-span-12">
                      <p className="text-[13px] font-medium">
                        ค้นหาข้อมูลพนักงาน :
                      </p>
                      <div className="ml-[1rem]">
                        <div className="mb-2 w-full">
                          <label htmlFor="code" className="text-[13px]">
                            <span className="text-[red]">*</span> รหัสพนักงาน :
                          </label>
                          <div className="flex mt-1 gap-x-1">
                            <Input
                              type={"text"}
                              onChange={handleChange}
                              value={values.code}
                              autoFocus={false}
                              name={"code"}
                              placeholder="รหัสพนักงาน"
                            />
                            <Button
                              type="button"
                              size={"sm"}
                              onClick={async () => {
                                if (values?.code != "") {
                                  setLoadingUser(true);
                                  const user: EmployeesByCode[] =
                                    await GetAllEmployeeByCode(
                                      token,
                                      values?.code
                                    );
                                  if (user?.length > 0) {
                                    setEmployeeInfo(user);
                                    console.log(":user", user);

                                    values.prefix = user[0].Prefix;
                                    values.fnameTH = user[0].FnameTH;
                                    values.lnameTH = user[0].LnameTH;
                                    values.fnameEN = user[0].FnameEN;
                                    values.lnameEN = user[0].LnameEN;
                                  } else {
                                    setEmployeeInfo([]);
                                    toast.error("ไม่พบข้อมูลพนักงาน");
                                  }
                                  setLoadingUser(false);
                                }
                              }}
                            >
                              ค้นหา <Search />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                    <div className="col-span-12 mt-2 ">
                      <p className="text-[13px] font-medium">
                        จัดการข้อมูลพนักงาน :
                      </p>
                    </div>
                    <div className="col-span-6 ml-3 mt-2">
                      <div className="mb-2 w-full">
                        <label htmlFor="code" className="text-[13px]">
                          <span className="text-[red]">*</span> Department :
                        </label>
                        <div className="flex mt-1 gap-x-1">
                          <Select
                            onValueChange={(e) => {
                              setFieldValue("group", Number(e));
                              getFactoryByGroupId(Number(e));
                            }}
                            value={values?.group?.toString()}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="h-[200px]">
                              <SelectGroup>
                                {allDeptGroup?.map((item) => (
                                  <SelectItem
                                    value={item.ID_GROUP_DEPT?.toString()}
                                    className="text-[13px]"
                                  >
                                    {item.NAME_GROUP}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 mt-2">
                      <div className="mb-2 w-full">
                        <label htmlFor="code" className="text-[13px]">
                          <span className="text-[red]">*</span> Factory :
                        </label>
                        <div className="flex mt-1 gap-x-1">
                          <Select
                            onValueChange={(e) => {
                              setFieldValue("factory", Number(e));
                            }}
                            value={values.factory?.toString()}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="h-[200px]">
                              <SelectGroup>
                                {factory?.map((item) => (
                                  <SelectItem
                                    value={item.ID_FACTORY?.toString()}
                                    className="text-[13px]"
                                  >
                                    {item.FACTORY_NAME}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6 mt-1 ml-3">
                      <div className="mb-2 w-full">
                        <label htmlFor="code" className="text-[13px]">
                          <span className="text-[red]">*</span> User Group :
                        </label>
                        <div className="flex mt-1 gap-x-1">
                          <Select
                            onValueChange={(e) => {
                              setFieldValue("ugroup", Number(e));
                            }}
                            value={values.ugroup?.toString()}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="h-[200px]">
                              <SelectGroup>
                                {ugroup?.map((item) => (
                                  <SelectItem
                                    value={item.ID_UGROUP?.toString()}
                                    className="text-[13px]"
                                  >
                                    {item.NAME_UGROUP}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6 mt-2">
                      <div className="mb-2 w-full">
                        <label htmlFor="code" className="text-[13px]">
                          <span className="text-[red]">*</span> User Type :
                        </label>
                        <div className="flex mt-1 gap-x-1">
                          <Select
                            onValueChange={(e) => {
                              setFieldValue("type", Number(e));
                            }}
                            value={values.type?.toString()}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="h-[200px]">
                              <SelectGroup>
                                {uType?.map((item) => (
                                  <SelectItem
                                    value={item.ID_UTYPE?.toString()}
                                    className="text-[13px]"
                                  >
                                    {item.NAME_UTYPE}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 mt-[1rem]">
                      {loadingUser ? (
                        <div className="h-[100px] flex justify-center items-center">
                          <LoadingCircle />
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-x-2 text-[13px]">
                            <User size={15} className="text-gray-800" />
                            ข้อมูลพนักงาน
                          </div>
                          <div>
                            <Table className="w-full text-[13px]">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>รหัสพนักงาน</TableHead>
                                  <TableHead>คำนำหน้า</TableHead>
                                  <TableHead>ชื่อ (TH)</TableHead>
                                  <TableHead>สกุล (TH)</TableHead>
                                  <TableHead>ชื่อ (EN)</TableHead>
                                  <TableHead>สกุล (EN)</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {employeeInfo?.map((emp) => (
                                  <TableRow key={emp.EmployeeCode}>
                                    <TableCell className="font-medium">
                                      {emp.EmployeeCode}
                                    </TableCell>
                                    <TableCell>{emp.Prefix}</TableCell>
                                    <TableCell>{emp.FnameTH}</TableCell>
                                    <TableCell>{emp.LnameTH}</TableCell>
                                    <TableCell>{emp.FnameEN}</TableCell>
                                    <TableCell>{emp.LnameEN}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || values.fnameEN == ""}
                    size={"sm"}
                    className="bg-[#107EDB] text-white hover:bg-[#1c77c2] my-4"
                  >
                    <CheckCircle /> Save Plan
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogAddEmployee;
