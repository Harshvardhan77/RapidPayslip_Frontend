import React, { useContext } from 'react'
import { memo } from 'react'
import { HeaderContext } from '../../contexts/HeaderContext'

function HeaderPreview() {
    const { companyName,email,image,setImage,selectState,selectCity,imagePreview}= useContext(HeaderContext)
   return (
    <>
    <main>
        {/* Header details */}
        <header className='flex justify-between mb-10'>
            <div className='logo'>
                <img className='w-38 h-32 border border-black' src={imagePreview} alt="selected"/>
                
            </div>
            <div className='flex flex-col justify-end'>
                <ul>
                <li className='font-bold text-xl'><span>{companyName}</span></li>
                <li className='font-bold text-xl'>{selectCity},{selectState}</li>
                <li className='font-bold text-xl'>{email}</li>

                </ul>
            </div>
        </header>
    </main>

    </>
  )
}

export default memo(HeaderPreview)
