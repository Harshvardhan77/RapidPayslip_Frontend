import React from 'react'
import TitleComponent from '../TitleComponent';
import Header from '../Header';
import PEDetails from '../PEDetails';
import SalaryDetails from '../SalaryDetails';
import FooterDetails from '../FooterDetails';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import Sidebar from './Sidebar';

function Form({
    headerTitle,
    setHeaderTitle,
    companyName,
    setCompanyName,
    email,
    setEmail,
    image,
    setImage,
    setShowPreview,
    selectState,
    setSelectState,
    selectCity,
    setSelectCity,
    cityOptions,
    stateOptions,
    payMonth,
    setPayMonth,
    imagePreview,
    setimagePreview,
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
    setEmpDetailsAmount,
    earningTitle,
    setEarningTitle,
    setEarningAmount,
    earningAmount,
    netPayTitle,
    setNetPayTitle,
    earningList,
    setEarningList,
    deductionAmount,
    setDeductionAmount,
    deductionTitle,
    setDeductionTitle,
    deductionList,
    setDeductionList,
    setDeductionHeaderTitle,
    setDeductionHeaderAmount,
    earningHeaderAmount,
    setEarningHeaderAmount,
    earningHeaderTitle,
    setEarningHeaderTitle,
    netAmount,
    totalEarningTitle,
    setTotalEarningTitle,
    totalDeductionAmount,
    setTotalDeductionAmount,
    totalEarningAmount,
    setTotalEarningAmount,
    setTotalDeductionTitle,
    subTotal,
    setSubTotal,
    note,
    setNote,
    setNetAmount,
    amountWords,
    setAmountWords,
    user,
    setUser,
    isLoginModalOpen,
    setIsLoginModalOpen,
    isSignupModalOpen,
    setIsSignupModalOpen,
    payslipsUrls
}) {

    const [errors,setErrors]= useState({})
    const navigate= useNavigate();
    const validationErrors = {};
    const specialCharactersRegex = /[!@#$%^&*()?`]/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const maxLength = 25;
    const numericRegex = /\d/;
    


    const validateField = (field, value, errorMessage) => {
        if (!value.trim()) {
          validationErrors[field] = 'Required';
        }
        else if (specialCharactersRegex.test(value)) {
          validationErrors[field] = errorMessage || 'Invalid input';
        } else if (value.length > maxLength) {
          validationErrors[field] = `${field} is too long`;
        }
      };

    const handleSubmitMain = (e) => {
        e.preventDefault();
      
        // headerTitle
        validateField('headerTitle',headerTitle)
        if(!headerTitle.trim()){
          validationErrors.headerTitle='Required'
        }
        if (numericRegex.test(headerTitle)) {
          validationErrors.headerTitle = 'Invalid';
        }
        
        // email
        if(!email.trim()){
          validationErrors.email='Required'
        }else if(!emailRegex.test(email)){
          validationErrors.email='invalid email'
        }
         
        // select city
        if(!selectCity.trim()){
          validationErrors.selectCity='Required'
        }
      
        // select state
        if(!selectState.trim()){
          validationErrors.selectState='Required'
        }
      
        // paymonth
        if(!payMonth){
          validationErrors.payMonth='Required'
        }
      
        // Company Name
        validateField('companyName',companyName)
        if(!companyName.trim()){
          validationErrors.companyName='Required'
        }
        if (numericRegex.test(companyName)) {
          validationErrors.companyName = 'Invalid';
        }
        
        // image
        if (!image) {
          validationErrors.image = 'Required';
        }
      
      
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
          
        }
        else{
          navigate("/preview");
        }
      
      };

      const containerClass = Object.keys(user).length>0
    ? 'flex input_class justify-start items-start mr-5 ml-2'
    : 'flex input_class justify-center items-center col-span-4 mr-5';

      const containerClass2=Object.keys(user).length>0
      ? 'w-full':'w-4/5';

  return (
    <>
    <div className={containerClass}>
    <div className={containerClass2}>
    <TitleComponent
    user={user}
    setUser={setUser}
    isLoginModalOpen={isLoginModalOpen}
    setIsLoginModalOpen={setIsLoginModalOpen}
    isSignupModalOpen={isSignupModalOpen}
    setIsSignupModalOpen={setIsSignupModalOpen}/>
    </div>
    </div>
<form onSubmit={(e) => handleSubmitMain(e)} encType="multipart/form-data">
  <div className={containerClass}>
    <div className="w-4/5">

    <div className="bg_4">
    <Header 
    headerTitle={headerTitle} 
    setHeaderTitle={setHeaderTitle} 
    companyName={companyName} 
    setCompanyName={setCompanyName} 
    email={email}
    setEmail={setEmail}
    image={image}
    setImage={setImage}
    errors={errors}
    setErrors={setErrors}
    handleSubmitMain={handleSubmitMain}
    setShowPreview={setShowPreview}
    selectState={selectState}
    setSelectState={setSelectState}
    selectCity={selectCity}
    setSelectCity={setSelectCity}
    cityOptions={cityOptions}
    stateOptions={stateOptions}
    payMonth={payMonth}
    setPayMonth={setPayMonth}
    validationErrors={validationErrors}
    validateField={validateField}
    imagePreview={imagePreview}
    setimagePreview={setimagePreview}
    />


    <PEDetails  
    payMonth={payMonth}
    setPayMonth={setPayMonth}
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
  /> 

    <SalaryDetails earningTitle={earningTitle} 
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
    setSubTotal={setSubTotal}/> 
    <FooterDetails note={note} 
    setNote={setNote}
    subTotal={subTotal}
    amountWords={amountWords}
    setAmountWords={setAmountWords}/>
      <div className='w-full flex justify-center items-center bg-white'>    
      <ul>
  
        <button type='submit' onClick={(e)=>handleSubmitMain(e)}
        className="bg-blue-500 m-5 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 hover:bg-transparent
        hover:text-blue-500 transition-all duration-300"
        >Preview Payslip</button>
      
        <button 
        onClick={(e)=>handleSubmitMain(e)}
        className="bg-blue-500 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 m-5 hover:bg-transparent
         hover:text-blue-500 transition-all duration-300"
         disabled >Print</button>
 </ul>
 </div>
  
    </div>
    </div>
    {Object.keys(user).length>0 ?  <Sidebar user={user}/> : null}
    </div>

    </form>
    </>
  )
}

export default memo(Form)
