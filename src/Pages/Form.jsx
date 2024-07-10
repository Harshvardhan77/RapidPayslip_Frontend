import React, { useContext } from "react";
import TitleComponent from "../components/Form/TitleComponent.jsx"
import Header from "../components/Form/Header.jsx";
import PEDetails from "../components/Form/PEDetails.jsx";
import SalaryDetails from "../components/Form/SalaryDetails.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import Sidebar from "../components/Form/Sidebar";
import { HeaderContext } from "../contexts/HeaderContext.jsx";

function Form() {
  const { user } = useContext(HeaderContext);
  const {
    headerTitle,
    companyName,
    email,
    selectState,
    selectCity,
    payMonth,
    image,
  } = useContext(HeaderContext);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validationErrors = {};
  const specialCharactersRegex = /[!@#$%^&*()?`]/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const maxLength = 25;
  const numericRegex = /\d/;

  const validateField = (field, value, errorMessage) => {
    if (!value.trim()) {
      validationErrors[field] = "Required";
    } else if (specialCharactersRegex.test(value)) {
      validationErrors[field] = errorMessage || "Invalid input";
    } else if (value.length > maxLength) {
      validationErrors[field] = `${field} is too long`;
    }
  };

  const handleSubmitMain = (e) => {
    e.preventDefault();

    // headerTitle
    validateField("headerTitle", headerTitle);
    if (!headerTitle.trim()) {
      validationErrors.headerTitle = "Required";
    }
    if (numericRegex.test(headerTitle)) {
      validationErrors.headerTitle = "Invalid";
    }

    // email
    if (!email.trim()) {
      validationErrors.email = "Required";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "invalid email";
    }

    // select city
    if (!selectCity.trim()) {
      validationErrors.selectCity = "Required";
    }

    // select state
    if (!selectState.trim()) {
      validationErrors.selectState = "Required";
    }

    // paymonth
    if (!payMonth) {
      validationErrors.payMonth = "Required";
    }

    // Company Name
    validateField("companyName", companyName);
    if (!companyName.trim()) {
      validationErrors.companyName = "Required";
    }
    if (numericRegex.test(companyName)) {
      validationErrors.companyName = "Invalid";
    }

    // image
    if (!image) {
      validationErrors.image = "Required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      navigate("/preview");
    }
  };

  const containerClass =
    Object.keys(user).length > 0
      ? "flex input_class justify-start items-start mr-5 ml-2"
      : "flex input_class justify-center items-center col-span-4 mr-5";

  const containerClass2 = Object.keys(user).length > 0 ? "w-full" : "w-4/5";

  return (
    <>
      <div className={containerClass}>
        <div className={containerClass2}>
          <TitleComponent />
        </div>
      </div>
      <form onSubmit={(e) => handleSubmitMain(e)} encType="multipart/form-data">
        <div className={containerClass}>
          <div className="w-4/5">
            <div className="bg_4">
              <Header errors={errors} setErrors={setErrors} />

              <PEDetails />

              <SalaryDetails />
              <div className="w-full flex justify-center items-center bg-white">
                <ul>
                  <button
                    type="submit"
                    onClick={(e) => handleSubmitMain(e)}
                    className="bg-blue-500 m-5 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 hover:bg-transparent
        hover:text-blue-500 transition-all duration-300"
                  >
                    Preview Payslip
                  </button>

                  <button
                    onClick={(e) => handleSubmitMain(e)}
                    className="bg-blue-500 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 m-5 hover:bg-transparent
         hover:text-blue-500 transition-all duration-300"
                    disabled
                  >
                    Print
                  </button>
                </ul>
              </div>
            </div>
          </div>
          {Object.keys(user).length > 0 ? <Sidebar /> : null}
        </div>
      </form>
    </>
  );
}

export default memo(Form);
