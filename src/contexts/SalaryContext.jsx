import React,{ createContext, useState } from "react";

export const SalaryContext = createContext();

const SalaryContextProvider = ({ children }) => {
  const [earningTitle, setEarningTitle] = useState("");
  const [earningAmount, setEarningAmount] = useState("");
  const [netPayTitle, setNetPayTitle] = useState("Net Pay");
  const [earningList, setEarningList] = useState([]);
  const [deductionAmount, setDeductionAmount] = useState("");
  const [deductionList, setDeductionList] = useState([]);
  const [deductionHeaderTitle, setDeductionHeaderTitle] = useState("Deductions");
  const [deductionHeaderAmount, setDeductionHeaderAmount] = useState("Amount");
  const [earningHeaderTitle, setEarningHeaderTitle] = useState("Title");
  const [earningHeaderAmount, setEarningHeaderAmount] = useState("Amount");
  const [netAmount, setNetAmount] = useState(0);
  const [totalEarningTitle, setTotalEarningTitle] = useState("Total Earning");
  const [totalEarningAmount, setTotalEarningAmount] = useState("");
  const [totalDeductionAmount, setTotalDeductionAmount] = useState("");
  const [totalDeductionTitle, setTotalDeductionTitle] = useState("");
  const [subTotal, setSubTotal]= useState(0)
  const [deductionTitle,setDeductionTitle]=useState("")

  const contextValue={
    earningTitle,
    setEarningTitle,
    earningAmount,
    setEarningAmount,
    netPayTitle,
    setNetPayTitle,
    earningList,
    setEarningList,
    deductionAmount,
    setDeductionAmount,
    deductionList,
    setDeductionList,
    deductionHeaderTitle,
    setDeductionHeaderTitle,
    deductionHeaderAmount,
    setDeductionHeaderAmount,
    earningHeaderTitle,
    setEarningHeaderTitle,
    earningHeaderAmount,
    setEarningHeaderAmount,
    netAmount,
    setNetAmount,
    totalEarningTitle,
    setTotalEarningTitle,
    totalEarningAmount,
    setTotalEarningAmount,
    totalDeductionAmount,
    setTotalDeductionAmount,
    totalDeductionTitle,
    setTotalDeductionTitle,
    subTotal,
    setSubTotal,
    deductionTitle,
    setDeductionTitle
  }

  return (
    <SalaryContext.Provider value={contextValue}>
      {children}
    </SalaryContext.Provider>
  );
};

export default SalaryContextProvider;
