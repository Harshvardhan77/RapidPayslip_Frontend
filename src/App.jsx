import { useEffect, useState } from "react";
import React from "react";
import './App.css';   
import './index.css'
import useStateInfo from "./Hooks/useStateInfo";
import useCityInfo from "./Hooks/useCityInfo"
import Form from "./components/Form/Form";
import Preview from "./components/Preview/Preview";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import axios from "axios"
import PreviousPayslips from "./components/Payslips/PreviousPayslips";

function App({}) {
  const [showPreview,setShowPreview]=useState(false)
  const [payMonth, setPayMonth]=useState("July 2024")
  const [payslipTitle,setPayslipTitle]=useState("Pay date")
  const [payslipDate,setPayslipDate]= useState("")
  const [payslipList,setpayslipList]=useState([])
  const [empIdTitle,setEmpIdTitle]=useState("Emp ID")
  const [employeeList, setEmployeeList]=useState([])
  const [empDetailTitle, setEmpDetailTitle]= useState("Employee Id")
  const [empDetailsAmount, setEmpDetailsAmount]= useState("")
  const [earningTitle,setEarningTitle]=useState("")
  const [deductionTitle,setDeductionTitle]=useState("")
  const [deductionHeaderTitle,setDeductionHeaderTitle]=useState("Deductions")
  const [deductionHeaderAmount,setDeductionHeaderAmount]=useState("Amount")
  const [earningAmount,setEarningAmount]=useState("")
  const [earningHeaderTitle,setEarningHeaderTitle]=useState("Title")
  const [earningHeaderAmount,setEarningHeaderAmount]=useState("Amount")
  const [deductionAmount,setDeductionAmount]=useState("")
  const [earningList,setEarningList]=useState([])
  const [deductionList,setDeductionList]=useState([])
  const [note,setNote]=useState("")
  const [netPayTitle, setNetPayTitle]= useState("Net Pay")
  const [netAmount,setNetAmount]=useState(0)
  const [totalEarningTitle,setTotalEarningTitle]=useState("Total Earning")
  const [totalEarningAmount,setTotalEarningAmount]=useState("")
  const [totalDeductionAmount,setTotalDeductionAmount]=useState("")
  const [totalDeductionTitle,setTotalDeductionTitle]=useState("")
  const [headerTitle,setHeaderTitle]=useState("")
  const [companyName, setCompanyName]=useState("")
  const [email, setEmail]= useState("")
  const [subTotal, setSubTotal]= useState(0)
  const [image,setImage]= useState("")
  const [imagePreview,setimagePreview]=useState("")
  const [amountWords, setAmountWords]=useState("")
  const [selectState, setSelectState]=useState("")
  const [selectCity, setSelectCity]=useState('')
  const stateOptions= useStateInfo('')
  const cityOptions=useCityInfo(selectState)
  const [user,setUser]=useState({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);  

  // Fetching user
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    }
  }, []);


  const router= createBrowserRouter([
    {
      path:'/',
      element:<Form
      user={user}
      setUser={setUser}
      headerTitle={headerTitle} 
      setHeaderTitle={setHeaderTitle} 
      companyName={companyName} 
      setCompanyName={setCompanyName} 
      email={email}
      setEmail={setEmail}
      image={image}
      setImage={setImage}
      setShowPreview={setShowPreview}
      selectState={selectState}
      setSelectState={setSelectState}
      selectCity={selectCity}
      setSelectCity={setSelectCity}
      cityOptions={cityOptions}
      stateOptions={stateOptions}
      payMonth={payMonth}
      setPayMonth={setPayMonth}
      imagePreview={imagePreview}
      setimagePreview={setimagePreview}
      setIsSignupModalOpen={setIsSignupModalOpen}
      isLoginModalOpen={isLoginModalOpen}
      setIsLoginModalOpen={setIsLoginModalOpen}
      isSignupModalOpen={isSignupModalOpen}
  
      payslipTitle={payslipTitle} 
      setPayslipTitle={setPayslipTitle} 
      payslipDate={payslipDate} 
      setPayslipDate={setPayslipDate}
      payslipList={payslipList} 
      setpayslipList={setpayslipList} 
      empIdTitle={empIdTitle} 
      setEmpIdTitle={setEmpIdTitle} 
      employeeList={employeeList} 
      setEmployeeList={setEmployeeList} 
      empDetailTitle={empDetailTitle} 
      setEmpDetailTitle={setEmpDetailTitle}
      empDetailsAmount={empDetailsAmount} 
      setEmpDetailsAmount={setEmpDetailsAmount}
  
      earningTitle={earningTitle} 
      setEarningTitle={setEarningTitle} 
      setEarningAmount={setEarningAmount} 
      earningAmount={earningAmount} 
      netPayTitle={netPayTitle}
      setNetPayTitle={setNetPayTitle}
      earningList={earningList} 
      setEarningList={setEarningList}
      deductionAmount={deductionAmount} 
      setDeductionAmount={setDeductionAmount} 
      deductionTitle={deductionTitle} 
      setDeductionTitle={setDeductionTitle} 
      deductionList={deductionList} 
      setDeductionList={setDeductionList}
      setDeductionHeaderTitle={setDeductionHeaderTitle} 
      setDeductionHeaderAmount={setDeductionHeaderAmount}
      earningHeaderAmount={earningHeaderAmount} 
      setEarningHeaderAmount={setEarningHeaderAmount} 
      earningHeaderTitle={earningHeaderTitle} 
      setEarningHeaderTitle={setEarningHeaderTitle} 
      netAmount={netAmount} 
      setNetAmount={setNetAmount} 
      totalEarningTitle={totalEarningTitle} 
      setTotalEarningTitle={setTotalEarningTitle} 
      totalDeductionAmount={totalDeductionAmount} 
      setTotalDeductionAmount={setTotalDeductionAmount}
      totalEarningAmount={totalEarningAmount} 
      setTotalEarningAmount={setTotalEarningAmount} 
      setTotalDeductionTitle={setTotalDeductionTitle}
      subTotal={subTotal}
      setSubTotal={setSubTotal}
      
      note={note} 
      setNote={setNote}
      amountWords={amountWords}
      setAmountWords={setAmountWords}
      /> 
    },{
      path:'/preview',
      element:<Preview
      setIsLoginModalOpen={setIsLoginModalOpen}
      user={user}
      companyName={companyName}
      email={email}
      image={image}
      setImage={setImage}
      selectCity={selectCity}
      selectState={selectState}
      imagePreview={imagePreview}
      headerTitle={headerTitle}
      payMonth={payMonth}
      empDetailTitle={empDetailTitle} 
      empDetailsAmount={empDetailsAmount} 
      employeeList={employeeList} 
      setEmployeeList={setEmployeeList}
      payslipTitle={payslipTitle} 
      payslipDate={payslipDate} 
      payslipList={payslipList} 
      setpayslipList={setpayslipList} 
      earningHeaderTitle={earningHeaderTitle} 
      earningHeaderAmount={earningHeaderAmount}
      earningTitle={earningTitle}
      earningAmount={earningAmount}
      earningList={earningList}
      deductionHeaderTitle={deductionHeaderTitle}
      deductionHeaderAmount={deductionHeaderAmount}
      deductionTitle={deductionTitle}
      deductionAmount={deductionAmount}
      deductionList={deductionList}
      subTotal={subTotal} 
      setSubTotal={setSubTotal}
      netPayTitle={netPayTitle}
      totalEarningAmount={totalEarningAmount}
      totalDeductionAmount={totalDeductionAmount}
      note={note}
      setNote={setNote}
      />
    }
  ])
  
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
