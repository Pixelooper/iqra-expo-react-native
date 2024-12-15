import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// 1. Create the context
const DataContext = createContext(null);

// 2. Create the provider component
export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://iqra-backend-git-master-iftikharrashas-projects.vercel.app/api/iqra/book/surah");
        setData(response.data.data);
        setLoading(!response.data.success);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
};

// 3. Create a custom hook to consume the context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
