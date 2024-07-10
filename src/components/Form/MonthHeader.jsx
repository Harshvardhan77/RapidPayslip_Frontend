import React, { useContext } from 'react'
import { memo } from 'react'
import { HeaderContext } from '../../contexts/HeaderContext'

function MonthHeader() {
  const { headerTitle,payMonth}= useContext(HeaderContext)
  return (
    <div>
       <section>
            <div className='w-full h-12 border-black border-2 rounded payslip-color-2 flex justify-center items-center mb-2'>
                <h2 className='font-bold text-xl'>{headerTitle} for the month {payMonth}</h2>

            </div>
        </section>
    </div>
  )
}

export default memo(MonthHeader)
