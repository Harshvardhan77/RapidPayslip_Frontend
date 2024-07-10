import React, { useContext } from 'react'
import { memo } from 'react'
import { EmployeeContext } from '../../contexts/EmployeeContext'

function PayslipPreview() {
  const {payslipTitle,payslipDate,payslipList,setpayslipList} = useContext(EmployeeContext)
  
  return (
    <>
        <section className='w-1/2 mr-1'>
            <div className='w-full h-auto rounded flex justify-center items-center'>
            <table width="100%">
    
    {payslipList.map(({id,payslipTitle,payslipDate})=>(
   <React.Fragment key={id}>
    <tbody>
        <tr>
          <td><span className='font-bold'>{payslipTitle}:</span></td>
          <td>{payslipDate}</td>
          
        </tr>
      </tbody>
    </React.Fragment>
     
    ))
  }
  </table>
           </div>
           
        </section>
    </>
  )
}

export default memo(PayslipPreview)
