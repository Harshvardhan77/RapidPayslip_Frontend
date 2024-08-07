import React, { useContext } from 'react'
import { memo } from 'react'
import { SalaryContext } from '../../contexts/SalaryContext'

function DeductionDetailsPreview() {
  const { deductionHeaderTitle, deductionHeaderAmount,deductionTitle,deductionAmount,deductionList}= useContext(SalaryContext)
  
  return (
    <>
    
    <div className='left-row w-1/2'>
            <div className=' h-auto flex '>
            <table width="100%" className='p-4'>
            
    <tbody>
                  <tr className='payslip-color-1'>
                    <td className='font-bold'>{deductionHeaderTitle}</td>
                    <td className='font-bold'>{deductionHeaderAmount}</td>
                  </tr>
      </tbody>
      {deductionList.map(({id,deductionTitle,deductionAmount})=>(
      
         <React.Fragment key={id}>
          
          <tbody>
          <tr>
              <td><span>{deductionTitle}</span></td>
              <td>{deductionAmount}</td>
          </tr>
          </tbody>
         </React.Fragment>

      ))}
            </table>
      </div>
         </div>

              
         
      
    </>
  )
}

export default memo(DeductionDetailsPreview)
