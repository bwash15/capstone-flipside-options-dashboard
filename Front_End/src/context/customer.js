import requestClient from "../api/axios";
import { useState, createContext, useContext, useEffect } from "react";

export const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);

export const ClientWrapper = ({ children }) => {
  const [client] = useState(requestClient);

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
};

export const CustomerContext = createContext([]);

export const useCustomer = () => useContext(CustomerContext);

export const CustomerWrapper = ({ children }) => {
  const client = useClient();
  const [customer, setCustomer] = useState(null);
  const [working, setWorking] = useState(true);


  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {working ? null : children}
    </CustomerContext.Provider>
  );
};
