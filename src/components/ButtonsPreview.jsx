import React from "react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

function ButtonsPreview({ handleSubmitMain2, headerTitle,user,setIsLoginModalOpen }) {
  const navigate = useNavigate();
  const handlePrint = () => {
    if(Object.keys(user).length<=0){
      setIsLoginModalOpen(true)
      navigate("/")
    }else{
    window.print();
    }
  };

  return (
    <>
      <section>
        <div className=" m-5 w-full flex justify-center items-center">
          <button 
            onClick={() => navigate("/")}
            className="bg-blue-500 m-5 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 hover:bg-transparent 
         hover:text-blue-500 transition-all duration-300 print-button"
          >
            Check Details
          </button>
          <button
            onClick={(e) => handleSubmitMain2(e)}
            className="bg-blue-500 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 m-5 hover:bg-transparent 
         hover:text-blue-500 transition-all duration-300 print-button"
          >
            {`Download ${headerTitle}`}
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-500 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 m-5 hover:bg-transparent 
         hover:text-blue-500 transition-all duration-300 print-button"
          >
            Print
          </button>
        </div>
      </section>
    </>
  );
}

export default memo(ButtonsPreview);
