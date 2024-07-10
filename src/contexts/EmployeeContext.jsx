import React,{ createContext,useState } from "react";

export const EmployeeContext= createContext();

const EmployeeContextProvider=({children})=>{
    const [payMonth, setPayMonth]=useState("July 2024")
    const [payslipTitle,setPayslipTitle]=useState("Pay date")
    const [payslipDate,setPayslipDate]= useState("")
    const [payslipList,setpayslipList]=useState([])
    const [empIdTitle,setEmpIdTitle]=useState("Emp ID")
    const [employeeList, setEmployeeList]=useState([])
    const [empDetailTitle, setEmpDetailTitle]= useState("Employee Id")
    const [empDetailsAmount, setEmpDetailsAmount]= useState("")


    const contextValue={
        payMonth,
        setPayMonth,
        payslipTitle,
        setPayslipTitle,
        payslipDate,
        setPayslipDate,
        payslipList,
        setpayslipList,
        empIdTitle,
        setEmpIdTitle,
        employeeList,
        setEmployeeList,
        empDetailTitle,
        setEmpDetailTitle,
        empDetailsAmount,
        setEmpDetailsAmount
    }

    return <EmployeeContext.Provider value={contextValue}>
        {children}
    </EmployeeContext.Provider>
}

export default EmployeeContextProvider;