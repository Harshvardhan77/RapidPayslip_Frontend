import React, { useContext } from 'react'
import { memo } from 'react'
import { SalaryContext } from '../../contexts/SalaryContext'

function SubTotalPreview() {
  const {subTotal,netPayTitle}= useContext(SalaryContext)
  
  return (
    <>
    <section className='flex justify-end'>
        <div className='w-1/2 h-10 payslip-color-1 mt-2 border-2 rounded border-black'>
        <table width="100%">
            <thead>
              <tr>
                <td className='font-bold'>{netPayTitle}</td>
                <td>{subTotal}</td>
              </tr>
            </thead>
          </table>
        </div>

     </section>
      
    </>
  )
}

export default memo(SubTotalPreview)
