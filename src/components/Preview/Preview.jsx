import React from "react";

import HeaderPreview from "../HeaderPreview";
import MonthHeader from "../MonthHeader";
import EmployeePreveiw from "../EmployeePreveiw";
import PayslipPreview from "../PayslipPreview";
import EarningDetailsPreview from "../EarningDetailsPreview";
import DeductionDetailsPreview from "../DeductionDetailsPreview";
import SubTotalPreview from "../SubTotalPreview";
import ButtonsPreview from "../ButtonsPreview";
import NotePreview from "../NotePreview";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Preview({
  payMonth,
  companyName,
  email,
  image,
  setImage,
  selectCity,
  selectState,
  imagePreview,
  empDetailTitle,
  empDetailsAmount,
  employeeList,
  setEmployeeList,
  payslipTitle,
  payslipDate,
  payslipList,
  setpayslipList,
  earningHeaderTitle,
  earningHeaderAmount,
  earningTitle,
  earningAmount,
  earningList,
  deductionHeaderTitle,
  deductionHeaderAmount,
  deductionTitle,
  deductionAmount,
  deductionList,
  subTotal,
  setSubTotal,
  netPayTitle,
  totalEarningAmount,
  totalDeductionAmount,
  note,
  netAmount,
  user,
  setNote,
  headerTitle,
  amountWords,
  setIsLoginModalOpen
}) {
  const navigate=useNavigate();
  
  const handleSubmitMain2 = async (e) => {
    e.preventDefault();
    if (Object.keys(user).length<=0) {
      setIsLoginModalOpen(true)
      navigate("/")
    } else {
      const formData = new FormData();
      formData.append("headingTitle", headerTitle);
      formData.append("companyName", companyName);
      formData.append("email", email);
      formData.append("month_year", payMonth);
      formData.append("state", selectState);
      formData.append("city", selectCity);
      formData.append("logo", image);
      formData.append("payslipDetails", JSON.stringify(payslipList));
      formData.append("employeeDetails", JSON.stringify(employeeList));
      formData.append("earningDetails", JSON.stringify(earningList));
      formData.append("deductionDetails", JSON.stringify(deductionList));
      formData.append("netPay", subTotal);
      console.log(typeof subTotal);
      formData.append("amountInWords", amountWords);
      formData.append("note", note);
      formData.append("userId",user._id)

      try {
        const response = await axios.post("/api/v1/users/download", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);
        alert("Data saved successfully");
      } catch (error) {
        console.log("Error while submiting the form", error);
      }
    }
  };

  return (
    <div>
      <div id="payslip-container" className="print-content">
        <main className="m-5 p-5 xl:max-w-4xl xl:mx-auto rounded shadow-xl">
          <HeaderPreview
            companyName={companyName}
            email={email}
            image={image}
            setImage={setImage}
            selectCity={selectCity}
            selectState={selectState}
            imagePreview={imagePreview}
          />

          <MonthHeader headerTitle={headerTitle} payMonth={payMonth} />

          {/* Employee and paylsip details started */}
          <section
            className={`flex flex-row min-h-0 rounded mb-2 payslip-color-2 ${
              !empDetailTitle.trim() || !payslipTitle.trim()
                ? "border-2 border-black"
                : ""
            }`}
          >
            <EmployeePreveiw
              empDetailTitle={empDetailTitle}
              empDetailsAmount={empDetailsAmount}
              employeeList={employeeList}
              setEmployeeList={setEmployeeList}
            />
            <PayslipPreview
              payslipTitle={payslipTitle}
              payslipDate={payslipDate}
              payslipList={payslipList}
              setpayslipList={setpayslipList}
            />
          </section>

          {/* Employee and payslip details ended */}

          {/* Earning and deduction details started */}
          <section className="flex flex-row  h-auto border-black border-2 rounded payslip-color-2">
            <EarningDetailsPreview
              earningHeaderTitle={earningHeaderTitle}
              earningHeaderAmount={earningHeaderAmount}
              earningTitle={earningTitle}
              earningAmount={earningAmount}
              earningList={earningList}
            />

            <DeductionDetailsPreview
              deductionHeaderTitle={deductionHeaderTitle}
              deductionHeaderAmount={deductionHeaderAmount}
              deductionTitle={deductionTitle}
              deductionAmount={deductionAmount}
              deductionList={deductionList}
            />
          </section>

          {/* Earning and deduction details ended */}

          <SubTotalPreview
            subTotal={subTotal}
            setSubTotal={setSubTotal}
            netPayTitle={netPayTitle}
            totalEarningAmount={totalEarningAmount}
            totalDeductionAmount={totalDeductionAmount}
          />

          {note.trim() ? <NotePreview note={note} setNote={setNote} /> : null}
          <ButtonsPreview
            handleSubmitMain2={handleSubmitMain2}
            headerTitle={headerTitle}
          />
        </main>
      </div>
    </div>
  );
}

export default Preview;
