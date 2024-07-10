import React, { useContext, useEffect } from "react";
import HeaderPreview from "../components/Preview/HeaderPreview.jsx";
import MonthHeader from "../components/Form/MonthHeader.jsx";
import PayslipPreview from "../components/Preview/PayslipPreview.jsx";
import EarningDetailsPreview from "../components/Preview/EarningDetailsPreview.jsx";
import DeductionDetailsPreview from "../components/Preview/DeductionDetailsPreview.jsx";
import SubTotalPreview from "../components/Preview/SubTotalPreview.jsx";
import ButtonsPreview from "../components/Preview/ButtonsPreview.jsx";
import NotePreview from "../components/Preview/NotePreview.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { memo } from "react";
import { HeaderContext } from "../contexts/HeaderContext.jsx";
import { EmployeeContext } from "../contexts/EmployeeContext.jsx";
import { SalaryContext } from "../contexts/SalaryContext.jsx";
import { FooterContext } from "../contexts/FooterContext.jsx";
import EmployeePreveiw from "../components/Preview/EmployeePreveiw.jsx";

function Preview() {
  const {
    user,
    setIsLoginModalOpen,
    headerTitle,
    companyName,
    email,
    payMonth,
    selectState,
    selectCity,
    image,
  } = useContext(HeaderContext);
  const { payslipList, employeeList,empDetailTitle,payslipTitle } = useContext(EmployeeContext);
  const { earningList, deductionList } = useContext(SalaryContext);
  const { subTotal, amountWords, note } = useContext(FooterContext);

  const navigate = useNavigate();

  const handleSubmitMain2 = async (e) => {
    e.preventDefault();
    if (Object.keys(user).length <= 0) {
      setIsLoginModalOpen(true);
      navigate("/");
    } else {
      const pdfBlob = await downloadWebpage2(e);
      const pdfFile = new File([pdfBlob], `${headerTitle}.pdf`, {
        type: "application/pdf",
      });

      // Download on the client side
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `${headerTitle}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

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
      formData.append("amountInWords", amountWords);
      formData.append("note", note);
      formData.append("userId", user._id);
      formData.append("payslip", pdfFile);

      try {
        const response = await axios.post("/api/v1/users/download", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log(response.data);
      } catch (error) {
        console.log("Error while submiting the form", error);
      }
    }
  };
  async function downloadWebpage2(e) {
    if (Object.keys(user).length < 0) {
      setIsLoginModalOpen(true);
      navigate("/");
    } else {
      const clonedDocument = document.documentElement.cloneNode(true);

      const buttons = clonedDocument.querySelectorAll("button");
      buttons.forEach((button) => button.remove());

      const contentDiv = document.createElement("div");
      contentDiv.appendChild(clonedDocument);

      const styleElement = document.createElement("style");
      styleElement.textContent = `
      body, html {
        margin: 0;
        padding: 0;
      }
      .container {
        padding: 20px;
        margin: 20px;
      }
    `;
      contentDiv.appendChild(styleElement);

      const pdfBlob = await html2pdf().from(contentDiv).outputPdf("blob");
      return pdfBlob;
      // html2pdf()
      //   .from(contentDiv)
      //   .set({
      //     margin: [10, 10, 10, 10],
      //     filename: `${headerTitle}.pdf`,
      //     html2canvas: {
      //       scale: 2,
      //       useCORS: true,
      //     },
      //     jsPDF: {
      //       orientation: "portrait",
      //       unit: "mm",
      //       format: "a4",
      //     },
      //   })
      //   .save();
    }
  }

  return (
    <div>
      <div id="payslip-container" className="print-content">
        <main className="m-5 p-5 xl:max-w-4xl xl:mx-auto rounded shadow-xl">
          <HeaderPreview />

          <MonthHeader />

          {/* Employee and paylsip details started */}
          <section
            className={`flex flex-row min-h-0 rounded mb-2 payslip-color-2 ${
              !empDetailTitle.trim() || !payslipTitle.trim()
                ? "border-2 border-black"
                : ""
            }`}
          >
            <EmployeePreveiw />
            <PayslipPreview />
          </section>

          <section className="flex flex-row  h-auto border-black border-2 rounded payslip-color-2">
            <EarningDetailsPreview />

            <DeductionDetailsPreview />
          </section>
          <SubTotalPreview />

          {note.trim() ? <NotePreview /> : null}
          <ButtonsPreview
            handleSubmitMain2={handleSubmitMain2}
            downloadWebpage2={downloadWebpage2}
          />
        </main>
      </div>
    </div>
  );
}

export default memo(Preview);
