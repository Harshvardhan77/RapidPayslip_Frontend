import React from 'react'
import { Link } from 'react-router-dom';


function ButtonsPreview({
handleSubmitMain2,
headerTitle}) {
    const handlePrint =()=>{
        window.print();
    }

    function downloadWebpage2(e) {
      const clonedDocument = document.documentElement.cloneNode(true);
      const buttons = clonedDocument.querySelectorAll('button');
      buttons.forEach((button) => button.remove());
      const htmlContent = clonedDocument.outerHTML;
    
  
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'webpage.html';
    
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    


  return (
    <>
      <section >
        <div className=' m-5 w-full flex justify-center items-center'>
        <Link to="/" className="bg-blue-500 m-5 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 hover:bg-transparent 
         hover:text-blue-500 transition-all duration-300 print-button" >Check Details</Link>
        <button onClick={(e)=>downloadWebpage2(e)} className="bg-blue-500 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 m-5 hover:bg-transparent 
         hover:text-blue-500 transition-all duration-300 print-button" >Download</button>
        <button onClick={handlePrint} className="bg-blue-500 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 m-5 hover:bg-transparent 
         hover:text-blue-500 transition-all duration-300 print-button" >Print</button>

        <button onClick={(e)=>handleSubmitMain2(e)} className="bg-blue-500 py-1 text-white px-6
        rounded shadow font-bold border-2 border-blue-500 m-5 hover:bg-transparent 
         hover:text-blue-500 transition-all duration-300 print-button" >Save {headerTitle}</button>
        </div>
        </section>
    </>
  )
}

export default ButtonsPreview
