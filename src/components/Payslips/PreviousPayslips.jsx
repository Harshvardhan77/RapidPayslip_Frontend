import React from 'react'
import { Link } from 'react-router-dom'

function PreviousPayslips({payslipUrls}) {
  return (
    <div>
      <h1>Previous Payslips</h1>
      {payslipUrls.length > 0 ? (
        <div>
          {payslipUrls.map((url, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h3>Payslip {index + 1}</h3>
              <a href={url} target="_blank" rel="noopener noreferrer">
              <iframe
                src={url}
                width="20%"
                height="200px"
                style={{ border: "none" }}
                title={`Payslip ${index + 1}`}
              ></iframe>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No payslips found.</p>
      )}
    </div>
  )
}

export default PreviousPayslips
