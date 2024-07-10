import React,{ createContext, useState } from "react";

export const FooterContext= createContext();

const FooterContextProvider=({children})=>{
    const [note,setNote]=useState("")
    const [amountWords, setAmountWords]=useState("")

    const contextValue={
        note,
        setNote,
        amountWords,
        setAmountWords
    }

    return(
        <FooterContext.Provider value={contextValue}>
            {children}
        </FooterContext.Provider>
    )
}

export default FooterContextProvider