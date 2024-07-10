import React, { useContext } from "react";
import SalaryDetailsDeductions from "./SalaryDetailsDeductions";
import SalaryDetailsEarning from "./SalaryDetailsEarning";
import NetPay from "./NetPay";
import { useEffect } from "react";
import { memo } from "react";
import { SalaryContext } from "../../contexts/SalaryContext";

function SalaryDetails() {
  const { setSubTotal, totalEarningAmount, totalDeductionAmount } =
    useContext(SalaryContext);

  useEffect(() => {
    setSubTotal(totalEarningAmount - totalDeductionAmount);
  }, [totalEarningAmount, totalDeductionAmount]);

  return (
    <>
      <div className="w-full bg_1 mt-5 main_text">
        <div className="h-12 font-bold text-3xl flex justify-center items-center bg_2">
          Salary Details
        </div>
        <div className="grid lg:grid-cols-2 gap-4 p-4 md:grid-cols-1 bg_1">
          <div className="col-span-1 border border-class rounded bg_4">
            <SalaryDetailsEarning />
          </div>
          <div className="col-span-1 border border-class rounded bg_4">
            <SalaryDetailsDeductions />
          </div>
        </div>
        <div className="pb-1">
          <div className="bg_1 mb-4 flex justify-center items-center border border-class ml-4 mr-4 rounded bg_4">
            <NetPay />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(SalaryDetails);
