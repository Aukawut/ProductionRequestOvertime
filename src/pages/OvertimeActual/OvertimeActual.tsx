import React, { useState } from "react";

import Papa from "papaparse";
import moment from "moment";

const OvertimeActual = () => {
  const [csvData, setCsvData] = useState<any[]>([]);
  
  const ChangeDateFormat = (date:string) => {
    const christianYear = parseInt(date?.split('/')[2]) - 543;

    const formattedDate = moment(`${date?.split('/')[0]}/${date?.split('/')[1]}/${christianYear}`, "D/M/YYYY").format("YYYY-MM-DD");

    return formattedDate
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      Papa.parse(file, {
        header: true, // Automatically generate keys from the CSV header
        skipEmptyLines: true,
        complete: (result) => {
          const data = result.data;
          let dataObj = [];
          console.log(data);

          setCsvData(result.data); // Set parsed data into state
          const columnDataEmployeeCode = data.map((item: any) => item["����"]);
          const scan = data.map((item: any) => item["�������-�͡"]);
          const overtime1 = data.map((item: any) => item["OT1"]);
          const overtime15 = data.map((item: any) => item["OT1.5"]);
          const overtime2 = data.map((item: any) => item["OT2"]);
          const overtime3 = data.map((item: any) => item["OT3"]);
          const date = data.map((item: any) => item["�ѹ���"]);

          for (let i = 0; i < date?.length; i++) {
            dataObj.push({
              employeeCode: columnDataEmployeeCode[i],
              date: ChangeDateFormat(date[i]),
              scan: scan[i],
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
            employeeCode : item.employeeCode,
            date : item.date,
            overtime1 : item.overtime1,
            overtime15 : item.overtime15,
            overtime2 : item.overtime2,
            overtime3 : item.overtime3,
            scan:item.scan

          }))

          console.log(filter);
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
  };

  return (
    <div>
      <h2>Upload and Read CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <div>
        <h3>Parsed CSV Data:</h3>
        <pre>{JSON.stringify(csvData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default OvertimeActual;
