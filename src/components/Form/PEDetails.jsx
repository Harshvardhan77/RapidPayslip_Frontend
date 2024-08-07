import React from 'react'
import PayslipDetails from './PayslipDetails'
import EmployeeDetails from './EmployeeDetails'
import { memo } from 'react'


function PEDetails(){
  return (
    <>
    <div className='w-full mt-5 main_text'>
<div className='h-12 font-bold text-3xl flex items-center justify-center bg_2'>
Payslip & Employee Details
      </div>
<div className="grid lg:grid-cols-2 gap-4 p-4 md:grid-cols-1 bg_1 ">
      <div className="col-span-1 border bg_4 border-class rounded">
        
      <PayslipDetails/>
      </div>
      <div className="col-span-1 border border-class rounded">
      
      <div className='bg_4 rounded-xl'>
      <div className='h-12'>
            <h2 className='font-bold text-xl ml-2'>Employee Details </h2>
        </div>
      <EmployeeDetails/>
      </div>
      </div>
    </div>
    </div>
    
    </>
  )
}

export default memo(PEDetails)
