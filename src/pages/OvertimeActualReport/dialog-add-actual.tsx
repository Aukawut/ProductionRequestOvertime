import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CheckCircle, CirclePlus, Info, Loader2, Trash2 } from "lucide-react";
import { useOTManagementSystemStore } from "../../../store";
import { toast } from "sonner";
import { useRef, useState } from "react";
import moment from "moment";
import Papa from "papaparse";
import TablePreviewOvertime from "./TablePreviewOvertime/TablePreviewOvertime";
import BarChartActual from "./BarChartActual/BarChartActual";
import { Button } from "@/components/ui/button";
import axios from "axios";


interface DialogAddOvertimeProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CsvData {
  date: string;
  employeeCode: string;
  end: string;
  overtime1: number;
  overtime2: number;
  overtime3: number;
  overtime15: number;
  total: number;
  shift: string;
  start: string;
}

const DialogAddOvertime: React.FC<DialogAddOvertimeProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [dataFile, setDataFile] = useState<File>();

  const [isSubmit, setIsSubmit] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;

  const btnUploadRef = useRef<HTMLInputElement>(null);

  const token = useOTManagementSystemStore((state) => state.token);
  const code = useOTManagementSystemStore((state) => state.info?.EmployeeCode);

  const sumOT1 = csvData.reduce((sum, item) => sum + item.overtime1, 0);
  const sumOT15 = csvData.reduce((sum, item) => sum + item.overtime15, 0);
  const sumOT2 = csvData.reduce((sum, item) => sum + item.overtime2, 0);
  const sumOT3 = csvData.reduce((sum, item) => sum + item.overtime3, 0);

  const ChangeDateFormat = (date: string) => {
    const christianYear = parseInt(date?.split("/")[2]) - 543;

    const formattedDate = moment(
      `${date?.split("/")[0]}/${date?.split("/")[1]}/${christianYear}`,
      "D/M/YYYY"
    ).format("YYYY-MM-DD");

    return formattedDate;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);

    const file = event.target.files?.[0];

    if (file) {
      setDataFile(file);
      Papa.parse(file, {
        header: true, // Automatically generate keys from the CSV header
        skipEmptyLines: true,
        complete: (result) => {
          const data = result.data;
          let dataObj = [];

          const columnDataEmployeeCode = data.map((item: any) => item["����"]);
          const scan = data.map((item: any) => item["�������-�͡"]);
          const overtime1 = data.map((item: any) => item["OT1"]);
          const overtime15 = data.map((item: any) => item["OT1.5"]);
          const overtime2 = data.map((item: any) => item["OT2"]);
          const overtime3 = data.map((item: any) => item["OT3"]);
          const date = data.map((item: any) => item["�ѹ���"]);
          const shift = data.map((item: any) => item["�С�÷ӧҹ"]);

          for (let i = 0; i < date?.length; i++) {
            dataObj.push({
              employeeCode: columnDataEmployeeCode[i],
              date: ChangeDateFormat(date[i]),
              scan: scan[i],
              shift: shift[i],
              overtime1:
                overtime1[i] == "" ||
                overtime1[i] == " " ||
                overtime1[i] == null ||
                overtime1[i] == "0" ||
                overtime1[i] == 0
                  ? 0
                  : Number(overtime1[i]),
              overtime15:
                overtime15[i] == "" ||
                overtime15[i] == " " ||
                overtime15[i] == null ||
                overtime15[i] == "0" ||
                overtime15[i] == 0
                  ? 0
                  : Number(overtime15[i]),
              overtime2:
                overtime2[i] == "" ||
                overtime2[i] == " " ||
                overtime2[i] == null ||
                overtime2[i] == "0" ||
                overtime2[i] == 0
                  ? 0
                  : Number(overtime2[i]),
              overtime3:
                overtime3[i] == "" ||
                overtime3[i] == " " ||
                overtime3[i] == null ||
                overtime3[i] == "0" ||
                overtime3[i] == 0
                  ? 0
                  : Number(overtime3[i]),
            });
          }

          const filter = dataObj?.filter(
            (x) => x.scan !== "" && x.scan !== " "
          );

          const final = filter?.map((item) => ({
            employeeCode: item.employeeCode,
            date: item.date,
            shift: item.shift,
            overtime1: item.overtime1,
            overtime15: item.overtime15,
            overtime2: item.overtime2,
            overtime3: item.overtime3,
            total:
              item.overtime1 +
              item.overtime15 +
              item.overtime2 +
              item.overtime3,

            start: moment(`${item.date} ${item.scan?.split(" ")[0]}`).format(
              "YYYY-MM-DD HH:mm"
            ),
            end:
              moment(`${item.date} ${item.scan?.split(" ")[1]}`).toDate() <
              moment(`${item.date} ${item.scan?.split(" ")[0]}`).toDate()
                ? moment(`${item.date} ${item.scan?.split(" ")[1]}`)
                    .add(1, "days")
                    .format("YYYY-MM-DD HH:mm")
                : moment(`${item.date} ${item.scan?.split(" ")[1]}`).format(
                    "YYYY-MM-DD HH:mm"
                  ),
          }));

          const filteredFinal = final?.filter(
            (x) =>
              x.overtime1 !== 0 ||
              x.overtime15 !== 0 ||
              x.overtime2 !== 0 ||
              x.overtime3 !== 0
          );

          console.log("final", filteredFinal);
          setCsvData(filteredFinal);
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
  };

  const resetData = () => {
    setDataFile(undefined);
    setCsvData([]);
    if (btnUploadRef.current) {
      btnUploadRef.current.value = "";
    }
  }

  const SaveActual = async () => {
    setIsSubmit(true);
    const body = {
      action: code,
      overtime: csvData,
    };

    const response = await axios.post(`${baseURL}/actual/overtime`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.err && response.data.status == "Ok") {
      toast.success("บันทึกข้อมูลสำเร็จ");
      setIsSubmit(false)
      setCsvData([])
      setIsOpen(false)
    } else {
      toast.error(response.data.msg);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90%] lg:w-[90%] max-w-none h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[14.5px] text-gray-700 font-medium flex items-center">
            Add Actual Overtime | เพิ่มข้อมูลการทำโอที
          </DialogTitle>
          <DialogDescription className="text-[13px] flex items-center gap-x-2">
            <Info size={15} color={"red"} /> กรุณาตรวจสอบข้อมูลก่อนบันทึกข้อมูล

            <Button
              size={"sm"}
              disabled={isSubmit}
               onClick={() => {
                SaveActual()
              }}
              className="bg-[#107EDB] text-white rounded-[6px] shadow-smooth p-2 flex items-center text-[13px] gap-x-2"
            >
              {isSubmit ? <Loader2 className="animate-spin"/> : <CheckCircle />} {isSubmit ? 'Waiting....' : 'บันทึก'}
            </Button>
          </DialogDescription>
        </DialogHeader>
        <div className="h-[95vh] overflow-auto">
          <div>
            <div className="grid grid-cols-12 gap-x-2">
              <div className="col-span-12 lg:col-span-4">
                <div className="rounded-[12px] bg-white shadow-smooth flex justify-center items-center px-2 py-1">
                  <div className="flex flex-col items-start w-full">
                    {dataFile == undefined ? (
                      <button
                        onClick={() => {
                          if (btnUploadRef?.current) {
                            btnUploadRef?.current?.click();
                          }
                        }}
                        className="bg-[#1AA1B8] text-white rounded-[6px] shadow-smooth p-2 flex items-center text-[13px] gap-x-2"
                      >
                        <CirclePlus size={16} strokeWidth={2} />
                        Upload
                      </button>
                    ) : (
                      <button
                        onClick={resetData}
                        className="bg-[#F0484E] text-white rounded-[6px] shadow-smooth p-2 flex items-center text-[13px] gap-x-2"
                      >
                        <Trash2 size={16} strokeWidth={2} />
                        Remove
                      </button>
                    )}

                    <div className="flex justify-between items-center w-full mt-2 border-[1.2px] border-gray-200 p-2 rounded-sm">
                      <div className="flex gap-x-4">
                        {dataFile != undefined ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="#038509"
                            width={18}
                          >
                            <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 144-208 0c-35.3 0-64 28.7-64 64l0 144-48 0c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM200 352l16 0c22.1 0 40 17.9 40 40l0 8c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-8c0-4.4-3.6-8-8-8l-16 0c-4.4 0-8 3.6-8 8l0 80c0 4.4 3.6 8 8 8l16 0c4.4 0 8-3.6 8-8l0-8c0-8.8 7.2-16 16-16s16 7.2 16 16l0 8c0 22.1-17.9 40-40 40l-16 0c-22.1 0-40-17.9-40-40l0-80c0-22.1 17.9-40 40-40zm133.1 0l34.9 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-34.9 0c-7.2 0-13.1 5.9-13.1 13.1c0 5.2 3 9.9 7.8 12l37.4 16.6c16.3 7.2 26.8 23.4 26.8 41.2c0 24.9-20.2 45.1-45.1 45.1L304 512c-8.8 0-16-7.2-16-16s7.2-16 16-16l42.9 0c7.2 0 13.1-5.9 13.1-13.1c0-5.2-3-9.9-7.8-12l-37.4-16.6c-16.3-7.2-26.8-23.4-26.8-41.2c0-24.9 20.2-45.1 45.1-45.1zm98.9 0c8.8 0 16 7.2 16 16l0 31.6c0 23 5.5 45.6 16 66c10.5-20.3 16-42.9 16-66l0-31.6c0-8.8 7.2-16 16-16s16 7.2 16 16l0 31.6c0 34.7-10.3 68.7-29.6 97.6l-5.1 7.7c-3 4.5-8 7.1-13.3 7.1s-10.3-2.7-13.3-7.1l-5.1-7.7c-19.3-28.9-29.6-62.9-29.6-97.6l0-31.6c0-8.8 7.2-16 16-16z" />
                          </svg>
                        ) : (
                          <p className="text-[12px] text-gray-800">
                            ไม่พบข้อมูลไฟล์
                          </p>
                        )}
                        <div className="flex flex-col">
                          <p className="text-[12px] text-gray-700">
                            {dataFile?.name}
                          </p>
                          <p className="text-[10px] text-gray-700">
                            {isNaN(Number(dataFile?.size) / 1024)
                              ? ""
                              : (Number(dataFile?.size) / 1024).toFixed(2) +
                                "KB"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-600"></p>
                      </div>
                    </div>
                    <p className="text-[12px] mt-[1rem]">
                      <span className="text-[red]">*</span> Allowed .csv file
                      only.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <BarChartActual
                  ot1={sumOT1}
                  ot15={sumOT15}
                  ot2={sumOT2}
                  ot3={sumOT3}
                />
              </div>
            </div>

            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              ref={btnUploadRef}
              className="hidden"
            />
            <div className="my-2">
              <TablePreviewOvertime data={csvData} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogAddOvertime;
