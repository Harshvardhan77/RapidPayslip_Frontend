import React, { useContext } from 'react'
import { memo } from 'react'
import { SalaryContext } from '../../contexts/SalaryContext'

function EarningDetailsPreview() {
  const { earningHeaderTitle,earningHeaderAmount,earningTitle,earningAmount,earningList}= useContext(SalaryContext)
  
  return (
    <>
    <div className='left-row w-1/2'>
            <div className=' h-auto flex rounded '>
            <table width="100%">
    <tbody>
                  <tr className='payslip-color-1'>
                    <td className='font-bold'>{earningHeaderTitle}</td>
                    <td className='font-bold'>{earningHeaderAmount}</td>
                  </tr>
      </tbody>
      {earningList.map(({id,earningTitle,earningAmount})=>(
      
         <React.Fragment key={id}>
          
          <tbody>
          <tr>
              <td><span>{earningTitle}</span></td>
              <td>{earningAmount}</td>
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

export default memo(EarningDetailsPreview)
