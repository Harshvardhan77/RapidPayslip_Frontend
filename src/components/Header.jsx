import React from 'react'
import { memo } from 'react';



function Header({
  headerTitle,
  setHeaderTitle,
  companyName,
  setCompanyName,
  email,
  setEmail,
  setImage,
  errors,
  setErrors,
  setShowPreview,
  selectState,
  setSelectState,
  selectCity,
  setSelectCity,
  cityOptions,
  stateOptions, 
  payMonth,
  setPayMonth,
  validationErrors,
  validateField,
  image,
  imagePreview,
  setimagePreview
  
}) 
{
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'Please select a valid image file.' });
      } else {
        setImage(file);

        const reader = new FileReader();
        reader.onload = (event) => {
      setimagePreview(event.target.result);
    };

        reader.readAsDataURL(file);
        setErrors({ ...errors, image: '' });
      }
    }
  }; 

  const headerTitleVal=(e)=>{
    e.preventDefault();
    validateField('headerTitle',headerTitle)
    if(!headerTitle.trim()){
      validationErrors.headerTitle="required"
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
      
    }

  }

  const companyNameVal=(e)=>{
    e.preventDefault();
    validateField('companyName',companyName)
    if(!companyName.trim()){
      validationErrors.companyName="required"
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
      
    }

  }

  const emailAddressVal=(e)=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    e.preventDefault();
    if(!email.trim()){
      validationErrors.email="required"
    }else if(!emailRegex.test(email)){
      validationErrors.email='invalid email'
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
      
    }

  }


  const setFalse=(e)=>{
    e.preventDefault();
    setShowPreview(false)
  }

return (
    <>
    <div className='w-full'>
    <div className='h-12 bg_2 flex justify-center items-center'>
            <h2 className='font-bold text-3xl main_text'>Header Details</h2>
        </div> 
    <div className=' backdrop-blur-sm flex items-center justify-center bg_1 main_text pl-4 pr-4'>
     
      <div className='border border-class  bg_4 rounded p-2 flex flex-col w-full items-center mt-2 mb-2'>
        <div className='w-1/3'>
      <input type="text" 
      id='headerTitle'
      placeholder='Enter Heading Title'
      value={headerTitle}
      className={`px-8 p-4 w-full border-bottom rounded overflow-ellipsis 
      overflow-hidden outline-none border-black  ${errors.headerTitle ? 'input-error':''}`}
      onChange={(e)=>{setHeaderTitle(e.target.value);
      setErrors({...errors, headerTitle:''})}}
      onKeyUp={(e) => {headerTitleVal(e)
      setFalse(e)}}
    
      />
      </div>
      {errors.headerTitle && <p className='error'>{errors.headerTitle}</p>}
      
      
      <div className='w-1/3'>
      <input type="text" 
      className={`overflow-ellipsis overflow-hidden rounded px-8 outline-none p-4 mt-1 w-full border-bottom ${errors.companyName ? 'input-error':''}`}
      id='companyName'
      placeholder='Company Name'
      value={companyName}
      onChange={(e)=>{setCompanyName(e.target.value);
        setErrors({...errors,companyName:''})
      }}
      onKeyUp={(e) => {companyNameVal(e)
        setFalse(e)}}
      />
      </div>
      {errors.companyName && <p className='error'>{errors.companyName}</p>}

      
      <div className='w-1/3'>
       <input type="text" 
      className={`overflow-ellipsis overflow-hidden rounded px-8 outline-none p-4 mt-1 w-full border-bottom border-black
      ${errors.email ? 'input-error':''}`}
      id='email'
      placeholder='Email Address'
      value={email}
      onChange={(e)=>{setEmail(e.target.value);
      setErrors({...errors,email:''})}}
      onKeyUp={(e) => {emailAddressVal(e)
        setFalse(e)}}/>
      </div>
      {errors.email && <p className='error'>{errors.email}</p>}

      <div className='mb-4 mt-4'>
      <label htmlFor="monthYearInput" className='font-bold mr-5'>Select Month and Year:</label>
     <input
      type="month"
      id="payMonth"
      name="monthYear"
      min="2023-01"  
      max="2024-12"
      value={payMonth ? new Date(payMonth).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit' }) : ''}
      onChange={(e) => setPayMonth(e.target.value) && (errors.selectState='')}
      />
      </div>
      {errors.payMonth && <p className='error'>{errors.payMonth}</p>}
      
      {/* Select city and state */}
      <select 
      name="" 
      className="rounded-lg px-1 w-1/3 py-1 block bg-gray-100 cursor-pointer outline-none border border-class mb-2"
      value={selectState}
      onChange={(e)=>{setSelectState(e.target.value);
        setErrors({ ...errors, selectState: '' }) }}
      id="selectState"
      >
      <option selected>Choose a state</option>
      {stateOptions.map((state) => (
                            <option key={state} value={state}>
                            {state}
                            </option>
                        ))}
      </select>
      {errors.selectState && <p className='error-option'>{errors.selectState}</p>}
      <select 
      name="" 
      className="rounded-lg px-1 w-1/3 py-1 block mt-2 bg-gray-100 cursor-pointer outline-none border border-b border-class"
      value={selectCity}
      onChange={(e)=>{setSelectCity(e.target.value);
        setErrors({ ...errors, selectCity: '' }) }
}
      id="selectCity"
      >
      <option selected>Choose a city</option>
         {cityOptions.map((city) => (
                            <option key={city} value={city}>
                              
                            {city}
                            </option>
                        ))}
      </select>
      {errors.selectCity && <p className='error-option'>{errors.selectCity}</p>}
     


       <div className='w-1/3'>
       <div className={`mt-4 rounded outline-none ml-2 w-full  image_box`}>
        <label htmlFor="" className='mr-2 invisible sm:visible lg:visible'> Upload Logo:</label>
      <input id="image"
       type='file' 
       name="logo" 
       accept="image/*"
       onChange={(e)=>{handleImageChange(e);
      setErrors({...errors,image:''});
      console.log(image)
      }}
       />
       
      </div>
      
      {image ?(
      <div className='image-class'>
      <img src={imagePreview} 
      alt="selected"
    />
    </div>
    ):null}
      </div>
      {errors.image && <p className='error'>{errors.image}</p>}
      </div>
    </div>
    </div>
    </>
  )
}

export default memo(Header)
