import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


const Sidebar = ({ user }) => {
  const [payslipsUrls, setPayslipUrls] = useState([]);

  // Fetching previous Payslips
  useEffect(() => {
    const fetchPayslips = async () => {
      try {
        const response = await axios.get(`https://rapidpayslipbackend-production.up.railway.app/api/v1/users/payslips/${user._id}`);
        console.log(response.data.data);
        setPayslipUrls(response.data.data.map(url => url.replace('http://', 'https://')));
      } catch (error) {
        console.log("Error while fetching the payslip Url", error);
      }
    };

    if (user && user._id) {
      fetchPayslips();
    }
  }, [user]);

  return (
    <div className="ml-1 sidebar bg_4 p-4 w-1/4 h-full overflow-y-auto">
      <div className="flex justify-center items-center sidebar">
        <h1 className="text-2xl">Previous Payslips</h1>
      </div>
      {payslipsUrls.length > 0 ? (
        <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
          {payslipsUrls.map((url, index) => (
            <div key={index} className="mt-4 mb-4">
              <iframe
                src={url}
                width="100%"
                height="200px"
                style={{ border: "none" }}
                title={`Payslip ${index + 1}`}
              ></iframe>
              <button
                onClick={() => window.open( url , "_blank")}
                className="bg-blue-500 m-5 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 hover:bg-transparent 
         hover:text-blue-500 transition-all duration-300"
              >
                Open
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
