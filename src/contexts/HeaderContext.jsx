import React,{ createContext, useState, useEffect } from "react";
import useStateInfo from "../Hooks/useStateInfo";
import useCityInfo from "../Hooks/useCityInfo";

export const HeaderContext = createContext();

const HeaderContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // Fetching user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  const [headerTitle, setHeaderTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setimagePreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [selectState, setSelectState] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const stateOptions = useStateInfo("");
  const cityOptions = useCityInfo(selectState);
  const [payMonth,setPaymonth]=useState("july 2024")
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const contextValue = {
    user,
    setUser,
    headerTitle,
    payMonth,
    setPaymonth,
    setHeaderTitle,
    companyName,
    setCompanyName,
    email,
    setEmail,
    image,
    setImage,
    imagePreview,
    setimagePreview,
    showPreview,
    setShowPreview,
    selectState,
    setSelectState,
    selectCity,
    setSelectCity,
    stateOptions,
    cityOptions,
    isLoginModalOpen,
    setIsLoginModalOpen,
    isSignupModalOpen,
    setIsSignupModalOpen,
  };

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContextProvider;
