import React from "react";
import * as XLSX from "xlsx";

import moment from "moment";

interface PropsExport {
  data: any;
  fileName: string;
}
const ButtonExcelExport: React.FC<PropsExport> = ({ data, fileName }) => {
  const exportToExcel = () => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Data is either not an array or is empty");
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(
      wb,
      `${fileName}_${moment(new Date()).format("YYYYMMDDHHmm")}.xlsx`
    );
  };

  return (
    <button
      onClick={exportToExcel}
      type="button"
      className="bg-[#C1EFDF] hover:bg-[#8bc9b4] text-[#005A2B] rounded-[8px]"
    >
      <div className="flex justify-center items-center p-2 gap-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={12} fill="#005A2B" >
          <path d="M48 448L48 64c0-8.8 7.2-16 16-16l160 0 0 80c0 17.7 14.3 32 32 32l80 0 0 288c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-293.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0L64 0zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z" />
        </svg>
        <p className="text-[12px]">Export</p>
      </div>
    </button>
  );
};

export default ButtonExcelExport;
